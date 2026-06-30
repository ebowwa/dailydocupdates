<!--
Source: https://bun.com/docs/guides/read-file/uint8array.md
Downloaded: 2026-06-30T20:44:18.812Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Read a file to a Uint8Array

The `Bun.file()` function accepts a path and returns a `BunFile` instance. `BunFile` extends `Blob`, so you can read the file lazily in a variety of formats.

To read the file into a `Uint8Array`, use `.bytes()`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const path = "/path/to/package.json";
const file = Bun.file(path);

const byteArray = await file.bytes();

byteArray[0]; // first byteArray
byteArray.length; // length of byteArray
```

***

See [Typed arrays](/runtime/binary-data#typedarray) for more on working with `Uint8Array` and other binary data formats in Bun.
