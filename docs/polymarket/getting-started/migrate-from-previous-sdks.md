<!--
Source: https://docs.polymarket.com/getting-started/migrate-from-previous-sdks.md
Downloaded: 2026-07-23T21:04:54.609Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SDK Migration

> Move an existing Polymarket integration to the unified SDKs.

Migrate from the previous CLOB, relayer, and builder-signing clients to the
unified SDK.

<Tabs>
  <Tab title="TypeScript">
    The examples below map previous client capabilities to
    `@polymarket/client`. The SDK also covers the Gamma API and Data API. Migrating
    direct Gamma and Data calls can simplify application code and give you
    normalized, typed models that work seamlessly with the SDK's trading and
    account workflows.

    ## Install the Unified SDK

    Remove the previous CLOB, relayer, and builder-signing packages used by your
    integration. Then install the unified SDK and your wallet library.

    <CodeGroup>
      ```bash npm theme={null}
      npm uninstall @polymarket/clob-client-v2 @polymarket/builder-relayer-client @polymarket/builder-signing-sdk
      npm install @polymarket/client@latest viem
      ```

      ```bash pnpm theme={null}
      pnpm remove @polymarket/clob-client-v2 @polymarket/builder-relayer-client @polymarket/builder-signing-sdk
      pnpm add @polymarket/client@latest viem
      ```

      ```bash Yarn theme={null}
      yarn remove @polymarket/clob-client-v2 @polymarket/builder-relayer-client @polymarket/builder-signing-sdk
      yarn add @polymarket/client@latest viem
      ```

      ```bash Bun theme={null}
      bun remove @polymarket/clob-client-v2 @polymarket/builder-relayer-client @polymarket/builder-signing-sdk
      bun add @polymarket/client@latest viem
      ```
    </CodeGroup>

    <Info>
      The unified SDK includes signer adapters for Viem, Privy, and Ethers v5, so
      you can connect your wallet library without implementing CLOB-specific
      signing. See [Wallet
      Integrations](/getting-started/typescript#wallet-integrations) for setup
      examples.
    </Info>

    ## Client and Wallet Setup

    ### Create a Public Client

    `PublicClient` provides unauthenticated market discovery and data reads.
    `createPublicClient` uses production by default and does not require a host or
    chain ID.

    ```ts Before theme={null}
    import { ClobClient } from "@polymarket/clob-client-v2";

    const client = new ClobClient({
      host: "https://clob.polymarket.com",
      chain: 137,
    });
    ```

    ```ts After theme={null}
    import { createPublicClient } from "@polymarket/client";

    const client = createPublicClient();
    ```

    ### Create an Authenticated Client

    `SecureClient` adds authenticated trading, account, and wallet actions.
    `createSecureClient` derives or creates CLOB credentials, resolves the account
    wallet, and configures the correct signing flow.

    ```ts Before theme={null}
    import { ClobClient, SignatureTypeV2 } from "@polymarket/clob-client-v2";

    const tempClient = new ClobClient({
      host: "https://clob.polymarket.com",
      chain: 137,
      signer,
    });
    const credentials = await tempClient.createOrDeriveApiKey();

    const client = new ClobClient({
      host: "https://clob.polymarket.com",
      chain: 137,
      signer,
      creds: credentials,
      signatureType: SignatureTypeV2.POLY_1271,
      funderAddress: process.env.POLYMARKET_WALLET_ADDRESS,
    });
    ```

    ```ts After theme={null}
    import { type ApiKeyCreds, createSecureClient } from "@polymarket/client";
    import { privateKey } from "@polymarket/client/viem";

    const client = await createSecureClient({
      wallet: process.env.POLYMARKET_WALLET_ADDRESS,
      signer: privateKey(process.env.POLYMARKET_PRIVATE_KEY),
    });
    ```

    Omit `wallet` to use the default Deposit Wallet flow.

    ### Resume With Existing Credentials

    Read credentials from an authenticated client, store them securely, and pass
    them to a new client to resume with the same API key. The signer and wallet must
    identify the account that owns the credentials.

    ```ts Before theme={null}
    import { ClobClient, SignatureTypeV2 } from "@polymarket/clob-client-v2";

    const credentials = client.creds;
    if (!credentials) throw new Error("Client has no credentials");

    // Store the credentials securely.

    const resumedClient = new ClobClient({
      host: "https://clob.polymarket.com",
      chain: 137,
      signer,
      creds: credentials,
      signatureType: SignatureTypeV2.POLY_1271,
      funderAddress: process.env.POLYMARKET_WALLET_ADDRESS,
    });
    ```

    ```ts After theme={null}
    import { createSecureClient } from "@polymarket/client";
    import { privateKey } from "@polymarket/client/viem";

    const credentials = client.credentials;

    // Store the credentials securely.

    const resumedClient = await createSecureClient({
      wallet: process.env.POLYMARKET_WALLET_ADDRESS,
      signer: privateKey(process.env.POLYMARKET_PRIVATE_KEY),
      // Restore the type if loading from storage erased it.
      credentials: credentials as ApiKeyCreds,
    });
    ```

    ### Revoke the Current API Key

    Ending authentication revokes the current API key, invalidates the
    `SecureClient`, and returns a `PublicClient`.

    ```ts Before theme={null}
    await client.deleteApiKey();
    ```

    ```ts After theme={null}
    const publicClient = await client.endAuthentication();
    ```

    ### Configure Builder API Keys

    `SecureClient` accepts Builder authorization for gasless wallet actions.
    Migrate local or remote Builder signing to the matching helper.

    **Local Builder API key**

    Keep local Builder credentials on the server. The Node.js entrypoint generates
    the required HMAC headers.

    ```ts Before theme={null}
    import { RelayClient } from "@polymarket/builder-relayer-client";
    import { BuilderConfig } from "@polymarket/builder-signing-sdk";

    const builderConfig = new BuilderConfig({
      localBuilderCreds: {
        key: process.env.POLYMARKET_BUILDER_API_KEY!,
        secret: process.env.POLYMARKET_BUILDER_SECRET!,
        passphrase: process.env.POLYMARKET_BUILDER_PASSPHRASE!,
      },
    });

    const relayer = new RelayClient(
      "https://relayer-v2.polymarket.com",
      137,
      walletClient,
      builderConfig,
    );
    ```

    ```ts After theme={null}
    import { createSecureClient } from "@polymarket/client";
    import { builderApiKey } from "@polymarket/client/node";
    import { privateKey } from "@polymarket/client/viem";

    const client = await createSecureClient({
      signer: privateKey(process.env.POLYMARKET_PRIVATE_KEY),
      apiKey: builderApiKey({
        key: process.env.POLYMARKET_BUILDER_API_KEY!,
        secret: process.env.POLYMARKET_BUILDER_SECRET!,
        passphrase: process.env.POLYMARKET_BUILDER_PASSPHRASE!,
      }),
    });
    ```

    **Remote Builder Signing**

    Keep Builder credentials behind your signing endpoint. The client sends the
    same `{ method, path, body }` request and applies the same Builder headers, so
    the endpoint contract does not change.

    ```ts Before theme={null}
    import { RelayClient } from "@polymarket/builder-relayer-client";
    import { BuilderConfig } from "@polymarket/builder-signing-sdk";

    const builderConfig = new BuilderConfig({
      remoteBuilderConfig: {
        url: "https://example.com/api/builder/sign",
        token: process.env.BUILDER_SIGNING_TOKEN,
      },
    });

    const relayer = new RelayClient(
      "https://relayer-v2.polymarket.com",
      137,
      walletClient,
      builderConfig,
    );
    ```

    ```ts After theme={null}
    import { createSecureClient, remoteBuilderSigning } from "@polymarket/client";

    const client = await createSecureClient({
      signer,
      apiKey: remoteBuilderSigning({
        url: "https://example.com/api/builder/sign",
        headers: {
          Authorization: `Bearer ${process.env.BUILDER_SIGNING_TOKEN}`,
        },
      }),
    });
    ```

    On the signing server, replace `BuilderConfig.generateBuilderHeaders` with
    `buildHmacSignature`. Keep your existing caller authentication and
    authorization around this handler.

    ```ts Before theme={null}
    import { BuilderConfig } from "@polymarket/builder-signing-sdk";

    const builderConfig = new BuilderConfig({
      localBuilderCreds: {
        key: process.env.POLYMARKET_BUILDER_API_KEY!,
        secret: process.env.POLYMARKET_BUILDER_SECRET!,
        passphrase: process.env.POLYMARKET_BUILDER_PASSPHRASE!,
      },
    });

    export async function POST(request: Request): Promise<Response> {
      const { body, method, path } = await request.json();
      const headers = await builderConfig.generateBuilderHeaders(
        method,
        path,
        body,
      );

      return Response.json(headers);
    }
    ```

    ```ts After theme={null}
    import { buildHmacSignature } from "@polymarket/client";

    export async function POST(request: Request): Promise<Response> {
      const { body, method, path } = await request.json();
      const timestamp = Math.floor(Date.now() / 1000);

      return Response.json({
        POLY_BUILDER_API_KEY: process.env.POLYMARKET_BUILDER_API_KEY!,
        POLY_BUILDER_PASSPHRASE: process.env.POLYMARKET_BUILDER_PASSPHRASE!,
        POLY_BUILDER_SIGNATURE: await buildHmacSignature(
          process.env.POLYMARKET_BUILDER_SECRET!,
          timestamp,
          method,
          path,
          body,
        ),
        POLY_BUILDER_TIMESTAMP: `${timestamp}`,
      });
    }
    ```

    ### Configure Relayer API Keys

    `SecureClient` configures Relayer API keys directly. Pass the key and its
    associated address to `relayerApiKey` when reconnecting an existing account.

    ```ts theme={null}
    import { createSecureClient, relayerApiKey } from "@polymarket/client";
    import { privateKey } from "@polymarket/client/viem";

    const client = await createSecureClient({
      wallet: process.env.POLYMARKET_WALLET_ADDRESS,
      signer: privateKey(process.env.POLYMARKET_PRIVATE_KEY),
      apiKey: relayerApiKey({
        key: process.env.POLYMARKET_RELAYER_API_KEY!,
        address: process.env.POLYMARKET_RELAYER_API_KEY_ADDRESS!,
      }),
    });
    ```

    ### Deploy a Deposit Wallet

    Creating a `SecureClient` without a `wallet` derives the signer's Deposit Wallet
    address and deploys it when needed. Use one of the Builder authorization
    strategies above to authorize the deployment.

    ```ts Before theme={null}
    const deployment = await relayer.deployDepositWallet();
    await deployment.wait();
    ```

    ```ts After theme={null}
    import { createSecureClient } from "@polymarket/client";
    import { builderApiKey } from "@polymarket/client/node";
    import { privateKey } from "@polymarket/client/viem";

    const client = await createSecureClient({
      signer: privateKey(process.env.POLYMARKET_PRIVATE_KEY),
      apiKey: builderApiKey({
        key: process.env.POLYMARKET_BUILDER_API_KEY!,
        secret: process.env.POLYMARKET_BUILDER_SECRET!,
        passphrase: process.env.POLYMARKET_BUILDER_PASSPHRASE!,
      }),
    });

    const depositWalletAddress = client.account.wallet;
    ```

    ## Market Discovery

    ### Fetch a Market

    Both `PublicClient` and `SecureClient` provide `fetchMarket` for reads by Gamma
    market ID, slug, or Polymarket URL.

    ```ts Before theme={null}
    const market = await client.getMarket("CONDITION_ID");
    ```

    ```ts After theme={null}
    const market = await client.fetchMarket({ slug: "MARKET_SLUG" });
    ```

    If you only have a condition ID, filter `listMarkets` and fetch its first page.

    ```ts theme={null}
    const page = await client
      .listMarkets({ conditionIds: ["CONDITION_ID"] })
      .firstPage();

    const market = page.items[0];
    ```

    ### List Markets

    Both `PublicClient` and `SecureClient` provide `listMarkets`, which returns a
    paginator and accepts filters directly.

    ```ts Before theme={null}
    const page = await client.getMarkets();
    const markets = page.data;
    ```

    ```ts After theme={null}
    const pages = client.listMarkets({ closed: false, pageSize: 20 });
    const page = await pages.firstPage();
    const markets = page.items;
    ```

    `getSimplifiedMarkets` does not need a separate replacement. Unified market
    models are normalized for SDK use. Sampling-market reads should migrate to
    `listCurrentRewards`, which lists the active reward configurations.

    ```ts Before theme={null}
    const markets = await client.getSamplingMarkets();
    const page = await client.getSamplingSimplifiedMarkets();
    ```

    ```ts After theme={null}
    const pages = client.listCurrentRewards();
    const page = await pages.firstPage();
    ```

    ## Market Data

    ### Read Trading Parameters

    Both `PublicClient` and `SecureClient` return tick size and negative-risk status
    on the unified market model. Order methods also resolve them automatically, so
    you no longer pass either value when placing an order.

    ```ts Before theme={null}
    const tickSize = await client.getTickSize("TOKEN_ID");
    const negRisk = await client.getNegRisk("TOKEN_ID");
    ```

    ```ts After theme={null}
    const page = await client
      .listMarkets({ clobTokenIds: ["TOKEN_ID"] })
      .firstPage();

    const market = page.items[0];
    const tickSize = market?.trading.minimumTickSize;
    const negRisk = market?.state.negRisk;
    ```

    ### Read CLOB Market Details

    Both `PublicClient` and `SecureClient` return the normalized market model for
    public product data. Its trading fields replace the compact CLOB market response
    and standalone fee reads.

    ```ts Before theme={null}
    const info = await client.getClobMarketInfo("CONDITION_ID");
    const feeRateBps = await client.getFeeRateBps("TOKEN_ID");
    const feeExponent = await client.getFeeExponent("TOKEN_ID");
    ```

    ```ts After theme={null}
    const page = await client
      .listMarkets({ conditionIds: ["CONDITION_ID"] })
      .firstPage();

    const market = page.items[0];
    const feeSchedule = market?.trading.feeSchedule;
    ```

    ### Fetch Order Books

    Both `PublicClient` and `SecureClient` provide single and batch order book reads
    with camelCase request fields.

    ```ts Before theme={null}
    const book = await client.getOrderBook("TOKEN_ID");
    const books = await client.getOrderBooks([
      { token_id: "TOKEN_ID_1" },
      { token_id: "TOKEN_ID_2" },
    ]);
    ```

    ```ts After theme={null}
    const book = await client.fetchOrderBook({ tokenId: "TOKEN_ID" });
    const books = await client.fetchOrderBooks([
      { tokenId: "TOKEN_ID_1" },
      { tokenId: "TOKEN_ID_2" },
    ]);
    ```

    ### Fetch Prices

    Both `PublicClient` and `SecureClient` provide single and batch price reads with
    `OrderSide` and camelCase request fields.

    ```ts Before theme={null}
    import { Side } from "@polymarket/clob-client-v2";

    const price = await client.getPrice("TOKEN_ID", Side.BUY);
    const prices = await client.getPrices([
      { token_id: "TOKEN_ID_1", side: Side.BUY },
      { token_id: "TOKEN_ID_2", side: Side.SELL },
    ]);
    ```

    ```ts After theme={null}
    import { OrderSide } from "@polymarket/client";

    const price = await client.fetchPrice({
      tokenId: "TOKEN_ID",
      side: OrderSide.BUY,
    });
    const prices = await client.fetchPrices([
      { tokenId: "TOKEN_ID_1", side: OrderSide.BUY },
      { tokenId: "TOKEN_ID_2", side: OrderSide.SELL },
    ]);
    ```

    ### Fetch Midpoints

    Both `PublicClient` and `SecureClient` provide `fetchMidpoint` and
    `fetchMidpoints` for single and batch reads.

    ```ts Before theme={null}
    const midpoint = await client.getMidpoint("TOKEN_ID");
    const midpoints = await client.getMidpoints([
      { token_id: "TOKEN_ID_1" },
      { token_id: "TOKEN_ID_2" },
    ]);
    ```

    ```ts After theme={null}
    const midpoint = await client.fetchMidpoint({ tokenId: "TOKEN_ID" });
    const midpoints = await client.fetchMidpoints([
      { tokenId: "TOKEN_ID_1" },
      { tokenId: "TOKEN_ID_2" },
    ]);
    ```

    ### Fetch Spreads

    Both `PublicClient` and `SecureClient` provide single and batch spread reads
    with the same request pattern.

    ```ts Before theme={null}
    const spread = await client.getSpread("TOKEN_ID");
    const spreads = await client.getSpreads([
      { token_id: "TOKEN_ID_1" },
      { token_id: "TOKEN_ID_2" },
    ]);
    ```

    ```ts After theme={null}
    const spread = await client.fetchSpread({ tokenId: "TOKEN_ID" });
    const spreads = await client.fetchSpreads([
      { tokenId: "TOKEN_ID_1" },
      { tokenId: "TOKEN_ID_2" },
    ]);
    ```

    ### Fetch Last Trade Prices

    Both `PublicClient` and `SecureClient` provide singular and batch methods for
    last-trade prices.

    ```ts Before theme={null}
    const lastTrade = await client.getLastTradePrice("TOKEN_ID");
    const lastTrades = await client.getLastTradesPrices([
      { token_id: "TOKEN_ID_1" },
      { token_id: "TOKEN_ID_2" },
    ]);
    ```

    ```ts After theme={null}
    const lastTrade = await client.fetchLastTradePrice({ tokenId: "TOKEN_ID" });
    const lastTrades = await client.fetchLastTradePrices([
      { tokenId: "TOKEN_ID_1" },
      { tokenId: "TOKEN_ID_2" },
    ]);
    ```

    ### Fetch Price History

    Both `PublicClient` and `SecureClient` provide price history. Pass all parameters
    in one request object; the response uses camelCase fields and typed timestamps.

    ```ts Before theme={null}
    const history = await client.getPricesHistory({
      market: "TOKEN_ID",
      interval: "1d",
      fidelity: 60,
    });
    ```

    ```ts After theme={null}
    import { PriceHistoryInterval } from "@polymarket/client";

    const history = await client.fetchPriceHistory({
      tokenId: "TOKEN_ID",
      interval: PriceHistoryInterval.ONE_DAY,
      fidelity: 60,
    });
    ```

    ### Estimate a Market Order Price

    Both `PublicClient` and `SecureClient` provide market-order price estimates. The
    request distinguishes collateral spent for buys from shares sold for sells.

    ```ts Before theme={null}
    const price = await client.calculateMarketPrice(
      "TOKEN_ID",
      Side.BUY,
      100,
      OrderType.FAK,
    );
    ```

    ```ts After theme={null}
    const price = await client.estimateMarketPrice({
      tokenId: "TOKEN_ID",
      side: OrderSide.BUY,
      amount: 100,
    });
    ```

    ### List Recent Market Trades

    Both `PublicClient` and `SecureClient` provide the public trade paginator, which
    replaces the previous market-events response.

    ```ts Before theme={null}
    const trades = await client.getMarketTradesEvents("CONDITION_ID");
    ```

    ```ts After theme={null}
    const pages = client.listTrades({ market: ["CONDITION_ID"] });
    const page = await pages.firstPage();
    const trades = page.items;
    ```

    ## Orders

    ### Place a Limit Order

    `SecureClient` resolves tick size, negative-risk status, fees, and signing
    details before it submits a limit order.

    ```ts Before theme={null}
    const response = await client.createAndPostOrder(
      {
        tokenID: "TOKEN_ID",
        price: 0.52,
        size: 10,
        side: Side.BUY,
      },
      { tickSize: "0.01", negRisk: false },
      OrderType.GTC,
    );
    ```

    ```ts After theme={null}
    const response = await client.placeLimitOrder({
      tokenId: "TOKEN_ID",
      price: 0.52,
      size: 10,
      side: OrderSide.BUY,
    });
    ```

    Set `expiration` for a GTD order and `postOnly: true` for a post-only order.

    ### Place a Market Order

    `SecureClient` places market orders. Buys specify collateral to spend, while
    sells specify shares to sell.

    ```ts Before theme={null}
    const response = await client.createAndPostMarketOrder(
      {
        tokenID: "TOKEN_ID",
        amount: 10,
        userUSDCBalance: 10,
        side: Side.BUY,
      },
      { tickSize: "0.01", negRisk: false },
      OrderType.FAK,
    );
    ```

    ```ts After theme={null}
    const response = await client.placeMarketOrder({
      tokenId: "TOKEN_ID",
      amount: 10,
      maxSpend: 10,
      side: OrderSide.BUY,
      orderType: OrderType.FAK,
    });
    ```

    `userUSDCBalance` becomes `maxSpend`. The previous field supplied the account
    balance used to adjust the order for fees; the unified SDK instead accepts the
    maximum total USD to spend. Set `maxSpend` equal to `amount` when the amount
    should include fees, or omit it to pay applicable fees on top.

    ### Sign Without Posting

    `SecureClient` provides order-type-specific creation methods when signing and
    submission need to happen separately.

    ```ts Before theme={null}
    const signedOrder = await client.createOrder(
      {
        tokenID: "TOKEN_ID",
        price: 0.52,
        size: 10,
        side: Side.BUY,
      },
      { tickSize: "0.01", negRisk: false },
    );

    const response = await client.postOrder(signedOrder, OrderType.GTC);
    ```

    ```ts After theme={null}
    const signedOrder = await client.createLimitOrder({
      tokenId: "TOKEN_ID",
      price: 0.52,
      size: 10,
      side: OrderSide.BUY,
    });

    const response = await client.postOrder(signedOrder);
    ```

    Use `createMarketOrder` instead when preparing an FAK or FOK market order.

    ### Post Several Orders

    `SecureClient` provides `postOrders`. Order type and post-only behavior are part
    of each signed order, so the method accepts the signed orders directly.

    ```ts Before theme={null}
    const response = await client.postOrders([
      { order: firstOrder, orderType: OrderType.GTC },
      { order: secondOrder, orderType: OrderType.GTC },
    ]);
    ```

    ```ts After theme={null}
    const response = await client.postOrders([firstOrder, secondOrder]);
    ```

    ### Attribute an Order to a Builder

    `SecureClient` attaches the builder code to each order.

    ```ts Before theme={null}
    const response = await client.createAndPostOrder(
      {
        tokenID: "TOKEN_ID",
        price: 0.52,
        size: 10,
        side: Side.BUY,
        builderCode: process.env.POLYMARKET_BUILDER_CODE,
      },
      { tickSize: "0.01", negRisk: false },
    );
    ```

    ```ts After theme={null}
    const response = await client.placeLimitOrder({
      tokenId: "TOKEN_ID",
      price: 0.52,
      size: 10,
      side: OrderSide.BUY,
      builderCode: process.env.POLYMARKET_BUILDER_CODE,
    });
    ```

    ### Cancel Orders

    `SecureClient` provides the cancel methods. They now accept camelCase request
    objects, while `cancelAll` remains parameterless.

    ```ts Before theme={null}
    await client.cancelOrder("ORDER_ID");
    await client.cancelOrders(["ORDER_ID_1", "ORDER_ID_2"]);
    await client.cancelAll();
    await client.cancelMarketOrders({
      market: "CONDITION_ID",
      asset_id: "TOKEN_ID",
    });
    ```

    ```ts After theme={null}
    await client.cancelOrder({ orderId: "ORDER_ID" });
    await client.cancelOrders({ orderIds: ["ORDER_ID_1", "ORDER_ID_2"] });
    await client.cancelAll();
    await client.cancelMarketOrders({
      market: "CONDITION_ID",
      tokenId: "TOKEN_ID",
    });
    ```

    ### Fetch an Order

    `SecureClient` fetches an order by ID using a request object.

    ```ts Before theme={null}
    const order = await client.getOrder("ORDER_ID");
    ```

    ```ts After theme={null}
    const order = await client.fetchOrder({ orderId: "ORDER_ID" });
    ```

    ### List Open Orders

    `SecureClient` provides `listOpenOrders`, which returns a paginator. Filters and
    response fields use camelCase.

    ```ts Before theme={null}
    const orders = await client.getOpenOrders({
      market: "CONDITION_ID",
      asset_id: "TOKEN_ID",
    });
    ```

    ```ts After theme={null}
    const pages = client.listOpenOrders({
      market: "CONDITION_ID",
      tokenId: "TOKEN_ID",
    });
    const orders = [];
    for await (const page of pages) {
      orders.push(...page.items);
    }
    ```

    ### Check Order Scoring

    `SecureClient` provides `fetchOrderScoring` for one order and
    `fetchOrdersScoring` for several.

    ```ts Before theme={null}
    const scoring = await client.isOrderScoring({ orderId: "ORDER_ID" });
    const batch = await client.areOrdersScoring({
      orderIds: ["ORDER_ID_1", "ORDER_ID_2"],
    });
    ```

    ```ts After theme={null}
    const scoring = await client.fetchOrderScoring({ orderId: "ORDER_ID" });
    const batch = await client.fetchOrdersScoring({
      orderIds: ["ORDER_ID_1", "ORDER_ID_2"],
    });
    ```

    ## Account Activity and Balances

    ### List Account Trades

    `SecureClient` replaces both previous account trade-history methods with one
    paginator.

    ```ts Before theme={null}
    const trades = await client.getTrades({ market: "CONDITION_ID" });
    const page = await client.getTradesPaginated({ market: "CONDITION_ID" });
    ```

    ```ts After theme={null}
    const pages = client.listAccountTrades({ market: "CONDITION_ID" });
    const firstPage = await pages.firstPage();

    const trades = [];
    for await (const page of pages) {
      trades.push(...page.items);
    }
    ```

    ### List Builder Trades

    Both `PublicClient` and `SecureClient` provide public builder trade history,
    filtered by builder code.

    ```ts Before theme={null}
    const trades = await client.getBuilderTrades();
    ```

    ```ts After theme={null}
    const pages = client.listBuilderTrades({
      builderCode: process.env.POLYMARKET_BUILDER_CODE,
    });
    const page = await pages.firstPage();
    const trades = page.items;
    ```

    ### Read and Drop Notifications

    `SecureClient` provides notification methods with action-oriented names and
    camelCase request fields.

    ```ts Before theme={null}
    const notifications = await client.getNotifications();
    await client.dropNotifications({ ids: [1, 2] });
    ```

    ```ts After theme={null}
    const notifications = await client.fetchNotifications();
    await client.dropNotifications({ ids: ["1", "2"] });
    ```

    ### Refresh Balances and Allowances

    `SecureClient` manages balances and allowances while placing orders. It detects
    a missing allowance, completes the required approval, refreshes the balance and
    allowance, and retries the order.

    ```ts Before theme={null}
    await client.updateBalanceAllowance({
      asset_type: AssetType.COLLATERAL,
    });

    const balance = await client.getBalanceAllowance({
      asset_type: AssetType.COLLATERAL,
    });
    ```

    ```ts After theme={null}
    const response = await client.placeLimitOrder({
      tokenId: "TOKEN_ID",
      price: 0.52,
      size: 10,
      side: OrderSide.BUY,
    });
    ```

    ## Positions

    The unified methods build and submit the wallet transactions. You no longer
    need to encode contract calls or pass transaction arrays to `execute`.

    ### Split a Position

    `SecureClient` splits collateral into a complete set of YES and NO outcome
    tokens.

    ```ts Before theme={null}
    const splitTx = {
      to: CTF_COLLATERAL_ADAPTER_ADDRESS,
      data: collateralAdapterInterface.encodeFunctionData("splitPosition", [
        PUSD_ADDRESS,
        ethers.constants.HashZero,
        conditionId,
        [1, 2],
        ethers.utils.parseUnits("1", 6),
      ]),
      value: "0",
    };

    const split = await relayer.execute([splitTx], "Split position");
    await split.wait();
    ```

    ```ts After theme={null}
    const split = await client.splitPosition({
      conditionId,
      amount: 1_000_000n,
    });

    await split.wait();
    ```

    ### Merge Positions

    `SecureClient` merges balanced YES and NO tokens back into collateral.

    ```ts Before theme={null}
    const mergeTx = {
      to: CTF_COLLATERAL_ADAPTER_ADDRESS,
      data: collateralAdapterInterface.encodeFunctionData("mergePositions", [
        PUSD_ADDRESS,
        ethers.constants.HashZero,
        conditionId,
        [1, 2],
        ethers.utils.parseUnits("1", 6),
      ]),
      value: "0",
    };

    const merge = await relayer.execute([mergeTx], "Merge positions");
    await merge.wait();
    ```

    ```ts After theme={null}
    const merge = await client.mergePositions({
      conditionId,
      amount: "max",
    });

    await merge.wait();
    ```

    ### Redeem Resolved Positions

    `SecureClient` redeems winning outcome tokens for collateral after resolution.

    ```ts Before theme={null}
    const redeemTx = {
      to: CTF_COLLATERAL_ADAPTER_ADDRESS,
      data: collateralAdapterInterface.encodeFunctionData("redeemPositions", [
        PUSD_ADDRESS,
        ethers.constants.HashZero,
        conditionId,
        [1, 2],
      ]),
      value: "0",
    };

    const redeem = await relayer.execute([redeemTx], "Redeem positions");
    await redeem.wait();
    ```

    ```ts After theme={null}
    const redeem = await client.redeemPositions({ conditionId });
    await redeem.wait();
    ```

    ## Service Status

    Neither `PublicClient` nor `SecureClient` requires these calls. The unified
    clients manage request timing internally.

    ```ts Before theme={null}
    await client.getOk();
    const timestamp = await client.getServerTime();
    ```

    ```ts After theme={null}
    // No client call is required for request timestamp synchronization.
    ```
  </Tab>

  <Tab title="Python">
    The examples below map previous client capabilities to `polymarket-client`.
    The SDK also covers the Gamma API and Data API. Migrating direct Gamma and
    Data calls can simplify application code and give you normalized, typed
    models that work seamlessly with the SDK's trading and account workflows.

    Public clients provide unauthenticated market discovery and data reads.
    Secure clients add authenticated trading, account, and wallet actions.
    Python provides async and sync versions of each, so choose the interface
    that matches your application's execution model.

    | Interface | Clients                                  | Best for                                             |
    | --------- | ---------------------------------------- | ---------------------------------------------------- |
    | Async     | `AsyncPublicClient`, `AsyncSecureClient` | Services, bots, and applications using an event loop |
    | Sync      | `PublicClient`, `SecureClient`           | Scripts, notebooks, and synchronous applications     |

    The examples below use the async clients.

    <Note>
      Some features are available only through the async clients due to their
      streaming nature.
    </Note>

    ## Install the Unified SDK

    Remove the previous CLOB, relayer, and builder-signing packages. Then install the
    unified SDK.

    <CodeGroup>
      ```bash uv theme={null}
      uv remove py-clob-client-v2 py-builder-relayer-client py-builder-signing-sdk
      uv add polymarket-client
      ```

      ```bash pip theme={null}
      pip uninstall -y py-clob-client-v2 py-builder-relayer-client py-builder-signing-sdk
      pip install polymarket-client
      ```

      ```bash Poetry theme={null}
      poetry remove py-clob-client-v2 py-builder-relayer-client py-builder-signing-sdk
      poetry add polymarket-client
      ```
    </CodeGroup>

    ## Client and Wallet Setup

    ### Create a Public Client

    `AsyncPublicClient` provides unauthenticated market discovery and data reads.
    Production is the default environment.

    ```python Before theme={null}
    from py_clob_client_v2.client import ClobClient

    client = ClobClient("https://clob.polymarket.com", chain_id=137)
    ```

    ```python After theme={null}
    from polymarket import AsyncPublicClient

    client = AsyncPublicClient()
    ```

    ### Create an Authenticated Client

    `AsyncSecureClient` adds authenticated trading, account, and wallet actions.
    `create` derives or creates CLOB credentials, resolves the account wallet, and
    configures signing.

    ```python Before theme={null}
    import os

    from py_clob_client_v2.client import ClobClient
    from py_clob_client_v2.order_utils.model import SignatureTypeV2

    temporary_client = ClobClient(
        "https://clob.polymarket.com",
        chain_id=137,
        key=os.environ["POLYMARKET_PRIVATE_KEY"],
    )
    credentials = temporary_client.create_or_derive_api_key()

    client = ClobClient(
        "https://clob.polymarket.com",
        chain_id=137,
        key=os.environ["POLYMARKET_PRIVATE_KEY"],
        creds=credentials,
        signature_type=SignatureTypeV2.POLY_1271,
        funder=os.environ["POLYMARKET_WALLET_ADDRESS"],
    )
    ```

    ```python After theme={null}
    import os

    from polymarket import AsyncSecureClient

    client = await AsyncSecureClient.create(
        private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
        wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
    )
    ```

    Omit `wallet` to use the default Deposit Wallet flow.

    ### Resume With Existing Credentials

    Read credentials from an authenticated client, store them securely, and pass
    them to a new client to resume with the same API key. The private key and wallet
    must identify the account that owns the credentials.

    ```python Before theme={null}
    import os

    from py_clob_client_v2.client import ClobClient
    from py_clob_client_v2.order_utils.model import SignatureTypeV2

    credentials = client.creds
    if credentials is None:
        raise RuntimeError("Client has no credentials")

    # Store the credentials securely.

    resumed_client = ClobClient(
        "https://clob.polymarket.com",
        chain_id=137,
        key=os.environ["POLYMARKET_PRIVATE_KEY"],
        creds=credentials,
        signature_type=SignatureTypeV2.POLY_1271,
        funder=os.environ["POLYMARKET_WALLET_ADDRESS"],
    )
    ```

    ```python After theme={null}
    import os

    from polymarket import AsyncSecureClient

    credentials = client.credentials

    # Store the credentials securely.

    resumed_client = await AsyncSecureClient.create(
        private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
        wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
        credentials=credentials,
    )
    ```

    ### Revoke the Current API Key

    Ending authentication revokes the current API key, invalidates the
    `AsyncSecureClient`, and returns an `AsyncPublicClient`.

    ```python Before theme={null}
    client.delete_api_key()
    ```

    ```python After theme={null}
    public_client = await client.end_authentication()
    ```

    ### Configure Builder API Keys

    `AsyncSecureClient` accepts a `BuilderApiKey` for gasless wallet actions. Keep
    the key, secret, and passphrase on the server.

    ```python Before theme={null}
    import os

    from py_builder_relayer_client.client import RelayClient
    from py_builder_signing_sdk.config import BuilderConfig
    from py_builder_signing_sdk.sdk_types import BuilderApiKeyCreds

    builder_config = BuilderConfig(
        local_builder_creds=BuilderApiKeyCreds(
            key=os.environ["POLYMARKET_BUILDER_API_KEY"],
            secret=os.environ["POLYMARKET_BUILDER_SECRET"],
            passphrase=os.environ["POLYMARKET_BUILDER_PASSPHRASE"],
        )
    )

    relayer = RelayClient(
        "https://relayer-v2.polymarket.com",
        137,
        os.environ["POLYMARKET_PRIVATE_KEY"],
        builder_config,
    )
    ```

    ```python After theme={null}
    import os

    from polymarket import AsyncSecureClient, BuilderApiKey

    client = await AsyncSecureClient.create(
        private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
        api_key=BuilderApiKey(
            key=os.environ["POLYMARKET_BUILDER_API_KEY"],
            secret=os.environ["POLYMARKET_BUILDER_SECRET"],
            passphrase=os.environ["POLYMARKET_BUILDER_PASSPHRASE"],
        ),
    )
    ```

    ### Configure Relayer API Keys

    `AsyncSecureClient` configures Relayer API keys directly. Pass the key and its
    associated address when reconnecting an existing account.

    ```python theme={null}
    import os

    from polymarket import AsyncSecureClient, RelayerApiKey

    client = await AsyncSecureClient.create(
        private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
        wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
        api_key=RelayerApiKey(
            key=os.environ["POLYMARKET_RELAYER_API_KEY"],
            address=os.environ["POLYMARKET_RELAYER_API_KEY_ADDRESS"],
        ),
    )
    ```

    ### Deploy a Deposit Wallet

    Creating an `AsyncSecureClient` without a `wallet` derives the signer's Deposit
    Wallet address and deploys it when needed. Use Builder authorization to
    authorize the deployment.

    ```python Before theme={null}
    deployment = relayer.deploy_deposit_wallet()
    deployment.wait()
    ```

    ```python After theme={null}
    import os

    from polymarket import AsyncSecureClient, BuilderApiKey

    client = await AsyncSecureClient.create(
        private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
        api_key=BuilderApiKey(
            key=os.environ["POLYMARKET_BUILDER_API_KEY"],
            secret=os.environ["POLYMARKET_BUILDER_SECRET"],
            passphrase=os.environ["POLYMARKET_BUILDER_PASSPHRASE"],
        ),
    )

    deposit_wallet_address = client.wallet
    ```

    ## Market Discovery

    ### Fetch a Market

    Both `AsyncPublicClient` and `AsyncSecureClient` provide `get_market` for reads
    by Gamma market ID, slug, or Polymarket URL.

    ```python Before theme={null}
    market = client.get_market("CONDITION_ID")
    ```

    ```python After theme={null}
    market = await client.get_market(slug="MARKET_SLUG")
    ```

    If you only have a condition ID, filter `list_markets` and fetch its first page.

    ```python theme={null}
    pages = client.list_markets(condition_ids=["CONDITION_ID"])
    page = await pages.first_page()
    market = page.items[0]
    ```

    ### List Markets

    Both `AsyncPublicClient` and `AsyncSecureClient` provide `list_markets`, which
    returns an async paginator and accepts filters directly.

    ```python Before theme={null}
    page = client.get_markets()
    markets = page["data"]
    ```

    ```python After theme={null}
    pages = client.list_markets(closed=False, page_size=20)
    page = await pages.first_page()
    markets = page.items
    ```

    Simplified-market reads do not need a separate replacement. Sampling-market
    reads migrate to `list_current_rewards`, which lists active reward
    configurations.

    ```python Before theme={null}
    markets = client.get_sampling_markets()
    page = client.get_sampling_simplified_markets()
    ```

    ```python After theme={null}
    pages = client.list_current_rewards()
    page = await pages.first_page()
    ```

    ## Market Data

    ### Read Trading Parameters

    Both `AsyncPublicClient` and `AsyncSecureClient` return tick size and
    negative-risk status on the market model. Order methods also resolve them
    automatically.

    ```python Before theme={null}
    tick_size = client.get_tick_size("TOKEN_ID")
    neg_risk = client.get_neg_risk("TOKEN_ID")
    fee_rate_bps = client.get_fee_rate_bps("TOKEN_ID")
    ```

    ```python After theme={null}
    market = await client.get_market(slug="MARKET_SLUG")
    tick_size = market.trading.minimum_tick_size
    neg_risk = market.state.neg_risk
    fee_schedule = market.trading.fee_schedule
    ```

    ### Read CLOB Market Details

    Both `AsyncPublicClient` and `AsyncSecureClient` return the typed market model.
    Its trading fields replace the compact CLOB market response.

    ```python Before theme={null}
    details = client.get_clob_market_info("CONDITION_ID")
    tick_size = details["mts"]
    neg_risk = details["nr"]
    fee_details = details["fd"]
    ```

    ```python After theme={null}
    market = await client.get_market(slug="MARKET_SLUG")
    tick_size = market.trading.minimum_tick_size
    neg_risk = market.state.neg_risk
    fee_schedule = market.trading.fee_schedule
    ```

    ### Fetch Order Books

    Both `AsyncPublicClient` and `AsyncSecureClient` provide single and batch order
    book reads.

    ```python Before theme={null}
    from py_clob_client_v2 import BookParams

    book = client.get_order_book("TOKEN_ID")
    books = client.get_order_books(
        [BookParams(token_id="TOKEN_ID_1"), BookParams(token_id="TOKEN_ID_2")]
    )
    ```

    ```python After theme={null}
    book = await client.get_order_book(token_id="TOKEN_ID")
    books = await client.get_order_books(token_ids=["TOKEN_ID_1", "TOKEN_ID_2"])
    ```

    ### Fetch Prices

    Both `AsyncPublicClient` and `AsyncSecureClient` provide single and batch price
    reads with typed requests.

    ```python Before theme={null}
    from py_clob_client_v2 import BookParams, Side

    price = client.get_price("TOKEN_ID", Side.BUY)
    prices = client.get_prices(
        [
            BookParams(token_id="TOKEN_ID_1", side=Side.BUY),
            BookParams(token_id="TOKEN_ID_2", side=Side.SELL),
        ]
    )
    ```

    ```python After theme={null}
    from polymarket import PriceRequest

    price = await client.get_price(token_id="TOKEN_ID", side="BUY")
    prices = await client.get_prices(
        requests=[
            PriceRequest(token_id="TOKEN_ID_1", side="BUY"),
            PriceRequest(token_id="TOKEN_ID_2", side="SELL"),
        ]
    )
    ```

    ### Fetch Midpoints

    Both `AsyncPublicClient` and `AsyncSecureClient` provide single and batch
    midpoint reads.

    ```python Before theme={null}
    from py_clob_client_v2 import BookParams

    midpoint = client.get_midpoint("TOKEN_ID")
    midpoints = client.get_midpoints(
        [BookParams(token_id="TOKEN_ID_1"), BookParams(token_id="TOKEN_ID_2")]
    )
    ```

    ```python After theme={null}
    midpoint = await client.get_midpoint(token_id="TOKEN_ID")
    midpoints = await client.get_midpoints(token_ids=["TOKEN_ID_1", "TOKEN_ID_2"])
    ```

    ### Fetch Spreads

    Both `AsyncPublicClient` and `AsyncSecureClient` provide single and batch spread
    reads.

    ```python Before theme={null}
    from py_clob_client_v2 import BookParams

    spread = client.get_spread("TOKEN_ID")
    spreads = client.get_spreads(
        [BookParams(token_id="TOKEN_ID_1"), BookParams(token_id="TOKEN_ID_2")]
    )
    ```

    ```python After theme={null}
    spread = await client.get_spread(token_id="TOKEN_ID")
    spreads = await client.get_spreads(token_ids=["TOKEN_ID_1", "TOKEN_ID_2"])
    ```

    ### Fetch Last Trade Prices

    Both `AsyncPublicClient` and `AsyncSecureClient` provide singular and batch
    methods for last-trade prices.

    ```python Before theme={null}
    from py_clob_client_v2 import BookParams

    last_trade = client.get_last_trade_price("TOKEN_ID")
    last_trades = client.get_last_trades_prices(
        [BookParams(token_id="TOKEN_ID_1"), BookParams(token_id="TOKEN_ID_2")]
    )
    ```

    ```python After theme={null}
    last_trade = await client.get_last_trade_price(token_id="TOKEN_ID")
    last_trades = await client.get_last_trade_prices(
        token_ids=["TOKEN_ID_1", "TOKEN_ID_2"]
    )
    ```

    ### Fetch Price History

    Both `AsyncPublicClient` and `AsyncSecureClient` provide price history. Pass the
    parameters as keyword arguments; the response contains typed points.

    ```python Before theme={null}
    from py_clob_client_v2 import PricesHistoryParams

    history = client.get_prices_history(
        PricesHistoryParams(market="TOKEN_ID", interval="1d", fidelity=60)
    )
    ```

    ```python After theme={null}
    history = await client.get_price_history(
        token_id="TOKEN_ID",
        interval="1d",
        fidelity=60,
    )
    ```

    ### Estimate a Market Order Price

    Both `AsyncPublicClient` and `AsyncSecureClient` provide market-order price
    estimates. Buys specify collateral spent, while sells specify shares sold.

    ```python Before theme={null}
    from py_clob_client_v2 import OrderType, Side

    buy_price = client.calculate_market_price(
        "TOKEN_ID", Side.BUY, 10, OrderType.FOK
    )
    sell_price = client.calculate_market_price(
        "TOKEN_ID", Side.SELL, 5, OrderType.FOK
    )
    ```

    ```python After theme={null}
    buy_price = await client.estimate_market_price(
        token_id="TOKEN_ID", side="BUY", amount=10, order_type="FOK"
    )
    sell_price = await client.estimate_market_price(
        token_id="TOKEN_ID", side="SELL", shares=5, order_type="FOK"
    )
    ```

    ### List Recent Market Trades

    Both `AsyncPublicClient` and `AsyncSecureClient` provide the public trade
    paginator, which replaces the previous market-events response.

    ```python Before theme={null}
    trades = client.get_market_trades_events("CONDITION_ID")
    ```

    ```python After theme={null}
    pages = client.list_trades(market=["CONDITION_ID"])
    page = await pages.first_page()
    trades = page.items
    ```

    ## Orders

    ### Place a Limit Order

    `AsyncSecureClient` resolves tick size, negative-risk status, fees, and signing
    details before submitting a limit order.

    ```python Before theme={null}
    from py_clob_client_v2 import OrderArgs, Side

    response = client.create_and_post_order(
        OrderArgs(
            token_id="TOKEN_ID",
            price=0.52,
            size=10,
            side=Side.BUY,
        )
    )
    ```

    ```python After theme={null}
    response = await client.place_limit_order(
        token_id="TOKEN_ID",
        price=0.52,
        size=10,
        side="BUY",
    )
    ```

    ### Place a Market Order

    `AsyncSecureClient` places market orders. Buys specify collateral to spend,
    while sells specify shares to sell.

    ```python Before theme={null}
    from py_clob_client_v2 import MarketOrderArgs, OrderType, Side

    response = client.create_and_post_market_order(
        MarketOrderArgs(
            token_id="TOKEN_ID",
            amount=10,
            user_usdc_balance=10,
            side=Side.BUY,
        ),
        order_type=OrderType.FOK,
    )
    ```

    ```python After theme={null}
    response = await client.place_market_order(
        token_id="TOKEN_ID",
        side="BUY",
        amount=10,
        max_spend=10,
        order_type="FOK",
    )
    ```

    `user_usdc_balance` becomes `max_spend`. The previous field supplied the
    account balance used to adjust the order for fees; the unified SDK instead
    accepts the maximum total USD to spend. Set `max_spend` equal to `amount` when
    the amount should include fees, or omit it to pay applicable fees on top.

    ### Sign Without Posting

    `AsyncSecureClient` provides order-type-specific creation methods when signing
    and submission need to happen separately.

    ```python Before theme={null}
    from py_clob_client_v2 import MarketOrderArgs, OrderArgs, Side

    limit_order = client.create_order(
        OrderArgs(token_id="TOKEN_ID", price=0.52, size=10, side=Side.BUY)
    )
    market_order = client.create_market_order(
        MarketOrderArgs(token_id="TOKEN_ID", amount=10, side=Side.BUY)
    )
    ```

    ```python After theme={null}
    limit_order = await client.create_limit_order(
        token_id="TOKEN_ID",
        price=0.52,
        size=10,
        side="BUY",
    )
    market_order = await client.create_market_order(
        token_id="TOKEN_ID",
        side="BUY",
        amount=10,
    )
    ```

    ### Post Several Orders

    `AsyncSecureClient` provides `post_orders`. Order type and post-only behavior
    are part of each signed order, so the method accepts signed orders directly.

    ```python Before theme={null}
    from py_clob_client_v2 import OrderType, PostOrdersV2Args

    responses = client.post_orders(
        [
            PostOrdersV2Args(order=first_order, orderType=OrderType.GTC),
            PostOrdersV2Args(order=second_order, orderType=OrderType.GTC),
        ]
    )
    ```

    ```python After theme={null}
    responses = await client.post_orders([first_order, second_order])
    ```

    ### Attribute an Order to a Builder

    `AsyncSecureClient` attaches the builder code to each order.

    ```python Before theme={null}
    from py_clob_client_v2 import OrderArgs, Side

    response = client.create_and_post_order(
        OrderArgs(
            token_id="TOKEN_ID",
            price=0.52,
            size=10,
            side=Side.BUY,
            builder_code="BUILDER_CODE",
        )
    )
    ```

    ```python After theme={null}
    response = await client.place_limit_order(
        token_id="TOKEN_ID",
        price=0.52,
        size=10,
        side="BUY",
        builder_code="BUILDER_CODE",
    )
    ```

    ### Cancel Orders

    `AsyncSecureClient` provides explicit methods for cancelling one order,
    several orders, all orders, or orders for a market.

    ```python Before theme={null}
    from py_clob_client_v2 import OrderMarketCancelParams, OrderPayload

    client.cancel_order(OrderPayload(orderID="ORDER_ID"))
    client.cancel_orders(["ORDER_ID_1", "ORDER_ID_2"])
    client.cancel_market_orders(OrderMarketCancelParams(market="CONDITION_ID"))
    client.cancel_all()
    ```

    ```python After theme={null}
    await client.cancel_order(order_id="ORDER_ID")
    await client.cancel_orders(order_ids=["ORDER_ID_1", "ORDER_ID_2"])
    await client.cancel_market_orders(market="CONDITION_ID")
    await client.cancel_all()
    ```

    ### Fetch an Order

    `AsyncSecureClient` fetches an order by ID using a keyword argument.

    ```python Before theme={null}
    order = client.get_order("ORDER_ID")
    ```

    ```python After theme={null}
    order = await client.get_order(order_id="ORDER_ID")
    ```

    ### List Open Orders

    `AsyncSecureClient` provides `list_open_orders`, which returns an async
    paginator.

    ```python Before theme={null}
    from py_clob_client_v2 import OpenOrderParams

    orders = client.get_open_orders(
        OpenOrderParams(market="CONDITION_ID", asset_id="TOKEN_ID")
    )
    ```

    ```python After theme={null}
    pages = client.list_open_orders(market="CONDITION_ID", token_id="TOKEN_ID")
    orders = [order async for order in pages.iter_items()]
    ```

    ### Check Order Scoring

    `AsyncSecureClient` provides `get_order_scoring` for one order and
    `get_orders_scoring` for several.

    ```python Before theme={null}
    from py_clob_client_v2 import OrderScoringParams, OrdersScoringParams

    scoring = client.is_order_scoring(OrderScoringParams(orderId="ORDER_ID"))
    batch = client.are_orders_scoring(
        OrdersScoringParams(orderIds=["ORDER_ID_1", "ORDER_ID_2"])
    )
    ```

    ```python After theme={null}
    scoring = await client.get_order_scoring(order_id="ORDER_ID")
    batch = await client.get_orders_scoring(
        order_ids=["ORDER_ID_1", "ORDER_ID_2"]
    )
    ```

    ## Account Activity and Balances

    ### List Account Trades

    `AsyncSecureClient` replaces both previous account trade-history methods with one
    async paginator.

    ```python Before theme={null}
    from py_clob_client_v2 import TradeParams

    trades = client.get_trades(TradeParams(market="CONDITION_ID"))
    page = client.get_trades_paginated(TradeParams(market="CONDITION_ID"))
    ```

    ```python After theme={null}
    pages = client.list_account_trades(market="CONDITION_ID")
    first_page = await pages.first_page()

    trades = [trade async for trade in pages.iter_items()]
    ```

    ### List Builder Trades

    Both `AsyncPublicClient` and `AsyncSecureClient` provide public builder trade
    history, filtered by builder code.

    ```python Before theme={null}
    from py_clob_client_v2 import BuilderTradeParams

    page = client.get_builder_trades(
        BuilderTradeParams(builder_code="BUILDER_CODE")
    )
    trades = page["trades"]
    ```

    ```python After theme={null}
    pages = client.list_builder_trades(builder_code="BUILDER_CODE")
    page = await pages.first_page()
    trades = page.items
    ```

    ### Read and Drop Notifications

    `AsyncSecureClient` provides notification methods with keyword arguments and
    typed responses.

    ```python Before theme={null}
    from py_clob_client_v2 import DropNotificationParams

    notifications = client.get_notifications()
    client.drop_notifications(DropNotificationParams(ids=[1, 2]))
    ```

    ```python After theme={null}
    notifications = await client.get_notifications()
    await client.drop_notifications(ids=["1", "2"])
    ```

    ### Refresh Balances and Allowances

    `AsyncSecureClient` reads balances and manages missing allowances while placing
    orders. It completes the required approval, refreshes the allowance, and
    retries the order.

    ```python Before theme={null}
    from py_clob_client_v2 import AssetType, BalanceAllowanceParams

    params = BalanceAllowanceParams(asset_type=AssetType.COLLATERAL)
    client.update_balance_allowance(params)
    balance = client.get_balance_allowance(params)
    ```

    ```python After theme={null}
    balance = await client.get_balance_allowance(asset_type="COLLATERAL")
    response = await client.place_limit_order(
        token_id="TOKEN_ID",
        price=0.52,
        size=10,
        side="BUY",
    )
    ```

    ## Positions

    The unified methods build and submit wallet transactions. You no longer need to
    encode contract calls or pass transaction arrays to `execute`.

    ### Split a Position

    `AsyncSecureClient` splits collateral into a complete set of YES and NO outcome
    tokens.

    ```python Before theme={null}
    from py_builder_relayer_client.models import Transaction

    split_tx = Transaction(
        to=CTF_COLLATERAL_ADAPTER_ADDRESS,
        data=collateral_adapter.encode_abi(
            "splitPosition",
            args=[PUSD_ADDRESS, bytes(32), CONDITION_ID, [1, 2], 1_000_000],
        ),
        value="0",
    )

    split = relayer.execute([split_tx], "Split position")
    split.wait()
    ```

    ```python After theme={null}
    split = await client.split_position(
        condition_id="CONDITION_ID",
        amount=1_000_000,
    )
    await split.wait()
    ```

    ### Merge Positions

    `AsyncSecureClient` merges balanced YES and NO tokens back into collateral.

    ```python Before theme={null}
    from py_builder_relayer_client.models import Transaction

    merge_tx = Transaction(
        to=CTF_COLLATERAL_ADAPTER_ADDRESS,
        data=collateral_adapter.encode_abi(
            "mergePositions",
            args=[PUSD_ADDRESS, bytes(32), CONDITION_ID, [1, 2], 1_000_000],
        ),
        value="0",
    )

    merge = relayer.execute([merge_tx], "Merge positions")
    merge.wait()
    ```

    ```python After theme={null}
    merge = await client.merge_positions(
        condition_id="CONDITION_ID",
        amount="max",
    )
    await merge.wait()
    ```

    ### Redeem Resolved Positions

    `AsyncSecureClient` redeems winning outcome tokens for collateral after
    resolution.

    ```python Before theme={null}
    from py_builder_relayer_client.models import Transaction

    redeem_tx = Transaction(
        to=CTF_COLLATERAL_ADAPTER_ADDRESS,
        data=collateral_adapter.encode_abi(
            "redeemPositions",
            args=[PUSD_ADDRESS, bytes(32), CONDITION_ID, [1, 2]],
        ),
        value="0",
    )

    redeem = relayer.execute([redeem_tx], "Redeem positions")
    redeem.wait()
    ```

    ```python After theme={null}
    redeem = await client.redeem_positions(condition_id="CONDITION_ID")
    await redeem.wait()
    ```

    ## Service Status

    Neither `AsyncPublicClient` nor `AsyncSecureClient` requires these calls. The
    unified clients manage request timing internally.

    ```python Before theme={null}
    client.get_ok()
    timestamp = client.get_server_time()
    ```

    ```python After theme={null}
    # No client call is required for request timestamp synchronization.
    ```
  </Tab>

  <Tab title="Rust">
    A unified Rust SDK is in progress. Until it is available, use
    `polymarket_client_sdk_v2` `0.7.0`, the current Rust SDK.

    See the [GitHub repository](https://github.com/Polymarket/rs-clob-client-v2) and
    the [`polymarket_client_sdk_v2` package on crates.io](https://crates.io/crates/polymarket_client_sdk_v2)
    for the complete API and examples.

    ## Install the Rust SDK

    Enable the `clob` feature for authentication and trading:

    ```bash theme={null}
    cargo add polymarket_client_sdk_v2@0.7.0 --features clob
    ```

    ## Trade From a Deposit Wallet

    The Rust SDK supports the CLOB order path for an existing Deposit Wallet. It
    does not include a client for deploying Deposit Wallets or submitting wallet
    batches; use the Direct API workflows for those actions.

    Pass the deployed Deposit Wallet as the funder and use
    `SignatureType::Poly1271` when authenticating. This example refreshes the
    collateral allowance cache, then places a GTC limit buy:

    ```rust theme={null}
    use std::str::FromStr as _;

    use alloy::signers::Signer as _;
    use alloy::signers::local::LocalSigner;
    use polymarket_client_sdk_v2::clob::types::request::UpdateBalanceAllowanceRequest;
    use polymarket_client_sdk_v2::clob::types::{
        AssetType, OrderType, Side, SignatureType,
    };
    use polymarket_client_sdk_v2::clob::{Client, Config};
    use polymarket_client_sdk_v2::types::{Address, Decimal, U256};
    use polymarket_client_sdk_v2::{POLYGON, PRIVATE_KEY_VAR};

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let host = "https://clob-v2.polymarket.com";
        let signer = LocalSigner::from_str(&std::env::var(PRIVATE_KEY_VAR)?)?
            .with_chain_id(Some(POLYGON));
        let deposit_wallet = Address::from_str(&std::env::var("DEPOSIT_WALLET")?)?;

        let client = Client::new(host, Config::default())?
            .authentication_builder(&signer)
            .funder(deposit_wallet)
            .signature_type(SignatureType::Poly1271)
            .authenticate()
            .await?;

        client
            .update_balance_allowance(
                UpdateBalanceAllowanceRequest::builder()
                    .asset_type(AssetType::Collateral)
                    .build(),
            )
            .await?;

        let response = client
            .limit_order()
            .token_id(U256::from_str(&std::env::var("TOKEN_ID")?)?)
            .side(Side::Buy)
            .price(Decimal::from_str("0.40")?)
            .size(Decimal::from_str("100")?)
            .order_type(OrderType::GTC)
            .build_sign_and_post(&signer)
            .await?;

        println!("order_id={} status={}", response.order_id, response.status);
        Ok(())
    }
    ```

    ## Handle Matching Engine Restarts

    Rebuild and re-sign an order before each retry because `SignedOrder` is
    consumed when it is submitted. Treat HTTP `425` as temporary and retry with
    exponential backoff:

    ```rust theme={null}
    use polymarket_client_sdk_v2::error::{Kind, StatusCode};

    let mut delay = std::time::Duration::from_secs(1);

    for _ in 0..10 {
        let order = client.limit_order()
            .token_id(token_id).price(price).size(size).side(side)
            .build().await?;
        let signed = client.sign(&signer, order).await?;

        match client.post_order(signed).await {
            Ok(response) => return Ok(response),
            Err(err) if err.kind() == Kind::Status => {
                if let Some(status) = err.downcast_ref::<polymarket_client_sdk_v2::error::Status>() {
                    if status.status_code == StatusCode::from_u16(425).unwrap() {
                        eprintln!("Engine restarting, retrying in {delay:?}...");
                        tokio::time::sleep(delay).await;
                        delay = (delay * 2).min(std::time::Duration::from_secs(30));
                        continue;
                    }
                }
                return Err(err);
            }
            Err(err) => return Err(err),
        }
    }
    ```

    See [Matching Engine Restarts](/trading/matching-engine) for the restart window,
    post-only period, and restricted-mode responses.
  </Tab>
</Tabs>
