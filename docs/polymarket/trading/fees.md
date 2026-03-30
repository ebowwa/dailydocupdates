<!--
Source: https://docs.polymarket.com/trading/fees.md
Downloaded: 2026-03-30T20:17:11.841Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fees

> Understanding trading fees on Polymarket

Polymarket charges a small taker fee on certain markets. These fees fund the [Maker Rebates Program](/market-makers/maker-rebates), which redistributes fees daily to market makers to incentivize deeper liquidity and tighter spreads.

**Geopolitical and world events markets are fee-free.** Polymarket does not charge fees or profit from trading activity on these markets. There are also no Polymarket fees to deposit or withdraw USDC (though intermediaries like Coinbase or MoonPay may charge their own fees).

<Note>
  Fees apply only to markets deployed on or after the activation date. Pre-existing markets are unaffected. Markets with fees enabled have `feesEnabled` set to `true` on the market object.
</Note>

***

## Fee Structure

Fees are calculated using the following formula:

```text  theme={null}
fee = C × p × feeRate × (p × (1 - p))^exponent
```

Where **C** = number of shares traded and **p** = price of the shares.

**Makers are never charged fees.** Only takers pay fees. The fee parameters differ by market category:

| Category        | Taker Fee Rate | Maker Fee Rate | Exponent | Maker Rebate | Peak Effective Rate |
| --------------- | -------------- | -------------- | -------- | ------------ | ------------------- |
| Crypto          | 0.072          | 0              | 1        | 20%          | 1.80%               |
| Sports          | 0.03           | 0              | 1        | 25%          | 0.75%               |
| Finance         | 0.04           | 0              | 1        | 50%          | 1.00%               |
| Politics        | 0.04           | 0              | 1        | 25%          | 1.00%               |
| Economics       | 0.03           | 0              | 0.5      | 25%          | 1.50%               |
| Culture         | 0.05           | 0              | 1        | 25%          | 1.25%               |
| Weather         | 0.025          | 0              | 0.5      | 25%          | 1.25%               |
| Other / General | 0.2            | 0              | 2        | 25%          | 1.25%               |
| Mentions        | 0.25           | 0              | 2        | 25%          | 1.56%               |
| Tech            | 0.04           | 0              | 1        | 25%          | 1.00%               |
| Geopolitics     | 0              | 0              | —        | —            | 0%                  |

Taker fees are calculated in USDC and vary based on the share price. However, fees are collected in shares on buy orders and USDC on sell orders. The effective rate **peaks at 50%** probability and decreases symmetrically toward the extremes.

<Frame>
  <div className="p-3 bg-white rounded-xl">
    <iframe title="Fee Curves" aria-label="Line chart" id="datawrapper-chart-qTzMH" src="https://datawrapper.dwcdn.net/qTzMH/1/" scrolling="no" frameborder="0" width={700} style={{ width: "0", minWidth: "100% !important", border: "none" }} height="450" data-external="1" />
  </div>
</Frame>

### Fee Tables (100 Shares)

<Tabs>
  <Tab title="Crypto">
    | Price  | Trade Value | Taker Fee (USDC) | Effective Rate |
    | ------ | ----------- | ---------------- | -------------- |
    | \$0.01 | \$1         | \$0.00           | 0.07%          |
    | \$0.05 | \$5         | \$0.02           | 0.34%          |
    | \$0.10 | \$10        | \$0.06           | 0.65%          |
    | \$0.15 | \$15        | \$0.14           | 0.92%          |
    | \$0.20 | \$20        | \$0.23           | 1.15%          |
    | \$0.25 | \$25        | \$0.34           | 1.35%          |
    | \$0.30 | \$30        | \$0.45           | 1.51%          |
    | \$0.35 | \$35        | \$0.57           | 1.64%          |
    | \$0.40 | \$40        | \$0.69           | 1.73%          |
    | \$0.45 | \$45        | \$0.80           | 1.78%          |
    | \$0.50 | \$50        | \$0.90           | **1.80%**      |
    | \$0.55 | \$55        | \$0.98           | 1.78%          |
    | \$0.60 | \$60        | \$1.04           | 1.73%          |
    | \$0.65 | \$65        | \$1.06           | 1.64%          |
    | \$0.70 | \$70        | \$1.06           | 1.51%          |
    | \$0.75 | \$75        | \$1.01           | 1.35%          |
    | \$0.80 | \$80        | \$0.92           | 1.15%          |
    | \$0.85 | \$85        | \$0.78           | 0.92%          |
    | \$0.90 | \$90        | \$0.58           | 0.65%          |
    | \$0.95 | \$95        | \$0.32           | 0.34%          |
    | \$0.99 | \$99        | \$0.07           | 0.07%          |

    The maximum effective fee rate is **1.80%** at 50% probability. Fees decrease symmetrically toward both extremes.
  </Tab>

  <Tab title="Sports">
    | Price  | Trade Value | Taker Fee (USDC) | Effective Rate |
    | ------ | ----------- | ---------------- | -------------- |
    | \$0.01 | \$1         | \$0.00           | 0.03%          |
    | \$0.05 | \$5         | \$0.01           | 0.14%          |
    | \$0.10 | \$10        | \$0.03           | 0.27%          |
    | \$0.15 | \$15        | \$0.06           | 0.38%          |
    | \$0.20 | \$20        | \$0.10           | 0.48%          |
    | \$0.25 | \$25        | \$0.14           | 0.56%          |
    | \$0.30 | \$30        | \$0.19           | 0.63%          |
    | \$0.35 | \$35        | \$0.24           | 0.68%          |
    | \$0.40 | \$40        | \$0.29           | 0.72%          |
    | \$0.45 | \$45        | \$0.33           | 0.74%          |
    | \$0.50 | \$50        | \$0.38           | **0.75%**      |
    | \$0.55 | \$55        | \$0.41           | 0.74%          |
    | \$0.60 | \$60        | \$0.43           | 0.72%          |
    | \$0.65 | \$65        | \$0.44           | 0.68%          |
    | \$0.70 | \$70        | \$0.44           | 0.63%          |
    | \$0.75 | \$75        | \$0.42           | 0.56%          |
    | \$0.80 | \$80        | \$0.38           | 0.48%          |
    | \$0.85 | \$85        | \$0.33           | 0.38%          |
    | \$0.90 | \$90        | \$0.24           | 0.27%          |
    | \$0.95 | \$95        | \$0.14           | 0.14%          |
    | \$0.99 | \$99        | \$0.03           | 0.03%          |

    The maximum effective fee rate is **0.75%** at 50% probability. Fees decrease symmetrically toward both extremes.
  </Tab>

  <Tab title="Finance / Politics / Tech">
    | Price  | Trade Value | Taker Fee (USDC) | Effective Rate |
    | ------ | ----------- | ---------------- | -------------- |
    | \$0.01 | \$1         | \$0.00           | 0.04%          |
    | \$0.05 | \$5         | \$0.01           | 0.19%          |
    | \$0.10 | \$10        | \$0.04           | 0.36%          |
    | \$0.15 | \$15        | \$0.08           | 0.51%          |
    | \$0.20 | \$20        | \$0.13           | 0.64%          |
    | \$0.25 | \$25        | \$0.19           | 0.75%          |
    | \$0.30 | \$30        | \$0.25           | 0.84%          |
    | \$0.35 | \$35        | \$0.32           | 0.91%          |
    | \$0.40 | \$40        | \$0.38           | 0.96%          |
    | \$0.45 | \$45        | \$0.45           | 0.99%          |
    | \$0.50 | \$50        | \$0.50           | **1.00%**      |
    | \$0.55 | \$55        | \$0.54           | 0.99%          |
    | \$0.60 | \$60        | \$0.58           | 0.96%          |
    | \$0.65 | \$65        | \$0.59           | 0.91%          |
    | \$0.70 | \$70        | \$0.59           | 0.84%          |
    | \$0.75 | \$75        | \$0.56           | 0.75%          |
    | \$0.80 | \$80        | \$0.51           | 0.64%          |
    | \$0.85 | \$85        | \$0.43           | 0.51%          |
    | \$0.90 | \$90        | \$0.32           | 0.36%          |
    | \$0.95 | \$95        | \$0.18           | 0.19%          |
    | \$0.99 | \$99        | \$0.04           | 0.04%          |

    The maximum effective fee rate is **1.00%** at 50% probability. Fees decrease symmetrically toward both extremes.
  </Tab>

  <Tab title="Culture">
    | Price  | Trade Value | Taker Fee (USDC) | Effective Rate |
    | ------ | ----------- | ---------------- | -------------- |
    | \$0.01 | \$1         | \$0.00           | 0.05%          |
    | \$0.05 | \$5         | \$0.01           | 0.24%          |
    | \$0.10 | \$10        | \$0.05           | 0.45%          |
    | \$0.15 | \$15        | \$0.10           | 0.64%          |
    | \$0.20 | \$20        | \$0.16           | 0.80%          |
    | \$0.25 | \$25        | \$0.23           | 0.94%          |
    | \$0.30 | \$30        | \$0.32           | 1.05%          |
    | \$0.35 | \$35        | \$0.40           | 1.14%          |
    | \$0.40 | \$40        | \$0.48           | 1.20%          |
    | \$0.45 | \$45        | \$0.56           | 1.24%          |
    | \$0.50 | \$50        | \$0.62           | **1.25%**      |
    | \$0.55 | \$55        | \$0.68           | 1.24%          |
    | \$0.60 | \$60        | \$0.72           | 1.20%          |
    | \$0.65 | \$65        | \$0.74           | 1.14%          |
    | \$0.70 | \$70        | \$0.74           | 1.05%          |
    | \$0.75 | \$75        | \$0.70           | 0.94%          |
    | \$0.80 | \$80        | \$0.64           | 0.80%          |
    | \$0.85 | \$85        | \$0.54           | 0.64%          |
    | \$0.90 | \$90        | \$0.40           | 0.45%          |
    | \$0.95 | \$95        | \$0.23           | 0.24%          |
    | \$0.99 | \$99        | \$0.05           | 0.05%          |

    The maximum effective fee rate is **1.25%** at 50% probability. Fees decrease symmetrically toward both extremes.
  </Tab>

  <Tab title="Economics">
    | Price  | Trade Value | Taker Fee (USDC) | Effective Rate |
    | ------ | ----------- | ---------------- | -------------- |
    | \$0.01 | \$1         | \$0.00           | 0.30%          |
    | \$0.05 | \$5         | \$0.03           | 0.65%          |
    | \$0.10 | \$10        | \$0.09           | 0.90%          |
    | \$0.15 | \$15        | \$0.16           | 1.07%          |
    | \$0.20 | \$20        | \$0.24           | 1.20%          |
    | \$0.25 | \$25        | \$0.32           | 1.30%          |
    | \$0.30 | \$30        | \$0.41           | 1.37%          |
    | \$0.35 | \$35        | \$0.50           | 1.43%          |
    | \$0.40 | \$40        | \$0.59           | 1.47%          |
    | \$0.45 | \$45        | \$0.67           | 1.49%          |
    | \$0.50 | \$50        | \$0.75           | **1.50%**      |
    | \$0.55 | \$55        | \$0.82           | 1.49%          |
    | \$0.60 | \$60        | \$0.88           | 1.47%          |
    | \$0.65 | \$65        | \$0.93           | 1.43%          |
    | \$0.70 | \$70        | \$0.96           | 1.37%          |
    | \$0.75 | \$75        | \$0.97           | 1.30%          |
    | \$0.80 | \$80        | \$0.96           | 1.20%          |
    | \$0.85 | \$85        | \$0.91           | 1.07%          |
    | \$0.90 | \$90        | \$0.81           | 0.90%          |
    | \$0.95 | \$95        | \$0.62           | 0.65%          |
    | \$0.99 | \$99        | \$0.30           | 0.30%          |

    The maximum effective fee rate is **1.50%** at 50% probability. Fees decrease symmetrically toward both extremes.
  </Tab>

  <Tab title="Weather">
    | Price  | Trade Value | Taker Fee (USDC) | Effective Rate |
    | ------ | ----------- | ---------------- | -------------- |
    | \$0.01 | \$1         | \$0.00           | 0.25%          |
    | \$0.05 | \$5         | \$0.03           | 0.54%          |
    | \$0.10 | \$10        | \$0.08           | 0.75%          |
    | \$0.15 | \$15        | \$0.13           | 0.89%          |
    | \$0.20 | \$20        | \$0.20           | 1.00%          |
    | \$0.25 | \$25        | \$0.27           | 1.08%          |
    | \$0.30 | \$30        | \$0.34           | 1.15%          |
    | \$0.35 | \$35        | \$0.42           | 1.19%          |
    | \$0.40 | \$40        | \$0.49           | 1.22%          |
    | \$0.45 | \$45        | \$0.56           | 1.24%          |
    | \$0.50 | \$50        | \$0.62           | **1.25%**      |
    | \$0.55 | \$55        | \$0.68           | 1.24%          |
    | \$0.60 | \$60        | \$0.73           | 1.22%          |
    | \$0.65 | \$65        | \$0.78           | 1.19%          |
    | \$0.70 | \$70        | \$0.80           | 1.15%          |
    | \$0.75 | \$75        | \$0.81           | 1.08%          |
    | \$0.80 | \$80        | \$0.80           | 1.00%          |
    | \$0.85 | \$85        | \$0.76           | 0.89%          |
    | \$0.90 | \$90        | \$0.67           | 0.75%          |
    | \$0.95 | \$95        | \$0.52           | 0.54%          |
    | \$0.99 | \$99        | \$0.25           | 0.25%          |

    The maximum effective fee rate is **1.25%** at 50% probability. Fees decrease symmetrically toward both extremes.
  </Tab>

  <Tab title="Other / General">
    | Price  | Trade Value | Taker Fee (USDC) | Effective Rate |
    | ------ | ----------- | ---------------- | -------------- |
    | \$0.01 | \$1         | \$0.00           | 0.00%          |
    | \$0.05 | \$5         | \$0.00           | 0.05%          |
    | \$0.10 | \$10        | \$0.02           | 0.16%          |
    | \$0.15 | \$15        | \$0.05           | 0.33%          |
    | \$0.20 | \$20        | \$0.10           | 0.51%          |
    | \$0.25 | \$25        | \$0.18           | 0.70%          |
    | \$0.30 | \$30        | \$0.26           | 0.88%          |
    | \$0.35 | \$35        | \$0.36           | 1.04%          |
    | \$0.40 | \$40        | \$0.46           | 1.15%          |
    | \$0.45 | \$45        | \$0.55           | 1.23%          |
    | \$0.50 | \$50        | \$0.62           | **1.25%**      |
    | \$0.55 | \$55        | \$0.67           | 1.23%          |
    | \$0.60 | \$60        | \$0.69           | 1.15%          |
    | \$0.65 | \$65        | \$0.67           | 1.04%          |
    | \$0.70 | \$70        | \$0.62           | 0.88%          |
    | \$0.75 | \$75        | \$0.53           | 0.70%          |
    | \$0.80 | \$80        | \$0.41           | 0.51%          |
    | \$0.85 | \$85        | \$0.28           | 0.33%          |
    | \$0.90 | \$90        | \$0.15           | 0.16%          |
    | \$0.95 | \$95        | \$0.04           | 0.05%          |
    | \$0.99 | \$99        | \$0.00           | 0.00%          |

    The maximum effective fee rate is **1.25%** at 50% probability. Fees decrease symmetrically toward both extremes.
  </Tab>

  <Tab title="Mentions">
    | Price  | Trade Value | Taker Fee (USDC) | Effective Rate |
    | ------ | ----------- | ---------------- | -------------- |
    | \$0.01 | \$1         | \$0.00           | 0.00%          |
    | \$0.05 | \$5         | \$0.00           | 0.06%          |
    | \$0.10 | \$10        | \$0.02           | 0.20%          |
    | \$0.15 | \$15        | \$0.06           | 0.41%          |
    | \$0.20 | \$20        | \$0.13           | 0.64%          |
    | \$0.25 | \$25        | \$0.22           | 0.88%          |
    | \$0.30 | \$30        | \$0.33           | 1.10%          |
    | \$0.35 | \$35        | \$0.45           | 1.29%          |
    | \$0.40 | \$40        | \$0.58           | 1.44%          |
    | \$0.45 | \$45        | \$0.69           | 1.53%          |
    | \$0.50 | \$50        | \$0.78           | **1.56%**      |
    | \$0.55 | \$55        | \$0.84           | 1.53%          |
    | \$0.60 | \$60        | \$0.86           | 1.44%          |
    | \$0.65 | \$65        | \$0.84           | 1.29%          |
    | \$0.70 | \$70        | \$0.77           | 1.10%          |
    | \$0.75 | \$75        | \$0.66           | 0.88%          |
    | \$0.80 | \$80        | \$0.51           | 0.64%          |
    | \$0.85 | \$85        | \$0.35           | 0.41%          |
    | \$0.90 | \$90        | \$0.18           | 0.20%          |
    | \$0.95 | \$95        | \$0.05           | 0.06%          |
    | \$0.99 | \$99        | \$0.00           | 0.00%          |

    The maximum effective fee rate is **1.56%** at 50% probability. Fees decrease symmetrically toward both extremes.
  </Tab>
</Tabs>

### Fee Precision

Fees are rounded to 4 decimal places. The smallest fee charged is **0.0001 USDC**. Anything smaller rounds to zero, so very small trades near the extremes may incur no fee at all.

***

## Identifying Fee-Enabled Markets

Markets with fees have `feesEnabled` set to `true` on the market object. You can also query the fee-rate endpoint to check any specific market. See the [API Reference](/api-reference/introduction) for full endpoint documentation.

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


Built with [Mintlify](https://mintlify.com).