<!--
Source: https://bun.com/docs/guides/binary/blob-to-stream.md
Downloaded: 2026-06-30T20:44:18.796Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Blob to a ReadableStream

The [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) class provides several methods for consuming its contents in different formats, including `.stream()`, which returns `Promise<ReadableStream>`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const blob = new Blob(["hello world"]);
const stream = await blob.stream();
```

***

See [Binary Data](/runtime/binary-data#conversion).
