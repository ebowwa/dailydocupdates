> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Using Testing Library with Bun

You can use [Testing Library](https://testing-library.com/) with Bun's test runner.

***

First, install [Happy DOM](https://github.com/capricorn86/happy-dom) (see [Bun's Happy DOM guide](/guides/test/happy-dom)).

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add -D @happy-dom/global-registrator
```

***

Next, install the Testing Library packages you plan to use, plus `@testing-library/jest-dom` for the matchers used later. For React:

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add -D @testing-library/react @testing-library/dom @testing-library/jest-dom
```

***

Next, create preload scripts for Happy DOM and for Testing Library.

```ts happydom.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();
```

***

For Testing Library, extend Bun's `expect` function with Testing Library's matchers. Optionally, run cleanup after each test to better match the behavior of test runners like Jest.

```ts testing-library.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { afterEach, expect } from "bun:test";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Optional: cleans up `render` after each test
afterEach(() => {
  cleanup();
});
```

***

Next, add these preload scripts to your `bunfig.toml`. You can also put everything in a single `preload.ts` script.

```toml bunfig.toml icon="settings" theme={"theme":{"light":"github-light","dark":"dracula"}}
[test]
preload = ["./happydom.ts", "./testing-library.ts"]
```

***

If you use TypeScript, you also need declaration merging so the new matcher types show up in your editor. Create a type declaration file that extends `Matchers`.

```ts matchers.d.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import { Matchers, AsymmetricMatchers } from "bun:test";

declare module "bun:test" {
  interface Matchers<T> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
```

***

Now you can use Testing Library in your tests.

```tsx myComponent.test.tsx icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
import { test, expect } from "bun:test";
import { screen, render } from "@testing-library/react";
import { MyComponent } from "./myComponent";

test("Can use Testing Library", () => {
  render(MyComponent);
  const myComponent = screen.getByTestId("my-component");
  expect(myComponent).toBeInTheDocument();
});
```

***

See the [Testing Library docs](https://testing-library.com/), the [Happy DOM repo](https://github.com/capricorn86/happy-dom), and [DOM testing](/test/dom).
