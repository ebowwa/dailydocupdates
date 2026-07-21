<!--
Source: https://bun.com/docs/guides/binary/dataview-to-string.md
Downloaded: 2026-07-21T21:18:03.756Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a DataView to a string

If a [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) contains ASCII-encoded text, use the [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) class to convert it to a string.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const dv: DataView = ...;
const decoder = new TextDecoder();
const str = decoder.decode(dv);
```

***

See [Binary Data](/docs/runtime/binary-data#conversion).
