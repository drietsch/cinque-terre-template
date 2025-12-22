// API endpoint for research tasks
import type { APIRoute } from 'astro';
import { createTask } from '../../../../lib/tasks/queue';
import type { AgentPersona, ResearchTaskInput, ContentType } from '../../../../lib/agents/types';
import { canAgentHandleContent } from '../../../../lib/agents/config';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate required fields
    const { persona, contentType, query, researchScope, targetItems } = body as {
      persona: AgentPersona;
      contentType: ContentType;
      query: string;
      researchScope: 'events' | 'weather' | 'prices' | 'hours' | 'general';
      targetItems?: string[];
    };

    if (!persona || !contentType || !query || !researchScope) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields: persona, contentType, query, researchScope',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate research scope
    const validScopes = ['events', 'weather', 'prices', 'hours', 'general'];
    if (!validScopes.includes(researchScope)) {
      return new Response(
        JSON.stringify({
          error: `Invalid researchScope. Must be one of: ${validScopes.join(', ')}`,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate persona can handle this content type
    if (!canAgentHandleContent(persona, contentType)) {
      return new Response(
        JSON.stringify({
          error: `Agent ${persona} cannot handle content type ${contentType}`,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create task input
    const input: ResearchTaskInput = {
      type: 'research',
      contentType,
      query,
      researchScope,
      targetItems,
    };

    // Create and queue the task
    const task = await createTask(persona, 'research', input);

    return new Response(
      JSON.stringify({
        success: true,
        task: {
          id: task.id,
          status: task.status,
          agentPersona: task.agentPersona,
          capability: task.capability,
          createdAt: task.createdAt,
        },
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Research task creation failed:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
