<!--
Source: https://bun.com/docs/guides/util/which-path-to-executable-bin.md
Downloaded: 2026-03-13T20:11:27.104Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get the path to an executable bin file

`Bun.which` is a utility function to find the absolute path of an executable file. It is similar to the `which` command in Unix-like systems.

```ts foo.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
Bun.which("sh"); // => "/bin/sh"
Bun.which("notfound"); // => null
Bun.which("bun"); // => "/home/user/.bun/bin/bun"
```

***

See [Docs > API > Utils](/runtime/utils#bun-which) for complete documentation.


Built with [Mintlify](https://mintlify.com).