> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Funding

> Funding rate calculation and settlement

Unlike futures contracts, perpetuals have no expiry date. Funding is the
mechanism that keeps the perpetual price anchored to the underlying's fair value.
When the perpetual trades above Index, longs pay shorts. When it trades below
Index, shorts pay longs.

Funding runs continuously across all sessions, regardless of whether the
underlying reference market is open. This keeps the convergence incentive active
and prevents positions from being left unanchored from fair value.

## How Funding Works

Funding is computed in three stages:

1. A premium index is sampled from the order book every 5 seconds.
2. Samples are averaged over the 1-hour charge window to produce an hourly rate.
3. The rate is settled against every open position at the end of the window.

### Premium Index

Every 5 seconds, the protocol takes one snapshot per market of how far the book
has drifted from Index. It walks the book for a fixed quote notional on each side.

```text theme={null}
bid_impact = VWAP of top bids filling 1,000 quote notional
ask_impact = VWAP of top asks filling 1,000 quote notional
```

If one side of the book cannot fill the notional because it is too thin or empty,
that side falls back to Index, which zeros its contribution.

The impact price difference and premium index are:

```text theme={null}
IPD = max(bid_impact - Index, 0) - max(Index - ask_impact, 0)
PremiumIndex = IPD / Index
```

A positive premium means the perpetual is trading rich versus Index. A negative
premium means it is trading cheap.

### Funding Rate

At the end of each charge window, premium samples are averaged, passed through the
8-hour funding formula, divided by 8 to get an hourly rate, and capped.

```text theme={null}
mean_P = average of PremiumIndex samples over the window
scale = 1.0 for crypto markets; 0.5 otherwise
F_8h = scale * (mean_P + clamp(0.0001 - mean_P, +/-0.0005))
FR_hour = clamp(F_8h / 8, +/-0.04)
```

* The 0.01% term is a fixed interest leg per 8 hours.
* The +/-0.05% clamp bounds the interest-versus-premium adjustment.
* Crypto markets use a 1.0 scale.
* Non-crypto markets use a 0.5 scale.
* The 4% per hour cap prevents extreme funding during sustained dislocation.

### Payment

At the end of each charge window, every open position in the market settles a
funding payment proportional to position size and the hourly rate.

| Condition                             | Longs   | Shorts  |
| ------------------------------------- | ------- | ------- |
| Hourly rate > 0, perp rich vs Index   | Pay     | Receive |
| Hourly rate \< 0, perp cheap vs Index | Receive | Pay     |

Funding is a direct transfer between longs and shorts. The protocol takes no cut.
Settlement credits or debits the quote balance, and realized funding is tracked
separately from trading PnL.

### Interval

The charge window is 1 hour. Samples are averaged over the hour, and the hourly
rate is applied once at the end.

Between settlements, rolling premium samples and implied rates are published so
traders can see funding pressure build in real time.

## Parameters

| Parameter        | Default                   | Description                               |
| ---------------- | ------------------------- | ----------------------------------------- |
| Sample interval  | 5 seconds                 | Cadence of premium index samples          |
| Impact notional  | 1,000 quote notional      | Quote notional used for impact VWAP       |
| Interest leg     | 0.01% per 8 hours         | Fixed component in the 8-hour formula     |
| Interest clamp   | +/-0.05%                  | Symmetric clamp on interest minus premium |
| Funding scale    | 1.0 crypto; 0.5 otherwise | Multiplier applied to the 8-hour formula  |
| Charge window    | 1 hour                    | Interval between funding settlements      |
| Funding rate cap | 4% per hour               | Maximum absolute hourly funding rate      |
