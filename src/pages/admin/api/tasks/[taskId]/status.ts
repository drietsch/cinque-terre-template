// API endpoint for getting task status and details
import type { APIRoute } from 'astro';
import { getTask } from '../../../../../lib/tasks/queue';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const { taskId } = params;

    if (!taskId) {
      return new Response(
        JSON.stringify({ error: 'Task ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const task = getTask(taskId);

    if (!task) {
      return new Response(
        JSON.stringify({ error: 'Task not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        task: {
          id: task.id,
          agentPersona: task.agentPersona,
          capability: task.capability,
          status: task.status,
          input: task.input,
          output: task.output,
          createdAt: task.createdAt,
          startedAt: task.startedAt,
          completedAt: task.completedAt,
          error: task.error,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Failed to get task status:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
