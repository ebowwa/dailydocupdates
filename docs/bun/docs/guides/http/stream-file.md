<!--
Source: https://bun.com/docs/guides/http/stream-file.md
Downloaded: 2026-07-21T21:18:03.761Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Stream a file as an HTTP Response

[`Bun.file()`](/docs/runtime/file-io#reading-files-bun-file) reads a file from disk and returns a `BunFile` instance, which you can pass directly to the `new Response` constructor.

```ts server.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "/path/to/file.txt";
const file = Bun.file(path);
const resp = new Response(file);
```

***

Bun reads the `Content-Type` from the file and sets it on the `Response`.

```ts server.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
new Response(Bun.file("./package.json")).headers.get("Content-Type");
// => application/json;charset=utf-8

new Response(Bun.file("./test.txt")).headers.get("Content-Type");
// => text/plain;charset=utf-8

new Response(Bun.file("./index.tsx")).headers.get("Content-Type");
// => text/javascript;charset=utf-8

new Response(Bun.file("./img.png")).headers.get("Content-Type");
// => image/png
```

***

Putting it all together with [`Bun.serve()`](/docs/runtime/http/server).

```ts server.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
// static file server
Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;
    const file = Bun.file(path);
    return new Response(file);
  },
});
```

***

See [`Bun.write()`](/docs/runtime/file-io#writing-files-bun-write).
