> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a ReadableStream to an array of chunks

`Bun.readableStreamToArray` reads the contents of a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) into an array of chunks.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const stream = new ReadableStream();
const str = await Bun.readableStreamToArray(stream);
```

***

See [Bun's other `ReadableStream` conversion functions](/runtime/utils#bun-readablestreamto).
