<!--
Source: https://docs.polymarket.com/market-data/realtime-data.md
Downloaded: 2026-07-24T21:04:03.610Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Real-Time Data

> Keep market data current with Polymarket's real-time feeds.

Use Polymarket's real-time feeds to react as market conditions and related data
change. They keep the public market data your application depends on current
without repeated polling. For authenticated order and trade updates, see
[Real-Time Order Updates](/trading/realtime-order-updates).

## Market Stream

Use the market stream to keep your application in sync with changes to a
market's order book and trading state.

<Tabs>
  <Tab title="TypeScript">
    Given a `PublicClient` or `SecureClient`, subscribe to the `market` topic with one or
    more token IDs:

    ```ts theme={null}
    const tokenId = "<token_id>";

    const stream = await client.subscribe([
      {
        topic: "market",
        tokenIds: [tokenId],
      },
    ]);

    for await (const event of stream) {
      switch (event.type) {
        case "book":
          // event: MarketBookEvent
          break;
        case "price_change":
          // event: MarketPriceChangeEvent
          break;
        case "last_trade_price":
          // event: MarketLastTradePriceEvent
          break;
        case "tick_size_change":
          // event: MarketTickSizeChangeEvent
          break;
      }
    }
    ```

    <Accordion title="Standard Market Events">
      #### Order Book

      <CodeGroup>
        ```ts MarketBookEvent Type theme={null}
        type OrderBookLevel = {
          price: DecimalString;
          size: DecimalString;
        };

        type MarketBookEvent = {
          topic: "market";
          type: "book";
          payload: {
            market: string;
            tokenId: TokenId;
            bids: OrderBookLevel[];
            asks: OrderBookLevel[];
            hash?: string | null;
            timestamp?: string | null;
            minOrderSize?: DecimalString | null;
            tickSize?: DecimalString | null;
            negRisk?: boolean | null;
            lastTradePrice?: DecimalString | null;
          };
        };
        ```

        ```json MarketBookEvent Example theme={null}
        {
          "topic": "market",
          "type": "book",
          "payload": {
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "bids": [{ "price": "0.08", "size": "33343.4" }],
            "asks": [{ "price": "0.09", "size": "163939.58" }],
            "hash": "0xabc123…",
            "timestamp": "1782753357257"
          }
        }
        ```
      </CodeGroup>

      #### Price Change

      <CodeGroup>
        ```ts MarketPriceChangeEvent Type theme={null}
        type PriceChange = {
          tokenId: TokenId;
          price: DecimalString;
          size: DecimalString;
          side: OrderSide;
          hash?: string | null;
          bestBid?: DecimalString | null;
          bestAsk?: DecimalString | null;
        };

        type MarketPriceChangeEvent = {
          topic: "market";
          type: "price_change";
          payload: {
            market: string;
            priceChanges: PriceChange[];
            timestamp?: string | null;
          };
        };
        ```

        ```json MarketPriceChangeEvent Example theme={null}
        {
          "topic": "market",
          "type": "price_change",
          "payload": {
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "priceChanges": [
              {
                "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
                "price": "0.08",
                "size": "33343.4",
                "side": "BUY",
                "hash": "56621a121a47ed9333273e21c83b660cff37ae50",
                "bestBid": "0.08",
                "bestAsk": "0.09"
              }
            ],
            "timestamp": "1782753357257"
          }
        }
        ```
      </CodeGroup>

      #### Last Trade Price

      <CodeGroup>
        ```ts MarketLastTradePriceEvent Type theme={null}
        type MarketLastTradePriceEvent = {
          topic: "market";
          type: "last_trade_price";
          payload: {
            market: string;
            tokenId: TokenId;
            price: DecimalString;
            size?: DecimalString | null;
            feeRateBps?: DecimalString | null;
            side: OrderSide;
            timestamp?: string | null;
            transactionHash?: string | null;
          };
        };
        ```

        ```json MarketLastTradePriceEvent Example theme={null}
        {
          "topic": "market",
          "type": "last_trade_price",
          "payload": {
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "price": "0.08",
            "size": "219.217767",
            "feeRateBps": "0",
            "side": "SELL",
            "timestamp": "1782753357257",
            "transactionHash": "0xeeefff…"
          }
        }
        ```
      </CodeGroup>

      #### Tick Size Change

      <CodeGroup>
        ```ts MarketTickSizeChangeEvent Type theme={null}
        type MarketTickSizeChangeEvent = {
          topic: "market";
          type: "tick_size_change";
          payload: {
            market: string;
            tokenId: TokenId;
            oldTickSize?: DecimalString | null;
            newTickSize: DecimalString;
            timestamp?: string | null;
          };
        };
        ```

        ```json MarketTickSizeChangeEvent Example theme={null}
        {
          "topic": "market",
          "type": "tick_size_change",
          "payload": {
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "oldTickSize": "0.01",
            "newTickSize": "0.001",
            "timestamp": "1782753357257"
          }
        }
        ```
      </CodeGroup>
    </Accordion>

    Enable `customFeatureEnabled` to include top-of-book and market lifecycle
    updates:

    ```ts theme={null}
    const stream = await client.subscribe([
      {
        topic: "market",
        tokenIds: [tokenId],
        customFeatureEnabled: true,
      },
    ]);

    for await (const event of stream) {
      switch (event.type) {
        case "book":
          // event: MarketBookEvent
          break;
        case "price_change":
          // event: MarketPriceChangeEvent
          break;
        case "last_trade_price":
          // event: MarketLastTradePriceEvent
          break;
        case "tick_size_change":
          // event: MarketTickSizeChangeEvent
          break;
        case "best_bid_ask":
          // event: MarketBestBidAskEvent
          break;
        case "new_market":
          // event: NewMarketEvent
          break;
        case "market_resolved":
          // event: MarketResolvedEvent
          break;
      }
    }
    ```

    <Accordion title="Additional Market Events">
      #### Best Bid and Ask

      <CodeGroup>
        ```ts MarketBestBidAskEvent Type theme={null}
        type MarketBestBidAskEvent = {
          topic: "market";
          type: "best_bid_ask";
          payload: {
            market: string;
            tokenId: TokenId;
            bestBid?: DecimalString | null;
            bestAsk?: DecimalString | null;
            spread?: DecimalString | null;
            timestamp?: string | null;
          };
        };
        ```

        ```json MarketBestBidAskEvent Example theme={null}
        {
          "topic": "market",
          "type": "best_bid_ask",
          "payload": {
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "bestBid": "0.08",
            "bestAsk": "0.09",
            "spread": "0.01",
            "timestamp": "1782753357257"
          }
        }
        ```
      </CodeGroup>

      #### New Market

      <CodeGroup>
        ```ts NewMarketEvent Type theme={null}
        type NewMarketEvent = {
          topic: "market";
          type: "new_market";
          payload: {
            id: string;
            question?: string | null;
            market: string;
            slug?: string | null;
            description?: string | null;
            tokenIds?: TokenId[] | null;
            outcomes?: string[] | null;
            eventMessage?: {
              id: string;
              ticker?: string | null;
              slug?: string | null;
              title?: string | null;
              description?: string | null;
            } | null;
            timestamp?: string | null;
            tags?: string[] | null;
            conditionId?: CtfConditionId | null;
            active?: boolean | null;
            clobTokenIds?: string[] | null;
            sportsMarketType?: string | null;
            line?: DecimalString | null;
            gameStartTime?: IsoDateTimeString | null;
            orderPriceMinTickSize?: DecimalString | null;
            groupItemTitle?: string | null;
            takerBaseFee?: DecimalString | null;
            feesEnabled?: boolean | null;
            feeSchedule?: unknown;
          };
        };
        ```

        ```json NewMarketEvent Example theme={null}
        {
          "topic": "market",
          "type": "new_market",
          "payload": {
            "id": "123456",
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "question": "Will the US confirm that aliens exist before 2027?",
            "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "tokenIds": [
              "107505882767731489358349912513945399560393482969656700824895970500493757150417",
              "7305630249804085635496399869905769372294302716159034447326228509068694952392"
            ],
            "outcomes": ["Yes", "No"],
            "active": true,
            "timestamp": "1782753357257"
          }
        }
        ```
      </CodeGroup>

      #### Market Resolved

      <CodeGroup>
        ```ts MarketResolvedEvent Type theme={null}
        type MarketResolvedEvent = {
          topic: "market";
          type: "market_resolved";
          payload: {
            id: string;
            market: string;
            tokenIds?: TokenId[] | null;
            winningTokenId?: TokenId | null;
            winningOutcome?: string | null;
            eventMessage?: {
              id: string;
              ticker?: string | null;
              slug?: string | null;
              title?: string | null;
              description?: string | null;
            } | null;
            timestamp?: string | null;
            tags?: string[] | null;
          };
        };
        ```

        ```json MarketResolvedEvent Example theme={null}
        {
          "topic": "market",
          "type": "market_resolved",
          "payload": {
            "id": "123456",
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "tokenIds": [
              "107505882767731489358349912513945399560393482969656700824895970500493757150417",
              "7305630249804085635496399869905769372294302716159034447326228509068694952392"
            ],
            "winningTokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "winningOutcome": "Yes",
            "timestamp": "1782753357257"
          }
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Given an `AsyncPublicClient` or `AsyncSecureClient`, subscribe to the market
    stream with a `MarketSpec` containing one or more token IDs:

    ```python theme={null}
    from polymarket.streams import MarketSpec

    token_id = "<token_id>"

    async with await client.subscribe(
        MarketSpec(token_ids=[token_id]),
    ) as stream:
        async for event in stream:
            if event.type == "book":
                ...  # event: MarketBookEvent
            elif event.type == "price_change":
                ...  # event: MarketPriceChangeEvent
            elif event.type == "last_trade_price":
                ...  # event: MarketLastTradePriceEvent
            elif event.type == "tick_size_change":
                ...  # event: MarketTickSizeChangeEvent
    ```

    <Accordion title="Standard Market Events">
      #### Order Book

      <CodeGroup>
        ```python MarketBookEvent Type theme={null}
        class OrderBookLevel:
            price: Decimal
            size: Decimal

        class MarketBookPayload:
            market: str
            token_id: TokenId
            bids: tuple[OrderBookLevel, ...]
            asks: tuple[OrderBookLevel, ...]
            hash: str | None
            timestamp: datetime | None
            min_order_size: Decimal | None
            tick_size: Decimal | None
            neg_risk: bool | None
            last_trade_price: Decimal | None

        class MarketBookEvent:
            topic: Literal["market"]
            type: Literal["book"]
            payload: MarketBookPayload
        ```

        ```json MarketBookEvent Example theme={null}
        {
          "topic": "market",
          "type": "book",
          "payload": {
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "bids": [{ "price": "0.08", "size": "33343.4" }],
            "asks": [{ "price": "0.09", "size": "163939.58" }],
            "hash": "0xabc123…",
            "timestamp": "2026-06-29T17:15:57.257000Z"
          }
        }
        ```
      </CodeGroup>

      #### Price Change

      <CodeGroup>
        ```python MarketPriceChangeEvent Type theme={null}
        class PriceChange:
            token_id: TokenId
            price: Decimal
            size: Decimal
            side: Literal["BUY", "SELL"]
            hash: str | None
            best_bid: Decimal | None
            best_ask: Decimal | None

        class MarketPriceChangePayload:
            market: str
            price_changes: tuple[PriceChange, ...]
            timestamp: datetime | None

        class MarketPriceChangeEvent:
            topic: Literal["market"]
            type: Literal["price_change"]
            payload: MarketPriceChangePayload
        ```

        ```json MarketPriceChangeEvent Example theme={null}
        {
          "topic": "market",
          "type": "price_change",
          "payload": {
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "price_changes": [
              {
                "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
                "price": "0.08",
                "size": "33343.4",
                "side": "BUY",
                "hash": "56621a121a47ed9333273e21c83b660cff37ae50",
                "best_bid": "0.08",
                "best_ask": "0.09"
              }
            ],
            "timestamp": "2026-06-29T17:15:57.257000Z"
          }
        }
        ```
      </CodeGroup>

      #### Last Trade Price

      <CodeGroup>
        ```python MarketLastTradePriceEvent Type theme={null}
        class MarketLastTradePricePayload:
            market: str
            token_id: TokenId
            price: Decimal
            size: Decimal | None
            side: Literal["BUY", "SELL"]
            fee_rate_bps: Decimal | None
            transaction_hash: str | None
            timestamp: datetime | None

        class MarketLastTradePriceEvent:
            topic: Literal["market"]
            type: Literal["last_trade_price"]
            payload: MarketLastTradePricePayload
        ```

        ```json MarketLastTradePriceEvent Example theme={null}
        {
          "topic": "market",
          "type": "last_trade_price",
          "payload": {
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "price": "0.08",
            "size": "219.217767",
            "side": "SELL",
            "fee_rate_bps": "0",
            "transaction_hash": "0xeeefff…",
            "timestamp": "2026-06-29T17:15:57.257000Z"
          }
        }
        ```
      </CodeGroup>

      #### Tick Size Change

      <CodeGroup>
        ```python MarketTickSizeChangeEvent Type theme={null}
        class MarketTickSizeChangePayload:
            market: str
            token_id: TokenId
            old_tick_size: Decimal | None
            new_tick_size: Decimal
            timestamp: datetime | None

        class MarketTickSizeChangeEvent:
            topic: Literal["market"]
            type: Literal["tick_size_change"]
            payload: MarketTickSizeChangePayload
        ```

        ```json MarketTickSizeChangeEvent Example theme={null}
        {
          "topic": "market",
          "type": "tick_size_change",
          "payload": {
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "old_tick_size": "0.01",
            "new_tick_size": "0.001",
            "timestamp": "2026-06-29T17:15:57.257000Z"
          }
        }
        ```
      </CodeGroup>
    </Accordion>

    Enable `custom_feature_enabled` to include top-of-book and market lifecycle
    updates:

    ```python theme={null}
    async with await client.subscribe(
        MarketSpec(token_ids=[token_id], custom_feature_enabled=True),
    ) as stream:
        async for event in stream:
            if event.type == "book":
                ...  # event: MarketBookEvent
            elif event.type == "price_change":
                ...  # event: MarketPriceChangeEvent
            elif event.type == "last_trade_price":
                ...  # event: MarketLastTradePriceEvent
            elif event.type == "tick_size_change":
                ...  # event: MarketTickSizeChangeEvent
            elif event.type == "best_bid_ask":
                ...  # event: MarketBestBidAskEvent
            elif event.type == "new_market":
                ...  # event: NewMarketEvent
            elif event.type == "market_resolved":
                ...  # event: MarketResolvedEvent
    ```

    <Accordion title="Additional Market Events">
      #### Best Bid and Ask

      <CodeGroup>
        ```python MarketBestBidAskEvent Type theme={null}
        class MarketBestBidAskPayload:
            market: str
            token_id: TokenId
            best_bid: Decimal | None
            best_ask: Decimal | None
            spread: Decimal | None
            timestamp: datetime | None

        class MarketBestBidAskEvent:
            topic: Literal["market"]
            type: Literal["best_bid_ask"]
            payload: MarketBestBidAskPayload
        ```

        ```json MarketBestBidAskEvent Example theme={null}
        {
          "topic": "market",
          "type": "best_bid_ask",
          "payload": {
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "best_bid": "0.08",
            "best_ask": "0.09",
            "spread": "0.01",
            "timestamp": "2026-06-29T17:15:57.257000Z"
          }
        }
        ```
      </CodeGroup>

      #### New Market

      <CodeGroup>
        ```python NewMarketEvent Type theme={null}
        class MarketEventMessage:
            id: str
            ticker: str | None
            slug: str | None
            title: str | None
            description: str | None

        class NewMarketPayload:
            id: str
            market: str
            question: str | None
            slug: str | None
            description: str | None
            token_ids: tuple[TokenId, ...] | None
            outcomes: tuple[str, ...] | None
            event_message: MarketEventMessage | None
            timestamp: datetime | None
            tags: tuple[str, ...] | None
            condition_id: CtfConditionId | None
            active: bool | None
            clob_token_ids: tuple[str, ...] | None
            sports_market_type: str | None
            line: Decimal | None
            game_start_time: datetime | None
            order_price_min_tick_size: Decimal | None
            group_item_title: str | None
            taker_base_fee: Decimal | None
            fees_enabled: bool | None
            fee_schedule: object | None

        class NewMarketEvent:
            topic: Literal["market"]
            type: Literal["new_market"]
            payload: NewMarketPayload
        ```

        ```json NewMarketEvent Example theme={null}
        {
          "topic": "market",
          "type": "new_market",
          "payload": {
            "id": "123456",
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "question": "Will the US confirm that aliens exist before 2027?",
            "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "token_ids": [
              "107505882767731489358349912513945399560393482969656700824895970500493757150417",
              "7305630249804085635496399869905769372294302716159034447326228509068694952392"
            ],
            "outcomes": ["Yes", "No"],
            "active": true,
            "timestamp": "2026-06-29T17:15:57.257000Z"
          }
        }
        ```
      </CodeGroup>

      #### Market Resolved

      <CodeGroup>
        ```python MarketResolvedEvent Type theme={null}
        class MarketResolvedPayload:
            id: str
            market: str
            token_ids: tuple[TokenId, ...] | None
            winning_token_id: TokenId | None
            winning_outcome: str | None
            event_message: MarketEventMessage | None
            timestamp: datetime | None
            tags: tuple[str, ...] | None

        class MarketResolvedEvent:
            topic: Literal["market"]
            type: Literal["market_resolved"]
            payload: MarketResolvedPayload
        ```

        ```json MarketResolvedEvent Example theme={null}
        {
          "topic": "market",
          "type": "market_resolved",
          "payload": {
            "id": "123456",
            "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "token_ids": [
              "107505882767731489358349912513945399560393482969656700824895970500493757150417",
              "7305630249804085635496399869905769372294302716159034447326228509068694952392"
            ],
            "winning_token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "winning_outcome": "Yes",
            "timestamp": "2026-06-29T17:15:57.257000Z"
          }
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    Connect to the market WebSocket:

    ```text theme={null}
    wss://ws-subscriptions-clob.polymarket.com/ws/market
    ```

    <Note>
      The market WebSocket uses an application-level heartbeat. Send the text frame
      `PING` every 10 seconds; the server replies with `PONG`.
    </Note>

    Once connected, send a `market` subscription frame with one or more token
    IDs:

    ```json theme={null}
    {
      "assets_ids": ["<token_id>"],
      "type": "market"
    }
    ```

    <Accordion title="Standard Market Events">
      #### Order Book

      ```json theme={null}
      {
        "event_type": "book",
        "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "asset_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "timestamp": "1782753357257",
        "hash": "0xabc123…",
        "bids": [
          { "price": "0.08", "size": "33343.4" },
          { "price": "0.09", "size": "163939.58" }
        ],
        "asks": [
          { "price": "0.99", "size": "218442.27" },
          { "price": "0.98", "size": "13229.55" }
        ]
      }
      ```

      #### Price Change

      ```json theme={null}
      {
        "event_type": "price_change",
        "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "price_changes": [
          {
            "asset_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "price": "0.08",
            "size": "33343.4",
            "side": "BUY",
            "hash": "56621a121a47ed9333273e21c83b660cff37ae50",
            "best_bid": "0.08",
            "best_ask": "0.09"
          }
        ],
        "timestamp": "1782753357257"
      }
      ```

      #### Last Trade Price

      ```json theme={null}
      {
        "event_type": "last_trade_price",
        "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "asset_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "price": "0.08",
        "size": "219.217767",
        "fee_rate_bps": "0",
        "side": "SELL",
        "timestamp": "1782753357257",
        "transaction_hash": "0xeeefff…"
      }
      ```

      #### Tick Size Change

      ```json theme={null}
      {
        "event_type": "tick_size_change",
        "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "asset_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "old_tick_size": "0.01",
        "new_tick_size": "0.001",
        "timestamp": "1782753357257"
      }
      ```
    </Accordion>

    Enable `custom_feature_enabled` to include top-of-book and market lifecycle
    updates:

    ```json theme={null}
    {
      "assets_ids": ["<token_id>"],
      "type": "market",
      "custom_feature_enabled": true
    }
    ```

    <Accordion title="Additional Market Events">
      #### Best Bid and Ask

      ```json theme={null}
      {
        "event_type": "best_bid_ask",
        "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "asset_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "best_bid": "0.08",
        "best_ask": "0.09",
        "spread": "0.01",
        "timestamp": "1782753357257"
      }
      ```

      #### New Market

      ```json theme={null}
      {
        "event_type": "new_market",
        "id": "123456",
        "question": "Will the US confirm that aliens exist before 2027?",
        "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
        "assets_ids": [
          "107505882767731489358349912513945399560393482969656700824895970500493757150417",
          "7305630249804085635496399869905769372294302716159034447326228509068694952392"
        ],
        "outcomes": ["Yes", "No"],
        "timestamp": "1782753357257"
      }
      ```

      #### Market Resolved

      ```json theme={null}
      {
        "event_type": "market_resolved",
        "id": "123456",
        "market": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "assets_ids": [
          "107505882767731489358349912513945399560393482969656700824895970500493757150417",
          "7305630249804085635496399869905769372294302716159034447326228509068694952392"
        ],
        "winning_asset_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
        "winning_outcome": "Yes",
        "timestamp": "1782753357257"
      }
      ```
    </Accordion>

    You can add or remove token IDs without opening a new connection:

    <CodeGroup>
      ```json Subscribe theme={null}
      {
        "assets_ids": ["<new_token_id>"],
        "operation": "subscribe"
      }
      ```

      ```json Unsubscribe theme={null}
      {
        "assets_ids": ["<old_token_id>"],
        "operation": "unsubscribe"
      }
      ```
    </CodeGroup>

    These frames update only the token set for the current market-stream
    connection.
  </Tab>
</Tabs>

## Sports Stream

Use the sports stream to keep live game information current alongside sports
markets. Updates arrive when a game goes live, its score or period changes, or
it ends. NFL and CFB updates can also reflect possession changes.

<Warning>
  Sports data is provided for informational purposes only. It may be delayed,
  contain errors, or omit recent events. Polymarket does not provide trading or
  investment advice, and this data should not be used as the basis for a trading
  decision.
</Warning>

<Tabs>
  <Tab title="TypeScript">
    Given a `PublicClient` or `SecureClient`, subscribe to the `sports` topic to receive
    every game update:

    ```ts theme={null}
    const stream = await client.subscribe([{ topic: "sports" }]);

    for await (const event of stream) {
      // event: SportsEvent
    }
    ```

    <Accordion title="Sports Event">
      <CodeGroup>
        ```ts SportsEvent Type theme={null}
        type SportsEvent = {
          topic: "sports";
          type: "sport_result";
          payload: {
            gameId: number;
            sportradarGameId?: string | null;
            slug?: string | null;
            leagueAbbreviation: string;
            homeTeam?: string | null;
            awayTeam?: string | null;
            status: string;
            live: boolean;
            ended: boolean;
            score: string;
            period?: string | null;
            elapsed?: string | null;
            finishedAt?: IsoDateTimeString | null;
            turn?: string | null;
          };
        };
        ```

        ```json SportsEvent Example theme={null}
        {
          "topic": "sports",
          "type": "sport_result",
          "payload": {
            "gameId": 5127839,
            "leagueAbbreviation": "NBA",
            "homeTeam": "Los Angeles Lakers",
            "awayTeam": "Boston Celtics",
            "status": "InProgress",
            "live": true,
            "ended": false,
            "score": "98-94",
            "period": "Q4",
            "elapsed": "05:12"
          }
        }
        ```
      </CodeGroup>

      `score` is a combined `"<home>-<away>"` string, not separate home and away
      fields.
    </Accordion>
  </Tab>

  <Tab title="Python">
    Given an `AsyncPublicClient` or `AsyncSecureClient`, subscribe with a
    `SportsSpec` to receive every game update:

    ```python theme={null}
    from polymarket.streams import SportsSpec

    async with await client.subscribe(SportsSpec()) as stream:
        async for event in stream:
            ...  # event: SportsEvent
    ```

    <Accordion title="Sports Event">
      <CodeGroup>
        ```python SportsEvent Type theme={null}
        class SportsGameResult:
            game_id: int
            sportradar_game_id: str | None
            slug: str | None
            league_abbreviation: str
            home_team: str | None
            away_team: str | None
            status: str
            live: bool
            ended: bool
            score: str
            period: str | None
            elapsed: str | None
            finished_at: datetime | None
            turn: str | None

        class SportsResultEvent:
            topic: Literal["sports"]
            type: Literal["sport_result"]
            payload: SportsGameResult

        SportsEvent = SportsResultEvent
        ```

        ```json SportsEvent Example theme={null}
        {
          "topic": "sports",
          "type": "sport_result",
          "payload": {
            "game_id": 5127839,
            "league_abbreviation": "NBA",
            "home_team": "Los Angeles Lakers",
            "away_team": "Boston Celtics",
            "status": "InProgress",
            "live": true,
            "ended": false,
            "score": "98-94",
            "period": "Q4",
            "elapsed": "05:12"
          }
        }
        ```
      </CodeGroup>

      `score` is a combined `"<home>-<away>"` string, not separate home and away
      fields.
    </Accordion>
  </Tab>

  <Tab title="API">
    Connect to the sports WebSocket:

    ```text theme={null}
    wss://sports-api.polymarket.com/ws
    ```

    <Note>
      The sports WebSocket uses an application-level heartbeat. The server sends the
      text frame `ping` every 5 seconds; reply with `pong` within 10 seconds or the
      server closes the connection.
    </Note>

    Once connected, the server starts streaming every game update. No
    subscription frame is required.

    <Accordion title="Sports Event">
      ```json theme={null}
      {
        "gameId": 5127839,
        "leagueAbbreviation": "NBA",
        "homeTeam": "Los Angeles Lakers",
        "awayTeam": "Boston Celtics",
        "status": "InProgress",
        "live": true,
        "ended": false,
        "score": "98-94",
        "period": "Q4",
        "elapsed": "05:12"
      }
      ```

      Sports messages have no envelope or event-type field. Each message is the
      game update object itself, and `score` is a combined `"<home>-<away>"`
      string.
    </Accordion>
  </Tab>
</Tabs>

### Period Values

The meaning and format of a period depend on the sport:

| Values                 | Meaning                              |
| ---------------------- | ------------------------------------ |
| `1H`, `2H`             | First or second half                 |
| `1Q`, `2Q`, `3Q`, `4Q` | Quarter                              |
| `HT`                   | Halftime                             |
| `FT`                   | Full time in regulation              |
| `FT OT`                | Full time after overtime             |
| `FT NR`                | Full time with no result             |
| `End 1`, `End 2`, …    | End of an MLB inning                 |
| `1/3`, `2/3`, `3/3`    | Map number in a best-of-three series |
| `1/5`, `2/5`, …        | Map number in a best-of-five series  |

### Game Status Values

Status values vary by sport and are case-sensitive:

| Sport       | Values                                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| NFL         | `Scheduled`, `InProgress`, `Final`, `F/OT`, `Suspended`, `Postponed`, `Delayed`, `Canceled`, `Forfeit`, `NotNecessary`         |
| NHL         | `Scheduled`, `InProgress`, `Final`, `F/OT`, `F/SO`, `Suspended`, `Postponed`, `Delayed`, `Canceled`, `Forfeit`, `NotNecessary` |
| MLB         | `Scheduled`, `InProgress`, `Final`, `Suspended`, `Delayed`, `Postponed`, `Canceled`, `Forfeit`, `NotNecessary`                 |
| NBA and CBB | `Scheduled`, `InProgress`, `Final`, `F/OT`, `Suspended`, `Postponed`, `Delayed`, `Canceled`, `Forfeit`, `NotNecessary`         |
| CFB         | `Scheduled`, `InProgress`, `Final`, `F/OT`, `Suspended`, `Postponed`, `Delayed`, `Canceled`, `Forfeit`                         |
| Soccer      | `Scheduled`, `InProgress`, `Break`, `Suspended`, `PenaltyShootout`, `Final`, `Awarded`, `Postponed`, `Canceled`                |
| Esports     | `not_started`, `running`, `finished`, `postponed`, `canceled`                                                                  |
| Tennis      | `scheduled`, `inprogress`, `suspended`, `finished`, `postponed`, `cancelled`                                                   |

## RTDS Streams

The Real-Time Data Service (RTDS) carries reference prices and comments over a
shared real-time connection. Subscribe only to the topics your application
needs.

### Crypto Prices

Use crypto price streams to keep reference values current alongside related
markets.

<Tip>
  Trading 15-minute crypto markets? [Request a sponsored Chainlink API
  key](https://pm-ds-request.streams.chain.link/) with onboarding support from
  Chainlink.
</Tip>

Use the symbol format for the selected price source:

| Source    | Supported symbols                          |
| --------- | ------------------------------------------ |
| Binance   | `btcusdt`, `ethusdt`, `solusdt`, `xrpusdt` |
| Chainlink | `btc/usd`, `eth/usd`, `sol/usd`, `xrp/usd` |

<Tabs>
  <Tab title="TypeScript">
    Given a `PublicClient` or `SecureClient`, subscribe to the crypto price topics you
    need:

    ```ts theme={null}
    const stream = await client.subscribe([
      { topic: "prices.crypto.binance", symbols: ["btcusdt", "ethusdt"] },
      { topic: "prices.crypto.chainlink", symbols: ["eth/usd"] },
    ]);

    for await (const event of stream) {
      switch (event.topic) {
        case "prices.crypto.binance":
          // event: CryptoPricesBinanceEvent
          break;
        case "prices.crypto.chainlink":
          // event: CryptoPricesChainlinkEvent
          break;
      }
    }
    ```

    <Accordion title="Crypto Price Events">
      #### Binance Price Update

      <CodeGroup>
        ```ts CryptoPricesBinanceEvent Type theme={null}
        type PriceUpdatePayload = {
          symbol: string;
          timestamp: EpochMilliseconds;
          value: DecimalString;
        };

        type CryptoPricesBinanceEvent = {
          topic: "prices.crypto.binance";
          type: "update";
          timestamp: EpochMilliseconds;
          payload: PriceUpdatePayload;
        };
        ```

        ```json CryptoPricesBinanceEvent Example theme={null}
        {
          "topic": "prices.crypto.binance",
          "type": "update",
          "timestamp": 1782753357257,
          "payload": {
            "symbol": "btcusdt",
            "timestamp": 1782753357213,
            "value": "67234.5"
          }
        }
        ```
      </CodeGroup>

      #### Chainlink Price Update

      <CodeGroup>
        ```ts CryptoPricesChainlinkEvent Type theme={null}
        type CryptoPricesChainlinkEvent = {
          topic: "prices.crypto.chainlink";
          type: "update";
          timestamp: EpochMilliseconds;
          payload: PriceUpdatePayload;
        };
        ```

        ```json CryptoPricesChainlinkEvent Example theme={null}
        {
          "topic": "prices.crypto.chainlink",
          "type": "update",
          "timestamp": 1782753357257,
          "payload": {
            "symbol": "eth/usd",
            "timestamp": 1782753357213,
            "value": "3420.15"
          }
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Given an `AsyncPublicClient` or `AsyncSecureClient`, subscribe with the
    crypto price specs you need:

    ```python theme={null}
    from polymarket.streams import CryptoPricesSpec

    async with await client.subscribe(
        [
            CryptoPricesSpec(topic="prices.crypto.binance", symbols=["btcusdt", "ethusdt"]),
            CryptoPricesSpec(topic="prices.crypto.chainlink", symbols=["eth/usd"]),
        ],
    ) as stream:
        async for event in stream:
            if event.topic == "prices.crypto.binance":
                ...  # event: CryptoPricesBinanceEvent
            elif event.topic == "prices.crypto.chainlink":
                ...  # event: CryptoPricesChainlinkEvent
    ```

    <Accordion title="Crypto Price Events">
      #### Binance Price Update

      <CodeGroup>
        ```python CryptoPricesBinanceEvent Type theme={null}
        class PriceUpdatePayload:
            symbol: str
            timestamp: int
            value: Decimal

        class CryptoPricesBinanceEvent:
            topic: Literal["prices.crypto.binance"]
            type: Literal["update"]
            timestamp: datetime
            payload: PriceUpdatePayload
        ```

        ```json CryptoPricesBinanceEvent Example theme={null}
        {
          "topic": "prices.crypto.binance",
          "type": "update",
          "timestamp": "2026-06-29T17:15:57.257000Z",
          "payload": {
            "symbol": "btcusdt",
            "timestamp": 1782753357213,
            "value": "67234.5"
          }
        }
        ```
      </CodeGroup>

      #### Chainlink Price Update

      <CodeGroup>
        ```python CryptoPricesChainlinkEvent Type theme={null}
        class CryptoPricesChainlinkEvent:
            topic: Literal["prices.crypto.chainlink"]
            type: Literal["update"]
            timestamp: datetime
            payload: PriceUpdatePayload
        ```

        ```json CryptoPricesChainlinkEvent Example theme={null}
        {
          "topic": "prices.crypto.chainlink",
          "type": "update",
          "timestamp": "2026-06-29T17:15:57.257000Z",
          "payload": {
            "symbol": "eth/usd",
            "timestamp": 1782753357213,
            "value": "3420.15"
          }
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    Connect to RTDS:

    ```text theme={null}
    wss://ws-live-data.polymarket.com
    ```

    <Note>
      RTDS uses an application-level heartbeat. Send the text frame `PING` every 5
      seconds to maintain the connection.
    </Note>

    Once connected, send a subscription frame for the crypto price topics you
    need:

    ```json theme={null}
    {
      "action": "subscribe",
      "subscriptions": [
        {
          "topic": "crypto_prices",
          "type": "update",
          "filters": "btcusdt,ethusdt"
        },
        {
          "topic": "crypto_prices_chainlink",
          "type": "*",
          "filters": "{\"symbol\":\"eth/usd\"}"
        }
      ]
    }
    ```

    Binance filters are comma-separated symbols, while Chainlink filters are
    JSON strings with a single symbol. Omit `filters` to receive every event
    for a topic and type.

    <Accordion title="Crypto Price Events">
      #### Binance Price Update

      ```json theme={null}
      {
        "topic": "crypto_prices",
        "type": "update",
        "timestamp": 1782753357257,
        "payload": {
          "symbol": "btcusdt",
          "timestamp": 1782753357213,
          "value": 67234.5
        }
      }
      ```

      #### Chainlink Price Update

      ```json theme={null}
      {
        "topic": "crypto_prices_chainlink",
        "type": "update",
        "timestamp": 1782753357257,
        "payload": {
          "symbol": "eth/usd",
          "timestamp": 1782753357213,
          "value": 3420.15
        }
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

### Equity Prices

Equity price streams provide Pyth Network reference prices for stocks, ETFs,
forex pairs, precious metals, and commodities.

<Tip>
  Trading equity markets? [Subscribe to a Pyth Network data
  feed](https://buy.stripe.com/cNi8wPeiq76FgQrbsD4ZG09). The first 30 days are
  free, then access costs \$99 per month.
</Tip>

#### Subscribe to Equity Prices

<Tabs>
  <Tab title="TypeScript">
    Given a `PublicClient` or `SecureClient`, subscribe to the equity price topic for the
    symbols you need:

    ```ts theme={null}
    const stream = await client.subscribe([
      { topic: "prices.equity.pyth", symbol: "AAPL" },
    ]);

    for await (const event of stream) {
      if (event.type === "update") {
        // event: EquityPricesUpdateEvent
      } else {
        // event: EquityPricesSubscribeEvent
      }
    }
    ```

    <Accordion title="Equity Price Events">
      #### Equity Price Update

      <CodeGroup>
        ```ts EquityPricesUpdateEvent Type theme={null}
        type EquityPriceUpdatePayload = {
          symbol: string;
          value: DecimalString;
          timestamp: EpochMilliseconds;
          receivedAt?: EpochMilliseconds | null;
          isCarriedForward?: boolean | null;
        };

        type EquityPricesUpdateEvent = {
          topic: "prices.equity.pyth";
          type: "update";
          timestamp: EpochMilliseconds;
          payload: EquityPriceUpdatePayload;
        };
        ```

        ```json EquityPricesUpdateEvent Example theme={null}
        {
          "topic": "prices.equity.pyth",
          "type": "update",
          "timestamp": 1782753357257,
          "payload": {
            "symbol": "aapl",
            "timestamp": 1782753357213,
            "value": "189.4217",
            "receivedAt": 1782753357220,
            "isCarriedForward": false
          }
        }
        ```
      </CodeGroup>

      #### Equity Price Snapshot

      <CodeGroup>
        ```ts EquityPricesSubscribeEvent Type theme={null}
        type EquityPriceSnapshotPoint = {
          timestamp: number;
          value: DecimalString;
        };

        type EquityPriceSubscribePayload = {
          symbol: string;
          data: EquityPriceSnapshotPoint[];
        };

        type EquityPricesSubscribeEvent = {
          topic: "prices.equity.pyth";
          type: "subscribe";
          timestamp: EpochMilliseconds;
          payload: EquityPriceSubscribePayload;
        };
        ```

        ```json EquityPricesSubscribeEvent Example theme={null}
        {
          "topic": "prices.equity.pyth",
          "type": "subscribe",
          "timestamp": 1782753357257,
          "payload": {
            "symbol": "aapl",
            "data": [
              { "timestamp": 1782753297000, "value": "189.38" },
              { "timestamp": 1782753357000, "value": "189.42" }
            ]
          }
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Given an `AsyncPublicClient` or `AsyncSecureClient`, subscribe with an
    equity price spec for the symbols you need:

    ```python theme={null}
    from polymarket.streams import EquityPricesSpec

    async with await client.subscribe(EquityPricesSpec(symbol="AAPL")) as stream:
        async for event in stream:
            if event.type == "update":
                ...  # event: EquityPricesUpdateEvent
            else:
                ...  # event: EquityPricesSubscribeEvent
    ```

    <Accordion title="Equity Price Events">
      #### Equity Price Update

      <CodeGroup>
        ```python EquityPricesUpdateEvent Type theme={null}
        class EquityPriceUpdatePayload:
            symbol: str
            value: Decimal
            timestamp: int
            received_at: int | None
            is_carried_forward: bool | None

        class EquityPricesUpdateEvent:
            topic: Literal["prices.equity.pyth"]
            type: Literal["update"]
            timestamp: datetime
            payload: EquityPriceUpdatePayload
        ```

        ```json EquityPricesUpdateEvent Example theme={null}
        {
          "topic": "prices.equity.pyth",
          "type": "update",
          "timestamp": "2026-06-29T17:15:57.257000Z",
          "payload": {
            "symbol": "aapl",
            "value": "189.4217",
            "timestamp": 1782753357213,
            "received_at": 1782753357220,
            "is_carried_forward": false
          }
        }
        ```
      </CodeGroup>

      #### Equity Price Snapshot

      <CodeGroup>
        ```python EquityPricesSubscribeEvent Type theme={null}
        class EquityPriceSnapshotEntry:
            timestamp: int
            value: Decimal

        class EquityPriceSubscribePayload:
            symbol: str
            data: tuple[EquityPriceSnapshotEntry, ...]

        class EquityPricesSubscribeEvent:
            topic: Literal["prices.equity.pyth"]
            type: Literal["subscribe"]
            timestamp: datetime
            payload: EquityPriceSubscribePayload
        ```

        ```json EquityPricesSubscribeEvent Example theme={null}
        {
          "topic": "prices.equity.pyth",
          "type": "subscribe",
          "timestamp": "2026-06-29T17:15:57.257000Z",
          "payload": {
            "symbol": "aapl",
            "data": [
              { "timestamp": 1782753297000, "value": "189.38" },
              { "timestamp": 1782753357000, "value": "189.42" }
            ]
          }
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    Connect to RTDS:

    ```text theme={null}
    wss://ws-live-data.polymarket.com
    ```

    <Note>
      RTDS uses an application-level heartbeat. Send the text frame `PING` every 5
      seconds to maintain the connection.
    </Note>

    Once connected, send an equity price subscription frame for the symbols
    you need:

    ```json theme={null}
    {
      "action": "subscribe",
      "subscriptions": [
        {
          "topic": "equity_prices",
          "type": "*",
          "filters": "{\"symbol\":\"AAPL\"}"
        }
      ]
    }
    ```

    `filters` is an optional string, and the server validates that it's
    well-formed JSON: quote both keys and string values. To filter on more than
    one symbol, send one subscription entry per symbol. An empty or omitted
    `filters` value means unfiltered.

    <Note>
      Price updates can include `full_accuracy_value`. Prefer this string over the
      numeric `value` when it is present.
    </Note>

    <Accordion title="Equity Price Events">
      #### Equity Price Update

      ```json theme={null}
      {
        "topic": "equity_prices",
        "type": "update",
        "timestamp": 1782753357257,
        "payload": {
          "symbol": "aapl",
          "timestamp": 1782753357213,
          "value": 189.42,
          "full_accuracy_value": "189.4217",
          "received_at": 1782753357220,
          "is_carried_forward": false
        }
      }
      ```

      #### Equity Price Snapshot

      ```json theme={null}
      {
        "topic": "equity_prices",
        "type": "subscribe",
        "timestamp": 1782753357257,
        "payload": {
          "symbol": "aapl",
          "data": [
            { "timestamp": 1782753297000, "value": 189.38 },
            { "timestamp": 1782753357000, "value": 189.42 }
          ]
        }
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

#### Historical Snapshot

When you subscribe to a symbol, the stream first sends its preceding two
minutes of price data and then continues with live updates. Use this snapshot to
initialize your local state before processing new prices.

#### Supported Symbols

| Asset class     | Supported symbols                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| Stocks          | `AAPL`, `TSLA`, `MSFT`, `GOOGL`, `AMZN`, `META`, `NVDA`, `NFLX`, `PLTR`, `OPEN`, `RKLB`, `ABNB`, `COIN`, `HOOD` |
| ETFs            | `QQQ`, `SPY`, `EWY`, `VXX`                                                                                      |
| Forex           | `EURUSD`, `GBPUSD`, `USDCAD`, `USDJPY`, `USDKRW`                                                                |
| Precious metals | `XAUUSD`, `XAGUSD`                                                                                              |
| Commodities     | `WTI`, `CC`, `NGD`                                                                                              |

<Note>
  Subscription symbols are case-insensitive, but stream events return symbols in
  lowercase.
</Note>

#### Market Hours

When the market for an asset is closed, the stream continues with its last
known price and marks that value as carried forward. During market hours,
prices can update up to five times per second for each feed.

### Comments

Use the comments stream to keep conversations and reactions current wherever
your application displays Polymarket discussion. Comments can begin a thread or
reply to another comment; reply events include the parent comment's ID.

<Tabs>
  <Tab title="TypeScript">
    Given a `PublicClient` or `SecureClient`, subscribe to the `comments` topic and
    select the event types you need:

    ```ts theme={null}
    const stream = await client.subscribe([
      {
        topic: "comments",
        types: [
          "comment_created",
          "comment_removed",
          "reaction_created",
          "reaction_removed",
        ],
      },
    ]);

    for await (const event of stream) {
      switch (event.type) {
        case "comment_created":
          // event: CommentCreatedEvent
          break;
        case "comment_removed":
          // event: CommentRemovedEvent
          break;
        case "reaction_created":
          // event: ReactionCreatedEvent
          break;
        case "reaction_removed":
          // event: ReactionRemovedEvent
          break;
      }
    }
    ```

    Use `parentEntityId` and `parentEntityType` to scope the subscription to one
    event or market.

    <Accordion title="Comment Events">
      #### New Comment

      <CodeGroup>
        ```ts CommentCreatedEvent Type theme={null}
        type Comment = {
          id: CommentId;
          body?: string | null;
          parentEntityType?: CommentParentEntityType | null;
          parentEntityID?: EventId | SeriesId | null;
          parentCommentID?: CommentId | null;
          userAddress?: string | null;
          replyAddress?: string | null;
          createdAt?: IsoDateTimeString | null;
          updatedAt?: IsoDateTimeString | null;
          media?: CommentMedia[] | null;
          profile?: CommentProfile | null;
          reactions?: Reaction[] | null;
          reportCount?: number | null;
          reactionCount?: number | null;
          tradeAsset?: string | null;
        };

        type CommentCreatedEvent = {
          topic: "comments";
          type: "comment_created";
          timestamp: EpochMilliseconds;
          payload: Comment;
        };
        ```

        ```json CommentCreatedEvent Example theme={null}
        {
          "topic": "comments",
          "type": "comment_created",
          "timestamp": 1782753357257,
          "payload": {
            "id": "1763355",
            "body": "That's a good point about the definition.",
            "parentEntityType": "Event",
            "parentEntityID": "18396",
            "parentCommentID": null,
            "userAddress": "0xce533188d53a16ed580fd5121dedf166d3482677",
            "replyAddress": "0x0bda5d16f76cd1d3485bcc7a44bc6fa7db004cdd",
            "createdAt": "2025-07-25T14:49:35.801298Z",
            "reactionCount": 0,
            "reportCount": 0,
            "profile": {
              "baseAddress": "0xce533188d53a16ed580fd5121dedf166d3482677",
              "displayUsernamePublic": true,
              "name": "salted.caramel",
              "wallet": "0x4ca749dcfa93c87e5ee23e2d21ff4422c7a4c1ee",
              "pseudonym": "Adored-Disparity"
            }
          }
        }
        ```
      </CodeGroup>

      #### Removed Comment

      <CodeGroup>
        ```ts CommentRemovedEvent Type theme={null}
        type CommentRemovedPayload = {
          id: string;
          body?: string | null;
          parentEntityType?: CommentParentEntityType | null;
          parentEntityID?: number | null;
          parentCommentID?: string | null;
          userAddress?: string | null;
          replyAddress?: string | null;
          createdAt?: string | null;
          updatedAt?: string | null;
          media?: CommentMedia[] | null;
          profile?: CommentProfile | null;
          reactions?: Reaction[] | null;
          reportCount?: number | null;
          reactionCount?: number | null;
          tradeAsset?: string | null;
        };

        type CommentRemovedEvent = {
          topic: "comments";
          type: "comment_removed";
          timestamp: EpochMilliseconds;
          payload: CommentRemovedPayload;
        };
        ```

        ```json CommentRemovedEvent Example theme={null}
        {
          "topic": "comments",
          "type": "comment_removed",
          "timestamp": 1782753357257,
          "payload": {
            "id": "1763355",
            "body": "That's a good point about the definition.",
            "parentEntityType": "Event",
            "parentEntityID": 18396,
            "userAddress": "0xce533188d53a16ed580fd5121dedf166d3482677"
          }
        }
        ```
      </CodeGroup>

      #### New Reaction

      <CodeGroup>
        ```ts ReactionCreatedEvent Type theme={null}
        type Reaction = {
          id: string;
          commentID?: number | null;
          reactionType?: ReactionType | null;
          icon?: string | null;
          userAddress?: string | null;
          createdAt?: IsoDateTimeString | null;
          profile?: CommentProfile | null;
        };

        type ReactionCreatedEvent = {
          topic: "comments";
          type: "reaction_created";
          timestamp: EpochMilliseconds;
          payload: Reaction;
        };
        ```

        ```json ReactionCreatedEvent Example theme={null}
        {
          "topic": "comments",
          "type": "reaction_created",
          "timestamp": 1782753357257,
          "payload": {
            "id": "8675309",
            "commentID": 1763355,
            "reactionType": "HEART",
            "icon": "❤️",
            "userAddress": "0xce533188d53a16ed580fd5121dedf166d3482677",
            "createdAt": "2025-07-25T14:50:04.120000Z"
          }
        }
        ```
      </CodeGroup>

      #### Removed Reaction

      <CodeGroup>
        ```ts ReactionRemovedEvent Type theme={null}
        type ReactionRemovedEvent = {
          topic: "comments";
          type: "reaction_removed";
          timestamp: EpochMilliseconds;
          payload: Reaction;
        };
        ```

        ```json ReactionRemovedEvent Example theme={null}
        {
          "topic": "comments",
          "type": "reaction_removed",
          "timestamp": 1782753357257,
          "payload": {
            "id": "8675309",
            "commentID": 1763355,
            "reactionType": "HEART",
            "userAddress": "0xce533188d53a16ed580fd5121dedf166d3482677"
          }
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Given an `AsyncPublicClient` or `AsyncSecureClient`, subscribe with a
    `CommentsSpec` containing the event types you need:

    ```python theme={null}
    from polymarket.streams import CommentsSpec

    async with await client.subscribe(
        CommentsSpec(
            types=[
                "comment_created",
                "comment_removed",
                "reaction_created",
                "reaction_removed",
            ],
        ),
    ) as stream:
        async for event in stream:
            if event.type == "comment_created":
                ...  # event: CommentCreatedEvent
            elif event.type == "comment_removed":
                ...  # event: CommentRemovedEvent
            elif event.type == "reaction_created":
                ...  # event: ReactionCreatedEvent
            else:
                ...  # event: ReactionRemovedEvent
    ```

    Use `parent_entity_id` and `parent_entity_type` to scope the subscription to
    one event or market.

    <Accordion title="Comment Events">
      #### New Comment

      <CodeGroup>
        ```python CommentCreatedEvent Type theme={null}
        class Comment:
            id: CommentId
            body: str | None
            parent_entity_type: str | None
            parent_entity_id: EventId | SeriesId | None
            parent_comment_id: CommentId | None
            user_address: EvmAddress | None
            reply_address: EvmAddress | None
            created_at: datetime | None
            updated_at: datetime | None
            media: tuple[CommentMedia, ...] | None
            profile: CommentProfile | None
            reactions: tuple[Reaction, ...] | None
            report_count: int | None
            reaction_count: int | None
            trade_asset: str | None

        class CommentCreatedEvent:
            topic: Literal["comments"]
            type: Literal["comment_created"]
            timestamp: datetime
            payload: Comment
        ```

        ```json CommentCreatedEvent Example theme={null}
        {
          "topic": "comments",
          "type": "comment_created",
          "timestamp": "2026-06-29T17:15:57.257000Z",
          "payload": {
            "id": "1763355",
            "body": "That's a good point about the definition.",
            "parent_entity_type": "Event",
            "parent_entity_id": "18396",
            "parent_comment_id": null,
            "user_address": "0xce533188d53a16ed580fd5121dedf166d3482677",
            "reply_address": "0x0bda5d16f76cd1d3485bcc7a44bc6fa7db004cdd",
            "created_at": "2025-07-25T14:49:35.801298Z",
            "reaction_count": 0,
            "report_count": 0,
            "profile": {
              "base_address": "0xce533188d53a16ed580fd5121dedf166d3482677",
              "display_username_public": true,
              "name": "salted.caramel",
              "wallet": "0x4ca749dcfa93c87e5ee23e2d21ff4422c7a4c1ee",
              "pseudonym": "Adored-Disparity"
            }
          }
        }
        ```
      </CodeGroup>

      #### Removed Comment

      <CodeGroup>
        ```python CommentRemovedEvent Type theme={null}
        class CommentRemovedPayload:
            id: str
            body: str | None
            parent_entity_type: Literal["Event", "Market"] | None
            parent_entity_id: int | None
            parent_comment_id: str | None
            user_address: EvmAddress | None
            reply_address: EvmAddress | None
            created_at: datetime | None
            updated_at: datetime | None
            media: tuple[CommentMedia, ...] | None
            profile: CommentProfile | None
            reactions: tuple[Reaction, ...] | None
            report_count: int | None
            reaction_count: int | None
            trade_asset: str | None

        class CommentRemovedEvent:
            topic: Literal["comments"]
            type: Literal["comment_removed"]
            timestamp: datetime
            payload: CommentRemovedPayload
        ```

        ```json CommentRemovedEvent Example theme={null}
        {
          "topic": "comments",
          "type": "comment_removed",
          "timestamp": "2026-06-29T17:15:57.257000Z",
          "payload": {
            "id": "1763355",
            "body": "That's a good point about the definition.",
            "parent_entity_type": "Event",
            "parent_entity_id": 18396,
            "user_address": "0xce533188d53a16ed580fd5121dedf166d3482677"
          }
        }
        ```
      </CodeGroup>

      #### New Reaction

      <CodeGroup>
        ```python ReactionCreatedEvent Type theme={null}
        class Reaction:
            id: str
            comment_id: int | None
            reaction_type: str | None
            icon: str | None
            user_address: EvmAddress | None
            created_at: datetime | None
            profile: CommentProfile | None

        class ReactionCreatedEvent:
            topic: Literal["comments"]
            type: Literal["reaction_created"]
            timestamp: datetime
            payload: Reaction
        ```

        ```json ReactionCreatedEvent Example theme={null}
        {
          "topic": "comments",
          "type": "reaction_created",
          "timestamp": "2026-06-29T17:15:57.257000Z",
          "payload": {
            "id": "8675309",
            "comment_id": 1763355,
            "reaction_type": "HEART",
            "icon": "❤️",
            "user_address": "0xce533188d53a16ed580fd5121dedf166d3482677",
            "created_at": "2025-07-25T14:50:04.120000Z"
          }
        }
        ```
      </CodeGroup>

      #### Removed Reaction

      <CodeGroup>
        ```python ReactionRemovedEvent Type theme={null}
        class ReactionRemovedEvent:
            topic: Literal["comments"]
            type: Literal["reaction_removed"]
            timestamp: datetime
            payload: Reaction
        ```

        ```json ReactionRemovedEvent Example theme={null}
        {
          "topic": "comments",
          "type": "reaction_removed",
          "timestamp": "2026-06-29T17:15:57.257000Z",
          "payload": {
            "id": "8675309",
            "comment_id": 1763355,
            "reaction_type": "HEART",
            "user_address": "0xce533188d53a16ed580fd5121dedf166d3482677"
          }
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    Connect to RTDS:

    ```text theme={null}
    wss://ws-live-data.polymarket.com
    ```

    <Note>
      RTDS uses an application-level heartbeat. Send the text frame `PING` every 5
      seconds to maintain the connection.
    </Note>

    Once connected, send one subscription entry for each comment event type you
    need. Use a `filters` string to scope an entry to one entity:

    ```json theme={null}
    {
      "action": "subscribe",
      "subscriptions": [
        {
          "topic": "comments",
          "type": "comment_created",
          "filters": "{\"parentEntityID\":18396,\"parentEntityType\":\"Event\"}"
        }
      ]
    }
    ```

    `filters` must be well-formed JSON when present: quote keys and string
    values. An empty or omitted `filters` value means you receive every
    comment event.

    <Accordion title="Comment Events">
      #### New Comment

      ```json theme={null}
      {
        "topic": "comments",
        "type": "comment_created",
        "timestamp": 1782753357257,
        "payload": {
          "id": "1763355",
          "body": "That's a good point about the definition.",
          "parentEntityType": "Event",
          "parentEntityID": 18396,
          "parentCommentID": null,
          "userAddress": "0xce533188d53a16ed580fd5121dedf166d3482677",
          "replyAddress": "0x0bda5d16f76cd1d3485bcc7a44bc6fa7db004cdd",
          "createdAt": "2025-07-25T14:49:35.801298Z",
          "reactionCount": 0,
          "reportCount": 0,
          "profile": {
            "baseAddress": "0xce533188d53a16ed580fd5121dedf166d3482677",
            "displayUsernamePublic": true,
            "name": "salted.caramel",
            "proxyWallet": "0x4ca749dcfa93c87e5ee23e2d21ff4422c7a4c1ee",
            "pseudonym": "Adored-Disparity"
          }
        }
      }
      ```

      #### Removed Comment

      ```json theme={null}
      {
        "topic": "comments",
        "type": "comment_removed",
        "timestamp": 1782753357257,
        "payload": {
          "id": "1763355",
          "body": "That's a good point about the definition.",
          "parentEntityType": "Event",
          "parentEntityID": 18396,
          "userAddress": "0xce533188d53a16ed580fd5121dedf166d3482677"
        }
      }
      ```

      #### New Reaction

      ```json theme={null}
      {
        "topic": "comments",
        "type": "reaction_created",
        "timestamp": 1782753357257,
        "payload": {
          "id": "8675309",
          "commentID": 1763355,
          "reactionType": "HEART",
          "icon": "❤️",
          "userAddress": "0xce533188d53a16ed580fd5121dedf166d3482677",
          "createdAt": "2025-07-25T14:50:04.120000Z"
        }
      }
      ```

      #### Removed Reaction

      ```json theme={null}
      {
        "topic": "comments",
        "type": "reaction_removed",
        "timestamp": 1782753357257,
        "payload": {
          "id": "8675309",
          "commentID": 1763355,
          "reactionType": "HEART",
          "userAddress": "0xce533188d53a16ed580fd5121dedf166d3482677"
        }
      }
      ```
    </Accordion>
  </Tab>
</Tabs>
