<!--
Source: https://bun.com/docs/guides/process/stdin.md
Downloaded: 2026-07-21T21:18:03.764Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Read from stdin

In Bun, the `console` object is an `AsyncIterable` that yields lines from `stdin`.

```ts index.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
const prompt = "Type something: ";
process.stdout.write(prompt);
for await (const line of console) {
  console.log(`You typed: ${line}`);
  process.stdout.write(prompt);
}
```

***

Running this file starts a never-ending interactive prompt that echoes whatever you type.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun run index.ts
```

```txt theme={"theme":{"light":"github-light","dark":"dracula"}}
Type something: hello
You typed: hello
Type something: hello again
You typed: hello again
```

***

Bun also exposes `stdin` as a `BunFile`, `Bun.stdin`. Use it to incrementally read large inputs piped into the `bun` process.

Chunks aren't guaranteed to be split line-by-line.

```ts stdin.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
for await (const chunk of Bun.stdin.stream()) {
  // chunk is Uint8Array
  // this converts it to text (assumes ASCII encoding)
  const chunkText = Buffer.from(chunk).toString();
  console.log(`Chunk: ${chunkText}`);
}
```

***

Running `stdin.ts` prints whatever is piped into it.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
echo "hello" | bun run stdin.ts
```

```txt theme={"theme":{"light":"github-light","dark":"dracula"}}
Chunk: hello
```

***

See [Utils](/docs/runtime/utils) for more utilities.
