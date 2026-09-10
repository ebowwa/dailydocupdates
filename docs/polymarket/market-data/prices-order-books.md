<!--
Source: https://docs.polymarket.com/market-data/prices-order-books.md
Downloaded: 2026-09-10T22:17:46.066Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Prices and Order Books

> Learn how prices and order books represent trading activity on Polymarket.

Each Polymarket outcome is represented by a token traded on the CLOB. Its price
reflects what traders are willing to pay for that outcome, while its order book
shows the resting bids and asks.

The examples below assume you already have a market object from which to read
the outcome token IDs. To find or fetch one, see
[**Discover Markets**](/market-data/discover-markets).

<Tabs>
  <Tab title="TypeScript">
    Given a market, read its outcome token IDs:

    ```ts theme={null}
    const yesTokenId = market.outcomes.yes.tokenId!;
    const noTokenId = market.outcomes.no.tokenId!;
    ```
  </Tab>

  <Tab title="Python">
    Given a market, read its outcome token IDs:

    ```python theme={null}
    yes_token_id = market.outcomes.yes.token_id
    no_token_id = market.outcomes.no.token_id
    ```
  </Tab>

  <Tab title="API">
    Given a market object, its outcome token IDs are stored as a JSON-encoded
    array:

    ```json theme={null}
    {
      "clobTokenIds": "[\"<yes_token_id>\", \"<no_token_id>\"]"
    }
    ```

    Parse the array, then select the outcome you want to read:

    ```bash theme={null}
    TOKEN_ID="<yes_token_id>"
    ```
  </Tab>
</Tabs>

## Order Book

Retrieve the resting bids and asks for one outcome token. Bids are ordered by
ascending price and asks by descending price, so the best bid and ask are the
last entries in their respective arrays. Each response also includes a `hash`
for the order-book state. Compare it with the previous response's hash to
determine whether the book changed between reads.

### Fetch an Order Book

<Tabs>
  <Tab title="TypeScript">
    Call `fetchOrderBook()` on a `PublicClient` or `SecureClient` to fetch an outcome's
    order book.

    ```ts theme={null}
    const book = await client.fetchOrderBook({ tokenId: yesTokenId });

    // book: OrderBook
    ```

    The returned `OrderBook` describes its price levels and the market details
    needed to interpret them:

    <CodeGroup>
      ```ts OrderBook Type theme={null}
      type OrderBookLevel = {
        price: DecimalString;
        size: DecimalString;
      };

      type OrderBook = {
        conditionId: CtfConditionId;
        tokenId: TokenId;
        timestamp?: EpochMilliseconds | null;
        bids: OrderBookLevel[];
        asks: OrderBookLevel[];
        minOrderSize: DecimalString;
        tickSize: DecimalString;
        negRisk: boolean;
        lastTradePrice?: DecimalString | null;
        hash: OrderBookHash;
      };
      ```

      ```json OrderBook Example theme={null}
      {
        "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "timestamp": 1782753404902,
        "bids": [
          { "price": "0.01", "size": "2116131.59" },
          { "price": "0.02", "size": "139963.89" },
          { "price": "0.03", "size": "208169.44" },
          "..."
        ],
        "asks": [
          { "price": "0.99", "size": "93442.27" },
          { "price": "0.98", "size": "13229.55" },
          { "price": "0.97", "size": "4338.7" },
          "..."
        ],
        "minOrderSize": "5",
        "tickSize": "0.01",
        "negRisk": false,
        "lastTradePrice": "0.090",
        "hash": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Call `get_order_book()` on an `AsyncPublicClient` or `AsyncSecureClient` to
    fetch an outcome's order book. The synchronous `PublicClient` and
    `SecureClient` provide the same method.

    ```python theme={null}
    book = await client.get_order_book(token_id=yes_token_id)

    # book: OrderBook
    ```

    The returned `OrderBook` describes its price levels and the market details
    needed to interpret them:

    <CodeGroup>
      ```python OrderBook Type theme={null}
      class OrderBookLevel:
          price: Decimal
          size: Decimal

      class OrderBook:
          condition_id: CtfConditionId
          token_id: TokenId
          timestamp: datetime | None
          bids: tuple[OrderBookLevel, ...]
          asks: tuple[OrderBookLevel, ...]
          min_order_size: Decimal
          tick_size: Decimal
          neg_risk: bool
          last_trade_price: Decimal | None
          hash: str
      ```

      ```json OrderBook Example theme={null}
      {
        "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "timestamp": "2026-06-29T17:16:44.902000+00:00",
        "bids": [
          { "price": "0.01", "size": "2116131.59" },
          { "price": "0.02", "size": "139963.89" },
          { "price": "0.03", "size": "208169.44" },
          "..."
        ],
        "asks": [
          { "price": "0.99", "size": "93442.27" },
          { "price": "0.98", "size": "13229.55" },
          { "price": "0.97", "size": "4338.7" },
          "..."
        ],
        "min_order_size": "5",
        "tick_size": "0.01",
        "neg_risk": false,
        "last_trade_price": "0.090",
        "hash": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="API">
    Fetch an outcome's order book:

    ```bash theme={null}
    curl "https://clob.polymarket.com/book?token_id=$TOKEN_ID"
    ```

    Alongside its price levels, the response includes the trading constraints
    needed to validate an order:

    ```json theme={null}
    {
      "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
      "asset_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
      "timestamp": "1782753357257",
      "hash": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
      "bids": [
        { "price": "0.01", "size": "2151131.59" },
        { "price": "0.02", "size": "139963.89" },
        { "price": "0.03", "size": "208169.44" },
        "..."
      ],
      "asks": [
        { "price": "0.99", "size": "218442.27" },
        { "price": "0.98", "size": "13229.55" },
        { "price": "0.97", "size": "4338.7" },
        "..."
      ],
      "min_order_size": "5",
      "tick_size": "0.01",
      "neg_risk": false,
      "last_trade_price": "0.090"
    }
    ```
  </Tab>
</Tabs>

### Fetch Multiple Order Books

Batch order-book reads return the resting bids and asks for several outcomes in
one request.

<Info>Maximum 500 items per request.</Info>

<Tabs>
  <Tab title="TypeScript">
    Call `fetchOrderBooks()` on a `PublicClient` or `SecureClient` to fetch several order
    books in one request.

    ```ts theme={null}
    const books = await client.fetchOrderBooks([
      { tokenId: yesTokenId },
      { tokenId: noTokenId },
    ]);

    // books: OrderBook[]
    ```

    Each item uses the `OrderBook` shape described above:

    ```json theme={null}
    [
      {
        "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "bids": [
          { "price": "0.01", "size": "2116131.59" },
          { "price": "0.02", "size": "139963.89" },
          { "price": "0.03", "size": "208169.44" },
          "..."
        ],
        "asks": [
          { "price": "0.99", "size": "93442.27" },
          { "price": "0.98", "size": "13229.55" },
          { "price": "0.97", "size": "4338.7" },
          "..."
        ]
      },
      {
        "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "bids": [
          { "price": "0.01", "size": "93442.27" },
          { "price": "0.02", "size": "13229.55" },
          { "price": "0.03", "size": "4338.7" },
          "..."
        ],
        "asks": [
          { "price": "0.99", "size": "2116131.59" },
          { "price": "0.98", "size": "139963.89" },
          { "price": "0.97", "size": "208169.44" },
          "..."
        ]
      }
    ]
    ```
  </Tab>

  <Tab title="Python">
    Call `get_order_books()` on an `AsyncPublicClient` or `AsyncSecureClient` to
    fetch several order books in one request. The synchronous `PublicClient`
    and `SecureClient` provide the same method.

    ```python theme={null}
    books = await client.get_order_books(token_ids=[yes_token_id, no_token_id])

    # books: tuple[OrderBook, ...]
    ```

    Each item uses the `OrderBook` shape described above:

    ```json theme={null}
    [
      {
        "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "bids": [
          { "price": "0.01", "size": "2116131.59" },
          { "price": "0.02", "size": "139963.89" },
          { "price": "0.03", "size": "208169.44" },
          "..."
        ],
        "asks": [
          { "price": "0.99", "size": "93442.27" },
          { "price": "0.98", "size": "13229.55" },
          { "price": "0.97", "size": "4338.7" },
          "..."
        ]
      },
      {
        "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "bids": [
          { "price": "0.01", "size": "93442.27" },
          { "price": "0.02", "size": "13229.55" },
          { "price": "0.03", "size": "4338.7" },
          "..."
        ],
        "asks": [
          { "price": "0.99", "size": "2116131.59" },
          { "price": "0.98", "size": "139963.89" },
          { "price": "0.97", "size": "208169.44" },
          "..."
        ]
      }
    ]
    ```
  </Tab>

  <Tab title="API">
    Fetch several order books in one request:

    ```bash theme={null}
    curl -X POST "https://clob.polymarket.com/books" \
      -H "Content-Type: application/json" \
      --data '[{"token_id":"<yes_token_id>"},{"token_id":"<no_token_id>"}]'
    ```

    The response contains one order book for each requested token ID:

    ```json theme={null}
    [
      {
        "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "asset_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "timestamp": "1782753357257",
        "hash": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
        "bids": [
          { "price": "0.01", "size": "2151131.59" },
          { "price": "0.02", "size": "139963.89" },
          { "price": "0.03", "size": "208169.44" },
          "..."
        ],
        "asks": [
          { "price": "0.99", "size": "218442.27" },
          { "price": "0.98", "size": "13229.55" },
          { "price": "0.97", "size": "4338.7" },
          "..."
        ],
        "min_order_size": "5",
        "tick_size": "0.01",
        "neg_risk": false,
        "last_trade_price": "0.090"
      },
      {
        "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "asset_id": "7305630249804085635496399869905769372294302716159034447326228509068694952392",
        "timestamp": "1782753357257",
        "hash": "f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5d4c3b2a1f6e5",
        "bids": [
          { "price": "0.01", "size": "218442.27" },
          { "price": "0.02", "size": "13229.55" },
          { "price": "0.03", "size": "4338.7" },
          "..."
        ],
        "asks": [
          { "price": "0.99", "size": "2151131.59" },
          { "price": "0.98", "size": "139963.89" },
          { "price": "0.97", "size": "208169.44" },
          "..."
        ],
        "min_order_size": "5",
        "tick_size": "0.01",
        "neg_risk": true,
        "last_trade_price": "0.910"
      }
    ]
    ```
  </Tab>
</Tabs>

## Best Market Price

Read the best available execution price for an outcome and side. `BUY` returns
the lowest ask, which is the price you would pay to buy. `SELL` returns the
highest bid, which is the price you would receive when selling.

### Fetch a Price

<Tabs>
  <Tab title="TypeScript">
    Call `fetchPrice()` on a `PublicClient` or `SecureClient` to fetch the best price for
    one side. For a `BUY`, the method returns the lowest ask.

    ```ts theme={null}
    import { OrderSide } from "@polymarket/client";

    const price = await client.fetchPrice({
      tokenId: yesTokenId,
      side: OrderSide.BUY,
    });

    // price: DecimalString
    ```

    The method returns the price as a decimal string:

    ```json theme={null}
    "0.08"
    ```
  </Tab>

  <Tab title="Python">
    Call `get_price()` on an `AsyncPublicClient` or `AsyncSecureClient` to fetch
    the best price for one side. For a `BUY`, the method returns the lowest ask.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    price = await client.get_price(token_id=yes_token_id, side="BUY")

    # price: Decimal
    ```

    The method returns the price as a `Decimal`:

    ```python theme={null}
    Decimal("0.08")
    ```
  </Tab>

  <Tab title="API">
    Fetch the lowest ask available to a buyer:

    ```bash theme={null}
    curl "https://clob.polymarket.com/price?token_id=$TOKEN_ID&side=BUY"
    ```

    The response contains the price as a decimal string:

    ```json theme={null}
    { "price": "0.08" }
    ```
  </Tab>
</Tabs>

### Fetch Multiple Prices

Batch price reads return the best market price for several outcome-and-side pairs
in one request. Use them when the same view or calculation needs more than one
outcome.

<Info>Maximum 500 items per request.</Info>

<Tabs>
  <Tab title="TypeScript">
    Call `fetchPrices()` on a `PublicClient` or `SecureClient` to fetch several prices in
    one request.

    ```ts theme={null}
    import { OrderSide } from "@polymarket/client";

    const prices = await client.fetchPrices([
      { tokenId: yesTokenId, side: OrderSide.BUY },
      { tokenId: noTokenId, side: OrderSide.BUY },
    ]);

    // prices: Prices (map of tokenId -> side -> price)
    ```

    `Prices` maps each token ID to the requested side and price:

    <CodeGroup>
      ```ts Prices Type theme={null}
      type Prices = Record<TokenId, Partial<Record<OrderSide, DecimalString>>>;
      ```

      ```json Prices Example theme={null}
      {
        "107505882767731489358349912513945399560393482969656700824895970500493757150417": {
          "BUY": "0.08"
        },
        "7305630249804085635496399869905769372294302716159034447326228509068694952392": {
          "BUY": "0.91"
        }
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Call `get_prices()` on an `AsyncPublicClient` or `AsyncSecureClient` to
    fetch several prices in one request. The synchronous `PublicClient` and
    `SecureClient` provide the same method.

    ```python theme={null}
    from polymarket import PriceRequest

    prices = await client.get_prices(
        requests=[
            PriceRequest(token_id=yes_token_id, side="BUY"),
            PriceRequest(token_id=no_token_id, side="BUY"),
        ],
    )

    # prices: dict[TokenId, dict[OrderSide, Decimal]]
    ```

    The result maps each token ID to the requested side and price:

    ```json theme={null}
    {
      "107505882767731489358349912513945399560393482969656700824895970500493757150417": {
        "BUY": "0.08"
      },
      "7305630249804085635496399869905769372294302716159034447326228509068694952392": {
        "BUY": "0.91"
      }
    }
    ```
  </Tab>

  <Tab title="API">
    Fetch several prices in one request:

    ```bash theme={null}
    curl -X POST "https://clob.polymarket.com/prices" \
      -H "Content-Type: application/json" \
      --data '[{"token_id":"<yes_token_id>","side":"BUY"},{"token_id":"<no_token_id>","side":"BUY"}]'
    ```

    The response maps each token ID to the requested side and price:

    ```json theme={null}
    {
      "107505882767731489358349912513945399560393482969656700824895970500493757150417": {
        "BUY": 0.08
      },
      "7305630249804085635496399869905769372294302716159034447326228509068694952392": {
        "BUY": 0.91
      }
    }
    ```
  </Tab>
</Tabs>

## Midpoint Price

The midpoint is the average of the best bid and best ask. It provides a reference
price between the two sides of the order book.

### Fetch a Midpoint

<Tabs>
  <Tab title="TypeScript">
    Call `fetchMidpoint()` on a `PublicClient` or `SecureClient` to fetch the midpoint.

    ```ts theme={null}
    const midpoint = await client.fetchMidpoint({ tokenId: yesTokenId });

    // midpoint: DecimalString
    ```

    The method returns the midpoint as a decimal string:

    ```json theme={null}
    "0.085"
    ```
  </Tab>

  <Tab title="Python">
    Call `get_midpoint()` on an `AsyncPublicClient` or `AsyncSecureClient` to
    fetch the midpoint.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    midpoint = await client.get_midpoint(token_id=yes_token_id)

    # midpoint: Decimal
    ```

    The method returns the midpoint as a `Decimal`:

    ```python theme={null}
    Decimal("0.085")
    ```
  </Tab>

  <Tab title="API">
    Fetch the midpoint:

    ```bash theme={null}
    curl "https://clob.polymarket.com/midpoint?token_id=$TOKEN_ID"
    ```

    The response contains the midpoint as a decimal string:

    ```json theme={null}
    { "mid": "0.085" }
    ```
  </Tab>
</Tabs>

### Fetch Multiple Midpoints

Fetch midpoint prices for several outcomes in one request.

<Info>Maximum 500 items per request.</Info>

<Tabs>
  <Tab title="TypeScript">
    Call `fetchMidpoints()` on a `PublicClient` or `SecureClient` to fetch several
    midpoints.

    ```ts theme={null}
    const midpoints = await client.fetchMidpoints([
      { tokenId: yesTokenId },
      { tokenId: noTokenId },
    ]);

    // midpoints: Midpoints
    ```

    `Midpoints` maps each token ID to its midpoint:

    <CodeGroup>
      ```ts Midpoints Type theme={null}
      type Midpoints = Record<TokenId, DecimalString>;
      ```

      ```json Midpoints Example theme={null}
      {
        "107505882767731489358349912513945399560393482969656700824895970500493757150417": "0.085",
        "7305630249804085635496399869905769372294302716159034447326228509068694952392": "0.915"
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Call `get_midpoints()` on an `AsyncPublicClient` or `AsyncSecureClient` to
    fetch several midpoints. The synchronous `PublicClient` and `SecureClient`
    provide the same method.

    ```python theme={null}
    midpoints = await client.get_midpoints(token_ids=[yes_token_id, no_token_id])

    # midpoints: dict[TokenId, Decimal]
    ```

    The result maps each token ID to its midpoint:

    ```json theme={null}
    {
      "107505882767731489358349912513945399560393482969656700824895970500493757150417": "0.085",
      "7305630249804085635496399869905769372294302716159034447326228509068694952392": "0.915"
    }
    ```
  </Tab>

  <Tab title="API">
    Fetch several midpoints in one request:

    ```bash theme={null}
    curl -X POST "https://clob.polymarket.com/midpoints" \
      -H "Content-Type: application/json" \
      --data '[{"token_id":"<yes_token_id>"},{"token_id":"<no_token_id>"}]'
    ```

    The response maps each token ID to its midpoint:

    ```json theme={null}
    {
      "107505882767731489358349912513945399560393482969656700824895970500493757150417": "0.085",
      "7305630249804085635496399869905769372294302716159034447326228509068694952392": "0.915"
    }
    ```
  </Tab>
</Tabs>

## Spread

The spread is the difference between the best ask and best bid. A narrower
spread indicates that the two sides of the order book are closer together.

### Fetch a Spread

<Tabs>
  <Tab title="TypeScript">
    Call `fetchSpread()` on a `PublicClient` or `SecureClient` to fetch the spread.

    ```ts theme={null}
    const spread = await client.fetchSpread({ tokenId: yesTokenId });

    // spread: DecimalString
    ```

    The method returns the spread as a decimal string:

    ```json theme={null}
    "0.01"
    ```
  </Tab>

  <Tab title="Python">
    Call `get_spread()` on an `AsyncPublicClient` or `AsyncSecureClient` to fetch
    the spread. The synchronous `PublicClient` and `SecureClient` provide the
    same method.

    ```python theme={null}
    spread = await client.get_spread(token_id=yes_token_id)

    # spread: Decimal
    ```

    The method returns the spread as a `Decimal`:

    ```python theme={null}
    Decimal("0.01")
    ```
  </Tab>

  <Tab title="API">
    Fetch the spread:

    ```bash theme={null}
    curl "https://clob.polymarket.com/spread?token_id=$TOKEN_ID"
    ```

    The response contains the spread as a decimal string:

    ```json theme={null}
    { "spread": "0.01" }
    ```
  </Tab>
</Tabs>

### Fetch Multiple Spreads

Batch spread reads return the bid-ask spread for several outcomes in one
request.

<Info>Maximum 500 items per request.</Info>

<Tabs>
  <Tab title="TypeScript">
    Call `fetchSpreads()` on a `PublicClient` or `SecureClient` to fetch several spreads
    in one request.

    ```ts theme={null}
    const spreads = await client.fetchSpreads([
      { tokenId: yesTokenId },
      { tokenId: noTokenId },
    ]);

    // spreads: Spreads
    ```

    The result maps each token ID to its spread:

    <CodeGroup>
      ```ts Spreads Type theme={null}
      type Spreads = Record<TokenId, DecimalString>;
      ```

      ```json Spreads Example theme={null}
      {
        "107505882767731489358349912513945399560393482969656700824895970500493757150417": "0.01",
        "7305630249804085635496399869905769372294302716159034447326228509068694952392": "0.02"
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Call `get_spreads()` on an `AsyncPublicClient` or `AsyncSecureClient` to
    fetch several spreads in one request. The synchronous `PublicClient` and
    `SecureClient` provide the same method.

    ```python theme={null}
    spreads = await client.get_spreads(token_ids=[yes_token_id, no_token_id])

    # spreads: dict[TokenId, Decimal]
    ```

    The result maps each token ID to its spread:

    ```json theme={null}
    {
      "107505882767731489358349912513945399560393482969656700824895970500493757150417": "0.01",
      "7305630249804085635496399869905769372294302716159034447326228509068694952392": "0.02"
    }
    ```
  </Tab>

  <Tab title="API">
    Fetch several spreads in one request:

    ```bash theme={null}
    curl -X POST "https://clob.polymarket.com/spreads" \
      -H "Content-Type: application/json" \
      --data '[{"token_id":"<yes_token_id>"},{"token_id":"<no_token_id>"}]'
    ```

    The response maps each token ID to its spread:

    ```json theme={null}
    {
      "107505882767731489358349912513945399560393482969656700824895970500493757150417": "0.01",
      "7305630249804085635496399869905769372294302716159034447326228509068694952392": "0.02"
    }
    ```
  </Tab>
</Tabs>

## Last Trade Price

Use the last trade price to see where an outcome most recently traded.

### Fetch a Last Trade Price

<Tabs>
  <Tab title="TypeScript">
    Call `fetchLastTradePrice()` on a `PublicClient` or `SecureClient` to fetch the last
    trade.

    ```ts theme={null}
    const lastTrade = await client.fetchLastTradePrice({ tokenId: yesTokenId });

    // lastTrade: LastTradePrice | null
    ```

    `LastTradePrice` pairs the traded price with its order side:

    <CodeGroup>
      ```ts LastTradePrice Type theme={null}
      type LastTradePrice = {
        price: DecimalString;
        side: OrderSide;
      };
      ```

      ```json LastTradePrice Example theme={null}
      {
        "price": "0.08",
        "side": "SELL"
      }
      ```
    </CodeGroup>

    When a token has never traded, `fetchLastTradePrice()` returns `null`
    instead of a `LastTradePrice` object:

    ```json theme={null}
    null
    ```
  </Tab>

  <Tab title="Python">
    Call `get_last_trade_price()` on an `AsyncPublicClient` or
    `AsyncSecureClient` to fetch the last trade. The synchronous `PublicClient`
    and `SecureClient` provide the same method.

    ```python theme={null}
    last_trade = await client.get_last_trade_price(token_id=yes_token_id)

    # last_trade: LastTradePrice | None
    ```

    `LastTradePrice` pairs the traded price with its order side:

    <CodeGroup>
      ```python LastTradePrice Type theme={null}
      class LastTradePrice:
          price: Decimal
          side: OrderSide
      ```

      ```json LastTradePrice Example theme={null}
      {
        "price": "0.08",
        "side": "SELL"
      }
      ```
    </CodeGroup>

    When a token has never traded, `get_last_trade_price()` returns `None`
    instead of a `LastTradePrice` object:

    ```python theme={null}
    None
    ```
  </Tab>

  <Tab title="API">
    Fetch the last trade:

    ```bash theme={null}
    curl "https://clob.polymarket.com/last-trade-price?token_id=$TOKEN_ID"
    ```

    The response contains the traded price and side:

    ```json theme={null}
    {
      "price": "0.08",
      "side": "SELL"
    }
    ```

    When a token has never traded and its order book is empty, the API returns
    the `"0.5"` placeholder and an empty `side` string:

    ```json theme={null}
    {
      "price": "0.5",
      "side": ""
    }
    ```
  </Tab>
</Tabs>

### Fetch Multiple Last Trade Prices

Fetch the most recent matched trade for several outcomes in one request.

<Info>Maximum 500 items per request.</Info>

<Tabs>
  <Tab title="TypeScript">
    Call `fetchLastTradePrices()` on a `PublicClient` or `SecureClient` to fetch several
    last trades.

    ```ts theme={null}
    const lastTrades = await client.fetchLastTradePrices([
      { tokenId: yesTokenId },
      { tokenId: noTokenId },
    ]);

    // lastTrades: LastTradePriceForToken[]
    ```

    Each `LastTradePriceForToken` identifies the outcome alongside its traded
    price and side:

    <CodeGroup>
      ```ts LastTradePriceForToken Type theme={null}
      type LastTradePriceForToken = {
        tokenId: TokenId;
        price: DecimalString;
        side: OrderSide;
      };
      ```

      ```json LastTradePriceForToken Example theme={null}
      [
        {
          "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
          "price": "0.08",
          "side": "SELL"
        },
        {
          "tokenId": "7305630249804085635496399869905769372294302716159034447326228509068694952392",
          "price": "0.91",
          "side": "BUY"
        }
      ]
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Call `get_last_trade_prices()` on an `AsyncPublicClient` or
    `AsyncSecureClient` to fetch several last trades. The synchronous
    `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    last_trades = await client.get_last_trade_prices(
        token_ids=[yes_token_id, no_token_id]
    )

    # last_trades: tuple[LastTradePriceForToken, ...]
    ```

    Each `LastTradePriceForToken` identifies the outcome alongside its traded
    price and side:

    <CodeGroup>
      ```python LastTradePriceForToken Type theme={null}
      class LastTradePriceForToken:
          token_id: TokenId
          price: Decimal
          side: OrderSide
      ```

      ```json LastTradePriceForToken Example theme={null}
      [
        {
          "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
          "price": "0.08",
          "side": "SELL"
        },
        {
          "token_id": "7305630249804085635496399869905769372294302716159034447326228509068694952392",
          "price": "0.91",
          "side": "BUY"
        }
      ]
      ```
    </CodeGroup>
  </Tab>

  <Tab title="API">
    Fetch several last trade prices in one request:

    ```bash theme={null}
    curl -X POST "https://clob.polymarket.com/last-trades-prices" \
      -H "Content-Type: application/json" \
      --data '[{"token_id":"<yes_token_id>"},{"token_id":"<no_token_id>"}]'
    ```

    The response identifies each outcome alongside its traded price and side:

    ```json theme={null}
    [
      {
        "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "price": "0.08",
        "side": "SELL"
      },
      {
        "token_id": "7305630249804085635496399869905769372294302716159034447326228509068694952392",
        "price": "0.91",
        "side": "BUY"
      }
    ]
    ```
  </Tab>
</Tabs>

Tokens that have never traded are omitted from the multi-token response.

## Price History

Read historical prices for an outcome token over a selected time period.

<Tabs>
  <Tab title="TypeScript">
    Call `listPriceHistory()` on a `PublicClient` or `SecureClient`. Choose a
    relative window, an explicit time range, or a point in time.

    <CodeGroup>
      ```ts Relative Window theme={null}
      import { PriceHistoryInterval } from "@polymarket/client";

      const pages = client.listPriceHistory({
        assetId: yesTokenId,
        interval: PriceHistoryInterval.OneDay,
        bucketSeconds: 3600,
      });

      for await (const page of pages) {
        // page.items: PriceHistoryPoint[]
      }
      ```

      ```ts Absolute Range theme={null}
      const pages = client.listPriceHistory({
        assetId: yesTokenId,
        start: 1788278400,
        end: 1788364800,
        bucketSeconds: 3600,
      });

      for await (const page of pages) {
        // page.items: PriceHistoryPoint[]
      }
      ```

      ```ts Point In Time theme={null}
      const pages = client.listPriceHistory({
        assetId: yesTokenId,
        asOf: 1788364800,
      });
      const observation = await pages.firstPage();

      // observation.items: PriceHistoryPoint[] (at most one item)
      ```
    </CodeGroup>

    Each `PriceHistoryPoint` carries the observation time in epoch
    milliseconds, the price as a decimal string, and the window it was
    observed in:

    <Accordion title="Output: PriceHistoryPoint">
      <CodeGroup>
        ```ts PriceHistoryPoint Type theme={null}
        type PriceHistoryPoint = {
          /** Observation time as Unix epoch milliseconds. */
          timestamp: EpochMilliseconds;
          /** Observed price, normalized to a decimal string. */
          price: DecimalString;
          /** Width of the observation window in seconds; zero identifies an exact tick. */
          resolutionSeconds: number;
        };
        ```

        ```json PriceHistoryPoint Example theme={null}
        [
          { "timestamp": 1788354000000, "price": "0.255", "resolutionSeconds": 3600 },
          { "timestamp": 1788357600000, "price": "0.255", "resolutionSeconds": 3600 },
          { "timestamp": 1788361200000, "price": "0.255", "resolutionSeconds": 3600 }
        ]
        ```
      </CodeGroup>
    </Accordion>

    Points are oldest first. The final observation can fall between bucket
    boundaries. Read `resolutionSeconds` instead of assuming uniform spacing.

    <Accordion title="History Windows and Resolution">
      * Explicit `start`/`end` ranges span at most 15 days. `start` is inclusive and `end` exclusive.
      * `PriceHistoryInterval.Max` returns full history at 12-hour buckets by default. Explicit `bucketSeconds` values of 10800 or 43200 also cover full history. Finer widths return only the last 30 days.
      * `bucketSeconds` accepts 60 to 86400 seconds, with a floor of 600 for `max`/`1m` and 300 for `1w`. Omit it to let the server choose a width for the span and available history.
      * One-minute data lasts at least 7 days, five-minute at least 60 days, and thirty-minute at least 90 days (floors, not exact horizons). Three-hour and twelve-hour data is permanent. Explicitly requesting a resolution the store cannot fill returns an empty or sparse page with `resolution_seconds` echoing the requested grid; omit `bucket_seconds` to always get the densest series that exists.
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `list_price_history()` on an existing `AsyncPublicClient` or `AsyncSecureClient`.

    Choose a relative window, an explicit time range, or a point in time.

    <CodeGroup>
      ```python Relative Window theme={null}
      pages = client.list_price_history(
          asset_id=yes_token_id,
          interval="1d",
          bucket_seconds=3600,
      )

      async for page in pages:
          # page.items: tuple[PriceHistoryPoint, ...]
          pass
      ```

      ```python Absolute Range theme={null}
      pages = client.list_price_history(
          asset_id=yes_token_id,
          start=1788278400,
          end=1788364800,
          bucket_seconds=3600,
      )

      async for page in pages:
          # page.items: tuple[PriceHistoryPoint, ...]
          pass
      ```

      ```python Point in Time theme={null}
      pages = client.list_price_history(
          asset_id=yes_token_id,
          as_of=1788364800,
      )
      page = await pages.first_page()
      observation = page.items[0] if page.items else None

      # observation: PriceHistoryPoint | None
      ```
    </CodeGroup>

    <Accordion title="Output: PriceHistoryPoint">
      <CodeGroup>
        ```python PriceHistoryPoint Type theme={null}
        class PriceHistoryPoint:
            timestamp: datetime
            price: Decimal
            resolution_seconds: int
        ```

        ```json PriceHistoryPoint Example theme={null}
        {
          "timestamp": "2026-09-07T17:04:00Z",
          "price": "0.955",
          "resolution_seconds": 60
        }
        ```
      </CodeGroup>
    </Accordion>

    Points are ordered oldest first. `timestamp` is a timezone-aware `datetime` and `price` is a `Decimal`. `resolution_seconds` is the observation window in seconds, with zero for an exact tick.

    <Accordion title="History Windows and Resolution">
      * Explicit ranges span at most 15 days. `start` is inclusive and `end` is exclusive.
      * Choose exactly one of `interval`, `start`, or `as_of`. An `as_of` request cannot set `bucket_seconds` or `page_size`.
      * `bucket_seconds` accepts 60 to 86400 seconds. The minimum is 600 for `max`, `all`, and `1m`, and 300 for `1w`. Omit it to let the service choose the resolution.
      * Use `interval="max"` without `bucket_seconds` for full history at the default resolution.
    </Accordion>
  </Tab>

  <Tab title="API">
    Pass `token_id` and exactly one time form: `interval` for a relative
    window, `start` (with optional `end`, epoch seconds, at most 15 days) for
    an absolute range, or `as_of` for a point-in-time read. `bucket_seconds`
    sets the bucket width in seconds; deeper pages come from `?cursor=`.

    <CodeGroup>
      ```bash Relative Window theme={null}
      curl "https://data-api.polymarket.com/v2/prices-history?token_id=$TOKEN_ID&interval=1d&bucket_seconds=3600"
      ```

      ```bash Absolute Range theme={null}
      curl "https://data-api.polymarket.com/v2/prices-history?token_id=$TOKEN_ID&start=1788278400&end=1788364800&bucket_seconds=3600"
      ```

      ```bash Point In Time theme={null}
      curl "https://data-api.polymarket.com/v2/prices-history?token_id=$TOKEN_ID&as_of=1788364800"
      ```
    </CodeGroup>

    The response contains the price points under `data`, oldest first, with
    the cursor pagination object:

    ```json theme={null}
    {
      "data": [
        { "timestamp": 1788354000, "price": 0.255, "resolution_seconds": 3600 },
        { "timestamp": 1788357600, "price": 0.255, "resolution_seconds": 3600 },
        { "timestamp": 1788361200, "price": 0.255, "resolution_seconds": 3600 }
      ],
      "pagination": {
        "limit": 3,
        "has_more": true,
        "next_cursor": "eyJkYXRhIjp7InR5cGUiOiJwcmljZXNfaGlzdG9yeSI…"
      }
    }
    ```

    Points are oldest first. The final observation can fall between bucket
    boundaries. Read `resolution_seconds` instead of assuming uniform spacing.

    <Accordion title="History Windows and Resolution">
      * Explicit `start`/`end` ranges span at most 15 days. `start` is inclusive and `end` exclusive.
      * `max` returns full history at 12-hour buckets by default. Explicit `bucket_seconds` values of 10800 or 43200 also cover full history. Finer widths return only the last 30 days.
      * `bucket_seconds` accepts 60 to 86400 seconds, with a floor of 600 for `max`/`1m` and 300 for `1w`. Omit it to let the server choose a width for the span and available history.
      * One-minute data lasts at least 7 days, five-minute at least 60 days, and thirty-minute at least 90 days (floors, not exact horizons). Three-hour and twelve-hour data is permanent. Explicitly requesting a resolution the store cannot fill returns an empty or sparse page with `resolution_seconds` echoing the requested grid; omit `bucket_seconds` to always get the densest series that exists.
    </Accordion>
  </Tab>
</Tabs>
