<!--
Source: https://bun.com/docs/guides/write-file/response.md
Downloaded: 2026-07-08T21:08:09.496Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Write a Response to a file

Use [`Bun.write()`](/runtime/file-io#writing-files-bun-write) to write a `Response` to disk. The body of the `Response` is written to the destination.

The first argument is a *destination*, like an absolute path or `BunFile` instance. The second argument is the *data* to write.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const result = await fetch("https://bun.com");
const path = "./file.txt";
await Bun.write(path, result);
```

***

See [`Bun.write()`](/runtime/file-io#writing-files-bun-write).
