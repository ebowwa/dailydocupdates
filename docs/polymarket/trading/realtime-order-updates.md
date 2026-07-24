<!--
Source: https://docs.polymarket.com/trading/realtime-order-updates.md
Downloaded: 2026-07-24T21:04:03.617Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Real-Time Order Updates

> React to authenticated order and trade activity as it happens.

Use real-time order updates to keep your view of a trading account current
without polling. The user stream reports changes to the account's orders and
the trades created when those orders match. For public order-book and market updates, see [Real-Time
Data](/market-data/realtime-data).

<Note>
  Before subscribing, authenticate the account whose activity you want to
  monitor. See [Wallets and Authentication](/trading/wallets-auth).
</Note>

## User Stream

The user stream delivers order changes and trade updates for the authenticated
account. Subscribe without a market filter to follow the entire account, or
provide condition IDs to follow selected markets.

<Tabs>
  <Tab title="TypeScript">
    Given a `SecureClient`, subscribe to the `user` topic:

    ```ts theme={null}
    const stream = await client.subscribe([{ topic: "user" }]);

    for await (const event of stream) {
      switch (event.type) {
        case "order":
          // event: UserOrderEvent
          break;
        case "trade":
          // event: UserTradeEvent
          break;
      }
    }
    ```

    <Accordion title="User Events">
      #### Order Update

      <CodeGroup>
        ```ts UserOrderEvent Type theme={null}
        type UserOrderEvent = {
          topic: "user";
          type: "order";
          payload: {
            id: string;
            owner: string;
            market: string;
            tokenId: TokenId;
            side: OrderSide;
            orderOwner?: string | null;
            originalSize: DecimalString;
            sizeMatched: DecimalString;
            price: DecimalString;
            associateTrades?: string[] | null;
            outcome?: string | null;
            orderEventType: "PLACEMENT" | "UPDATE" | "CANCELLATION";
            createdAt?: IsoDateTimeString | null;
            expiresAt?: IsoDateTimeString | null;
            orderType?: "GTC" | "FOK" | "GTD" | "FAK" | null;
            status?: "LIVE" | "MATCHED" | "DELAYED" | "UNMATCHED" | "CANCELED" | null;
            makerAddress?: string | null;
            timestamp: EpochMilliseconds;
          };
        };
        ```

        ```json UserOrderEvent Example theme={null}
        {
          "topic": "user",
          "type": "order",
          "payload": {
            "id": "<order_id>",
            "owner": "<clob_api_key>",
            "market": "<condition_id>",
            "tokenId": "<token_id>",
            "side": "BUY",
            "originalSize": "10",
            "sizeMatched": "0",
            "price": "0.52",
            "outcome": "Yes",
            "orderEventType": "PLACEMENT",
            "status": "LIVE",
            "timestamp": 1782753357257
          }
        }
        ```
      </CodeGroup>

      #### Trade Update

      <CodeGroup>
        ```ts UserTradeEvent Type theme={null}
        type TradeMakerOrder = {
          orderId: string;
          owner: string;
          makerAddress?: string | null;
          matchedAmount: DecimalString;
          price: DecimalString;
          feeRateBps?: DecimalString | null;
          tokenId: TokenId;
          outcome?: string | null;
          outcomeIndex?: number | null;
          side: OrderSide;
        };

        type UserTradeEvent = {
          topic: "user";
          type: "trade";
          payload: {
            id: string;
            takerOrderId: string;
            market: string;
            tokenId: TokenId;
            side: OrderSide;
            size: DecimalString;
            feeRateBps?: DecimalString | null;
            price: DecimalString;
            status:
              | "TRADE_STATUS_MATCHED"
              | "TRADE_STATUS_MATCHED_NOT_BROADCASTED"
              | "TRADE_STATUS_MINED"
              | "TRADE_STATUS_CONFIRMED"
              | "TRADE_STATUS_RETRYING"
              | "TRADE_STATUS_FAILED";
            matchedAt?: IsoDateTimeString | null;
            updatedAt?: IsoDateTimeString | null;
            outcome?: string | null;
            owner: string;
            tradeOwner?: string | null;
            makerAddress?: string | null;
            transactionHash?: string | null;
            bucketIndex?: number | null;
            makerOrders?: TradeMakerOrder[] | null;
            traderSide?: "TAKER" | "MAKER" | null;
            timestamp: EpochMilliseconds;
          };
        };
        ```

        ```json UserTradeEvent Example theme={null}
        {
          "topic": "user",
          "type": "trade",
          "payload": {
            "id": "<trade_id>",
            "takerOrderId": "<order_id>",
            "market": "<condition_id>",
            "tokenId": "<token_id>",
            "side": "BUY",
            "size": "10",
            "price": "0.52",
            "status": "TRADE_STATUS_MATCHED",
            "owner": "<clob_api_key>",
            "traderSide": "TAKER",
            "timestamp": 1782753357257
          }
        }
        ```
      </CodeGroup>
    </Accordion>

    To receive updates only for selected markets, pass their condition IDs in
    `markets`:

    ```ts theme={null}
    const stream = await client.subscribe([
      {
        topic: "user",
        markets: ["<condition_id>"],
      },
    ]);
    ```
  </Tab>

  <Tab title="Python">
    Given an `AsyncSecureClient`, subscribe with `UserSpec`.
    Real-time subscriptions are not available from the synchronous
    `SecureClient`.

    ```python theme={null}
    from polymarket.streams import UserSpec


    async with await client.subscribe(UserSpec()) as stream:
        async for event in stream:
            if event.type == "order":
                ...  # event: UserOrderEvent
            elif event.type == "trade":
                ...  # event: UserTradeEvent
    ```

    <Accordion title="User Events">
      #### Order Update

      <CodeGroup>
        ```python UserOrderEvent Type theme={null}
        class UserOrderPayload:
            id: str
            owner: str
            market: str
            token_id: TokenId
            side: Literal["BUY", "SELL"]
            order_owner: str | None
            original_size: Decimal
            size_matched: Decimal
            price: Decimal
            associate_trades: tuple[str, ...] | None
            outcome: str | None
            order_event_type: Literal["PLACEMENT", "UPDATE", "CANCELLATION"]
            created_at: datetime | None
            expires_at: datetime | None
            order_type: Literal["GTC", "FOK", "IOC", "GTD", "FAK"] | None
            status: Literal["LIVE", "MATCHED", "DELAYED", "UNMATCHED", "CANCELED"] | None
            maker_address: str | None
            timestamp: datetime | None

        class UserOrderEvent:
            topic: Literal["user"]
            type: Literal["order"]
            payload: UserOrderPayload
        ```

        ```json UserOrderEvent Example theme={null}
        {
          "topic": "user",
          "type": "order",
          "payload": {
            "id": "<order_id>",
            "owner": "<clob_api_key>",
            "market": "<condition_id>",
            "token_id": "<token_id>",
            "side": "BUY",
            "original_size": "10",
            "size_matched": "0",
            "price": "0.52",
            "outcome": "Yes",
            "order_event_type": "PLACEMENT",
            "status": "LIVE",
            "timestamp": "2026-06-29T17:15:57.257000Z"
          }
        }
        ```
      </CodeGroup>

      #### Trade Update

      <CodeGroup>
        ```python UserTradeEvent Type theme={null}
        class UserTradeMakerOrder:
            order_id: str
            owner: str
            maker_address: str | None
            matched_amount: Decimal
            price: Decimal
            fee_rate_bps: Decimal | None
            token_id: TokenId
            outcome: str | None
            outcome_index: int | None
            side: Literal["BUY", "SELL"]

        class UserTradePayload:
            id: str
            taker_order_id: str
            market: str
            token_id: TokenId
            side: Literal["BUY", "SELL"]
            size: Decimal
            fee_rate_bps: Decimal | None
            price: Decimal
            status: Literal[
                "MATCHED",
                "MATCHED_NOT_BROADCASTED",
                "MINED",
                "CONFIRMED",
                "RETRYING",
                "FAILED",
            ]
            matched_at: datetime | None
            updated_at: datetime | None
            outcome: str | None
            owner: str
            trade_owner: str | None
            maker_address: str | None
            transaction_hash: str | None
            bucket_index: int | None
            maker_orders: tuple[UserTradeMakerOrder, ...] | None
            trader_side: Literal["TAKER", "MAKER"] | None
            timestamp: datetime | None

        class UserTradeEvent:
            topic: Literal["user"]
            type: Literal["trade"]
            payload: UserTradePayload
        ```

        ```json UserTradeEvent Example theme={null}
        {
          "topic": "user",
          "type": "trade",
          "payload": {
            "id": "<trade_id>",
            "taker_order_id": "<order_id>",
            "market": "<condition_id>",
            "token_id": "<token_id>",
            "side": "BUY",
            "size": "10",
            "price": "0.52",
            "status": "MATCHED",
            "owner": "<clob_api_key>",
            "trader_side": "TAKER",
            "timestamp": "2026-06-29T17:15:57.257000Z"
          }
        }
        ```
      </CodeGroup>
    </Accordion>

    To receive updates only for selected markets, pass their condition IDs to
    `UserSpec`:

    ```python theme={null}
    async with await client.subscribe(
        UserSpec(markets=["<condition_id>"]),
    ) as stream:
        async for event in stream:
            ...
    ```
  </Tab>

  <Tab title="API">
    Connect to the authenticated user WebSocket:

    ```text theme={null}
    wss://ws-subscriptions-clob.polymarket.com/ws/user
    ```

    <Note>
      The user WebSocket uses an application-level heartbeat. Send the text frame
      `PING` every 10 seconds; the server replies with `PONG`.
    </Note>

    Once connected, send a `user` subscription frame with the CLOB API
    credentials created through [API
    Authentication](/getting-started/api#authentication):

    ```json theme={null}
    {
      "auth": {
        "apiKey": "<clob_api_key>",
        "secret": "<clob_api_secret>",
        "passphrase": "<clob_api_passphrase>"
      },
      "type": "user"
    }
    ```

    <Warning>
      Send the subscription frame immediately after connecting. The server may close
      a connection that remains unsubscribed.
    </Warning>

    <Warning>
      Keep CLOB API credentials in a server environment. Never expose them in
      client-side code.
    </Warning>

    On the wire, `event_type` distinguishes order and trade events. For an
    order event, `type` identifies whether the order was placed, updated, or
    canceled.

    <Accordion title="User Events">
      #### Order Update

      ```json theme={null}
      {
        "event_type": "order",
        "id": "<order_id>",
        "owner": "<clob_api_key>",
        "market": "<condition_id>",
        "asset_id": "<token_id>",
        "side": "BUY",
        "order_owner": "<clob_api_key>",
        "original_size": "10",
        "size_matched": "0",
        "price": "0.52",
        "associate_trades": null,
        "outcome": "Yes",
        "type": "PLACEMENT",
        "created_at": "1782753357",
        "expiration": "0",
        "order_type": "GTC",
        "status": "LIVE",
        "maker_address": "<maker_address>",
        "timestamp": "1782753357257"
      }
      ```

      #### Trade Update

      ```json theme={null}
      {
        "event_type": "trade",
        "type": "TRADE",
        "id": "<trade_id>",
        "taker_order_id": "<order_id>",
        "market": "<condition_id>",
        "asset_id": "<token_id>",
        "side": "BUY",
        "size": "10",
        "fee_rate_bps": "0",
        "price": "0.52",
        "status": "MATCHED",
        "match_time": "1782753357",
        "last_update": "1782753357",
        "outcome": "Yes",
        "owner": "<clob_api_key>",
        "trade_owner": "<clob_api_key>",
        "maker_address": "<maker_address>",
        "transaction_hash": null,
        "bucket_index": 0,
        "maker_orders": [
          {
            "order_id": "<maker_order_id>",
            "owner": "<maker_clob_api_key>",
            "maker_address": "<maker_address>",
            "matched_amount": "10",
            "price": "0.52",
            "fee_rate_bps": "0",
            "asset_id": "<token_id>",
            "outcome": "Yes",
            "outcome_index": 0,
            "side": "SELL"
          }
        ],
        "trader_side": "TAKER",
        "timestamp": "1782753357257"
      }
      ```
    </Accordion>

    To receive updates only for selected markets, include their condition IDs
    in the initial subscription frame:

    ```json theme={null}
    {
      "auth": {
        "apiKey": "<clob_api_key>",
        "secret": "<clob_api_secret>",
        "passphrase": "<clob_api_passphrase>"
      },
      "markets": ["<condition_id>"],
      "type": "user"
    }
    ```

    You can add or remove market filters without reconnecting:

    <CodeGroup>
      ```json Subscribe theme={null}
      {
        "operation": "subscribe",
        "markets": ["<condition_id>"]
      }
      ```

      ```json Unsubscribe theme={null}
      {
        "operation": "unsubscribe",
        "markets": ["<condition_id>"]
      }
      ```
    </CodeGroup>
  </Tab>
</Tabs>

## Understand Order Updates

Order updates tell you why the account's open-order state changed:

| Update       | Meaning                                 |
| ------------ | --------------------------------------- |
| Placement    | A new order was accepted.               |
| Update       | Some or all of the order matched.       |
| Cancellation | The remaining open amount was canceled. |

## Understand Trade Updates

Trade updates follow a match through onchain settlement. Confirmation and
permanent failure are terminal; a trade being retried may later be mined and
confirmed.

| State                  | Terminal | Meaning                                                             |
| ---------------------- | -------- | ------------------------------------------------------------------- |
| Matched, not broadcast | No       | The orders matched before an onchain transaction was broadcast.     |
| Matched                | No       | The orders matched and the transaction was submitted for execution. |
| Mined                  | No       | The transaction was observed onchain but has not reached finality.  |
| Confirmed              | Yes      | The trade reached finality successfully.                            |
| Retrying               | No       | Settlement failed temporarily and is being retried.                 |
| Failed                 | Yes      | Settlement failed permanently.                                      |

## Recover After Reconnecting

Real-time updates do not replace authoritative account reads or replay every
change missed during a disconnection. After reconnecting, fetch the account's
open orders and recent trades from [Manage Orders](/trading/manage-orders), then
resume applying new stream events from that refreshed state.
