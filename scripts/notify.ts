#!/usr/bin/env bun
/**
 * Daily Doc Update Telegram Notifier
 *
 * Summarizes the CONTENT of scraped documentation, not just git diffs.
 *
 * Usage:
 *   bun run notify           # Live send
 *   bun run notify --dry-run # Preview
 *   bun run notify --force   # Force run (skip schedule check)
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
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
const SCHEDULE = SCHEDULES.DAILY;

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
 * Get today's doc files from daily/ directory
 */
function getTodaysDocFiles(): string[] {
  const today = new Date().toISOString().split("T")[0];
  const [year, month, day] = today.split("-");
  const dailyDir = join(process.cwd(), "daily");

  const files: string[] = [];

  if (!existsSync(dailyDir)) return files;

  // Read all subdirectories (bun, claude, kalshi, polymarket, rust)
  const dirs = readdirSync(dailyDir).filter((d) => {
    const stat = statSync(join(dailyDir, d));
    return stat.isDirectory();
  });

  for (const dir of dirs) {
    // Look for today's file: daily/{dir}/{year}/{month}/{day}.md
    const todayFile = join(dailyDir, dir, year, month, `${day}.md`);
    if (existsSync(todayFile)) {
      files.push(todayFile);
    }
  }

  return files;
}

/**
 * Read doc content from file
 */
function readDocContent(filePath: string): string {
  try {
    const content = readFileSync(filePath, "utf-8");
    // Get the project name from path
    const parts = filePath.split("/");
    const projectName = parts[parts.indexOf("daily") + 1] || "unknown";
    return `\n### ${projectName.toUpperCase()}\n\n${content.slice(0, 3000)}`;
  } catch {
    return "";
  }
}

/**
 * Generate summary of doc CONTENT (not git diffs)
 */
async function summarizeDocs(docContents: string): Promise<string> {
  const prompt = `You are a technical documentation analyst. Summarize the CONTENT of these documentation files for a developer.

${docContents}

For EACH project, provide a 1-2 sentence summary of:
- Key features/APIs documented
- Notable guides or tutorials

Keep it VERY concise. Format as:

### PROJECT_NAME
Brief summary here.

Total output must be under 150 words. Be specific, not vague.`;

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
      return "No LLM API key configured. Set Z_AI_API_KEY.";
    }
    return `Error generating summary: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}

/**
 * Generate daily report from doc content
 */
async function generateDailyReport(docFiles: string[], state: JobState): Promise<string> {
  const date = new Date().toISOString().split("T")[0];
  const header = `*Daily Docs - ${date}*\n_Run #${state.runCount + 1}_\n\n`;
  const stats = `📚 _${docFiles.length} documentation sources scraped_\n\n`;

  if (docFiles.length === 0) {
    return header + stats + "No doc files found for today.";
  }

  // Read all doc content
  const docContents = docFiles
    .map(readDocContent)
    .filter((c) => c.length > 0)
    .join("\n---\n");

  const summary = await summarizeDocs(docContents);
  return header + stats + summary;
}

async function main() {
  console.log("Daily Doc Updates - Telegram Notifier\n");

  const state = loadState();
  const lastRun = state.lastRun ? new Date(state.lastRun) : null;
  const now = new Date();

  // Check schedule (skip if --force)
  if (!forceRun && !dryRun) {
    if (!isTimeToRun(SCHEDULE, lastRun, now)) {
      const nextRun = getNextRun(SCHEDULE, now);
      const timeUntil = formatDuration(nextRun.getTime() - now.getTime());
      console.log(`Not time to run yet. Next run in ${timeUntil}`);
      process.exit(0);
    }
  }

  if (forceRun) {
    console.log("[FORCE] Running regardless of schedule\n");
  }

  // Get today's doc files
  console.log("Reading today's documentation...");
  const docFiles = getTodaysDocFiles();
  console.log(`Found ${docFiles.length} doc files for today`);

  // Generate report from doc content
  console.log("Generating summary...");
  const report = await generateDailyReport(docFiles, state);

  // Dry run or send to Telegram
  if (dryRun) {
    console.log("\n[DRY RUN] Would send:\n");
    console.log(`To: ${process.env.TELEGRAM_CHAT_ID}`);
    console.log(`Message:\n${report}`);
    return;
  }

  const telegramConfig = createTelegramConfigFromEnv();
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramConfig.botToken || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    process.exit(1);
  }

  console.log("Sending to Telegram...");
  const channel = new TelegramChannel(telegramConfig);
  const chatIdNum = parseInt(chatId, 10);

  // Telegram has 4096 char limit - split if needed
  const MAX_LEN = 4000;

  try {
    if (report.length <= MAX_LEN) {
      try {
        await channel.sendMessage(chatIdNum, report, { parse_mode: "Markdown" });
      } catch {
        await channel.sendMessage(chatIdNum, report);
      }
    } else {
      // Split into parts
      const parts = report.split(/(?=### )/g).filter(Boolean);
      let currentPart = "";

      for (const part of parts) {
        if ((currentPart + part).length > MAX_LEN && currentPart) {
          try {
            await channel.sendMessage(chatIdNum, currentPart, { parse_mode: "Markdown" });
          } catch {
            await channel.sendMessage(chatIdNum, currentPart);
          }
          currentPart = part;
        } else {
          currentPart += part;
        }
      }

      if (currentPart) {
        try {
          await channel.sendMessage(chatIdNum, currentPart, { parse_mode: "Markdown" });
        } catch {
          await channel.sendMessage(chatIdNum, currentPart);
        }
      }
    }
    console.log("Sent successfully!");

    const newState = updateJobState(state, SCHEDULE, now);
    saveState(newState);
    console.log(`Next run: ${newState.nextRun}`);
  } catch (error) {
    console.error("Failed to send:", error);
    process.exit(1);
  }
}

main().catch(console.error);
