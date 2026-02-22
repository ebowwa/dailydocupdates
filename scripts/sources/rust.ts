/**
 * Rust Book documentation source
 *
 * Downloads markdown files directly from GitHub raw content.
 */

import type { SourceConfig } from "../scrapers/types";

// ============================================================================
// SOURCE CONFIGURATION
// ============================================================================

export const rustSource: SourceConfig = {
  name: "Rust",
  sourceType: "github-raw",
  baseUrl: "https://github.com/rust-lang/book",
  docsPath: "src",
  outputDir: "docs/rust",
  reportDir: "daily/rust",
  github: {
    repo: "rust-lang/book",
    includeCommits: false,
    includeReleases: false,
    includePRs: false,
  },
};
