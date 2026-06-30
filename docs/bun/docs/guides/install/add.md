<!--
Source: https://bun.com/docs/guides/install/add.md
Downloaded: 2026-06-30T20:44:18.806Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Add a dependency

To add an npm package as a dependency, use `bun add`.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add zod
```

***

This adds the package to `dependencies` in `package.json`. By default, Bun uses the `^` range specifier, which accepts future minor and patch versions.

```json package.json icon="file-json" theme={"theme":{"light":"github-light","dark":"dracula"}}
{
  "dependencies": {
    "zod": "^3.0.0" // [!code ++]
  }
}
```

***

To pin your project to the exact version you installed, use `--exact`. This adds the package to `dependencies` without the `^`.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add zod --exact
```

***

To specify an exact version or a tag:

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add zod@3.0.0
bun add zod@next
```

***

See [`bun install`](/pm/cli/install).
