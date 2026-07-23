<!--
Source: https://docs.polymarket.com/changelog/sdks.md
Downloaded: 2026-07-23T21:04:54.608Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SDK Changelog

> Recent changes to the official SDKs.

<Tabs>
  <Tab title="TypeScript">
    ### `0.1.0`

    * Graduated the SDK to the stable 0.x release line, marked Perps APIs as experimental, and removed deprecated compatibility APIs.
    * Added Perps support for reduce-only orders, account stats, cancel-all, TP/SL metadata and placement, batched fill and trade frames, and stricter order request validation.
    * Added `conditionId` aliases to CLOB order book, open order, trade, and builder trade models while keeping `market` available as a deprecated alias.
    * Typed CLOB cancellation results with branded `OrderId` values for `canceled` and `notCanceled` keys.

    ### `0.1.0-beta.18`

    * `setupTradingApprovals` and `prepareTradingApprovals` no longer request approvals for the retired CLOB v1 Neg Risk Adapter.
    * Streams drop unknown or unreadable WebSocket frames instead of closing the connection. RFQ quoter sessions no longer fail with `TransportError` on an unrecognized frame; a caller waiting on an unreadable acknowledgement fails through its acknowledgement timeout instead.
    * Removed `RfqKnownInboundMessageSchema` from `@polymarket/bindings`; each RFQ inbound message schema declares its own object shape directly.

    ### `0.1.0-beta.17`

    * RFQ quoter sessions now keep running when the server introduces new error codes. `RfqErrorCode` is an open type: known codes are enumerated in `RfqKnownErrorCode`, and unrecognized codes flow through rejection errors as plain strings.
    * Deprecated the `RfqErrorCode` value alias; migrate enum member access:

    ```diff theme={null}
    -if (error.code === RfqErrorCode.RateLimited) {
    +if (error.code === RfqKnownErrorCode.RateLimited) {
    ```

    * Added `ConnectionLostError` carrying the WebSocket close `code` and `reason`. Losing an RFQ session connection now rejects in-flight operations and fails the session iterator with it, instead of ending the event loop silently. Closing the session still ends iteration cleanly.
    * Streamed market and user events normalize empty-string optional decimal fields (for example a trade's `feeRateBps` or a price change's `bestBid` and `bestAsk`) to `null`.
    * Batch price reads (`fetchPrices`, `fetchMidpoints`, `fetchSpreads`) return `TokenId`-keyed records of branded decimal strings.
    * Perps sessions handle fills and trades frames that batch multiple entries.

    ### `0.1.0-beta.16`

    * Added `RESOLVED_PARTIAL` to `ComboPositionStatus` so Combo positions that resolve at a fractional payout (for example a voided leg) parse correctly instead of failing validation.

    ### `0.1.0-beta.15`

    * Combo activity now parses the canonical `type` field returned by the Data API, instead of deriving lifecycle actions from legacy fields.

    ### `0.1.0-beta.14`

    * Added SDK pagination for Combo lifecycle activity and server-cursor pagination for Combo positions.
    * Added Combo position sync request fields and exposed `outcome` and `redeemable` on Combo positions.
    * Branded Combo activity row IDs.
    * Breaking beta change: Combo activity and position fields now use `wallet`, `amount`, and `payout`; Combo activity rows no longer expose `moduleKind`.

    ```diff theme={null}
    -activity.userAddress
    -activity.amountUsdc
    -redeemActivity.payoutUsdc
    -position.userAddress
    +activity.wallet
    +activity.amount
    +redeemActivity.payout
    +position.wallet
    ```

    ### `0.1.0-beta.13`

    * Added `listMarketClarifications` for reading market clarification text with SDK-owned pagination and market, event, state, question, and transaction filters.
    * Fixed legacy Proxy wallet gasless execution and added live Safe and Proxy wallet coverage.
    * Resolve closed markets when preparing market position redemptions.
    * Gasless transaction handles now wait for relayer transactions to reach confirmed state before resolving.

    ### `0.1.0-beta.12`

    * Require GTD limit order expirations to be at least 3 minutes in the future.

    ### `0.1.0-beta.11`

    * Support CLOB order tick sizes `0.005` and `0.0025`.
    * Pagination request cursors now infer the branded pagination cursor type.

    ### `0.1.0-beta.10`

    * Preserve already-deployed legacy UUPS Deposit Wallets when `createSecureClient` resolves the default wallet, while new Deposit Wallet deployments use the beacon factory path.

    ### `0.1.0-beta.9`

    * Added `PriceHistoryInterval` and `SearchSort` exports, preserved `groupItemTitle` on normalized markets, and published `expectPrivateKey` from `@polymarket/types`.

    ### `0.1.0-beta.8`

    * RFQ quoter sessions now emit typed `trade` events for confirmed Combos fills.
    * RFQ rejection errors now expose `errorId` values and parse `INVALID_SIGNATURE` and `INTERNAL_ERROR` codes.

    ### `0.1.0-beta.7`

    * Added `parentEventId` to `Event` so child events can link back to their parent event.
    * Added `maxPrice` and `minPrice` protection fields to market order requests.
    * Handle legacy multi-outcome markets more safely: `listMarkets` skips markets that cannot be represented by the binary market model, and `fetchMarket` returns a typed SDK error for unsupported markets.
    * Normalize empty-string order and activity fields to SDK values: decimal amounts become `"0"`, missing maker order fee rates become `null`, and missing trade or position market icons become `null`.
    * Parse Combo trade activity rows with an `isCombo` discriminated union.
    * Support new Combos RFQ websocket error codes for balance, allowance, and pre-execution reservation failures.
    * Broad user websocket subscriptions now omit market filters so all-market streams receive trade events.
    * Retry rejected JSON-RPC `eth_call` batches by splitting them into smaller batches.

    ### `0.1.0-beta.6`

    * Point Combos RFQ endpoints at the production domains: `combos-rfq-api.polymarket.com` (REST) and `combos-rfq-gateway-quoter.polymarket.com` (quoter WebSocket).

    ### `0.1.0-beta.5`

    * Added `listComboMarkets` for fetching the Combo market catalog with typed bindings and SDK-owned pagination. See [Combos](/trading/combos/overview).
    * Parse RFQ quote rejections that use the `SUBMISSION_WINDOW_CLOSED` gateway error code.

    ### `0.1.0-beta.4`

    * Added Combos support for multi-leg RFQ positions. See [Combos](/trading/combos/overview).
    * Reject whitespace-only search queries and trim leading or trailing search input.
    * `ConditionId` is now deprecated in favor of `CtfConditionId`; existing
      `ConditionId` exports remain available as deprecated aliases.

    ### `0.1.0-beta.3`

    **Secure client setup now defaults to the Deposit Wallet flow**

    `createSecureClient` can now derive and use the signer's deterministic Deposit
    Wallet when you omit `wallet`. If you already know which Polymarket wallet you
    want to use, keep passing `wallet`.

    ```diff theme={null}
    const secureClient = await createSecureClient({
    -  wallet: "YOUR_POLYMARKET_WALLET_ADDRESS",
       signer,
    });
    ```

    If you want to keep account selection explicit, no change is required:

    ```ts theme={null}
    const secureClient = await createSecureClient({
      wallet: "YOUR_POLYMARKET_WALLET_ADDRESS",
      signer,
    });
    ```

    **`setupTradingApprovals()` now waits internally**

    You no longer need to wait on the returned handle. Call the method once before
    trading; it is safe to call again if approvals are already set.

    ```diff theme={null}
    -const handle = await secureClient.setupTradingApprovals();
    -await handle.wait();
    +await secureClient.setupTradingApprovals();
    ```

    **Gasless setup helpers are deprecated**

    You no longer need to call `isGaslessReady()` or `setupGaslessWallet()` in the
    normal setup path. Create the secure client, then set up trading approvals.

    ```diff theme={null}
    -const ready = await secureClient.isGaslessReady();
    -
    -if (!ready) {
    -  secureClient = await secureClient.setupGaslessWallet();
    -}
    -
     await secureClient.setupTradingApprovals();
    ```

    ### `0.1.0-beta.2`

    First beta release of the unified TypeScript SDK. Install the beta package with
    your package manager:

    ```bash theme={null}
    pnpm add @polymarket/client@beta
    ```
  </Tab>

  <Tab title="Python">
    ### `0.1.0`

    * Graduated the SDK to the stable 0.x release line, marked Perps APIs as experimental, and removed deprecated beta compatibility APIs.
    * Added `condition_id` aliases to CLOB models while keeping `market` available as a deprecated alias.
    * Typed CLOB cancellation result IDs with `OrderId`.
    * Streams drop unknown or unreadable WebSocket frames instead of closing the connection.
    * Limit and market order helpers reject prices that are not a multiple of the market tick size.

    ### `0.1.0b21`

    * `setup_trading_approvals` no longer requests approvals for the retired CLOB v1 Neg Risk Adapter.

    ### `0.1.0b20`

    * RFQ quoter sessions now keep running when the server introduces new error codes: unrecognized codes are carried on rejection errors as plain strings, while known codes stay typed through the `RfqErrorCode` enum.
    * Added `ConnectionLostError` carrying the WebSocket close `code` and `reason`. Losing an RFQ session connection now raises it from in-flight operations and the session iterator, instead of a generic `TransportError`. Closing the session still ends iteration cleanly.
    * Optional decimal fields on streamed market and user events treat empty strings as absent (for example a trade's `fee_rate_bps` or a price change's `best_bid` and `best_ask`).
    * Batch price reads return `TokenId`-keyed maps.
    * Perps streams handle fill and trade frames that batch multiple entries.

    ### `0.1.0b19`

    * Added `RESOLVED_PARTIAL` to `ComboPositionStatus` so Combo positions that resolve at a fractional payout (for example a voided leg) parse correctly instead of failing validation.

    ### `0.1.0b18`

    * Combo activity now parses the canonical `type` field returned by the Data API, instead of deriving lifecycle actions from legacy fields.

    ### `0.1.0b17`

    * Added SDK pagination for Combo lifecycle activity and server-cursor pagination for Combo positions.
    * Added typed overloads for market, event, and tag lookups, mutually-exclusive lookup arguments, and `redeem_positions`.
    * Added trade time filters.
    * Hardened Combo pagination filters and branded Combo activity IDs.
    * Breaking beta change: Combo activity and position fields now use `wallet`, `amount`, and `payout`; Combo activity rows no longer expose `module_kind`.

    ```diff theme={null}
    -activity.user_address
    -activity.amount_usdc
    -redeem_activity.payout_usdc
    -position.user_address
    +activity.wallet
    +activity.amount
    +redeem_activity.payout
    +position.wallet
    ```

    ### `0.1.0b16`

    * Fixed Deposit Wallet trading setup approvals to use the current Protocol V2 auto-redeem operator.

    ### `0.1.0b15`

    * Added support for Perps.

    ### `0.1.0b14`

    * Added builder API key management for creating, fetching, and revoking builder API keys.
    * Added support for merging multiple positions in one request.
    * Added runnable Python SDK examples for common integration workflows.
    * Resolve closed markets when redeeming positions.
    * Gasless transaction handles now wait for relayer transactions to reach confirmed state before resolving.

    ### `0.1.0b13`

    * Require GTD limit order expirations to be at least 3 minutes in the future.

    ### `0.1.0b12`

    * Support CLOB order tick sizes `0.005` and `0.0025`.

    ### `0.1.0b11`

    * Preserve already-deployed legacy UUPS Deposit Wallets when secure clients resolve the default wallet, while new Deposit Wallet deployments use the beacon factory path.
    * Retry rejected JSON-RPC batches by splitting them into smaller batches.
    * Added typed Gamma search sort fields for search requests.

    ### `0.1.0b10`

    * Preserve `group_item_title` on market responses so grouped market titles remain available after normalization.

    ### `0.1.0b9`

    * RFQ quoter sessions now emit typed `RfqTradeEvent` events for confirmed Combos fills.
    * RFQ rejection errors now expose `error_id` values and parse `INVALID_SIGNATURE` and `INTERNAL_ERROR` codes.

    ### `0.1.0b8`

    * Added `parent_event_id` to `Event` so child events can link back to their parent event.
    * Added `max_price` and `min_price` protection fields to market order requests.
    * Handle legacy multi-outcome market listings more safely by omitting markets that cannot be represented by the binary market model.
    * Normalize empty-string trade and position market icons to `None`.
    * Parse Combo trade activity rows correctly.
    * Support new Combos RFQ error codes for balance, allowance, and pre-execution reservation failures.
    * Broad user websocket subscriptions now omit market filters so all-market streams receive trade events.

    ### `0.1.0b7`

    * Point Combos RFQ endpoints at the production domains: `combos-rfq-api.polymarket.com` (REST) and `combos-rfq-gateway-quoter.polymarket.com` (quoter WebSocket).

    ### `0.1.0b6`

    * Added `list_combo_markets` for fetching the Combo market catalog with SDK pagination. See [Combos](/trading/combos/overview).
    * Parse RFQ quote rejections that use the `SUBMISSION_WINDOW_CLOSED` gateway error code.

    ### `0.1.0b5`

    * Added Combos support for multi-leg RFQ positions. See [Combos](/trading/combos/overview).
    * Added notebook-friendly model display for Jupyter workflows.
    * `ConditionId` is now deprecated in favor of `CtfConditionId`; existing
      `ConditionId` exports remain available as deprecated aliases.

    ### `0.1.0b4`

    * Added dataframe conversion support for SDK models and response collections.

    **Secure client setup now defaults to the Deposit Wallet flow**

    `AsyncSecureClient.create` can now derive and use the signer's deterministic
    Deposit Wallet when you omit `wallet`. If you already know which Polymarket
    wallet you want to use, keep passing `wallet`.

    ```diff theme={null}
    secure_client = await AsyncSecureClient.create(
        private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
    -    wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
    )
    ```

    If you want to keep account selection explicit, no change is required:

    ```python theme={null}
    secure_client = await AsyncSecureClient.create(
        private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
        wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
    )
    ```

    **`setup_trading_approvals()` now waits internally**

    You no longer need to wait on the returned handle. Call the method once before
    trading; it is safe to call again if approvals are already set.

    ```diff theme={null}
    -handle = await secure_client.setup_trading_approvals()
    -await handle.wait()
    +await secure_client.setup_trading_approvals()
    ```

    **Gasless setup helpers are deprecated**

    You no longer need to call `is_gasless_ready()` or `setup_gasless_wallet()` in
    the normal setup path. Create the secure client, then set up trading approvals.

    ```diff theme={null}
    -ready = await secure_client.is_gasless_ready()
    -
    -if not ready:
    -    secure_client = await secure_client.setup_gasless_wallet()
    -
     await secure_client.setup_trading_approvals()
    ```

    ### `0.1.0b1`

    First beta release of the unified Python SDK. Install the beta package with your
    package manager:

    ```bash theme={null}
    uv add polymarket-client
    ```
  </Tab>
</Tabs>
