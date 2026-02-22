<!--
Source: https://docs.polymarket.com/market-makers/liquidity-rewards.md
Downloaded: 2026-02-22T05:01:17.206Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Liquidity Rewards

> Earn rewards for providing liquidity on Polymarket

By posting resting limit orders, liquidity providers (makers) are automatically eligible for Polymarket's incentive program. Rewards are distributed directly to maker addresses daily at midnight UTC.

The program is designed to:

* Catalyze liquidity across all markets
* Encourage liquidity throughout a market's entire lifecycle
* Motivate passive, balanced quoting tight to a market's midpoint
* Encourage trading activity
* Discourage blatantly exploitative behaviors

<Info>
  This program is heavily inspired by [dYdX's liquidity provider
  rewards](https://www.dydx.foundation/blog/liquidity-provider-rewards). The
  methodology is essentially a copy of dYdX's approach with adjustments for
  binary contract markets — distinct books, no staking mechanic, a modified
  order utility-relative depth function, and reward amounts isolated per market.
</Info>

***

## Methodology

Liquidity providers are rewarded based on a formula that rewards participation in markets, boosts two-sided depth (single-sided orders still score), and tighter spread vs the size-cutoff-adjusted midpoint. Each market configures a max spread and min size cutoff within which orders are considered. The average of rewards earned is determined by the relative share of each participant's Q<sub>n</sub> in market m.

### Variables

| Variable       | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| S              | Order position scoring function                                  |
| v              | Max spread from midpoint (in cents)                              |
| s              | Spread from size-cutoff-adjusted midpoint                        |
| b              | In-game multiplier                                               |
| m              | Market                                                           |
| m'             | Market complement (i.e. NO if m = YES)                           |
| n              | Trader index                                                     |
| u              | Sample index                                                     |
| c              | Scaling factor (currently 3.0 on all markets)                    |
| Q<sub>ne</sub> | Point total for book one for a sample                            |
| Q<sub>no</sub> | Point total for book two for a sample                            |
| Spread%        | Distance from midpoint (bps or relative) for order n in market m |
| BidSize        | Share-denominated quantity of bid                                |
| AskSize        | Share-denominated quantity of ask                                |

***

## Equations

### 1. Order Scoring Function

Quadratic scoring rule for an order based on position between the adjusted midpoint and the minimum qualifying spread:

$S(v,s)= (\frac{v-s}{v})^2 \cdot b$

### 2. First Market Side Score

$Q_{one}= S(v,Spread_{m_1}) \cdot BidSize_{m_1} + S(v,Spread_{m_2}) \cdot BidSize_{m_2} + \dots $
$ + S(v, Spread_{m^\prime_1}) \cdot AskSize_{m^\prime_1} + S(v, Spread_{m^\prime_2}) \cdot AskSize_{m^\prime_2}$

### 3. Second Market Side Score

$Q_{two}= S(v,Spread_{m_1}) \cdot AskSize_{m_1} + S(v,Spread_{m_2}) \cdot AskSize_{m_2} + \dots $
$ + S(v, Spread_{m^\prime_1}) \cdot BidSize_{m^\prime_1} + S(v, Spread_{m^\prime_2}) \cdot BidSize_{m^\prime_2}$

### 4. Minimum Score

Boosts two-sided liquidity by taking the minimum of Q<sub>ne</sub> and Q<sub>no</sub>, while still rewarding single-sided liquidity at a reduced rate (divided by c).

**If midpoint is in range \[0.10, 0.90]** — single-sided liquidity can score:

$Q_{\min} = \max(\min({Q_{one}, Q_{two}}), \max(Q_{one}/c, Q_{two}/c))$

**If midpoint is in range \[0, 0.10) or (0.90, 1.0]** — liquidity must be double-sided to score:

$Q_{\min} = \min({Q_{one}, Q_{two}})$

### 5. Normalized Score

Q<sub>min</sub> of a market maker divided by the sum of all Q<sub>min</sub> across market makers in a given sample:

$Q_{normal} = \frac{Q_{min}}{\sum_{n=1}^{N}{(Q_{min})_n}}$

### 6. Epoch Score

Sum of all Q<sub>normal</sub> for a trader across all samples in an epoch:

$Q_{epoch} = \sum_{u=1}^{10,080}{(Q_{normal})_u}$

### 7. Final Score

Normalizes Q<sub>epoch</sub> by dividing by the sum of all market makers' Q<sub>epoch</sub> in a given epoch. This value is multiplied by the rewards available for the market to get a trader's reward:

$Q_{final}=\frac{Q_{epoch}}{\sum_{n=1}^{N}{(Q_{epoch})_n}}$

***

## Worked Example

Assume an adjusted market midpoint of 0.50 and a max spread config of 3 cents for both m and m'.

### Step 2 - First Side Score

A trader has the following open orders:

* 100Q bid on m @ 0.49 (spread = 1 cent)
* 200Q bid on m @ 0.48 (spread = 2 cents)
* 100Q ask on m' @ 0.51 (spread = 1 cent)

$$
Q_{ne} = \left( \frac{(3-1)}{3} \right)^2 \cdot 100 + \left( \frac{(3-2)}{3} \right)^2 \cdot 200 + \left( \frac{(3-1)}{3} \right)^2 \cdot 100
$$

Q<sub>ne</sub> is calculated every minute using random sampling.

### Step 3 - Second Side Score

The same trader also has:

* 100Q bid on m @ 0.485 (spread = 1.5 cents)
* 100Q bid on m' @ 0.48 (spread = 2 cents)
* 200Q ask on m' @ 0.505 (spread = 0.5 cents)

$$
Q_{no} = \left( \frac{(3-1.5)}{3} \right)^2 \cdot 100 + \left( \frac{(3-2)}{3} \right)^2 \cdot 100 + \left( \frac{(3-.5)}{3} \right)^2 \cdot 200
$$

Q<sub>no</sub> is calculated every minute using random sampling.

### Steps 4-7

4. Take the minimum of Q<sub>ne</sub> and Q<sub>no</sub> (with single-sided adjustment if midpoint is in \[0.10, 0.90])
5. Normalize against all other market makers in the sample
6. Sum across all 10,080 samples in the epoch
7. Normalize again to get final reward share

***

<Note>
  The minimum reward payout is **\$1**; amounts below this will not be paid.
</Note>

<Tip>
  Both `min_incentive_size` and `max_incentive_spread` can be fetched alongside
  full market objects via the CLOB API and [Markets
  API](/market-data/fetching-markets). Reward allocations for an epoch can also
  be fetched via the Markets API.
</Tip>

## Next Steps

<CardGroup cols={2}>
  <Card title="Trading" icon="chart-line" href="/market-makers/trading">
    Order entry and quoting best practices
  </Card>

  <Card title="Maker Rebates" icon="receipt" href="/market-makers/maker-rebates">
    Earn USDC rebates on 15-minute crypto markets
  </Card>
</CardGroup>
