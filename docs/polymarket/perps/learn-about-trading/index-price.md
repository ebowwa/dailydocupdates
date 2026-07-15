> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Index Price

> How the Index Price is computed for Perps

Index Price is Polymarket's estimate of the underlying asset's fair value. It is
computed from external price feeds, aggregated to resist stale or anomalous
inputs, and published every 200 milliseconds per market.

## Feed Sources

Index Price can use feeds from external sources such as:

* Pyth
* Chainlink Data Streams
* Hyperliquid

## Feed Selection

The system selects different feeds based on the current market session so it can
use the most accurate feed set for each market. See [Market Sessions](/perps/learn-about-trading/market-sessions).

## Aggregation

Index Price is computed as a weighted average across the selected feeds after
dropping stale prices and filtering outliers. This prevents any single stale or
anomalous feed from moving the Index.

The same aggregation approach is used to build the [C3 candidate in Mark Price](/perps/learn-about-trading/mark-price),
using a separate mark feed set.
