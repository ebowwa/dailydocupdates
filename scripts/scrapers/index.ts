/**
 * Scrapers Module
 *
 * Composable scraper architecture for multiple documentation source types.
 */

// Types
export type { SourceType, SourceConfig, Scraper, ScrapeResult, DownloadResult } from "./types";

// Scrapers
export { llmsTxtScraper, CLAUDE_CODE_PATTERN, GENERIC_PATTERN } from "./llms-txt";
export { githubRawScraper } from "./github-raw";

// Registry
export { registerScraper, getScraper, scrapeSource } from "./registry";
