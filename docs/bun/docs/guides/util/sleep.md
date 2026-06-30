<!--
Source: https://bun.com/docs/guides/util/sleep.md
Downloaded: 2026-06-30T20:44:18.822Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Sleep for a fixed number of milliseconds

`Bun.sleep()` returns a void `Promise` that resolves after a given number of milliseconds.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
// sleep for 1 second
await Bun.sleep(1000);
```

***

Internally, it is equivalent to the following [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) snippet.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
await new Promise(resolve => setTimeout(resolve, ms));
```

***

See [Utils](/runtime/utils).
