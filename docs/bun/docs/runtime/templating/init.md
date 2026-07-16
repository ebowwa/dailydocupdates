> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# bun init

> Scaffold an empty Bun project with the interactive `bun init` command

Scaffold a new Bun project with `bun init`.

```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun init my-app
```

```txt theme={"theme":{"light":"github-light","dark":"dracula"}}
? Select a project template - Press return to submit.
❯ Blank
  React
  Library

✓ Select a project template: Blank

 + .gitignore
 + CLAUDE.md
 + .cursor/rules/use-bun-instead-of-node-vite-npm-pnpm.mdc -> CLAUDE.md
 + index.ts
 + tsconfig.json (for editor autocomplete)
 + README.md
```

Press `enter` to accept the default answer for each prompt, or pass the `-y` flag to auto-accept the defaults.

***

`bun init` infers settings with sane defaults and is non-destructive when run multiple times.

<Frame>
  ![Demo](https://user-images.githubusercontent.com/709451/183006613-271960a3-ff22-4f7c-83f5-5e18f684c836.gif)
</Frame>

It creates:

* a `package.json` file with a name that defaults to the current directory name
* a `tsconfig.json` or `jsconfig.json` file, depending on whether the entry point is a TypeScript file
* an entry point, which defaults to `index.ts` unless any of `index.{tsx, jsx, js, mts, mjs}` exist or the `package.json` specifies a `module` or `main` field
* a `README.md` file

AI Agent rules (disable with `$BUN_AGENT_RULE_DISABLED=1`):

* a `CLAUDE.md` file when Claude CLI is detected (disable with `CLAUDE_CODE_AGENT_RULE_DISABLED` env var)
* a `.cursor/rules/*.mdc` file when Cursor is detected, which tells [Cursor AI](https://cursor.sh) to use Bun instead of Node.js and npm

Pass `-y` or `--yes` to accept the defaults without prompting.

At the end, it runs `bun install` to install `@types/bun`.

***

## CLI Usage

```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun init <folder?>
```

### Initialization Options

<ParamField path="--yes" type="boolean">
  {" "}

  Accept all default prompts without asking questions. Alias: <code>-y</code>{" "}
</ParamField>

<ParamField path="--minimal" type="boolean">
  {" "}

  Only initialize type definitions (skip app scaffolding). Alias: <code>-m</code>{" "}
</ParamField>

### Project Templates

<ParamField path="--react" type="string|boolean">
  {" "}

  Scaffold a React project. When used without a value, creates a baseline React app.
  <br /> Accepts values for presets:{" "}

  <ul>
    {" "}

    <li>
      <code>tailwind</code> – React app preconfigured with Tailwind CSS
    </li>

    {" "}

    <li>
      <code>shadcn</code> – React app with <code>@shadcn/ui</code> and Tailwind CSS
    </li>

    {" "}
  </ul>

  {" "}

  Examples:{" "}

  <pre>
    <code>bun init --react bun init --react=tailwind bun init --react=shadcn</code>
  </pre>

  {" "}
</ParamField>

### Output & Files

<ParamField path="(result)" type="info">
  {" "}

  Initializes project files and configuration for the chosen options. Exact files vary by template.{" "}
</ParamField>

### Help

<ParamField path="--help" type="boolean">
  {" "}

  Print this help menu. Alias: <code>-h</code>{" "}
</ParamField>

### Examples

* Accept all defaults

  ```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
  bun init -y
  ```

* React

  ```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
  bun init --react
  ```

* React + Tailwind CSS

  ```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
  bun init --react=tailwind
  ```

* React + @shadcn/ui
  ```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
  bun init --react=shadcn
  ```
