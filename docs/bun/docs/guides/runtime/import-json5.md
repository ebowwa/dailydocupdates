<!--
Source: https://bun.com/docs/guides/runtime/import-json5.md
Downloaded: 2026-04-10T20:14:16.321Z
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

# Import a JSON5 file

Bun natively supports `.json5` imports.

```json5 config.json5 icon="file-code" theme={"theme":{"light":"github-light","dark":"dracula"}}
{
  // Comments are allowed
  database: {
    host: "localhost",
    port: 5432,
    name: "myapp",
  },

  server: {
    port: 3000,
    timeout: 30,
  },

  features: {
    auth: true,
    rateLimit: true,
  },
}
```

***

Import the file like any other source file.

```ts config.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import config from "./config.json5";

config.database.host; // => "localhost"
config.server.port; // => 3000
config.features.auth; // => true
```

***

You can also use named imports to destructure top-level properties:

```ts config.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { database, server, features } from "./config.json5";

console.log(database.name); // => "myapp"
console.log(server.timeout); // => 30
console.log(features.rateLimit); // => true
```

***

For parsing JSON5 strings at runtime, use `Bun.JSON5.parse()`:

```ts config.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
const data = JSON5.parse(`{
  name: 'John Doe',
  age: 30,
  hobbies: [
    'reading',
    'coding',
  ],
}`);

console.log(data.name); // => "John Doe"
console.log(data.hobbies); // => ["reading", "coding"]
```

***

See [Docs > API > JSON5](/runtime/json5) for complete documentation on JSON5 support in Bun.


Built with [Mintlify](https://mintlify.com).