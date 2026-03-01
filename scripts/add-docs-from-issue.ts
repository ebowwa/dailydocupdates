#!/usr/bin/env bun
/**
 * Add docs from GitHub issue using GLM-4.7
 *
 * WIP: Requires ZAI_API_KEY secret to be set before use
 *
 * Triggered by: GitHub Action on new issues
 * Uses: Z.AI GLM-4.7 to parse issue and extract doc source
 *
 * Setup:
 * 1. Add ZAI_API_KEY to repo secrets (Settings → Secrets → Actions)
 * 2. Remove `if: false &&` from workflow to enable
 * 3. Create issue: "Add X docs" with URL in body
 */

import { GLMClient } from "@ebowwa/ai";
import { scrapeMarkdownDocs, type ScraperOptions } from "@ebowwa/markdown-docs-scraper";
import { writeFileSync } from "fs";

// ============================================================================
// TYPES
// ============================================================================

interface ParsedIssue {
  docName: string;        // e.g., "Z.AI", "OpenAI"
  docUrl: string;         // e.g., "https://docs.z.ai"
  llmsPath: string;       // e.g., "/llms.txt" or "/docs/llms.txt"
  outputDir: string;      // e.g., "docs/zai"
  confidence: number;     // 0-1 confidence score
  error?: string;
}

// ============================================================================
// GLM-4.7 CLIENT
// ============================================================================

const glm = new GLMClient();

// ============================================================================
// ISSUE PARSING
// ============================================================================

async function parseIssueWithGLM(title: string, body: string): Promise<ParsedIssue> {
  const prompt = `You are a documentation scraper configuration assistant.

Given a GitHub issue requesting documentation to be added, extract the following information:

1. **docName**: Short name for the documentation (e.g., "zai", "openai", "stripe")
2. **docUrl**: The base URL for the documentation (e.g., "https://docs.z.ai")
3. **llmsPath**: The path to llms.txt (usually "/llms.txt" or "/docs/llms.txt")
4. **outputDir**: Directory to save docs (e.g., "docs/zai")

Respond in JSON format only:
{
  "docName": "...",
  "docUrl": "...",
  "llmsPath": "...",
  "outputDir": "...",
  "confidence": 0.95
}

If you cannot determine any field, set confidence to 0 and explain in an "error" field.

Issue Title: ${title}
Issue Body: ${body || "(no body)"}`;

  try {
    const response = await glm.generate(prompt, {
      model: "GLM-4.7",
    });

    const result = JSON.parse(response || "{}");
    return result as ParsedIssue;
  } catch (error) {
    return {
      docName: "",
      docUrl: "",
      llmsPath: "",
      outputDir: "",
      confidence: 0,
      error: `GLM-4.7 parsing failed: ${error}`,
    };
  }
}

// ============================================================================
// URL DISCOVERY
// ============================================================================

async function discoverLlmsTxt(baseUrl: string, llmsPath: string): Promise<string | null> {
  const paths = [
    llmsPath,
    "/llms.txt",
    "/docs/llms.txt",
  ];

  // Try docs subdomain too
  try {
    const url = new URL(baseUrl);
    if (!url.hostname.startsWith("docs.")) {
      paths.push(`https://docs.${url.hostname}/llms.txt`);
      paths.push(`https://docs.${url.hostname}/docs/llms.txt`);
    }
  } catch {}

  for (const path of paths) {
    const fullUrl = path.startsWith("http") ? path : `${baseUrl}${path}`;
    try {
      const response = await fetch(fullUrl);
      if (response.ok) {
        console.log(`Found llms.txt at ${fullUrl}`);
        return fullUrl;
      }
    } catch {}
  }

  return null;
}

// ============================================================================
// SOURCE FILE GENERATION
// ============================================================================

function generateSourceConfig(parsed: ParsedIssue): string {
  return `/**
 * ${parsed.docName} documentation source
 *
 * Auto-generated from GitHub issue
 */

import type { SourceConfig } from "@ebowwa/markdown-docs-scraper/scrapers";

export const ${parsed.docName.toLowerCase().replace(/[^a-z0-9]/g, "")}Source: SourceConfig = {
  name: "${parsed.docName}",
  sourceType: "llms-txt",
  baseUrl: "${parsed.docUrl}",
  docsPath: "",
  outputDir: "${parsed.outputDir}",
  reportDir: "daily/${parsed.docName.toLowerCase().replace(/[^a-z0-9]/g, "")}",
  llmsTxtPath: "${parsed.llmsPath}",
};
`;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const issueTitle = process.env.ISSUE_TITLE || "";
  const issueBody = process.env.ISSUE_BODY || "";
  const issueNumber = process.env.ISSUE_NUMBER || "unknown";

  console.log(`Processing issue #${issueNumber}: ${issueTitle}`);

  // Step 1: Parse issue with GLM-4.7
  console.log("\n[1/4] Parsing issue with GLM-4.7...");
  const parsed = await parseIssueWithGLM(issueTitle, issueBody);

  if (parsed.confidence < 0.5 || parsed.error) {
    const errorMsg = parsed.error || "Could not confidently parse the issue";
    console.error(`Error: ${errorMsg}`);
    writeFileSync("/tmp/doc-result.txt", `❌ **Failed to add docs**

${errorMsg}

Please provide:
- Documentation name (e.g., "Z.AI")
- Documentation URL (e.g., "https://docs.z.ai")
- (Optional) llms.txt path (default: "/llms.txt")
`);
    process.exit(1);
  }

  console.log(`Parsed: ${JSON.stringify(parsed, null, 2)}`);

  // Step 2: Discover llms.txt
  console.log("\n[2/4] Discovering llms.txt...");
  const llmsUrl = await discoverLlmsTxt(parsed.docUrl, parsed.llmsPath);

  if (!llmsUrl) {
    console.error(`Could not find llms.txt at ${parsed.docUrl}`);
    writeFileSync("/tmp/doc-result.txt", `❌ **Failed to add docs**

Could not find \`llms.txt\` at ${parsed.docUrl}

Tried:
- ${parsed.docUrl}/llms.txt
- ${parsed.docUrl}/docs/llms.txt
- docs subdomain variants

Please verify the documentation site has an \`llms.txt\` file.
`);
    process.exit(1);
  }

  // Step 3: Scrape docs
  console.log("\n[3/4] Scraping documentation...");
  const options: ScraperOptions = {
    baseUrl: parsed.docUrl,
    docsPath: "",
    outputDir: parsed.outputDir,
    llmsPaths: [parsed.llmsPath],
    concurrency: 10,
  };

  const result = await scrapeMarkdownDocs({ ...options, useLlms: true });

  console.log(`Downloaded: ${result.downloaded.length} pages`);
  console.log(`Failed: ${result.failed.length} pages`);

  // Step 4: Generate source config
  console.log("\n[4/4] Generating source config...");
  const sourceConfig = generateSourceConfig(parsed);
  const sourceFileName = parsed.docName.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Write source config
  const fs = await import("fs/promises");
  await fs.mkdir("scripts/sources", { recursive: true });
  await fs.writeFile(`scripts/sources/${sourceFileName}.ts`, sourceConfig);

  // Update index.ts to export the new source
  const indexPath = "scripts/sources/index.ts";
  let indexContent = "";
  try {
    indexContent = await fs.readFile(indexPath, "utf-8");
  } catch {
    indexContent = `/**
 * Documentation sources index
 */

`;
  }

  const exportLine = `export { ${sourceFileName}Source } from "./${sourceFileName}";\n`;
  if (!indexContent.includes(exportLine)) {
    await fs.appendFile(indexPath, exportLine);
  }

  // Write result comment
  writeFileSync("/tmp/doc-result.txt", `✅ **Documentation added successfully!**

**Source:** ${parsed.docName}
**URL:** ${parsed.docUrl}
**Output:** ${parsed.outputDir}

**Stats:**
- Downloaded: ${result.downloaded.length} pages
- Failed: ${result.failed.length} pages
- Duration: ${(result.duration / 1000).toFixed(2)}s

The source has been added to \`scripts/sources/${sourceFileName}.ts\` and will be included in future daily scrapes.
`);

  console.log("\n✅ Done!");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  writeFileSync("/tmp/doc-result.txt", `❌ **Failed to add docs**

\`\`\`
${error.message || error}
\`\`\`
`);
  process.exit(1);
});
