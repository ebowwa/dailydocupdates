<!--
Source: https://bun.com/docs/guides/util/hash-a-password.md
Downloaded: 2026-07-21T21:18:03.772Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Hash a password

Use `Bun.password.hash()` to securely hash passwords. It's built into Bun, with no third-party dependencies.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const password = "super-secure-pa$$word";

const hash = await Bun.password.hash(password);
// => $argon2id$v=19$m=65536,t=2,p=1$tFq+9AVr1bfPxQdh6E8DQRhEXg/M/...
```

***

By default, `Bun.password.hash()` uses the [Argon2id](https://en.wikipedia.org/wiki/Argon2) algorithm. Pass a second argument to use a different algorithm or configure the hashing parameters.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const password = "super-secure-pa$$word";

// use argon2 (default)
const argonHash = await Bun.password.hash(password, {
  algorithm: "argon2id",
  memoryCost: 8, // memory usage in kibibytes (minimum 8)
  timeCost: 3, // the number of iterations
});
```

***

Bun also implements the [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) algorithm. Specify `algorithm: "bcrypt"` to use it.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
// use bcrypt
const bcryptHash = await Bun.password.hash(password, {
  algorithm: "bcrypt",
  cost: 4, // number between 4-31
});
```

***

Use `Bun.password.verify()` to verify a password. The hash stores the algorithm and its parameters, so you don't need to specify them again.

```ts theme={"theme":{"light":"github-light","dark":"dracula"}}
const password = "super-secure-pa$$word";
const hash = await Bun.password.hash(password);

const isMatch = await Bun.password.verify(password, hash);
// => true
```

***

See [`Bun.password`](/docs/runtime/hashing#bun-password).
