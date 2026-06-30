<!--
Source: https://bun.com/docs/guides/streams/node-readable-to-string.md
Downloaded: 2026-06-30T20:44:18.816Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Node.js Readable to a string

To convert a Node.js `Readable` stream to a string in Bun, create a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) with the stream as the body, then call [`response.text()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/text).

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
import { Readable } from "stream";
const stream = Readable.from([Buffer.from("Hello, world!")]);
const text = await new Response(stream).text();
console.log(text); // "Hello, world!"
```
