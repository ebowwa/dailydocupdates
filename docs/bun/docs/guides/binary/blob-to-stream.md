<!--
Source: https://bun.com/docs/guides/binary/blob-to-stream.md
Downloaded: 2026-07-21T21:18:03.755Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Blob to a ReadableStream

The [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) class provides several methods for consuming its contents in different formats, including `.stream()`, which returns a `ReadableStream`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const blob = new Blob(["hello world"]);
const stream = blob.stream();
```

***

See [Binary Data](/docs/runtime/binary-data#conversion).
