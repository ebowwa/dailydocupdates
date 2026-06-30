<!--
Source: https://bun.com/docs/guides/test/svelte-test.md
Downloaded: 2026-06-30T20:44:18.819Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# import, require, and test Svelte components with bun test

Use Bun's [Plugin API](/runtime/plugins) to add a custom loader for `.svelte` files, and the `test.preload` option in `bunfig.toml` to load it before your tests run.

First, install `@testing-library/svelte`, `svelte`, and `@happy-dom/global-registrator`.

```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add @testing-library/svelte svelte@4 @happy-dom/global-registrator
```

Then, save this plugin in your project.

```ts svelte-loader.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { plugin } from "bun";
import { compile } from "svelte/compiler";
import { readFileSync } from "fs";
import { beforeEach, afterEach } from "bun:test";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

beforeEach(async () => {
  await GlobalRegistrator.register();
});

afterEach(async () => {
  await GlobalRegistrator.unregister();
});

plugin({
  title: "svelte loader",
  setup(builder) {
    builder.onLoad({ filter: /\.svelte(\?[^.]+)?$/ }, ({ path }) => {
      try {
        const source = readFileSync(path.substring(0, path.includes("?") ? path.indexOf("?") : path.length), "utf-8");

        const result = compile(source, {
          filetitle: path,
          generate: "client",
          dev: false,
        });

        return {
          contents: result.js.code,
          loader: "js",
        };
      } catch (err) {
        throw new Error(`Failed to compile Svelte component: ${err.message}`);
      }
    });
  },
});
```

***

Add this to `bunfig.toml` so Bun preloads the plugin before your tests run.

```toml bunfig.toml icon="settings" theme={"theme":{"light":"github-light","dark":"dracula"}}
[test]
# Tell Bun to load this plugin before your tests run
preload = ["./svelte-loader.ts"]

# This also works:
# test.preload = ["./svelte-loader.ts"]
```

***

Add an example `.svelte` file in your project.

```html Counter.svelte icon="file-code" theme={"theme":{"light":"github-light","dark":"dracula"}}
<script>
  export let initialCount = 0;
  let count = initialCount;
</script>

<button on:click="{()" ="">(count += 1)}>+1</button>
```

***

Now you can `import` or `require` `*.svelte` files in your tests. Bun loads each Svelte component as a JavaScript module.

```ts hello-svelte.test.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { test, expect } from "bun:test";
import { render, fireEvent } from "@testing-library/svelte";
import Counter from "./Counter.svelte";

test("Counter increments when clicked", async () => {
  const { getByText, component } = render(Counter);
  const button = getByText("+1");

  // Initial state
  expect(component.$$.ctx[0]).toBe(0); // initialCount is the first prop

  // Click the increment button
  await fireEvent.click(button);

  // Check the new state
  expect(component.$$.ctx[0]).toBe(1);
});
```

***

Use `bun test` to run your tests.

```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun test
```
