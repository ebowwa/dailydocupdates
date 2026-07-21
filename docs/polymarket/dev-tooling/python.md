<!--
Source: https://docs.polymarket.com/dev-tooling/python.md
Downloaded: 2026-07-21T21:09:50.595Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Python SDK

> Build with the unified Polymarket Python SDK.

The unified Python SDK gives you a consistent surface across Polymarket discovery, market data, trading, account data, and realtime streams.

<Note>
  The Python SDK is currently in beta. We are keeping it in this beta phase
  while we address issues and harden the SDK before transitioning to a more
  stable release.
</Note>

The SDK ships parallel async and sync clients with matching method names and arguments: `AsyncPublicClient` / `PublicClient` for public reads, and `AsyncSecureClient` / `SecureClient` for authenticated reads and trading. Prefer the async clients for servers, bots, and any code that already runs inside an event loop. Use the sync clients for scripts, notebooks, and one-off tools where an event loop would just add ceremony. Realtime stream subscriptions are async only and require the async clients.

Examples below show the body of an `async def main()` function; wrap them with `asyncio.run(main())` to run as a script, as shown in [Quickstart](#quickstart). To switch a snippet to sync, swap `AsyncPublicClient` / `AsyncSecureClient` for `PublicClient` / `SecureClient`, drop `await`, replace `async with` with `with`, replace `async for` with `for`, and remove the `asyncio.run(...)` wrapper.

## Quickstart

<Steps>
  <Step title="Install the Package">
    Install the SDK from PyPI.

    <CodeGroup>
      ```bash uv theme={null}
      uv add polymarket-client
      ```

      ```bash pip theme={null}
      pip install polymarket-client
      ```

      ```bash poetry theme={null}
      poetry add polymarket-client
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a Public Client">
    Create an instance of the `AsyncPublicClient` inside an `async with` block so its network transports are released when you are done.

    ```python theme={null}
    from polymarket import AsyncPublicClient

    async with AsyncPublicClient() as client:
        ...
    ```
  </Step>

  <Step title="Fetch Markets">
    Fetch a page of markets to discover active trading opportunities.

    <CodeGroup>
      ```python Async theme={null}
      import asyncio

      from polymarket import AsyncPublicClient


      async def main() -> None:
          async with AsyncPublicClient() as client:
              markets = client.list_markets(closed=False, page_size=5)
              first_page = await markets.first_page()

              for market in first_page.items:
                  # market: Market
                  ...


      asyncio.run(main())
      ```

      ```python Sync theme={null}
      from polymarket import PublicClient


      with PublicClient() as client:
          markets = client.list_markets(closed=False, page_size=5)
          first_page = markets.first_page()

          for market in first_page.items:
              # market: Market
              ...
      ```
    </CodeGroup>
  </Step>
</Steps>

## SDK Patterns

The SDK uses consistent patterns for pagination, Python-native model values, and structured SDK exceptions across public and authenticated workflows.

### Typed Primitives

Identifiers and EVM addresses are exposed as `typing.NewType` aliases (`MarketId`, `ConditionId`, `TokenId`, `EventId`, `EvmAddress`, …) so static type checkers can keep them distinct from plain strings. Precision-sensitive price, size, and amount fields generally use `decimal.Decimal`; date and time fields use `datetime.date` or `datetime.datetime`.

```python theme={null}
from datetime import datetime
from decimal import Decimal

from polymarket import ConditionId, EvmAddress, MarketId, TokenId


class Market:
    id: MarketId
    condition_id: ConditionId | None
    state: MarketState
    outcomes: MarketOutcomes
    resolution: MarketResolution
    # …


class MarketState:
    start_date: datetime | None
    end_date: datetime | None
    # …


class MarketOutcome:
    label: str
    token_id: TokenId | None
    price: Decimal | None


class MarketResolution:
    resolved_by: EvmAddress | None
    # …
```

### Market and Event Data

Market and event responses are returned as SDK models with snake\_case fields and nested submodels.

<CodeGroup>
  ```python Market theme={null}
  class Market:
      id: MarketId
      slug: str | None
      condition_id: ConditionId | None
      question: str | None
      description: str | None
      category: str | None
      image: str | None
      icon: str | None
      state: MarketState
      outcomes: MarketOutcomes
      metrics: MarketMetrics
      prices: MarketPrices
      trading: MarketTrading
      resolution: MarketResolution
      rewards: MarketRewards
      sports: MarketSportsMetadata
      tags: tuple[MarketTag, ...]
      # …
  ```

  ```python Event theme={null}
  class Event:
      id: EventId
      slug: str | None
      title: str | None
      subtitle: str | None
      description: str | None
      category: str | None
      subcategory: str | None
      image: str | None
      icon: str | None
      created_at: datetime | None
      updated_at: datetime | None
      published_at: datetime | None
      state: EventState
      schedule: EventSchedule
      metrics: EventMetrics
      trading: EventTrading
      estimation: EventEstimation
      sports: EventSportsMetadata
      partners: tuple[EventPartner, ...]
      markets: tuple[Market, ...]
      series: tuple[EventSeries, ...]
      # …
  ```
</CodeGroup>

### Environment Configuration

Production is the default environment. Pass an `Environment` object when your integration needs to target a different deployment or custom endpoint set. The client owns network transports, so use `async with` (or call `await client.close()`) to release them when you are done.

```python theme={null}
from polymarket import AsyncPublicClient, PRODUCTION


async with AsyncPublicClient(environment=PRODUCTION) as client:
    ...
```

### Pagination

With async clients, list methods return an `AsyncPaginator` across paginated endpoints. Use `async for` to iterate through pages.

```python theme={null}
async with AsyncPublicClient() as client:
    markets = client.list_markets(closed=False, page_size=10)

    async for page in markets:
        # page.items: tuple[Market, ...]
        ...
```

You can also fetch the first page directly and resume later from a cursor.

```python theme={null}
first_page = await markets.first_page()
# first_page.items: tuple[Market, ...]

async for page in markets.from_cursor(first_page.next_cursor):
    # page.items: tuple[Market, ...]
    ...
```

When you only care about the items and not page boundaries, iterate them directly.

```python theme={null}
async for market in markets.items():
    # market: Market
    ...
```

### Error Handling

All SDK exceptions inherit from `PolymarketError`. Catch specific subclasses to handle known cases, and catch `PolymarketError` as the final SDK fallback.

<Note>
  Catching `PolymarketError` last ensures error subclasses added in future SDK
  releases do not pass through unhandled.
</Note>

```python theme={null}
from polymarket import (
    AsyncPublicClient,
    PolymarketError,
    RateLimitError,
    UserInputError,
)

async with AsyncPublicClient() as client:
    try:
        markets = client.list_markets(closed=False, page_size=10)
        first_page = await markets.first_page()
        # first_page.items: tuple[Market, ...]
    except RateLimitError:
        # Retry later.
        ...
    except UserInputError:
        # Fix the request parameters.
        ...
    except PolymarketError:
        # Handle any other SDK error.
        ...
```

## Market Data

Use market data methods to fetch market and event details, order books, current prices, historical prices, and batch quotes.

<CodeGroup>
  ```python Market theme={null}
  market = await client.get_market(
      url="https://polymarket.com/market/eth-flipped-in-2026",
  )

  market_by_slug = await client.get_market(slug="eth-flipped-in-2026")

  market_by_id = await client.get_market(id="12345")
  ```

  ```python Event theme={null}
  event = await client.get_event(
      url="https://polymarket.com/event/presidential-election-2028",
  )

  event_by_slug = await client.get_event(slug="presidential-election-2028")

  event_by_id = await client.get_event(id="12345")
  ```
</CodeGroup>

Then fetch related tags, order books, prices, and history.

<CodeGroup>
  ```python Tags theme={null}
  market_tags = await client.get_market_tags(market.id)

  event_tags = await client.get_event_tags(event.id)
  ```

  ```python Order Book theme={null}
  yes_token_id = market.outcomes.yes.token_id
  if yes_token_id is None:
      raise RuntimeError("Market does not have a YES token id")

  book = await client.get_order_book(token_id=yes_token_id)
  ```

  ```python Prices theme={null}
  yes_token_id = market.outcomes.yes.token_id
  if yes_token_id is None:
      raise RuntimeError("Market does not have a YES token id")

  buy_price = await client.get_price(token_id=yes_token_id, side="BUY")

  midpoint = await client.get_midpoint(token_id=yes_token_id)

  spread = await client.get_spread(token_id=yes_token_id)

  last_trade = await client.get_last_trade_price(token_id=yes_token_id)
  ```

  ```python History theme={null}
  yes_token_id = market.outcomes.yes.token_id
  if yes_token_id is None:
      raise RuntimeError("Market does not have a YES token id")

  history = await client.get_price_history(token_id=yes_token_id, interval="1d")
  ```

  ```python Batch Reads theme={null}
  from polymarket import PriceRequest

  yes_token_id = market.outcomes.yes.token_id
  no_token_id = market.outcomes.no.token_id
  if yes_token_id is None or no_token_id is None:
      raise RuntimeError("Market does not have both outcome token ids")

  prices = await client.get_prices(
      requests=[
          PriceRequest(token_id=yes_token_id, side="BUY"),
          PriceRequest(token_id=no_token_id, side="BUY"),
      ],
  )

  midpoints = await client.get_midpoints(token_ids=[yes_token_id, no_token_id])
  ```
</CodeGroup>

## Discovery

Use discovery methods to browse events, markets, teams, tags, comments, sports metadata, and search results. The examples below show a few common entry points.

<Tabs>
  <Tab title="Events">
    ```python theme={null}
    events = client.list_events(page_size=10)

    async for page in events:
        # page.items: tuple[Event, ...]
        ...
    ```
  </Tab>

  <Tab title="Markets">
    ```python theme={null}
    markets = client.list_markets(closed=False, page_size=10)

    async for page in markets:
        # page.items: tuple[Market, ...]
        ...
    ```
  </Tab>

  <Tab title="Teams">
    ```python theme={null}
    teams = client.list_teams(league="NBA", page_size=10)

    async for page in teams:
        # page.items: tuple[Team, ...]
        ...
    ```
  </Tab>

  <Tab title="Tags">
    ```python theme={null}
    tags = client.list_tags(page_size=10)

    async for page in tags:
        # page.items: tuple[Tag, ...]
        ...

    tag = await client.get_tag(slug="politics")

    related_tags = await client.get_related_tags(slug="politics")

    related_resources = await client.get_related_tag_resources(
        slug="politics",
        status="active",
    )
    ```
  </Tab>

  <Tab title="Comments">
    ```python theme={null}
    import os

    comments = client.list_comments(
        parent_entity_id="12345",
        parent_entity_type="Event",
        page_size=20,
    )

    async for page in comments:
        # page.items: tuple[Comment, ...]
        ...

    thread = await client.get_comment_thread("456", get_positions=True)

    user_comments = client.list_comments_by_user_address(
        address=os.environ["POLYMARKET_TARGET_WALLET_ADDRESS"],
        page_size=10,
        order="DESC",
    )

    async for page in user_comments:
        # page.items: tuple[Comment, ...]
        ...
    ```
  </Tab>

  <Tab title="Sports">
    ```python theme={null}
    sports = await client.get_sports()

    # sports: tuple[SportsMetadata, ...]
    ```
  </Tab>

  <Tab title="Search">
    ```python theme={null}
    results = client.search(q="ethereum", page_size=10)

    async for page in results:
        for search_results in page.items:
            # search_results.events: tuple[Event, ...]
            # search_results.tags: tuple[SearchTag, ...]
            # search_results.profiles: tuple[Profile, ...]
            ...
    ```
  </Tab>
</Tabs>

## Realtime Streams

Subscribe through one SDK interface even when events come from different stream families. The SDK routes each subscription spec to the right stream and merges the results into one async iterator. Subscriptions are async only and require `AsyncPublicClient` or `AsyncSecureClient`.

```python theme={null}
from polymarket import AsyncPublicClient
from polymarket.streams import CryptoPricesSpec, MarketSpec


yes_token_id = market.outcomes.yes.token_id
if yes_token_id is None:
    raise RuntimeError("Market does not have a YES token id")

async with AsyncPublicClient() as client:
    stream = await client.subscribe(
        [
            MarketSpec(token_ids=[yes_token_id]),
            CryptoPricesSpec(
                topic="prices.crypto.binance",
                symbols=["btcusdt"],
            ),
        ],
    )

    async with stream:
        async for event in stream:
            # event:
            #   | MarketBookEvent
            #   | MarketPriceChangeEvent
            #   | MarketLastTradePriceEvent
            #   | MarketTickSizeChangeEvent
            #   | MarketBestBidAskEvent
            #   | NewMarketEvent
            #   | MarketResolvedEvent
            #   | CryptoPricesBinanceEvent
            print(type(event).__name__)
            break
```

`AsyncSecureClient.subscribe` accepts the same public subscription specs and adds `UserSpec` for user-scoped order and trade events on the authenticated wallet.

```python theme={null}
import os

from polymarket import AsyncSecureClient
from polymarket.streams import UserSpec


async with await AsyncSecureClient.create(
    private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
    wallet=os.environ.get("POLYMARKET_WALLET_ADDRESS"),
) as secure_client:
    user_stream = await secure_client.subscribe(UserSpec())

    async with user_stream:
        async for event in user_stream:
            # event:
            #   | UserOrderEvent
            #   | UserTradeEvent
            print(type(event).__name__)
            break
```

## Authenticated Client

Create a secure client when you need wallet-scoped reads or trading.

<Note>
  Secure clients own multiple network transports. Wrap them in `async with`, or
  call `await secure_client.close()` when you are done, to release the
  underlying connections. The snippets below show client creation and subsequent
  calls as a flat sequence for readability — in real code, keep the client
  inside an `async with` block or close it explicitly.
</Note>

### Private Key Setup

The Python SDK authenticates with a local private key. By default,
`AsyncSecureClient.create` uses the signer's deterministic Deposit Wallet as the
account wallet. Pass `wallet` when you want to authenticate an existing wallet,
such as an existing Deposit Wallet, Poly Safe, Poly Proxy, or the signer address
itself for EOA trading.

The examples below pass `wallet` to make account selection explicit. Omit
`wallet` to use the default Deposit Wallet flow.

```python theme={null}
import os

from polymarket import AsyncSecureClient


async with await AsyncSecureClient.create(
    private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
    wallet=os.environ.get("POLYMARKET_WALLET_ADDRESS"),
) as secure_client:
    ...
```

Keep private keys and API credentials in your secret manager or local environment. Do not commit them to source control.

### API Key Authorization

Configure API key authorization when the SDK needs to deploy a Deposit Wallet or
submit approval transactions.

<CodeGroup>
  ```python Relayer API Key theme={null}
  import os

  from polymarket import AsyncSecureClient, RelayerApiKey


  secure_client = await AsyncSecureClient.create(
      private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
      wallet=os.environ.get("POLYMARKET_WALLET_ADDRESS"),
      api_key=RelayerApiKey(
          key=os.environ["POLYMARKET_RELAYER_API_KEY"],
          address=os.environ["POLYMARKET_RELAYER_API_KEY_ADDRESS"],
      ),
  )
  ```

  ```python Builder API Key theme={null}
  import os

  from polymarket import AsyncSecureClient, BuilderApiKey


  secure_client = await AsyncSecureClient.create(
      private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
      wallet=os.environ.get("POLYMARKET_WALLET_ADDRESS"),
      api_key=BuilderApiKey(
          key=os.environ["POLYMARKET_BUILDER_API_KEY"],
          secret=os.environ["POLYMARKET_BUILDER_SECRET"],
          passphrase=os.environ["POLYMARKET_BUILDER_PASSPHRASE"],
      ),
  )
  ```
</CodeGroup>

<Note>
  Builder API keys are supported for backwards compatibility with builders that
  still use them for wallet operations. They are not used for order attribution.
  Use `builder_code` on orders for attribution.
</Note>

### Trading Setup

Before placing orders, make sure the authenticated wallet is deployed and has
the required trading approvals. `AsyncSecureClient.create` resolves the signer's
deterministic Deposit Wallet by default and deploys it if needed.

<Note>
  From this point forward, snippets in Trading Setup, Trading, Position
  Lifecycle, and Wallet Operations submit real on-chain transactions or live
  orders against the configured environment when executed. Review each call
  before running it against a wallet that holds funds.
</Note>

Set up the approvals required for trading.

```python theme={null}
await secure_client.setup_trading_approvals()
```

`setup_trading_approvals()` waits for the setup transaction internally and is
idempotent. If the wallet already has the required approvals, it returns without
submitting a transaction.

### Trading

Use a secure client to create, sign, and submit orders. Limit orders specify the price and size you want to trade. Market orders execute against resting liquidity immediately.

Order placement returns a discriminated response. Check `response.ok` before reading order details.

#### Place Orders

<Tabs>
  <Tab title="Limit Order">
    ```python theme={null}
    yes_token_id = market.outcomes.yes.token_id
    if yes_token_id is None:
        raise RuntimeError("Market does not have a YES token id")

    response = await secure_client.place_limit_order(
        token_id=yes_token_id,
        side="BUY",
        price="0.52",
        size="10",
    )

    if response.ok:
        # response.order_id: str
        ...
    else:
        # response.code: OrderResponseErrorCode
        # response.message: str
        ...
    ```
  </Tab>

  <Tab title="Expiring Limit Order">
    ```python theme={null}
    import time

    yes_token_id = market.outcomes.yes.token_id
    if yes_token_id is None:
        raise RuntimeError("Market does not have a YES token id")

    response = await secure_client.place_limit_order(
        token_id=yes_token_id,
        side="SELL",
        price="0.52",
        size="10",
        expiration=int(time.time()) + 60 * 60,
    )

    if response.ok:
        # response.order_id: str
        ...
    else:
        # response.code: OrderResponseErrorCode
        # response.message: str
        ...
    ```
  </Tab>

  <Tab title="Partial-Fill Market Order">
    ```python theme={null}
    yes_token_id = market.outcomes.yes.token_id
    if yes_token_id is None:
        raise RuntimeError("Market does not have a YES token id")

    response = await secure_client.place_market_order(
        token_id=yes_token_id,
        side="BUY",
        amount="10",
        max_spend="11",
        order_type="FAK",
    )

    if response.ok:
        # response.order_id: str
        ...
    else:
        # response.code: OrderResponseErrorCode
        # response.message: str
        ...
    ```
  </Tab>

  <Tab title="All-Or-Nothing Market Order">
    ```python theme={null}
    yes_token_id = market.outcomes.yes.token_id
    if yes_token_id is None:
        raise RuntimeError("Market does not have a YES token id")

    response = await secure_client.place_market_order(
        token_id=yes_token_id,
        side="SELL",
        shares="10",
        order_type="FOK",
    )

    if response.ok:
        # response.order_id: str
        ...
    else:
        # response.code: OrderResponseErrorCode
        # response.message: str
        ...
    ```
  </Tab>

  <Tab title="Builder Code">
    ```python theme={null}
    import os

    yes_token_id = market.outcomes.yes.token_id
    if yes_token_id is None:
        raise RuntimeError("Market does not have a YES token id")

    response = await secure_client.place_limit_order(
        token_id=yes_token_id,
        side="BUY",
        price="0.52",
        size="10",
        builder_code=os.environ["POLYMARKET_BUILDER_CODE"],
    )

    if response.ok:
        # response.order_id: str
        ...
    else:
        # response.code: OrderResponseErrorCode
        # response.message: str
        ...
    ```
  </Tab>
</Tabs>

#### Create, Then Post

Create signed orders separately when you want to review, store, or batch them before submitting.

<Tabs>
  <Tab title="Single Order">
    ```python theme={null}
    yes_token_id = market.outcomes.yes.token_id
    if yes_token_id is None:
        raise RuntimeError("Market does not have a YES token id")

    order = await secure_client.create_limit_order(
        token_id=yes_token_id,
        side="BUY",
        price="0.52",
        size="10",
    )

    response = await secure_client.post_order(order)

    if response.ok:
        # response.order_id: str
        ...
    else:
        # response.code: OrderResponseErrorCode
        # response.message: str
        ...
    ```
  </Tab>

  <Tab title="Batch Orders">
    ```python theme={null}
    yes_token_id = market.outcomes.yes.token_id
    if yes_token_id is None:
        raise RuntimeError("Market does not have a YES token id")

    first_order = await secure_client.create_limit_order(
        token_id=yes_token_id,
        side="BUY",
        price="0.52",
        size="10",
    )

    second_order = await secure_client.create_limit_order(
        token_id=yes_token_id,
        side="SELL",
        price="0.58",
        size="5",
    )

    responses = await secure_client.post_orders([first_order, second_order])

    for response in responses:
        if response.ok:
            # response.order_id: str
            ...
        else:
            # response.code: OrderResponseErrorCode
            # response.message: str
            ...
    ```
  </Tab>
</Tabs>

### Position Lifecycle

Use position lifecycle methods to split collateral into outcome tokens, merge
complete sets back into collateral, or redeem resolved positions. These examples
assume the secure client is configured with API key authorization as shown in
[API Key Authorization](#api-key-authorization), and that you set up trading
approvals as shown above.

<Tabs>
  <Tab title="Split Position">
    ```python theme={null}
    condition_id = market.condition_id
    if condition_id is None:
        raise RuntimeError("Market does not have a condition id")

    handle = await secure_client.split_position(
        condition_id=condition_id,
        amount=1,
    )

    outcome = await handle.wait()

    # outcome.transaction_hash: TransactionHash
    ```
  </Tab>

  <Tab title="Merge Positions">
    ```python theme={null}
    condition_id = market.condition_id
    if condition_id is None:
        raise RuntimeError("Market does not have a condition id")

    handle = await secure_client.merge_positions(
        condition_id=condition_id,
        amount="max",
    )

    outcome = await handle.wait()

    # outcome.transaction_hash: TransactionHash
    ```
  </Tab>

  <Tab title="Redeem Positions">
    ```python theme={null}
    handle = await secure_client.redeem_positions(
        market_id=market.id,
    )

    outcome = await handle.wait()

    # outcome.transaction_hash: TransactionHash
    ```
  </Tab>
</Tabs>

### Wallet Operations

Use wallet operation methods for direct token movements from the authenticated
wallet. Amounts are in base units. These examples assume the secure client is
configured with API key authorization as shown in [API Key
Authorization](#api-key-authorization).

```python theme={null}
import os

handle = await secure_client.transfer_erc20(
    token_address=secure_client.environment.collateral_token,
    recipient_address=os.environ["POLYMARKET_RECIPIENT_ADDRESS"],
    amount=1_000_000,
)

outcome = await handle.wait()

# outcome.transaction_hash: TransactionHash
```

### Order Management

Manage open orders for the authenticated wallet after placement. These examples assume `order_id` comes from an accepted order response.

<Tabs>
  <Tab title="Get Order">
    ```python theme={null}
    order = await secure_client.get_order(order_id=order_id)

    # order: OpenOrder
    ```
  </Tab>

  <Tab title="List Open Orders">
    ```python theme={null}
    condition_id = market.condition_id
    if condition_id is None:
        raise RuntimeError("Market does not have a condition id")

    open_orders = secure_client.list_open_orders(market=condition_id)

    async for page in open_orders:
        # page.items: tuple[OpenOrder, ...]
        ...
    ```
  </Tab>

  <Tab title="Cancel Order">
    ```python theme={null}
    response = await secure_client.cancel_order(order_id=order_id)

    # response.canceled: tuple[str, ...]
    ```
  </Tab>

  <Tab title="Cancel Market Orders">
    ```python theme={null}
    yes_token_id = market.outcomes.yes.token_id
    if yes_token_id is None:
        raise RuntimeError("Market does not have a YES token id")

    response = await secure_client.cancel_market_orders(token_id=yes_token_id)

    # response.canceled: tuple[str, ...]
    ```
  </Tab>
</Tabs>

### Rewards and Scoring

Use rewards methods to inspect active reward programs and scoring methods to check whether orders are eligible for scoring. `list_current_rewards` and `list_market_rewards` are public reads and are also available on `AsyncPublicClient` / `PublicClient`; `get_order_scoring` and `get_orders_scoring` require a secure client because they read account-scoped order data.

<Tabs>
  <Tab title="Current Rewards">
    ```python theme={null}
    rewards = secure_client.list_current_rewards()

    async for page in rewards:
        # page.items: tuple[CurrentReward, ...]
        ...
    ```
  </Tab>

  <Tab title="Market Rewards">
    ```python theme={null}
    condition_id = market.condition_id
    if condition_id is None:
        raise RuntimeError("Market does not have a condition id")

    rewards = secure_client.list_market_rewards(condition_id=condition_id)

    async for page in rewards:
        # page.items: tuple[MarketReward, ...]
        ...
    ```
  </Tab>

  <Tab title="Order Scoring">
    ```python theme={null}
    scoring = await secure_client.get_order_scoring(order_id=order_id)

    # scoring: bool
    ```
  </Tab>

  <Tab title="Batch Order Scoring">
    ```python theme={null}
    scoring = await secure_client.get_orders_scoring(
        order_ids=[first_order_id, second_order_id],
    )

    # scoring: dict[str, bool]
    ```
  </Tab>
</Tabs>

### Account Data

Secure clients read account-scoped data for the authenticated wallet by default. Methods that take a `user=` parameter (positions, portfolio value, activity) accept a different wallet address to read its data instead.

<Tabs>
  <Tab title="Positions">
    ```python theme={null}
    positions = secure_client.list_positions(
        market=[market.id],
        page_size=10,
    )

    async for page in positions:
        # page.items: tuple[Position, ...]
        ...
    ```
  </Tab>

  <Tab title="Portfolio Value">
    ```python theme={null}
    value = await secure_client.get_portfolio_values(market=[market.id])

    # value: tuple[PortfolioValue, ...]
    ```
  </Tab>

  <Tab title="Activity">
    ```python theme={null}
    activity = secure_client.list_activity(
        market=[market.id],
        page_size=10,
    )

    async for page in activity:
        for item in page.items:
            match item.type:
                case "TRADE":
                    # item.token_id: TokenId
                    # item.shares: Decimal
                    ...
                case "REWARD":
                    # item.amount: Decimal
                    ...
                case _:
                    # SPLIT / MERGE / REDEEM / CONVERSION / MAKER_REBATE
                    # / TAKER_REBATE / REFERRAL_REWARD / YIELD
                    ...
    ```
  </Tab>

  <Tab title="Trades">
    ```python theme={null}
    yes_token_id = market.outcomes.yes.token_id
    if yes_token_id is None:
        raise RuntimeError("Market does not have a YES token id")

    trades = secure_client.list_account_trades(token_id=yes_token_id)

    async for page in trades:
        # page.items: tuple[ClobTrade, ...]
        ...
    ```
  </Tab>

  <Tab title="Notifications">
    ```python theme={null}
    notifications = await secure_client.get_notifications()

    # notifications: tuple[Notification, ...]
    ```
  </Tab>
</Tabs>

### Authentication Sessions

Secure clients expose the API credentials created for the authenticated session. Store them securely if you want to reuse the session later without producing a new authentication signature while the credentials remain valid.

<Tabs>
  <Tab title="Save Credentials">
    ```python theme={null}
    import os

    from polymarket import AsyncSecureClient


    secure_client = await AsyncSecureClient.create(
        private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
        wallet=os.environ.get("POLYMARKET_WALLET_ADDRESS"),
    )

    saved_credentials = secure_client.credentials.model_dump(mode="json")
    ```
  </Tab>

  <Tab title="Reuse Credentials">
    ```python theme={null}
    import os

    from polymarket import ApiKeyCreds, AsyncSecureClient


    credentials = ApiKeyCreds.model_validate(saved_credentials)

    secure_client = await AsyncSecureClient.create(
        private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
        wallet=os.environ.get("POLYMARKET_WALLET_ADDRESS"),
        credentials=credentials,
    )
    ```
  </Tab>
</Tabs>

## Changelog

### `0.1.0b21`

* `setup_trading_approvals` no longer requests approvals for the retired CLOB v1 Neg Risk Adapter.

### `0.1.0b20`

* RFQ quoter sessions now keep running when the server introduces new error codes: unrecognized codes are carried on rejection errors as plain strings, while known codes stay typed through the `RfqErrorCode` enum.
* Added `ConnectionLostError` carrying the WebSocket close `code` and `reason`. Losing an RFQ session connection now raises it from in-flight operations and the session iterator, instead of a generic `TransportError`. Closing the session still ends iteration cleanly.
* Optional decimal fields on streamed market and user events treat empty strings as absent (for example a trade's `fee_rate_bps` or a price change's `best_bid` and `best_ask`).
* Batch price reads return `TokenId`-keyed maps.
* Perps streams handle fill and trade frames that batch multiple entries.

### `0.1.0b19`

* Added `RESOLVED_PARTIAL` to `ComboPositionStatus` so Combo positions that resolve at a fractional payout (for example a voided leg) parse correctly instead of failing validation.

### `0.1.0b18`

* Combo activity now parses the canonical `type` field returned by the Data API, instead of deriving lifecycle actions from legacy fields.

### `0.1.0b17`

* Added SDK pagination for Combo lifecycle activity and server-cursor pagination for Combo positions.
* Added typed overloads for market, event, and tag lookups, mutually-exclusive lookup arguments, and `redeem_positions`.
* Added trade time filters.
* Hardened Combo pagination filters and branded Combo activity IDs.
* Breaking beta change: Combo activity and position fields now use `wallet`, `amount`, and `payout`; Combo activity rows no longer expose `module_kind`.

```diff theme={null}
-activity.user_address
-activity.amount_usdc
-redeem_activity.payout_usdc
-position.user_address
+activity.wallet
+activity.amount
+redeem_activity.payout
+position.wallet
```

### `0.1.0b16`

* Fixed Deposit Wallet trading setup approvals to use the current Protocol V2 auto-redeem operator.

### `0.1.0b15`

* Added support for Perps.

### `0.1.0b14`

* Added builder API key management for creating, fetching, and revoking builder API keys.
* Added support for merging multiple positions in one request.
* Added runnable Python SDK examples for common integration workflows.
* Resolve closed markets when redeeming positions.
* Gasless transaction handles now wait for relayer transactions to reach confirmed state before resolving.

### `0.1.0b13`

* Require GTD limit order expirations to be at least 3 minutes in the future.

### `0.1.0b12`

* Support CLOB order tick sizes `0.005` and `0.0025`.

### `0.1.0b11`

* Preserve already-deployed legacy UUPS Deposit Wallets when secure clients resolve the default wallet, while new Deposit Wallet deployments use the beacon factory path.
* Retry rejected JSON-RPC batches by splitting them into smaller batches.
* Added typed Gamma search sort fields for search requests.

### `0.1.0b10`

* Preserve `group_item_title` on market responses so grouped market titles remain available after normalization.

### `0.1.0b9`

* RFQ quoter sessions now emit typed `RfqTradeEvent` events for confirmed Combos fills.
* RFQ rejection errors now expose `error_id` values and parse `INVALID_SIGNATURE` and `INTERNAL_ERROR` codes.

### `0.1.0b8`

* Added `parent_event_id` to `Event` so child events can link back to their parent event.
* Added `max_price` and `min_price` protection fields to market order requests.
* Handle legacy multi-outcome market listings more safely by omitting markets that cannot be represented by the binary market model.
* Normalize empty-string trade and position market icons to `None`.
* Parse Combo trade activity rows correctly.
* Support new Combos RFQ error codes for balance, allowance, and pre-execution reservation failures.
* Broad user websocket subscriptions now omit market filters so all-market streams receive trade events.

### `0.1.0b7`

* Point Combos RFQ endpoints at the production domains: `combos-rfq-api.polymarket.com` (REST) and `combos-rfq-gateway-quoter.polymarket.com` (quoter WebSocket).

### `0.1.0b6`

* Added `list_combo_markets` for fetching the Combo market catalog with SDK pagination. See [Combos](/trading/combos/overview).
* Parse RFQ quote rejections that use the `SUBMISSION_WINDOW_CLOSED` gateway error code.

### `0.1.0b5`

* Added Combos support for multi-leg RFQ positions. See [Combos](/trading/combos/overview).
* Added notebook-friendly model display for Jupyter workflows.
* `ConditionId` is now deprecated in favor of `CtfConditionId`; existing
  `ConditionId` exports remain available as deprecated aliases.

### `0.1.0b4`

* Added dataframe conversion support for SDK models and response collections.

**Secure client setup now defaults to the Deposit Wallet flow**

`AsyncSecureClient.create` can now derive and use the signer's deterministic
Deposit Wallet when you omit `wallet`. If you already know which Polymarket
wallet you want to use, keep passing `wallet`.

```diff theme={null}
secure_client = await AsyncSecureClient.create(
    private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
-    wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
)
```

If you want to keep account selection explicit, no change is required:

```python theme={null}
secure_client = await AsyncSecureClient.create(
    private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
    wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
)
```

**`setup_trading_approvals()` now waits internally**

You no longer need to wait on the returned handle. Call the method once before
trading; it is safe to call again if approvals are already set.

```diff theme={null}
-handle = await secure_client.setup_trading_approvals()
-await handle.wait()
+await secure_client.setup_trading_approvals()
```

**Gasless setup helpers are deprecated**

You no longer need to call `is_gasless_ready()` or `setup_gasless_wallet()` in
the normal setup path. Create the secure client, then set up trading approvals.

```diff theme={null}
-ready = await secure_client.is_gasless_ready()
-
-if not ready:
-    secure_client = await secure_client.setup_gasless_wallet()
-
 await secure_client.setup_trading_approvals()
```

### `0.1.0b1`

First beta release of the unified Python SDK. Install the beta package with your
package manager:

```bash theme={null}
uv add polymarket-client
```
