<!--
Source: https://bun.com/docs/guides/test/coverage-threshold.md
Downloaded: 2026-07-21T21:18:03.769Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set a code coverage threshold with the Bun test runner

Bun's test runner has built-in code coverage reporting. Enable it with the `--coverage` flag.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun test --coverage
```

```txt theme={"theme":{"light":"github-light","dark":"dracula"}}
test.test.ts:
✓ math > add [0.71ms]
✓ math > multiply [0.03ms]
✓ random [0.13ms]
-------------|---------|---------|-------------------
File         | % Funcs | % Lines | Uncovered Line #s
-------------|---------|---------|-------------------
All files    |   66.67 |   77.78 |
 math.ts     |   50.00 |   66.67 |
 random.ts   |   50.00 |   66.67 |
-------------|---------|---------|-------------------

 3 pass
 0 fail
 3 expect() calls
```

***

To set a minimum coverage threshold, add the following to your `bunfig.toml`. A threshold of `0.9` requires that tests cover 90% of your codebase.

```toml bunfig.toml icon="settings" theme={"theme":{"light":"github-light","dark":"dracula"}}
[test]
# to require 90% line-level and function-level coverage
coverageThreshold = 0.9
```

***

If your test suite does not meet this threshold, `bun test` exits with a non-zero exit code to signal a failure.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun test --coverage
```

```txt theme={"theme":{"light":"github-light","dark":"dracula"}}
<test output>
$ echo $?
1 # this is the exit code of the previous command
```

***

You can set different thresholds for line-level and function-level coverage.

```toml bunfig.toml icon="settings" theme={"theme":{"light":"github-light","dark":"dracula"}}
[test]
# to set different thresholds for lines and functions
coverageThreshold = { lines = 0.5, functions = 0.7 }
```

***

See [Code coverage](/docs/test/code-coverage).
