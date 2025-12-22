// Agent configuration mapping
// Maps personas to their content areas and capabilities

import type { AgentPersona, AgentCapability, ContentType, AgentConfig } from './types';
import { GIULIA_ROSSI_PROMPT, MARCO_BELLINI_PROMPT, SOFIA_MANTOVANI_PROMPT } from './personas';

// Agent configurations based on team.json
export const AGENT_CONFIGS: Record<AgentPersona, AgentConfig> = {
  giulia: {
    persona: 'giulia',
    name: 'Giulia Rossi',
    role: 'Lead Voice & Local Guide',
    image: '/giulia_rossi.png',
    bio: 'Born in the upper streets of Riomaggiore, Giulia grew up with the sea as a constant companion. Her writing seeks to capture the quiet dignity of a place often reduced to postcards.',
    capabilities: ['translate', 'create', 'optimize', 'research'],
    contentTypes: ['accommodations', 'dining', 'experiences', 'stories', 'events', 'itinerary', 'villages'],
    systemPrompt: GIULIA_ROSSI_PROMPT,
  },
  marco: {
    persona: 'marco',
    name: 'Marco Bellini',
    role: 'Trails & Perspectives Editor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
    bio: 'Marco arrived in the Cinque Terre as a hiker ten years ago and never left. He now documents the lesser-known paths and the stories they carry.',
    capabilities: ['translate', 'create', 'optimize', 'research'],
    contentTypes: ['logistics', 'experiences'],
    systemPrompt: MARCO_BELLINI_PROMPT,
  },
  sofia: {
    persona: 'sofia',
    name: 'Sofia Mantovani',
    role: 'Cultural & Culinary Editor',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?q=80&w=2574&auto=format&fit=crop',
    bio: 'Sofia divides her time between Florence and the coast, bringing a scholar\'s eye and a cook\'s intuition to her writing about local traditions.',
    capabilities: ['translate', 'create', 'optimize', 'research'],
    contentTypes: ['dining', 'events', 'stories'],
    systemPrompt: SOFIA_MANTOVANI_PROMPT,
  },
};

// Content type to primary agent mapping
export const CONTENT_PRIMARY_AGENTS: Record<ContentType, AgentPersona> = {
  accommodations: 'giulia',
  dining: 'sofia',
  events: 'sofia',
  experiences: 'marco',
  itinerary: 'giulia',
  logistics: 'marco',
  stories: 'giulia',
  villages: 'giulia',
  team: 'giulia',
};

// Content type to secondary agent mapping (for alternative perspectives)
export const CONTENT_SECONDARY_AGENTS: Partial<Record<ContentType, AgentPersona>> = {
  dining: 'giulia',
  events: 'giulia',
  experiences: 'giulia',
  stories: 'sofia',
};

// Get the primary agent for a content type
export function getPrimaryAgent(contentType: ContentType): AgentConfig {
  const persona = CONTENT_PRIMARY_AGENTS[contentType];
  return AGENT_CONFIGS[persona];
}

// Get the secondary agent for a content type (if available)
export function getSecondaryAgent(contentType: ContentType): AgentConfig | null {
  const persona = CONTENT_SECONDARY_AGENTS[contentType];
  return persona ? AGENT_CONFIGS[persona] : null;
}

// Get all agents that can handle a content type
export function getAgentsForContentType(contentType: ContentType): AgentConfig[] {
  const agents: AgentConfig[] = [];

  for (const config of Object.values(AGENT_CONFIGS)) {
    if (config.contentTypes.includes(contentType)) {
      agents.push(config);
    }
  }

  return agents;
}

// Check if an agent can handle a specific content type
export function canAgentHandleContent(
  persona: AgentPersona,
  contentType: ContentType
): boolean {
  const config = AGENT_CONFIGS[persona];
  return config.contentTypes.includes(contentType);
}

// Check if an agent has a specific capability
export function hasAgentCapability(
  persona: AgentPersona,
  capability: AgentCapability
): boolean {
  const config = AGENT_CONFIGS[persona];
  return config.capabilities.includes(capability);
}

// Get all agents
export function getAllAgents(): AgentConfig[] {
  return Object.values(AGENT_CONFIGS);
}

// Get agent by persona
export function getAgent(persona: AgentPersona): AgentConfig {
  return AGENT_CONFIGS[persona];
}

// Capability descriptions for UI
export const CAPABILITY_DESCRIPTIONS: Record<AgentCapability, { title: string; description: string; icon: string }> = {
  translate: {
    title: 'Translate',
    description: 'Translate content to French, German, or Italian while preserving the editorial voice',
    icon: 'Languages',
  },
  create: {
    title: 'Create',
    description: 'Generate new content items matching the existing structure and style',
    icon: 'PenTool',
  },
  optimize: {
    title: 'Optimize',
    description: 'Improve content for SEO, clarity, and engagement',
    icon: 'Sparkles',
  },
  research: {
    title: 'Research',
    description: 'Search for live information to update events, prices, and hours',
    icon: 'Search',
  },
};

// Content type descriptions for UI
export const CONTENT_TYPE_DESCRIPTIONS: Record<ContentType, { title: string; description: string }> = {
  accommodations: {
    title: 'Accommodations',
    description: 'Hotels, B&Bs, and vacation rentals',
  },
  dining: {
    title: 'Dining',
    description: 'Restaurants, trattorias, and local cuisine',
  },
  events: {
    title: 'Events',
    description: 'Festivals, celebrations, and local happenings',
  },
  experiences: {
    title: 'Experiences',
    description: 'Activities, sights, and things to do',
  },
  itinerary: {
    title: 'Itinerary',
    description: 'Curated multi-day journeys',
  },
  logistics: {
    title: 'Logistics',
    description: 'Transportation and practical information',
  },
  stories: {
    title: 'Stories',
    description: 'Editorial features and narratives',
  },
  villages: {
    title: 'Villages',
    description: 'Village descriptions and guides',
  },
  team: {
    title: 'Team',
    description: 'Editorial team information',
  },
};
