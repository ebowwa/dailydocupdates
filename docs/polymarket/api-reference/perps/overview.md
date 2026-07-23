<!--
Source: https://docs.polymarket.com/api-reference/perps/overview.md
Downloaded: 2026-07-23T21:04:54.599Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Explore the APIs available for building with Polymarket Perps.

## APIs

The Perps API is available over HTTP and WebSocket, with public market data and
authenticated trading and account operations on both.

<CardGroup cols={2}>
  <Card title="HTTP API" icon="globe">
    <code className="text-xs">[https://api.perpetuals.polymarket.com](https://api.perpetuals.polymarket.com)</code>

    Make request-response calls for market data, trading, and account
    management.
  </Card>

  <Card title="WebSocket API" icon="radio">
    <code className="text-xs">wss\://ws.perpetuals.polymarket.com/v1/ws</code>

    Stream public and private updates, or send trading actions over a persistent
    connection.
  </Card>
</CardGroup>

## Before You Integrate

<CardGroup cols={3}>
  <Card title="Authentication" icon="key" href="/perps/authenticated-sessions">
    Set up credentials for private HTTP and WebSocket access.
  </Card>

  <Card title="Rate Limits" icon="gauge" href="/api-reference/perps/rate-limits">
    Review request, trading action, and WebSocket limits.
  </Card>

  <Card title="Geographic Restrictions" icon="globe" href="/api-reference/perps/geographic-restrictions">
    Check where Perps order placement is available.
  </Card>
</CardGroup>
