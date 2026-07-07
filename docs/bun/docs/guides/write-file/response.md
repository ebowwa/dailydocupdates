> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Write a Response to a file

Use [`Bun.write()`](/runtime/file-io#writing-files-bun-write) to write a `Response` to disk. Bun consumes the `Response` body according to its `Content-Type` header.

The first argument is a *destination*, like an absolute path or `BunFile` instance. The second argument is the *data* to write.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const result = await fetch("https://bun.com");
const path = "./file.txt";
await Bun.write(path, result);
```

***

See [`Bun.write()`](/runtime/file-io#writing-files-bun-write).
