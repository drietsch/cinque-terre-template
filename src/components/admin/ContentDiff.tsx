// Content diff component for showing before/after preview
import { Plus, Minus, RefreshCw } from 'lucide-react';
import { Badge } from '../ui/badge';
import type { ContentDiff as ContentDiffType, Language } from '../../lib/agents/types';

interface ContentDiffProps {
  diffs: ContentDiffType[];
  agentNotes?: string;
}

const changeTypeConfig: Record<
  'add' | 'modify' | 'delete',
  { icon: React.ElementType; color: string; bgColor: string; label: string }
> = {
  add: {
    icon: Plus,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950',
    label: 'Added',
  },
  modify: {
    icon: RefreshCw,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-950',
    label: 'Modified',
  },
  delete: {
    icon: Minus,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950',
    label: 'Deleted',
  },
};

const languageLabels: Record<Language, string> = {
  en: 'English',
  it: 'Italiano',
  fr: 'Français',
  de: 'Deutsch',
};

export function ContentDiff({ diffs, agentNotes }: ContentDiffProps) {
  if (diffs.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-muted-foreground">No changes to preview</p>
      </div>
    );
  }

  // Group diffs by language
  const diffsByLanguage = diffs.reduce(
    (acc, diff) => {
      const lang = diff.language || 'en';
      if (!acc[lang]) acc[lang] = [];
      acc[lang].push(diff);
      return acc;
    },
    {} as Record<Language, ContentDiffType[]>
  );

  return (
    <div className="space-y-6">
      {/* Agent Notes */}
      {agentNotes && (
        <div className="rounded-lg border border-border bg-secondary/30 p-4">
          <h4 className="text-sm font-medium mb-2">Agent Notes</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {agentNotes}
          </p>
        </div>
      )}

      {/* Diffs by Language */}
      {Object.entries(diffsByLanguage).map(([lang, langDiffs]) => (
        <div key={lang} className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{languageLabels[lang as Language]}</Badge>
            <span className="text-sm text-muted-foreground">
              {langDiffs.length} {langDiffs.length === 1 ? 'change' : 'changes'}
            </span>
          </div>

          <div className="space-y-3">
            {langDiffs.map((diff, index) => {
              const config = changeTypeConfig[diff.changeType];
              const Icon = config.icon;

              return (
                <div
                  key={`${diff.path}-${index}`}
                  className="rounded-lg border border-border overflow-hidden"
                >
                  {/* Path Header */}
                  <div className="px-4 py-2 bg-secondary/50 border-b border-border flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${config.color}`} />
                    <code className="text-xs font-mono">{diff.path}</code>
                    {diff.field && (
                      <>
                        <span className="text-muted-foreground">→</span>
                        <code className="text-xs font-mono text-muted-foreground">
                          {diff.field}
                        </code>
                      </>
                    )}
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {config.label}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-2 divide-x divide-border">
                    {/* Before */}
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Before
                      </p>
                      <div className="bg-red-50 dark:bg-red-950/30 rounded p-3 text-sm font-mono whitespace-pre-wrap break-words">
                        {diff.changeType === 'add' ? (
                          <span className="text-muted-foreground italic">
                            (empty)
                          </span>
                        ) : typeof diff.before === 'string' ? (
                          diff.before
                        ) : (
                          JSON.stringify(diff.before, null, 2)
                        )}
                      </div>
                    </div>

                    {/* After */}
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        After
                      </p>
                      <div className="bg-green-50 dark:bg-green-950/30 rounded p-3 text-sm font-mono whitespace-pre-wrap break-words">
                        {diff.changeType === 'delete' ? (
                          <span className="text-muted-foreground italic">
                            (deleted)
                          </span>
                        ) : typeof diff.after === 'string' ? (
                          diff.after
                        ) : (
                          JSON.stringify(diff.after, null, 2)
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
