<!--
Source: https://docs.polymarket.com/_llms/cn/api.md
Downloaded: 2026-09-11T22:17:35.061Z
-->

# Polymarket Documentation: Chinese API 参考

## API 参考

### 概览

- [概览](https://docs.polymarket.com/cn/api-reference/predictions/overview.md): 了解用于构建 Polymarket 预测市场集成的 API。
- [速率限制](https://docs.polymarket.com/cn/api-reference/rate-limits.md): Polymarket API 的 Cloudflare IP 速率限制
- [CLOB 交易速率限制](https://docs.polymarket.com/cn/api-reference/trading-rate-limits.md): 按签名者地址划分的 CLOB 下单和取消令牌桶限制
- [地区限制](https://docs.polymarket.com/cn/api-reference/geoblock.md): 在 Polymarket API 下单前检查地区限制
- [Data API v2](https://docs.polymarket.com/cn/api-reference/data-api/overview.md): 通过统一的响应契约读取钱包投资组合、交易与活动流、市场状态以及排行榜。
- [获取数据新鲜度](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-status.md): How fresh the data behind this API is.

### 事件

- [获取事件列表（键集分页）](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-events-keyset.md): Returns events using cursor-based (keyset) pagination for stable, efficient paging through large result sets. Use `next_cursor` from each response as `after_cursor` in the next request. The `offset` parameter is explicitly rejected; use `after_cursor` instead.
- [获取事件列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-events.md)
- [按 ID 获取事件](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-events-id.md)
- [按 Slug 获取事件](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-events-slug-slug.md)
- [获取事件标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-events-id-tags.md)

### 市场

- [获取市场列表（键集分页）](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-markets-keyset.md): Returns markets using cursor-based (keyset) pagination for stable, efficient paging through large result sets. Use `next_cursor` from each response as `after_cursor` in the next request. The `offset` parameter is explicitly rejected; use `after_cursor` instead.
- [获取市场列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-markets.md)
- [按 ID 获取市场](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-markets-id.md)
- [按 Slug 获取市场](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-markets-slug-slug.md)
- [按 ID 获取市场标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-markets-id-tags.md)
- [按 Token 获取市场](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-markets-by-token-token-id.md): Returns the parent market for a given token ID. Useful when you have a token ID and need to resolve its parent market without knowing the condition ID in advance.
- [列出市场最大持仓者](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-holders.md): Top holders of a market, netted per user and grouped by outcome token.
- [获取市场未平仓量](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-oi.md): Priced gross open interest per market.
- [获取事件实时成交量](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-live-volume.md): Cumulative one-side (taker) volume per market.
- [获取市场结算状态](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-resolutions.md): Complete resolution state by one selector family.
- [获取简化市场](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-simplified-markets.md)
- [获取抽样市场](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-sampling-markets.md)
- [获取简化抽样市场](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-sampling-simplified-markets.md)

### 订单簿与价格

- [获取订单簿](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-book.md): Retrieves the order book summary for a specific token ID. Includes bids, asks, market details, and last trade price.
- [获取订单簿（请求体）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-books.md): Retrieves order book summaries for multiple token IDs using a request body.
- [获取市场价格](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-price.md): Retrieves the best market price for a specific token ID and side (bid or ask). Returns the best bid price for BUY side or best ask price for SELL side.
- [获取市场价格（查询参数）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-prices.md): Retrieves market prices for multiple token IDs and sides using query parameters.
- [获取市场价格（请求体）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-prices.md): Retrieves market prices for multiple token IDs and sides using a request body. Each request must include both token_id and side.
- [获取中间价](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-midpoint.md): Retrieves the midpoint price for a specific token ID. The midpoint is calculated as the average of the best bid and best ask prices.
- [获取中间价（查询参数）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-midpoints.md): Retrieves midpoint prices for multiple token IDs using query parameters. The midpoint is calculated as the average of the best bid and best ask prices.
- [获取中间价（请求体）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-midpoints.md): Retrieves midpoint prices for multiple token IDs using a request body. The midpoint is calculated as the average of the best bid and best ask prices.
- [获取价差](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-spread.md): Retrieves the spread for a specific token ID. The spread is the difference between the best ask and best bid prices.
- [获取价差](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-spreads.md): Retrieves spreads for multiple token IDs. The spread is the difference between the best ask and best bid prices.
- [获取最新成交价](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-last-trade-price.md): Retrieves the last trade price and side for a specific token ID. Returns default values of "0.5" for price and empty string for side if no trades found.
- [获取最新成交价（查询参数）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-last-trades-prices.md): Retrieves last trade prices for multiple token IDs using query parameters. Maximum 500 token IDs can be requested per call.
- [获取最新成交价（请求体）](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-last-trades-prices.md): Retrieves last trade prices for multiple token IDs using a request body. Maximum 500 token IDs can be requested per call.
- [获取历史价格](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-prices-history.md): Retrieve historical price data for a market.
- [获取代币价格历史](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-prices-history.md): The price-history series for one outcome token, or a single point-in-time observation.
- [批量获取历史价格](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-batch-prices-history.md): Retrieve historical price data for multiple markets in a single request.
- [获取费率](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-fee-rate.md): Retrieves the base fee rate for a specific token ID. The fee rate can be provided either as a query parameter or as a path parameter.
- [通过路径参数获取费率](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-fee-rate-token-id.md): Retrieves the base fee rate for a specific token ID using the token ID as a path parameter.
- [获取最小价格变动单位](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-tick-size.md): Retrieves the minimum tick size (price increment) for a specific token ID. The tick size can be provided either as a query parameter or as a path parameter.
- [通过路径参数获取最小价格变动单位](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-tick-size-token-id.md): Retrieves the minimum tick size (price increment) for a specific token ID using the token ID as a path parameter.
- [获取 CLOB 市场信息](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-clob-markets-condition-id.md): Returns all CLOB-level parameters for a market in a single call — tokens, tick size, base fees, rewards, RFQ status, and fee details.
- [获取服务器时间](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-time.md): Returns the current Unix timestamp of the server. This can be used to synchronize client time with server time.

### 订单

- [提交新订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-order.md): Creates a new order in the order book
- [取消单个订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/delete-order.md): Cancels a single order by its ID. Works even in cancel-only mode.
- [按 ID 获取订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-data-order-orderid.md): Retrieves a specific order by its ID (order hash) for the authenticated user, including canceled or fully matched orders. Builder-authenticated clients can also use this endpoint to retrieve orders attributed to their builder account.
- [批量提交订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-orders.md): Creates multiple new orders in the order book. Orders are processed in parallel. Maximum 15 orders per request.
- [获取用户订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-data-orders.md): Retrieves live orders for the authenticated user. Returns paginated results. Filtering by id returns that order regardless of status, including canceled or fully matched orders. Builder-authenticated clients can also use this endpoint to retrieve orders attributed to their builder account.
- [批量取消订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/delete-orders.md): Cancels multiple orders by their IDs. Maximum 1000 orders per request. Duplicate order IDs in the request are automatically ignored. Works even in cancel-only mode.
- [取消所有订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/delete-cancel-all.md): Cancels all open orders for the authenticated user. Works even in cancel-only mode.
- [取消市场订单](https://docs.polymarket.com/cn/api-reference/endpoints/clob/delete-cancel-market-orders.md): Cancels all open orders for the authenticated user in a specific market (condition) and asset. Works even in cancel-only mode.
- [获取订单计分状态](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-order-scoring.md): Checks if a specific order is currently scoring for rewards.
- [发送心跳](https://docs.polymarket.com/cn/api-reference/endpoints/clob/post-heartbeats.md): Sends a heartbeat signal to maintain active session status. If heartbeats are not sent regularly, all open orders for the user will be automatically canceled. This is useful for automated trading systems that need to ensure orders are canceled if the system becomes unresponsive.

### 交易

- [列出交易](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-trades.md): Keyset-paginated trade feed in the standard `{ data, pagination }` envelope.
- [获取交易](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-data-trades.md): Retrieves trades for the authenticated user. Returns paginated results. Requires readonly or level 2 API key authentication.
- [获取 Builder 交易](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-builder-trades.md): Retrieves trades attributed to a builder code.

### 返利

- [获取做市商当前返佣](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rebates-current.md): Returns the current rebated fees for a maker address on a given date.

### 奖励

- [获取当前有效的奖励配置](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-markets-current.md): Returns all current active rewards configurations grouped by market.
- [获取指定市场的原始奖励](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-markets-condition-id.md): Returns an array of present and future rewards configured on a market.
- [获取多个奖励市场](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-markets-multi.md): Returns a list of active markets with their reward configurations. Supports text search, tag filtering, numeric filters, and sorting.
- [获取用户指定日期的收益](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-user.md): Returns an array of user earnings per market for a provided day.
- [获取用户指定日期的总收益](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-user-total.md): Returns the summed total rewards earnings for a user on a provided day, grouped by asset address.
- [获取用户奖励比例](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-user-percentages.md): Returns the real-time percentages of rewards that a user is earning per market.
- [获取用户收益和市场配置](https://docs.polymarket.com/cn/api-reference/endpoints/clob/get-rewards-user-markets.md): Returns an array of current rewards including user earnings and live percentages per market for a provided day.

### 个人资料

- [按钱包地址获取公开资料](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-public-profile.md)
- [获取用户资料统计](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-user-stats.md): The profile card for one wallet in a single call.
- [获取用户或市场的仓位](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-positions.md): A keyset page of positions in the standard `{ data, pagination }` envelope. One route serves a user's open book, their closed book (`status=CLOSED`), and a market's holders (market anchor).
- [获取投资组合价值](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-value.md): The user's portfolio value: single-market holdings marked to market plus unresolved combo positions at cost basis.
- [获取用户盈亏曲线](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-user-pnl.md): Complete cumulative native-PnL atoms and compositions.
- [获取用户交易量](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-user-volume.md): One wallet's trading volume over a window, in both units side by side.
- [列出账户活动](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-activity.md): Keyset-paginated activity feed (trades, splits, merges, redeems, …) in the standard `{ data, pagination }` envelope.
- [获取钱包授权状态](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-approvals.md): Polygon token/operator approval state for one wallet.

### 榜单

- [获取交易者榜单](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-leaderboard.md): The ranked board of realized PnL, combos included.
- [获取最大盈利榜](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-biggest-winners.md): The biggest single winning positions.
- [获取 Builder 排行榜](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-builders-leaderboard.md): The ranked board of builders by volume.
- [获取 Builder 交易量走势](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-builders-volume.md): The per-builder volume time series.

### 搜索

- [搜索市场、事件和资料](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-public-search.md)

### 标签

- [获取标签列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags.md)
- [按 ID 获取标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-id.md)
- [按 Slug 获取标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-slug-slug.md)
- [按标签 ID 获取相关标签关系](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-id-related-tags.md)
- [按标签 Slug 获取相关标签关系](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-slug-slug-related-tags.md)
- [获取与标签 ID 相关的标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-id-related-tags-tags.md)
- [获取与标签 Slug 相关的标签](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-tags-slug-slug-related-tags-tags.md)

### 系列

- [获取系列列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-series.md)
- [按 ID 获取系列](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-series-id.md)

### 评论

- [获取评论列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-comments.md)
- [按评论 ID 获取评论](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-comments-id.md)
- [按用户地址获取评论](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-comments-user-address-user-address.md)

### 体育

- [获取体育元数据](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-sports.md)
- [获取有效的体育市场类型](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-sports-market-types.md)
- [获取队伍列表](https://docs.polymarket.com/cn/api-reference/endpoints/gamma/get-teams.md)

### Relayer

- [提交交易](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/post-submit.md): Submit a transaction request to the Relayer. Authenticated using Builder API Keys or Relayer API Keys.
- [按 ID 获取交易](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-transaction.md): Gets a transaction submitted to the Relayer. Takes in a required transaction ID as a query parameter.
- [获取用户最近的交易](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-transactions.md): Gets the most recent transactions submitted to the Relayer, owned by a specific user. Authenticated using Builder API Keys or Relayer API Keys.
- [获取用户当前 Nonce](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-nonce.md): Gets the current Proxy or Safe nonce for a user. Takes in the user's signer address and the type of nonce to retrieve.
- [获取 Relayer 地址和 Nonce](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-relay-payload.md): Fetches the relayer address and nonce for a specific user. Takes in the user's signer address and the type of nonce to retrieve.
- [检查钱包是否已部署](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-deployed.md): Returns whether the wallet at the given address is deployed onchain.
- [获取所有 Relayer API Key](https://docs.polymarket.com/cn/api-reference/endpoints/relayer/get-relayer-api-keys.md): Returns all relayer API keys for the authenticated address. Auth allowed: Gamma auth or Relayer API key auth (`RELAYER_API_KEY` + `RELAYER_API_KEY_ADDRESS`).

### Combos

- [获取组合市场](https://docs.polymarket.com/cn/api-reference/endpoints/combos-rfq/get-v1-rfq-combo-markets.md): Returns active markets that can be used as combo legs, ordered by volume descending. This endpoint is public and does not require CLOB authentication.
- [提交报价](https://docs.polymarket.com/cn/api-reference/endpoints/combos-rfq/post-v1-maker-quotes.md): Submit a signed maker quote for an active RFQ. Requires CLOB L2 authentication for the maker role.
- [取消报价](https://docs.polymarket.com/cn/api-reference/endpoints/combos-rfq/post-v1-maker-quotes-cancel.md): Cancel an active maker quote before it is selected. Requires CLOB L2 authentication for the maker role. `signer_address` and `maker_address` must match the authenticated identity.
- [确认或拒绝最终确认](https://docs.polymarket.com/cn/api-reference/endpoints/combos-rfq/post-v1-maker-confirmations.md): Respond to a last-look confirmation request for a selected quote. Requires CLOB L2 authentication for the maker role. `decision` must be `CONFIRM` or `DECLINE`.
- [列出组合仓位](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-positions-combos.md): Combo positions for a user, in the standard `{ data, pagination }` envelope.
- [列出组合活动](https://docs.polymarket.com/cn/api-reference/endpoints/data-v2/get-activity-combos.md): Keyset-paginated combo lifecycle + redemption feed for a user, in the standard `{ data, pagination }` envelope.
- [报价方网关](https://docs.polymarket.com/cn/api-reference/wss/rfq.md): Authenticated WebSocket for combinatorial RFQ quoters — receive requests, submit quotes, confirm last look, and track execution.

### 永续合约

- [修改订单](https://docs.polymarket.com/cn/api-reference/endpoints/perps/patch-trade-orders.md): Modify the price and total quantity of existing orders by exchange order ID. Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
- [按客户端订单 ID 修改订单](https://docs.polymarket.com/cn/api-reference/endpoints/perps/patch-trade-orders-coid.md): Modify the price and total quantity of existing orders by client order ID. Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).
- [修改订单](https://docs.polymarket.com/cn/api-reference/wss/perps-modify-orders.md): 通过永续合约 WebSocket 按订单 ID 修改订单。
- [按客户端订单 ID 修改订单](https://docs.polymarket.com/cn/api-reference/wss/perps-modify-orders-coid.md): 通过永续合约 WebSocket 按客户端订单 ID 修改订单。
- [批量更新杠杆](https://docs.polymarket.com/cn/api-reference/endpoints/perps/patch-trade-leverage-batch.md): Update leverage for up to 100 unique instruments. Updates are processed sequentially and are not atomic. If only some responses arrive before the gateway deadline, missing item results use `internal_error`; whether those updates applied is unknown. If no responses arrive, the request returns 500. Re…
- [批量更新杠杆](https://docs.polymarket.com/cn/api-reference/wss/perps-update-leverages.md): 通过永续合约 WebSocket 批量更新杠杆。
- [获取交易所统计数据](https://docs.polymarket.com/cn/api-reference/endpoints/perps/get-info-exchange-stats.md): Get aggregate statistics for all pUSD-quoted Polymarket perpetual markets. The time window is half-open: trades at `start_timestamp` are included and trades at `end_timestamp` are excluded. The maximum window is 31 days. Open interest is the one-sided USD notional from the latest complete sample bef…

### WebSocket

- [市场频道](https://docs.polymarket.com/cn/api-reference/wss/market.md): Public WebSocket for real-time orderbook, price, and market lifecycle updates.
- [用户频道](https://docs.polymarket.com/cn/api-reference/wss/user.md): Authenticated WebSocket for real-time order and trade updates.
- [体育频道](https://docs.polymarket.com/cn/api-reference/wss/sports.md): Public WebSocket for real-time sports match results.

### 跨链桥

- [获取支持的资产](https://docs.polymarket.com/cn/api-reference/endpoints/bridge/get-supported-assets.md)
- [创建跨链桥地址](https://docs.polymarket.com/cn/api-reference/endpoints/bridge/post-deposit.md)
- [获取报价](https://docs.polymarket.com/cn/api-reference/endpoints/bridge/post-quote.md)
- [获取交易状态](https://docs.polymarket.com/cn/api-reference/endpoints/bridge/get-status-address.md): Returns the deposits and withdrawals seen at a bridge address, newest first. Responses are cursor-paginated: each request returns one page plus a `nextCursor`. To read the full history, pass each `nextCursor` back as `cursor` until it comes back null. To track only recent activity, keep requesting t…
- [创建提现地址](https://docs.polymarket.com/cn/api-reference/endpoints/bridge/post-withdraw.md)

### 数据 API v1（旧版）

- [迁移到 Data API v2](https://docs.polymarket.com/cn/api-reference/data-api/migrating-from-v1.md): 把集成从原有的 Data API 路由迁移到 v2 对应路由：路由映射、契约变化，以及哪些路由继续留在 v1。
- [获取用户当前仓位](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-positions.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/positions`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取用户已关闭的仓位](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-closed-positions.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/positions?status=CLOSED`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取市场仓位](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-market-positions.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/positions`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取用户或市场的交易](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-trades.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/trades`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取用户活动](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-activity.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/activity`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取用户仓位总价值](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-value.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/value`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取用户交易过的市场总数](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-traded.md)
- [下载账户快照（CSV ZIP）](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-accounting-snapshot.md)
- [获取市场主要持仓者](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-holders.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/holders`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取未平仓量](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-oi.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/oi`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取事件实时交易量](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-live-volume.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/live-volume`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取交易者排行榜](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-leaderboard.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/leaderboard`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取 Builder 汇总排行榜](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-builders-leaderboard.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/builders/leaderboard`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取 Builder 每日交易量时间序列](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-builders-volume.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/builders/volume`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1).
- [获取用户组合仓位](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-positions-combos.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/positions/combos`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1). Combinatorial (multi-market) positions held by a user, with per-leg breakdown. Also available at /v1/data/user/{address}/positions/combos (address…
- [获取用户组合活动](https://docs.polymarket.com/cn/api-reference/endpoints/data/get-v1-activity-combos.md): **Data API v2:** this route has a v2 counterpart, `GET /v2/activity/combos`. See [Migrating to Data API v2](/api-reference/data-api/migrating-from-v1). Combo lifecycle and redeem events (split / merge / convert / compress / wrap / unwrap / redeem) for a user, with per-leg breakdown. The combo counte…

## OpenAPI Specs

- [openapi](https://data-api.polymarket.com/v2/openapi.json)
- [gamma-openapi](/api-spec/gamma-openapi.yaml)
- [clob-openapi](/api-spec/clob-openapi.yaml)
- [relayer-openapi](/api-spec/relayer-openapi.yaml)
- [combos-rfq-openapi](/api-spec/combos-rfq-openapi.yaml)
- [perps-openapi](/api-spec/perps-openapi.json)
- [bridge-openapi](/api-spec/bridge-openapi.yaml)
- [data-openapi](/api-spec/data-openapi.yaml)

## AsyncAPI Specs

- [asyncapi-rfq](/asyncapi-rfq.json)
- [asyncapi-perps](/asyncapi-perps.json)
- [asyncapi](/asyncapi.json)
- [asyncapi-user](/asyncapi-user.json)
- [asyncapi-sports](/asyncapi-sports.json)
