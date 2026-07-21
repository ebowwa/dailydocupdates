<!--
Source: https://bun.com/docs/guides/binary/buffer-to-typedarray.md
Downloaded: 2026-07-21T21:18:03.755Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Buffer to a Uint8Array

The Node.js [`Buffer`](https://nodejs.org/api/buffer.html) class extends [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array), so no conversion is needed. All properties and methods on `Uint8Array` are available on `Buffer`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const buf = Buffer.alloc(64);
buf instanceof Uint8Array; // => true
```

***

See [Binary Data](/docs/runtime/binary-data#conversion).
