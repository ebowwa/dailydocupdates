#!/usr/bin/env bun
/**
 * Daily Doc Update Telegram Notifier
 *
 * Compares TODAY's docs vs YESTERDAY's docs to show what CHANGED.
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
 * Get doc file path for a specific date
 */
function getDocFile(project: string, date: Date): string | null {
  const dailyDir = join(process.cwd(), "daily");
  const [year, month, day] = date.toISOString().split("T")[0].split("-");
  const filePath = join(dailyDir, project, year, month, `${day}.md`);
  return existsSync(filePath) ? filePath : null;
}

/**
 * Get all project directories
 */
function getProjects(): string[] {
  const dailyDir = join(process.cwd(), "daily");
  if (!existsSync(dailyDir)) return [];
  return readdirSync(dailyDir).filter((d) => {
    try {
      const stat = statSync(join(dailyDir, d));
      return stat.isDirectory();
    } catch {
      return false;
    }
  });
}

/**
 * Read doc content from file
 */
function readDocContent(filePath: string): string {
  try {
    return readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

/**
 * Get what changed between today and yesterday for a project
 */
function getDocChanges(project: string): {
  project: string;
  today: string;
  yesterday: string;
  hasChanges: boolean;
  isNew: boolean;
} {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayFile = getDocFile(project, today);
  const yesterdayFile = getDocFile(project, yesterday);

  const todayContent = todayFile ? readDocContent(todayFile) : "";
  const yesterdayContent = yesterdayFile ? readDocContent(yesterdayFile) : "";

  return {
    project,
    today: todayContent,
    yesterday: yesterdayContent,
    hasChanges: todayContent !== yesterdayContent && todayContent.length > 0,
    isNew: !yesterdayContent && todayContent.length > 0
  };
}

/**
 * Generate summary of CHANGES between today and yesterday
 */
async function summarizeChanges(allChanges: ReturnType<typeof getDocChanges>[]): Promise<string> {
  // Build comparison text for each project
  const comparisons = allChanges
    .filter(c => c.today.length > 0)
    .map(c => {
      const label = c.isNew ? "(NEW)" : c.hasChanges ? "(CHANGED)" : "(unchanged)";
      return `
### ${c.project.toUpperCase()} ${label}

TODAY:
${c.today.slice(0, 3500)}

${c.yesterday ? `YESTERDAY:
${c.yesterday.slice(0, 1500)}` : "(no previous version)"}
`;
    })
    .join("\n---\n");

  const prompt = `You are a senior developer writing for other developers. Analyze documentation changes and explain what matters for USING these libraries/SDKs.

${comparisons}

For each changed project, provide:

**NEW APIS/METHODS** - New functions, endpoints, or methods with their signatures
**BREAKING CHANGES** - Deprecated methods, changed signatures, removed features
**NEW PARAMETERS** - New options, flags, or config values
**BUG FIXES** - Issues that were resolved (if relevant to usage)
**USAGE EXAMPLES** - Code snippets showing how to use new features

Be TECHNICAL and SPECIFIC. Include:
- Actual method/endpoint names
- Parameter names and types
- Code examples where relevant
- Version numbers if mentioned

Skip boilerplate like "documentation was updated". Focus on what a developer needs to KNOW to use these changes.

Format each project as:
### PROJECT
- **New**: \`method_name(params)\` - what it does
- **Changed**: what changed and how to migrate
- **Fixed**: specific bugs resolved

Keep under 300 words total. Be concise but technically precise.`;

  try {
    const client = new GLMClient();
    // Use generateWithSystem to provide clear instructions
    const response = await client.generateWithSystem(
      "You are a senior developer. Respond directly with the technical summary. Do not show your reasoning process.",
      prompt,
      { model: "GLM-4.7", maxTokens: 2000 }
    );
    return response || "Failed to generate summary.";
  } catch (error) {
    console.error("LLM error:", error);
    if (error instanceof Error && error.message.includes("API key not found")) {
      return "No LLM API key configured. Set Z_AI_API_KEY.";
    }
    return `Error generating summary: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}

/**
 * Generate daily report from doc changes
 */
async function generateDailyReport(state: JobState): Promise<string> {
  const date = new Date().toISOString().split("T")[0];
  const projects = getProjects();

  const allChanges = projects.map(getDocChanges);
  const changedProjects = allChanges.filter(c => c.hasChanges || c.isNew);
  const newProjects = allChanges.filter(c => c.isNew);

  const header = `*Daily Doc Changes - ${date}*\n_Run #${state.runCount + 1}_\n\n`;
  const stats = `📚 ${projects.length} sources tracked | ${changedProjects.length} changed | ${newProjects.length} new\n\n`;

  if (changedProjects.length === 0) {
    return header + stats + "No documentation changes detected today.";
  }

  const summary = await summarizeChanges(allChanges);
  return header + stats + summary;
}

/**
 * Chunk a long text into smaller pieces that fit within Telegram's limit.
 * Prefers splitting at paragraph boundaries, then sentence, then word.
 * Never truncates - always returns all chunks.
 */
function chunkText(text: string, maxLen: number = 4000): string[] {
  if (text.length <= maxLen) {
    return [text];
  }

  const chunks: string[] = [];

  // First, try to split by sections (### headers)
  const sections = text.split(/(?=### )/g).filter(Boolean);

  let currentChunk = "";

  for (const section of sections) {
    // If adding this section would exceed limit
    if ((currentChunk + section).length > maxLen) {
      // If we have accumulated content, save it
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
        currentChunk = "";
      }

      // If the section itself is too long, we need to split it further
      if (section.length > maxLen) {
        const subChunks = splitLongSection(section, maxLen);
        chunks.push(...subChunks);
      } else {
        currentChunk = section;
      }
    } else {
      currentChunk += section;
    }
  }

  // Don't forget the last chunk
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Split a long section that exceeds the limit.
 * Tries paragraphs first, then sentences, then words.
 */
function splitLongSection(text: string, maxLen: number): string[] {
  const chunks: string[] = [];

  // Try splitting by double newlines (paragraphs)
  const paragraphs = text.split(/\n\n+/g);
  let currentChunk = "";

  for (const para of paragraphs) {
    if ((currentChunk + "\n\n" + para).length <= maxLen) {
      currentChunk = currentChunk ? currentChunk + "\n\n" + para : para;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = "";
      }

      // If single paragraph is too long, split by sentences
      if (para.length > maxLen) {
        const sentenceChunks = splitBySentences(para, maxLen);
        chunks.push(...sentenceChunks);
      } else {
        currentChunk = para;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Split text by sentences when paragraphs are too long.
 */
function splitBySentences(text: string, maxLen: number): string[] {
  const chunks: string[] = [];

  // Split by sentence boundaries (., !, ? followed by space or end)
  const sentences = text.split(/(?<=[.!?])\s+/g);
  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + " " + sentence).length <= maxLen) {
      currentChunk = currentChunk ? currentChunk + " " + sentence : sentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = "";
      }

      // If single sentence is too long, split by words
      if (sentence.length > maxLen) {
        const wordChunks = splitByWords(sentence, maxLen);
        chunks.push(...wordChunks);
      } else {
        currentChunk = sentence;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Last resort: split by words when sentences are too long.
 */
function splitByWords(text: string, maxLen: number): string[] {
  const chunks: string[] = [];
  const words = text.split(/\s+/g);
  let currentChunk = "";

  for (const word of words) {
    if ((currentChunk + " " + word).length <= maxLen) {
      currentChunk = currentChunk ? currentChunk + " " + word : word;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
      }
      currentChunk = word;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Send a message to Telegram, falling back to plain text if markdown fails.
 */
async function sendTelegramMessage(
  channel: TelegramChannel,
  chatId: number,
  text: string
): Promise<void> {
  try {
    await channel.sendMessage(chatId, text, { parse_mode: "Markdown" });
  } catch {
    // Markdown parsing failed, try plain text
    await channel.sendMessage(chatId, text);
  }
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

  // Compare today vs yesterday
  console.log("Comparing today's docs vs yesterday's...");
  const report = await generateDailyReport(state);

  // Dry run or send to Telegram
  if (dryRun) {
    console.log("\n[DRY RUN] Would send:\n");
    console.log(`To: ${process.env.TELEGRAM_CHAT_ID}`);
    const chunks = chunkText(report);
    console.log(`Chunks: ${chunks.length}`);
    chunks.forEach((chunk, i) => {
      console.log(`\n--- Chunk ${i + 1}/${chunks.length} (${chunk.length} chars) ---\n`);
      console.log(chunk);
    });
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

  // Chunk the message into Telegram-safe pieces
  const chunks = chunkText(report);
  console.log(`Split into ${chunks.length} message(s)`);

  try {
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`Sending chunk ${i + 1}/${chunks.length} (${chunk.length} chars)...`);
      await sendTelegramMessage(channel, chatIdNum, chunk);

      // Small delay between messages to avoid rate limiting
      if (i < chunks.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 100));
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
