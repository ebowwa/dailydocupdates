<!--
Source: https://bun.com/docs/guides/util/file-url-to-path.md
Downloaded: 2026-02-22T04:22:38.528Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Convert a file URL to an absolute path

Use `Bun.fileURLToPath()` to convert a `file://` URL to an absolute path.

```ts  theme={"theme":{"light":"github-light","dark":"dracula"}}
Bun.fileURLToPath("file:///path/to/file.txt");
// => "/path/to/file.txt"
```

***

See [Docs > API > Utils](/runtime/utils) for more useful utilities.
