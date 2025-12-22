// API endpoint for translation tasks
import type { APIRoute } from 'astro';
import { createTask } from '../../../../lib/tasks/queue';
import type { AgentPersona, TranslateTaskInput, Language, ContentType } from '../../../../lib/agents/types';
import { canAgentHandleContent } from '../../../../lib/agents/config';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Validate required fields
    const { persona, contentType, sourceLanguage, targetLanguages, itemIds } = body as {
      persona: AgentPersona;
      contentType: ContentType;
      sourceLanguage: Language;
      targetLanguages: Language[];
      itemIds?: string[];
    };

    if (!persona || !contentType || !sourceLanguage || !targetLanguages?.length) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields: persona, contentType, sourceLanguage, targetLanguages',
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
    const input: TranslateTaskInput = {
      type: 'translate',
      contentType,
      contentPath: `src/content/shared/${contentType}.json`,
      sourceLanguage,
      targetLanguages,
      itemIds,
    };

    // Create and queue the task
    const task = await createTask(persona, 'translate', input);

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
    console.error('Translation task creation failed:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
