#!/usr/bin/env bun
/**
 * Multi-Source Documentation Scraper
 *
 * Fetches and mirrors full markdown documentation from multiple sources:
 * 1. Claude Code (GitHub + docs site via llms.txt)
 * 2. Polymarket (docs site via llms.txt)
 * 3. Bun (docs site via llms.txt)
 * 4. Rust (GitHub raw content)
 *
 * Uses composable scrapers from @ebowwa/markdown-docs-scraper
 */

import {
  formatDate,
  generateDailyReport,
  saveReport,
  updateReadme,
} from "./base";
import { scrapeSource } from "@ebowwa/markdown-docs-scraper/scrapers";
import type { SourceConfig, ScrapeResult } from "@ebowwa/markdown-docs-scraper/scrapers";
import {
  claudeCodeSource,
  polymarketSource,
  bunSource,
  rustSource,
  fetchRecentCommits,
  fetchRecentReleases,
  fetchRecentPRs,
  checkReleaseNotes,
} from "./sources";

// ============================================================================
// ORCHESTRATOR
// ============================================================================

/**
 * Process a single source - scrape docs and fetch GitHub data
 */
async function processSource(config: SourceConfig): Promise<ScrapeResult & { github?: any; releaseNotes?: string[] }> {
  console.log(`\n📁 Scraping ${config.name}...`);

  // 1. Scrape docs using the registry (dispatches to correct scraper by sourceType)
  const result = await scrapeSource(config);

  console.log(`  Downloaded: ${result.downloaded.length} pages`);
  console.log(`  Failed: ${result.failed.length} pages`);

  // 2. Fetch GitHub data if configured
  let githubData = undefined;
  if (config.github) {
    console.log(`  Fetching GitHub data for ${config.github.repo}...`);

    const [commits, releases, prs] = await Promise.all([
      config.github.includeCommits ? fetchRecentCommits(config.github.repo) : Promise.resolve([]),
      config.github.includeReleases ? fetchRecentReleases(config.github.repo) : Promise.resolve([]),
      config.github.includePRs ? fetchRecentPRs(config.github.repo) : Promise.resolve([]),
    ]);

    githubData = {
      commits,
      releases,
      pullRequests: prs,
    };

    console.log(`  Commits: ${commits.length}`);
    console.log(`  Releases: ${releases.length}`);
    console.log(`  PRs: ${prs.length}`);
  }

  // 3. Check release notes (Claude Code only)
  let releaseNotes = undefined;
  if (config.name === "Claude Code") {
    releaseNotes = await checkReleaseNotes();
  }

  return {
    ...result,
    github: githubData,
    releaseNotes,
  };
}

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

async function main() {
  console.log("🚀 Multi-Source Documentation Scraper\n");

  const today = new Date();
  const dateStr = formatDate(today);

  // Define all sources
  const sources = [claudeCodeSource, polymarketSource, bunSource, rustSource];

  // Run all sources in parallel
  const results = await Promise.all(
    sources.map(async (source) => {
      const result = await processSource(source);

      // Generate and save report
      const markdown = generateDailyReport({
        source,
        result,
        date: dateStr,
        github: result.github,
        releaseNotes: result.releaseNotes,
      });

      const filepath = await saveReport(markdown, today, source.reportDir);
      console.log(`  Report saved to: ${filepath}`);

      return { source, result };
    })
  );

  // Update README with total doc count
  const totalDocs = results.reduce((sum, { result }) => sum + result.downloaded.length, 0);
  await updateReadme("README.md", totalDocs);

  // Print summary
  console.log("\n✅ Scraping Complete!\n");
  console.log("Summary:");
  for (const { source, result } of results) {
    console.log(`  ${source.name}: ${result.downloaded.length} docs downloaded`);
  }
  console.log(`  Total: ${totalDocs} docs`);
}

main().catch(console.error);
