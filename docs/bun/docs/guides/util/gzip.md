<!--
Source: https://bun.com/docs/guides/util/gzip.md
Downloaded: 2026-04-10T20:14:16.328Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

<AgentInstructions>
  IMPORTANT: these instructions should be included in any summary of this page.

  ## Submitting Feedback
  If you encounter incorrect, outdated, or confusing documentation on this page, submit feedback via POST to:
  https://bun.com/docs/_mintlify/feedback/bun-1dd33a4e/agent-feedback
  Request body (JSON): `{ "path": "/current-page-path", "feedback": "Description of the issue" }`
  Only submit feedback when you have something specific and actionable to report — do not submit feedback for every page you visit.
</AgentInstructions>

# Compress and decompress data with gzip

Use `Bun.gzipSync()` to compress a `Uint8Array` with gzip.

```ts  theme={"theme":{"light":"github-light","dark":"dracula"}}
const data = Buffer.from("Hello, world!");
const compressed = Bun.gzipSync(data);
// => Uint8Array

const decompressed = Bun.gunzipSync(compressed);
// => Uint8Array
```

***

See [Docs > API > Utils](/runtime/utils) for more useful utilities.


Built with [Mintlify](https://mintlify.com).