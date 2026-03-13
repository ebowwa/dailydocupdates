<!--
Source: https://bun.com/docs/guides/read-file/exists.md
Downloaded: 2026-03-13T20:11:27.096Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Check if a file exists

The `Bun.file()` function accepts a path and returns a `BunFile` instance. Use the `.exists()` method to check if a file exists at the given path.

```ts index.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "/path/to/package.json";
const file = Bun.file(path);

await file.exists(); // boolean;
```

***

Refer to [API > File I/O](/runtime/file-io) for more information on working with `BunFile`.


Built with [Mintlify](https://mintlify.com).