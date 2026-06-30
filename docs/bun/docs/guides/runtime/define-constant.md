<!--
Source: https://bun.com/docs/guides/runtime/define-constant.md
Downloaded: 2026-06-30T20:44:18.812Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Define and replace static globals & constants

The `--define` flag declares statically-analyzable constants and globals. It replaces all usages of an identifier or property in a JavaScript or TypeScript file with a constant value, and works both at runtime and in `bun build`. It's similar to `#define` in C/C++, but for JavaScript.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun --define process.env.NODE_ENV="'production'" src/index.ts # Runtime
bun build --define process.env.NODE_ENV="'production'" src/index.ts # Build
```

***

Bun uses these statically-known values for dead code elimination and other optimizations.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
} else {
  console.log("Development mode");
}
```

***

Before the code reaches the JavaScript engine, Bun replaces `process.env.NODE_ENV` with `"production"`.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
if ("production" === "production") { // [!code ++]
  console.log("Production mode");
} else {
  console.log("Development mode");
}
```

***

Bun's optimizing transpiler also does basic constant folding.

Since `"production" === "production"` is always `true`, Bun replaces the entire expression with the `true` value and drops the unreachable `else` branch.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
if (true) { // [!code ++]
  console.log("Production mode");
}
```

***

To also collapse the surrounding `if` scaffolding down to the following output, pass `--minify-syntax` (also enabled by `--minify`):

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun build --define process.env.NODE_ENV="'production'" --minify-syntax src/index.ts
```

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
console.log("Production mode");
```

***

## What types of values are supported?

Values can be strings, identifiers, properties, or JSON.

### Replace global identifiers

To replace all usages of `window` with `undefined`:

```sh theme={"theme":{"light":"github-light","dark":"dracula"}}
bun --define window="undefined" src/index.ts
```

This is useful for server-side rendering (SSR), or to make sure code doesn't depend on the `window` object.

```js theme={"theme":{"light":"github-light","dark":"dracula"}}
if (typeof window !== "undefined") {
  console.log("Client-side code");
} else {
  console.log("Server-side code");
}
```

The value can also be another identifier. For example, to replace all usages of `global` with `globalThis`:

```sh theme={"theme":{"light":"github-light","dark":"dracula"}}
bun --define global="globalThis" src/index.ts
```

`global` is a global object in Node.js, but not in web browsers, so this replacement fixes code that assumes `global` is available.

### Replace values with JSON

`--define` can also replace values with JSON objects and arrays.

To replace all usages of `AWS` with the JSON object `{"ACCESS_KEY":"abc","SECRET_KEY":"def"}`:

```sh theme={"theme":{"light":"github-light","dark":"dracula"}}
# JSON
bun --define AWS='{"ACCESS_KEY":"abc","SECRET_KEY":"def"}' src/index.ts
```

Bun transforms these into the equivalent JavaScript code.

From:

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
console.log(AWS.ACCESS_KEY); // => "abc"
```

To:

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
console.log("abc");
```

### Replace values with other properties

You can also pass properties to the `--define` flag.

For example, to replace all usages of `console.write` with `console.log`:

```sh theme={"theme":{"light":"github-light","dark":"dracula"}}
bun --define console.write=console.log src/index.ts
```

That transforms the following input:

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
console.write("Hello, world!");
```

Into the following output:

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
console.log("Hello, world!");
```

## How is this different than setting a variable?

You can also set `process.env.NODE_ENV` to `"production"` in your code, but that won't help with dead code elimination. In JavaScript, property accesses can have side effects. Getters & setters can be functions, and even dynamically defined (due to prototype chains and Proxy). Even if you set `process.env.NODE_ENV` to `"production"`, static analysis tools can't assume it is still `"production"` on the next line.

## How is this different than find-and-replace or string replacement?

The `--define` flag operates on the AST (Abstract Syntax Tree), not on text. The replacement happens during transpilation, so it participates in optimizations like dead code elimination.

String replacement tools tend to have escaping issues and replace unintended parts of the code.
