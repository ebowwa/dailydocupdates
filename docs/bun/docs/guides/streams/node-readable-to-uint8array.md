> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Node.js Readable to an Uint8Array

To convert a Node.js `Readable` stream to a `Uint8Array` in Bun, create a `Response` with the stream as the body, then call `bytes()`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
import { Readable } from "stream";
const stream = Readable.from(["Hello, ", "world!"]);
const buf = await new Response(stream).bytes();
```
