<!--
Source: https://docs.polymarket.com/perps/learn-about-trading/margin.md
Downloaded: 2026-07-07T21:24:50.545Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Margin

> Initial margin, maintenance margin, and equity calculations

Margin is the collateral required to open and maintain leveraged positions. It
ensures traders have enough collateral to cover potential losses and gives the
system a buffer to close positions before they become insolvent.

There are two thresholds. **Initial margin (IM)** is the collateral required to
open or increase a position. **Maintenance margin (MM)** is the minimum
collateral required to keep a position open. When equity drops below maintenance
margin, the position is [liquidated](/perps/learn-about-trading/liquidation-mechanics).

## Equity

Equity is the real-time value of an account, incorporating all open positions at
current Mark Price.

```text theme={null}
Equity = Collateral + UnrealizedPnL(Mark) - FeesDue - FundingDue
```

### Unrealized PnL

```text theme={null}
Long PnL = PositionSize * (Mark - EntryPrice)
Short PnL = PositionSize * (EntryPrice - Mark)
```

Because equity depends on Mark Price, equity follows live mark updates. See
[Mark Price](/perps/learn-about-trading/mark-price).

## Margin Requirements

```text theme={null}
IM = Notional / L_max
MM = Notional / L_maint
```

Margin requirements scale with position size through leverage tiers. Larger
positions require proportionally more margin. Margin is calculated incrementally
across tiers, so a position spanning two tiers uses the lower tier's rate on
notional up to its upper bound and the next tier's rate on the remainder.

Margin requirements are static across sessions.

## Margin States

An account is always in one of three states.

| State       | Condition           | What Happens                                   |
| ----------- | ------------------- | ---------------------------------------------- |
| Healthy     | `Equity >= IM`      | Normal trading                                 |
| Margin call | `MM <= Equity < IM` | Can only reduce exposure or deposit collateral |
| Liquidation | `Equity < MM`       | The system begins closing the position         |

## Margin Checks

### Pre-Trade

Before any order executes, the system verifies the account can afford it:

1. Compute the new position after the order fills.
2. Calculate required initial margin using the market's leverage tiers.
3. Reject the order if equity is below required initial margin.

This prevents accounts from entering a margin-call state through new trades.

### Continuous Monitoring

The system continuously evaluates accounts:

* If equity falls below maintenance margin, liquidation begins.
* If equity is between maintenance margin and initial margin, the account may enter reduce-only mode.

## Deposits and Withdrawals

Deposits increase equity. A deposit during margin call can restore the account to
healthy status immediately.

Withdrawals require the account to remain above required initial margin after the
withdrawal. You cannot withdraw yourself into a margin call.
