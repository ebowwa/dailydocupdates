<!--
Source: https://bun.com/docs/guides/install/custom-registry.md
Downloaded: 2026-07-21T21:18:03.762Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Override the default npm registry for bun install

The default registry is `registry.npmjs.org`. Override it globally in `bunfig.toml`.

```toml bunfig.toml icon="settings" theme={"theme":{"light":"github-light","dark":"dracula"}}
[install]
# set default registry as a string
registry = "https://registry.npmjs.org"

# if needed, set a token
registry = { url = "https://registry.npmjs.org", token = "123456" }

# if needed, set a username/password
registry = "https://usertitle:password@registry.npmjs.org"
```

***

Your `bunfig.toml` can reference environment variables. Bun automatically loads environment variables from `.env.local`, `.env.[NODE_ENV]`, and `.env`. See [Environment variables](/docs/runtime/environment-variables).

```toml bunfig.toml icon="settings" theme={"theme":{"light":"github-light","dark":"dracula"}}
[install]
registry = { url = "https://registry.npmjs.org", token = "$npm_token" }
```

***

See [`bun install`](/docs/pm/cli/install).
