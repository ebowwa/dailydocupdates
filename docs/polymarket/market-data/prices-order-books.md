<!--
Source: https://docs.polymarket.com/market-data/prices-order-books.md
Downloaded: 2026-07-24T21:04:03.609Z
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
    if market.outcomes.yes.token_id is None or market.outcomes.no.token_id is None:
        raise RuntimeError("Market token IDs not found")

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

The last trade price records the most recent matched trade for an outcome. It
includes the trade price and side.

### Fetch a Last Trade Price

<Tabs>
  <Tab title="TypeScript">
    Call `fetchLastTradePrice()` on a `PublicClient` or `SecureClient` to fetch the last
    trade.

    ```ts theme={null}
    const lastTrade = await client.fetchLastTradePrice({ tokenId: yesTokenId });

    // lastTrade: LastTradePrice
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
  </Tab>

  <Tab title="Python">
    Call `get_last_trade_price()` on an `AsyncPublicClient` or
    `AsyncSecureClient` to fetch the last trade. The synchronous `PublicClient`
    and `SecureClient` provide the same method.

    ```python theme={null}
    last_trade = await client.get_last_trade_price(token_id=yes_token_id)

    # last_trade: LastTradePrice
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

## Price History

Price history is a time series of observed prices for an outcome. Fetch either
a relative window or an absolute time range, but do not combine the two forms.
You can also control the interval between returned observations; longer time
ranges require a sampling interval.

| Range setting     | Behavior                                                                   |
| ----------------- | -------------------------------------------------------------------------- |
| Relative window   | Fetch the last `1h`, `6h`, `1d`, `1w`, or all available data with `max`.   |
| Absolute range    | Fetch observations between a start and end time expressed as Unix seconds. |
| Sampling interval | Set the interval between observations in minutes.                          |

<Tabs>
  <Tab title="TypeScript">
    Call `fetchPriceHistory()` on a `PublicClient` or `SecureClient` to fetch historical
    prices. Set `interval` for a relative window, or set `startTs` and `endTs`
    for an absolute range. Use `fidelity` to set the sampling interval in
    minutes.

    <CodeGroup>
      ```ts Relative Window theme={null}
      const history = await client.fetchPriceHistory({
        tokenId: yesTokenId,
        interval: "1d",
        fidelity: 60,
      });

      // history: PriceHistoryPoint[]
      ```

      ```ts Absolute Range theme={null}
      const history = await client.fetchPriceHistory({
        tokenId: yesTokenId,
        startTs: 1782666000,
        endTs: 1782676800,
        fidelity: 60,
      });

      // history: PriceHistoryPoint[]
      ```
    </CodeGroup>

    Each `PriceHistoryPoint` contains a timestamp and its observed price:

    <CodeGroup>
      ```ts PriceHistoryPoint Type theme={null}
      type PriceHistoryPoint = {
        t: number;
        p: number;
      };
      ```

      ```json PriceHistoryPoint Example theme={null}
      [
        { "t": 1782666007, "p": 0.085 },
        { "t": 1782669606, "p": 0.085 },
        { "t": 1782673206, "p": 0.085 },
        "..."
      ]
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Call `get_price_history()` on an `AsyncPublicClient` or `AsyncSecureClient`
    to fetch historical prices. Set `interval` for a relative window, or set
    `start_ts` and `end_ts` for an absolute range. Use `fidelity` to set the
    sampling interval in minutes. The synchronous `PublicClient` and
    `SecureClient` provide the same method.

    <CodeGroup>
      ```python Relative Window theme={null}
      history = await client.get_price_history(
          token_id=yes_token_id,
          interval="1d",
          fidelity=60,
      )

      # history: tuple[PriceHistoryPoint, ...]
      ```

      ```python Absolute Range theme={null}
      history = await client.get_price_history(
          token_id=yes_token_id,
          start_ts=1782666000,
          end_ts=1782676800,
          fidelity=60,
      )

      # history: tuple[PriceHistoryPoint, ...]
      ```
    </CodeGroup>

    Each `PriceHistoryPoint` contains a timestamp and its observed price:

    <CodeGroup>
      ```python PriceHistoryPoint Type theme={null}
      class PriceHistoryPoint:
          t: int
          p: float
      ```

      ```json PriceHistoryPoint Example theme={null}
      [
        { "t": 1782666007, "p": 0.085 },
        { "t": 1782669606, "p": 0.085 },
        { "t": 1782673206, "p": 0.085 },
        "..."
      ]
      ```
    </CodeGroup>
  </Tab>

  <Tab title="API">
    Set `interval` for a relative window, or set `startTs` and `endTs` for an
    absolute range. Use `fidelity` to set the sampling interval in minutes.

    <CodeGroup>
      ```bash Relative Window theme={null}
      curl "https://clob.polymarket.com/prices-history?market=$TOKEN_ID&interval=1d&fidelity=60"
      ```

      ```bash Absolute Range theme={null}
      curl "https://clob.polymarket.com/prices-history?market=$TOKEN_ID&startTs=1782666000&endTs=1782676800&fidelity=60"
      ```
    </CodeGroup>

    The response contains the price points under `history`:

    ```json theme={null}
    {
      "history": [
        { "t": 1782666007, "p": 0.085 },
        { "t": 1782669606, "p": 0.085 },
        { "t": 1782673206, "p": 0.085 },
        "..."
      ]
    }
    ```
  </Tab>
</Tabs>
