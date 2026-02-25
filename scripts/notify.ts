#!/usr/bin/env bun
/**
 * Daily Doc Update Telegram Notifier
 *
 * Orchestrates:
 * 1. @ebowwa/cron-notifier - State tracking and scheduling
 * 2. @ebowwa/git-ops - Get git diff
 * 3. @ebowwa/ai - Generate LLM summary (GLMClient)
 * 4. @ebowwa/channel-telegram - Send to Telegram
 *
 * Usage:
 *   bun run notify           # Live send
 *   bun run notify --dry-run # Preview
 *   bun run notify --force   # Force run (skip schedule check)
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { getDiff } from "@ebowwa/git-ops";
import { GLMClient } from "@ebowwa/ai";
import {
  TelegramChannel,
  createTelegramConfigFromEnv,
} from "@ebowwa/channel-telegram";
import {
  isTimeToRun,
  getNextRun,
  formatDuration,
  updateJobState,
  type JobState,
  SCHEDULES,
} from "@ebowwa/cron-notifier";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run") || args.includes("--dry");
const forceRun = args.includes("--force") || args.includes("-f");

const STATE_FILE = join(process.cwd(), ".notify-state.json");
const SCHEDULE = SCHEDULES.DAILY; // 0 9 * * *

function loadState(): JobState {
  if (existsSync(STATE_FILE)) {
    try {
      const data = readFileSync(STATE_FILE, "utf-8");
      return JSON.parse(data);
    } catch {
      return { lastRun: null, nextRun: null, runCount: 0 };
    }
  }
  return { lastRun: null, nextRun: null, runCount: 0 };
}

function saveState(state: JobState): void {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

/**
 * Generate summary using @ebowwa/ai GLMClient
 */
async function summarizeChanges(data: {
  diffText: string;
  filesChanged: string[];
  additions: number;
  deletions: number;
}): Promise<string> {
  const prompt = `You are a technical documentation analyst. Summarize the following git changes for a developer.

Files changed (${data.filesChanged.length}):
${data.filesChanged.map((f) => `- ${f}`).join("\n")}

Stats: +${data.additions}/-${data.deletions}

Diff content (may be truncated):
\`\`\`
${data.diffText.slice(0, 5000) || "(no diff content)"}
\`\`\`

Provide a concise summary (under 250 words) covering:
1. What was updated
2. Key changes (new features, API changes, deprecations)
3. Action items if any

Format as a clean message with emoji headers. Be brief and actionable.`;

  try {
    const client = new GLMClient();
    const response = await client.chatCompletion(
      [{ role: "user", content: prompt }],
      { model: "GLM-4.7", maxTokens: 2000 }
    );

    const choice = response.choices[0];
    const message = choice?.message as any;
    return message?.content || message?.reasoning_content || "Failed to generate summary.";
  } catch (error) {
    console.error("LLM error:", error);

    if (error instanceof Error && error.message.includes("API key not found")) {
      return "No LLM API key configured. Set Z_AI_API_KEY, ZAI_API_KEY, or GLM_API_KEY.";
    }

    return `Error generating summary: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}

/**
 * Generate daily report
 */
async function generateDailyReport(data: {
  filesChanged: string[];
  additions: number;
  deletions: number;
  diffText: string;
  state: JobState;
}): Promise<string> {
  const date = new Date().toISOString().split("T")[0];
  const header = `*Daily Doc Updates - ${date}*\n_Run #${data.state.runCount + 1}_\n\n`;
  const stats =
    data.filesChanged.length > 0
      ? `📊 _${data.filesChanged.length} files changed (+${data.additions}/-${data.deletions})_\n\n`
      : `📊 _No changes detected_\n\n`;

  if (data.filesChanged.length === 0) {
    return header + stats + "No changes detected in the last 24 hours.";
  }

  const summary = await summarizeChanges(data);
  return header + stats + summary;
}

async function main() {
  console.log("Daily Doc Updates - Telegram Notifier\n");

  // Load state
  const state = loadState();
  const lastRun = state.lastRun ? new Date(state.lastRun) : null;
  const now = new Date();

  // Check schedule (skip if --force)
  if (!forceRun && !dryRun) {
    if (!isTimeToRun(SCHEDULE, lastRun, now)) {
      const nextRun = getNextRun(SCHEDULE, now);
      const timeUntil = formatDuration(nextRun.getTime() - now.getTime());
      console.log(`Not time to run yet. Next run in ${timeUntil} (${nextRun.toISOString()})`);
      process.exit(0);
    }
  }

  if (forceRun) {
    console.log("[FORCE] Running regardless of schedule\n");
  }

  // 1. Get git diff using @ebowwa/git-ops
  console.log("Getting git diff...");
  const gitDiff = await getDiff("HEAD~1", "HEAD", { cwd: process.cwd() });
  console.log(`Found ${gitDiff.filesChanged.length} files changed`);

  // 2. Generate report using @ebowwa/ai GLMClient
  console.log("Generating summary...");
  const report = await generateDailyReport({
    filesChanged: gitDiff.filesChanged,
    additions: gitDiff.additions,
    deletions: gitDiff.deletions,
    diffText: gitDiff.diffText,
    state,
  });

  // 3. Dry run or send to Telegram
  if (dryRun) {
    console.log("\n[DRY RUN] Would send:\n");
    console.log(`To: ${process.env.TELEGRAM_CHAT_ID}`);
    console.log(`Message:\n${report}`);
    console.log(`\nState: ${JSON.stringify(state, null, 2)}`);
    return;
  }

  // Get Telegram config
  const telegramConfig = createTelegramConfigFromEnv();
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramConfig.botToken || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    process.exit(1);
  }

  // Send using @ebowwa/channel-telegram
  console.log("Sending to Telegram...");
  const channel = new TelegramChannel(telegramConfig);
  const chatIdNum = parseInt(chatId, 10);

  try {
    // Try Markdown first, fall back to plain text if parsing fails
    try {
      await channel.sendMessage(chatIdNum, report, { parse_mode: "Markdown" });
    } catch (markdownError) {
      console.log("Markdown parse failed, sending as plain text...");
      await channel.sendMessage(chatIdNum, report);
    }
    console.log("Sent successfully!");

    // Update state after successful send
    const newState = updateJobState(state, SCHEDULE, now);
    saveState(newState);
    console.log(`Next run: ${newState.nextRun}`);
  } catch (error) {
    console.error("Failed to send:", error);
    process.exit(1);
  }
}

main().catch(console.error);
