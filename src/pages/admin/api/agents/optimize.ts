// API endpoint for content optimization tasks
import type { APIRoute } from 'astro';
import { createTask } from '../../../../lib/tasks/queue';
import type { AgentPersona, OptimizeTaskInput, ContentType } from '../../../../lib/agents/types';
import { canAgentHandleContent } from '../../../../lib/agents/config';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate required fields
    const { persona, contentType, optimizationType, itemIds } = body as {
      persona: AgentPersona;
      contentType: ContentType;
      optimizationType: 'seo' | 'clarity' | 'engagement' | 'all';
      itemIds?: string[];
    };

    if (!persona || !contentType || !optimizationType) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields: persona, contentType, optimizationType',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate optimization type
    const validTypes = ['seo', 'clarity', 'engagement', 'all'];
    if (!validTypes.includes(optimizationType)) {
      return new Response(
        JSON.stringify({
          error: `Invalid optimizationType. Must be one of: ${validTypes.join(', ')}`,
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
    const input: OptimizeTaskInput = {
      type: 'optimize',
      contentType,
      contentPath: `src/content/shared/${contentType}.json`,
      optimizationType,
      itemIds,
    };

    // Create and queue the task
    const task = await createTask(persona, 'optimize', input);

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
    console.error('Optimize task creation failed:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
