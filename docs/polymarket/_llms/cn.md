<!--
Source: https://docs.polymarket.com/_llms/cn.md
Downloaded: 2026-09-09T22:17:58.165Z
-->

# Polymarket Documentation: Chinese

## Chinese

- [Chinese / API 参考 (119 pages)](https://docs.polymarket.com/_llms/cn/api.md): Documentation for Chinese / API 参考.

### 预测市场

#### 入门指南

- [概览](https://docs.polymarket.com/cn/index.md): 基于全球最大的预测市场进行构建。通过 Polymarket API 进行交易、集成并访问实时市场数据。
- [Polymarket 101](https://docs.polymarket.com/cn/polymarket-101.md): Polymarket 简介——全球最大的预测市场

##### SDK 与 API

- [SDK 与 API](https://docs.polymarket.com/cn/getting-started/sdks-apis.md): 选择与 Polymarket 集成的方式。
- [TypeScript SDK](https://docs.polymarket.com/cn/getting-started/typescript.md): 开始使用统一的 Polymarket TypeScript SDK。
- [Python SDK](https://docs.polymarket.com/cn/getting-started/python.md): 开始使用统一的 Polymarket Python SDK。
- [API](https://docs.polymarket.com/cn/getting-started/api.md): 直接使用 Polymarket REST API 和 WebSocket 流进行构建。
- [SDK 迁移](https://docs.polymarket.com/cn/getting-started/migrate-from-previous-sdks.md): 将现有的 Polymarket 集成迁移到统一的 SDK。

#### 核心概念

- [市场与事件](https://docs.polymarket.com/cn/concepts/markets-events.md): 了解 Polymarket 的基本构成要素
- [负风险市场](https://docs.polymarket.com/cn/concepts/negative-risk.md): 多结果事件的资本高效交易机制
- [价格与订单簿](https://docs.polymarket.com/cn/concepts/prices-orderbook.md): 价格机制以及订单簿如何实现点对点交易
- [持仓与代币](https://docs.polymarket.com/cn/concepts/positions-tokens.md): 了解 Polymarket 上的结果代币和持仓机制
- [Polymarket USD](https://docs.polymarket.com/cn/concepts/pusd.md): pUSD — Polymarket 上用于所有交易的抵押代币
- [订单生命周期](https://docs.polymarket.com/cn/concepts/order-lifecycle.md): 了解订单从创建到结算的完整流程
- [判定](https://docs.polymarket.com/cn/concepts/resolution.md): 市场如何判定以及如何兑换获胜持仓

#### 市场数据

- [概览](https://docs.polymarket.com/cn/market-data/overview.md): 了解 Polymarket 如何组织市场数据，以及应从何处开始。
- [发现市场](https://docs.polymarket.com/cn/market-data/discover-markets.md): 了解如何查找和筛选事件与市场，并探索相关元数据。
- [市场详情](https://docs.polymarket.com/cn/market-data/market-details.md): 了解 Polymarket 市场的结构和状态。
- [价格与订单簿](https://docs.polymarket.com/cn/market-data/prices-order-books.md): 了解价格与订单簿如何反映 Polymarket 上的交易活动。
- [分析](https://docs.polymarket.com/cn/market-data/public-analytics.md): 了解 Polymarket 上的活动与表现。
- [实时数据](https://docs.polymarket.com/cn/market-data/realtime-data.md): 通过 Polymarket 的实时数据流持续更新市场数据。
- [Chainlink TWAP 价格](https://docs.polymarket.com/cn/market-data/chainlink-twap.md): 直接通过 Chainlink 或 Polymarket RTDS 获取 Chainlink 计算的 TWAP 价格。

#### 交易

- [概览](https://docs.polymarket.com/cn/trading/overview.md): 了解 Polymarket 中订单、结算和持仓如何协同运作。
- [下第一笔订单](https://docs.polymarket.com/cn/trading/quickstart.md): 了解如何通过 CLOB 进行身份验证并提交第一笔市价单。
- [钱包与身份验证](https://docs.polymarket.com/cn/trading/wallets-auth.md): 连接或创建用于交易的 Polymarket 账户。
- [下单](https://docs.polymarket.com/cn/trading/place-orders.md): 了解如何下单并控制订单的执行方式
- [管理订单](https://docs.polymarket.com/cn/trading/manage-orders.md): 了解如何在提交订单后跟踪和管理订单。
- [实时订单更新](https://docs.polymarket.com/cn/trading/realtime-order-updates.md): 实时响应经过身份验证的订单和交易活动。
- [钱包活动](https://docs.polymarket.com/cn/trading/wallet-activity.md): 追踪与 Polymarket 钱包关联的持仓和活动。
- [费用](https://docs.polymarket.com/cn/trading/fees.md): 了解 Polymarket 的交易费用
- [做市](https://docs.polymarket.com/cn/trading/market-making.md): 在 Polymarket 上运行做市系统的指南。
- [撮合引擎重启](https://docs.polymarket.com/cn/trading/matching-engine.md): 维护窗口、重启处理以及重启后的仅挂单模式

##### 持仓

- [仓位的工作原理](https://docs.polymarket.com/cn/trading/positions/how-positions-work.md): 了解支撑 Polymarket 仓位的链上代币机制。
- [管理仓位](https://docs.polymarket.com/cn/trading/positions/manage.md): 了解如何管理结果代币库存，从创建直到赎回。
- [组合仓位](https://docs.polymarket.com/cn/trading/positions/combinatorial.md): 由现有 Polymarket 结果构建的多腿仓位

##### Combos

- [Combos 的运作方式](https://docs.polymarket.com/cn/trading/combos/overview.md): 了解多腿市场的 Combo 持仓和 RFQ 流程
- [做市商](https://docs.polymarket.com/cn/trading/combos/market-makers.md): 构建用于定价和执行 Combos 的做市商集成

##### 跨链桥

- [存款](https://docs.polymarket.com/cn/trading/bridge/deposit.md): 从任何受支持的链桥接资产，为你的 Polymarket 账户充值
- [受支持资产](https://docs.polymarket.com/cn/trading/bridge/supported-assets.md): 支持存入 Polymarket 的链和代币
- [报价](https://docs.polymarket.com/cn/trading/bridge/quote.md): 预览存款和提款的费用及预计输出
- [提款](https://docs.polymarket.com/cn/trading/bridge/withdraw.md): 将 pUSD 从 Polymarket 桥接到任何受支持的链
- [交易状态](https://docs.polymarket.com/cn/trading/bridge/status.md): 跟踪跨链桥存款和提款直至完成

#### 计划

- [Taker 返利计划](https://docs.polymarket.com/cn/programs/taker-rebates.md): 随着你的交易攀升等级，每日赚取 pUSD 返利
- [Maker 返利计划](https://docs.polymarket.com/cn/programs/maker-rebates.md): 通过在 Polymarket 提供流动性赚取每日 pUSD 返利
- [流动性奖励](https://docs.polymarket.com/cn/programs/liquidity-rewards.md): 在 Polymarket 上提供流动性获得奖励
- [推荐计划](https://docs.polymarket.com/cn/programs/referral-program.md): 向交易者推荐 Polymarket，并每日赚取 pUSD 奖励

##### Builder 计划

- [概览](https://docs.polymarket.com/cn/programs/builders/overview.md): 构建通过 Polymarket 路由订单的应用
- [Builder 费用](https://docs.polymarket.com/cn/programs/builders/fees.md): 了解 Builder 如何从通过其应用路由的订单中赚取费用，以及如何完成集成。
- [Tiers](https://docs.polymarket.com/cn/programs/builders/tiers.md): 速率限制、奖励以及如何升级

#### 资源

- [合约](https://docs.polymarket.com/cn/resources/contracts.md): Polymarket 所有智能合约地址、审计与安全资源
- [数据资源](https://docs.polymarket.com/cn/resources/blockchain-data.md): 访问 Polymarket 链上活动数据并进行分析
- [错误码](https://docs.polymarket.com/cn/resources/error-codes.md): CLOB API 错误响应完整参考

## OpenAPI Specs

- [gamma-openapi](/api-spec/gamma-openapi.yaml)
- [clob-openapi](/api-spec/clob-openapi.yaml)
- [data-openapi](/api-spec/data-openapi.yaml)
- [relayer-openapi](/api-spec/relayer-openapi.yaml)
- [combos-rfq-openapi](/api-spec/combos-rfq-openapi.yaml)
- [perps-openapi](/api-spec/perps-openapi.json)
- [bridge-openapi](/api-spec/bridge-openapi.yaml)

## AsyncAPI Specs

- [asyncapi-rfq](/asyncapi-rfq.json)
- [asyncapi-perps](/asyncapi-perps.json)
- [asyncapi](/asyncapi.json)
- [asyncapi-user](/asyncapi-user.json)
- [asyncapi-sports](/asyncapi-sports.json)
