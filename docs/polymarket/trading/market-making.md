<!--
Source: https://docs.polymarket.com/trading/market-making.md
Downloaded: 2026-07-23T21:04:54.618Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market Making

> Guidance for operating a market-making system on Polymarket.

A market maker (MM) provides liquidity by continuously posting bids and asks.
By quoting both sides of a market, market makers make it easier for other
traders to execute while seeking to earn the spread in exchange for the risks
they take.

On Polymarket, market makers deepen order books, tighten spreads, support price
discovery, and absorb trading flow as market conditions change.

<Note>
  Building a product that routes orders for its users? See the [Builder
  Program](/programs/builders/overview). This page is for traders providing
  liquidity from their own account.
</Note>

## Set Up for Market Making

Complete these account-level requirements before quoting a market.

<Steps>
  <Step title="Connect Your Account">
    Create or connect the wallet that will hold funds, positions, and orders,
    then authenticate the integration. See [Wallets and
    Authentication](/trading/wallets-auth) for the supported workflows.
  </Step>

  <Step title="Fund the Wallet">
    The wallet needs pUSD on Polygon before it can trade. To deposit another
    supported asset or transfer funds from another network, use the
    [Bridge](/trading/bridge/deposit).
  </Step>

  <Step title="Set Up Trading Approvals">
    Authorize the contracts required to trade outcome tokens and manage
    positions. See [Set Up Trading
    Approvals](/trading/wallets-auth#set-up-trading-approvals).
  </Step>
</Steps>

## Quote and Manage Orders

### Build Two-Sided Quotes

Market makers maintain bids and asks around their fair value so other traders
can execute in either direction. The midpoint describes the current book, but
the quoting strategy must determine whether it represents fair value and how
much risk to take around it.

In a binary market, complementary outcomes provide another way to express the
two sides. Buying NO at `0.48`, for example, is economically equivalent to
selling YES at `0.52`.

Before submitting a quote, confirm that the market is accepting orders and
validate its current minimum price increment and minimum order size. See
[Market Details](/market-data/market-details) for these constraints.

### Choose Order Types

Choose the order type according to what the strategy needs to accomplish:

| Type                     | Behavior                                                         | When to use                                             |
| ------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------- |
| Good-Til-Cancelled (GTC) | Rests on the book until filled or canceled                       | Default for passive quotes                              |
| Good-Til-Date (GTD)      | Rests on the book until filled, canceled, or expired             | Expire a passive quote at a known time                  |
| Fill-or-Kill (FOK)       | Fills the entire amount immediately or cancels                   | Rebalance immediately when a partial fill is not useful |
| Fill-and-Kill (FAK)      | Fills the available amount immediately and cancels the remainder | Rebalance immediately while allowing a partial fill     |

GTC and GTD are the primary order types for passive market making. Add the
[post-only option](/trading/place-orders#post-only-orders) when an order must
add liquidity rather than execute immediately. FAK and FOK are the execution
types used by market orders for immediate rebalancing.

### Submit and Maintain Orders

Submit related price levels as a [batch](/trading/place-orders#post-a-batch-of-orders)
to reduce submission latency. Each order is evaluated independently, so check
every result rather than treating the batch as a single success or failure. See
[Place Orders](/trading/place-orders) for the complete order workflows.

Once submitted, the quotes become orders resting on the book. Orders cannot be
edited in place, so changing a quote means canceling the existing order and
submitting a replacement:

* Cancel and replace open orders when fair value, inventory, or market
  constraints change.
* Keep the local book current with [real-time market
  data](/market-data/realtime-data#market-stream).
* Monitor fills and order changes through [Real-Time Order
  Updates](/trading/realtime-order-updates).
* After reconnecting, [fetch open orders and recent
  trades](/trading/manage-orders) before resuming the strategy.

## Manage Inventory

Inventory is the outcome-token exposure accumulated through trading. Every
fill changes that exposure and the pUSD or tokens available for new orders, so
inventory must be part of every pricing and sizing decision.

Buy orders use available pUSD, while sell orders require the corresponding
outcome tokens. Splitting pUSD creates a complete set of outcome tokens;
merging a complete set returns pUSD; and redeeming a winning position releases
its value after resolution. See [Manage Positions](/trading/positions/manage)
for these workflows.

### Inventory Strategies

| Phase            | Guidance                                                                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Before quoting   | Estimate the intended order sizes and prepare enough pUSD and outcome tokens to support them. Confirm that the required trading approvals are in place.                         |
| During trading   | Track exposure by market and outcome. Skew quote prices or sizes to reduce an imbalance, split additional pUSD when tokens run low, and merge complete sets to release capital. |
| When exiting     | Cancel the market's remaining orders, merge any complete sets that are no longer needed, and retain or reduce the remaining directional exposure deliberately.                  |
| After resolution | Confirm that the market has resolved, redeem winning positions, and return the released capital to the strategy.                                                                |

Multi-outcome events use [negative-risk markets](/concepts/negative-risk), which
change how complete sets are created and merged. Account for the market type
when planning inventory operations.

## Best Practices

Use these practices to keep quotes current and limit avoidable execution risk.

### Quote Management

* **Quote both sides** — Post bids and asks to provide liquidity in both
  directions.
* **Skew on inventory** — Adjust quote prices based on the current position to
  manage exposure.
* **Cancel stale quotes** — Pull orders immediately when market conditions
  change.
* **Use GTD for events** — Expire quotes before known catalysts to avoid stale
  exposure.

### Latency

* **Batch orders** — Submit related quotes in a [single
  request](/trading/place-orders#post-a-batch-of-orders).
* **Use real-time data** — Subscribe to [market
  updates](/market-data/realtime-data#market-stream) instead of polling.

### Risk Controls

* **Set size limits** — Check token balances before quoting and do not exceed
  the available inventory.
* **Use price guards** — Validate prices against the book midpoint and reject
  outliers.
* **Add a kill switch** — [Cancel all open
  orders](/trading/manage-orders#cancel-all-orders) when errors or position
  limits require the strategy to stop.
* **Monitor fills** — Subscribe to [real-time order
  updates](/trading/realtime-order-updates) to track executions.

## Programs and Incentives

In addition to the spread captured through executions, qualifying
market-making activity may earn incentives through two separate programs.

<CardGroup cols={2}>
  <Card title="Liquidity Rewards" icon="chart-line" href="/programs/liquidity-rewards">
    Earn rewards by maintaining qualifying resting liquidity in incentivized
    markets.
  </Card>

  <Card title="Maker Rebates" icon="receipt" href="/programs/maker-rebates">
    Earn rebates when maker liquidity executes in eligible fee-enabled markets.
  </Card>
</CardGroup>

Eligibility, calculations, and payouts differ between the programs. See each
program page for its current terms.

## Support

For market maker onboarding and support, contact
[support@polymarket.com](mailto:support@polymarket.com).
