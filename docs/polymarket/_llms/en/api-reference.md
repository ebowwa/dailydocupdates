<!--
Source: https://docs.polymarket.com/_llms/en/api-reference.md
Downloaded: 2026-09-09T22:17:58.157Z
-->

# Polymarket Documentation: English API Reference

## API Reference

- [English / API Reference / Predictions (112 pages)](https://docs.polymarket.com/_llms/en/api-reference/predictions.md): Documentation for English / API Reference / Predictions.

### Perps

- [Overview](https://docs.polymarket.com/api-reference/perps/overview.md): Explore the APIs available for building with Polymarket Perps.
- [Rate Limits](https://docs.polymarket.com/api-reference/perps/rate-limits.md): IP rate limits, action rate limits, and WebSocket limits for Perps integrations
- [Geographic Restrictions](https://docs.polymarket.com/api-reference/perps/geographic-restrictions.md): Jurisdictions where Polymarket Perps order placement is not permitted

#### HTTP

- [Test Connection](https://docs.polymarket.com/api-reference/test-connection.md): Test connection to the server.
- [Get Server Time](https://docs.polymarket.com/api-reference/get-server-time.md): Get server time.
- [Get Exchange Info](https://docs.polymarket.com/api-reference/get-exchange-info.md): Get exchange information.
- [Get Collateral Assets](https://docs.polymarket.com/api-reference/get-collateral-assets.md): Get a list of collateral assets.
- [Get Instruments](https://docs.polymarket.com/api-reference/get-instruments.md): Get all instruments.
- [Get Tickers](https://docs.polymarket.com/api-reference/get-tickers.md): Get all instrument tickers with live market data.
- [Get Statistics](https://docs.polymarket.com/api-reference/get-statistics.md): Get last 24-hour statistics for all instruments.
- [Get Exchange Statistics](https://docs.polymarket.com/api-reference/get-exchange-statistics.md): Get aggregate statistics for all pUSD-quoted Polymarket perpetual markets. The time window is half-open: trades at `start_timestamp` are included and trades at `end_timestamp` are excluded. The maximum window is 31 days. Open interest is the one-sided USD notional from the latest complete sample bef…
- [Get Klines](https://docs.polymarket.com/api-reference/get-klines.md): Get klines for an instrument. If no end time is provided, the current time will be used. Maximum of 1000 entries returned per request.
- [Get Mark Price History](https://docs.polymarket.com/api-reference/get-mark-price-history.md): Get mark price history for an instrument, bucketed by interval. If no end time is provided, the current time will be used. Maximum of 1000 entries returned per request. Only buckets with at least one mark update are included. For intervals of a minute or coarser, a bucket cut mid-way by `end_timesta…
- [Get BBO](https://docs.polymarket.com/api-reference/get-bbo.md): Get best bid and offer for all instruments.
- [Get Book](https://docs.polymarket.com/api-reference/get-book.md): Get book for an instrument.
- [Get Index](https://docs.polymarket.com/api-reference/get-index.md): Get index price and the list of constituents for an asset.
- [Get Recent Trades](https://docs.polymarket.com/api-reference/get-recent-trades.md): Get public trades for an instrument. Maximum of 100 entries returned per request.
- [Get Public Portfolio](https://docs.polymarket.com/api-reference/get-public-portfolio.md): Get public portfolio for an address including equity and open positions.
- [Get Current Position Fills](https://docs.polymarket.com/api-reference/get-current-position-fills.md): Get every fill in a registered account's current open position cycle for one instrument. A cycle begins when the position opens from flat or flips direction. For a flip, every fill from the flipping engine event belongs to the new cycle so a fill is never split between cycles.
- [Get Historical Funding](https://docs.polymarket.com/api-reference/get-historical-funding.md): Get public funding rate history for an instrument. Maximum of 100 entries returned per request.
- [Get Fees](https://docs.polymarket.com/api-reference/get-fees.md): Get the fee tier schedule for each instrument type and category.
- [Get Limit Tiers](https://docs.polymarket.com/api-reference/get-limit-tiers.md): Get the list of account limit tiers. Action and open-order fields are enforced per account; legacy request-rate fields are not used for gateway request enforcement.
- [Check Invite Code](https://docs.polymarket.com/api-reference/check-invite-code.md): Check whether an invite code can be used. When `address` is provided, the response is invalid if that address already has an account.
- [Create Orders](https://docs.polymarket.com/api-reference/create-orders.md): Create new orders. Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
- [Modify Orders](https://docs.polymarket.com/api-reference/modify-orders.md): Modify the price and total quantity of existing orders by exchange order ID. Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
- [Modify Orders COID](https://docs.polymarket.com/api-reference/modify-orders-coid.md): Modify the price and total quantity of existing orders by client order ID. Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
- [Cancel Orders](https://docs.polymarket.com/api-reference/cancel-orders.md): Cancel orders. Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
- [Cancel Orders COID](https://docs.polymarket.com/api-reference/cancel-orders-coid.md): Cancel orders by client order ID. Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
- [Cancel All Orders](https://docs.polymarket.com/api-reference/cancel-all-orders.md): Cancel all open orders for the authenticated account on one instrument. Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
- [Set Auto-Cancel](https://docs.polymarket.com/api-reference/set-auto-cancel.md): Set a dead man's switch that cancels all your open orders at the chosen time. The time must be at least 5 seconds in the future. Send 0 to clear an active schedule without triggering it; posting a new time replaces the current one.
- [Update Leverage](https://docs.polymarket.com/api-reference/update-leverage.md): Update leverage for an instrument. Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
- [Update Leverage for Multiple Instruments](https://docs.polymarket.com/api-reference/update-leverage-for-multiple-instruments.md): Update leverage for up to 100 unique instruments. Updates are processed sequentially and are not atomic. If only some responses arrive before the gateway deadline, missing item results use `internal_error`; whether those updates applied is unknown. If no responses arrive, the request returns 500. Re…
- [Update Isolated Margin](https://docs.polymarket.com/api-reference/update-isolated-margin.md): Adjust the signed collateral allocation for an existing isolated position. Use a positive amount to add margin and a negative amount to remove it. A removal may include unrealized isolated profit, but the resulting isolated position equity (allocation + unrealized PnL - settled funding) must remain…
- [Create Proxy](https://docs.polymarket.com/api-reference/create-proxy.md): Create a new proxy to sign orders. Returns an API secret for private account access. Requires EOA signature, see [EOA signing](/http/signing#1-eoa-signing).
- [Delete Proxy](https://docs.polymarket.com/api-reference/delete-proxy.md): Delete a proxy by address. Requires EOA signature, see [EOA signing](/http/signing#1-eoa-signing).
- [Get Credentials](https://docs.polymarket.com/api-reference/get-credentials.md): Get the account ID, address, and proxy keys for the authenticated account.
- [Get Orders](https://docs.polymarket.com/api-reference/get-orders.md): Get historical order snapshots for the authenticated account from the order history database. Returns the latest known state for each matching order, including accepted, open, partial, filled, and cancelled orders. For currently resting orders only, use Get Open Orders. Maximum of 100 entries return…
- [Get Open Orders](https://docs.polymarket.com/api-reference/get-open-orders.md): Get open orders for the authenticated account.
- [Get Balances](https://docs.polymarket.com/api-reference/get-balances.md): Get asset balances for the authenticated account.
- [Get Portfolio](https://docs.polymarket.com/api-reference/get-portfolio.md): Get current portfolio snapshot including open positions, margin summary, and withdrawable balance.
- [Get Fills](https://docs.polymarket.com/api-reference/get-fills.md): Get fill history for the authenticated account. If no end time is provided, the current time will be used. Maximum of 100 entries returned per request. Results are ordered by time; use `sort` to choose newest-first (`desc`, default) or oldest-first (`asc`). To page through more than 100 fills, pass…
- [Get Equity](https://docs.polymarket.com/api-reference/get-equity.md): Get equity history for the authenticated account. If no end time is provided, the current time will be used. Each point is the last equity sample in its `interval` bucket, stamped with that sample's own timestamp rather than the bucket's start — so every timestamp falls within the requested window.…
- [Get PnL](https://docs.polymarket.com/api-reference/get-pnl.md): Get PnL history for the authenticated account. If no end time is provided, the current time will be used. Each point is the PnL realized inside its `interval` bucket — not a running total. Buckets are aligned to the Unix epoch, and one in which nothing was realized is omitted, so the series is spars…
- [Get Funding Charges](https://docs.polymarket.com/api-reference/get-funding-charges.md): Get funding payment history for the authenticated account. If no end time is provided, the current time will be used. Maximum of 100 entries returned per request.
- [Withdraw](https://docs.polymarket.com/api-reference/withdraw.md): Submit a signed withdrawal request. Requires EOA signature, see [EOA signing](/http/signing#1-eoa-signing).
- [Internal Transfer](https://docs.polymarket.com/api-reference/internal-transfer.md): Submit a signed internal ledger transfer between two exchange accounts. Requires proxy signature using the standard signed-op flow.
- [Get Deposits](https://docs.polymarket.com/api-reference/get-deposits.md): Get deposit history for the authenticated account. If no end time is provided, the current time will be used. Maximum of 100 entries returned per request.
- [Get Internal Transfers](https://docs.polymarket.com/api-reference/get-internal-transfers.md): Get settled internal transfer history for the authenticated account. Returns both inbound and outbound transfers unless `direction` narrows the page to one side; a value other than `in` or `out` is refused.
- [Get Withdrawals](https://docs.polymarket.com/api-reference/get-withdrawals.md): Get withdrawal history for the authenticated account. If no end time is provided, the current time will be used. Maximum of 100 entries returned per request.
- [Get Account Stats](https://docs.polymarket.com/api-reference/get-account-stats.md): Get the authenticated account's 7-day trading stats (taker volume, maker volume, account maker share, and entity maker share when applicable). Stats are cached by UTC day and may be stale by up to 24 hours.
- [Get Account Limits](https://docs.polymarket.com/api-reference/get-account-limits.md): Get the authenticated account's effective rate-limit allowances for its current volume-based tier: order-action rate, open-order cap, and the display-only messages-per-minute figure. `open_orders` reflects the account's current live open-order count; the rate-usage counters (`actions_per_minute`, `a…
- [Get Account Rewards](https://docs.polymarket.com/api-reference/get-account-rewards.md): Get per-instrument daily liquidity reward shares for the authenticated account. Reward periods run from 12:00 UTC to 12:00 UTC and are labeled by their UTC end date. OI rewards pay 6% APR on the account's full daily average gross OI across all instruments when the combined daily average gross OI of…
- [Get Instrument Config](https://docs.polymarket.com/api-reference/get-instrument-config.md): Get per-instrument configuration (leverage and margin mode) for the authenticated account.
- [Get Auto-Cancel Status](https://docs.polymarket.com/api-reference/get-auto-cancel-status.md): Get the current auto-cancel status for the authenticated account: the armed deadline, how many times the switch has fired today, and when the daily counter resets.
- [Create Account Invite](https://docs.polymarket.com/api-reference/create-account-invite.md): Create or return the authenticated account's primary invite code. The call is idempotent for accounts that already have a primary invite code.
- [Get Account Referral](https://docs.polymarket.com/api-reference/get-account-referral.md): Get the authenticated account's invite code, parent referral code, direct referral count, and fee share rate.
- [Apply Referral Code](https://docs.polymarket.com/api-reference/apply-referral-code.md): Apply a referral code to the authenticated account after signup. Accounts can only apply a referral code if they do not already have one.
- [Get Notifications](https://docs.polymarket.com/api-reference/get-notifications.md): Get the authenticated account's notifications, newest first.
- [Mark Notifications Read](https://docs.polymarket.com/api-reference/mark-notifications-read.md): Mark notifications as read. Send a list of notification ids, or a before cursor to mark everything up to and including that point. You can only mark your own notifications.

#### WebSocket

- [Ping](https://docs.polymarket.com/api-reference/wss/perps-ping.md): Perps WebSocket heartbeat.
- [Place Orders](https://docs.polymarket.com/api-reference/wss/perps-place-orders.md): Perps WebSocket order placement.
- [Modify Orders](https://docs.polymarket.com/api-reference/wss/perps-modify-orders.md): Perps WebSocket order modification by order ID.
- [Modify Orders by Client Order ID](https://docs.polymarket.com/api-reference/wss/perps-modify-orders-coid.md): Perps WebSocket order modification by client order ID.
- [Cancel Orders](https://docs.polymarket.com/api-reference/wss/perps-cancel-orders.md): Perps WebSocket order cancellation by order ID.
- [Cancel Orders by Client Order ID](https://docs.polymarket.com/api-reference/wss/perps-cancel-orders-coid.md): Perps WebSocket order cancellation by client order ID.
- [Cancel All Orders](https://docs.polymarket.com/api-reference/wss/perps-cancel-all.md): Perps WebSocket cancellation of all open orders.
- [Auto Cancel](https://docs.polymarket.com/api-reference/wss/perps-auto-cancel.md): Perps WebSocket dead man's switch updates.
- [Update Leverage](https://docs.polymarket.com/api-reference/wss/perps-update-leverage.md): Perps WebSocket leverage updates.
- [Update Leverages](https://docs.polymarket.com/api-reference/wss/perps-update-leverages.md): Perps WebSocket batch leverage updates.
- [Update Isolated Margin](https://docs.polymarket.com/api-reference/wss/perps-update-margin.md): Add or remove margin from an isolated Perps position over WebSocket.
- [Auth](https://docs.polymarket.com/api-reference/wss/perps-auth.md): Perps WebSocket authentication.
- [Trades](https://docs.polymarket.com/api-reference/wss/perps-trades.md): Perps WebSocket public trade updates.
- [BBO](https://docs.polymarket.com/api-reference/wss/perps-bbo.md): Perps WebSocket best bid and offer updates.
- [Book](https://docs.polymarket.com/api-reference/wss/perps-book.md): Perps WebSocket order book updates.
- [Klines](https://docs.polymarket.com/api-reference/wss/perps-klines.md): Perps WebSocket candle updates.
- [Tickers](https://docs.polymarket.com/api-reference/wss/perps-tickers.md): Perps WebSocket ticker updates.
- [Statistics](https://docs.polymarket.com/api-reference/wss/perps-statistics.md): Perps WebSocket 24-hour statistics updates.
- [Fills](https://docs.polymarket.com/api-reference/wss/perps-fills.md): Perps WebSocket private fill updates.
- [Orders](https://docs.polymarket.com/api-reference/wss/perps-orders.md): Perps WebSocket private order updates.
- [Funding](https://docs.polymarket.com/api-reference/wss/perps-funding.md): Perps WebSocket private funding updates.
- [Balances](https://docs.polymarket.com/api-reference/wss/perps-balances.md): Perps WebSocket private balance updates.
- [Portfolio](https://docs.polymarket.com/api-reference/wss/perps-portfolio.md): Perps WebSocket private portfolio updates.
- [Deposits](https://docs.polymarket.com/api-reference/wss/perps-deposits.md): Perps WebSocket private deposit updates.
- [Withdrawals](https://docs.polymarket.com/api-reference/wss/perps-withdrawals.md): Perps WebSocket private withdrawal updates.
- [Notifications](https://docs.polymarket.com/api-reference/wss/perps-notifications.md): Perps WebSocket private notification updates.

## OpenAPI Specs

- [gamma-openapi](/api-spec/gamma-openapi.yaml)
- [clob-openapi](/api-spec/clob-openapi.yaml)
- [data-openapi](/api-spec/data-openapi.yaml)
- [relayer-openapi](/api-spec/relayer-openapi.yaml)
- [combos-rfq-openapi](/api-spec/combos-rfq-openapi.yaml)
- [bridge-openapi](/api-spec/bridge-openapi.yaml)
- [perps-openapi](/api-spec/perps-openapi.json)

## AsyncAPI Specs

- [asyncapi-rfq](/asyncapi-rfq.json)
- [asyncapi](/asyncapi.json)
- [asyncapi-user](/asyncapi-user.json)
- [asyncapi-sports](/asyncapi-sports.json)
- [asyncapi-perps](/asyncapi-perps.json)
