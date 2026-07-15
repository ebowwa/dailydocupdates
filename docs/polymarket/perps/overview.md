> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Start here for Polymarket perpetual markets

Polymarket Perps are perpetual contracts that track an underlying asset such as
an index, commodity, crypto asset, or equity. Perps trade continuously and do not
expire, so traders can open, manage, and close leveraged positions without
waiting for a market resolution event.

<Note>
  Polymarket Perps is in early access. Access requires a valid [Perps referral
  link or code](/perps/referral-program).
</Note>

## How Perps Work

A Perps trade starts as an order in the order book. When it fills, it becomes a
position whose value changes as the tracked market moves, until the trader closes
it or the system closes it because the account can no longer support the risk.

<CardGroup cols={2}>
  <Card title="Prices" icon="chart-line">
    A Perps market has a traded price from the order book and reference prices
    used by the system. The index price tracks the underlying asset, while the
    mark price is used for account equity, margin checks, and liquidation risk.
  </Card>

  <Card title="Trading Positions" icon="arrow-right-arrow-left">
    Trading a Perps market creates or changes a position. A long position benefits
    when the tracked asset rises, and a short position benefits when it falls.
    Orders trade through the order book; fills update the account's position,
    balance, and history.
  </Card>

  <Card title="Margin And Liquidation" icon="shield">
    Perps require collateral to support open positions. That collateral is the
    account's margin: the buffer that covers losses while a position is open. If
    account equity falls too far relative to the required margin, the position can
    be liquidated to close exposure.
  </Card>

  <Card title="Funding Payments" icon="repeat">
    Funding payments keep the contract price close to the index price. When a
    market trades above its index price, long positions generally pay short
    positions. When it trades below its index price, shorts generally pay longs.
  </Card>
</CardGroup>

## Building on Perps

If you are here to see what you can build on top of Polymarket Perps, common use
cases include:

* Trading bots that react to market signals
* Market making systems that quote Perps markets
* Portfolio dashboards that track balances and positions
* Risk monitors that track margin and liquidation risk
* Market data products that analyze books, trades, and funding payments

## Next Steps

<CardGroup cols={3}>
  <Card title="Concepts" icon="book" href="/perps/concepts">
    Learn the shared terms used across Perps docs.
  </Card>

  <Card title="Learn About Trading" icon="book-open" href="/perps/learn-about-trading/overview">
    Understand the market mechanics behind Perps.
  </Card>

  <Card title="Place Your First Trade" icon="bolt" href="/perps/place-your-first-trade">
    Build a first end-to-end Perps trading flow.
  </Card>
</CardGroup>
