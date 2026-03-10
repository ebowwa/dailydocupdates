<!--
Source: https://bun.com/docs/guides/util/import-meta-file.md
Downloaded: 2026-03-10T20:11:19.121Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Get the file name of the current file

Bun provides a handful of module-specific utilities on the [`import.meta`](/runtime/module-resolution#import-meta) object. Use `import.meta.file` to retrieve the name of the current file.

```ts /a/b/c.ts icon="https://mintcdn.com/bun-1dd33a4e/nIz6GtMH5K-dfXeV/icons/typescript.svg?fit=max&auto=format&n=nIz6GtMH5K-dfXeV&q=85&s=5d73d76daf7eb7b158469d8c30d349b0" theme={"theme":{"light":"github-light","dark":"dracula"}}
import.meta.file; // => "c.ts"
```

***

See [Docs > API > import.meta](/runtime/module-resolution#import-meta) for complete documentation.


Built with [Mintlify](https://mintlify.com).