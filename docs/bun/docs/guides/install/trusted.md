<!--
Source: https://bun.com/docs/guides/install/trusted.md
Downloaded: 2026-06-30T20:44:18.808Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Add a trusted dependency

Unlike other npm clients, Bun does not execute arbitrary lifecycle scripts for installed dependencies, such as `postinstall` and `node-gyp` builds. These scripts represent a potential security risk, as they can execute arbitrary code on your machine.

<Note>
  Bun includes a default allowlist of popular packages whose `postinstall` scripts are known to be safe; see [the full
  list](https://github.com/oven-sh/bun/blob/main/src/install/default-trusted-dependencies.txt). It only applies to
  packages installed from npm. For packages from other sources (such as `file:`, `link:`, `git:`, or `github:`
  dependencies), you must explicitly add them to `trustedDependencies`.
</Note>

***

If you see one of the following errors, you are probably using a package that needs its `postinstall` script to work:

* `error: could not determine executable to run for package`
* `InvalidExe`

***

To allow Bun to execute lifecycle scripts for a specific package, add the package to `trustedDependencies` in your `package.json`. You can do this automatically by running `bun pm trust <pkg>`.

<Note>
  This only allows lifecycle scripts for the specific package listed in `trustedDependencies`, *not* the dependencies of
  that dependency.
</Note>

```json package.json icon="file-json" theme={"theme":{"light":"github-light","dark":"dracula"}}
{
  "name": "my-app",
  "version": "1.0.0",
  "trustedDependencies": ["my-trusted-package"] // [!code ++]
}
```

***

Once this is added, run a fresh install. Bun re-installs your dependencies and runs the package's lifecycle scripts.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
rm -rf node_modules
rm bun.lock
bun install
```

***

See [trusted dependencies](/pm/lifecycle).
