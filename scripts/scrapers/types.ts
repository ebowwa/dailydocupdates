/**
 * Scraper Types
 *
 * Core types for the composable scraper architecture.
 */

// ============================================================================
// SOURCE TYPES
// ============================================================================

/** Supported documentation source types */
export type SourceType = "llms-txt" | "github-raw";

// ============================================================================
// SCRAPER INTERFACE
// ============================================================================

/** Result from scraping a source */
export interface ScrapeResult {
  downloaded: DownloadResult[];
  failed: Array<{ url: string; error: string }>;
  duration?: number;
}

/** Individual download result */
export interface DownloadResult {
  success: boolean;
  path: string;
  title?: string;
}

/** Scraper interface - all scrapers must implement this */
export interface Scraper {
  /** Source type identifier */
  type: SourceType;

  /** Scrape documentation from a source */
  scrape(config: SourceConfig): Promise<ScrapeResult>;
}

// ============================================================================
// SOURCE CONFIG
// ============================================================================

/** Source configuration */
export interface SourceConfig {
  /** Display name */
  name: string;

  /** Source type - determines which scraper to use */
  sourceType: SourceType;

  /** Base URL for the documentation */
  baseUrl: string;

  /** Path to docs (e.g., /docs, /docs/en) */
  docsPath: string;

  /** Output directory for downloaded docs */
  outputDir: string;

  /** Output directory for daily reports */
  reportDir: string;

  /** llms.txt path (for llms-txt sources) */
  llmsTxtPath?: string;

  /** Custom link pattern for llms.txt parsing */
  linkPattern?: RegExp;

  /** GitHub config (for github-raw sources or GitHub API data) */
  github?: {
    repo: string;
    includeCommits: boolean;
    includeReleases: boolean;
    includePRs: boolean;
  };
}
