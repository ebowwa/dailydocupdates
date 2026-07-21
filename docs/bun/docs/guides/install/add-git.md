<!--
Source: https://bun.com/docs/guides/install/add-git.md
Downloaded: 2026-07-21T21:18:03.762Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Add a Git dependency

Bun supports directly adding GitHub repositories as dependencies of your project.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add github:lodash/lodash
```

***

This adds the following line to your `package.json`:

```json package.json icon="file-json" theme={"theme":{"light":"github-light","dark":"dracula"}}
{
  "dependencies": {
    "lodash": "github:lodash/lodash"
  }
}
```

***

Bun supports a number of protocols for specifying Git dependencies.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add git+https://github.com/lodash/lodash.git
bun add git+ssh://github.com/lodash/lodash.git#4.17.21
bun add git@github.com:lodash/lodash.git
bun add github:colinhacks/zod
```

When possible, Bun downloads GitHub dependencies as HTTP tarballs, which is faster.

***

See [`bun install`](/docs/pm/cli/install).
