> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Clients & SDKs

> Official open-source libraries for interacting with Polymarket

Polymarket provides official open-source clients in TypeScript, Python, and Rust. All three support the full CLOB API including market data, order management, and authentication.

## Installation

<CodeGroup>
  ```bash TypeScript theme={null}
  npm install @polymarket/clob-client ethers@5
  ```

  ```bash Python theme={null}
  pip install py-clob-client
  ```

  ```bash Rust theme={null}
  cargo add polymarket-client-sdk
  ```
</CodeGroup>

## Quick Example

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { ClobClient } from "@polymarket/clob-client";

  const client = new ClobClient(
    "https://clob.polymarket.com",
    137,
    signer,
    apiCreds,
  );

  const markets = await client.getMarkets();
  ```

  ```python Python theme={null}
  from py_clob_client.client import ClobClient

  client = ClobClient(
      "https://clob.polymarket.com",
      key=private_key,
      chain_id=137,
      creds=api_creds,
  )

  markets = client.get_markets()
  ```
</CodeGroup>

## Source Code

| Language   | Package                   | Repository                                                                           |
| ---------- | ------------------------- | ------------------------------------------------------------------------------------ |
| TypeScript | `@polymarket/clob-client` | [github.com/Polymarket/clob-client](https://github.com/Polymarket/clob-client)       |
| Python     | `py-clob-client`          | [github.com/Polymarket/py-clob-client](https://github.com/Polymarket/py-clob-client) |
| Rust       | `polymarket-client-sdk`   | [github.com/Polymarket/rs-clob-client](https://github.com/Polymarket/rs-clob-client) |

Each repository includes working examples in the `/examples` directory.

## Builder SDKs

If you're building an app through the [Builder Program](/builders/overview), additional signing SDKs are available:

| Language   | Package                           | Repository                                                                                           |
| ---------- | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| TypeScript | `@polymarket/builder-signing-sdk` | [github.com/Polymarket/builder-signing-sdk](https://github.com/Polymarket/builder-signing-sdk)       |
| Python     | `py_builder_signing_sdk`          | [github.com/Polymarket/py-builder-signing-sdk](https://github.com/Polymarket/py-builder-signing-sdk) |

See [Order Attribution](/trading/orders/attribution) for usage details.

## Relayer SDK

For [gasless transactions](/trading/gasless) using proxy wallets, the relayer client handles submitting transactions through Polymarket's relayer:

| Language   | Package                              | Repository                                                                                                 |
| ---------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| TypeScript | `@polymarket/builder-relayer-client` | [github.com/Polymarket/builder-relayer-client](https://github.com/Polymarket/builder-relayer-client)       |
| Python     | `py-builder-relayer-client`          | [github.com/Polymarket/py-builder-relayer-client](https://github.com/Polymarket/py-builder-relayer-client) |

## Next Steps

<CardGroup cols={2}>
  <Card title="Quickstart" icon="rocket" href="/quickstart">
    Set up your client and place your first order.
  </Card>

  <Card title="Authentication" icon="lock" href="/api-reference/authentication">
    Understand L1/L2 auth and API credentials.
  </Card>
</CardGroup>
