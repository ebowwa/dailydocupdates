<!--
Source: https://docs.polymarket.com/market-makers/maker-rebates.md
Downloaded: 2026-02-22T05:01:17.206Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Maker Rebates Program

> Earn daily USDC rebates by providing liquidity on Polymarket

Polymarket has enabled taker fees on **15-minute crypto markets**, **5-minute crypto markets**, **NCAAB (college basketball)**, and **Serie A** markets. These fees fund a **Maker Rebates** program that pays daily USDC rebates to liquidity providers.

***

## Why Maker Rebates

Sports markets benefit from the same dynamics as crypto markets. When liquidity is deeper:

* Spreads tend to be tighter
* Price impact is lower
* Fills are more reliable
* Markets are more resilient during volatility

Maker Rebates incentivize **consistent, competitive quoting** so everyone gets a better trading experience.

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

| Market Type             | Period        | Maker Rebate | Distribution Method |
| ----------------------- | ------------- | ------------ | ------------------- |
| 15-Min Crypto           | Jan 19, 2026+ | 20%          | Fee-curve weighted  |
| 5-Min Crypto            | Feb 12, 2026+ | 20%          | Fee-curve weighted  |
| Sports (NCAAB, Serie A) | Feb 18, 2026+ | 25%          | Fee-curve weighted  |

<Note>
  Polymarket collects taker fees in eligible markets (15-minute crypto, 5-minute
  crypto, NCAAB, and Serie A). The rebate percentage is at the sole discretion
  of Polymarket and may change over time.
</Note>

***

## Fee-Curve Weighted Rebates

Rebates are distributed using the **same formula as taker fees**. This ensures makers are rewarded proportionally to the fee value their liquidity generates.

For each filled maker order:

```text  theme={null}
fee_equivalent = C × p × feeRate × (p × (1 - p))^exponent
```

Where **C** = number of shares traded and **p** = price of the shares. The fee parameters differ by market type:

| Parameter | Sports (NCAAB, Serie A) | 5-Min & 15-Min Crypto |
| --------- | ----------------------- | --------------------- |
| Fee Rate  | 0.0175                  | 0.25                  |
| Exponent  | 1                       | 2                     |

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

### Fee Table

<Tabs>
  <Tab title="5-Min and 15-Min Crypto">
    | Price  | Trade Value | Fee (USDC) | Effective Rate |
    | ------ | ----------- | ---------- | -------------- |
    | \$0.01 | \$1         | \$0.00     | 0.00%          |
    | \$0.05 | \$5         | \$0.003    | 0.06%          |
    | \$0.10 | \$10        | \$0.02     | 0.20%          |
    | \$0.15 | \$15        | \$0.06     | 0.41%          |
    | \$0.20 | \$20        | \$0.13     | 0.64%          |
    | \$0.25 | \$25        | \$0.22     | 0.88%          |
    | \$0.30 | \$30        | \$0.33     | 1.10%          |
    | \$0.35 | \$35        | \$0.45     | 1.29%          |
    | \$0.40 | \$40        | \$0.58     | 1.44%          |
    | \$0.45 | \$45        | \$0.69     | 1.53%          |
    | \$0.50 | \$50        | \$0.78     | **1.56%**      |
    | \$0.55 | \$55        | \$0.84     | 1.53%          |
    | \$0.60 | \$60        | \$0.86     | 1.44%          |
    | \$0.65 | \$65        | \$0.84     | 1.29%          |
    | \$0.70 | \$70        | \$0.77     | 1.10%          |
    | \$0.75 | \$75        | \$0.66     | 0.88%          |
    | \$0.80 | \$80        | \$0.51     | 0.64%          |
    | \$0.85 | \$85        | \$0.35     | 0.41%          |
    | \$0.90 | \$90        | \$0.18     | 0.20%          |
    | \$0.95 | \$95        | \$0.05     | 0.06%          |
    | \$0.99 | \$99        | \$0.00     | 0.00%          |

    The maximum effective fee rate is **1.56%** at 50% probability. Fees decrease symmetrically toward both extremes.
  </Tab>

  <Tab title="Sports - NCAAB and Serie A">
    | Price  | Trade Value | Fee (USDC) | Effective Rate |
    | ------ | ----------- | ---------- | -------------- |
    | \$0.01 | \$1         | \$0.00     | 0.02%          |
    | \$0.05 | \$5         | \$0.00     | 0.08%          |
    | \$0.10 | \$10        | \$0.02     | 0.16%          |
    | \$0.15 | \$15        | \$0.03     | 0.22%          |
    | \$0.20 | \$20        | \$0.06     | 0.28%          |
    | \$0.25 | \$25        | \$0.08     | 0.33%          |
    | \$0.30 | \$30        | \$0.11     | 0.37%          |
    | \$0.35 | \$35        | \$0.14     | 0.40%          |
    | \$0.40 | \$40        | \$0.17     | 0.42%          |
    | \$0.45 | \$45        | \$0.19     | 0.43%          |
    | \$0.50 | \$50        | \$0.22     | **0.44%**      |
    | \$0.55 | \$55        | \$0.24     | 0.43%          |
    | \$0.60 | \$60        | \$0.25     | 0.42%          |
    | \$0.65 | \$65        | \$0.26     | 0.40%          |
    | \$0.70 | \$70        | \$0.26     | 0.37%          |
    | \$0.75 | \$75        | \$0.25     | 0.33%          |
    | \$0.80 | \$80        | \$0.22     | 0.28%          |
    | \$0.85 | \$85        | \$0.19     | 0.22%          |
    | \$0.90 | \$90        | \$0.14     | 0.16%          |
    | \$0.95 | \$95        | \$0.08     | 0.08%          |
    | \$0.99 | \$99        | \$0.02     | 0.02%          |

    The maximum effective fee rate is **0.44%** at 50% probability. Fees decrease symmetrically toward both extremes.
  </Tab>
</Tabs>

### Fee Precision

Fees are rounded to 4 decimal places. The smallest fee charged is 0.0001 USDC. Anything smaller rounds to zero, so very small trades near the extremes may incur no fee at all.

***

## Which Markets Are Eligible

The following market types have taker fees enabled and are eligible for maker rebates:

* **15-minute crypto markets**
* **5-minute crypto markets**
* **NCAAB (college basketball) markets** (starting February 18, 2026 for new markets)
* **Serie A markets** (starting February 18, 2026 for new markets)

All other markets remain fee-free.

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
    15-minute crypto markets, 5-minute crypto markets, and starting February 18,
    2026, NCAAB and Serie A markets.
  </Accordion>

  <Accordion title="Is Polymarket charging fees on all markets">
    No. Fees apply only to 15-minute crypto, 5-minute crypto, NCAAB, and Serie A
    markets. All other markets remain fee-free.
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
