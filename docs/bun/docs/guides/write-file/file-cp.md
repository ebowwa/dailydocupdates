<!--
Source: https://bun.com/docs/guides/write-file/file-cp.md
Downloaded: 2026-07-21T21:18:03.774Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Copy a file to another location

Use [`Bun.write()`](/docs/runtime/file-io#writing-files-bun-write) to copy a file to another location on disk. The first argument is a *destination*, like an absolute path or `BunFile` instance. The second argument is the *data* to write.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const file = Bun.file("/path/to/original.txt");
await Bun.write("/path/to/copy.txt", file);
```

***

See [`Bun.write()`](/docs/runtime/file-io#writing-files-bun-write).
