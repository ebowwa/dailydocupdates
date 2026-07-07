> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Run Bun as a daemon with PM2

[PM2](https://pm2.keymetrics.io/) is a process manager that runs your applications as daemons (background processes).

It offers process monitoring, automatic restarts, and scaling, and keeps your application running when you deploy it to a cloud-hosted virtual private server (VPS).

***

You can use PM2 with Bun in two ways: as a CLI option or in a configuration file.

### With `--interpreter`

To start your application with PM2 and Bun as the interpreter, run:

```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
pm2 start --interpreter ~/.bun/bin/bun index.ts
```

***

### With a configuration file

Alternatively, create a file named `pm2.config.js` in your project directory and add the following content.

```js pm2.config.js icon="file-code" theme={"theme":{"light":"github-light","dark":"dracula"}}
module.exports = {
  name: "app", // Name of your application
  script: "index.ts", // Entry point of your application
  interpreter: "bun", // Bun interpreter
  env: {
    PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`, // Add "~/.bun/bin/bun" to PATH
  },
};
```

***

After saving the file, start your application with PM2.

```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
pm2 start pm2.config.js
```

***

Your JavaScript/TypeScript web server now runs as a daemon with PM2, using Bun as the interpreter.
