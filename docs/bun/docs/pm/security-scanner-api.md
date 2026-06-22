<!--
Source: https://bun.com/docs/pm/security-scanner-api.md
Downloaded: 2026-06-22T21:04:36.120Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Security Scanner API

Bun's package manager can scan packages for security vulnerabilities before installation, helping protect your applications from supply chain attacks and known vulnerabilities.

***

## Quick Start

Configure a security scanner in your `bunfig.toml`:

```toml bunfig.toml icon="settings" theme={"theme":{"light":"github-light","dark":"dracula"}}
[install.security]
scanner = "@oven/bun-security-scanner" # example name, replace with your scanner's package
```

When configured, Bun will:

* Scan all packages before installation
* Display security warnings and advisories
* Cancel installation if critical vulnerabilities are found
* Automatically disable auto-install for security

***

## How It Works

Security scanners analyze packages during `bun install`, `bun add`, and other package operations. They can detect:

* Known security vulnerabilities (CVEs)
* Malicious packages
* License compliance issues
* ...and more!

### Security Levels

Scanners report issues at two severity levels:

* **`fatal`** - Installation stops immediately, exits with non-zero code
* **`warn`** - In interactive terminals, prompts to continue; in CI, exits immediately

***

## Using Pre-built Scanners

Many security companies publish Bun security scanners as npm packages that you can install and use immediately.

### Installing a Scanner

Install a security scanner from npm:

```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
bun add -d @oven/bun-security-scanner
```

<Note>
  `@oven/bun-security-scanner` is an example package name, not a real package. Replace it with the scanner you want to
  use, and consult that scanner's documentation for the exact package name and installation instructions. Most scanners
  are installed with `bun add`.
</Note>

### Configuring the Scanner

After installation, configure it in your `bunfig.toml`:

```toml bunfig.toml icon="settings" theme={"theme":{"light":"github-light","dark":"dracula"}}
[install.security]
scanner = "@oven/bun-security-scanner" # example name, replace with your scanner's package
```

### Enterprise Configuration

Some enterprise scanners might support authentication and/or configuration through environment variables:

```bash terminal icon="terminal" theme={"theme":{"light":"github-light","dark":"dracula"}}
# This might go in ~/.bashrc, for example
export SECURITY_API_KEY="your-api-key"

# The scanner will now use these credentials automatically
bun install
```

Consult your security scanner's documentation to learn which environment variables to set and if any additional configuration is required.

### Authoring your own scanner

For a complete example with tests and CI setup, see the official template:
[github.com/oven-sh/security-scanner-template](https://github.com/oven-sh/security-scanner-template)

## Related

* [Configuration (bunfig.toml)](/runtime/bunfig#install-security-scanner)
* [Package Manager](/installation)
* [Security Scanner Template](https://github.com/oven-sh/security-scanner-template)
