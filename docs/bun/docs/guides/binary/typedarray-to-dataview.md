> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Uint8Array to a DataView

A [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) is a *typed array*, a view over data in an underlying `ArrayBuffer`. To convert it to a `DataView`, create one over the same range of data.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const arr: Uint8Array = ...
const dv = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
```

***

See [Binary Data](/runtime/binary-data#conversion).
