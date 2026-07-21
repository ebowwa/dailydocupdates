<!--
Source: https://bun.com/docs/guides/binary/typedarray-to-buffer.md
Downloaded: 2026-07-21T21:18:03.756Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Uint8Array to a Buffer

The [`Buffer`](https://nodejs.org/api/buffer.html) class extends [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) with additional methods. Use `Buffer.from()` to create a `Buffer` instance from a `Uint8Array`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const arr: Uint8Array = ...
const buf = Buffer.from(arr);
```

***

See [Binary Data](/docs/runtime/binary-data#conversion).
