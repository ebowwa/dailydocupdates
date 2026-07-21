<!--
Source: https://bun.com/docs/guides/test/rerun-each.md
Downloaded: 2026-07-21T21:18:03.770Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Re-run tests multiple times with the Bun test runner

The `--rerun-each` flag runs every test multiple times. Use it to find flaky or non-deterministic tests.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
# re-run each test 10 times
bun test --rerun-each 10
```

***

See [`bun test`](/docs/test).
