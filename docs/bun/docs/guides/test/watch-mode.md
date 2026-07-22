<!--
Source: https://bun.com/docs/guides/test/watch-mode.md
Downloaded: 2026-07-22T21:08:17.166Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Run tests in watch mode with Bun

Use the `--watch` flag to run your tests in watch mode.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun test --watch
```

***

Watch mode restarts the running Bun process whenever a file changes. It's fast. In this example, the editor saves the file on every keystroke.

<Frame>
  ![Running tests in watch mode in
  Bun](https://github.com/oven-sh/bun/assets/3084745/dc49a36e-ba82-416f-b960-1c883a924248)
</Frame>

***

See [`bun test`](/docs/test).
