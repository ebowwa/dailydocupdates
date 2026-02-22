<!--
Source: https://docs.polymarket.com/trading/orders/overview.md
Downloaded: 2026-02-22T02:57:47.674Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Order types, tick sizes, and querying orders

All orders on Polymarket are expressed as **limit orders**. Market orders are supported by submitting a limit order with a marketable price — your order executes immediately at the best available price on the book.

The underlying order primitive is structured, hashed, and signed using the [EIP-712](https://eips.ethereum.org/EIPS/eip-712) standard, then executed onchain via the Exchange contract. Preparing orders manually is involved, so we recommend using the open-source [TypeScript](https://github.com/Polymarket/clob-client) or [Python](https://github.com/Polymarket/py-clob-client) SDK clients, which handle signing and submission for you.

<Info>
  If you prefer to use the REST API directly, you'll need to manage order
  signing yourself. See [Authentication](/api-reference/authentication) for details on
  constructing the required headers.
</Info>

***

## Order Types

| Type                         | Behavior                                                                                           | Use Case                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **GTC** (Good-Til-Cancelled) | Rests on the book until filled or cancelled                                                        | Default for passive limit orders       |
| **GTD** (Good-Til-Date)      | Active until a specified expiration time (UTC seconds timestamp), unless filled or cancelled first | Auto-expire orders before known events |
| **FOK** (Fill-Or-Kill)       | Must be filled immediately and entirely, or the whole order is cancelled                           | All-or-nothing execution               |
| **FAK** (Fill-And-Kill)      | Fills as many shares as available immediately, then cancels any unfilled remainder                 | Partial immediate execution            |

* **FOK** and **FAK** are market order types — they execute against resting liquidity immediately.
  * **BUY**: specify the dollar amount you want to spend
  * **SELL**: specify the number of shares you want to sell
* **GTC** and **GTD** are limit order types — they rest on the book at your specified price.

<Note>
  **GTD expiration**: There is a security threshold of one minute. If you need
  the order to expire in 90 seconds, the correct expiration value is `now + 1
    minute + 30 seconds`.
</Note>

### Post-Only Orders

Post-only orders are limit orders that will only rest on the book and not match immediately on entry.

* If a post-only order would cross the spread (i.e., it is marketable), it will be **rejected** rather than executed.
* Post-only **cannot** be combined with market order types (FOK or FAK). If `postOnly = true` is sent with a market order type, the order will be rejected.
* Post-only can only be used with **GTC** and **GTD** order types.

***

## Tick Sizes

Markets have different minimum price increments (tick sizes). Your order price must conform to the market's tick size, or the order will be rejected.

| Tick Size | Price Precision | Example Prices         |
| --------- | --------------- | ---------------------- |
| `0.1`     | 1 decimal       | 0.1, 0.2, 0.5          |
| `0.01`    | 2 decimals      | 0.01, 0.50, 0.99       |
| `0.001`   | 3 decimals      | 0.001, 0.500, 0.999    |
| `0.0001`  | 4 decimals      | 0.0001, 0.5000, 0.9999 |

Retrieve the tick size for a market using the SDK:

<CodeGroup>
  ```typescript TypeScript theme={null}
  const tickSize = await client.getTickSize(tokenID);
  // Returns: "0.1" | "0.01" | "0.001" | "0.0001"
  ```

  ```python Python theme={null}
  tick_size = client.get_tick_size(token_id)
  # Returns: "0.1" | "0.01" | "0.001" | "0.0001"
  ```
</CodeGroup>

<Tip>
  You can also check the `minimum_tick_size` field on a market object returned
  by the [Markets API](/market-data/fetching-markets).
</Tip>

***

## Negative Risk

Multi-outcome events (e.g., "Who will win the election?" with 3+ candidates) use a different exchange contract called the **Neg Risk CTF Exchange**. When placing orders on these markets, you must pass `negRisk: true` in the order options.

<CodeGroup>
  ```typescript TypeScript theme={null}
  const response = await client.createAndPostOrder(
    {
      tokenID: "TOKEN_ID",
      price: 0.5,
      size: 10,
      side: Side.BUY,
    },
    {
      tickSize: "0.01",
      negRisk: true, // Required for multi-outcome markets
    },
  );
  ```

  ```python Python theme={null}
  response = client.create_and_post_order(
      OrderArgs(
          token_id="TOKEN_ID",
          price=0.50,
          size=10,
          side=BUY,
      ),
      options={
          "tick_size": "0.01",
          "neg_risk": True,  # Required for multi-outcome markets
      }
  )
  ```
</CodeGroup>

You can check whether a market uses negative risk via the SDK or the market object's `neg_risk` field:

<CodeGroup>
  ```typescript TypeScript theme={null}
  const isNegRisk = await client.getNegRisk(tokenID);
  ```

  ```python Python theme={null}
  is_neg_risk = client.get_neg_risk(token_id)
  ```
</CodeGroup>

***

## Allowances

Before placing an order, your funder address must have approved the Exchange contract to spend the relevant tokens:

* **Buying**: the funder must have set a **USDC.e** allowance greater than or equal to the spending amount.
* **Selling**: the funder must have set a **conditional token** allowance greater than or equal to the selling amount.

This allows the Exchange contract to execute settlement according to your signed order instructions.

***

## Validity Checks

Orders are continually monitored to make sure they remain valid. This includes tracking:

* Underlying balances
* Allowances
* Onchain order cancellations

<Warning>
  Any maker caught intentionally abusing these checks will be blacklisted.
</Warning>

There are also limits on order placement per market. You can only place orders that sum to less than or equal to your available balance for each market. For example, if you have 500 USDC.e in your funding wallet, you can place one order to buy 1000 YES at \$0.50 — but any additional buy orders in that market will be rejected since your entire balance is reserved for the first order.

The max size you can place for an order is:

$$
\text{maxOrderSize} = \text{underlyingAssetBalance} - \sum(\text{orderSize} - \text{orderFillAmount})
$$

***

## Querying Orders

All query endpoints require [L2 authentication](/api-reference/authentication). [Builder-authenticated](/trading/clients/builder) clients can also query orders attributed to their builder account using the same methods.

### Get a Single Order

Retrieve details for a specific order by its ID:

<CodeGroup>
  ```typescript TypeScript theme={null}
  const order = await client.getOrder("0xb816482a...");
  console.log(order);
  ```

  ```python Python theme={null}
  order = client.get_order("0xb816482a...")
  print(order)
  ```
</CodeGroup>

### Get Open Orders

Retrieve your open orders, optionally filtered by market or asset:

<CodeGroup>
  ```typescript TypeScript theme={null}
  // All open orders
  const orders = await client.getOpenOrders();

  // Filtered by market
  const marketOrders = await client.getOpenOrders({
    market: "0xbd31dc8a...",
  });

  // Filtered by asset
  const assetOrders = await client.getOpenOrders({
    asset_id: "52114319501245...",
  });
  ```

  ```python Python theme={null}
  from py_clob_client.clob_types import OpenOrderParams

  # All open orders
  orders = client.get_orders()

  # Filtered by market
  market_orders = client.get_orders(
      OpenOrderParams(
          market="0xbd31dc8a...",
      )
  )
  ```
</CodeGroup>

### OpenOrder Object

Each order returned contains these fields:

| Field              | Type      | Description                                                  |
| ------------------ | --------- | ------------------------------------------------------------ |
| `id`               | string    | Order ID                                                     |
| `status`           | string    | Current order status                                         |
| `market`           | string    | Market ID (condition ID)                                     |
| `asset_id`         | string    | Token ID                                                     |
| `side`             | string    | `BUY` or `SELL`                                              |
| `original_size`    | string    | Original order size at placement                             |
| `size_matched`     | string    | Amount that has been filled                                  |
| `price`            | string    | Limit price                                                  |
| `outcome`          | string    | Human-readable outcome (e.g., "Yes", "No")                   |
| `order_type`       | string    | Order type (GTC, GTD, FOK, FAK)                              |
| `maker_address`    | string    | Funder address                                               |
| `owner`            | string    | API key of the order owner                                   |
| `expiration`       | string    | Unix timestamp when the order expires (`0` if no expiration) |
| `associate_trades` | string\[] | Trade IDs this order has been partially included in          |
| `created_at`       | string    | Unix timestamp when the order was created                    |

***

## Trade History

When an order is matched, it creates a trade. Trades go through the following statuses:

| Status      | Terminal? | Description                                                          |
| ----------- | --------- | -------------------------------------------------------------------- |
| `MATCHED`   | No        | Matched and sent to the executor service for onchain submission      |
| `MINED`     | No        | Observed as mined on the chain, no finality threshold yet            |
| `CONFIRMED` | Yes       | Achieved strong probabilistic finality — trade successful            |
| `RETRYING`  | No        | Transaction failed (revert or reorg) — being retried by the operator |
| `FAILED`    | Yes       | Trade failed permanently and is not being retried                    |

### Trade Object

Each trade contains these fields:

| Field              | Type   | Description                                                  |
| ------------------ | ------ | ------------------------------------------------------------ |
| `id`               | string | Trade ID                                                     |
| `taker_order_id`   | string | Taker order ID (hash)                                        |
| `market`           | string | Market ID (condition ID)                                     |
| `asset_id`         | string | Token ID                                                     |
| `side`             | string | `BUY` or `SELL`                                              |
| `size`             | string | Trade size                                                   |
| `fee_rate_bps`     | string | Fee rate in basis points                                     |
| `price`            | string | Trade price                                                  |
| `status`           | string | Trade status (see table above)                               |
| `match_time`       | string | Unix timestamp when the trade was matched                    |
| `last_update`      | string | Unix timestamp of last status update                         |
| `outcome`          | string | Human-readable outcome (e.g., "Yes", "No")                   |
| `owner`            | string | API key ID of the trade owner                                |
| `maker_address`    | string | Funder address                                               |
| `trader_side`      | string | Whether you were `TAKER` or `MAKER` in this trade            |
| `transaction_hash` | string | Onchain transaction hash (available after mining)            |
| `maker_orders`     | array  | Array of maker orders matched against this trade (see below) |

### MakerOrder Fields

Each entry in the `maker_orders` array contains:

| Field            | Type   | Description                  |
| ---------------- | ------ | ---------------------------- |
| `order_id`       | string | Maker order ID (hash)        |
| `owner`          | string | Maker's API key ID           |
| `maker_address`  | string | Maker's funder address       |
| `matched_amount` | string | Amount matched in this trade |
| `price`          | string | Maker order price            |
| `fee_rate_bps`   | string | Maker fee rate in bps        |
| `asset_id`       | string | Token ID                     |
| `outcome`        | string | Outcome name                 |
| `side`           | string | `BUY` or `SELL`              |

Retrieve your trades with the SDK:

<CodeGroup>
  ```typescript TypeScript theme={null}
  // All trades
  const trades = await client.getTrades();

  // Filtered by market
  const marketTrades = await client.getTrades({
    market: "0xbd31dc8a...",
  });

  // With pagination
  const paginatedTrades = await client.getTradesPaginated({
    market: "0xbd31dc8a...",
  });
  ```

  ```python Python theme={null}
  from py_clob_client.clob_types import TradeParams

  # All trades
  trades = client.get_trades()

  # Filtered by market
  market_trades = client.get_trades(
      TradeParams(
          market="0xbd31dc8a...",
      )
  )
  ```
</CodeGroup>

***

## Heartbeat

The heartbeat endpoint maintains session liveness for order safety. If a valid heartbeat is not received within **10 seconds** (with up to a 5-second buffer), **all of your open orders will be cancelled**.

<CodeGroup>
  ```typescript TypeScript theme={null}
  // Send heartbeats in a loop
  let heartbeatId = "";
  setInterval(async () => {
    const resp = await client.postHeartbeat(heartbeatId);
    heartbeatId = resp.heartbeat_id;
  }, 5000);
  ```

  ```python Python theme={null}
  import time

  heartbeat_id = ""
  while True:
      resp = client.post_heartbeat(heartbeat_id)
      heartbeat_id = resp["heartbeat_id"]
      time.sleep(5)
  ```
</CodeGroup>

* On each request, include the most recent `heartbeat_id` you received. For your first request, use an empty string.
* If you send an invalid or expired `heartbeat_id`, the server responds with a `400 Bad Request` and provides the correct `heartbeat_id` in the response. Update your client and retry.

***

## Order Scoring

Check if your resting orders are eligible for [maker rebates](/market-makers/maker-rebates) scoring:

<CodeGroup>
  ```typescript TypeScript theme={null}
  // Single order
  const scoring = await client.isOrderScoring({ orderId: "0x..." });
  console.log(scoring); // { scoring: true }

  // Multiple orders
  const batchScoring = await client.areOrdersScoring({
    orderIds: ["0x...", "0x..."],
  });
  ```

  ```python Python theme={null}
  from py_clob_client.clob_types import OrderScoringParams, OrdersScoringParams

  # Single order
  scoring = client.is_order_scoring(
      OrderScoringParams(orderId="0x...")
  )

  # Multiple orders
  batch_scoring = client.are_orders_scoring(
      OrdersScoringParams(orderIds=["0x...", "0x..."])
  )
  ```
</CodeGroup>

***

## Onchain Order Info

When a trade is settled onchain, the Exchange contract emits an `OrderFilled` event with the following fields:

| Field               | Description                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| `orderHash`         | Unique hash for the filled order                                                                |
| `maker`             | The user who generated the order and source of funds                                            |
| `taker`             | The user filling the order, or the Exchange contract if multiple limit orders are filled        |
| `makerAssetId`      | ID of the asset given out. If `0`, the order is a **BUY** (giving USDC.e for outcome tokens)    |
| `takerAssetId`      | ID of the asset received. If `0`, the order is a **SELL** (receiving USDC.e for outcome tokens) |
| `makerAmountFilled` | Amount of the asset given out                                                                   |
| `takerAmountFilled` | Amount of the asset received                                                                    |
| `fee`               | Fees paid by the order maker                                                                    |

***

## Error Messages

When placing an order, the response may include an `errorMsg` if the order could not be placed. If `success` is `false`, there was a server-side error:

| Error                              | Description                                            |
| ---------------------------------- | ------------------------------------------------------ |
| `INVALID_ORDER_MIN_TICK_SIZE`      | Price doesn't conform to the market's tick size        |
| `INVALID_ORDER_MIN_SIZE`           | Order size is below the minimum threshold              |
| `INVALID_ORDER_DUPLICATED`         | Identical order has already been placed                |
| `INVALID_ORDER_NOT_ENOUGH_BALANCE` | Funder doesn't have sufficient balance or allowance    |
| `INVALID_ORDER_EXPIRATION`         | Expiration timestamp is in the past                    |
| `INVALID_ORDER_ERROR`              | System error while inserting order                     |
| `INVALID_POST_ONLY_ORDER_TYPE`     | Post-only flag used with a market order type (FOK/FAK) |
| `INVALID_POST_ONLY_ORDER`          | Post-only order would cross the book                   |
| `EXECUTION_ERROR`                  | System error while executing trade                     |
| `ORDER_DELAYED`                    | Order placement delayed due to market conditions       |
| `DELAYING_ORDER_ERROR`             | System error while delaying order                      |
| `FOK_ORDER_NOT_FILLED_ERROR`       | FOK order couldn't be fully filled                     |
| `MARKET_NOT_READY`                 | Market is not yet accepting orders                     |

### Insert Statuses

When an order is successfully placed, the response includes a `status` field:

| Status      | Description                                                          |
| ----------- | -------------------------------------------------------------------- |
| `matched`   | Order placed and matched with a resting order                        |
| `live`      | Order placed and resting on the book                                 |
| `delayed`   | Order is marketable but subject to a matching delay                  |
| `unmatched` | Order is marketable but failed to delay — placement still successful |

***

## Security

Polymarket's Exchange contract has been audited by Chainsecurity ([View Audit](https://github.com/Polymarket/ctf-exchange/blob/main/audit/ChainSecurity_Polymarket_Exchange_audit.pdf)).

The operator's privileges are limited to order matching and ensuring correct ordering. Operators cannot set prices or execute unauthorized trades. Users can cancel orders onchain independently if trust issues arise.

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Create Order" icon="plus" href="/trading/orders/create">
    Build, sign, and submit orders
  </Card>

  <Card title="Cancel Order" icon="xmark" href="/trading/orders/cancel">
    Cancel single, multiple, or all orders
  </Card>
</CardGroup>
