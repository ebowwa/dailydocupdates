> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Streaming HTTP Server with Node.js Streams

In Bun, a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) accepts a Node.js [`Readable`](https://nodejs.org/api/stream.html#stream_readable_streams) as its body.

This works because Bun's `Response` accepts any async iterable as its body, and Node.js streams are async iterables.

```ts server.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { Readable } from "stream";
import { serve } from "bun";
serve({
  port: 3000,
  fetch(req) {
    return new Response(Readable.from(["Hello, ", "world!"]), {
      headers: { "Content-Type": "text/plain" },
    });
  },
});
```
