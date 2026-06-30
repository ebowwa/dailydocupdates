<!--
Source: https://bun.com/docs/guides/binary/arraybuffer-to-blob.md
Downloaded: 2026-06-30T20:44:18.795Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert an ArrayBuffer to a Blob

A [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) can be constructed from an array of "chunks", where each chunk is a string, binary data structure, or another `Blob`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const buf = new ArrayBuffer(64);
const blob = new Blob([buf]);
```

***

By default the `type` of the resulting `Blob` is unset. Set it with the `type` option.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const buf = new ArrayBuffer(64);
const blob = new Blob([buf], { type: "application/octet-stream" });
blob.type; // => "application/octet-stream"
```

***

See [Binary Data](/runtime/binary-data#conversion).
