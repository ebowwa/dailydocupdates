/**
 * Scraper Registry
 *
 * Maps source types to scraper implementations.
 * Allows registering new scrapers and looking them up by type.
 */

import type { Scraper, SourceType, SourceConfig, ScrapeResult } from "./types";
import { llmsTxtScraper } from "./llms-txt";
import { githubRawScraper } from "./github-raw";

// ============================================================================
// SCRAPER REGISTRY
// ============================================================================

/** Registry of all available scrapers keyed by type */
const scrapers: Map<SourceType, Scraper> = new Map();

/**
 * Register a scraper implementation
 */
export function registerScraper(scraper: Scraper): void {
  scrapers.set(scraper.type, scraper);
}

/**
 * Get a scraper by type
 */
export function getScraper(type: SourceType): Scraper | undefined {
  return scrapers.get(type);
}

/**
 * Scrape a source using the appropriate scraper
 */
export async function scrapeSource(config: SourceConfig): Promise<ScrapeResult> {
  const scraper = scrapers.get(config.sourceType);

  if (!scraper) {
    throw new Error(`No scraper registered for type: ${config.sourceType}`);
  }

  return scraper.scrape(config);
}

// ============================================================================
// DEFAULT REGISTRATIONS
// ============================================================================

// Register built-in scrapers
registerScraper(llmsTxtScraper);
registerScraper(githubRawScraper);

// Export scrapers for direct access if needed
export { llmsTxtScraper, githubRawScraper };
