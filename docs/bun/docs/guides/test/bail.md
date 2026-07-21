<!--
Source: https://bun.com/docs/guides/test/bail.md
Downloaded: 2026-07-21T21:18:03.769Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Bail early with the Bun test runner

Use the `--bail` flag to abort a test run after the first failure, so a continuous integration run fails as early as possible.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun test --bail
```

***

To bail after a certain number of failures, pass a number after the flag.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
# bail after 10 failures
bun test --bail=10
```

***

See [`bun test`](/docs/test).
