// Task queue component for displaying and managing agent tasks
import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Loader2, AlertCircle, Eye, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { TaskStatus, AgentPersona, AgentCapability } from '../../lib/agents/types';
import { AGENT_CONFIGS } from '../../lib/agents/config';

interface TaskSummary {
  id: string;
  agentPersona: AgentPersona;
  capability: AgentCapability;
  status: TaskStatus;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  error?: string;
  hasOutput: boolean;
  previewCount: number;
}

interface TaskQueueProps {
  onViewTask: (taskId: string) => void;
  onApplyTask: (taskId: string) => void;
  pollInterval?: number;
}

const statusConfig: Record<
  TaskStatus,
  { icon: React.ElementType; color: string; label: string }
> = {
  pending: { icon: Clock, color: 'text-amber-500', label: 'Pending' },
  running: { icon: Loader2, color: 'text-blue-500', label: 'Running' },
  completed: { icon: CheckCircle, color: 'text-green-500', label: 'Completed' },
  failed: { icon: XCircle, color: 'text-red-500', label: 'Failed' },
  cancelled: { icon: AlertCircle, color: 'text-muted-foreground', label: 'Cancelled' },
};

export function TaskQueue({
  onViewTask,
  onApplyTask,
  pollInterval = 5000,
}: TaskQueueProps) {
  const [tasks, setTasks] = useState<TaskSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/admin/api/tasks?limit=20&stats=true');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data.tasks);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();

    // Poll for updates
    const interval = setInterval(fetchTasks, pollInterval);
    return () => clearInterval(interval);
  }, [pollInterval]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAgentName = (persona: AgentPersona) => {
    return AGENT_CONFIGS[persona]?.name || persona;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        <p className="text-sm font-medium">Failed to load tasks</p>
        <p className="text-xs mt-1">{error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <Clock className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">No tasks yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Start a task by selecting an agent and capability above
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="divide-y divide-border">
        {tasks.map((task) => {
          const statusInfo = statusConfig[task.status];
          const StatusIcon = statusInfo.icon;

          return (
            <div key={task.id} className="p-4 flex items-center gap-4">
              {/* Status Icon */}
              <div className={`${statusInfo.color}`}>
                <StatusIcon
                  className={`w-5 h-5 ${task.status === 'running' ? 'animate-spin' : ''}`}
                />
              </div>

              {/* Task Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">
                    {getAgentName(task.agentPersona)}
                  </span>
                  <Badge variant="outline" className="text-xs capitalize">
                    {task.capability}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{formatTime(task.createdAt)}</span>
                  {task.previewCount > 0 && (
                    <>
                      <span>•</span>
                      <span>{task.previewCount} changes</span>
                    </>
                  )}
                  {task.error && (
                    <>
                      <span>•</span>
                      <span className="text-destructive truncate max-w-48">
                        {task.error}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewTask(task.id)}
                  className="text-xs"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>

                {task.status === 'completed' && task.hasOutput && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onApplyTask(task.id)}
                    className="text-xs"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Apply
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
