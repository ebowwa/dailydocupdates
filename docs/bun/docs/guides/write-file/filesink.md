<!--
Source: https://bun.com/docs/guides/write-file/filesink.md
Downloaded: 2026-07-21T21:18:03.774Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Write a file incrementally

Bun provides an API for incrementally writing to a file. Use it for large files, or when writing to a file over a long period of time.

Call `.writer()` on a `BunFile` to retrieve a `FileSink` instance. It buffers data; call `.flush()` to write the buffer to disk. You can write & flush many times.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const file = Bun.file("/path/to/file.txt");
const writer = file.writer();

writer.write("lorem");
writer.write("ipsum");
writer.write("dolor");

writer.flush();

// continue writing & flushing
```

***

The `.write()` method accepts strings or binary data.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
w.write("hello");
w.write(Buffer.from("there"));
w.write(new Uint8Array([0, 255, 128]));
writer.flush();
```

***

The `FileSink` also auto-flushes when its internal buffer is full. You can configure the buffer size with the `highWaterMark` option.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const file = Bun.file("/path/to/file.txt");
const writer = file.writer({ highWaterMark: 1024 * 1024 }); // 1MB
```

***

When you're done writing, call `.end()` to flush the buffer and close the file.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
writer.end();
```

***

Full documentation: [FileSink](/docs/runtime/file-io#incremental-writing-with-filesink).
