<!--
Source: https://bun.com/docs/guides/ecosystem/ssr-react.md
Downloaded: 2026-06-30T20:44:18.802Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Server-side render (SSR) a React component

Install `react` and `react-dom`:

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
# Any package manager can be used
bun add react react-dom
```

***

To render a React component to an HTML stream server-side (SSR):

```tsx ssr-react.tsx icon="file-code" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { renderToReadableStream } from "react-dom/server";

function Component(props: { message: string }) {
  return (
    <body>
      <h1>{props.message}</h1>
    </body>
  );
}

const stream = await renderToReadableStream(<Component message="Hello from server!" />);
```

***

Combine this with `Bun.serve()` to get an SSR HTTP server:

```tsx server.tsx icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
Bun.serve({
  async fetch() {
    const stream = await renderToReadableStream(<Component message="Hello from server!" />);
    return new Response(stream, {
      headers: { "Content-Type": "text/html" },
    });
  },
});
```

***

React `19` and later include an [SSR optimization](https://github.com/facebook/react/pull/25597) that takes advantage of Bun's "direct" `ReadableStream` implementation. If you run into an error like `export named 'renderToReadableStream' not found`, install version `19` of `react` and `react-dom`, or import from `react-dom/server.browser` instead of `react-dom/server`. See [facebook/react#28941](https://github.com/facebook/react/issues/28941) for details.
