// Agent persona types based on team.json editors
export type AgentPersona = 'giulia' | 'marco' | 'sofia';

// Agent capabilities
export type AgentCapability = 'translate' | 'create' | 'optimize' | 'research';

// Content types from src/content/shared/
export type ContentType =
  | 'accommodations'
  | 'dining'
  | 'events'
  | 'experiences'
  | 'itinerary'
  | 'logistics'
  | 'stories'
  | 'villages'
  | 'team';

// Supported languages
export type Language = 'en' | 'it' | 'fr' | 'de';

// Task status
export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

// Agent configuration
export interface AgentConfig {
  persona: AgentPersona;
  name: string;
  role: string;
  image: string;
  bio: string;
  capabilities: AgentCapability[];
  contentTypes: ContentType[];
  systemPrompt: string;
}

// Task input types
export interface TranslateTaskInput {
  type: 'translate';
  contentType: ContentType;
  contentPath: string;
  sourceLanguage: Language;
  targetLanguages: Language[];
  itemIds?: string[];
}

export interface CreateTaskInput {
  type: 'create';
  contentType: ContentType;
  language: Language;
  requirements: string;
  context?: Record<string, unknown>;
}

export interface OptimizeTaskInput {
  type: 'optimize';
  contentType: ContentType;
  contentPath: string;
  itemIds?: string[];
  optimizationType: 'seo' | 'clarity' | 'engagement' | 'all';
}

export interface ResearchTaskInput {
  type: 'research';
  query: string;
  contentType: ContentType;
  targetItems?: string[];
  researchScope: 'events' | 'weather' | 'prices' | 'hours' | 'general';
}

export type TaskInput =
  | TranslateTaskInput
  | CreateTaskInput
  | OptimizeTaskInput
  | ResearchTaskInput;

// Content diff for preview
export interface ContentDiff {
  path: string;
  language: Language;
  field?: string;
  before: unknown;
  after: unknown;
  changeType: 'add' | 'modify' | 'delete';
}

// Task output
export interface TaskOutput {
  preview: ContentDiff[];
  validationStatus: 'valid' | 'warnings' | 'errors';
  validationMessages: string[];
  agentNotes: string;
  citations?: Array<{
    url: string;
    title: string;
    citedText: string;
  }>;
}

// Main task interface
export interface AgentTask {
  id: string;
  agentPersona: AgentPersona;
  capability: AgentCapability;
  status: TaskStatus;
  input: TaskInput;
  output?: TaskOutput;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
}

// API request/response types
export interface CreateTaskRequest {
  persona: AgentPersona;
  capability: AgentCapability;
  input: Omit<TaskInput, 'type'> & { type?: string };
}

export interface TaskListResponse {
  tasks: AgentTask[];
  total: number;
}

export interface TaskStatusResponse {
  task: AgentTask;
}

export interface ApplyTaskResponse {
  success: boolean;
  appliedChanges: number;
  errors?: string[];
}
