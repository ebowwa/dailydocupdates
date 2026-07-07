> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a Buffer to an ArrayBuffer

The Node.js [`Buffer`](https://nodejs.org/api/buffer.html) class views and manipulates data in an underlying `ArrayBuffer`. The `buffer` property returns that `ArrayBuffer`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const nodeBuf = Buffer.alloc(64);
const arrBuf = nodeBuf.buffer;
```

***

See [Binary Data](/runtime/binary-data#conversion).
