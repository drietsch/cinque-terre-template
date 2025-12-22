// Translation status matrix showing content × language coverage
import { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import type { ContentType, Language } from '../../lib/agents/types';
import { CONTENT_TYPE_DESCRIPTIONS } from '../../lib/agents/config';

interface TranslationStatus {
  contentType: ContentType;
  languages: Record<Language, boolean>;
  complete: boolean;
}

interface TranslationMatrixProps {
  onTranslate: (contentType: ContentType, targetLanguage: Language) => void;
}

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
];

const contentTypes: ContentType[] = [
  'accommodations',
  'dining',
  'events',
  'experiences',
  'itinerary',
  'logistics',
  'stories',
  'villages',
];

export function TranslationMatrix({ onTranslate }: TranslationMatrixProps) {
  const [statuses, setStatuses] = useState<TranslationStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching translation status
    // In production, this would call an API endpoint
    const fetchStatus = async () => {
      // Mock data - in production, fetch from API
      const mockStatuses: TranslationStatus[] = contentTypes.map((type) => ({
        contentType: type,
        languages: {
          en: true,
          it: type === 'dining' || type === 'events',
          fr: false,
          de: false,
        },
        complete: false,
      }));

      setStatuses(mockStatuses);
      setLoading(false);
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-secondary/30">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Content
            </th>
            {languages.map((lang) => (
              <th
                key={lang.code}
                className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                {lang.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {statuses.map((status) => (
            <tr key={status.contentType} className="hover:bg-secondary/20">
              <td className="px-4 py-3 text-sm font-medium">
                {CONTENT_TYPE_DESCRIPTIONS[status.contentType]?.title ||
                  status.contentType}
              </td>
              {languages.map((lang) => {
                const hasTranslation = status.languages[lang.code];
                const isEnglish = lang.code === 'en';

                return (
                  <td key={lang.code} className="px-4 py-3 text-center">
                    {hasTranslation ? (
                      <div className="flex justify-center">
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                    ) : isEnglish ? (
                      <div className="flex justify-center">
                        <X className="w-4 h-4 text-red-500" />
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          onTranslate(status.contentType, lang.code)
                        }
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        Translate
                      </Button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="px-4 py-3 border-t border-border bg-secondary/20 flex items-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Check className="w-3 h-3 text-green-500" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <X className="w-3 h-3 text-red-500" />
          <span>Missing</span>
        </div>
      </div>
    </div>
  );
}
