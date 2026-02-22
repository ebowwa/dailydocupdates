/**
 * Base utilities for documentation scrapers
 *
 * Shared functionality used by all source scrapers:
 * - Date formatting
 * - Directory management
 * - Report generation
 * - README updates
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import type { SourceConfig, ScrapeResult, DownloadResult } from "@ebowwa/markdown-docs-scraper/scrapers";

// Re-export types from package for convenience
export type { SourceConfig, ScrapeResult, DownloadResult } from "@ebowwa/markdown-docs-scraper/scrapers";

// ============================================================================
// LOCAL TYPES (GitHub-specific, not in package)
// ============================================================================

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  html_url: string;
  published_at: string;
  body: string;
}

export interface GitHubPR {
  number: number;
  title: string;
  html_url: string;
  merged_at: string;
}

export interface GitHubData {
  commits: GitHubCommit[];
  releases: GitHubRelease[];
  pullRequests: GitHubPR[];
}

export interface DailyReportOptions {
  source: SourceConfig;
  result: ScrapeResult;
  date: string;
  github?: GitHubData;
  releaseNotes?: string[];
}

// ============================================================================
// DATE UTILITIES
// ============================================================================

/** Format date as YYYY-MM-DD */
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/** Get year/month/day parts for directory structure */
export function getDateParts(date: Date): { year: string; month: string; day: string } {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return { year, month, day };
}

// ============================================================================
// FILE UTILITIES
// ============================================================================

/** Create directory recursively */
export async function ensureDir(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

// ============================================================================
// REPORT UTILITIES
// ============================================================================

/** Generate daily markdown report */
export function generateDailyReport(options: DailyReportOptions): string {
  const { source, result, date, github, releaseNotes } = options;

  let md = `# ${source.name} Documentation Update - ${date}\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;

  // Summary
  md += `## Summary\n\n`;
  const parts = [];

  if (github) {
    if (github.commits.length > 0) parts.push(`${github.commits.length} commit${github.commits.length > 1 ? "s" : ""}`);
    if (github.releases.length > 0) parts.push(`${github.releases.length} release${github.releases.length > 1 ? "s" : ""}`);
    if (github.pullRequests.length > 0) parts.push(`${github.pullRequests.length} PR${github.pullRequests.length > 1 ? "s" : ""}`);
  }

  if (result.downloaded.length > 0) parts.push(`${result.downloaded.length} doc page${result.downloaded.length > 1 ? "s" : ""} downloaded`);

  if (releaseNotes && releaseNotes.length > 0) {
    parts.push(`${releaseNotes.length} release note${releaseNotes.length > 1 ? "s" : ""}`);
  }

  if (parts.length === 0) {
    md += `No updates detected in the last 24 hours.\n\n`;
  } else {
    md += `Daily updates: ${parts.join(", ")}.\n\n`;
  }

  // GitHub Commits
  if (github?.commits && github.commits.length > 0) {
    md += `## GitHub Commits (${github.commits.length})\n\n`;
    for (const commit of github.commits) {
      md += `- [${commit.sha}](${commit.html_url}) - ${commit.commit.message}\n`;
      md += `  - by ${commit.commit.author.name} at ${new Date(commit.commit.author.date).toISOString()}\n`;
    }
    md += `\n`;
  } else if (source.github?.includeCommits) {
    md += `## GitHub Commits\n\nNo commits in the last 24 hours.\n\n`;
  }

  // Releases
  if (github?.releases && github.releases.length > 0) {
    md += `## Releases (${github.releases.length})\n\n`;
    for (const release of github.releases) {
      md += `- [${release.tag_name}](${release.html_url}) - ${release.name}\n`;
      md += `  - ${release.body}\n`;
      md += `  - Published: ${new Date(release.published_at).toISOString()}\n`;
    }
    md += `\n`;
  } else if (source.github?.includeReleases) {
    md += `## Releases\n\nNo new releases in the last 24 hours.\n\n`;
  }

  // Pull Requests
  if (github?.pullRequests && github.pullRequests.length > 0) {
    md += `## Merged Pull Requests (${github.pullRequests.length})\n\n`;
    for (const pr of github.pullRequests) {
      md += `- [#${pr.number}](${pr.html_url}) - ${pr.title}\n`;
      md += `  - Merged: ${new Date(pr.merged_at).toISOString()}\n`;
    }
    md += `\n`;
  } else if (source.github?.includePRs) {
    md += `## Merged Pull Requests\n\nNo PRs merged in the last 24 hours.\n\n`;
  }

  // Documentation Downloads
  md += `## Documentation Pages\n\n`;

  if (result.downloaded.length > 0) {
    md += `### Downloaded (${result.downloaded.length})\n\n`;

    // Group by category
    const byCategory: Record<string, DownloadResult[]> = {};
    for (const doc of result.downloaded) {
      const category = doc.path.split("/")[0] || "root";
      if (!byCategory[category]) byCategory[category] = [];
      byCategory[category].push(doc);
    }

    for (const [category, docs] of Object.entries(byCategory).sort()) {
      md += `#### ${category} (${docs.length})\n\n`;
      for (const doc of docs.slice(0, 20)) {
        const title = doc.title || doc.path;
        md += `- [${title}](${doc.path})\n`;
      }
      if (docs.length > 20) {
        md += `\n*... and ${docs.length - 20} more*\n`;
      }
      md += `\n`;
    }
  }

  if (result.failed.length > 0) {
    md += `### Failed to Download (${result.failed.length})\n\n`;
    for (const fail of result.failed.slice(0, 10)) {
      md += `- ${fail.url}: ${fail.error}\n`;
    }
    if (result.failed.length > 10) {
      md += `\n*... and ${result.failed.length - 10} more failures*\n`;
    }
    md += `\n`;
  }

  // Release Notes
  if (releaseNotes && releaseNotes.length > 0) {
    md += `## Platform Release Notes\n\n`;
    for (const note of releaseNotes.slice(0, 10)) {
      md += `- ${note}\n`;
    }
    if (releaseNotes.length > 10) {
      md += `\n*... and ${releaseNotes.length - 10} more entries*\n`;
    }
    md += `\n`;
  }

  // Footer
  md += `---\n`;
  md += `*Generated by dailydocupdates automation*\n`;
  md += `*Data sourced from [${source.baseUrl}](${source.baseUrl})*\n`;

  return md;
}

/** Save report to file */
export async function saveReport(markdown: string, date: Date, sourceDir: string): Promise<string> {
  const { year, month, day } = getDateParts(date);
  const dir = `${sourceDir}/${year}/${month}`;
  const filepath = `${dir}/${day}.md`;

  await ensureDir(dir);
  await Bun.write(filepath, markdown);

  return filepath;
}

/** Update README.md with last updated date */
export async function updateReadme(readmePath: string, docCount: number): Promise<void> {
  const today = formatDate(new Date());

  try {
    let readme = await readFile(readmePath, "utf-8");

    // Update Last Updated line
    readme = readme.replace(
      /\*\*Last Updated:\*\* \d{4}-\d{2}-\d{2}/,
      `**Last Updated:** ${today}`
    );

    // Update doc count if present
    readme = readme.replace(
      /(\d+)\+ downloaded documentation files/,
      `${docCount}+ downloaded documentation files`
    );

    await writeFile(readmePath, readme, "utf-8");
    console.log(`Updated README.md: Last Updated ${today}, ${docCount} docs`);
  } catch (error) {
    console.error("Error updating README.md:", error);
  }
}
