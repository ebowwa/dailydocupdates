<!--
Source: https://bun.com/docs/guides/util/escape-html.md
Downloaded: 2026-07-22T21:08:17.167Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Escape an HTML string

`Bun.escapeHTML()` escapes HTML characters in a string. It makes the following replacements.

* `"` becomes `"&quot;"`
* `&` becomes `"&amp;"`
* `'` becomes `"&#x27;"`
* `<` becomes `"&lt;"`
* `>` becomes `"&gt;"`

This function is optimized for large input. Non-string values are converted to a string before escaping.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
Bun.escapeHTML("<script>alert('Hello World!')</script>");
// &lt;script&gt;alert(&#x27;Hello World!&#x27;)&lt;/script&gt;
```

***

See [Utils](/docs/runtime/utils).
