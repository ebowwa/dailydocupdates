/**
 * LLMS-TXT Scraper
 *
 * Scrapes documentation sites that provide llms.txt index files.
 * Uses @ebowwa/markdown-docs-scraper under the hood.
 */

import { scrapeMarkdownDocs } from "@ebowwa/markdown-docs-scraper";
import type { Scraper, SourceConfig, ScrapeResult, DownloadResult } from "./types";

// ============================================================================
// URL PATTERNS
// ============================================================================

/** Pattern for Claude Code docs: /docs/en/page.md */
export const CLAUDE_CODE_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+\/docs\/en\/([^)]+\.md))\)/g;

/** Pattern for generic docs: any domain/path.md */
export const GENERIC_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^/]+\/([^\s)]+\.md))\)/g;

// ============================================================================
// LLMS-TXT SCRAPER
// ============================================================================

export const llmsTxtScraper: Scraper = {
  type: "llms-txt",

  async scrape(config: SourceConfig): Promise<ScrapeResult> {
    const options = getScraperOptions(config);
    const result = await scrapeMarkdownDocs(options);

    // Convert DocPage[] to DownloadResult[]
    const downloaded: DownloadResult[] = result.downloaded.map((page) => {
      const category = page.category || "";
      const filename = `${page.pageName || "untitled"}.md`;
      const path = category ? `${category}/${filename}` : filename;

      return {
        success: true,
        path,
        title: page.title,
      };
    });

    return {
      downloaded,
      failed: result.failed,
      duration: result.duration,
    };
  },
};

// ============================================================================
// OPTIONS BUILDER
// ============================================================================

/**
 * Get scraper options based on source configuration
 */
function getScraperOptions(config: SourceConfig) {
  const baseOptions = {
    baseUrl: config.baseUrl,
    docsPath: config.docsPath,
    outputDir: config.outputDir,
    concurrency: 10,
    useLlms: true,
    tryDocsSubdomain: false,
  };

  // Source-specific options
  if (config.name === "Claude Code") {
    return {
      ...baseOptions,
      llmsPaths: ["/docs/llms.txt"],
      linkPattern: CLAUDE_CODE_PATTERN,
    };
  }

  if (config.name === "Polymarket") {
    return {
      ...baseOptions,
      llmsPaths: ["/llms.txt"],
      linkPattern: GENERIC_PATTERN,
    };
  }

  if (config.name === "Bun") {
    return {
      ...baseOptions,
      llmsPaths: ["/docs/llms.txt", "/llms.txt"],
      linkPattern: GENERIC_PATTERN,
    };
  }

  // Default: use provided llmsTxtPath or try common paths
  return {
    ...baseOptions,
    llmsPaths: config.llmsTxtPath ? [config.llmsTxtPath] : ["/llms.txt", "/docs/llms.txt"],
    linkPattern: config.linkPattern || GENERIC_PATTERN,
  };
}
