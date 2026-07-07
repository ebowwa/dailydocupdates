> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a ReadableStream to a string

`Bun.readableStreamToText` reads the contents of a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) into a string.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const stream = new ReadableStream();
const str = await Bun.readableStreamToText(stream);
```

***

See [Bun's other `ReadableStream` conversion functions](/runtime/utils#bun-readablestreamto).
