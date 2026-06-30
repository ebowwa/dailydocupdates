<!--
Source: https://bun.com/docs/guides/test/happy-dom.md
Downloaded: 2026-06-30T20:44:18.818Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Write browser DOM tests with Bun and happy-dom

Use [Happy DOM](https://github.com/capricorn86/happy-dom) to write browser tests with Bun's test runner. Happy DOM implements mocked versions of browser APIs like `document` and `location`.

***

Install `@happy-dom/global-registrator`.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add -d @happy-dom/global-registrator
```

***

This module exports a "registrator" that injects the mocked browser APIs into the global scope.

```ts happydom.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();
```

***

This file needs to run before any of your test files. That's a job for Bun's built-in [*preload*]() option. Create a `bunfig.toml` file in the root of your project (if it doesn't already exist) and add the following lines.

The `./happydom.ts` file should contain the registration code from the previous step.

```toml bunfig.toml icon="settings" theme={"theme":{"light":"github-light","dark":"dracula"}}
[test]
preload = "./happydom.ts"
```

***

Now `bun test` executes `happydom.ts` before your test files, so you can write tests that use browser APIs.

```ts dom.test.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { test, expect } from "bun:test";

test("set button text", () => {
  document.body.innerHTML = `<button>My button</button>`;
  const button = document.querySelector("button");
  expect(button?.innerText).toEqual("My button");
});
```

***

With Happy DOM registered, the test passes.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun test
```

```txt theme={"theme":{"light":"github-light","dark":"dracula"}}

dom.test.ts:
✓ set button text [0.82ms]

 1 pass
 0 fail
 1 expect() calls
Ran 1 tests across 1 files. 1 total [125.00ms]
```

***

See the [Happy DOM repo](https://github.com/capricorn86/happy-dom) and [DOM testing](/test/dom).
