<!--
Source: https://docs.polymarket.com/market-data/websocket/rtds.md
Downloaded: 2026-02-22T02:57:47.668Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Real-Time Data Socket

> Stream comments and crypto prices via WebSocket

The Polymarket Real-Time Data Socket (RTDS) is a WebSocket-based streaming service that provides real-time updates for **comments** and **crypto prices**.

<Card title="TypeScript client" icon="github" href="https://github.com/Polymarket/real-time-data-client">
  Official RTDS TypeScript client (`real-time-data-client`).
</Card>

## Endpoint

```
wss://ws-live-data.polymarket.com
```

Some user-specific streams may require `gamma_auth` with your wallet address.

## Subscribing

Send a JSON message to subscribe to data streams:

```json  theme={null}
{
  "action": "subscribe",
  "subscriptions": [
    {
      "topic": "topic_name",
      "type": "message_type",
      "filters": "optional_filter_string",
      "gamma_auth": {
        "address": "wallet_address"
      }
    }
  ]
}
```

To unsubscribe, send the same structure with `"action": "unsubscribe"`.

Subscriptions can be added, removed, and modified without disconnecting. Send `PING` messages every 5 seconds to maintain the connection.

<Note>Only the subscription types documented below are supported.</Note>

## Message Structure

All messages follow this structure:

```json  theme={null}
{
  "topic": "string",
  "type": "string",
  "timestamp": "number",
  "payload": "object"
}
```

| Field       | Type   | Description                                                 |
| ----------- | ------ | ----------------------------------------------------------- |
| `topic`     | string | The subscription topic (e.g., `crypto_prices`, `comments`)  |
| `type`      | string | The message type/event (e.g., `update`, `reaction_created`) |
| `timestamp` | number | Unix timestamp in milliseconds when the message was sent    |
| `payload`   | object | Event-specific data object                                  |

## Crypto Prices

Real-time cryptocurrency price data from two sources: **Binance** and **Chainlink**. No authentication required.

### Binance Source

Subscribe to all symbols:

```json  theme={null}
{
  "action": "subscribe",
  "subscriptions": [
    {
      "topic": "crypto_prices",
      "type": "update"
    }
  ]
}
```

Subscribe to specific symbols with a comma-separated filter:

```json  theme={null}
{
  "action": "subscribe",
  "subscriptions": [
    {
      "topic": "crypto_prices",
      "type": "update",
      "filters": "solusdt,btcusdt,ethusdt"
    }
  ]
}
```

Symbols use lowercase concatenated format (e.g., `solusdt`, `btcusdt`).

**Solana price update:**

```json  theme={null}
{
  "topic": "crypto_prices",
  "type": "update",
  "timestamp": 1753314064237,
  "payload": {
    "symbol": "solusdt",
    "timestamp": 1753314064213,
    "value": 189.55
  }
}
```

**Bitcoin price update:**

```json  theme={null}
{
  "topic": "crypto_prices",
  "type": "update",
  "timestamp": 1753314088421,
  "payload": {
    "symbol": "btcusdt",
    "timestamp": 1753314088395,
    "value": 67234.50
  }
}
```

### Chainlink Source

<Tip>
  **Trading 15m Crypto Markets?** Get a sponsored Chainlink API key with onboarding support from Chainlink. Fill out [this form](https://pm-ds-request.streams.chain.link/).
</Tip>

Subscribe to all symbols:

```json  theme={null}
{
  "action": "subscribe",
  "subscriptions": [
    {
      "topic": "crypto_prices_chainlink",
      "type": "*",
      "filters": ""
    }
  ]
}
```

Subscribe to a specific symbol with a JSON filter:

```json  theme={null}
{
  "action": "subscribe",
  "subscriptions": [
    {
      "topic": "crypto_prices_chainlink",
      "type": "*",
      "filters": "{\"symbol\":\"eth/usd\"}"
    }
  ]
}
```

Symbols use slash-separated format (e.g., `eth/usd`, `btc/usd`).

**Ethereum price update:**

```json  theme={null}
{
  "topic": "crypto_prices_chainlink",
  "type": "update",
  "timestamp": 1753314064237,
  "payload": {
    "symbol": "eth/usd",
    "timestamp": 1753314064213,
    "value": 3456.78
  }
}
```

**Bitcoin price update:**

```json  theme={null}
{
  "topic": "crypto_prices_chainlink",
  "type": "update",
  "timestamp": 1753314088421,
  "payload": {
    "symbol": "btc/usd",
    "timestamp": 1753314088395,
    "value": 67234.50
  }
}
```

### Price Payload Fields

| Field       | Type   | Description                                                                                                                                        |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `symbol`    | string | Trading pair symbol. **Binance**: lowercase concatenated (e.g., `solusdt`, `btcusdt`). **Chainlink**: slash-separated (e.g., `eth/usd`, `btc/usd`) |
| `timestamp` | number | When the price was recorded, in Unix milliseconds                                                                                                  |
| `value`     | number | Current price value in the quote currency                                                                                                          |

### Supported Symbols

**Binance Source** — lowercase concatenated format:

* `btcusdt` — Bitcoin to USDT
* `ethusdt` — Ethereum to USDT
* `solusdt` — Solana to USDT
* `xrpusdt` — XRP to USDT

**Chainlink Source** — slash-separated format:

* `btc/usd` — Bitcoin to USD
* `eth/usd` — Ethereum to USD
* `sol/usd` — Solana to USD
* `xrp/usd` — XRP to USD

## Comments

Real-time comment events on the Polymarket platform, including new comments, replies, reactions, and removals. May require Gamma authentication for user-specific data.

### Subscribe

```json  theme={null}
{
  "action": "subscribe",
  "subscriptions": [
    {
      "topic": "comments",
      "type": "comment_created"
    }
  ]
}
```

### Message Types

| Type               | Description                           |
| ------------------ | ------------------------------------- |
| `comment_created`  | A user creates a new comment or reply |
| `comment_removed`  | A comment is removed or deleted       |
| `reaction_created` | A user adds a reaction to a comment   |
| `reaction_removed` | A reaction is removed from a comment  |

### comment\_created

Emitted when a user posts a new comment or replies to an existing one.

```json  theme={null}
{
  "topic": "comments",
  "type": "comment_created",
  "timestamp": 1753454975808,
  "payload": {
    "body": "That's a good point about the definition.",
    "createdAt": "2025-07-25T14:49:35.801298Z",
    "id": "1763355",
    "parentCommentID": "1763325",
    "parentEntityID": 18396,
    "parentEntityType": "Event",
    "profile": {
      "baseAddress": "0xce533188d53a16ed580fd5121dedf166d3482677",
      "displayUsernamePublic": true,
      "name": "salted.caramel",
      "proxyWallet": "0x4ca749dcfa93c87e5ee23e2d21ff4422c7a4c1ee",
      "pseudonym": "Adored-Disparity"
    },
    "reactionCount": 0,
    "replyAddress": "0x0bda5d16f76cd1d3485bcc7a44bc6fa7db004cdd",
    "reportCount": 0,
    "userAddress": "0xce533188d53a16ed580fd5121dedf166d3482677"
  }
}
```

A reply to the above comment — note `parentCommentID` references the parent:

```json  theme={null}
{
  "topic": "comments",
  "type": "comment_created",
  "timestamp": 1753454985123,
  "payload": {
    "body": "I agree, the resolution criteria should be clearer.",
    "createdAt": "2025-07-25T14:49:45.120000Z",
    "id": "1763356",
    "parentCommentID": "1763355",
    "parentEntityID": 18396,
    "parentEntityType": "Event",
    "profile": {
      "baseAddress": "0x1234567890abcdef1234567890abcdef12345678",
      "displayUsernamePublic": true,
      "name": "trader",
      "proxyWallet": "0x9876543210fedcba9876543210fedcba98765432",
      "pseudonym": "Bright-Analysis"
    },
    "reactionCount": 0,
    "replyAddress": "0x0bda5d16f76cd1d3485bcc7a44bc6fa7db004cdd",
    "reportCount": 0,
    "userAddress": "0x1234567890abcdef1234567890abcdef12345678"
  }
}
```

### Comment Payload Fields

| Field              | Type   | Description                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------- |
| `body`             | string | The text content of the comment                                           |
| `createdAt`        | string | ISO 8601 timestamp when the comment was created                           |
| `id`               | string | Unique identifier for this comment                                        |
| `parentCommentID`  | string | ID of the parent comment if this is a reply (null for top-level comments) |
| `parentEntityID`   | number | ID of the parent entity (event, market, etc.)                             |
| `parentEntityType` | string | Type of parent entity (`Event`, `Market`)                                 |
| `profile`          | object | Profile information of the comment author                                 |
| `reactionCount`    | number | Current number of reactions on this comment                               |
| `replyAddress`     | string | Polygon address for replies (may differ from userAddress)                 |
| `reportCount`      | number | Current number of reports on this comment                                 |
| `userAddress`      | string | Polygon address of the comment author                                     |

### Profile Object Fields

| Field                   | Type    | Description                                |
| ----------------------- | ------- | ------------------------------------------ |
| `baseAddress`           | string  | User profile address                       |
| `displayUsernamePublic` | boolean | Whether the username is displayed publicly |
| `name`                  | string  | User's display name                        |
| `proxyWallet`           | string  | Proxy wallet address used for transactions |
| `pseudonym`             | string  | Generated pseudonym for the user           |

### Comment Hierarchy

Comments support nested threading:

* **Top-level comments**: `parentCommentID` is null or empty
* **Reply comments**: `parentCommentID` contains the ID of the parent comment
* All comments are associated with a `parentEntityID` and `parentEntityType` (`Event` or `Market`)

## Troubleshooting

<Accordion title="Connection drops unexpectedly">
  Send `PING` messages every 5 seconds to keep the connection alive. Connection errors will trigger automatic reconnection attempts.
</Accordion>

<Accordion title="Not receiving messages after subscribing">
  Verify your subscription message is valid JSON with the correct `action`, `topic`, and `type` fields. Invalid subscription messages may result in connection closure.
</Accordion>

<Accordion title="Authentication failures">
  If subscribing to user-specific streams, ensure your `gamma_auth` object includes a valid wallet `address`. Authentication failures will prevent subscription to protected topics.
</Accordion>
