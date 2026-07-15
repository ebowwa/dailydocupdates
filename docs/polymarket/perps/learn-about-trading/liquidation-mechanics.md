> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Liquidation Mechanics

> Detection, execution, and insurance-fund backstop

When a trader's equity drops below maintenance margin, the system closes the
position before it becomes insolvent. Normal liquidations route through the order
book as reduce-only immediate-or-cancel orders. If the breach is severe, the
position is absorbed directly by the insurance fund instead.

## Trigger

An account or isolated position is at risk when:

```text theme={null}
MarginRatio = Equity / MaintenanceMargin
```

Liquidation starts when `MarginRatio < 1.0`, which means `Equity < MM`.

Cross and isolated positions are checked independently:

* Cross uses the account's cross equity and combined cross maintenance margin.
* Isolated evaluates each isolated position using its own equity and maintenance margin.

Margin health is re-evaluated continuously, so the system reacts as soon as a new
Mark Price, fill, or deposit moves the account across the threshold.

## While Liquidating

When liquidation starts, the affected scope is flagged:

* Cross liquidation blocks new orders on every market for the account.
* Isolated liquidation blocks new orders only on the affected market.

Order submissions from the account are rejected while the flag is set. Existing
resting orders remain on the book.

## Execution

The system closes flagged positions with reduce-only immediate-or-cancel orders.
These orders execute immediately against available liquidity and cancel any
unfilled quantity. Margin health is re-evaluated between orders, so partial fills
that restore the account naturally stop the process.

### Target Selection

Cross liquidation closes one position at a time. After each fill settles, the
system re-evaluates and picks again from the remaining cross positions, so a
trader with multiple cross positions is unwound across several cycles rather than
all at once.

Isolated liquidation closes the flagged position in full.

### Order Shape

Liquidation orders are IOC, reduce-only, and market-priced. They sweep whatever
liquidity is resting on the book at the moment they land. There is no protective
spread off Mark.

## Recovery

When a liquidating account's equity recovers to or above its recovery initial
margin, the flag clears and normal order submission resumes.

If a position is fully closed during liquidation, the flag is also cleared because
the market no longer has a position to liquidate.

## Insurance-Fund Backstop

If equity falls far enough below maintenance margin that order-book liquidation is
unlikely to recover value, the system skips the order book and absorbs the
position into the insurance fund.

* Cross backstop absorbs all of the trader's cross positions plus their quote-asset balance into the insurance-fund account.
* Isolated backstop absorbs the specific isolated position and its allocated isolated margin.

Once absorbed, the insurance fund holds the position and manages it like any other
account.

## Fees

The liquidating account pays an extra liquidation fee on every fill while flagged,
on top of its normal maker or taker rate.

```text theme={null}
FillFee = Notional * (MakerOrTakerRate + LiquidationFeeRate)
```

Liquidation fee rates vary by market. If you're integrating Perps, read current
values from [Market Data](/perps/market-data#fetch-instruments).
