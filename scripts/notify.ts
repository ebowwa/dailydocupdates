#!/usr/bin/env bun
/**
 * Daily Doc Update Telegram Notifier
 *
 * Uses @ebowwa/cron-notifier for:
 * - Git diff extraction
 * - LLM summarization (Z.AI GLM-4.7)
 * - Telegram notification
 *
 * Usage:
 *   bun run notify           # Live send
 *   bun run notify --dry-run # Preview
 */

import { notifyDaily, createNotifier } from "@ebowwa/cron-notifier";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run") || args.includes("--dry");

async function main() {
  console.log("Daily Doc Updates - Telegram Notifier\n");

  const result = await notifyDaily({
    git: { cwd: process.cwd() },
    telegram: { parseMode: "Markdown", disablePreview: true },
    dryRun,
  });

  if (!result.success) {
    console.error("Failed:", result.error);
    process.exit(1);
  }

  if (dryRun) {
    console.log("\n[DRY RUN] Would send:\n");
    console.log(result.message);
  } else {
    console.log("Sent successfully!");
  }
}

main().catch(console.error);
