<!--
Source: https://docs.polymarket.com/getting-started/python.md
Downloaded: 2026-07-23T21:04:54.609Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Python SDK

> Get started with the unified Polymarket Python SDK.

The `polymarket-client` package is the official Python SDK for building
Polymarket integrations.

<CardGroup cols={2}>
  <Card title="GitHub" icon="github" href="https://github.com/Polymarket/py-sdk/">
    View the Python SDK source.
  </Card>

  <Card title="PyPI Package" icon="python" href="https://pypi.org/project/polymarket-client/">
    Install `polymarket-client` from PyPI.
  </Card>
</CardGroup>

See the [SDK Changelog](/changelog/sdks#python) for recent Python releases.

## Quickstart

<Steps>
  <Step title="Install the SDK">
    Install the SDK with your preferred package manager.

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
    Create an `AsyncPublicClient` to access publicly available Polymarket data.

    ```python theme={null}
    from polymarket import AsyncPublicClient


    async with AsyncPublicClient() as client:
        ...
    ```
  </Step>

  <Step title="Fetch Active Markets">
    Fetch a page of active markets to discover trading opportunities.

    ```python theme={null}
    import asyncio

    from polymarket import AsyncPublicClient


    async def main() -> None:
        async with AsyncPublicClient() as client:
            pages = client.list_markets(closed=False)
            first_page = await pages.first_page()

            for market in first_page.items:
                # market: Market
                ...


    asyncio.run(main())
    ```
  </Step>
</Steps>

## Async and Sync Interfaces

Public clients access public data. [Secure clients](#secure-client) add trading
and account access. Both client types are available in async and sync forms.

| Interface | Public data         | Trading and account data |
| --------- | ------------------- | ------------------------ |
| Async     | `AsyncPublicClient` | `AsyncSecureClient`      |
| Sync      | `PublicClient`      | `SecureClient`           |

Async clients fit services, bots, and applications that already run an event
loop. Sync clients are convenient for scripts and notebooks.

<CodeGroup>
  ```python Async theme={null}
  from polymarket import AsyncPublicClient


  async with AsyncPublicClient() as client:
      pages = client.list_markets(closed=False)
      first_page = await pages.first_page()
  ```

  ```python Sync theme={null}
  from polymarket import PublicClient


  with PublicClient() as client:
      pages = client.list_markets(closed=False)
      first_page = pages.first_page()
  ```
</CodeGroup>

<Note>
  Some features, including realtime subscriptions, are async-only because they
  rely on long-lived streams.
</Note>

## Pagination

SDK list methods use a consistent paginator interface. Iterate over the
paginator to retrieve every page, or fetch one page at a time when you need to
control pacing.

<CodeGroup>
  ```python Async theme={null}
  pages = client.list_markets(closed=False, page_size=10)

  async for page in pages:
      for market in page.items:
          # market: Market
          ...
  ```

  ```python Sync theme={null}
  pages = client.list_markets(closed=False, page_size=10)

  for page in pages:
      for market in page.items:
          # market: Market
          ...
  ```
</CodeGroup>

When page boundaries do not matter, iterate over every item directly.

<CodeGroup>
  ```python Async theme={null}
  async for market in pages.iter_items():
      # market: Market
      ...
  ```

  ```python Sync theme={null}
  for market in pages.iter_items():
      # market: Market
      ...
  ```
</CodeGroup>

`page.next_cursor` is an opaque SDK cursor. Store it as-is if you want to resume
a scan later, and omit it when starting from the first page.

<CodeGroup>
  ```python Async theme={null}
  pages = client.list_markets(closed=False, page_size=10)
  page = await pages.first_page()

  if page.next_cursor:
      second_page = await pages.from_cursor(page.next_cursor).first_page()
      # second_page.items: tuple[Market, ...]
  ```

  ```python Sync theme={null}
  pages = client.list_markets(closed=False, page_size=10)
  page = pages.first_page()

  if page.next_cursor:
      second_page = pages.from_cursor(page.next_cursor).first_page()
      # second_page.items: tuple[Market, ...]
  ```
</CodeGroup>

## Types

SDK methods return typed models, and their public types are exported from
`polymarket`.

```python theme={null}
from polymarket import Event, Market, OrderBook, PriceHistoryPoint
```

The SDK also uses distinct types for domain identifiers and EVM addresses.
Precision-sensitive values use `decimal.Decimal`, while dates and timestamps
use Python's `datetime` types.

```python theme={null}
from polymarket import CtfConditionId, EvmAddress, MarketId, TokenId
```

## Error Handling

All SDK exceptions inherit from `PolymarketError`. Catch specific exceptions
when your application can respond to them, then catch the base exception as a
fallback.

```python theme={null}
from polymarket import PolymarketError, RateLimitError, UserInputError

pages = client.list_markets(closed=False)

try:
    page = await pages.first_page()
    # page.items: tuple[Market, ...]
except RateLimitError:
    # Retry later.
    ...
except UserInputError:
    # Fix the request parameters.
    ...
except PolymarketError:
    # Handle any other SDK error.
    raise
```

## Secure Client

Create an `AsyncSecureClient` or `SecureClient` when your integration needs to
trade or access account data. The Python SDK creates the signer from a local
private key.

<CodeGroup>
  ```python Async theme={null}
  import os

  from polymarket import AsyncSecureClient


  async with await AsyncSecureClient.create(
      private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
  ) as client:
      ...
  ```

  ```python Sync theme={null}
  import os

  from polymarket import SecureClient


  with SecureClient.create(
      private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
  ) as client:
      ...
  ```
</CodeGroup>

Continue to [Wallets and Authentication](/trading/wallets-auth) to configure the
account wallet and gasless transactions.

## Realtime Subscriptions

The Python SDK can combine updates from multiple realtime feeds into a single
stream of events.

<Note>
  Realtime subscriptions are available only through `AsyncPublicClient` and
  `AsyncSecureClient`. `PublicClient` and `SecureClient` do not implement
  `subscribe()`.
</Note>

Call `subscribe()` with one or more subscription specs. Both `AsyncPublicClient`
and `AsyncSecureClient` support public streams, while `AsyncSecureClient` also
provides private streams for the connected account.

<CodeGroup>
  ```python Public Client theme={null}
  from polymarket.streams import MarketSpec, SportsSpec

  token_id = "<token_id>"

  async with await client.subscribe(
      [MarketSpec(token_ids=[token_id]), SportsSpec()],
  ) as stream:
      async for event in stream:
          # event:
          #   MarketBookEvent
          #   | MarketPriceChangeEvent
          #   | MarketLastTradePriceEvent
          #   | MarketTickSizeChangeEvent
          #   | MarketBestBidAskEvent
          #   | NewMarketEvent
          #   | MarketResolvedEvent
          #   | SportsEvent

          if should_close:
              break
  ```

  ```python Secure Client theme={null}
  from polymarket.streams import MarketSpec, UserSpec

  token_id = "<token_id>"

  async with await client.subscribe(
      [MarketSpec(token_ids=[token_id]), UserSpec()],
  ) as stream:
      async for event in stream:
          # event:
          #   MarketBookEvent
          #   | MarketPriceChangeEvent
          #   | MarketLastTradePriceEvent
          #   | MarketTickSizeChangeEvent
          #   | MarketBestBidAskEvent
          #   | NewMarketEvent
          #   | MarketResolvedEvent
          #   | UserEvent

          if should_close:
              break
  ```
</CodeGroup>

Narrow `event.topic` before handling a specific event shape. The examples show
a few streams; see [Real-Time Data](/market-data/realtime-data),
[Real-Time Order Updates](/trading/realtime-order-updates), and
[Perps Realtime Updates](/perps/realtime-updates) for feed-specific options.

## DataFrames and Jupyter

Convert pages and paginators directly to a
[pandas DataFrame](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html),
[Polars DataFrame](https://docs.pola.rs/py-polars/html/reference/dataframe/), or
[Apache Arrow Table](https://arrow.apache.org/docs/python/generated/pyarrow.Table.html).
Install the `pandas`, `polars`, or `arrow` package extra for the format you use;
the `quant` extra installs all three.

<CodeGroup>
  ```python Pandas theme={null}
  pages = client.list_markets(closed=False)
  df = await pages.to_pandas(limit=100)
  ```

  ```python Polars theme={null}
  pages = client.list_markets(closed=False)
  df = await pages.to_polars(limit=100)
  ```

  ```python Arrow theme={null}
  pages = client.list_markets(closed=False)
  table = await pages.to_arrow(limit=100)
  ```
</CodeGroup>

Paginator conversions require an explicit limit. Pass `limit=None` to retrieve
every item.

Common SDK objects also render as compact cards in
[Jupyter](https://docs.jupyter.org/en/stable/) notebooks. Return an object as
the last expression in a cell to display it.

```python theme={null}
pages = client.list_markets(closed=False)
page = await pages.first_page()
page.items[0]
```

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
