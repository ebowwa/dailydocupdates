<!--
Source: https://docs.polymarket.com/perps/learn-about-trading/fees.md
Downloaded: 2026-07-07T21:24:50.544Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fees

> Flat maker and taker trading fees for Polymarket Perps

Every Perps fill uses the same fee schedule, regardless of account volume or
maker share.

## Fee Calculation

For each fill, the fee is calculated on the notional value of the trade:

```text theme={null}
Fee = abs(Price * Quantity) * Rate
```

Fees are denominated in the instrument's quote asset (pUSD).

| Side  | Rate     | Basis Points |
| ----- | -------- | ------------ |
| Maker | -0.0050% | -0.5 bp      |
| Taker | 0.0200%  | 2 bp         |

A negative maker fee is a rebate. The maker receives the rebate amount, and the
fee recipient is debited by the same amount in the internal ledger.

If you're integrating Perps, read the current fee schedule from
[Trading Fees](/perps/trading#trading-fees).

## Fee Metrics

Trailing 7-day activity metrics are available for visibility. These metrics are
informational only. They do not affect the maker or taker fee rate.

| Metric              | Meaning                                                                        |
| ------------------- | ------------------------------------------------------------------------------ |
| Total volume        | Total Perps trading volume                                                     |
| Taker volume        | Perps volume that removed liquidity                                            |
| Maker volume        | Perps volume that added liquidity                                              |
| Account maker share | Account maker volume divided by total exchange volume                          |
| Entity maker share  | Entity maker volume divided by total exchange volume, when the account has one |

These metrics are cached by UTC day and may be stale by up to 24 hours.

If you're integrating Perps, read account metrics from
[Account Stats](/perps/account-management#account-stats).

## Fee Accounting

Collected taker fees are credited to the configured fee recipient's internal
ledger account. Maker rebates are debited from the same account.
