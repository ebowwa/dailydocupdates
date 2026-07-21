<!--
Source: https://bun.com/docs/guides/binary/typedarray-to-string.md
Downloaded: 2026-07-21T21:18:03.756Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Uint8Array to a string

Bun implements the Web-standard [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) class for converting binary data types like `Uint8Array` to strings.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const arr = new Uint8Array([104, 101, 108, 108, 111]);
const decoder = new TextDecoder();
const str = decoder.decode(arr);
// => "hello"
```

***

See [Binary Data](/docs/runtime/binary-data#conversion).
