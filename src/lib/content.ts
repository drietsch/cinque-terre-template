import contentData from '../content';

export type Language = 'en' | 'it' | 'fr' | 'de';
export type ContentData = typeof contentData;
export type EnglishContent = typeof contentData.en;
export type SiteConfig = typeof contentData.site;

// Get site configuration
export function getSiteConfig(): SiteConfig {
  return contentData.site;
}

// Get all supported languages
export function getLanguages(): Language[] {
  return getSiteConfig().supportedLanguages as Language[];
}

// Get all village slugs for routing
export function getVillageSlugs(): string[] {
  return getVillages('en').map(v => v.slug);
}

// Get village by URL slug
export function getVillageBySlug(slug: string, lang: Language = 'en') {
  const villages = getVillages(lang);
  return villages.find(v => v.slug === slug);
}

// Check if a language code is valid
export function isValidLanguage(lang: string): lang is Language {
  return getLanguages().includes(lang as Language);
}

// Check if a village slug is valid
export function isValidVillageSlug(slug: string): boolean {
  return getVillageSlugs().includes(slug);
}

// Get current language from URL path (default to English)
export function getCurrentLanguage(): Language {
  if (typeof window !== 'undefined') {
    const pathLang = window.location.pathname.split('/')[1];
    if (isValidLanguage(pathLang)) return pathLang;
  }
  return 'en';
}

// Get all content for a language
export function getContent(lang: Language = 'en'): EnglishContent {
  return contentData[lang] as EnglishContent;
}

// Get meta content
export function getMeta(lang: Language = 'en') {
  return getContent(lang).meta;
}

// Get navigation content
export function getNavigation(lang: Language = 'en') {
  const content = getContent(lang);
  // Fallback to English for missing navigation items
  return {
    ...contentData.en.navigation,
    ...content.navigation
  };
}

// Get common UI strings
export function getCommon(lang: Language = 'en') {
  const content = getContent(lang);
  // Fallback to English for missing common items
  return {
    ...contentData.en.common,
    ...content.common,
    buttons: {
      ...contentData.en.common.buttons,
      ...(content.common?.buttons || {})
    },
    labels: {
      ...contentData.en.common.labels,
      ...(content.common?.labels || {})
    }
  };
}

// Get shared data arrays
export function getSharedData<K extends keyof EnglishContent['shared']>(
  key: K,
  lang: Language = 'en'
): EnglishContent['shared'][K] {
  const content = getContent(lang);
  // Shared data should always come from the current language if available
  // Otherwise fallback to English
  const shared = content.shared as EnglishContent['shared'] | undefined;
  if (shared && key in shared) {
    return shared[key];
  }
  return contentData.en.shared[key];
}

// Get page-specific content
export function getPageContent<K extends keyof EnglishContent['pages']>(
  pageName: K,
  lang: Language = 'en'
): EnglishContent['pages'][K] {
  const content = getContent(lang);
  const pages = content.pages as EnglishContent['pages'] | undefined;
  if (pages && pageName in pages) {
    return pages[pageName];
  }
  return contentData.en.pages[pageName];
}

// Convenience functions for specific shared data
export function getVillages(lang: Language = 'en') {
  return getSharedData('villages', lang);
}

export function getStays(lang: Language = 'en') {
  return getSharedData('stays', lang);
}

export function getEats(lang: Language = 'en') {
  return getSharedData('eats', lang);
}

export function getStories(lang: Language = 'en') {
  return getSharedData('stories', lang);
}

export function getFeaturedStories(lang: Language = 'en') {
  return getSharedData('featuredStories', lang);
}

export function getTrendingStories(lang: Language = 'en') {
  return getSharedData('trendingStories', lang);
}

export function getAudioGuides(lang: Language = 'en') {
  return getSharedData('audioGuides', lang);
}

export function getEscapes(lang: Language = 'en') {
  return getSharedData('escapes', lang);
}

export function getAdvice(lang: Language = 'en') {
  return getSharedData('advice', lang);
}

export function getHighlights(lang: Language = 'en') {
  return getSharedData('highlights', lang);
}

export function getAccommodations(lang: Language = 'en') {
  return getSharedData('accommodations', lang);
}

export function getRestaurants(lang: Language = 'en') {
  return getSharedData('restaurants', lang);
}

export function getSights(lang: Language = 'en') {
  return getSharedData('sights', lang);
}

export function getExperiences(lang: Language = 'en') {
  return getSharedData('experiences', lang);
}

export function getItinerary(lang: Language = 'en') {
  return getSharedData('itinerary', lang);
}

export function getDays(lang: Language = 'en') {
  return getSharedData('days', lang);
}

export function getTeam(lang: Language = 'en') {
  return getSharedData('team', lang);
}

export function getEditors(lang: Language = 'en') {
  const team = getTeam(lang);
  return (team as { editors?: unknown[] })?.editors ?? [];
}

export function getTransportModes(lang: Language = 'en') {
  return getSharedData('transportModes', lang);
}

export function getAirports(lang: Language = 'en') {
  return getSharedData('airports', lang);
}

export function getEvents(lang: Language = 'en') {
  return getSharedData('events', lang);
}

export function getVillageIntroStories(lang: Language = 'en') {
  return getSharedData('villageIntroStories', lang);
}

export function getVillageEssentials(lang: Language = 'en') {
  return getSharedData('villageEssentials', lang);
}

export function getVillageAbout(lang: Language = 'en') {
  return getSharedData('villageAbout', lang);
}

export function getVillageInsiderSecrets(lang: Language = 'en') {
  return getSharedData('villageInsiderSecrets', lang);
}

export function getVillageFAQs(lang: Language = 'en') {
  return getSharedData('villageFAQs', lang);
}

export function getWeatherWebcams(lang: Language = 'en') {
  return getSharedData('weatherWebcams', lang);
}

// Helper to get village by ID
export function getVillageById(id: string, lang: Language = 'en') {
  const villages = getVillages(lang);
  return villages.find(v => v.id === id);
}

// Helper to get items filtered by village
export function getItemsByVillage<T extends { village: string }>(
  items: T[],
  villageName: string
): T[] {
  return items.filter(item => item.village === villageName);
}
