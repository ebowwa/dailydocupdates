> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set a time zone in Bun

Bun supports programmatically setting a default time zone for the lifetime of the `bun` process. Set the `TZ` environment variable to a [valid time zone identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

<Note>
  When running a file with `bun`, the time zone defaults to your system's configured local time zone.

  When running tests with `bun test`, the time zone is set to `UTC` to make tests more deterministic.
</Note>

```ts process.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
process.env.TZ = "America/New_York";
```

***

You can also set `TZ` on the command line when running a Bun command.

```sh terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
TZ=America/New_York bun run dev
```

***

Once `TZ` is set, every `Date` instance uses that time zone.

```ts process.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
new Date().getHours(); // => 18

process.env.TZ = "America/New_York";

new Date().getHours(); // => 21
```
