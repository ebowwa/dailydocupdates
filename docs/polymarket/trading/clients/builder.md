<!--
Source: https://docs.polymarket.com/trading/clients/builder.md
Downloaded: 2026-02-22T23:06:41.932Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Builder Methods

> Methods for querying orders and trades using builder API credentials.

## Client Initialization

Builder methods require the client to initialize with a separate builder config using credentials acquired from [Polymarket.com](https://polymarket.com/settings?tab=builder) and the `@polymarket/builder-signing-sdk` package.

<Tabs>
  <Tab title="Local Builder Credentials">
    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { ClobClient } from "@polymarket/clob-client";
      import { BuilderConfig, BuilderApiKeyCreds } from "@polymarket/builder-signing-sdk";

      const builderConfig = new BuilderConfig({
        localBuilderCreds: new BuilderApiKeyCreds({
          key: process.env.BUILDER_API_KEY,
          secret: process.env.BUILDER_SECRET,
          passphrase: process.env.BUILDER_PASS_PHRASE,
        }),
      });

      const clobClient = new ClobClient(
        "https://clob.polymarket.com",
        137,
        signer,
        apiCreds, // User's API credentials from L1 authentication
        signatureType,
        funderAddress,
        undefined,
        false,
        builderConfig
      );
      ```

      ```python Python theme={null}
      from py_clob_client.client import ClobClient
      from py_builder_signing_sdk.config import BuilderConfig, BuilderApiKeyCreds
      import os

      builder_config = BuilderConfig(
          local_builder_creds=BuilderApiKeyCreds(
              key=os.getenv("BUILDER_API_KEY"),
              secret=os.getenv("BUILDER_SECRET"),
              passphrase=os.getenv("BUILDER_PASS_PHRASE"),
          )
      )

      clob_client = ClobClient(
          host="https://clob.polymarket.com",
          chain_id=137,
          key=os.getenv("PRIVATE_KEY"),
          creds=creds, # User's API credentials from L1 authentication
          signature_type=signature_type,
          funder=funder,
          builder_config=builder_config
      )
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Remote Builder Signing">
    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { ClobClient } from "@polymarket/clob-client";
      import { BuilderConfig } from "@polymarket/builder-signing-sdk";

      const builderConfig = new BuilderConfig({
        remoteBuilderConfig: { url: "http://localhost:3000/sign" }
      });

      const clobClient = new ClobClient(
        "https://clob.polymarket.com",
        137,
        signer,
        apiCreds, // User's API credentials from L1 authentication
        signatureType,
        funder,
        undefined,
        false,
        builderConfig
      );
      ```

      ```python Python theme={null}
      from py_clob_client.client import ClobClient
      from py_builder_signing_sdk.config import BuilderConfig, RemoteBuilderConfig
      import os

      builder_config = BuilderConfig(
          remote_builder_config=RemoteBuilderConfig(
              url="http://localhost:3000/sign"
          )
      )

      clob_client = ClobClient(
          host="https://clob.polymarket.com",
          chain_id=137,
          key=os.getenv("PRIVATE_KEY"),
          creds=creds, # User's API credentials from L1 authentication
          signature_type=signature_type,
          funder=funder,
          builder_config=builder_config
      )
      ```
    </CodeGroup>
  </Tab>
</Tabs>

<Info>
  See [Order Attribution](/trading/orders/attribution) for more information on builder signing.
</Info>

***

## Methods

***

### getOrder

Get details for a specific order by ID using builder authentication. When called from a builder-configured client, the request authenticates with builder headers and returns orders attributed to the builder.

```typescript Signature theme={null}
async getOrder(orderID: string): Promise<OpenOrder>
```

<Info>
  When a `BuilderConfig` is present, the client automatically sends builder headers. If builder auth is unavailable, it falls back to standard L2 headers.
</Info>

<CodeGroup>
  ```typescript TypeScript theme={null}
  const order = await clobClient.getOrder("0xb816482a...");
  console.log(order);
  ```

  ```python Python theme={null}
  order = clob_client.get_order("0xb816482a...")
  print(order)
  ```
</CodeGroup>

***

### getOpenOrders

Get all open orders attributed to the builder. When called from a builder-configured client, returns orders placed through the builder rather than orders owned by the authenticated user.

```typescript Signature theme={null}
async getOpenOrders(
  params?: OpenOrderParams,
  only_first_page?: boolean,
): Promise<OpenOrder[]>
```

**Params**

<ResponseField name="id" type="string">
  Optional. Filter by order ID.
</ResponseField>

<ResponseField name="market" type="string">
  Optional. Filter by market condition ID.
</ResponseField>

<ResponseField name="asset_id" type="string">
  Optional. Filter by token ID.
</ResponseField>

```typescript TypeScript theme={null}
// All open orders for this builder
const orders = await clobClient.getOpenOrders();

// Filtered by market
const marketOrders = await clobClient.getOpenOrders({
  market: "0xbd31dc8a...",
});
```

***

### getBuilderTrades

Retrieves all trades attributed to your builder account. Use this to track which trades were routed through your platform.

```typescript Signature theme={null}
async getBuilderTrades(
  params?: TradeParams,
): Promise<BuilderTradesPaginatedResponse>
```

**Params (`TradeParams`)**

<ResponseField name="id" type="string">
  Optional. Filter trades by trade ID.
</ResponseField>

<ResponseField name="maker_address" type="string">
  Optional. Filter trades by maker address.
</ResponseField>

<ResponseField name="market" type="string">
  Optional. Filter trades by market condition ID.
</ResponseField>

<ResponseField name="asset_id" type="string">
  Optional. Filter trades by asset (token) ID.
</ResponseField>

<ResponseField name="before" type="string">
  Optional. Return trades created before this cursor value.
</ResponseField>

<ResponseField name="after" type="string">
  Optional. Return trades created after this cursor value.
</ResponseField>

**Response (`BuilderTradesPaginatedResponse`)**

<ResponseField name="trades" type="BuilderTrade[]">
  Array of trades attributed to the builder account.
</ResponseField>

<ResponseField name="next_cursor" type="string">
  Cursor string for fetching the next page of results.
</ResponseField>

<ResponseField name="limit" type="number">
  Maximum number of trades returned per page.
</ResponseField>

<ResponseField name="count" type="number">
  Total number of trades returned in this response.
</ResponseField>

**`BuilderTrade` fields**

<ResponseField name="id" type="string">
  Unique identifier for the trade.
</ResponseField>

<ResponseField name="tradeType" type="string">
  Type of the trade.
</ResponseField>

<ResponseField name="takerOrderHash" type="string">
  Hash of the taker order associated with this trade.
</ResponseField>

<ResponseField name="builder" type="string">
  Address of the builder who attributed this trade.
</ResponseField>

<ResponseField name="market" type="string">
  Condition ID of the market this trade belongs to.
</ResponseField>

<ResponseField name="assetId" type="string">
  Token ID of the asset traded.
</ResponseField>

<ResponseField name="side" type="string">
  Side of the trade (e.g. BUY or SELL).
</ResponseField>

<ResponseField name="size" type="string">
  Size of the trade in shares.
</ResponseField>

<ResponseField name="sizeUsdc" type="string">
  Size of the trade denominated in USDC.
</ResponseField>

<ResponseField name="price" type="string">
  Price at which the trade was executed.
</ResponseField>

<ResponseField name="status" type="string">
  Current status of the trade.
</ResponseField>

<ResponseField name="outcome" type="string">
  Outcome label associated with the traded asset.
</ResponseField>

<ResponseField name="outcomeIndex" type="number">
  Index of the outcome within the market.
</ResponseField>

<ResponseField name="owner" type="string">
  Address of the order owner (taker).
</ResponseField>

<ResponseField name="maker" type="string">
  Address of the maker in the trade.
</ResponseField>

<ResponseField name="transactionHash" type="string">
  On-chain transaction hash for the trade.
</ResponseField>

<ResponseField name="matchTime" type="string">
  Timestamp when the trade was matched.
</ResponseField>

<ResponseField name="bucketIndex" type="number">
  Bucket index used for trade grouping.
</ResponseField>

<ResponseField name="fee" type="string">
  Fee charged for the trade in shares.
</ResponseField>

<ResponseField name="feeUsdc" type="string">
  Fee charged for the trade denominated in USDC.
</ResponseField>

<ResponseField name="err_msg" type="string | null">
  Optional. Error message if the trade encountered an issue, otherwise null.
</ResponseField>

<ResponseField name="createdAt" type="string | null">
  Timestamp when the trade record was created, or null if unavailable.
</ResponseField>

<ResponseField name="updatedAt" type="string | null">
  Timestamp when the trade record was last updated, or null if unavailable.
</ResponseField>

***

### revokeBuilderApiKey

Revokes the builder API key used to authenticate the current request. After revocation, the key can no longer be used for builder-authenticated requests.

```typescript Signature theme={null}
async revokeBuilderApiKey(): Promise<any>
```

<ResponseField name="returns" type="any">
  Response from the revocation request.
</ResponseField>

***

## See Also

<CardGroup cols={2}>
  <Card title="Builders Program" icon="hammer" href="/builders/overview">
    Learn about the Builders Program and its benefits.
  </Card>

  <Card title="Order Attribution" icon="key" href="/trading/orders/attribution">
    Attribute orders to your builder account.
  </Card>

  <Card title="L2 Methods" icon="lock" href="/trading/clients/l2">
    Place and manage orders with API credentials.
  </Card>

  <Card title="Gasless Transactions" icon="gas-pump" href="/trading/gasless">
    Execute onchain operations without paying gas.
  </Card>
</CardGroup>
