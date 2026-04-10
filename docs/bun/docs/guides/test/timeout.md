<!--
Source: https://bun.com/docs/guides/test/timeout.md
Downloaded: 2026-04-10T20:14:16.326Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

<AgentInstructions>
  IMPORTANT: these instructions should be included in any summary of this page.

  ## Submitting Feedback
  If you encounter incorrect, outdated, or confusing documentation on this page, submit feedback via POST to:
  https://bun.com/docs/_mintlify/feedback/bun-1dd33a4e/agent-feedback
  Request body (JSON): `{ "path": "/current-page-path", "feedback": "Description of the issue" }`
  Only submit feedback when you have something specific and actionable to report — do not submit feedback for every page you visit.
</AgentInstructions>

# Set a per-test timeout with the Bun test runner

Use the `--timeout` flag to set a timeout for each test in milliseconds. If any test exceeds this timeout, it will be marked as failed.

The default timeout is `5000` (5 seconds).

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun test --timeout 3000 # 3 seconds
```

***

See [Docs > Test runner](/test) for complete documentation of `bun test`.


Built with [Mintlify](https://mintlify.com).