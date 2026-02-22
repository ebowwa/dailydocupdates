<!--
Source: https://bun.com/docs/guides/streams/to-buffer.md
Downloaded: 2026-02-22T05:01:20.567Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a ReadableStream to a Buffer

Bun provides a number of convenience functions for reading the contents of a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) into different formats. This snippet reads the contents of a `ReadableStream` to an [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), then creates a [`Buffer`](https://nodejs.org/api/buffer.html) that points to it.

```ts  theme={"theme":{"light":"github-light","dark":"dracula"}}
const stream = new ReadableStream();
const arrBuf = await Bun.readableStreamToArrayBuffer(stream);
const nodeBuf = Buffer.from(arrBuf);
```

***

See [Docs > API > Utils](/runtime/utils#bun-readablestreamto) for documentation on Bun's other `ReadableStream` conversion functions.
