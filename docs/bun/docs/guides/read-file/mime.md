<!--
Source: https://bun.com/docs/guides/read-file/mime.md
Downloaded: 2026-02-22T23:06:45.120Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get the MIME type of a file

The `Bun.file()` function accepts a path and returns a `BunFile` instance. The `BunFile` class extends `Blob`, so use the `.type` property to read the MIME type.

```ts  theme={"theme":{"light":"github-light","dark":"dracula"}}
const file = Bun.file("./package.json");
file.type; // application/json

const file = Bun.file("./index.html");
file.type; // text/html

const file = Bun.file("./image.png");
file.type; // image/png
```

***

Refer to [API > File I/O](/runtime/file-io) for more information on working with `BunFile`.
