/**
 * Polymarket documentation source
 *
 * Configuration for Polymarket docs using shared @ebowwa/markdown-docs-scraper
 */

import type { SourceConfig } from "@ebowwa/markdown-docs-scraper/scrapers";

// ============================================================================
// SOURCE CONFIGURATION
// ============================================================================

export const polymarketSource: SourceConfig = {
  name: "Polymarket",
  sourceType: "llms-txt",
  baseUrl: "https://docs.polymarket.com",
  docsPath: "",  // llms.txt at root, no /docs prefix
  outputDir: "docs/polymarket",
  reportDir: "daily/polymarket",
  llmsTxtPath: "/llms.txt",
};
