> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Write a Blob to a file

Use [`Bun.write()`](/runtime/file-io#writing-files-bun-write) to write a `Blob` to disk. The first argument is a *destination*, like an absolute path or `BunFile` instance. The second argument is the *data* to write.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "/path/to/file.txt";
await Bun.write(path, "Lorem ipsum");
```

***

The `BunFile` class extends `Blob`, so you can pass a `BunFile` directly into `Bun.write()` as well.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "./out.txt";
const data = Bun.file("./in.txt");

// write the contents of ./in.txt to ./out.txt
await Bun.write(path, data);
```

***

See [`Bun.write()`](/runtime/file-io#writing-files-bun-write).
