<!--
Source: https://bun.com/docs/guides/runtime/typescript.md
Downloaded: 2026-04-10T20:14:16.322Z
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

# Install TypeScript declarations for Bun

To install TypeScript definitions for Bun's built-in APIs in your project, install `@types/bun`.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add -d @types/bun # dev dependency
```

***

Below is the full set of recommended `compilerOptions` for a Bun project. With this `tsconfig.json`, you can use top-level await, extensioned or extensionless imports, and JSX.

```json tsconfig.json icon="file-json" theme={"theme":{"light":"github-light","dark":"dracula"}}
{
  "compilerOptions": {
    // Environment setup & latest features
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "Preserve",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,
    "types": ["bun"],

    // Bundler mode
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,

    // Best practices
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    // Some stricter flags (disabled by default)
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noPropertyAccessFromIndexSignature": false
  }
}
```

***

If you're using TypeScript 6.0 or later, you'll also need to add `"types": ["bun"]` to your `compilerOptions`. See [TypeScript 6 and 7](/typescript-6) for details.

***

Refer to [Ecosystem > TypeScript](/runtime/typescript) for a complete guide to TypeScript support in Bun.


Built with [Mintlify](https://mintlify.com).