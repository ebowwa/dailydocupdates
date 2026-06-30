<!--
Source: https://bun.com/docs/guides/test/coverage.md
Downloaded: 2026-06-30T20:44:18.817Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Generate code coverage reports with the Bun test runner

Bun's test runner has built-in *code coverage reporting*. Use it to see how much of your codebase is covered by tests, and where the gaps are.

***

Pass the `--coverage` flag to `bun test` to print a coverage report after the test run.

The report lists the source files the tests executed, the percentage of functions and lines that ran, and the line ranges that never ran.

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

To enable coverage reporting by default, add the following to your `bunfig.toml`:

```toml bunfig.toml icon="settings" theme={"theme":{"light":"github-light","dark":"dracula"}}
[test]
coverage = true # always enable coverage
```

***

See [Code coverage](/test/code-coverage).
