<!--
Source: https://bun.com/docs/runtime/console.md
Downloaded: 2026-07-08T21:08:09.503Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Console

> The console object in Bun

<Note>
  Bun provides a browser- and Node.js-compatible [console](https://developer.mozilla.org/en-US/docs/Web/API/console)
  global. This page only documents Bun-native APIs.
</Note>

***

## Object inspection depth

You can configure how deeply `console.log()` prints nested objects:

* **CLI flag**: Use `--console-depth <number>` to set the depth for a single run
* **Configuration**: Set `console.depth` in your `bunfig.toml` to persist it across runs
* **Default**: Objects are inspected to a depth of `2` levels

```js theme={"theme":{"light":"github-light","dark":"dracula"}}
const nested = { a: { b: { c: { d: "deep" } } } };
console.log(nested);
// Default (depth 2): { a: { b: { c: [Object ...] } } }
// With depth 4: { a: { b: { c: { d: 'deep' } } } }
```

The CLI flag takes precedence over the configuration file setting.

***

## Reading from stdin

In Bun, the `console` object is also an `AsyncIterable` that reads `process.stdin` line by line.

```ts adder.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
for await (const line of console) {
  console.log(line);
}
```

Use this for interactive programs, like the following addition calculator.

```ts adder.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
console.log(`Let's add some numbers!`);
console.write(`Count: 0\n> `);

let count = 0;
for await (const line of console) {
  count += Number(line);
  console.write(`Count: ${count}\n> `);
}
```

To run the file:

```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun adder.ts
Let's add some numbers!
Count: 0
> 5
Count: 5
> 5
Count: 10
> 5
Count: 15
```
