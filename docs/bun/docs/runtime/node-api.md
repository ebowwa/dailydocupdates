<!--
Source: https://bun.com/docs/runtime/node-api.md
Downloaded: 2026-07-08T21:08:09.507Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Node-API

> Use Bun's Node-API module to build native add-ons to Node.js

Node-API is an interface for building native add-ons to Node.js. Bun implements this interface from scratch, so most existing Node-API extensions work with Bun out of the box.

As in Node.js, you can `require()` `.node` files (Node-API modules) directly.

```js theme={"theme":{"light":"github-light","dark":"dracula"}}
const napi = require("./my-node-module.node");
```

Alternatively, use `process.dlopen`:

```js theme={"theme":{"light":"github-light","dark":"dracula"}}
let mod = { exports: {} };
process.dlopen(mod, "./my-node-module.node");
```
