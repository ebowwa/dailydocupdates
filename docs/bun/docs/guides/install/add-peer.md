<!--
Source: https://bun.com/docs/guides/install/add-peer.md
Downloaded: 2026-02-22T05:37:58.405Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Add a peer dependency

To add an npm package as a peer dependency, use the `--peer` flag.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add @types/bun --peer
```

***

This will add the package to `peerDependencies` in `package.json`.

```json package.json icon="file-json" theme={"theme":{"light":"github-light","dark":"dracula"}}
{
  "peerDependencies": {
    "@types/bun": "^1.3.3" // [!code ++]
  }
}
```

***

Running `bun install` will install peer dependencies by default, unless marked optional in `peerDependenciesMeta`.

```json package.json icon="file-json" theme={"theme":{"light":"github-light","dark":"dracula"}}
{
  "peerDependencies": {
    "@types/bun": "^1.3.3"
  },
  "peerDependenciesMeta": {
    "@types/bun": { // [!code ++]
      "optional": true // [!code ++]
    } // [!code ++]
  }
}
```

***

See [Docs > Package manager](/pm/cli/install) for complete documentation of Bun's package manager.
