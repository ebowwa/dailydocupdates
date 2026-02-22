/**
 * Source exports
 *
 * Re-exports all source configurations and their associated functions.
 */

// Claude Code source
export {
  claudeCodeSource,
  fetchRecentCommits,
  fetchRecentReleases,
  fetchRecentPRs,
  checkReleaseNotes,
} from "./claude-code";

// Polymarket source
export { polymarketSource } from "./polymarket";

// Bun source
export { bunSource } from "./bun";

// Rust source
export { rustSource } from "./rust";

// Kalshi source
export { kalshiSource } from "./kalshi";

// Re-export types from package
export type { SourceConfig, SourceType } from "@ebowwa/markdown-docs-scraper/scrapers";

// Re-export GitHub types from base
export type { GitHubCommit, GitHubRelease, GitHubPR } from "../base";
