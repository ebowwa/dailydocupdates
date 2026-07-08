<!--
Source: https://bun.com/docs/guides/write-file/basic.md
Downloaded: 2026-07-08T21:08:09.496Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Write a string to a file

Use [`Bun.write()`](/runtime/file-io#writing-files-bun-write) to write a string to disk at an *absolute path*. The first argument is a *destination*; the second is the *data* to write.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "/path/to/file.txt";
await Bun.write(path, "Lorem ipsum");
```

***

Bun resolves relative paths from the current working directory.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "./file.txt";
await Bun.write(path, "Lorem ipsum");
```

***

You can pass a `BunFile` as the destination. `Bun.write()` writes the data to its associated path.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = Bun.file("./file.txt");
await Bun.write(path, "Lorem ipsum");
```

***

`Bun.write()` returns the number of bytes written to disk.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "./file.txt";
const bytes = await Bun.write(path, "Lorem ipsum");
// => 11
```

***

See [`Bun.write()`](/runtime/file-io#writing-files-bun-write).
