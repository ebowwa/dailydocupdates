<!--
Source: https://docs.polymarket.com/perps/faq.md
Downloaded: 2026-07-07T21:24:50.543Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# FAQ

> Common questions about Polymarket Perps trading, pricing, margin, liquidation, fees, and integration

Common questions about Polymarket Perps.

## General

<AccordionGroup>
  <Accordion title="What is Polymarket Perps?">
    Polymarket Perps is a perpetual futures exchange offering continuous exposure to equities, indices, commodities, and other underlyings. Positions have no expiry. A funding rate keeps the contract price tethered to the underlying's spot price over time.
  </Accordion>

  <Accordion title="Which instruments can I trade?">
    Fetch the current product list, symbols, underlyings, reference feeds, and
    leverage settings from [`GET
          /v1/info/instruments`](/perps/market-data#fetch-instruments).
  </Accordion>

  <Accordion title="Is the exchange on-chain or off-chain?">
    Hybrid. Order matching, margin, and funding run off-chain for low latency.
    Deposits and withdrawals settle on Polygon, and the exchange periodically
    posts state-root commitments on-chain so off-chain activity stays verifiable.
  </Accordion>

  <Accordion title="Does the perp trade 24/7, even when the underlying market is closed?">
    Yes. The order book, matching, funding, margin checks, and liquidations all
    run continuously. What changes outside of regular hours is the set of external
    feeds used to compute Index and Mark.
  </Accordion>

  <Accordion title="Do Polymarket Perps expire?">
    No. Perpetual futures have no expiration date. A Perps position stays open
    until you close it or it is force-closed by liquidation.
  </Accordion>

  <Accordion title="Are perps and perpetual futures the same thing?">
    Yes. "Perps" is trader shorthand for "perpetual futures." Both refer to the
    same derivative contract: a futures-style instrument with no expiry, anchored
    to the underlying's spot price through periodic funding.
  </Accordion>

  <Accordion title="How are Perps different from Polymarket prediction markets?">
    Polymarket's prediction markets settle Yes or No shares at $1 or $0 based on a discrete event outcome. Perps are continuous: there is no event resolution and no $0/$1 settlement. Instead you take a long or short position whose value moves with the underlying asset's price, subject to funding payments and margin requirements like any perpetual futures contract.
  </Accordion>
</AccordionGroup>

## Trading and Orders

<AccordionGroup>
  <Accordion title="What order types are supported?">
    Limit and market-style orders are supported with `gtc`, `ioc`, and `fok` time-in-force values. GTC orders can be tagged post-only, which rejects the order if it would take liquidity. Closing orders can be tagged reduce-only, which prevents the order from increasing exposure. See [Configure Order Behavior](/perps/trading#configure-order-behavior) and [Close a Position](/perps/trading#close-a-position).
  </Accordion>

  <Accordion title="Why was my order rejected when my balance looks fine?">
    Pre-trade margin uses the worst-case position size from your existing exposure plus all resting orders on each side, not just the current position.

    ```text theme={null}
    WorstCaseSize = max(|Position + OpenBuys|, |Position - OpenSells|)
    ```

    If `Equity < IM_required` for that worst case, the order is rejected even though current equity is comfortable.
  </Accordion>

  <Accordion title="What is self-trade prevention?">
    Self-trade prevention is on by default for every order and runs in CancelMaker mode: when a taker would match against a resting order on the same account, the conflicting resting maker is canceled and the taker continues matching against other makers. It is not an API setting. There is no way to turn it off or change its mode.
  </Accordion>
</AccordionGroup>

## Pricing, Mark, Index, and Funding

<AccordionGroup>
  <Accordion title="What's the difference between Mark Price, Index Price, and last trade price?">
    * Index Price is the protocol's estimate of the underlying's fair value, aggregated from external oracle feeds.
    * Mark Price is the price the system uses for margin, PnL, liquidation, and funding.
    * Last trade price is the price of the most recent fill on the local book. It is not used for margining.

    See [Prices](/perps/concepts#prices).
  </Accordion>

  <Accordion title="What happens to Mark when external feeds go down?">
    Each Mark candidate degrades gracefully to the Index. If the order book mid is
    missing, the candidate falls back to Index. If there are no recent trades or
    quotes, the candidate falls back to Index. If external mark feeds are
    unavailable, the candidate falls back to Index. In the worst case, all
    candidates converge to Index and Mark tracks Index directly.
  </Accordion>

  <Accordion title="How is funding calculated and when does it settle?">
    A premium index is sampled every 5 seconds by walking the book for 1,000
    quote-asset notional on each side. Samples are averaged over a 1-hour charge
    window, run through an 8-hour formula with a fixed interest leg and clamp,
    divided by 8, and capped at +/-4% per hour. Settlement happens once per
    window. Longs pay shorts when the rate is positive, and shorts pay longs when
    negative. The protocol takes no cut.
  </Accordion>

  <Accordion title="Can I see funding pressure between settlements?">
    Yes. A rolling 5-second premium sample and its implied 8-hour rate are published continuously through public market data. You can also read funding history with [`GET /v1/info/funding`](/perps/market-data#list-funding-history).
  </Accordion>
</AccordionGroup>

## Margin and Leverage

<AccordionGroup>
  <Accordion title="What's the difference between cross and isolated margin?">
    * Isolated margin funds each position with a dedicated margin allocation. Liquidation only closes the affected position.
    * Cross margin shares account collateral across all cross positions. Unrealized PnL on one position can offset margin on another, but a liquidation evaluates and can unwind the whole cross account.

    The web app opens new positions in isolated mode by default. Cross is opt-in through the API using leverage configuration. See [Update Leverage](/perps/trading#update-leverage).
  </Accordion>

  <Accordion title="What are leverage tiers and why does my margin go up as my position grows?">
    Margin requirements scale with position notional through tiers. Larger
    positions need proportionally more margin to limit system-wide risk and reduce
    liquidation cascades. Margin is calculated incrementally across tiers,
    equivalent to summing bracket by bracket. Fetch live tier values from [`GET
          /v1/info/instruments`](/perps/market-data#fetch-instruments).
  </Accordion>

  <Accordion title="Why is maintenance margin always half of initial margin?">
    By design, maintenance margin rate is half of the maximum leverage requirement
    for the tier. A position is liquidated only after losing roughly half of the
    margin posted to open it, which gives traders a buffer between entering a
    position and being force-closed.
  </Accordion>

  <Accordion title="What happens between margin call and liquidation?">
    Three states are evaluated continuously.

    | State       | Condition           | Behavior                                          |
    | ----------- | ------------------- | ------------------------------------------------- |
    | Healthy     | `Equity >= IM`      | Normal trading                                    |
    | Margin call | `MM <= Equity < IM` | Reduce-only: close exposure or deposit collateral |
    | Liquidation | `Equity < MM`       | System closes the position                        |

    A deposit during margin call instantly increases equity and can restore healthy status.
  </Accordion>

  <Accordion title="Can I withdraw collateral while I have an open position?">
    Yes, as long as `Equity_after >= IM_required` after the withdrawal. You cannot withdraw yourself into a margin call.
  </Accordion>
</AccordionGroup>

## Liquidation

<AccordionGroup>
  <Accordion title="When am I liquidated?">
    Liquidation occurs when account equity falls below maintenance margin. Cross and isolated positions are checked independently: each isolated position has its own equity and maintenance margin, while cross uses the account's combined equity and combined maintenance margin. See [Margin and Liquidation](/perps/concepts#margin-and-liquidation).
  </Accordion>

  <Accordion title="Why does my liquidation price move when I haven't changed anything?">
    For cross positions, the liquidation price depends on available balance:
    everything in the cross account that is not this position's own equity. Mark
    moves on other cross positions, size changes, or collateral changes can all
    shift the liquidation price for every cross position simultaneously.
  </Accordion>

  <Accordion title="What happens during liquidation?">
    The affected scope is flagged and new orders on it are blocked. Cross blocks
    the whole account. Isolated blocks just that instrument. The system closes
    positions with reduce-only IOC orders, rate-limited per account, re-evaluating
    margin between fills. Cross liquidation closes one position at a time across
    cycles. If equity recovers above the recovery initial margin, the flag clears.
  </Accordion>

  <Accordion title="What is the insurance fund and when does it step in?">
    When equity falls below two-thirds of maintenance margin, order-book
    liquidation is unlikely to recover value, so the system absorbs the position
    directly into the insurance-fund account along with its margin. For cross
    backstop, the system absorbs all cross positions plus quote balance.
  </Accordion>

  <Accordion title="Are there extra fees on liquidation fills?">
    Yes. While flagged, every fill pays an additional liquidation fee rate on top of the maker or taker rate.

    ```text theme={null}
    FillFee = Notional * (MakerOrTakerRate + LiquidationFeeRate)
    ```

    Fetch the live rate per instrument from [`GET /v1/info/instruments`](/perps/market-data#fetch-instruments).
  </Accordion>
</AccordionGroup>

## Fees

<AccordionGroup>
  <Accordion title="What are the current maker and taker fees?">
    During the launch period, fees are flat.

    | Role  | Rate             |
    | ----- | ---------------- |
    | Maker | -0.5 bp (rebate) |
    | Taker | 2 bp             |

    Fees are calculated per fill as `abs(Price * Quantity) * Rate`, denominated in the instrument's quote asset. After launch, the platform will move to a tiered structure based on volume and maker share. Details will be published before the transition. See [Trading Fees](/perps/trading#trading-fees).
  </Accordion>
</AccordionGroup>

## API and Integration

<AccordionGroup>
  <Accordion title="What's the difference between my main wallet and the proxy?">
    Your main wallet signs the one-time create-proxy request and never trades directly. The returned proxy address and secret are what you use day to day: the proxy private key signs trade requests, and the `(proxy, secret)` pair authenticates private REST and WebSocket reads. This isolates the trading key from the wallet that holds funds. See [Set Up Authentication](/perps/authenticated-sessions#set-up-authentication).
  </Accordion>

  <Accordion title="What address identifies my Perps account?">
    Your account is keyed by your EOA base address, the externally-owned account
    that signs `createProxy`, not a Safe smart-contract wallet address. Even if
    you use a Safe wallet elsewhere on Polymarket, your Perps balances, positions,
    and history are all tracked against the underlying EOA. Use that EOA when
    looking up your account or referencing it in support requests.
  </Accordion>

  <Accordion title="Which requests need a signature vs. just headers?">
    * Signed requests with `sig`, `salt`, and `ts`: `POST /account/key`, all `/trade/*` actions, and `PATCH /trade/leverage`. The signer is the main address for `createProxy` and the proxy address for everything else.
    * Header credentials with `POLYMARKET-PROXY` and `POLYMARKET-SECRET`: private `/account/*` reads.
    * WebSocket authentication: send a single `auth` message after connecting, then subscribe to private channels.

    See [Authenticated Sessions](/perps/authenticated-sessions).
  </Accordion>

  <Accordion title="How do I avoid clock-skew rejections?">
    Each signed request must include a fresh `ts` request timestamp in
    milliseconds and `salt`. Reused or stale values are rejected. Sync against
    `GET /v1/info/time` and do not sign requests far in the past or future. The
    optional `expa` field caps the validity window.
  </Accordion>

  <Accordion title="How do deposits and withdrawals work?">
    Deposits and withdrawals are the only operations that move assets in or out of the exchange. Both settle on Polygon. Deposits credit equity as soon as the engine sees them. Withdrawals are signed off-chain and require `Equity_after >= IM_required`. See [Fund Your Account](/perps/fund-your-account).
  </Accordion>

  <Accordion title="Are there geographic restrictions on order placement?">
    Yes. Order placement is not permitted from the United States, Canada, Cuba, Iran, North Korea, Syria, Crimea, Donetsk, or Luhansk. Builders are responsible for verifying user location before submitting orders.
  </Accordion>
</AccordionGroup>

## Sessions

<AccordionGroup>
  <Accordion title="What do market sessions actually change?">
    Sessions affect which set of external feeds is used to compute Index Price and Mark Price. They do not change funding, margin, leverage tiers, order matching, or liquidation triggers. Those run identically around the clock.
  </Accordion>

  <Accordion title="What's the difference between Disrupted and Halted?">
    * Disrupted means external feeds are unavailable or failing sanity checks. The system falls back to whatever feed set is still healthy.
    * Halted means the underlying itself has a trading halt or corporate-action freeze.

    Both are categorizations of feed-source health and only affect Index and Mark sourcing. The perp continues to match orders.
  </Accordion>
</AccordionGroup>
