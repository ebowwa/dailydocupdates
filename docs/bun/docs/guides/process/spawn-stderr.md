<!--
Source: https://bun.com/docs/guides/process/spawn-stderr.md
Downloaded: 2026-06-30T20:44:18.810Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Read stderr from a child process

When you spawn a child process with [`Bun.spawn()`](/runtime/child-process), it inherits the `stderr` of the spawning process. To read and handle `stderr` instead, set the `stderr` option to `"pipe"`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const proc = Bun.spawn(["echo", "hello"], {
  stderr: "pipe",
});

proc.stderr; // => ReadableStream
```

***

To read `stderr` until the child process exits, use `.text()`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const proc = Bun.spawn(["echo", "hello"], {
  stderr: "pipe",
});

const errors: string = await proc.stderr.text();
if (errors) {
  // handle errors
}
```

***

See [Child processes](/runtime/child-process).
