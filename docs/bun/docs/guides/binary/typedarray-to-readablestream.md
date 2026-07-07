> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Uint8Array to a ReadableStream

The naive approach to creating a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) from a [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) is to use the [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) constructor and enqueue the entire array as a single chunk. For a large array, this may be undesirable because it doesn't stream the data in smaller chunks.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const arr = new Uint8Array(64);
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue(arr);
    controller.close();
  },
});
```

***

To stream the data in smaller chunks, first create a `Blob` instance from the `Uint8Array`, then use [`Blob.stream()`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/stream) to create a `ReadableStream`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const arr = new Uint8Array(64);
const blob = new Blob([arr]);
const stream = blob.stream();
```

***

Pass a number to `.stream()` to set the chunk size.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const arr = new Uint8Array(64);
const blob = new Blob([arr]);

// set chunk size of 1024 bytes
const stream = blob.stream(1024);
```

***

See [Binary Data](/runtime/binary-data#conversion).
