> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market Data

> Discover Perps markets and monitor public market activity

Use market data to understand what can be traded, where the market is trading
now, and how activity has changed over time.

<Tabs>
  <Tab title="TypeScript">
    The TypeScript examples on this page use a `PublicClient`. The same market-data
    methods are also available on `SecureClient` instances.

    ```ts theme={null}
    import { createPublicClient } from "@polymarket/client";

    const client = createPublicClient();
    ```
  </Tab>

  <Tab title="Python">
    The Python examples on this page use an `AsyncPublicClient`. The same market-data
    methods are also available on `AsyncSecureClient` instances.

    ```python theme={null}
    from polymarket import AsyncPublicClient

    client = AsyncPublicClient()
    ```
  </Tab>

  <Tab title="API">
    Use the Perps REST API production URL.

    ```text theme={null}
    https://api.perpetuals.polymarket.com
    ```
  </Tab>
</Tabs>

## Fetch Instruments

Fetch instruments before your integration lets users choose or submit orders for
a Perps market. Instrument data gives you the constraints needed to validate that
workflow.

<Tabs>
  <Tab title="TypeScript">
    Fetch the available instruments.

    ```ts theme={null}
    const instruments = await client.fetchPerpsInstruments();
    // instruments: PerpsInstrument[]
    ```

    where `PerpsInstrument` is:

    <CodeGroup>
      ```ts Type theme={null}
      type PerpsInstrument = {
        id: PerpsInstrumentId;
        category: PerpsInstrumentCategory;
        symbol: string;
        baseAsset: string;
        quoteAsset: string;
        fundingInterval: PerpsFundingInterval;
        quantityDecimals: number;
        priceDecimals: number;
        priceBounds: DecimalString;
        liquidationFee: DecimalString;
        maxOrderCount: number;
        minNotional: DecimalString;
        maxMarketNotional: DecimalString;
        maxLimitNotional: DecimalString;
        maxLeverage: number;
        riskTiers: PerpsRiskTier[];
      };

      type PerpsRiskTier = {
        lowerBound: DecimalString;
        maxLeverage: number;
      };
      ```

      ```json Example theme={null}
      {
        "id": 1,
        "category": "crypto",
        "symbol": "BTC-PERP",
        "baseAsset": "BTC",
        "quoteAsset": "USD",
        "fundingInterval": "1h",
        "quantityDecimals": 4,
        "priceDecimals": 2,
        "priceBounds": "0.1",
        "liquidationFee": "0.01",
        "maxOrderCount": 200,
        "minNotional": "1",
        "maxMarketNotional": "100000",
        "maxLimitNotional": "1000000",
        "maxLeverage": 10,
        "riskTiers": [{ "lowerBound": "0", "maxLeverage": 10 }]
      }
      ```
    </CodeGroup>

    `PerpsInstrument` includes the market metadata and trading constraints your app
    needs before submitting orders.

    | Field               | Description                                                   |
    | ------------------- | ------------------------------------------------------------- |
    | `id`                | Instrument identifier.                                        |
    | `category`          | Market category, such as crypto, index, equity, or commodity. |
    | `symbol`            | Human-readable market symbol.                                 |
    | `baseAsset`         | Base asset for the instrument.                                |
    | `quoteAsset`        | Quote asset used for prices.                                  |
    | `fundingInterval`   | Funding interval for the instrument, such as `1h`.            |
    | `quantityDecimals`  | Decimal precision for quantities.                             |
    | `priceDecimals`     | Decimal precision for prices.                                 |
    | `priceBounds`       | Price-bound value for the instrument.                         |
    | `liquidationFee`    | Liquidation fee value for the instrument.                     |
    | `maxOrderCount`     | Maximum order count for the instrument.                       |
    | `minNotional`       | Minimum notional value for orders.                            |
    | `maxMarketNotional` | Maximum notional value for market orders.                     |
    | `maxLimitNotional`  | Maximum notional value for limit orders.                      |
    | `maxLeverage`       | Maximum leverage allowed for the instrument.                  |
    | `riskTiers`         | Risk tiers for larger position sizes.                         |
  </Tab>

  <Tab title="Python">
    Fetch the available instruments.

    ```python theme={null}
    instruments = await client.fetch_perps_instruments()
    # instruments: tuple[PerpsInstrument, ...]
    ```

    Filter by instrument ID when you already know the market you need.

    ```python theme={null}
    instruments = await client.fetch_perps_instruments(instrument_id=1)
    ```

    `PerpsInstrument` includes the market metadata and trading constraints your app
    needs before submitting orders.

    ```json Example theme={null}
    {
      "id": 1,
      "category": "crypto",
      "symbol": "BTC-PERP",
      "base_asset": "BTC",
      "quote_asset": "USD",
      "funding_interval": "1h",
      "quantity_decimals": 4,
      "price_decimals": 2,
      "price_bounds": "0.1",
      "liquidation_fee": "0.01",
      "max_order_count": 200,
      "min_notional": "1",
      "max_market_notional": "100000",
      "max_limit_notional": "1000000",
      "max_leverage": 10,
      "risk_tiers": [{ "lower_bound": "0", "max_leverage": 10 }]
    }
    ```

    `PerpsInstrument` exposes these attributes:

    | Attribute                   | Description                                                   |
    | --------------------------- | ------------------------------------------------------------- |
    | `id`                        | Instrument identifier.                                        |
    | `category`                  | Market category, such as crypto, index, equity, or commodity. |
    | `symbol`                    | Human-readable market symbol.                                 |
    | `base_asset`                | Base asset for the instrument.                                |
    | `quote_asset`               | Quote asset used for prices.                                  |
    | `funding_interval`          | Funding interval for the instrument, such as `1h`.            |
    | `quantity_decimals`         | Decimal precision for quantities.                             |
    | `price_decimals`            | Decimal precision for prices.                                 |
    | `price_bounds`              | Price-bound value for the instrument.                         |
    | `liquidation_fee`           | Liquidation fee value for the instrument.                     |
    | `max_order_count`           | Maximum order count for the instrument.                       |
    | `min_notional`              | Minimum notional value for orders.                            |
    | `max_market_notional`       | Maximum notional value for market orders.                     |
    | `max_limit_notional`        | Maximum notional value for limit orders.                      |
    | `max_leverage`              | Maximum leverage allowed for the instrument.                  |
    | `risk_tiers`                | Risk tiers for larger position sizes.                         |
    | `risk_tiers[].lower_bound`  | Lower notional bound for the risk tier.                       |
    | `risk_tiers[].max_leverage` | Maximum leverage allowed for the risk tier.                   |
  </Tab>

  <Tab title="API">
    Fetch the available instruments.

    ```bash theme={null}
    curl "https://api.perpetuals.polymarket.com/v1/info/instruments"
    ```

    Filter by instrument ID when you already know the market you need.

    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/info/instruments" \
      --data-urlencode "instrument_id=1"
    ```

    The response is an array of instruments.

    ```json theme={null}
    [
      {
        "instrument_id": 1,
        "instrument_type": "perpetual",
        "category": "crypto",
        "symbol": "BTC-PERP",
        "base_asset": "BTC",
        "quote_asset": "USD",
        "funding_interval": "1h",
        "quantity_decimals": 4,
        "price_decimals": 2,
        "price_bounds": "0.1",
        "liquidation_fee": "0.01",
        "max_order_count": 200,
        "min_notional": "1",
        "max_market_notional": "100000",
        "max_limit_notional": "1000000",
        "max_leverage": 10,
        "risk_tiers": [{ "lower_bound": "0", "max_leverage": 10 }]
      }
    ]
    ```

    Each instrument object includes the market metadata and trading constraints your
    app needs before submitting orders.

    | Field                       | Description                                                           |
    | --------------------------- | --------------------------------------------------------------------- |
    | `instrument_id`             | Instrument identifier.                                                |
    | `instrument_type`           | Instrument type. Perps instruments use `perpetual`.                   |
    | `category`                  | Market category, such as `crypto`, `index`, `equity`, or `commodity`. |
    | `symbol`                    | Human-readable market symbol.                                         |
    | `base_asset`                | Base asset for the instrument.                                        |
    | `quote_asset`               | Quote asset used for prices.                                          |
    | `funding_interval`          | Funding interval for the instrument, such as `1h`.                    |
    | `quantity_decimals`         | Decimal precision for quantities.                                     |
    | `price_decimals`            | Decimal precision for prices.                                         |
    | `price_bounds`              | Price-bound value for the instrument.                                 |
    | `liquidation_fee`           | Liquidation fee value for the instrument.                             |
    | `max_order_count`           | Maximum order count for the instrument.                               |
    | `min_notional`              | Minimum notional value for orders.                                    |
    | `max_market_notional`       | Maximum notional value for market orders.                             |
    | `max_limit_notional`        | Maximum notional value for limit orders.                              |
    | `max_leverage`              | Maximum leverage allowed for the instrument.                          |
    | `risk_tiers`                | Risk tiers for larger position sizes.                                 |
    | `risk_tiers[].lower_bound`  | Lower notional bound for the risk tier.                               |
    | `risk_tiers[].max_leverage` | Maximum leverage allowed for the risk tier.                           |
  </Tab>
</Tabs>

## Fetch Tickers

Use tickers when you need a lightweight view of where one or more markets are
trading now.

<Tabs>
  <Tab title="TypeScript">
    Fetch one ticker when you already know which instrument your integration is
    tracking.

    ```ts theme={null}
    const ticker = await client.fetchPerpsTicker({
      instrumentId: instrument.id,
    });
    // ticker: PerpsTicker
    ```

    Fetch all tickers to build a market list or refresh a dashboard.

    ```ts theme={null}
    const tickers = await client.fetchPerpsTickers();
    // tickers: PerpsTicker[]
    ```

    where `PerpsTicker` is:

    <CodeGroup>
      ```ts Type theme={null}
      type PerpsTicker = {
        instrumentId: PerpsInstrumentId;
        symbol: string;
        indexPrice: DecimalString;
        markPrice: DecimalString;
        lastPrice: DecimalString;
        midPrice: DecimalString;
        openInterest: DecimalString;
        fundingRate: DecimalString;
        nextFunding: EpochMilliseconds;
        volume24h?: DecimalString;
        openPrice?: DecimalString;
        timestamp?: EpochMilliseconds;
      };
      ```

      ```json Example theme={null}
      {
        "instrumentId": 1,
        "symbol": "BTC-PERP",
        "indexPrice": "65000.00",
        "markPrice": "65012.50",
        "lastPrice": "65010.00",
        "midPrice": "65011.25",
        "openInterest": "125.4",
        "fundingRate": "0.0001",
        "nextFunding": 1766124000000,
        "volume24h": "2450000",
        "openPrice": "64250.00",
        "timestamp": 1766120400000
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Fetch one ticker when you already know which instrument your integration is
    tracking.

    ```python theme={null}
    ticker = await client.fetch_perps_ticker(instrument_id=instrument.id)
    # ticker: PerpsTicker
    ```

    Fetch all tickers to build a market list or refresh a dashboard.

    ```python theme={null}
    tickers = await client.fetch_perps_tickers()
    # tickers: tuple[PerpsTicker, ...]
    ```

    Use the returned ticker for current price, open interest, and funding state.

    ```json Example theme={null}
    {
      "instrument_id": 1,
      "symbol": "BTC-PERP",
      "index_price": "65000.00",
      "mark_price": "65012.50",
      "last_price": "65010.00",
      "mid_price": "65011.25",
      "open_interest": "125.4",
      "funding_rate": "0.0001",
      "next_funding": 1766124000000,
      "volume_24h": "2450000",
      "open_price": "64250.00",
      "timestamp": 1766120400000
    }
    ```
  </Tab>

  <Tab title="API">
    Fetch all tickers to build a market list or refresh a dashboard.

    ```bash theme={null}
    curl "https://api.perpetuals.polymarket.com/v1/info/tickers"
    ```

    Filter by instrument ID when you only need one ticker.

    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/info/tickers" \
      --data-urlencode "instrument_id=1"
    ```

    The response is an array of ticker snapshots.

    ```json theme={null}
    [
      {
        "instrument_id": 1,
        "symbol": "BTC-PERP",
        "index_price": "65000.00",
        "mark_price": "65012.50",
        "last_price": "65010.00",
        "mid_price": "65011.25",
        "open_interest": "125.4",
        "funding_rate": "0.0001",
        "next_funding": 1766124000000,
        "timestamp": 1766120400000
      }
    ]
    ```
  </Tab>
</Tabs>

## Fetch the Order Book

Use the order book before choosing an order price or size. It shows available
liquidity at the requested depth.

<Tabs>
  <Tab title="TypeScript">
    Choose how many price levels to request. Supported depths are `10`, `100`,
    `500`, and `1000`. When omitted, the SDK requests `100` levels.

    ```ts theme={null}
    // depth: PerpsBookDepth
    const depth = 100;
    ```

    Fetch the book for the selected instrument. Bids and asks are returned as price
    levels with decimal string prices and quantities.

    ```ts theme={null}
    const book = await client.fetchPerpsBook({
      instrumentId: instrument.id,
      depth,
    });

    const bestBid = book.bids[0];
    const bestAsk = book.asks[0];

    // book: PerpsBook
    // bestBid: PerpsBookLevel | undefined
    // bestAsk: PerpsBookLevel | undefined
    ```

    where `PerpsBook` and `PerpsBookLevel` are:

    <CodeGroup>
      ```ts Type theme={null}
      type PerpsBook = {
        instrumentId: PerpsInstrumentId;
        bids: PerpsBookLevel[];
        asks: PerpsBookLevel[];
        timestamp: EpochMilliseconds;
        sequence: number;
      };

      type PerpsBookLevel = {
        price: DecimalString;
        quantity: DecimalString;
      };
      ```

      ```json Example theme={null}
      {
        "instrumentId": 1,
        "bids": [
          { "price": "65010.00", "quantity": "0.75" },
          { "price": "65009.50", "quantity": "1.2" }
        ],
        "asks": [
          { "price": "65012.50", "quantity": "0.6" },
          { "price": "65013.00", "quantity": "1.1" }
        ],
        "timestamp": 1766120400000,
        "sequence": 123456
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    Choose how many price levels to request. Supported depths are `10`, `100`,
    `500`, and `1000`. When omitted, the SDK requests `100` levels.

    ```python theme={null}
    depth = 100
    ```

    Fetch the book for the selected instrument. Bids and asks are returned as price
    levels with decimal string prices and quantities.

    ```python theme={null}
    book = await client.fetch_perps_book(
        instrument_id=instrument.id,
        depth=depth,
    )

    best_bid = book.bids[0] if book.bids else None
    best_ask = book.asks[0] if book.asks else None

    # book: PerpsBook
    # best_bid: PerpsBookLevel | None
    # best_ask: PerpsBookLevel | None
    ```

    Use `book.bids` and `book.asks` for bid and ask price levels.

    ```json Example theme={null}
    {
      "instrument_id": 1,
      "bids": [
        { "price": "65010.00", "quantity": "0.75" },
        { "price": "65009.50", "quantity": "1.2" }
      ],
      "asks": [
        { "price": "65012.50", "quantity": "0.6" },
        { "price": "65013.00", "quantity": "1.1" }
      ],
      "timestamp": 1766120400000,
      "sequence": 123456
    }
    ```
  </Tab>

  <Tab title="API">
    Fetch the order book for an instrument. Supported depths are `10`, `100`, `500`,
    and `1000`; when omitted, the API uses `100`.

    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/info/book" \
      --data-urlencode "instrument_id=1" \
      --data-urlencode "depth=100"
    ```

    The response returns bids and asks as `[price, quantity]` levels.

    ```json theme={null}
    {
      "instrument_id": 1,
      "bids": [
        ["65010.00", "0.75"],
        ["65009.50", "1.2"]
      ],
      "asks": [
        ["65012.50", "0.6"],
        ["65013.00", "1.1"]
      ],
      "timestamp": 1766120400000,
      "sequence": 123456
    }
    ```

    Each `bids` and `asks` level is `[price, quantity]`.
  </Tab>
</Tabs>

## List Candles

Use candles when your workflow needs time-bucketed price history for charts,
backtests, or trading signals.

<Tabs>
  <Tab title="TypeScript">
    The SDK paginates candle history. When `start` is omitted, it starts from the
    past 24 hours.

    ```ts theme={null}
    import { PerpsKlineInterval } from "@polymarket/client";

    const pages = client.listPerpsCandles({
      instrumentId: instrument.id,
      interval: PerpsKlineInterval.OneMinute,
    });

    for await (const page of pages) {
      for (const candle of page.items) {
        // candle: PerpsCandle
      }
    }
    ```

    where `PerpsCandle` is:

    <CodeGroup>
      ```ts Type theme={null}
      type PerpsCandle = {
        timestamp: EpochMilliseconds;
        open: DecimalString;
        high: DecimalString;
        low: DecimalString;
        close: DecimalString;
        volume: DecimalString;
        trades: number;
      };
      ```

      ```json Example theme={null}
      {
        "timestamp": 1766120400000,
        "open": "65000.00",
        "high": "65025.00",
        "low": "64980.00",
        "close": "65010.00",
        "volume": "42.5",
        "trades": 18
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    The SDK paginates candle history. When `start` is omitted, it starts from the
    past 24 hours.

    ```python theme={null}
    pages = client.list_perps_candles(
        instrument_id=instrument.id,
        interval="1m",
    )

    async for page in pages:
        for candle in page.items:
            # candle: PerpsCandle
            pass
    ```

    Each candle contains one OHLCV bucket.

    ```json Example theme={null}
    {
      "timestamp": 1766120400000,
      "open": "65000.00",
      "high": "65025.00",
      "low": "64980.00",
      "close": "65010.00",
      "volume": "42.5",
      "trades": 18
    }
    ```
  </Tab>

  <Tab title="API">
    Fetch candles for an instrument and interval. `start_timestamp` is required;
    `end_timestamp` is optional. The API returns at most 1000 candles per request.

    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/info/klines" \
      --data-urlencode "instrument_id=1" \
      --data-urlencode "interval=1m" \
      --data-urlencode "start_timestamp=1766120400000"
    ```

    The response returns candles in `data` and a `more` flag for continuation.

    ```json theme={null}
    {
      "data": [
        [1766120400000, "65000.00", "65025.00", "64980.00", "65010.00", "42.5", 18]
      ],
      "more": false
    }
    ```

    Each candle is `[timestamp, open, high, low, close, volume, trades]`.
  </Tab>
</Tabs>

## List Trades

Use public trades when recent executions matter more than aggregated candles.
This is useful for trade tape views and execution analysis.

<Tabs>
  <Tab title="TypeScript">
    The SDK paginates trade history, including cursor handling and boundary
    deduplication.

    ```ts theme={null}
    const pages = client.listPerpsTrades({
      instrumentId: instrument.id,
    });

    for await (const page of pages) {
      for (const trade of page.items) {
        // trade: PerpsPublicTrade
      }
    }
    ```

    where `PerpsPublicTrade` is:

    <CodeGroup>
      ```ts Type theme={null}
      type PerpsPublicTrade = {
        tradeId: PerpsTradeId;
        instrumentId: PerpsInstrumentId;
        side: PerpsSide;
        price: DecimalString;
        quantity: DecimalString;
        timestamp: EpochMilliseconds;
        hash?: TxHash;
      };
      ```

      ```json Example theme={null}
      {
        "tradeId": 987654,
        "instrumentId": 1,
        "side": "long",
        "price": "65010.00",
        "quantity": "0.25",
        "timestamp": 1766120400000,
        "hash": "0x1111111111111111111111111111111111111111111111111111111111111111"
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    The SDK paginates trade history, including cursor handling and boundary
    deduplication.

    ```python theme={null}
    pages = client.list_perps_trades(instrument_id=instrument.id)

    async for page in pages:
        for trade in page.items:
            # trade: PerpsTrade
            pass
    ```

    Each trade contains one public execution.

    ```json Example theme={null}
    {
      "trade_id": 987654,
      "instrument_id": 1,
      "side": "long",
      "price": "65010.00",
      "quantity": "0.25",
      "timestamp": 1766120400000,
      "hash": "0x1111111111111111111111111111111111111111111111111111111111111111"
    }
    ```
  </Tab>

  <Tab title="API">
    Fetch recent public trades for an instrument. `start_timestamp` and
    `end_timestamp` are optional. The API returns at most 100 trades per request.

    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/info/trades" \
      --data-urlencode "instrument_id=1"
    ```

    The response returns trades in `data` and a `more` flag for continuation.

    ```json theme={null}
    {
      "data": [
        {
          "trade_id": 987654,
          "instrument_id": 1,
          "side": "long",
          "price": "65010.00",
          "quantity": "0.25",
          "timestamp": 1766120400000,
          "hash": "0x1111111111111111111111111111111111111111111111111111111111111111"
        }
      ],
      "more": false
    }
    ```
  </Tab>
</Tabs>

## List Funding History

Use funding-rate history when estimating carry costs or explaining why Perps
prices differ from the index over time.

<Tabs>
  <Tab title="TypeScript">
    The SDK paginates funding-rate history.

    ```ts theme={null}
    const pages = client.listPerpsFundingHistory({
      instrumentId: instrument.id,
    });

    for await (const page of pages) {
      for (const fundingRate of page.items) {
        // fundingRate: PerpsFundingRate
      }
    }
    ```

    where `PerpsFundingRate` is:

    <CodeGroup>
      ```ts Type theme={null}
      type PerpsFundingRate = {
        fundingRate: DecimalString;
        timestamp: EpochMilliseconds;
      };
      ```

      ```json Example theme={null}
      {
        "fundingRate": "0.0001",
        "timestamp": 1766120400000
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    The SDK paginates funding-rate history.

    ```python theme={null}
    pages = client.list_perps_funding_history(instrument_id=instrument.id)

    async for page in pages:
        for funding_rate in page.items:
            # funding_rate: PerpsFundingRate
            pass
    ```

    Each funding-rate entry contains one historical observation.

    ```json Example theme={null}
    {
      "funding_rate": "0.0001",
      "timestamp": 1766120400000
    }
    ```
  </Tab>

  <Tab title="API">
    Fetch historical funding rates for an instrument. `start_timestamp` and
    `end_timestamp` are optional. The API returns at most 100 funding-rate entries
    per request.

    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/info/funding" \
      --data-urlencode "instrument_id=1"
    ```

    The response returns funding rates in `data` and a `more` flag for continuation.

    ```json theme={null}
    {
      "data": [
        {
          "funding_rate": "0.0001",
          "timestamp": 1766120400000
        }
      ],
      "more": false
    }
    ```
  </Tab>
</Tabs>
