// Task queue management system
// Handles task creation, tracking, and execution

import { runAgentTask, applyChanges } from '../agents/client';
import type {
  AgentTask,
  AgentPersona,
  AgentCapability,
  ContentType,
  TaskStatus,
  TaskInput,
  TaskOutput,
  Language,
  ContentDiff,
} from '../agents/types';

// In-memory task store (in production, use a database)
const tasks: Map<string, AgentTask> = new Map();

// Generate unique task ID
function generateTaskId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Create a new task
export async function createTask(
  persona: AgentPersona,
  capability: AgentCapability,
  input: TaskInput
): Promise<AgentTask> {
  const task: AgentTask = {
    id: generateTaskId(),
    agentPersona: persona,
    capability,
    status: 'pending',
    input,
    createdAt: new Date(),
  };

  tasks.set(task.id, task);

  // Start task execution in background
  executeTask(task.id).catch((error) => {
    console.error(`Task ${task.id} failed:`, error);
    updateTaskStatus(task.id, 'failed', undefined, error.message);
  });

  return task;
}

// Execute a task
async function executeTask(taskId: string): Promise<void> {
  const task = tasks.get(taskId);
  if (!task) {
    throw new Error(`Task not found: ${taskId}`);
  }

  // Update status to running
  updateTaskStatus(taskId, 'running');

  try {
    // Determine content type from input
    const contentType = getContentTypeFromInput(task.input);

    // Run the agent task
    const output = await runAgentTask(
      task.agentPersona,
      task.capability,
      contentType,
      task.input
    );

    // Update task with output
    updateTaskStatus(taskId, 'completed', output);
  } catch (error) {
    updateTaskStatus(
      taskId,
      'failed',
      undefined,
      error instanceof Error ? error.message : 'Unknown error'
    );
    throw error;
  }
}

// Get content type from task input
function getContentTypeFromInput(input: TaskInput): ContentType {
  switch (input.type) {
    case 'translate':
    case 'optimize':
      return input.contentType;
    case 'create':
      return input.contentType;
    case 'research':
      return input.contentType;
    default:
      return 'stories'; // Default fallback
  }
}

// Update task status
function updateTaskStatus(
  taskId: string,
  status: TaskStatus,
  output?: TaskOutput,
  error?: string
): void {
  const task = tasks.get(taskId);
  if (!task) return;

  task.status = status;

  if (status === 'running') {
    task.startedAt = new Date();
  }

  if (status === 'completed' || status === 'failed') {
    task.completedAt = new Date();
  }

  if (output) {
    task.output = output;
  }

  if (error) {
    task.error = error;
  }

  tasks.set(taskId, task);
}

// Get a task by ID
export function getTask(taskId: string): AgentTask | null {
  return tasks.get(taskId) || null;
}

// List all tasks with optional filtering
export function listTasks(filters?: {
  status?: TaskStatus;
  persona?: AgentPersona;
  capability?: AgentCapability;
  limit?: number;
  offset?: number;
}): { tasks: AgentTask[]; total: number } {
  let result = Array.from(tasks.values());

  // Apply filters
  if (filters?.status) {
    result = result.filter((t) => t.status === filters.status);
  }

  if (filters?.persona) {
    result = result.filter((t) => t.agentPersona === filters.persona);
  }

  if (filters?.capability) {
    result = result.filter((t) => t.capability === filters.capability);
  }

  // Sort by creation date (newest first)
  result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const total = result.length;

  // Apply pagination
  if (filters?.offset) {
    result = result.slice(filters.offset);
  }

  if (filters?.limit) {
    result = result.slice(0, filters.limit);
  }

  return { tasks: result, total };
}

// Cancel a pending task
export function cancelTask(taskId: string): boolean {
  const task = tasks.get(taskId);
  if (!task) return false;

  if (task.status !== 'pending') {
    return false; // Can only cancel pending tasks
  }

  task.status = 'cancelled';
  task.completedAt = new Date();
  tasks.set(taskId, task);

  return true;
}

// Apply task changes to content files
export async function applyTaskChanges(
  taskId: string
): Promise<{ success: boolean; appliedCount: number; errors: string[] }> {
  const task = tasks.get(taskId);
  if (!task) {
    return { success: false, appliedCount: 0, errors: ['Task not found'] };
  }

  if (task.status !== 'completed') {
    return { success: false, appliedCount: 0, errors: ['Task is not completed'] };
  }

  if (!task.output?.preview || task.output.preview.length === 0) {
    return { success: false, appliedCount: 0, errors: ['No changes to apply'] };
  }

  // Group diffs by language
  const diffsByLanguage = new Map<Language, ContentDiff[]>();
  for (const diff of task.output.preview) {
    const language = diff.language || 'en';
    const existing = diffsByLanguage.get(language) || [];
    existing.push(diff);
    diffsByLanguage.set(language, existing);
  }

  // Apply changes for each language
  const allErrors: string[] = [];
  let totalApplied = 0;

  const contentType = getContentTypeFromInput(task.input);

  for (const [language, diffs] of diffsByLanguage) {
    const result = await applyChanges(contentType, language, diffs);
    totalApplied += result.appliedCount;
    allErrors.push(...result.errors);
  }

  return {
    success: allErrors.length === 0,
    appliedCount: totalApplied,
    errors: allErrors,
  };
}

// Delete old completed/failed tasks (cleanup)
export function cleanupTasks(maxAgeMs: number = 24 * 60 * 60 * 1000): number {
  const cutoff = Date.now() - maxAgeMs;
  let deleted = 0;

  for (const [id, task] of tasks) {
    if (
      (task.status === 'completed' || task.status === 'failed' || task.status === 'cancelled') &&
      task.completedAt &&
      task.completedAt.getTime() < cutoff
    ) {
      tasks.delete(id);
      deleted++;
    }
  }

  return deleted;
}

// Get task statistics
export function getTaskStats(): {
  total: number;
  pending: number;
  running: number;
  completed: number;
  failed: number;
  cancelled: number;
} {
  const stats = {
    total: 0,
    pending: 0,
    running: 0,
    completed: 0,
    failed: 0,
    cancelled: 0,
  };

  for (const task of tasks.values()) {
    stats.total++;
    stats[task.status]++;
  }

  return stats;
}

// Re-export types for convenience
export type { AgentTask, TaskStatus, TaskOutput, ContentDiff };
