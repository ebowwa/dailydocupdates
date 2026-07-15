> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Mark Price

> How the Mark Price is computed for Perps

Mark Price is the price used across the system for margin, unrealized PnL,
liquidation triggers, funding premium computation, and risk checks. It is updated
every 200 milliseconds.

Mark Price is computed as the median of three candidates, each capturing a
different view of fair value.

```text theme={null}
Mark = median(C1, C2, C3)
```

## C1: Smoothed Order Book Mid

C1 anchors to Index and adjusts gradually based on where the local order book mid
is trading relative to it.

```text theme={null}
C1 = Index + EMA(Mid - Index)
```

* `Mid = (BestBid + BestAsk) / 2` when both sides of the book exist.
* The EMA uses a 150-second window, so C1 moves slowly and resists short-term manipulation.
* If the order book mid is unavailable, C1 falls back to Index.

## C2: Local Market Activity

C2 reflects what is actually trading on the local book.

```text theme={null}
C2 = median(BestBid, BestAsk, LastTrade)
```

* Last trade is only included if it is recent.
* Stale trades are excluded so one old print cannot anchor the price.
* If no usable values exist, C2 falls back to Index.

## C3: Aggregated External Mark

C3 is built from external mark feeds, separate from Index feeds, that provide an
independent view of fair value outside the local order book.

For each market, the system:

1. Selects active mark feeds from eligible external sources.
2. Drops stale samples.
3. Computes the candidate median and filters outliers beyond the allowed tolerance.
4. Returns the weighted average of the remaining samples.

If no valid external mark data is available, C3 falls back to Index.

## Why Three Candidates?

Using the median of three independent price signals provides resilience:

* C1 is slow-moving and resistant to sudden order book manipulation, but can lag during fast moves.
* C2 is responsive to real local trading activity, but can be influenced by thin liquidity.
* C3 is independent of the local book, but depends on external feed availability.

The median ensures that no single signal can unilaterally move Mark Price. At
least two of the three candidates must agree for the mark to shift.

## Finalization

After computing `median(C1, C2, C3)`, the raw mark is normalized before being
published:

* Snapped to the nearest tick size
* Rounded to the market's price precision

## Fallback Summary

Every input degrades gracefully to [Index Price](/perps/learn-about-trading/index-price).

| Condition                       | Behavior                                                    |
| ------------------------------- | ----------------------------------------------------------- |
| Index input stale               | Falls back to last known market index                       |
| Order book mid unavailable      | C1 falls back to Index                                      |
| No recent trades or quotes      | C2 falls back to Index                                      |
| External mark feeds unavailable | C3 falls back to Index                                      |
| All inputs missing              | Mark tracks Index because all candidates fall back to Index |

In the worst case, when there is no local book, no recent trades, and no external
mark feeds, all three candidates converge to Index and Mark Price tracks Index
directly.
