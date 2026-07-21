<!--
Source: https://bun.com/docs/guides/test/timeout.md
Downloaded: 2026-07-21T21:18:03.771Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set a per-test timeout with the Bun test runner

Use the `--timeout` flag to set a timeout for each test in milliseconds. A test that exceeds this timeout is marked as failed.

The default timeout is `5000` (5 seconds).

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun test --timeout 3000 # 3 seconds
```

***

See [`bun test`](/docs/test).
