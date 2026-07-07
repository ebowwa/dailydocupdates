> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Write to stdout

The `console.log` function writes to `stdout` and appends a line break to the printed data.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
console.log("Lorem ipsum");
```

***

Bun also exposes `stdout` as a `BunFile` with the `Bun.stdout` property. Pass it as the destination to [`Bun.write()`](/runtime/file-io#writing-files-bun-write).

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
await Bun.write(Bun.stdout, "Lorem ipsum");
```

***

See [`Bun.write()`](/runtime/file-io#writing-files-bun-write).
