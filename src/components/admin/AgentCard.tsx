// Agent card component displaying persona info and actions
import { useState } from 'react';
import { Languages, PenTool, Sparkles, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { AgentConfig, AgentCapability, ContentType } from '../../lib/agents/types';
import { CAPABILITY_DESCRIPTIONS, CONTENT_TYPE_DESCRIPTIONS } from '../../lib/agents/config';

interface AgentCardProps {
  agent: AgentConfig;
  onAction: (capability: AgentCapability, contentType: ContentType) => void;
}

const capabilityIcons: Record<AgentCapability, React.ElementType> = {
  translate: Languages,
  create: PenTool,
  optimize: Sparkles,
  research: Search,
};

export function AgentCard({ agent, onAction }: AgentCardProps) {
  const [selectedCapability, setSelectedCapability] = useState<AgentCapability | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<ContentType | null>(null);

  const handleCapabilityClick = (capability: AgentCapability) => {
    if (selectedCapability === capability) {
      setSelectedCapability(null);
      setSelectedContentType(null);
    } else {
      setSelectedCapability(capability);
      setSelectedContentType(null);
    }
  };

  const handleContentTypeClick = (contentType: ContentType) => {
    setSelectedContentType(contentType);
  };

  const handleStartTask = () => {
    if (selectedCapability && selectedContentType) {
      onAction(selectedCapability, selectedContentType);
      setSelectedCapability(null);
      setSelectedContentType(null);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Agent Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start gap-4">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-serif text-xl font-bold">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">{agent.role}</p>
            <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
              {agent.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Content Areas */}
      <div className="px-6 py-4 border-b border-border bg-secondary/30">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Content Areas
        </p>
        <div className="flex flex-wrap gap-1.5">
          {agent.contentTypes.map((type) => (
            <Badge key={type} variant="secondary" className="text-xs">
              {CONTENT_TYPE_DESCRIPTIONS[type]?.title || type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="p-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
          Capabilities
        </p>
        <div className="grid grid-cols-2 gap-2">
          {agent.capabilities.map((capability) => {
            const Icon = capabilityIcons[capability];
            const desc = CAPABILITY_DESCRIPTIONS[capability];
            const isSelected = selectedCapability === capability;

            return (
              <button
                key={capability}
                onClick={() => handleCapabilityClick(capability)}
                className={`flex items-center gap-2 p-3 rounded-lg border transition-colors text-left ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 hover:bg-secondary'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">{desc.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content Type Selection */}
        {selectedCapability && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Select Content Type
            </p>
            <div className="flex flex-wrap gap-2">
              {agent.contentTypes.map((type) => {
                const isSelected = selectedContentType === type;
                return (
                  <button
                    key={type}
                    onClick={() => handleContentTypeClick(type)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {CONTENT_TYPE_DESCRIPTIONS[type]?.title || type}
                  </button>
                );
              })}
            </div>

            {selectedContentType && (
              <div className="mt-4">
                <Button onClick={handleStartTask} className="w-full">
                  Start {CAPABILITY_DESCRIPTIONS[selectedCapability].title} Task
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
