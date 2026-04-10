<!--
Source: https://bun.com/docs/guides/test/watch-mode.md
Downloaded: 2026-04-10T20:14:16.327Z
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

# Run tests in watch mode with Bun

Use the `--watch` flag to run your tests in watch mode.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun test --watch
```

***

This will restart the running Bun process whenever a file change is detected. It's fast. In this example, the editor is configured to save the file on every keystroke.

<Frame>
  ![Running tests in watch mode in
  Bun](https://github.com/oven-sh/bun/assets/3084745/dc49a36e-ba82-416f-b960-1c883a924248)
</Frame>

***

See [Docs > Test Runner](/test) for complete documentation on the test runner.


Built with [Mintlify](https://mintlify.com).