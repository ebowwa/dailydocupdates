<!--
Source: https://docs.polymarket.com/trading/overview.md
Downloaded: 2026-07-23T21:04:54.618Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Understand how orders, settlement, and positions fit together on Polymarket.

Trading connects signed orders on the CLOB with settlement on Polygon. You choose an outcome token, authorize an order with your signer, and submit it to the order book. When the order matches, settlement transfers pUSD and outcome tokens between trading accounts.

## Trading Workflow

Set up your account once, then repeat the remaining steps for each order.

<Steps>
  <Step title="Set Up Your Account">
    Connect a signer to your account wallet, fund it, and grant the required
    trading approvals.
  </Step>

  <Step title="Choose an Outcome">
    Select the outcome token you want to buy or sell and check its current
    market constraints.
  </Step>

  <Step title="Place an Order">
    Choose a price and size, sign the order, and submit it to the CLOB.
  </Step>

  <Step title="Manage the Order">
    Monitor fills and cancel any remaining open amount. Matched trades settle on
    Polygon and update your balances and positions.
  </Step>
</Steps>

<Info>
  The Exchange operator can match orders and enforce their ordering, but cannot
  set prices or execute trades that users did not authorize.
</Info>

## Start Trading

<CardGroup cols={3}>
  <Card title="Place Your First Order" icon="rocket" href="/trading/quickstart">
    Complete the first authenticated trading workflow.
  </Card>

  <Card title="Wallets and Authentication" icon="key" href="/trading/wallets-auth">
    Connect a signer to the account wallet that holds funds and positions.
  </Card>

  <Card title="Order Lifecycle" icon="repeat" href="/concepts/order-lifecycle">
    Understand how orders move from submission through fills, cancellation, or
    expiration.
  </Card>
</CardGroup>
