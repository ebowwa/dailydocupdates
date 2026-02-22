<!--
Source: https://docs.polymarket.com/trading/orders/attribution.md
Downloaded: 2026-02-22T05:37:55.169Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Order Attribution

> Attribute orders to your builder key for volume credit

Order attribution adds builder authentication headers when placing orders through the CLOB, enabling Polymarket to credit trades to your builder account. This allows you to:

* Track volume on the [Builder Leaderboard](https://builders.polymarket.com/)
* Earn rewards through the [Builder Program](/builders/overview)
* Monitor performance via the Data API

***

## Builder API Credentials

Each builder receives API credentials from their [Builder Profile](https://polymarket.com/settings?tab=builder):

| Credential   | Description                          |
| ------------ | ------------------------------------ |
| `key`        | Your builder API key identifier      |
| `secret`     | Secret key for signing requests      |
| `passphrase` | Additional authentication passphrase |

<Warning>
  Builder API credentials are **not** the same as user API credentials. Builder
  credentials are for order attribution only — you still need user credentials
  for authentication. Never expose builder credentials in client-side code or
  commit them to version control.
</Warning>

***

## Remote Signing

Remote signing keeps your builder credentials secure on a server you control. The user's client sends order details to your server, which adds the builder headers before forwarding to the CLOB.

### Server Implementation

Your signing server receives request details and returns the authentication headers:

<CodeGroup>
  ```typescript TypeScript theme={null}
  import {
    buildHmacSignature,
    BuilderApiKeyCreds,
  } from "@polymarket/builder-signing-sdk";

  const BUILDER_CREDENTIALS: BuilderApiKeyCreds = {
    key: process.env.POLY_BUILDER_API_KEY!,
    secret: process.env.POLY_BUILDER_SECRET!,
    passphrase: process.env.POLY_BUILDER_PASSPHRASE!,
  };

  // POST /sign - receives { method, path, body } from the client SDK
  export async function handleSignRequest(request) {
    const { method, path, body } = await request.json();
    const timestamp = Date.now().toString();

    const signature = buildHmacSignature(
      BUILDER_CREDENTIALS.secret,
      parseInt(timestamp),
      method,
      path,
      body,
    );

    return {
      POLY_BUILDER_SIGNATURE: signature,
      POLY_BUILDER_TIMESTAMP: timestamp,
      POLY_BUILDER_API_KEY: BUILDER_CREDENTIALS.key,
      POLY_BUILDER_PASSPHRASE: BUILDER_CREDENTIALS.passphrase,
    };
  }
  ```

  ```python Python theme={null}
  import os
  import time
  from py_builder_signing_sdk.signing.hmac import build_hmac_signature
  from py_builder_signing_sdk import BuilderApiKeyCreds

  BUILDER_CREDENTIALS = BuilderApiKeyCreds(
      key=os.environ["POLY_BUILDER_API_KEY"],
      secret=os.environ["POLY_BUILDER_SECRET"],
      passphrase=os.environ["POLY_BUILDER_PASSPHRASE"],
  )

  # POST /sign - receives { method, path, body } from the client SDK
  def handle_sign_request(method: str, path: str, body: str):
      timestamp = str(int(time.time()))

      signature = build_hmac_signature(
          BUILDER_CREDENTIALS.secret,
          timestamp,
          method,
          path,
          body
      )

      return {
          "POLY_BUILDER_SIGNATURE": signature,
          "POLY_BUILDER_TIMESTAMP": timestamp,
          "POLY_BUILDER_API_KEY": BUILDER_CREDENTIALS.key,
          "POLY_BUILDER_PASSPHRASE": BUILDER_CREDENTIALS.passphrase,
      }
  ```
</CodeGroup>

### Client Configuration

Point the CLOB client to your signing server:

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { ClobClient } from "@polymarket/clob-client";
  import { BuilderConfig } from "@polymarket/builder-signing-sdk";

  const builderConfig = new BuilderConfig({
    remoteBuilderConfig: {
      url: "https://your-server.com/sign",
      token: "optional-auth-token", // optional
    },
  });

  const client = new ClobClient(
    "https://clob.polymarket.com",
    137,
    signer,
    apiCreds,
    2, // signature type
    funderAddress,
    undefined,
    false,
    builderConfig,
  );

  // Orders automatically include builder headers
  const response = await client.createAndPostOrder(/* ... */);
  ```

  ```python Python theme={null}
  from py_clob_client.client import ClobClient
  from py_builder_signing_sdk import BuilderConfig, RemoteBuilderConfig

  builder_config = BuilderConfig(
      remote_builder_config=RemoteBuilderConfig(
          url="https://your-server.com/sign",
          token="optional-auth-token",  # optional
      )
  )

  client = ClobClient(
      host="https://clob.polymarket.com",
      chain_id=137,
      key=private_key,
      creds=api_creds,
      signature_type=2,
      funder=funder_address,
      builder_config=builder_config
  )

  # Orders automatically include builder headers
  response = client.create_and_post_order(...)
  ```
</CodeGroup>

***

## Local Signing

Sign orders locally when you control the entire order placement flow (e.g., your backend places orders on behalf of users):

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { ClobClient } from "@polymarket/clob-client";
  import {
    BuilderConfig,
    BuilderApiKeyCreds,
  } from "@polymarket/builder-signing-sdk";

  const builderCreds: BuilderApiKeyCreds = {
    key: process.env.POLY_BUILDER_API_KEY!,
    secret: process.env.POLY_BUILDER_SECRET!,
    passphrase: process.env.POLY_BUILDER_PASSPHRASE!,
  };

  const builderConfig = new BuilderConfig({
    localBuilderCreds: builderCreds,
  });

  const client = new ClobClient(
    "https://clob.polymarket.com",
    137,
    signer,
    apiCreds,
    2,
    funderAddress,
    undefined,
    false,
    builderConfig,
  );

  // Orders automatically include builder headers
  const response = await client.createAndPostOrder(/* ... */);
  ```

  ```python Python theme={null}
  import os
  from py_clob_client.client import ClobClient
  from py_builder_signing_sdk import BuilderConfig, BuilderApiKeyCreds

  builder_creds = BuilderApiKeyCreds(
      key=os.environ["POLY_BUILDER_API_KEY"],
      secret=os.environ["POLY_BUILDER_SECRET"],
      passphrase=os.environ["POLY_BUILDER_PASSPHRASE"],
  )

  builder_config = BuilderConfig(
      local_builder_creds=builder_creds,
  )

  client = ClobClient(
      host="https://clob.polymarket.com",
      chain_id=137,
      key=private_key,
      creds=api_creds,
      signature_type=2,
      funder=funder_address,
      builder_config=builder_config
  )

  # Orders automatically include builder headers
  response = client.create_and_post_order(...)
  ```
</CodeGroup>

***

## Authentication Headers

The SDK automatically generates and attaches these headers to each request:

| Header                    | Description                          |
| ------------------------- | ------------------------------------ |
| `POLY_BUILDER_API_KEY`    | Your builder API key                 |
| `POLY_BUILDER_TIMESTAMP`  | Unix timestamp of signature creation |
| `POLY_BUILDER_PASSPHRASE` | Your builder passphrase              |
| `POLY_BUILDER_SIGNATURE`  | HMAC signature of the request        |

<Info>
  With **local signing**, the SDK constructs and attaches these headers
  automatically. With **remote signing**, your server returns these headers and
  the SDK attaches them.
</Info>

***

## Verifying Attribution

### Get Builder Trades

Query trades attributed to your builder account to verify attribution is working:

<CodeGroup>
  ```typescript TypeScript theme={null}
  const trades = await client.getBuilderTrades();

  // Filtered by market
  const marketTrades = await client.getBuilderTrades({
    market: "0xbd31dc8a...",
  });
  ```

  ```python Python theme={null}
  trades = client.get_builder_trades()

  market_trades = client.get_builder_trades(
      market="0xbd31dc8a..."
  )
  ```
</CodeGroup>

Each `BuilderTrade` includes: `id`, `market`, `assetId`, `side`, `size`, `price`, `status`, `outcome`, `owner`, `maker`, `transactionHash`, `matchTime`, `fee`, and `feeUsdc`.

### Revoke Builder API Key

If your credentials are compromised, revoke them immediately:

<CodeGroup>
  ```typescript TypeScript theme={null}
  await client.revokeBuilderApiKey();
  ```

  ```python Python theme={null}
  client.revoke_builder_api_key()
  ```
</CodeGroup>

After revoking, generate new credentials from your [Builder Profile](https://polymarket.com/settings?tab=builder).

***

## Troubleshooting

<AccordionGroup>
  <Accordion title="Invalid Signature Errors">
    * Verify the request body is passed correctly as JSON - Check that `path`,
      `body`, and `method` match what the client sends - Ensure your server and
      client use the same Builder API credentials
  </Accordion>

  <Accordion title="Missing Credentials">
    Ensure your environment variables are set: - `POLY_BUILDER_API_KEY` -
    `POLY_BUILDER_SECRET` - `POLY_BUILDER_PASSPHRASE`
  </Accordion>

  <Accordion title="Volume not appearing on leaderboard">
    * Confirm your builder credentials are valid and not revoked - Check that
      orders are being placed with the builder config attached - Allow up to 24
      hours for volume to appear on the leaderboard
  </Accordion>
</AccordionGroup>

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Builder Program" icon="hammer" href="/builders/overview">
    Learn about the Builder Program tiers and rewards
  </Card>

  <Card title="Create Orders" icon="plus" href="/trading/orders/create">
    Build, sign, and submit orders
  </Card>
</CardGroup>
