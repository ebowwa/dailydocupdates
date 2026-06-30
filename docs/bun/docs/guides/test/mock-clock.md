<!--
Source: https://bun.com/docs/guides/test/mock-clock.md
Downloaded: 2026-06-30T20:44:18.818Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set the system time in Bun's test runner

Set the system time in tests with the `setSystemTime` function from `bun:test`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
import { test, expect, setSystemTime } from "bun:test";

test("party like it's 1999", () => {
  const date = new Date("1999-01-01T00:00:00.000Z");
  setSystemTime(date); // it's now January 1, 1999

  const now = new Date();
  expect(now.getFullYear()).toBe(1999);
  expect(now.getMonth()).toBe(0);
  expect(now.getDate()).toBe(1);
});
```

***

Call `setSystemTime` in a [lifecycle hook](/test/lifecycle) like `beforeAll` to give your tests a deterministic "fake clock".

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
import { test, expect, beforeAll, setSystemTime } from "bun:test";

beforeAll(() => {
  const date = new Date("1999-01-01T00:00:00.000Z");
  setSystemTime(date); // it's now January 1, 1999
});

// tests...
```

***

To reset the system clock to the actual time, call `setSystemTime` with no arguments.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
import { test, expect, beforeAll, setSystemTime } from "bun:test";

setSystemTime(); // reset to actual time
```

***

See [Dates and times](/test/dates-times).
