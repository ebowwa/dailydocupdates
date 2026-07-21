<!--
Source: https://bun.com/docs/guides/binary/blob-to-typedarray.md
Downloaded: 2026-07-21T21:18:03.755Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Blob to a Uint8Array

The [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) class provides several methods for consuming its contents in different formats. Use `.bytes()` to read the contents as a `Uint8Array`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const blob = new Blob(["hello world"]);
const arr = await blob.bytes();
```

Alternatively, read the contents into an `ArrayBuffer` with `.arrayBuffer()`, then create a `Uint8Array` from the buffer.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const blob = new Blob(["hello world"]);
const arr = new Uint8Array(await blob.arrayBuffer());
```

***

See [Binary Data](/docs/runtime/binary-data#conversion).
