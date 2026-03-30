<!--
Source: https://docs.polymarket.com/market-makers/maker-rebates.md
Downloaded: 2026-03-30T20:17:11.839Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Maker Rebates Program

> Earn daily USDC rebates by providing liquidity on Polymarket

Polymarket has enabled taker fees across multiple market categories. These fees fund a **Maker Rebates** program that pays daily USDC rebates to liquidity providers.

***

## Why Maker Rebates

Deeper liquidity means tighter spreads, lower price impact, more reliable fills, and greater resilience during volatility. Maker Rebates incentivize **consistent, competitive quoting** so everyone gets a better trading experience.

***

## How Maker Rebates Work

* **Paid daily in USDC:** Rebates are calculated and distributed every day.
* **Performance-based:** You earn based on the share of liquidity you provided that actually got taken.

### Eligibility

Place orders that add liquidity to the book and get filled (i.e., your liquidity is taken by another trader).

### Payment

Rebates are paid daily in USDC, directly to your wallet.

***

## Funding

Maker Rebates are funded by taker fees collected in eligible markets. A percentage of these fees are redistributed to makers who keep the markets liquid. The rebate percentage differs by market type.

| Category        | Maker Rebate | Distribution Method |
| --------------- | ------------ | ------------------- |
| Crypto          | 20%          | Fee-curve weighted  |
| Sports          | 25%          | Fee-curve weighted  |
| Finance         | 50%          | Fee-curve weighted  |
| Politics        | 25%          | Fee-curve weighted  |
| Economics       | 25%          | Fee-curve weighted  |
| Culture         | 25%          | Fee-curve weighted  |
| Weather         | 25%          | Fee-curve weighted  |
| Other / General | 25%          | Fee-curve weighted  |
| Mentions        | 25%          | Fee-curve weighted  |
| Tech            | 25%          | Fee-curve weighted  |
| Geopolitics     | —            | Fee-free            |

<Note>
  Polymarket collects taker fees in eligible markets across all fee-enabled categories.
  The rebate percentage is at the sole discretion of Polymarket
  and may change over time.
</Note>

***

## Fee-Curve Weighted Rebates

Rebates are distributed using the **same formula as taker fees**. This ensures makers are rewarded proportionally to the fee value their liquidity generates.

For each filled maker order:

```text  theme={null}
fee_equivalent = C × p × feeRate × (p × (1 - p))^exponent
```

Where **C** = number of shares traded and **p** = price of the shares. The fee parameters differ by market type:

| Category        | Taker Fee Rate | Maker Fee Rate | Exponent |
| --------------- | -------------- | -------------- | -------- |
| Crypto          | 0.072          | 0              | 1        |
| Sports          | 0.03           | 0              | 1        |
| Finance         | 0.04           | 0              | 1        |
| Politics        | 0.04           | 0              | 1        |
| Economics       | 0.03           | 0              | 0.5      |
| Culture         | 0.05           | 0              | 1        |
| Weather         | 0.025          | 0              | 0.5      |
| Other / General | 0.2            | 0              | 2        |
| Mentions        | 0.25           | 0              | 2        |
| Tech            | 0.04           | 0              | 1        |
| Geopolitics     | 0              | 0              | —        |

Your daily rebate:

```text  theme={null}
rebate = (your_fee_equivalent / total_fee_equivalent) * rebate_pool
```

Totals are calculated per market, so you only compete with other makers in the same market.

***

## Taker Fee Structure

Taker fees are calculated in USDC and vary based on the share price. However, fees are collected in shares on buy orders and USDC on sell orders. Fees are highest at 50% probability and lowest at the extremes (near 0% or 100%).

<Frame>
  <div className="p-3 bg-white rounded-xl">
    <iframe title="Fee Curves" aria-label="Line chart" id="datawrapper-chart-qTzMH" src="https://datawrapper.dwcdn.net/qTzMH/1/" scrolling="no" frameborder="0" width={700} style={{ width: "0", minWidth: "100% !important", border: "none" }} height="450" data-external="1" />
  </div>
</Frame>

### Fee Tables (100 Shares)

For detailed fee tables for each market category, see the [Fees](/trading/fees) page.

### Fee Precision

Fees are rounded to 4 decimal places. The smallest fee charged is 0.0001 USDC. Anything smaller rounds to zero, so very small trades near the extremes may incur no fee at all.

***

## Which Markets Are Eligible

The following market categories have taker fees enabled and are eligible for maker rebates: Crypto, Sports, Finance, Politics, Economics, Culture, Weather, Tech, Mentions, and Other / General.

<Note>
  Fees apply only to markets deployed on or after the activation date. Pre-existing markets are unaffected. Markets with fees enabled have `feesEnabled` set to `true` on the market object.
</Note>

***

## FAQ

<AccordionGroup>
  <Accordion title="How do I qualify for maker rebates">
    Place orders that add liquidity to the book and get filled (i.e., your
    liquidity is taken by another trader).
  </Accordion>

  <Accordion title="When are rebates paid">Daily, in USDC.</Accordion>

  <Accordion title="How are rebates calculated">
    Rebates are proportional to your share of executed maker liquidity in each
    eligible market. Totals are calculated per market, so you only compete with
    other makers in the same market.
  </Accordion>

  <Accordion title="Where does the rebate pool come from">
    Taker fees collected in eligible markets are allocated to the maker rebate
    pool and distributed daily.
  </Accordion>

  <Accordion title="Which markets have fees enabled">
    Crypto, Sports, Finance, Politics, Economics, Culture, Weather, Tech, Mentions, and Other / General markets. Fees only apply to markets deployed on or after the activation date.
  </Accordion>

  <Accordion title="Is Polymarket charging fees on all markets">
    Fees apply to markets in fee-enabled categories. Markets with fees enabled have `feesEnabled` set to `true` on the market object.
  </Accordion>
</AccordionGroup>

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Fee Structure" icon="receipt" href="/trading/fees">
    Full fee handling guide for SDK and REST API users.
  </Card>

  <Card title="Place Orders" icon="plus" href="/trading/quickstart">
    Start placing orders on Polymarket.
  </Card>
</CardGroup>


Built with [Mintlify](https://mintlify.com).