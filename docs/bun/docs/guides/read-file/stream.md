<!--
Source: https://bun.com/docs/guides/read-file/stream.md
Downloaded: 2026-07-21T21:18:03.765Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Read a file as a ReadableStream

The `Bun.file()` function accepts a path and returns a `BunFile` instance. `BunFile` extends `Blob`, so you can read the file lazily in a variety of formats. Use `.stream()` to consume the file incrementally as a `ReadableStream`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "/path/to/package.json";
const file = Bun.file(path);

const stream = file.stream();
```

***

The stream is an [async iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols), so you can read its chunks with `for await`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
for await (const chunk of stream) {
  chunk; // => Uint8Array
}
```

***

See [Streams](/docs/runtime/streams) for more on working with streams in Bun.
