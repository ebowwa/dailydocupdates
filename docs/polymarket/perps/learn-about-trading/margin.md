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

Initial margin is set by your configured leverage:

```text theme={null}
IM = Notional / Leverage
```

Leverage tiers cap the leverage available as your position grows — larger
positions must run at lower leverage and therefore post proportionally more
initial margin. The cap is enforced against your worst-case position notional
(position plus resting orders on the heavier side): an order that would grow it
into a tier whose `max_leverage` is below your configured leverage is rejected
with `invalid_leverage`, and you must lower your leverage setting first. Your
configured leverage applies to your entire notional, not bracket by bracket.
Fetch each market's tier schedule from
[Market Data](/perps/market-data#fetch-instruments).

Maintenance margin uses a flat per-market rate, independent of position size,
tier, and your leverage setting:

```text theme={null}
MM = Notional × MMR        where MMR = 0.5 / MaxLeverage
```

`MaxLeverage` is the market's maximum leverage, so on a 20x market
`MMR = 2.5%` for every position. MM equals half the initial margin of a
position opened at max leverage; at lower leverage your IM is higher but MM
stays the same, so the gap between entry requirement and liquidation grows.

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
