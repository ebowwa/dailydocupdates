<!--
Source: https://bun.com/docs/guides/streams/node-readable-to-arraybuffer.md
Downloaded: 2026-04-10T20:14:16.322Z
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

# Convert a Node.js Readable to an ArrayBuffer

To convert a Node.js `Readable` stream to an `ArrayBuffer` in Bun, you can create a new `Response` object with the stream as the body, then use `arrayBuffer()` to read the stream into an `ArrayBuffer`.

```ts  theme={"theme":{"light":"github-light","dark":"dracula"}}
import { Readable } from "stream";
const stream = Readable.from(["Hello, ", "world!"]);
const buf = await new Response(stream).arrayBuffer();
```


Built with [Mintlify](https://mintlify.com).