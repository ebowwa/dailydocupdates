<!--
Source: https://bun.com/docs/guides/binary/buffer-to-readablestream.md
Downloaded: 2026-07-21T21:18:03.755Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Buffer to a ReadableStream

The naive approach to creating a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) from a [`Buffer`](https://nodejs.org/api/buffer.html) is to use the `ReadableStream` constructor and enqueue the entire array as a single chunk. For a large buffer, this may be undesirable because it doesn't stream the data in smaller chunks.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const buf = Buffer.from("hello world");
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue(buf);
    controller.close();
  },
});
```

***

To stream the data in smaller chunks, first create a `Blob` instance from the `Buffer`, then use [`Blob.stream()`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/stream) to create a `ReadableStream`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const buf = Buffer.from("hello world");
const blob = new Blob([buf]);
const stream = blob.stream();
```

***

Pass a number to `.stream()` to set the chunk size.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const buf = Buffer.from("hello world");
const blob = new Blob([buf]);

// set chunk size of 1024 bytes
const stream = blob.stream(1024);
```

***

See [Binary Data](/docs/runtime/binary-data#conversion).
