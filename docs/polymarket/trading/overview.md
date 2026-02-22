<!--
Source: https://docs.polymarket.com/trading/overview.md
Downloaded: 2026-02-22T05:37:55.170Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Trading on the Polymarket CLOB

Polymarket's CLOB (Central Limit Order Book) is a hybrid-decentralized trading system — offchain order matching with onchain settlement via the [Exchange contract](https://github.com/Polymarket/ctf-exchange/tree/main/src) ([audited by Chainsecurity](https://github.com/Polymarket/ctf-exchange/blob/main/audit/ChainSecurity_Polymarket_Exchange_audit.pdf)). All trading is non-custodial. Orders are [EIP-712](https://eips.ethereum.org/EIPS/eip-712) signed messages, and matched trades settle atomically on Polygon. The operator cannot set prices or execute unauthorized trades — users can always cancel orders onchain independently.

We recommend using the open-source SDK clients, which handle order signing, authentication, and submission:

<CardGroup cols={2}>
  <Card title="TypeScript Client" icon="github" href="https://github.com/Polymarket/clob-client">
    <p className="font-mono text-[0.8rem]">
      npm install @polymarket/clob-client
    </p>
  </Card>

  <Card title="Python Client" icon="github" href="https://github.com/Polymarket/py-clob-client">
    <p className="font-mono text-[0.8rem]">pip install py-clob-client</p>
  </Card>
</CardGroup>

<Info>
  You can also use the REST API directly, but you'll need to manage [EIP-712
  order
  signing](https://github.com/Polymarket/clob-client/blob/main/src/signing/eip712.ts)
  and [HMAC authentication
  headers](https://github.com/Polymarket/clob-client/blob/main/src/signing/hmac.ts)
  yourself. See [REST API Headers](#rest-api-headers) below.
</Info>

***

## Authentication

The CLOB uses two levels of authentication:

| Level  | Method                          | Purpose                                   |
| ------ | ------------------------------- | ----------------------------------------- |
| **L1** | EIP-712 signature (private key) | Create or derive API credentials          |
| **L2** | HMAC-SHA256 (API credentials)   | Place orders, cancel orders, query trades |

You use your private key once to derive **L2 credentials** (API key, secret, passphrase), which authenticate all subsequent trading requests.

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { ClobClient } from "@polymarket/clob-client";
  import { Wallet } from "ethers"; // v5.8.0

  const signer = new Wallet(process.env.PRIVATE_KEY);

  // Derive L2 API credentials
  const tempClient = new ClobClient("https://clob.polymarket.com", 137, signer);
  const apiCreds = await tempClient.createOrDeriveApiKey();
  ```

  ```python Python theme={null}
  from py_clob_client.client import ClobClient
  import os

  private_key = os.getenv("PRIVATE_KEY")

  # Derive L2 API credentials
  temp_client = ClobClient("https://clob.polymarket.com", key=private_key, chain_id=137)
  api_creds = temp_client.create_or_derive_api_creds()
  ```
</CodeGroup>

***

## Signature Types

When initializing the trading client, you must specify your wallet's **signature type** and **funder address**:

| Wallet Type      | ID  | When to Use                                                                                                                                  | Funder Address            |
| ---------------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| **EOA**          | `0` | Standalone wallet — you pay your own gas (POL for gas)                                                                                       | Your EOA wallet address   |
| **POLY\_PROXY**  | `1` | Polymarket account via Magic Link (email/Google login). Requires [exported private key](https://polymarket.com/settings) from Polymarket.com | Your proxy wallet address |
| **GNOSIS\_SAFE** | `2` | Polymarket account via browser wallet (MetaMask, Rabby) or embedded wallet (Privy, Turnkey). Most common type                                | Your proxy wallet address |

<Note>
  If you have a Polymarket.com account, your funds are in a proxy wallet visible
  in the profile dropdown. Use type `1` or `2`. Type `0` is for standalone EOA
  wallets only.
</Note>

### Initialize the Trading Client

<CodeGroup>
  ```typescript TypeScript theme={null}
  const client = new ClobClient(
    "https://clob.polymarket.com",
    137,
    signer,
    apiCreds,
    2, // GNOSIS_SAFE
    "0x...", // Your proxy wallet address
  );
  ```

  ```python Python theme={null}
  client = ClobClient(
      "https://clob.polymarket.com",
      key=private_key,
      chain_id=137,
      creds=api_creds,
      signature_type=2,  # GNOSIS_SAFE
      funder="0x..."  # Your proxy wallet address
  )
  ```
</CodeGroup>

***

## REST API Headers

If you're using the REST API directly (without the SDK), you need to attach authentication headers to each request.

**L1 Headers** — for creating or deriving API credentials:

| Header           | Description         |
| ---------------- | ------------------- |
| `POLY_ADDRESS`   | Your wallet address |
| `POLY_SIGNATURE` | EIP-712 signature   |
| `POLY_TIMESTAMP` | Unix timestamp      |
| `POLY_NONCE`     | Request nonce       |

**L2 Headers** — for all trading operations (orders, cancellations, queries):

| Header            | Description                          |
| ----------------- | ------------------------------------ |
| `POLY_ADDRESS`    | Your wallet address                  |
| `POLY_SIGNATURE`  | HMAC-SHA256 signature of the request |
| `POLY_TIMESTAMP`  | Unix timestamp                       |
| `POLY_API_KEY`    | Your API key                         |
| `POLY_PASSPHRASE` | Your API passphrase                  |

<Note>
  Even with L2 authentication, methods that create orders still require the
  user's private key for EIP-712 order payload signing. L2 credentials
  authenticate the request, but the order itself must be signed by the key.
</Note>

***

## Client Methods

<CardGroup cols={2}>
  <Card title="Public Methods" icon="globe" href="/trading/clients/public">
    Market data, orderbooks, prices, and spreads — no auth required.
  </Card>

  <Card title="L1 Methods" icon="key" href="/trading/clients/l1">
    Sign orders and derive API credentials with your private key.
  </Card>

  <Card title="L2 Methods" icon="lock" href="/trading/clients/l2">
    Place orders, cancel orders, query trades, and manage notifications.
  </Card>

  <Card title="Builder Methods" icon="hammer" href="/trading/clients/builder">
    Track attributed trades and manage builder credentials.
  </Card>
</CardGroup>

***

## What Is in This Section

<CardGroup cols={2}>
  <Card title="Quickstart" icon="bolt" href="/trading/quickstart">
    Place your first order end-to-end
  </Card>

  <Card title="Orderbook" icon="chart-bar" href="/trading/orderbook">
    Reading the orderbook, prices, spreads, and midpoints
  </Card>

  <Card title="Orders" icon="list-check" href="/trading/orders/create">
    Order types, tick sizes, creating, cancelling, and querying orders
  </Card>

  <Card title="Fees" icon="receipt" href="/trading/fees">
    Fee structure, fee-enabled markets, and maker rebates
  </Card>

  <Card title="Gasless Transactions" icon="gas-pump" href="/trading/gasless">
    Execute onchain operations without paying gas
  </Card>

  <Card title="CTF Tokens" icon="coins" href="/trading/ctf/overview">
    Split, merge, and redeem outcome tokens
  </Card>

  <Card title="Bridge" icon="bridge" href="/trading/bridge/deposit">
    Deposit and withdraw funds across chains
  </Card>
</CardGroup>
