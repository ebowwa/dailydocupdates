> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Read a file to a Buffer

The `Bun.file()` function accepts a path and returns a `BunFile` instance. `BunFile` extends `Blob`, so you can read the file lazily in a variety of formats.

To read the file into a `Buffer`, read it as an `ArrayBuffer` with `.arrayBuffer()`, then pass the result to `Buffer.from()`.

```ts index.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "/path/to/package.json";
const file = Bun.file(path);

const arrbuf = await file.arrayBuffer();
const buffer = Buffer.from(arrbuf);
```

***

See [Buffer](/runtime/binary-data#buffer) for more on working with `Buffer` and other binary data formats in Bun.
