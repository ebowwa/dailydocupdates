<!--
Source: https://bun.com/docs/guides/streams/node-readable-to-arraybuffer.md
Downloaded: 2026-02-22T10:30:22.163Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Node.js Readable to an ArrayBuffer

To convert a Node.js `Readable` stream to an `ArrayBuffer` in Bun, you can create a new `Response` object with the stream as the body, then use `arrayBuffer()` to read the stream into an `ArrayBuffer`.

```ts  theme={"theme":{"light":"github-light","dark":"dracula"}}
import { Readable } from "stream";
const stream = Readable.from(["Hello, ", "world!"]);
const buf = await new Response(stream).arrayBuffer();
```
