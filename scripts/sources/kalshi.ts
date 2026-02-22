/**
 * Kalshi documentation source
 *
 * Configuration for Kalshi docs using shared @ebowwa/markdown-docs-scraper
 */

import type { SourceConfig } from "@ebowwa/markdown-docs-scraper/scrapers";

// ============================================================================
// SOURCE CONFIGURATION
// ============================================================================

export const kalshiSource: SourceConfig = {
  name: "Kalshi",
  sourceType: "llms-txt",
  baseUrl: "https://docs.kalshi.com",
  docsPath: "",  // llms.txt at root, no /docs prefix
  outputDir: "docs/kalshi",
  reportDir: "daily/kalshi",
  llmsTxtPath: "/llms.txt",
};
