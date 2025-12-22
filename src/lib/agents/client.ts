// Claude SDK client for content agents
import Anthropic from '@anthropic-ai/sdk';
import { getAgentSystemPrompt } from './personas';
import type {
  AgentPersona,
  AgentCapability,
  ContentType,
  Language,
  TaskInput,
  TaskOutput,
  ContentDiff,
  TranslateTaskInput,
  CreateTaskInput,
  OptimizeTaskInput,
  ResearchTaskInput,
} from './types';
import { readContentFile, writeContentFile } from '../content-server';

// Initialize Anthropic client
const anthropic = new Anthropic();

// Tool definitions for content management
const contentTools: Anthropic.Tool[] = [
  {
    name: 'read_content',
    description: 'Read a JSON content file from src/content/shared/. Returns the parsed JSON content.',
    input_schema: {
      type: 'object' as const,
      properties: {
        contentType: {
          type: 'string',
          description: 'The content type to read (accommodations, dining, events, experiences, itinerary, logistics, stories, villages, team)',
        },
        language: {
          type: 'string',
          description: 'The language code (en, it, fr, de). Defaults to en.',
        },
      },
      required: ['contentType'],
    },
  },
  {
    name: 'write_content_preview',
    description: 'Preview changes to a JSON content file. Does not actually write - returns a diff for user approval.',
    input_schema: {
      type: 'object' as const,
      properties: {
        contentType: {
          type: 'string',
          description: 'The content type to modify',
        },
        language: {
          type: 'string',
          description: 'The language code for the content',
        },
        changes: {
          type: 'array',
          description: 'Array of changes to apply',
          items: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'JSON path to the field (e.g., "items[0].description")',
              },
              before: {
                type: 'string',
                description: 'The original value',
              },
              after: {
                type: 'string',
                description: 'The new value',
              },
              changeType: {
                type: 'string',
                enum: ['add', 'modify', 'delete'],
                description: 'Type of change',
              },
            },
            required: ['path', 'after', 'changeType'],
          },
        },
      },
      required: ['contentType', 'language', 'changes'],
    },
  },
  {
    name: 'validate_json',
    description: 'Validate that a JSON string is well-formed and matches expected content structure.',
    input_schema: {
      type: 'object' as const,
      properties: {
        jsonString: {
          type: 'string',
          description: 'The JSON string to validate',
        },
        contentType: {
          type: 'string',
          description: 'Expected content type for structural validation',
        },
      },
      required: ['jsonString'],
    },
  },
];

// Web search tool configuration for research capability
const webSearchTool: Anthropic.Tool = {
  type: 'web_search_20250305' as any,
  name: 'web_search',
  max_uses: 10,
  user_location: {
    type: 'approximate',
    city: 'La Spezia',
    region: 'Liguria',
    country: 'IT',
  },
} as any;

// Tool handler for content operations
async function handleToolCall(
  toolName: string,
  toolInput: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case 'read_content': {
      const contentType = toolInput.contentType as ContentType;
      const language = (toolInput.language as Language) || 'en';
      const content = await readContentFile(contentType, language);
      return JSON.stringify(content, null, 2);
    }

    case 'write_content_preview': {
      // This doesn't actually write - it returns the changes for preview
      const changes = toolInput.changes as ContentDiff[];
      return JSON.stringify({
        status: 'preview_ready',
        changes: changes,
        message: 'Changes prepared for preview. User must approve before applying.',
      });
    }

    case 'validate_json': {
      const jsonString = toolInput.jsonString as string;
      try {
        JSON.parse(jsonString);
        return JSON.stringify({ valid: true, message: 'JSON is valid' });
      } catch (error) {
        return JSON.stringify({
          valid: false,
          message: `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }

    default:
      return JSON.stringify({ error: `Unknown tool: ${toolName}` });
  }
}

// Build the task prompt based on input type
function buildTaskPrompt(input: TaskInput): string {
  switch (input.type) {
    case 'translate': {
      const ti = input as TranslateTaskInput;
      return `
## Translation Task

Translate the following content from ${ti.sourceLanguage.toUpperCase()} to ${ti.targetLanguages.map((l) => l.toUpperCase()).join(', ')}.

Content Type: ${ti.contentType}
Content Path: ${ti.contentPath}
${ti.itemIds ? `Specific Items: ${ti.itemIds.join(', ')}` : 'Translate all items'}

Instructions:
1. First, read the source content using read_content tool
2. Translate each text field while preserving:
   - JSON structure and keys (never translate keys)
   - Technical fields (slugs, IDs, URLs)
   - Numbers and dates
3. Adapt cultural references appropriately for each target language
4. Maintain the editorial voice and premium tone
5. Use write_content_preview to show the translated content

Important: Create separate previews for each target language.`;
    }

    case 'create': {
      const ci = input as CreateTaskInput;
      return `
## Content Creation Task

Create new ${ci.contentType} content in ${ci.language.toUpperCase()}.

Requirements:
${ci.requirements}

${ci.context ? `Additional Context: ${JSON.stringify(ci.context)}` : ''}

Instructions:
1. First, read existing ${ci.contentType} content to understand the structure and style
2. Create new content that:
   - Follows the exact same JSON structure
   - Matches the editorial voice and tone
   - Includes all required fields
3. Use write_content_preview to show the new content

Important: The new content should feel native to the existing collection.`;
    }

    case 'optimize': {
      const oi = input as OptimizeTaskInput;
      const optimizationFocus =
        oi.optimizationType === 'all'
          ? 'SEO, clarity, and engagement'
          : oi.optimizationType === 'seo'
            ? 'search engine optimization (natural keywords, meta descriptions)'
            : oi.optimizationType === 'clarity'
              ? 'clarity and readability'
              : 'reader engagement and emotional resonance';

      return `
## Content Optimization Task

Optimize ${oi.contentType} content for ${optimizationFocus}.

Content Path: ${oi.contentPath}
${oi.itemIds ? `Specific Items: ${oi.itemIds.join(', ')}` : 'Optimize all items'}

Instructions:
1. First, read the current content using read_content tool
2. Analyze each item for improvement opportunities
3. Optimize while preserving:
   - The original meaning and intent
   - The authentic editorial voice
   - Technical accuracy
4. Use write_content_preview to show optimized content

Focus areas for ${oi.optimizationType}:
${
  oi.optimizationType === 'seo'
    ? `- Natural keyword integration
- Compelling meta descriptions
- Clear headings and structure`
    : oi.optimizationType === 'clarity'
      ? `- Shorter sentences where appropriate
- Active voice
- Logical flow and structure`
      : oi.optimizationType === 'engagement'
        ? `- Vivid sensory details
- Emotional hooks
- Personal anecdotes and local color`
        : `- All of the above, balanced appropriately`
}`;
    }

    case 'research': {
      const ri = input as ResearchTaskInput;
      return `
## Research Task

Research live information about: ${ri.query}

Content Type: ${ri.contentType}
Research Scope: ${ri.researchScope}
${ri.targetItems ? `Target Items to Update: ${ri.targetItems.join(', ')}` : ''}

Instructions:
1. Use web_search to find current, accurate information
2. Focus on ${ri.researchScope === 'events' ? 'upcoming events and dates' : ri.researchScope === 'weather' ? 'seasonal weather patterns and best visiting times' : ri.researchScope === 'prices' ? 'current prices and costs' : ri.researchScope === 'hours' ? 'opening hours and availability' : 'general travel information'}
3. Verify information from multiple sources when possible
4. ${ri.targetItems ? `Update the specified items in ${ri.contentType}` : `Provide findings for ${ri.contentType}`}
5. Use write_content_preview to show any content updates
6. Include citations in your notes

Important: Flag any conflicting or uncertain information.`;
    }
  }
}

// Main function to run an agent task
export async function runAgentTask(
  persona: AgentPersona,
  capability: AgentCapability,
  contentType: ContentType,
  input: TaskInput
): Promise<TaskOutput> {
  const systemPrompt = getAgentSystemPrompt(persona, capability, contentType);
  const taskPrompt = buildTaskPrompt(input);

  // Select tools based on capability
  const tools: Anthropic.Tool[] = [...contentTools];
  if (capability === 'research') {
    tools.push(webSearchTool);
  }

  const collectedDiffs: ContentDiff[] = [];
  const citations: Array<{ url: string; title: string; citedText: string }> = [];
  let agentNotes = '';

  // Create initial message
  const messages: Anthropic.MessageParam[] = [
    {
      role: 'user',
      content: taskPrompt,
    },
  ];

  // Agentic loop - continue until task is complete
  let continueLoop = true;
  let iterations = 0;
  const maxIterations = 20;

  while (continueLoop && iterations < maxIterations) {
    iterations++;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      system: systemPrompt,
      tools,
      messages,
    });

    // Process response content
    const assistantContent: Anthropic.ContentBlock[] = [];
    let hasToolUse = false;

    for (const block of response.content) {
      assistantContent.push(block);

      if (block.type === 'text') {
        // Collect any agent notes from text responses
        agentNotes += block.text + '\n';
      } else if (block.type === 'tool_use') {
        hasToolUse = true;
      }
    }

    // Add assistant message to conversation
    messages.push({
      role: 'assistant',
      content: assistantContent,
    });

    // If there are tool calls, process them
    if (hasToolUse) {
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of response.content) {
        if (block.type === 'tool_use') {
          // Handle web search results (they come back automatically)
          if (block.name === 'web_search') {
            // Web search is handled by the API, results come in server_tool_use
            continue;
          }

          // Handle our custom tools
          const result = await handleToolCall(
            block.name,
            block.input as Record<string, unknown>
          );

          // Collect diffs from write_content_preview
          if (block.name === 'write_content_preview') {
            const input = block.input as {
              contentType: ContentType;
              language: Language;
              changes: ContentDiff[];
            };
            for (const change of input.changes || []) {
              collectedDiffs.push({
                ...change,
                language: input.language,
              });
            }
          }

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: result,
          });
        }
      }

      if (toolResults.length > 0) {
        messages.push({
          role: 'user',
          content: toolResults,
        });
      }
    }

    // Check stop reason
    if (response.stop_reason === 'end_turn') {
      continueLoop = false;
    } else if (response.stop_reason !== 'tool_use') {
      continueLoop = false;
    }
  }

  // Validate output
  const validationMessages: string[] = [];
  let validationStatus: 'valid' | 'warnings' | 'errors' = 'valid';

  if (collectedDiffs.length === 0) {
    validationMessages.push('No changes were generated by the agent');
    validationStatus = 'warnings';
  }

  // Check for potential issues
  for (const diff of collectedDiffs) {
    if (diff.changeType === 'delete') {
      validationMessages.push(`Warning: Content deletion at ${diff.path}`);
      validationStatus = 'warnings';
    }
  }

  return {
    preview: collectedDiffs,
    validationStatus,
    validationMessages,
    agentNotes: agentNotes.trim(),
    citations: citations.length > 0 ? citations : undefined,
  };
}

// Apply approved changes to content files
export async function applyChanges(
  contentType: ContentType,
  language: Language,
  diffs: ContentDiff[]
): Promise<{ success: boolean; appliedCount: number; errors: string[] }> {
  const errors: string[] = [];
  let appliedCount = 0;

  try {
    // Read current content
    const content = await readContentFile(contentType, language);

    // Apply each diff
    for (const diff of diffs) {
      try {
        applyDiffToContent(content, diff);
        appliedCount++;
      } catch (error) {
        errors.push(
          `Failed to apply change at ${diff.path}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    // Write updated content
    if (appliedCount > 0) {
      await writeContentFile(contentType, language, content);
    }

    return {
      success: errors.length === 0,
      appliedCount,
      errors,
    };
  } catch (error) {
    return {
      success: false,
      appliedCount: 0,
      errors: [
        `Failed to process content: ${error instanceof Error ? error.message : 'Unknown error'}`,
      ],
    };
  }
}

// Helper to apply a single diff to content object
function applyDiffToContent(content: Record<string, unknown>, diff: ContentDiff): void {
  const pathParts = diff.path.split(/\.|\[|\]/).filter(Boolean);
  let current: unknown = content;

  // Navigate to parent
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    if (typeof current === 'object' && current !== null) {
      current = (current as Record<string, unknown>)[part];
    } else {
      throw new Error(`Invalid path: ${diff.path}`);
    }
  }

  // Apply change
  const lastPart = pathParts[pathParts.length - 1];
  if (typeof current === 'object' && current !== null) {
    const obj = current as Record<string, unknown>;
    switch (diff.changeType) {
      case 'add':
      case 'modify':
        obj[lastPart] = diff.after;
        break;
      case 'delete':
        delete obj[lastPart];
        break;
    }
  }
}
