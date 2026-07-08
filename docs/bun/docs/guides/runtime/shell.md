<!--
Source: https://bun.com/docs/guides/runtime/shell.md
Downloaded: 2026-07-08T21:08:09.488Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Run a Shell Command

Bun Shell is a cross-platform bash-like shell built into Bun.

It runs shell commands from JavaScript and TypeScript. To get started, import the `$` function from the `bun` package.

```ts foo.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { $ } from "bun";

await $`echo Hello, world!`; // => "Hello, world!"
```

***

The `$` function is a tagged template literal that runs the command and returns a promise that resolves with the command's output.

```ts foo.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { $ } from "bun";

const output = await $`ls -l`.text();
console.log(output);
```

***

To iterate over each line of the output, use the `lines` method.

```ts foo.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { $ } from "bun";

for await (const line of $`ls -l`.lines()) {
  console.log(line);
}
```

***

See [Bun Shell](/runtime/shell).
