<!--
Source: https://bun.com/docs/guides/streams/node-readable-to-blob.md
Downloaded: 2026-03-10T20:11:19.113Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Node.js Readable to a Blob

To convert a Node.js `Readable` stream to a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) in Bun, you can create a new [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object with the stream as the body, then use [`response.blob()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/blob) to read the stream into a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob).

```ts  theme={"theme":{"light":"github-light","dark":"dracula"}}
import { Readable } from "stream";
const stream = Readable.from(["Hello, ", "world!"]);
const blob = await new Response(stream).blob();
```


Built with [Mintlify](https://mintlify.com).