<!--
Source: https://bun.com/docs/guides/process/spawn-stdout.md
Downloaded: 2026-07-08T21:08:09.485Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Read stdout from a child process

When you spawn a child process with [`Bun.spawn()`](/runtime/child-process), `proc.stdout` is a `ReadableStream` of the child's `stdout`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const proc = Bun.spawn(["echo", "hello"]);

const output = await proc.stdout.text();
output; // => "hello\n"
```

***

To pipe the child process's `stdout` to the parent's `stdout` instead, set the `stdout` option to `"inherit"`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const proc = Bun.spawn(["echo", "hello"], {
  stdout: "inherit",
});
```

***

See [Child processes](/runtime/child-process).
