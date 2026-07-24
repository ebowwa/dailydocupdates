<!--
Source: https://docs.polymarket.com/trading/manage-orders.md
Downloaded: 2026-07-24T21:04:03.616Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage Orders

> Learn how to track and manage orders after submitting them.

After submitting an order, use authenticated account reads to check its current
state, reconcile open orders and resulting trades, and cancel liquidity you no
longer want resting on the book.

## Fetch an Order

Look up a single order by its ID. Use this to check the current status of an
order you already know about, rather than scanning the full list of open
orders.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchOrder()` on a `SecureClient` to fetch an order by ID:

    ```ts theme={null}
    const order = await client.fetchOrder({ orderId: "ORDER_ID" });

    // order: OpenOrder
    ```

    The method returns an `OpenOrder` with normalized token, decimal, and date
    values:

    <CodeGroup>
      ```ts OpenOrder Type theme={null}
      type OpenOrder = {
        id: string;
        conditionId: CtfConditionId;
        tokenId: TokenId;
        owner: string;
        makerAddress: string;
        side: string;
        price: DecimalString;
        originalSize: DecimalString;
        sizeMatched: DecimalString;
        outcome: string;
        orderType: string;
        status: string;
        associateTrades: string[];
        createdAt: IsoDateTimeString;
        expiresAt?: IsoDateTimeString;
      };
      ```

      ```json OpenOrder Example theme={null}
      {
        "id": "0xff354cd7ca7539dfa9c28d90943ab5779a4eac34b9b37a757d7b32bdfb11790b",
        "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
        "makerAddress": "0x1234567890123456789012345678901234567890",
        "side": "BUY",
        "price": "0.52",
        "originalSize": "10",
        "sizeMatched": "0",
        "outcome": "Yes",
        "orderType": "GTD",
        "status": "LIVE",
        "associateTrades": [],
        "createdAt": "2026-06-01T12:00:00.000Z",
        "expiresAt": "2026-06-01T13:00:00.000Z"
      }
      ```
    </CodeGroup>

    `expiresAt` is present when the response includes an expiration; otherwise,
    the field is omitted.
  </Tab>

  <Tab title="Python">
    Call `get_order()` on an `AsyncSecureClient` to fetch an order by ID. The
    synchronous `SecureClient` provides the same method.

    ```python theme={null}
    order = await client.get_order(order_id="ORDER_ID")

    # order: OpenOrder
    ```

    The method returns an `OpenOrder` with normalized token, decimal, and date
    values:

    <CodeGroup>
      ```python OpenOrder Type theme={null}
      class OpenOrder:
          id: str
          condition_id: CtfConditionId
          token_id: TokenId
          owner: str
          maker_address: str
          side: Literal["BUY", "SELL"]
          price: Decimal
          original_size: Decimal
          size_matched: Decimal
          outcome: str
          order_type: str
          status: str
          associate_trades: tuple[str, ...]
          created_at: datetime
          expires_at: datetime | None
      ```

      ```json OpenOrder Example theme={null}
      {
        "id": "0xff354cd7ca7539dfa9c28d90943ab5779a4eac34b9b37a757d7b32bdfb11790b",
        "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
        "maker_address": "0x1234567890123456789012345678901234567890",
        "side": "BUY",
        "price": "0.52",
        "original_size": "10",
        "size_matched": "0",
        "outcome": "Yes",
        "order_type": "GTD",
        "status": "LIVE",
        "associate_trades": [],
        "created_at": "2026-06-01T12:00:00Z",
        "expires_at": "2026-06-01T13:00:00Z"
      }
      ```
    </CodeGroup>

    `expires_at` contains the normalized expiration when one is returned and
    can otherwise be `None`.
  </Tab>

  <Tab title="API">
    Fetch the order with an authenticated CLOB request. See [API
    Authentication](/getting-started/api#authentication) for the complete
    signing flow.

    ```bash theme={null}
    curl "https://clob.polymarket.com/data/order/$ORDER_ID" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>"
    ```

    where `<clob_request_timestamp>` is a Unix timestamp and
    `<clob_l2_signature>` is generated as follows:

    ```text theme={null}
    message = <clob_request_timestamp> + "GET" + "/data/order/$ORDER_ID"

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    The CLOB returns the order in its wire response shape:

    <CodeGroup>
      ```ts Order Type theme={null}
      type Order = {
        id: string;
        market: string;
        asset_id: string;
        owner: string;
        maker_address: string;
        side: string;
        price: string;
        original_size: string;
        size_matched: string;
        outcome: string;
        order_type: string;
        status: string;
        associate_trades?: string[];
        created_at: number;
        expiration: string;
      };
      ```

      ```json Order Example theme={null}
      {
        "id": "ORDER_ID",
        "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "asset_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "owner": "0x1234...",
        "maker_address": "0x1234...",
        "side": "BUY",
        "price": "0.52",
        "original_size": "10",
        "size_matched": "0",
        "outcome": "Yes",
        "order_type": "GTC",
        "status": "LIVE",
        "associate_trades": [],
        "created_at": 1748779200,
        "expiration": "0"
      }
      ```
    </CodeGroup>

    An `expiration` of `"0"` means the order is GTC and never expires on a
    timer.
  </Tab>
</Tabs>

See [Order Statuses](/concepts/order-lifecycle#order-statuses) to interpret the
returned `status`.

## List Open Orders

Retrieve every resting order on the account, optionally narrowed to one token,
one market, or a specific order ID. Use this to reconcile local state with
what's actually live on the book.

<Tabs>
  <Tab title="TypeScript">
    Call `listOpenOrders()` on a `SecureClient` to iterate over the account's
    open orders:

    ```ts theme={null}
    const pages = client.listOpenOrders();

    for await (const page of pages) {
      // page.items: OpenOrder[]
    }
    ```

    Pass a filter to narrow the results. Despite its name, `market` takes the
    market's condition ID:

    <CodeGroup>
      ```ts Token theme={null}
      const pages = client.listOpenOrders({
        tokenId: market.outcomes.yes.tokenId!,
      });
      ```

      ```ts Condition theme={null}
      const pages = client.listOpenOrders({
        market: market.conditionId!,
      });
      ```

      ```ts Order ID theme={null}
      const pages = client.listOpenOrders({
        id: order.id,
      });
      ```
    </CodeGroup>

    Each page contains `OpenOrder` items:

    <CodeGroup>
      ```ts OpenOrder Type theme={null}
      type OpenOrder = {
        id: string;
        conditionId: CtfConditionId;
        tokenId: TokenId;
        owner: string;
        makerAddress: string;
        side: string;
        price: DecimalString;
        originalSize: DecimalString;
        sizeMatched: DecimalString;
        outcome: string;
        orderType: string;
        status: string;
        associateTrades: string[];
        createdAt: IsoDateTimeString;
        expiresAt?: IsoDateTimeString;
      };
      ```

      ```json OpenOrder Example theme={null}
      {
        "items": [
          {
            "id": "0xff354cd7ca7539dfa9c28d90943ab5779a4eac34b9b37a757d7b32bdfb11790b",
            "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
            "makerAddress": "0x1234567890123456789012345678901234567890",
            "side": "BUY",
            "price": "0.52",
            "originalSize": "10",
            "sizeMatched": "0",
            "outcome": "Yes",
            "orderType": "GTD",
            "status": "LIVE",
            "associateTrades": [],
            "createdAt": "2026-06-01T12:00:00.000Z",
            "expiresAt": "2026-06-01T13:00:00.000Z"
          }
        ],
        "hasMore": false,
        "totalCount": 1
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Call `list_open_orders()` on an `AsyncSecureClient` to iterate over the
    account's open orders. The synchronous `SecureClient` provides the same method.

    ```python theme={null}
    pages = client.list_open_orders()

    async for page in pages:
        # page.items: tuple[OpenOrder, ...]
    ```

    Pass a filter to narrow the results. Despite its name, `market` takes the
    market's condition ID:

    <CodeGroup>
      ```python Token theme={null}
      pages = client.list_open_orders(
          token_id=market.outcomes.yes.token_id,
      )
      ```

      ```python Condition theme={null}
      pages = client.list_open_orders(
          market=market.condition_id,
      )
      ```

      ```python Order ID theme={null}
      pages = client.list_open_orders(
          id=order.id,
      )
      ```
    </CodeGroup>

    Each page contains `OpenOrder` items:

    <CodeGroup>
      ```python OpenOrder Type theme={null}
      class OpenOrder:
          id: str
          condition_id: CtfConditionId
          token_id: TokenId
          owner: str
          maker_address: str
          side: Literal["BUY", "SELL"]
          price: Decimal
          original_size: Decimal
          size_matched: Decimal
          outcome: str
          order_type: str
          status: str
          associate_trades: tuple[str, ...]
          created_at: datetime
          expires_at: datetime | None
      ```

      ```json OpenOrder Example theme={null}
      {
        "items": [
          {
            "id": "0xff354cd7ca7539dfa9c28d90943ab5779a4eac34b9b37a757d7b32bdfb11790b",
            "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
            "maker_address": "0x1234567890123456789012345678901234567890",
            "side": "BUY",
            "price": "0.52",
            "original_size": "10",
            "size_matched": "0",
            "outcome": "Yes",
            "order_type": "GTD",
            "status": "LIVE",
            "associate_trades": [],
            "created_at": "2026-06-01T12:00:00Z",
            "expires_at": "2026-06-01T13:00:00Z"
          }
        ],
        "has_more": false,
        "next_cursor": null,
        "total_count": 1
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="API">
    List open orders with an authenticated CLOB request, optionally filtering
    by `id`, `market`, or `asset_id`. See [API
    Authentication](/getting-started/api#authentication) for the complete
    signing flow.

    ```bash theme={null}
    curl "https://clob.polymarket.com/data/orders?asset_id=$YES_TOKEN_ID" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>"
    ```

    where `<clob_request_timestamp>` is a Unix timestamp and
    `<clob_l2_signature>` is generated as follows:

    ```text theme={null}
    message = <clob_request_timestamp> + "GET" + "/data/orders"

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    The CLOB returns the matching orders in its wire response shape:

    <CodeGroup>
      ```ts Order Type theme={null}
      type Order = {
        id: string;
        market: string;
        asset_id: string;
        owner: string;
        maker_address: string;
        side: string;
        price: string;
        original_size: string;
        size_matched: string;
        outcome: string;
        order_type: string;
        status: string;
        associate_trades?: string[];
        created_at: number;
        expiration: string;
      };
      ```

      ```json Order Example theme={null}
      [
        {
          "id": "ORDER_ID",
          "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
          "asset_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
          "owner": "0x1234...",
          "maker_address": "0x1234...",
          "side": "BUY",
          "price": "0.52",
          "original_size": "10",
          "size_matched": "0",
          "outcome": "Yes",
          "order_type": "GTC",
          "status": "LIVE",
          "associate_trades": [],
          "created_at": 1748779200,
          "expiration": "0"
        }
      ]
      ```
    </CodeGroup>
  </Tab>
</Tabs>

See [Order Statuses](/concepts/order-lifecycle#order-statuses) to interpret each
order's `status`.

## List Account Trades

Retrieve executed fills for the account, as opposed to orders that are still
resting on the book. Use this to reconstruct fill history, compute realized
position size, or audit what actually matched.

<Tabs>
  <Tab title="TypeScript">
    Call `listAccountTrades()` on a `SecureClient` to iterate over the
    account's trades:

    ```ts theme={null}
    const pages = client.listAccountTrades();

    for await (const page of pages) {
      // page.items: ClobTrade[]
    }
    ```

    Pass a filter to narrow the results. Despite its name, `market` takes the
    market's condition ID:

    <CodeGroup>
      ```ts Token theme={null}
      const pages = client.listAccountTrades({
        tokenId: market.outcomes.yes.tokenId!,
      });
      ```

      ```ts Condition theme={null}
      const pages = client.listAccountTrades({
        market: market.conditionId!,
      });
      ```

      ```ts Maker theme={null}
      const pages = client.listAccountTrades({
        makerAddress: process.env.POLYMARKET_MAKER_ADDRESS!,
      });
      ```

      ```ts Time Range theme={null}
      const now = Math.floor(Date.now() / 1000);

      const pages = client.listAccountTrades({
        after: String(now - 24 * 60 * 60),
        before: String(now),
      });
      ```
    </CodeGroup>

    Each page contains `ClobTrade` items:

    <CodeGroup>
      ```ts ClobTrade Type theme={null}
      type MakerOrder = {
        orderId: string;
        tokenId: TokenId;
        makerAddress: string;
        owner: string;
        side: string;
        price: DecimalString;
        matchedAmount: DecimalString;
        outcome: string;
        feeRateBps: DecimalString | null;
      };

      type ClobTrade = {
        id: string;
        conditionId: CtfConditionId;
        tokenId: TokenId;
        owner: string;
        makerAddress: string;
        takerOrderId: string;
        side: string;
        traderSide: "TAKER" | "MAKER";
        price: DecimalString;
        size: DecimalString;
        outcome: string;
        status: string;
        feeRateBps: DecimalString;
        bucketIndex: number;
        transactionHash: string;
        makerOrders: MakerOrder[];
        matchedAt: IsoDateTimeString;
        updatedAt: IsoDateTimeString;
      };
      ```

      ```json ClobTrade Example theme={null}
      {
        "items": [
          {
            "id": "TRADE_ID",
            "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
            "makerAddress": "0x1234567890123456789012345678901234567890",
            "takerOrderId": "0xff354cd7ca7539dfa9c28d90943ab5779a4eac34b9b37a757d7b32bdfb11790b",
            "side": "BUY",
            "traderSide": "TAKER",
            "price": "0.52",
            "size": "10",
            "outcome": "Yes",
            "status": "TRADE_STATUS_MATCHED",
            "feeRateBps": "0",
            "bucketIndex": 0,
            "transactionHash": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd",
            "makerOrders": [],
            "matchedAt": "2026-06-01T12:00:05.000Z",
            "updatedAt": "2026-06-01T12:00:05.000Z"
          }
        ],
        "hasMore": false,
        "totalCount": 1
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Call `list_account_trades()` on an `AsyncSecureClient` to iterate over the
    account's trades. The synchronous `SecureClient` provides the same method.

    ```python theme={null}
    pages = client.list_account_trades()

    async for page in pages:
        # page.items: tuple[ClobTrade, ...]
    ```

    Pass a filter to narrow the results. Despite its name, `market` takes the
    market's condition ID:

    <CodeGroup>
      ```python Token theme={null}
      pages = client.list_account_trades(
          token_id=market.outcomes.yes.token_id,
      )
      ```

      ```python Condition theme={null}
      pages = client.list_account_trades(
          market=market.condition_id,
      )
      ```

      ```python Maker theme={null}
      pages = client.list_account_trades(
          maker_address=os.environ["POLYMARKET_MAKER_ADDRESS"],
      )
      ```

      ```python Time Range theme={null}
      import time

      now = int(time.time())

      pages = client.list_account_trades(
          after=str(now - 24 * 60 * 60),
          before=str(now),
      )
      ```
    </CodeGroup>

    Each page contains `ClobTrade` items:

    <CodeGroup>
      ```python ClobTrade Type theme={null}
      class MakerOrder:
          order_id: str
          token_id: TokenId
          maker_address: str
          owner: str
          side: Literal["BUY", "SELL"]
          price: Decimal
          matched_amount: Decimal
          outcome: str
          fee_rate_bps: Decimal | None

      class ClobTrade:
          id: str
          condition_id: CtfConditionId
          token_id: TokenId
          owner: str
          maker_address: str
          taker_order_id: str
          side: Literal["BUY", "SELL"]
          trader_side: Literal["TAKER", "MAKER"]
          price: Decimal
          size: Decimal
          outcome: str
          status: str
          fee_rate_bps: Decimal
          bucket_index: int
          transaction_hash: str
          maker_orders: tuple[MakerOrder, ...]
          matched_at: datetime
          updated_at: datetime
      ```

      ```json ClobTrade Example theme={null}
      {
        "items": [
          {
            "id": "TRADE_ID",
            "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
            "maker_address": "0x1234567890123456789012345678901234567890",
            "taker_order_id": "0xff354cd7ca7539dfa9c28d90943ab5779a4eac34b9b37a757d7b32bdfb11790b",
            "side": "BUY",
            "trader_side": "TAKER",
            "price": "0.52",
            "size": "10",
            "outcome": "Yes",
            "status": "TRADE_STATUS_MATCHED",
            "fee_rate_bps": "0",
            "bucket_index": 0,
            "transaction_hash": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd",
            "maker_orders": [],
            "matched_at": "2026-06-01T12:00:05Z",
            "updated_at": "2026-06-01T12:00:05Z"
          }
        ],
        "has_more": false,
        "next_cursor": null,
        "total_count": 1
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="API">
    List account trades with an authenticated CLOB request, optionally
    filtering by `id`, `market`, `asset_id`, `maker_address`, `after`, or
    `before`. See [API Authentication](/getting-started/api#authentication) for
    the complete signing flow.

    ```bash theme={null}
    curl "https://clob.polymarket.com/data/trades?market=$CONDITION_ID" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>"
    ```

    where `<clob_request_timestamp>` is a Unix timestamp and
    `<clob_l2_signature>` is generated as follows:

    ```text theme={null}
    message = <clob_request_timestamp> + "GET" + "/data/trades"

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    The CLOB returns the matching trades in its wire response shape:

    <CodeGroup>
      ```ts Trade Type theme={null}
      type MakerOrder = {
        order_id: string;
        asset_id: string;
        maker_address: string;
        owner: string;
        side: string;
        price: string;
        matched_amount: string;
        outcome: string;
        fee_rate_bps: string;
      };

      type Trade = {
        id: string;
        market: string;
        asset_id: string;
        owner: string;
        maker_address: string;
        taker_order_id: string;
        side: string;
        trader_side: string;
        price: string;
        size: string;
        outcome: string;
        status: string;
        fee_rate_bps?: string;
        bucket_index: number;
        transaction_hash?: string;
        maker_orders?: MakerOrder[];
        match_time: string;
        last_update: string;
      };
      ```

      ```json Trade Example theme={null}
      [
        {
          "id": "TRADE_ID",
          "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
          "asset_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
          "owner": "0x1234...",
          "maker_address": "0x1234...",
          "taker_order_id": "ORDER_ID",
          "side": "BUY",
          "trader_side": "TAKER",
          "price": "0.52",
          "size": "10",
          "outcome": "Yes",
          "status": "MATCHED",
          "fee_rate_bps": "0",
          "bucket_index": 0,
          "transaction_hash": "0xabc...",
          "maker_orders": [],
          "match_time": "1748779205",
          "last_update": "1748779205"
        }
      ]
      ```
    </CodeGroup>
  </Tab>
</Tabs>

See [Trade Statuses](/concepts/order-lifecycle#trade-statuses) to follow each
trade's `status` through settlement.

## List Builder Trades

Retrieve matched trades attributed to a builder code across the accounts your
application serves. Use this instead of an account trade read when you need to
reconcile fills or measure activity for the builder integration as a whole.
Orders do not appear here until they match.

<Tabs>
  <Tab title="TypeScript">
    Call `listBuilderTrades()` on a `PublicClient` or `SecureClient` to iterate over
    trades attributed to your builder code:

    ```ts theme={null}
    const pages = client.listBuilderTrades({
      builderCode: process.env.POLYMARKET_BUILDER_CODE!,
    });

    for await (const page of pages) {
      // page.items: BuilderTrade[]
    }
    ```

    Pass a filter to narrow the results:

    <CodeGroup>
      ```ts Token theme={null}
      const pages = client.listBuilderTrades({
        builderCode: process.env.POLYMARKET_BUILDER_CODE!,
        tokenId: market.outcomes.yes.tokenId!,
      });
      ```

      ```ts Condition theme={null}
      const pages = client.listBuilderTrades({
        builderCode: process.env.POLYMARKET_BUILDER_CODE!,
        market: market.conditionId!,
      });
      ```

      ```ts Trade ID theme={null}
      const pages = client.listBuilderTrades({
        builderCode: process.env.POLYMARKET_BUILDER_CODE!,
        id: trade.id,
      });
      ```

      ```ts Time Range theme={null}
      const now = Math.floor(Date.now() / 1000);

      const pages = client.listBuilderTrades({
        builderCode: process.env.POLYMARKET_BUILDER_CODE!,
        after: String(now - 24 * 60 * 60),
        before: String(now),
      });
      ```
    </CodeGroup>

    Each page contains `BuilderTrade` items:

    <CodeGroup>
      ```ts BuilderTrade Type theme={null}
      type BuilderTrade = {
        id: string;
        tradeType: string;
        takerOrderHash: string;
        builder: string;
        conditionId: CtfConditionId;
        tokenId: TokenId;
        side: "BUY" | "SELL";
        size: DecimalString;
        sizeUsdc: DecimalString;
        price: DecimalString;
        status: string;
        outcome: string;
        outcomeIndex: number;
        owner: string;
        maker: string;
        transactionHash: string;
        matchedAt: IsoDateTimeString;
        bucketIndex: number;
        fee: DecimalString;
        feeUsdc: DecimalString;
        errMsg?: string | null;
        createdAt?: IsoDateTimeString;
        updatedAt?: IsoDateTimeString;
      };
      ```

      ```json BuilderTrade Example theme={null}
      {
        "items": [
          {
            "id": "TRADE_ID",
            "tradeType": "TAKER",
            "takerOrderHash": "0xff354cd7ca7539dfa9c28d90943ab5779a4eac34b9b37a757d7b32bdfb11790b",
            "builder": "0x1111111111111111111111111111111111111111111111111111111111111111",
            "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "side": "BUY",
            "size": "10",
            "sizeUsdc": "5.2",
            "price": "0.52",
            "status": "TRADE_STATUS_MATCHED",
            "outcome": "Yes",
            "outcomeIndex": 0,
            "owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
            "maker": "0x1234567890123456789012345678901234567890",
            "transactionHash": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd",
            "matchedAt": "2026-06-01T12:00:05.000Z",
            "bucketIndex": 0,
            "fee": "0",
            "feeUsdc": "0",
            "errMsg": null,
            "createdAt": "2026-06-01T12:00:05.000Z",
            "updatedAt": "2026-06-01T12:00:05.000Z"
          }
        ],
        "hasMore": false,
        "totalCount": 1
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Call `list_builder_trades()` on an `AsyncPublicClient` or
    `AsyncSecureClient` to iterate over trades attributed to your builder code.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    pages = client.list_builder_trades(
        builder_code=os.environ["POLYMARKET_BUILDER_CODE"],
    )

    async for page in pages:
        # page.items: tuple[BuilderTrade, ...]
    ```

    Pass a filter to narrow the results:

    <CodeGroup>
      ```python Token theme={null}
      pages = client.list_builder_trades(
          builder_code=os.environ["POLYMARKET_BUILDER_CODE"],
          token_id=market.outcomes.yes.token_id,
      )
      ```

      ```python Condition theme={null}
      pages = client.list_builder_trades(
          builder_code=os.environ["POLYMARKET_BUILDER_CODE"],
          market=market.condition_id,
      )
      ```

      ```python Trade ID theme={null}
      pages = client.list_builder_trades(
          builder_code=os.environ["POLYMARKET_BUILDER_CODE"],
          id=trade.id,
      )
      ```

      ```python Time Range theme={null}
      import time

      now = int(time.time())

      pages = client.list_builder_trades(
          builder_code=os.environ["POLYMARKET_BUILDER_CODE"],
          after=str(now - 24 * 60 * 60),
          before=str(now),
      )
      ```
    </CodeGroup>

    Each page contains `BuilderTrade` items:

    <CodeGroup>
      ```python BuilderTrade Type theme={null}
      class BuilderTrade:
          id: str
          trade_type: str
          taker_order_hash: str
          builder: str
          condition_id: CtfConditionId
          token_id: TokenId
          side: Literal["BUY", "SELL"]
          size: Decimal
          size_usdc: Decimal
          price: Decimal
          status: str
          outcome: str
          outcome_index: int
          owner: str
          maker: str
          transaction_hash: str
          matched_at: datetime
          bucket_index: int
          fee: Decimal
          fee_usdc: Decimal
          error_msg: str | None
          created_at: datetime | None
          updated_at: datetime | None
      ```

      ```json BuilderTrade Example theme={null}
      {
        "items": [
          {
            "id": "TRADE_ID",
            "trade_type": "TAKER",
            "taker_order_hash": "0xff354cd7ca7539dfa9c28d90943ab5779a4eac34b9b37a757d7b32bdfb11790b",
            "builder": "0x1111111111111111111111111111111111111111111111111111111111111111",
            "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "side": "BUY",
            "size": "10",
            "size_usdc": "5.2",
            "price": "0.52",
            "status": "TRADE_STATUS_MATCHED",
            "outcome": "Yes",
            "outcome_index": 0,
            "owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
            "maker": "0x1234567890123456789012345678901234567890",
            "transaction_hash": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd",
            "matched_at": "2026-06-01T12:00:05Z",
            "bucket_index": 0,
            "fee": "0",
            "fee_usdc": "0",
            "error_msg": null,
            "created_at": "2026-06-01T12:00:05Z",
            "updated_at": "2026-06-01T12:00:05Z"
          }
        ],
        "has_more": false,
        "next_cursor": null,
        "total_count": 1
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="API">
    List trades attributed to a builder code with a public CLOB request. Filter
    the results with `id`, `market`, `asset_id`, `after`, or `before` when
    needed:

    ```bash theme={null}
    curl "https://clob.polymarket.com/builder/trades?builder_code=$POLYMARKET_BUILDER_CODE"
    ```

    The response contains the matching trades and a cursor for the next page:

    ```json theme={null}
    {
      "limit": 300,
      "next_cursor": "LTE=",
      "count": 1,
      "data": [
        {
          "id": "TRADE_ID",
          "tradeType": "TAKER",
          "takerOrderHash": "0xff354cd7ca7539dfa9c28d90943ab5779a4eac34b9b37a757d7b32bdfb11790b",
          "builder": "0x1111111111111111111111111111111111111111111111111111111111111111",
          "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
          "assetId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
          "side": "BUY",
          "size": "10",
          "sizeUsdc": "5.2",
          "price": "0.52",
          "status": "TRADE_STATUS_MATCHED",
          "outcome": "Yes",
          "outcomeIndex": 0,
          "owner": "9180014b-33c8-9240-a14b-bdca11c0a465",
          "maker": "0x1234567890123456789012345678901234567890",
          "transactionHash": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcd",
          "matchTime": "1748779205",
          "bucketIndex": 0,
          "fee": "0",
          "feeUsdc": "0",
          "err_msg": null,
          "createdAt": "2026-06-01T12:00:05Z",
          "updatedAt": "2026-06-01T12:00:05Z"
        }
      ]
    }
    ```

    Pass `next_cursor` back as the `next_cursor` query parameter to request the
    next page. The terminal cursor is `LTE=`.
  </Tab>
</Tabs>

See [Builder Programs](/programs/builders/overview) to learn how attribution
works.

## Cancel Orders

Cancel only as broadly as needed. Start with known order IDs, use a market or
token filter when withdrawing a set of quotes, and reserve account-wide
cancellation for exceptional situations. Cancellation remains available while
the exchange is in cancel-only mode, when new orders are rejected. For a
partially filled order, cancellation removes only its unfilled remainder.

### Cancel Orders by ID

Cancel one order when you know its ID. To cancel a known set of orders in one
request, submit a batch of up to 3,000 IDs. Duplicate IDs in the batch are
ignored.

<Tabs>
  <Tab title="TypeScript">
    Call `cancelOrder()` on a `SecureClient` to cancel one order:

    ```ts theme={null}
    const result = await client.cancelOrder({ orderId: order.id });

    // result: CancelOrdersResponse
    ```

    Call `cancelOrders()` to cancel several known orders in one request:

    ```ts theme={null}
    const result = await client.cancelOrders({
      orderIds: orders.map((order) => order.id),
    });

    // result: CancelOrdersResponse
    ```
  </Tab>

  <Tab title="Python">
    Call `cancel_order()` on an `AsyncSecureClient` to cancel one order. The
    synchronous `SecureClient` provides the same method without `await`.

    ```python theme={null}
    result = await client.cancel_order(order_id=order.id)

    # result: CancelOrdersResponse
    ```

    Call `cancel_orders()` to cancel several known orders in one request:

    ```python theme={null}
    result = await client.cancel_orders(
        order_ids=[order.id for order in orders],
    )

    # result: CancelOrdersResponse
    ```
  </Tab>

  <Tab title="API">
    Cancel one order with an authenticated CLOB request. See [API
    Authentication](/getting-started/api#authentication) for the complete
    signing flow.

    ```bash theme={null}
    curl -X DELETE "https://clob.polymarket.com/order" \
      -H "Content-Type: application/json" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>" \
      --data '{"orderID":"'"$ORDER_ID"'"}'
    ```

    where `<clob_request_timestamp>` is a Unix timestamp and
    `<clob_l2_signature>` is generated from the exact serialized body:

    ```text theme={null}
    body = '{"orderID":"' + order_id + '"}'
    message = <clob_request_timestamp> + "DELETE" + "/order" + body

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    To cancel multiple orders, send an array containing 1 to 3,000 order IDs:

    ```bash theme={null}
    curl -X DELETE "https://clob.polymarket.com/orders" \
      -H "Content-Type: application/json" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>" \
      --data '["'"$ORDER_ID_1"'","'"$ORDER_ID_2"'"]'
    ```

    Sign the batch request using its path and exact serialized array:

    ```text theme={null}
    body = '["' + order_id_1 + '","' + order_id_2 + '"]'
    message = <clob_request_timestamp> + "DELETE" + "/orders" + body

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    Both requests return `200 OK` with a [cancellation
    result](#cancellation-results) containing `canceled` and
    `not_canceled`.
  </Tab>
</Tabs>

### Cancel Market Orders

Cancel by token to withdraw orders for one outcome, or by market to withdraw
orders for every outcome in the condition. At least one filter is required.

<Tabs>
  <Tab title="TypeScript">
    Call `cancelMarketOrders()` on a `SecureClient` with a token ID or condition
    ID:

    <CodeGroup>
      ```ts Token theme={null}
      const result = await client.cancelMarketOrders({
        tokenId: market.outcomes.yes.tokenId!,
      });
      ```

      ```ts Condition theme={null}
      const result = await client.cancelMarketOrders({
        market: market.conditionId!,
      });
      ```
    </CodeGroup>

    The `market` field takes the market's condition ID.
  </Tab>

  <Tab title="Python">
    Call `cancel_market_orders()` on an `AsyncSecureClient` with a token ID or
    condition ID. The synchronous `SecureClient` provides the same method without
    `await`.

    <CodeGroup>
      ```python Token theme={null}
      result = await client.cancel_market_orders(
          token_id=market.outcomes.yes.token_id,
      )
      ```

      ```python Condition theme={null}
      result = await client.cancel_market_orders(
          market=market.condition_id,
      )
      ```
    </CodeGroup>

    The `market` argument takes the market's condition ID.
  </Tab>

  <Tab title="API">
    Cancel every open order for one outcome with an authenticated CLOB request.
    See [API Authentication](/getting-started/api#authentication) for the
    complete signing flow.

    ```bash theme={null}
    curl -X DELETE "https://clob.polymarket.com/cancel-market-orders" \
      -H "Content-Type: application/json" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>" \
      --data '{"asset_id":"'"$TOKEN_ID"'"}'
    ```

    where `<clob_request_timestamp>` is a Unix timestamp and
    `<clob_l2_signature>` is generated from the exact serialized body:

    ```text theme={null}
    body = '{"asset_id":"' + token_id + '"}'
    message = <clob_request_timestamp> + "DELETE" + "/cancel-market-orders" + body

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    To cancel every open order for a condition, send its condition ID as
    `market` and sign that exact body instead:

    ```bash theme={null}
    curl -X DELETE "https://clob.polymarket.com/cancel-market-orders" \
      -H "Content-Type: application/json" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>" \
      --data '{"market":"'"$CONDITION_ID"'"}'
    ```

    Sign the condition-scoped request using the same path and its exact
    serialized body:

    ```text theme={null}
    body = '{"market":"' + condition_id + '"}'
    message = <clob_request_timestamp> + "DELETE" + "/cancel-market-orders" + body

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    Both requests return `200 OK` with a [cancellation
    result](#cancellation-results) containing `canceled` and
    `not_canceled`.
  </Tab>
</Tabs>

### Cancel All Orders

Use account-wide cancellation when you need to remove every resting order,
such as during an emergency shutdown.

<Warning>
  This action cancels every open order associated with the authenticated CLOB
  API credentials.
</Warning>

<Tabs>
  <Tab title="TypeScript">
    Call `cancelAll()` on a `SecureClient`:

    ```ts theme={null}
    const result = await client.cancelAll();

    // result: CancelOrdersResponse
    ```
  </Tab>

  <Tab title="Python">
    Call `cancel_all()` on an `AsyncSecureClient`. The synchronous `SecureClient`
    provides the same method without `await`.

    ```python theme={null}
    result = await client.cancel_all()

    # result: CancelOrdersResponse
    ```
  </Tab>

  <Tab title="API">
    Cancel every open order with an authenticated CLOB request. See [API
    Authentication](/getting-started/api#authentication) for the complete
    signing flow.

    ```bash theme={null}
    curl -X DELETE "https://clob.polymarket.com/cancel-all" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>"
    ```

    where `<clob_request_timestamp>` is a Unix timestamp and
    `<clob_l2_signature>` is generated without a request body:

    ```text theme={null}
    message = <clob_request_timestamp> + "DELETE" + "/cancel-all"

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    The request returns `200 OK` with a [cancellation
    result](#cancellation-results) containing `canceled` and
    `not_canceled`.
  </Tab>
</Tabs>

### Cancellation Results

A cancellation can succeed for only some of the requested orders. Reconcile the
result before retrying: it identifies the orders that were canceled and gives a
reason for each order that could not be canceled.

<Tabs>
  <Tab title="TypeScript">
    The TypeScript SDK returns a `CancelOrdersResponse`:

    ```ts Type theme={null}
    type CancelOrdersResponse = {
      canceled: OrderId[];
      notCanceled: Record<OrderId, string>;
    };
    ```

    In this example, one order was canceled and another could not be canceled
    because it had already matched:

    ```json Example theme={null}
    {
      "canceled": ["ORDER_ID_1"],
      "notCanceled": {
        "ORDER_ID_2": "order already matched"
      }
    }
    ```
  </Tab>

  <Tab title="Python">
    The Python SDK returns a `CancelOrdersResponse`:

    ```python Type theme={null}
    class CancelOrdersResponse:
        canceled: tuple[OrderId, ...]
        not_canceled: dict[OrderId, str]
    ```

    In this example, one order was canceled and another could not be canceled
    because it had already matched:

    ```json Example theme={null}
    {
      "canceled": ["ORDER_ID_1"],
      "not_canceled": {
        "ORDER_ID_2": "order already matched"
      }
    }
    ```
  </Tab>

  <Tab title="API">
    The API returns the cancellation result as JSON. This response shows one
    canceled order and one order that had already matched:

    ```json Response theme={null}
    {
      "canceled": ["ORDER_ID_1"],
      "not_canceled": {
        "ORDER_ID_2": "order already matched"
      }
    }
    ```
  </Tab>
</Tabs>

## Order Heartbeats

Use order heartbeats to cancel resting orders automatically if your trading
process stops responding. Once the first heartbeat is accepted, the CLOB
expects the account to keep sending them; if a valid heartbeat is not received
within 10 seconds, all open orders owned by those CLOB API credentials are
canceled. The cancellation check runs every five seconds, so cancellation may
occur up to five seconds after the timeout.

<Tabs>
  <Tab title="API">
    Send a heartbeat every **5 seconds**.

    <Steps>
      <Step title="Start the Heartbeat">
        Send an empty `heartbeat_id` to `POST /v1/heartbeats`. Authenticate the
        request with the same CLOB API credentials that own the orders you want to
        protect:

        ```bash theme={null}
        curl -X POST "https://clob.polymarket.com/v1/heartbeats" \
          -H "Content-Type: application/json" \
          -H "POLY_ADDRESS: <signer_address>" \
          -H "POLY_API_KEY: <clob_api_key>" \
          -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
          -H "POLY_SIGNATURE: <clob_l2_signature>" \
          -H "POLY_TIMESTAMP: <clob_request_timestamp>" \
          --data '{"heartbeat_id":""}'
        ```

        Using the signer address and CLOB API credentials from [API
        Authentication](/getting-started/api#authentication), create a fresh
        `<clob_request_timestamp>` and generate `<clob_l2_signature>` from the exact
        serialized body sent over the wire:

        ```text theme={null}
        body = '{"heartbeat_id":""}'
        message = <clob_request_timestamp> + "POST" + "/v1/heartbeats" + body

        clob_l2_signature = urlsafeBase64WithPadding(
          HMAC-SHA256(base64Decode(<clob_api_secret>), message)
        )
        ```

        Save the ID returned in the response:

        ```json theme={null}
        {
          "heartbeat_id": "<heartbeat_id>"
        }
        ```
      </Step>

      <Step title="Continue the Heartbeat">
        After five seconds, send the latest `heartbeat_id` back to the same route.
        Each successful response returns a new ID to use for the following
        heartbeat:

        ```bash theme={null}
        curl -X POST "https://clob.polymarket.com/v1/heartbeats" \
          -H "Content-Type: application/json" \
          -H "POLY_ADDRESS: <signer_address>" \
          -H "POLY_API_KEY: <clob_api_key>" \
          -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
          -H "POLY_SIGNATURE: <clob_l2_signature>" \
          -H "POLY_TIMESTAMP: <clob_request_timestamp>" \
          --data '{"heartbeat_id":"<heartbeat_id>"}'
        ```

        Create a fresh `<clob_request_timestamp>` and `<clob_l2_signature>` for this
        request, replacing `body` in the signing calculation above with the exact
        serialized body containing the latest ID.

        If the ID is invalid or expired, the CLOB responds with `400 Bad Request`
        and supplies the expected ID. Sign a new request with that ID and retry:

        ```json theme={null}
        {
          "error_msg": "Invalid Heartbeat ID",
          "heartbeat_id": "<expected_heartbeat_id>"
        }
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="TypeScript">Content coming soon.</Tab>
  <Tab title="Python">Content coming soon.</Tab>
</Tabs>

## Check Closed-Only Mode

Closed-only mode is an account-level circuit breaker for a market. When it's
on, the account can only place orders that reduce an existing position, not
new opening orders. Check this before placing an order if you want to fail
fast instead of waiting for a rejection.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchClosedOnlyMode()` on a `SecureClient`:

    ```ts theme={null}
    const closedOnly = await client.fetchClosedOnlyMode();

    // closedOnly: boolean
    ```

    The method returns the account's closed-only state as a boolean:

    <CodeGroup>
      ```json ClosedOnlyMode Example theme={null}
      false
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Call `get_closed_only_mode()` on an `AsyncSecureClient`. The synchronous
    `SecureClient` provides the same method.

    ```python theme={null}
    closed_only = await client.get_closed_only_mode()

    # closed_only: bool
    ```

    The method returns the account's closed-only state as a `bool`:

    <CodeGroup>
      ```json ClosedOnlyMode Example theme={null}
      false
      ```
    </CodeGroup>
  </Tab>

  <Tab title="API">
    Read the account's closed-only state:

    ```bash theme={null}
    curl "https://clob.polymarket.com/auth/ban-status/closed-only" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>"
    ```

    Using the signer address and CLOB API credentials from [API
    Authentication](/getting-started/api#authentication), create a fresh
    `<clob_request_timestamp>` and generate `<clob_l2_signature>` without a
    request body:

    ```text theme={null}
    message = <clob_request_timestamp> + "GET" + "/auth/ban-status/closed-only"

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    <CodeGroup>
      ```ts ClosedOnlyMode Type theme={null}
      type ClosedOnlyMode = {
        closed_only: boolean;
      };
      ```

      ```json ClosedOnlyMode Example theme={null}
      {
        "closed_only": false
      }
      ```
    </CodeGroup>

    `closed_only: true` means the account can only reduce or close existing
    positions; new position-opening orders are rejected.
  </Tab>
</Tabs>

## Check Order Scoring

An order scores when it is live on a market with [liquidity
rewards](/programs/liquidity-rewards) and meets the market's minimum qualifying
size, maximum qualifying spread, and required live duration. Because
eligibility changes as the order book moves, treat the result as a point-in-time
check.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchOrderScoring()` on a `SecureClient` with the order ID:

    ```ts theme={null}
    const scoring = await client.fetchOrderScoring({ orderId: order.id });

    // scoring: boolean
    ```

    To check the scoring status of several orders in one request, call
    `fetchOrdersScoring()` with their IDs:

    ```ts theme={null}
    const scoringByOrder = await client.fetchOrdersScoring({
      orderIds: ["ORDER_ID_1", "ORDER_ID_2"],
    });

    // scoringByOrder: OrdersScoringResponse
    ```

    The response maps each order ID to its scoring status:

    <CodeGroup>
      ```ts OrdersScoringResponse Type theme={null}
      type OrdersScoringResponse = Record<string, boolean>;
      ```

      ```json OrdersScoringResponse Example theme={null}
      {
        "ORDER_ID_1": true,
        "ORDER_ID_2": false
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Call `get_order_scoring()` on an `AsyncSecureClient` with the order ID. The
    synchronous `SecureClient` provides the same method.

    ```python theme={null}
    scoring = await client.get_order_scoring(order_id=order.id)

    # scoring: bool
    ```

    To check the scoring status of several orders in one request, call
    `get_orders_scoring()` with their IDs:

    ```python theme={null}
    scoring_by_order = await client.get_orders_scoring(
        order_ids=["ORDER_ID_1", "ORDER_ID_2"],
    )

    # scoring_by_order: dict[str, bool]
    ```

    The response maps each order ID to its scoring status:

    <CodeGroup>
      ```python OrdersScoringResponse Type theme={null}
      dict[str, bool]
      ```

      ```json OrdersScoringResponse Example theme={null}
      {
        "ORDER_ID_1": true,
        "ORDER_ID_2": false
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="API">
    Check whether an order currently qualifies for rewards:

    ```bash theme={null}
    curl "https://clob.polymarket.com/order-scoring?order_id=<order_id>" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>"
    ```

    Using the signer address and CLOB API credentials from [API
    Authentication](/getting-started/api#authentication), create a fresh
    `<clob_request_timestamp>` and generate `<clob_l2_signature>` without a
    request body. The `order_id` query parameter is not part of the signed path:

    ```text theme={null}
    message = <clob_request_timestamp> + "GET" + "/order-scoring"

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    The response contains the order's current scoring status:

    ```json Example theme={null}
    {
      "scoring": true
    }
    ```

    See [Get Order Scoring
    Status](/api-reference/trade/get-order-scoring-status) for the complete
    request and response schema.
  </Tab>
</Tabs>
