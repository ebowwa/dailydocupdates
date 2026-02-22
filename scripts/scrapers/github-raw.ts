/**
 * GitHub Raw Scraper
 *
 * Downloads markdown files directly from GitHub repositories via raw content URLs.
 * Uses GitHub API to list files, then fetches each from raw.githubusercontent.com
 */

import type { Scraper, SourceConfig, ScrapeResult, DownloadResult } from "./types";

// ============================================================================
// GITHUB API TYPES
// ============================================================================

interface GitHubContent {
  name: string;
  path: string;
  download_url: string;
  type: string;
}

// ============================================================================
// GITHUB RAW SCRAPER
// ============================================================================

export const githubRawScraper: Scraper = {
  type: "github-raw",

  async scrape(config: SourceConfig): Promise<ScrapeResult> {
    const startTime = Date.now();
    const downloaded: DownloadResult[] = [];
    const failed: Array<{ url: string; error: string }> = [];

    if (!config.github?.repo) {
      throw new Error(`GitHub source "${config.name}" missing github.repo config`);
    }

    // Get list of markdown files from GitHub API
    const files = await fetchGitHubMarkdownFiles(
      config.github.repo,
      config.docsPath.replace(/^\//, "")
    );

    // Download each file
    for (const file of files) {
      const content = await fetchGitHubRawContent(config.github.repo, file.path);

      if (content) {
        downloaded.push({
          success: true,
          path: file.name,
          title: extractTitle(content) || file.name.replace(".md", ""),
        });

        // Save the file
        await saveFile(config.outputDir, file.name, content);
      } else {
        failed.push({
          url: `https://raw.githubusercontent.com/${config.github.repo}/main/${file.path}`,
          error: "Failed to fetch content",
        });
      }
    }

    return {
      downloaded,
      failed,
      duration: Date.now() - startTime,
    };
  },
};

// ============================================================================
// GITHUB API FUNCTIONS
// ============================================================================

/**
 * Fetch list of markdown files from GitHub repo directory
 */
async function fetchGitHubMarkdownFiles(
  repo: string,
  path: string
): Promise<GitHubContent[]> {
  const url = `https://api.github.com/repos/${repo}/contents/${path}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "@ebowwa/markdown-docs-scraper",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const contents: GitHubContent[] = await response.json();

  // Filter for markdown files only
  return contents.filter(
    (item) => item.type === "file" && item.name.endsWith(".md")
  );
}

/**
 * Download markdown content from GitHub raw URL
 */
async function fetchGitHubRawContent(
  repo: string,
  path: string
): Promise<string | null> {
  const url = `https://raw.githubusercontent.com/${repo}/main/${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/plain",
        "User-Agent": "@ebowwa/markdown-docs-scraper",
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

/**
 * Extract title from markdown content
 */
function extractTitle(markdown: string): string | null {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : null;
}

/**
 * Save file to disk
 */
async function saveFile(
  outputDir: string,
  filename: string,
  content: string
): Promise<void> {
  const fs = await import("fs/promises");
  const path = await import("path");

  const outputPath = path.join(outputDir, filename);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, content, "utf-8");
}
