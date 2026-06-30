<!--
Source: https://bun.com/docs/guides/write-file/stream.md
Downloaded: 2026-06-30T20:44:18.824Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Write a ReadableStream to a file

To write a `ReadableStream` to disk, create a `Response` from the stream and pass it to [`Bun.write()`](/runtime/file-io#writing-files-bun-write).

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const stream: ReadableStream = ...;
const path = "./file.txt";
const response = new Response(stream);

await Bun.write(path, response);
```

***

See [`Bun.write()`](/runtime/file-io#writing-files-bun-write).
