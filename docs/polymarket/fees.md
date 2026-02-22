<!--
Source: https://docs.polymarket.com/trading/fees.md
Downloaded: 2026-02-22T04:08:22.296Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fees

> Understanding trading fees on Polymarket

Polymarket does not charge fees on most markets. However, certain markets have taker fees enabled to fund the [Maker Rebates Program](/market-makers/maker-rebates).

***

## Fee-Free Markets

The vast majority of Polymarket markets have **no trading fees**:

* No fees to deposit or withdraw USDC (though intermediaries like Coinbase or MoonPay may charge their own fees)
* No fees to trade shares

***

## Markets With Fees

The following market types charge a small taker fee on each trade. These fees are collected and redistributed daily to market makers as rebates, incentivizing deeper liquidity and tighter spreads.

* **15-minute crypto markets**
* **5-minute crypto markets**
* **NCAAB (college basketball) markets** (starting February 18, 2026 for new markets)
* **Serie A markets** (starting February 18, 2026 for new markets)

### Fee Structure

Fees are calculated using the following formula:

```text  theme={null}
fee = C × feeRate × (p × (1 - p))^exponent
```

Where **C** = number of shares traded and **p** = price of the shares. The fee parameters differ by market type:

| Parameter      | Sports (NCAAB, Serie A) | 5-Min & 15-Min Crypto |
| -------------- | ----------------------- | --------------------- |
| Fee Rate       | 0.0175                  | 0.25                  |
| Exponent       | 1                       | 2                     |
| Maker Rebate % | 25%                     | 20%                   |

Taker fees are calculated in USDC and vary based on the share price. However, fees are collected in shares on buy orders and USDC on sell orders. The effective rate **peaks at 50%** probability and decreases symmetrically toward the extremes.

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

Fees are rounded to 4 decimal places. The smallest fee charged is **0.0001 USDC**. Anything smaller rounds to zero, so very small trades near the extremes may incur no fee at all.

***

## Identifying Fee-Enabled Markets

The following market types have fees enabled:

* **15-minute crypto markets**
* **5-minute crypto markets**
* **NCAAB (college basketball) markets** (starting February 18, 2026 for new markets)
* **Serie A markets** (starting February 18, 2026 for new markets)

Query the fee-rate endpoint to check any specific market. See the [API Reference](/api-reference/introduction) for full endpoint documentation.

```bash  theme={null}
GET https://clob.polymarket.com/fee-rate?token_id={token_id}
```

***

## Fee Handling for API Users

### Using the SDK

The official CLOB clients **automatically handle fees** for you — they fetch the fee rate and include it in the signed order payload.

<CardGroup cols={3}>
  <Card title="TypeScript" icon="js" href="https://github.com/Polymarket/clob-client">
    npm install @polymarket/clob-client\@latest
  </Card>

  <Card title="Python" icon="python" href="https://github.com/Polymarket/py-clob-client">
    pip install --upgrade py-clob-client
  </Card>

  <Card title="Rust" icon="rust" href="https://github.com/Polymarket/rs-clob-client">
    cargo add polymarket-client-sdk
  </Card>
</CardGroup>

**What the client does automatically:**

1. Fetches the fee rate for the market's token ID
2. Includes `feeRateBps` in the order structure
3. Signs the order with the fee rate included

**You don't need to do anything extra.** Your orders will work on fee-enabled markets.

### Using the REST API

If you're calling the REST API directly or building your own order signing, you must manually include the fee rate in your signed order payload.

**Step 1:** Fetch the fee rate for the token ID before creating your order:

```bash  theme={null}
GET https://clob.polymarket.com/fee-rate?token_id={token_id}
```

See the [fee-rate API Reference](/api-reference/introduction) for full response details. Fee-enabled markets return a non-zero value; fee-free markets return `0`.

**Step 2:** Add the `feeRateBps` field to your order object. This value is part of the signed payload — the CLOB validates your signature against it.

```json  theme={null}
{
  "salt": "12345",
  "maker": "0x...",
  "signer": "0x...",
  "taker": "0x...",
  "tokenId": "71321045679252212594626385532706912750332728571942532289631379312455583992563",
  "makerAmount": "50000000",
  "takerAmount": "100000000",
  "expiration": "0",
  "nonce": "0",
  "feeRateBps": "1000",
  "side": "0",
  "signatureType": 2,
  "signature": "0x..."
}
```

**Step 3:** Sign and submit:

1. Include `feeRateBps` in the order object **before signing**
2. Sign the complete order
3. POST to the order endpoint

<Note>
  Always fetch `fee_rate_bps` dynamically — do not hardcode. The fee rate varies
  by market type and may change over time. You only need to pass `feeRateBps`.
</Note>

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Maker Rebates Program" icon="coins" href="/market-makers/maker-rebates">
    Learn how taker fees fund daily USDC rebates for liquidity providers.
  </Card>

  <Card title="Place Orders" icon="plus" href="/trading/quickstart">
    Start placing orders on Polymarket.
  </Card>
</CardGroup>
