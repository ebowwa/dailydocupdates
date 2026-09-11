> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Liquidity Rewards

> Earn daily pUSD rewards by providing deep, two-sided liquidity on Perps

Every Perps account is automatically considered for daily liquidity rewards.
There is no application or participant allowlist: the same eligibility threshold
and scoring rules apply to every maker.

Rewards are calculated for 24-hour periods from 12:00 UTC to 12:00 UTC. Each
period is labeled by its end date, and earned rewards are credited in pUSD to the
earning Perps account.

## How Rewards Are Allocated

The program distributes **\$75,000 per day**, split evenly across active Perps
markets. Each market has one daily pool. Makers with a nonzero score divide that
market's entire pool in proportion to their scores.

A maker's score combines three inputs:

```text theme={null}
raw_score = maker_score^0.35 × active_liquidity_score^0.65 × uptime
```

| Input                  | What it rewards                                              |
| ---------------------- | ------------------------------------------------------------ |
| Maker score            | Meaningful maker participation over the trailing seven days  |
| Active liquidity score | Deep, balanced liquidity close to the midpoint while quoting |
| Uptime                 | Consistent two-sided quoting throughout the reward period    |

The final reward for an account is its share of all positive raw scores in that
market multiplied by the market's daily pool.

## Eligibility And Maker Score

An account must represent at least **1% of trailing seven-day maker volume** to
qualify. For accounts in a rewards entity, the entity's combined maker share is
used. During the first seven days of the program, the lookback begins at the
program start rather than reaching into earlier trading.

Maker share is capped at 25% before it is converted into the maker score:

```text theme={null}
maker_score = log(1 + min(maker_share, 25%) / 1%) / log(1 + 25% / 1%)
```

This gives additional credit for maker participation above the 1% threshold
without allowing historical volume to dominate the full calculation. Maker
share above 25% receives no additional maker-score credit.

Trades between the same account, or between accounts in the same known rewards
entity, do not count toward maker share.

## Liquidity Score

The order book is sampled repeatedly throughout each reward period. Only
resting liquidity within 20 basis points of the midpoint can score.

### Distance Tiers

| Distance From Midpoint             | Weight |
| ---------------------------------- | -----: |
| Within 5 bps                       |   1.00 |
| More than 5 bps and within 10 bps  |   0.25 |
| More than 10 bps and within 20 bps |   0.10 |
| Beyond 20 bps                      |      0 |

The midpoint is the average of the best bid and best ask. Each tier boundary is
rounded outward to the next valid price tick, so an order is always evaluated
at a valid price for its market.

For each account, side, market, and snapshot, resting notional in the same tier
is added together. Scored notional is capped at **\$100,000 per tier** before the
tier weight is applied.

The same \$100,000 cap applies to every market and independently to each side
and each of the three distance tiers. It is not one shared cap across an
account's entire order book.

```text theme={null}
tier_score = min(resting_notional_in_tier, $100,000) × tier_weight
```

### Two-Sided Liquidity

Bid and ask tier scores are added separately, then combined with a harmonic
mean:

```text theme={null}
snapshot_score = 2 × bid_score × ask_score / (bid_score + ask_score)
```

A snapshot scores only when both sides have nonzero liquidity within 20 bps.
The harmonic mean penalizes an imbalanced book and produces a score of zero when
either side is absent.

## Uptime

Uptime is the share of completed snapshots in which the account had qualifying
liquidity on both sides:

```text theme={null}
uptime = qualifying_snapshots / completed_snapshots
```

The active liquidity score is the account's average snapshot score across its
qualifying snapshots. Keeping liquidity quality and uptime separate means deep
quotes receive credit when they are live, while intermittent quoting is still
penalized.

## Summary Of Program Parameters

| Parameter                | Value                  |
| ------------------------ | ---------------------- |
| Daily program budget     | \$75,000               |
| Reward period            | 12:00 UTC to 12:00 UTC |
| Maker-share lookback     | 7 days                 |
| Eligibility threshold    | 1% maker share         |
| Maker-score cap          | 25% maker share        |
| Maker-score exponent     | 0.35                   |
| Liquidity-score exponent | 0.65                   |
| Uptime exponent          | 1.0                    |
| Scoring bands            | 5, 10, and 20 bps      |
| Band weights             | 1.00, 0.25, and 0.10   |
| Credited notional cap    | \$100,000 per tier     |
| Reference price          | Midpoint               |
| Side combination         | Harmonic mean          |

<Note>
  Polymarket may change program parameters or disqualify activity that is
  manipulative, abusive, or otherwise violates the Terms of Service.
</Note>
