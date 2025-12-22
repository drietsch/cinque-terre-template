// API endpoint for applying task changes to content files
import type { APIRoute } from 'astro';
import { getTask, applyTaskChanges } from '../../../../../lib/tasks/queue';

export const prerender = false;

export const POST: APIRoute = async ({ params }) => {
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

    if (task.status !== 'completed') {
      return new Response(
        JSON.stringify({
          error: `Cannot apply changes from task with status: ${task.status}. Task must be completed.`,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!task.output?.preview || task.output.preview.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Task has no changes to apply' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Apply the changes
    const result = await applyTaskChanges(taskId);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          appliedCount: result.appliedCount,
          errors: result.errors,
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        appliedCount: result.appliedCount,
        message: `Successfully applied ${result.appliedCount} changes`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Failed to apply task changes:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
