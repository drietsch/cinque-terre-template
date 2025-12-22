// API endpoint for listing tasks
import type { APIRoute } from 'astro';
import { listTasks, getTaskStats } from '../../../../lib/tasks/queue';
import type { AgentPersona, AgentCapability, TaskStatus } from '../../../../lib/agents/types';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    // Parse query parameters
    const status = url.searchParams.get('status') as TaskStatus | null;
    const persona = url.searchParams.get('persona') as AgentPersona | null;
    const capability = url.searchParams.get('capability') as AgentCapability | null;
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);
    const includeStats = url.searchParams.get('stats') === 'true';

    // Build filters
    const filters: {
      status?: TaskStatus;
      persona?: AgentPersona;
      capability?: AgentCapability;
      limit?: number;
      offset?: number;
    } = {
      limit,
      offset,
    };

    if (status) filters.status = status;
    if (persona) filters.persona = persona;
    if (capability) filters.capability = capability;

    // Get tasks
    const { tasks, total } = listTasks(filters);

    // Optionally include stats
    const stats = includeStats ? getTaskStats() : undefined;

    return new Response(
      JSON.stringify({
        tasks: tasks.map((task) => ({
          id: task.id,
          agentPersona: task.agentPersona,
          capability: task.capability,
          status: task.status,
          createdAt: task.createdAt,
          startedAt: task.startedAt,
          completedAt: task.completedAt,
          error: task.error,
          hasOutput: !!task.output,
          previewCount: task.output?.preview?.length || 0,
        })),
        total,
        limit,
        offset,
        stats,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Failed to list tasks:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
