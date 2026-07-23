<!--
Source: https://docs.polymarket.com/getting-started/sdks-apis.md
Downloaded: 2026-07-23T21:04:54.609Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SDKs & APIs

> Choose how to integrate with Polymarket.

Choose the interface that best fits your application. Use an SDK for a unified,
typed integration, or work with the APIs directly when you need lower-level
control.

<CardGroup cols={3}>
  <Card title="TypeScript SDK" icon="https://mintcdn.com/polymarket-292d1b1b/1lJ_npwaE_MShiVL/images/icons/typescript.svg?fit=max&auto=format&n=1lJ_npwaE_MShiVL&q=85&s=151a411953a3aa74c5505188c336ae09" href="/getting-started/typescript" width="40" height="40" data-path="images/icons/typescript.svg">
    Build services, bots, scripts, and applications with `@polymarket/client`.
  </Card>

  <Card title="Python SDK" icon="python" href="/getting-started/python">
    Build services, notebooks, scripts, and data workflows with
    `polymarket-client`.
  </Card>

  <Card title="API" icon="globe" href="/getting-started/api">
    Build directly against Polymarket REST APIs and WebSocket streams.
  </Card>
</CardGroup>

<Note>
  A unified Rust SDK is in development. For now, see the [Rust migration
  guide](/getting-started/migrate-from-previous-sdks#rust).
</Note>

## Compare Options

|                            | TypeScript SDK                           | Python SDK                       | API                                        |
| -------------------------- | ---------------------------------------- | -------------------------------- | ------------------------------------------ |
| Best for                   | Node.js applications, bots, and services | Services, scripts, and notebooks | Unsupported runtimes and low-level control |
| Data models                | Typed models                             | Typed models                     | Raw JSON                                   |
| Polymarket surfaces        | One client interface                     | One client interface             | Service-specific APIs                      |
| Authentication and signing | SDK helpers                              | SDK helpers                      | Implement directly                         |
| Pagination                 | Consistent paginator                     | Consistent paginator             | Varies by API                              |
| Realtime                   | SDK subscriptions                        | SDK subscriptions                | Connect to each WebSocket surface          |

## Existing Integrations

Already using an earlier Polymarket SDK? Follow the [SDK migration
guide](/getting-started/migrate-from-previous-sdks) to update your integration.
