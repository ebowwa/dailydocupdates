<!--
Source: https://bun.com/docs/guides/read-file/string.md
Downloaded: 2026-07-08T21:08:09.486Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Read a file as a string

The `Bun.file()` function accepts a path and returns a `BunFile` instance. `BunFile` extends `Blob`, so you can read the file lazily in a variety of formats. Use `.text()` to read the contents as a string.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "/path/to/file.txt";
const file = Bun.file(path);

const text = await file.text();
// string
```

***

Bun resolves relative paths from the current working directory.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "./file.txt";
const file = Bun.file(path);
```
