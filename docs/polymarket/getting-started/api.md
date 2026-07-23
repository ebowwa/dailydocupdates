<!--
Source: https://docs.polymarket.com/getting-started/api.md
Downloaded: 2026-07-23T21:04:54.609Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# API

> Build directly with Polymarket REST APIs and WebSocket streams.

The Polymarket APIs provide programmatic access to the Polymarket platform.
Each API serves a distinct part of an integration.

## Integration Surfaces

<Tabs>
  <Tab title="REST APIs">
    <CardGroup cols={2}>
      <Card title="Gamma API" icon="database">
        **`https://gamma-api.polymarket.com`**

        Discover events and markets, and retrieve the metadata needed to work with
        them.
      </Card>

      <Card title="CLOB API" icon="arrows-rotate">
        **`https://clob.polymarket.com`**

        Read prices and order books, then place and manage orders.
      </Card>

      <Card title="Data API" icon="chart-line">
        **`https://data-api.polymarket.com`**

        Analyze positions, activity, and market participation.
      </Card>

      <Card title="Relayer API" icon="bolt">
        **`https://relayer-v2.polymarket.com`**

        Submit wallet transactions without requiring the account to hold POL for
        gas.
      </Card>
    </CardGroup>
  </Tab>

  <Tab title="WebSocket APIs">
    <CardGroup cols={2}>
      <Card title="CLOB Market Channel" icon="chart-line" href="/api-reference/wss/market">
        **`wss://ws-subscriptions-clob.polymarket.com/ws/market`**

        Follow public order book, price, and market lifecycle updates.
      </Card>

      <Card title="CLOB User Channel" icon="key" href="/api-reference/wss/user">
        **`wss://ws-subscriptions-clob.polymarket.com/ws/user`**

        Follow authenticated order and trade updates for an account.
      </Card>

      <Card title="RTDS" icon="radio" href="/market-data/realtime-data">
        **`wss://ws-live-data.polymarket.com`**

        Stream public reference prices, comments, and trade activity.
      </Card>

      <Card title="Sports WebSocket" icon="trophy" href="/api-reference/wss/sports">
        **`wss://sports-api.polymarket.com/ws`**

        Follow public live game status and scores.
      </Card>
    </CardGroup>
  </Tab>
</Tabs>

## When to Use the API

Use direct integration when:

* Your runtime is not supported by an official SDK.
* You need exact control over request signing, headers, retries, or transport.
* You need an endpoint or wire format that is not exposed by an SDK yet.

The SDKs provide a unified, typed interface across Polymarket and handle common
integration concerns such as pagination, errors, and wallet setup.

## Make a Public Request

Public market data is available without credentials. For example, list active
markets from the Gamma API:

```bash theme={null}
curl -G "https://gamma-api.polymarket.com/markets" \
  --data-urlencode "closed=false" \
  --data-urlencode "limit=5"
```

## Authentication

CLOB authentication has two layers:

| Layer | How it works                                               | Purpose                                                   |
| ----- | ---------------------------------------------------------- | --------------------------------------------------------- |
| L1    | The wallet signs an EIP-712 message                        | Establish wallet control and create or derive credentials |
| L2    | Requests are signed with API credentials using HMAC-SHA256 | Authenticate private CLOB requests                        |

Order placement uses L2 to authenticate the request and a wallet signature to
authorize the order itself.

To authenticate private CLOB requests, follow these steps:

<Steps>
  <Step title="Create L1 Typed Data">
    Build the `ClobAuth` typed-data payload.

    ```json clobAuthTypedData theme={null}
    {
      "domain": {
        "name": "ClobAuthDomain",
        "version": "1",
        "chainId": 137
      },
      "types": {
        "ClobAuth": [
          { "name": "address", "type": "address" },
          { "name": "timestamp", "type": "string" },
          { "name": "nonce", "type": "uint256" },
          { "name": "message", "type": "string" }
        ]
      },
      "primaryType": "ClobAuth",
      "message": {
        "address": "<signer_address>",
        "timestamp": "<unix_seconds>",
        "nonce": "<nonce>",
        "message": "This message attests that I control the given wallet"
      }
    }
    ```

    Provide these values:

    | Placeholder        | Value                                                   |
    | ------------------ | ------------------------------------------------------- |
    | `<signer_address>` | Polygon address controlled by the signing private key   |
    | `<unix_seconds>`   | Current Unix timestamp in seconds                       |
    | `<nonce>`          | Credential nonce; use `0` unless managing multiple sets |
  </Step>

  <Step title="Create a CLOB L1 Signature">
    Sign `clobAuthTypedData` with the private key that controls
    `<signer_address>`. This example uses Viem.

    ```ts theme={null}
    import { privateKeyToAccount } from "viem/accounts";

    const signer = privateKeyToAccount("<SIGNER_PRIVATE_KEY>");
    const clobL1Signature = await signer.signTypedData(clobAuthTypedData);
    ```

    The returned `clobL1Signature` is the L1 signature for this payload.
  </Step>

  <Step title="Create or Derive CLOB API Credentials">
    Use the signer address, timestamp, and nonce from Step 1 with the signature from
    Step 2 to create credentials. If credentials already exist for that address and
    nonce, derive them instead.

    <CodeGroup>
      ```bash Create theme={null}
      curl -X POST "https://clob.polymarket.com/auth/api-key" \
        -H "POLY_ADDRESS: <signer_address>" \
        -H "POLY_SIGNATURE: <clob_l1_signature>" \
        -H "POLY_TIMESTAMP: <unix_seconds>" \
        -H "POLY_NONCE: <nonce>"
      ```

      ```bash Derive theme={null}
      curl "https://clob.polymarket.com/auth/derive-api-key" \
        -H "POLY_ADDRESS: <signer_address>" \
        -H "POLY_SIGNATURE: <clob_l1_signature>" \
        -H "POLY_TIMESTAMP: <unix_seconds>" \
        -H "POLY_NONCE: <nonce>"
      ```
    </CodeGroup>

    The response contains the three values used for L2 authentication:

    <CodeGroup>
      ```json Response theme={null}
      {
        "apiKey": "<clob_api_key>",
        "secret": "<clob_api_secret>",
        "passphrase": "<clob_api_passphrase>"
      }
      ```

      ```json Example theme={null}
      {
        "apiKey": "7b1e2d60-6f9a-4dd7-8f3e-21b8f94c77a2",
        "secret": "Rnl2cWN0Rk5…c1ZzR1E9PQ==",
        "passphrase": "9fH3kL7m…2qW8xP4r"
      }
      ```
    </CodeGroup>

    Where:

    * `apiKey` is the unique identifier for the API credentials.
    * `secret` is the base64-encoded key used to sign L2 requests with HMAC-SHA256.
    * `passphrase` is the credential value sent in the `POLY_PASSPHRASE` header.
  </Step>

  <Step title="Create a CLOB L2 Signature">
    Whenever you need to authenticate a request, create a new Unix timestamp in
    seconds. Concatenate the timestamp, uppercase HTTP method, route path, and exact
    serialized request body, then sign the result with the API credentials `secret`.

    The example request uses `GET /data/orders`, which has no body:

    ```text theme={null}
    clob_request_timestamp = <unix_seconds>
    method = "GET"
    request_path = "/data/orders"

    message = clob_request_timestamp + method + request_path
    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    For requests with a body, append the exact serialized body sent over the wire.
  </Step>

  <Step title="Send an Authenticated Request">
    Use the timestamp and L2 signature from Step 4 with the signer address and API
    credentials from Step 3. This request retrieves the account's open orders.

    ```bash theme={null}
    curl "https://clob.polymarket.com/data/orders" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>"
    ```

    L2-authenticated CLOB requests use the same five headers:

    | Header            | Value                                      |
    | ----------------- | ------------------------------------------ |
    | `POLY_ADDRESS`    | Polygon signer address                     |
    | `POLY_SIGNATURE`  | HMAC-SHA256 signature from Step 4          |
    | `POLY_TIMESTAMP`  | Unix timestamp used to build the signature |
    | `POLY_API_KEY`    | API credentials `apiKey` value             |
    | `POLY_PASSPHRASE` | API credentials `passphrase` value         |
  </Step>
</Steps>

## Next Steps

<CardGroup cols={3}>
  <Card title="Read Market Data" icon="chart-line" href="/market-data/overview">
    Discover markets and work with prices, order books, and historical data.
  </Card>

  <Card title="Subscribe to Real-Time Updates" icon="radio" href="/market-data/realtime-data">
    Stream market and account updates as they happen.
  </Card>

  <Card title="Place Your First Order" icon="rocket" href="/trading/quickstart">
    Set up an account and complete your first authenticated trade.
  </Card>
</CardGroup>
