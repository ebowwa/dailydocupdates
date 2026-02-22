/**
 * Claude Code documentation source
 *
 * Configuration and GitHub API integration for Claude Code docs.
 * Sources:
 * - GitHub repo (commits, releases, PRs)
 * - Documentation site (via llms.txt)
 * - Platform release notes
 */

import type { SourceConfig } from "@ebowwa/markdown-docs-scraper/scrapers";
import type { GitHubCommit, GitHubRelease, GitHubPR } from "../base";

// ============================================================================
// SOURCE CONFIGURATION
// ============================================================================

export const claudeCodeSource: SourceConfig = {
  name: "Claude Code",
  sourceType: "llms-txt",
  baseUrl: "https://code.claude.com",
  docsPath: "/docs/en",
  outputDir: "docs/claude",
  reportDir: "daily/claude-code",
  llmsTxtPath: "/docs/llms.txt",
  github: {
    repo: "anthropics/claude-code",
    includeCommits: true,
    includeReleases: true,
    includePRs: true,
  },
};

// Release notes URL (separate from main docs)
const RELEASE_NOTES_URL = "https://platform.claude.com/docs/en/release-notes/overview";

// ============================================================================
// GITHUB API FUNCTIONS
// ============================================================================

/** Fetch GitHub commits from last 24 hours */
export async function fetchRecentCommits(repo: string): Promise<GitHubCommit[]> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const url = `https://api.github.com/repos/${repo}/commits?since=${since}&per_page=100`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "claude-code-docs-scraper",
      },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }

    const commits = await response.json();
    return commits.map((commit: any) => ({
      sha: commit.sha.substring(0, 7),
      commit: {
        message: commit.commit.message.split("\n")[0],
        author: {
          name: commit.commit.author.name,
          date: commit.commit.author.date,
        },
      },
      html_url: commit.html_url,
    }));
  } catch (error) {
    console.error("Error fetching commits:", error);
    return [];
  }
}

/** Fetch recent GitHub releases */
export async function fetchRecentReleases(repo: string): Promise<GitHubRelease[]> {
  const url = `https://api.github.com/repos/${repo}/releases?per_page=10`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "claude-code-docs-scraper",
      },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }

    const releases = await response.json();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    return releases
      .filter((r: any) => r.published_at && new Date(r.published_at) > oneDayAgo)
      .map((release: any) => ({
        tag_name: release.tag_name,
        name: release.name || release.tag_name,
        html_url: release.html_url,
        published_at: release.published_at,
        body: release.body?.substring(0, 200) + "..." || "",
      }));
  } catch (error) {
    console.error("Error fetching releases:", error);
    return [];
  }
}

/** Fetch recently merged PRs */
export async function fetchRecentPRs(repo: string): Promise<GitHubPR[]> {
  const url = `https://api.github.com/repos/${repo}/pulls?state=closed&sort=updated&per_page=30`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "claude-code-docs-scraper",
      },
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }

    const prs = await response.json();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    return prs
      .filter((pr: any) => pr.merged_at && new Date(pr.merged_at) > oneDayAgo)
      .map((pr: any) => ({
        number: pr.number,
        title: pr.title,
        html_url: pr.html_url,
        merged_at: pr.merged_at,
      }));
  } catch (error) {
    console.error("Error fetching PRs:", error);
    return [];
  }
}

/** Check release notes for updates */
export async function checkReleaseNotes(): Promise<string[]> {
  const notes: string[] = [];

  try {
    const response = await fetch(RELEASE_NOTES_URL);
    if (!response.ok) {
      console.warn("Failed to fetch release notes:", response.status);
      return [];
    }

    const html = await response.text();
    const headingRegex = /<h[23][^>]*>(.*?)<\/h[23]>/gi;
    let match;

    while ((match = headingRegex.exec(html)) !== null) {
      const text = match[1].replace(/<[^>]*>/g, "").trim();
      if (text && text.length > 0) {
        notes.push(text);
      }
    }

    console.log(`Found ${notes.length} release note entries`);
  } catch (error) {
    console.error("Error checking release notes:", error);
  }

  return notes;
}
