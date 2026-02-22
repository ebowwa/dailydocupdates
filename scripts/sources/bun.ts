/**
 * Bun documentation source
 *
 * Configuration for Bun docs using shared @ebowwa/markdown-docs-scraper
 */

import type { SourceConfig } from "../scrapers/types";

// ============================================================================
// SOURCE CONFIGURATION
// ============================================================================

export const bunSource: SourceConfig = {
  name: "Bun",
  sourceType: "llms-txt",
  baseUrl: "https://bun.sh",
  docsPath: "/docs",
  outputDir: "docs/bun",
  reportDir: "daily/bun",
  llmsTxtPath: "/docs/llms.txt",
};
