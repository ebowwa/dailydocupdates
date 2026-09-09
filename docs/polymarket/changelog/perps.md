<!--
Source: https://docs.polymarket.com/changelog/perps.md
Downloaded: 2026-09-09T22:17:58.165Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Perps Changelog

> Recent changes to the Polymarket Perps API and platform

Notable changes to the Polymarket Perps API.

<Update label="Sep 8, 2026" description="Cancel-by-coid grace window, stricter filter validation, and faster rejected-order lookups">
  Cancel-by-coid grace window, stricter filter validation, and faster
  rejected-order lookups. No breaking changes.

  **Added**

  * **`GET /v1/info/exchange-stats`.** Public, unauthenticated exchange-wide
    statistics for all pUSD-quoted perpetuals: matched USD volume, gross maker
    plus taker fees, and one-sided open interest with its sample timestamp.
    Half-open window `[start_timestamp, end_timestamp)` up to 31 days. Request
    weight 10, or 1 when served from cache; responses cached 5 minutes.
  * **`instrument_id` filter on `GET /v1/account/fills`.** Optional, returns
    only that instrument's fills. Window, cursor, and sort are unchanged.

  **Changed**

  * **Cancel-by-coid waits for a racing create.** A cancel by client order id
    arriving just before its create is sequenced previously returned
    `order_unknown` and needed a retry. The gateway now waits up to 50ms of
    sequencer time for the create to appear and applies the cancel if it does
    — which covers the full range of races we see in production, where the
    create lands 10–49ms behind the cancel. You'll see fewer `order_unknown`
    rejects, and you can drop client-side retry loops for the sub-50ms case. A
    `coid` that never becomes an order still returns `order_unknown`, but up
    to 50ms later than before, so reject latency on those rises accordingly.
    In a batch mixing a racing `coid` with a never-created one, the racing
    cancel is forwarded when the batch resolves rather than the instant its
    create lands. Single-`coid` cancels, cancels of already-live orders, and
    `order_already_terminal` are unaffected.
  * **`GET /v1/account/internal-transfers` accepts a direction filter.**
    `direction=in` or `direction=out`, relative to your account. Any other
    value now returns `400` with `unknown variant …, expected in or out`;
    previously an unrecognized value was silently ignored. Omitting the
    parameter changes nothing.
  * **Unsupported WebSocket kline intervals are refused at subscribe.**
    `klines::<iid>::<interval>` accepts `1s` `1m` `5m` `15m` `30m` `1h` `4h`
    `6h` `12h` `1d` `1w`, unchanged. Any other interval now returns
    `{"status":"err","error":"invalid channel: …"}` instead of acknowledging
    the subscription and then never delivering data. If your client treats a
    non-ok ack as fatal, subscribe only with supported intervals.

  **Fixed**

  * **Exact order lookups for rejected orders no longer shed under load.**
    Looking up a single order by `order_id` or `client_order_id` where risk
    rejected it before it reached the book is now answered from the gateway's
    recent-outcome memory rather than a database read. Same empty page,
    faster, and no longer returns `503` when the gateway is busy. If you poll
    for a rejected order's status, this removes those `503`s. One caveat, and
    it only applies if you reuse client order ids. Where a `client_order_id`
    was booked earlier, then reused and rejected, a lookup by that id can
    return `[]` for up to 120 seconds after the rejection even though the
    earlier order still exists in history. Don't treat an empty page inside
    that window as proof the earlier booking never happened — look it up by
    `order_id` instead. Clients that never reuse client order ids are
    unaffected.

  **Not Yet Active**

  * **Favorites API.** `/v1/account/favorites` is a Polymarket web-session
    endpoint for the web app's market selector. Returns `404` until enabled
    and is not relevant to trading integrations.
  * **Stricter liquidation-stop check.** Operator-enabled later. A liquidation
    stop will be refused unless the account is provably recovered at the
    moment it applies, so an account may stay in the liquidating state
    slightly longer during adverse price moves. No API shape change.
  * **Per-account rate-limit tiers.** Still inactive, carried over from an
    earlier release. We'll notify you before enabling. Default tier when
    live: 5,000 actions/min with burst 250, 1,000 WS messages/min, 1,000 open
    orders, 30 connects/min.

  **Rollout**

  The market-maker gateway rolls pod by pod during the window, so MM
  WebSocket connections will drop once and need to reconnect. The exchange is
  in cancel-only mode for the duration: cancels, liquidations, deposits,
  withdrawals, and funding continue; new orders are rejected until the window
  closes.
</Update>

<Update label="Sep 4, 2026" description="OI reward eligibility threshold increased to $5M">
  The OI reward eligibility threshold is now $5M of combined daily average gross
      OI per rewards entity, up from $1M. Accounts without an entity mapping qualify
  independently. The 6% APR rate and calculation on the account's full daily
  average gross OI across all instruments are unchanged.
</Update>

<Update label="Sep 2, 2026" description="Exchange statistics endpoint added">
  Added `GET /v1/info/exchange-stats`, a public endpoint returning aggregate
  statistics for all pUSD-quoted perpetual markets over a required
  `[start_timestamp, end_timestamp)` window of up to 31 days: matched USD
  volume, gross positive maker and taker trading fees (rebates, incentives,
  and referral payments excluded), and one-sided open interest in USD notional
  with its sample time, taken from the latest complete sample before the
  window end — both null when no complete sample is available. Responses are
  cached for five minutes; a request costs weight 10, and a request served
  from cache costs 1.
</Update>

<Update label="Sep 1, 2026" description="Concurrent WebSocket posts and HTTP overload shedding">
  Concurrent WebSocket posts and HTTP overload shedding. No breaking changes.

  **Added**

  * **Concurrent WebSocket posts (MM gateway).** Up to 16 signed writes per
    connection now run concurrently. Posts touching the same order, by client
    order id or engine order id, still reach the engine in send order.
    `cancelAll` and leverage or margin updates act as barriers. Responses can
    arrive out of order across different orders: send a unique `id` and match
    on it. Ordering is per connection.
  * **HTTP overload shedding.** Requests over the server or per-IP concurrency
    limit are shed before execution: `503`,
    `{"status":"err","error":"service_unavailable"}`, with `Retry-After`.
    Batch routes return a one-element array. The request did not execute, so
    retry with backoff. The per-IP cap is 128 in-flight on the MM API against
    healthy usage under 10. Tell us if you NAT many bots through one IP.

  **Changed**

  * **Cancel by client order id.** A recently completed order now returns
    `order_already_terminal`, not `order_unknown`. A cancel racing its own
    order's creation waits briefly (\~1ms, capped at 150ms) and succeeds
    instead of answering `order_unknown`. TP/SL `coid`s are unchanged.
  * **Funding.** Funding for a just-closed window now settles even if you
    flattened or flipped just before settlement was sequenced; previously the
    window could be skipped for the whole instrument. Drop any assumption that
    a closed position means no funding.
  * **Reduce-only market closes.** These now fill only within the price band
    around the last mark. Expect partial fills or `ioc_no_fill` on a
    dislocated book. Quotes resting far outside the band will no longer be
    hit by them.
  * **Balances.** REST `value` is now the USD equivalent at the asset's index
    price, not the raw amount: same for pUSD, different for other collateral.
    `balance` uses asset-native decimals, matching WebSocket.
  * **`429` shape on modify routes.** `PATCH /v1/trade/orders` and
    `PATCH /v1/trade/orders-coid` return the one-element array instead of a
    bare object.
  * **Idle connections.** HTTP connections with no complete header for 120s
    are closed. A per-pod ceiling resets excess connections rather than
    serving a `503`.

  **Fixed**

  * **Deposits.** Many-per-transaction deposits credit reliably; a batching
    edge case could previously delay or drop credits.
  * **Price continuity.** The index survives a full outage of one oracle
    source, with marks, margin, and funding still updating. Don't assume
    prices freeze when a provider goes down.
  * **Referrals.** Concurrent binds for one account resolve to one winner; the
    loser gets HTTP `400`, `account already has a referrer`.

  **Not Yet Active**

  * **Pending-modify expiry.** A modify left risk-undecided for 200ms will be
    swept: the order stays open and you retry with a new `modify_id`. We'll
    notify before enabling.
  * **Per-account rate-limit tiers.** Still inactive. We'll notify before
    activation.

  **Rollout**

  The public gateway fleet moves to dedicated hardware during this window.
  WebSocket connections drop once; standard reconnects cover it.
</Update>

<Update label="Aug 24, 2026" description="Response timestamps, rejection references, and liquidation metadata">
  Rejections and acknowledgements now carry inspectable timing, every WebSocket
  push is stamped with engine event time, and backstop liquidation fills include
  optional metadata.

  **Added**

  * **Timestamps on rejections.** All rejection responses — orders, cancels,
    modifies, withdrawals, and transfers — now include `ts` (engine decision
    time), `arts` (gateway arrival time), and `ref` (a support reference for
    locating the server-side trace). All three are nullable, except on cancel
    rejections where `ts` is always present.
  * **Timestamps on acknowledgements.** Accepted create-order items now include
    `ts` and `arts`. Accepted cancels, which already carried `ts`, now also
    include `arts`.
  * **Event time on every WebSocket push.** Push envelopes across all channels
    now carry `ets`, the engine event time for the update. This field is always
    present and is the one to use for event-time analysis.
  * **Liquidation metadata on fills.** Fills and trades from backstop
    liquidations carry an optional `liquidation_details` object with `mark`,
    `method`, and `liquidated_user`. Available on private WebSocket fills,
    `GET /v1/account/fills`, position fills, and public trades. The anonymous
    trade tape omits `liquidated_user`. Ordinary order-book liquidations do not
    carry this object yet — only backstop liquidations, where `method` is
    `backstop`. The object is absent where metadata was not captured.

  **Changed**

  * **WebSocket envelope `ts` is now server send time.** Push frames previously
    stamped the envelope `ts` with internal stream time, which could lag actual
    send time on quiet channels or during catch-up. Engine event time is now
    carried separately in `ets`. Per-item `ts` inside `data` is unchanged. If
    you measure latency as `local_receive − envelope_ts`, your values will
    decrease after this release. Earlier measurements included server-internal
    lag and are not comparable — re-baseline at the deploy timestamp.
  * **Backstop liquidations publish fills to both parties.** The liquidated
    account and each absorbing account now receive private WebSocket fills for
    backstop liquidations. The liquidated account previously received no fills
    event. These fills are system-generated, with order id `0` and no client
    order id, matching the shape of ADL fills.
  * **`order_already_terminal` replaces `order_not_in_orderbook` for terminal
    orders.** Canceling an order that has already filled or canceled now
    returns `order_already_terminal` to the order's owner. Unknown and foreign
    order ids continue to return `order_not_in_orderbook`. Treat unrecognized
    error codes as non-retryable.

  **Fixed**

  * **`FillsUpdate.data` and `TradesUpdate.data` are documented as arrays.**
    The specification previously described objects. The wire format is
    unchanged; regenerate your client/bindings if you generated the object form.

  | Field         | Meaning              |
  | ------------- | -------------------- |
  | Request `ts`  | Client send time     |
  | `arts`        | Gateway arrival time |
  | Item `ts`     | Engine decision time |
  | Envelope `ts` | Server send time     |
  | `ets`         | Engine event time    |
</Update>

<Update label="Aug 16, 2026" description="Current position fills endpoint added">
  Added `GET /v1/info/position-fills`, a public endpoint returning every fill
  in a registered account's current open position cycle for one instrument. A
  cycle begins when the position opens from flat or flips direction, and a
  multi-leg flip stays in one cycle. Pages of up to 100 fills are linked by an
  opaque `cursor` returned alongside the data; the cursor is validated against
  the live position on every page and returns `400` if the position changed
  mid-pagination. `GET /v1/account/fills` has returned the same opaque
  `cursor` field since Jul 24 — passing the last fill's trade ID as `cursor`
  still works there.
</Update>

<Update label="Aug 14, 2026" description="Equity and PnL history honour the requested interval">
  `GET /v1/account/equity` and `GET /v1/account/pnl` now bucket the returned
  series by the `interval` query parameter. Previously the parameter was
  validated but ignored: every accepted value returned the same
  fixed-granularity series (per minute for equity, per hour for PnL), and long
  windows were truncated at 1000 rows instead of aggregated. Each equity point
  is now the last sample in its interval bucket; each PnL point is the PnL
  realized inside its bucket — not a running total — and empty buckets are
  omitted. Buckets are aligned to the Unix epoch, points keep real sample
  timestamps, and the 1000-entry cap now counts buckets, so a coarser interval
  covers a longer window before `more` is set. Responses for the finest
  intervals (`1m` equity, `1h` PnL) are unchanged.
</Update>

<Update label="Aug 13, 2026" description="Deposit and withdrawal history amounts are always decimal token units">
  `GET /v1/account/deposits` and `GET /v1/account/withdrawals` now serialize
  every `amount` (and withdrawal `fee`) in decimal token units, e.g. `"10"` for
  10 pUSD. Previously, deposit rows in `pending` or `removed` status reported
  raw on-chain base units (`"10000000"` for the same 10 pUSD), and pending
  withdrawal rows could serve base-unit amounts and fees as well, so rows for
  the same transfer disagreed on units across statuses. Clients that divided
  pending amounts by `10^decimals` to compensate must drop that conversion.
  Confirmed rows and the WebSocket `deposits` and `withdrawals` channels are
  unchanged — they were already decimal. Signed operation inputs (`POST
      /v1/account/withdraw`) still take base-unit amounts matching the EIP-712
  signature.
</Update>

<Update label="Aug 11, 2026" description="Fill history flags maker fills executed under liquidation">
  `GET /v1/account/fills` and account trade history previously reported
  `liquidation: false` on every maker fill, even when the maker's own account
  was under liquidation on the instrument — while the WebSocket `fills` channel
  already reported `liq: true` for the same fill. The two surfaces now agree:
  any maker or taker fill on an instrument in the account's active liquidation
  scope reports `liquidation: true`. Rows written before the change are
  unaffected. Such maker legs are also excluded from leaderboard win counts.
</Update>

<Update label="Aug 10, 2026" description="Fills gain an adl flag; liq no longer set on ADL counterparty legs">
  Fill entries now carry a required boolean `adl` field on both the WebSocket
  `fills` channel and `GET /v1/account/fills`, set on both legs of an
  auto-deleveraging match. Behavior change: the counterparty leg of an ADL match
  previously reported `liq: true` on the WebSocket `fills` channel; it now
  reports `liq: false`. `liq` marks only the leg whose own position is being
  liquidated. Clients that detect forced closes via `liq` alone will no longer
  see ADL counterparty fills — check `adl` as well.
</Update>

<Update label="Aug 8, 2026" description="Position deleveraged notification added">
  Added the <code>position\_deleveraged</code> notification, sent to the
  counterparty of an auto-deleveraging match when its profitable position is
  closed or reduced to settle a liquidation on the other side. Delivered on the
  WebSocket <code>notifications</code> channel and in the notifications history.
</Update>

<Update label="Aug 7, 2026" description="Exchange info reports engine version and cancel-only state">
  `GET /v1/info/exchange` now includes `engine_version`, the engine release
  version of the build serving the response. The response also documents
  `cancel_only`, which reports whether the exchange is in cancel-only
  (maintenance) mode; the flag has been returned since maintenance mode shipped
  on Jul 15.
</Update>

<Update label="Aug 6, 2026" description="Portfolio margin summary includes available order margin">
  The portfolio response and <code>portfolio</code> WebSocket channel now
  include <code>margin.available\_order\_margin</code>: the collateral available
  for additional order initial margin after existing exposure, open orders,
  orders and isolated-margin additions awaiting risk processing, and pending
  withdrawals or transfers.
</Update>

<Update label="Jul 6, 2026" description="Cancel all orders added">
  Added <code>DELETE /v1/trade/orders/all</code> to cancel all open orders in
  one request, optionally scoped to a single instrument. Available in the SDKs
  as <code>cancelAllOrders</code> (TypeScript) and{" "}
  <code>cancel\_all\_orders</code> (Python).
</Update>

<Update label="Jun 11, 2026" description="Cancel responses include order IDs">
  Cancel responses now include `oid` and `coid` fields.
</Update>

<Update label="Jun 10, 2026" description="Taker delay added for immediately matching orders">
  Added a 20ms taker delay for orders that immediately match on entry.
</Update>

<Update label="Jun 9, 2026" description="Reduce-only orders added">
  Added the reduce-only field to order submission and order updates.
</Update>

<Update label="Jun 8, 2026" description="Auto-cancel and rate-limit updates">
  <ul>
    <li>
      Added <code>PATCH /v1/trade/auto-cancel</code> to arm or clear a dead
      man's switch that cancels all open orders at a specified time.
    </li>

    <li>
      Added <code>GET /v1/account/auto-cancel</code> to check the current
      auto-cancel status, trigger count, and daily reset time.
    </li>

    <li>Auto-cancel is limited to 1000 triggers per UTC day per account.</li>

    <li>
      Added <code>updateLeverage</code> and <code>autoCancel</code> WebSocket
      post messages.
    </li>

    <li>
      <code>portfolio</code> and <code>balances</code> WebSocket channels no
      longer push updates on every order or fill, only periodically.
    </li>

    <li>
      Rate limit error messages now distinguish between{" "}
      <code>ip\_rate\_limited</code>, <code>action\_rate\_limited</code>, and{" "}
      <code>message\_rate\_limited</code>.
    </li>
  </ul>
</Update>
