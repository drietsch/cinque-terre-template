// Server-side content file operations for agent system
// This file should only be imported in server-side code (API routes, etc.)

import fs from 'node:fs/promises';
import path from 'node:path';
import type { Language } from './content';

export type ContentType = 'accommodations' | 'dining' | 'events' | 'experiences' | 'itinerary' | 'logistics' | 'stories' | 'villages' | 'team';

// Map content type to JSON file path
const CONTENT_FILE_MAP: Record<ContentType, string> = {
  accommodations: 'src/content/shared/accommodations.json',
  dining: 'src/content/shared/dining.json',
  events: 'src/content/shared/events.json',
  experiences: 'src/content/shared/experiences.json',
  itinerary: 'src/content/shared/itinerary.json',
  logistics: 'src/content/shared/logistics.json',
  stories: 'src/content/shared/stories.json',
  villages: 'src/content/shared/villages.json',
  team: 'src/content/shared/team.json',
};

// Get the absolute path to a content file
function getContentFilePath(contentType: ContentType): string {
  const relativePath = CONTENT_FILE_MAP[contentType];
  if (!relativePath) {
    throw new Error(`Unknown content type: ${contentType}`);
  }
  // Get project root
  const projectRoot = process.cwd();
  return path.join(projectRoot, relativePath);
}

// Read a content file and return the content for a specific language
export async function readContentFile(
  contentType: ContentType,
  language: Language = 'en'
): Promise<Record<string, unknown>> {
  const filePath = getContentFilePath(contentType);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Return the content for the specified language
    // If language doesn't exist, return English as fallback
    if (data[language]) {
      return data[language];
    }

    if (data['en']) {
      return data['en'];
    }

    // If no language structure, return the whole thing
    return data;
  } catch (error) {
    throw new Error(
      `Failed to read content file ${contentType}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// Write content to a file for a specific language
export async function writeContentFile(
  contentType: ContentType,
  language: Language,
  content: Record<string, unknown>
): Promise<void> {
  const filePath = getContentFilePath(contentType);

  try {
    // Read existing file to preserve other languages
    let existingData: Record<string, unknown> = {};

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch {
      // File doesn't exist, start fresh
    }

    // Update the specified language
    existingData[language] = content;

    // Write back with pretty formatting
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
  } catch (error) {
    throw new Error(
      `Failed to write content file ${contentType}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// Read all languages for a content type
export async function readAllLanguages(
  contentType: ContentType
): Promise<Record<Language, Record<string, unknown>>> {
  const filePath = getContentFilePath(contentType);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error(
      `Failed to read content file ${contentType}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// Get translation status for a content type
export async function getTranslationStatus(contentType: ContentType): Promise<{
  languages: Record<Language, boolean>;
  complete: boolean;
}> {
  try {
    const data = await readAllLanguages(contentType);
    const supportedLanguages: Language[] = ['en', 'it', 'fr', 'de'];

    const status: Record<Language, boolean> = {
      en: false,
      it: false,
      fr: false,
      de: false,
    };

    for (const lang of supportedLanguages) {
      status[lang] = lang in data && Object.keys(data[lang] || {}).length > 0;
    }

    return {
      languages: status,
      complete: Object.values(status).every(Boolean),
    };
  } catch {
    return {
      languages: { en: false, it: false, fr: false, de: false },
      complete: false,
    };
  }
}
