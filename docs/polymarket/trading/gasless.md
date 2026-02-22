<!--
Source: https://docs.polymarket.com/trading/gasless.md
Downloaded: 2026-02-22T23:06:41.933Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Gasless Transactions

> Execute onchain operations without paying gas fees

Polymarket's **Relayer Client** enables gasless transactions for your users. Instead of requiring users to hold POL for gas, Polymarket's infrastructure pays all transaction fees. This creates a seamless experience where users only need USDC.e to trade.

## How It Works

The relayer acts as a transaction sponsor:

1. Your app creates a transaction
2. The user signs it with their private key
3. Your app sends it to Polymarket's relayer
4. The relayer submits it onchain and pays the gas fee
5. The transaction executes from the user's wallet

<Note>
  Gasless transactions require **Builder Program** membership. You'll need
  Builder API credentials to authenticate with the relayer.
</Note>

## What Is Covered

Polymarket pays gas for all operations routed through the relayer:

| Operation             | Description                                         |
| --------------------- | --------------------------------------------------- |
| **Wallet deployment** | Deploy Safe or Proxy wallets for new users          |
| **Token approvals**   | Approve contracts to spend USDC.e or outcome tokens |
| **CTF operations**    | Split, merge, and redeem positions                  |
| **Transfers**         | Move tokens between addresses                       |

## Prerequisites

Before using the relayer, you need:

| Requirement                  | Source                                                         |
| ---------------------------- | -------------------------------------------------------------- |
| Builder API credentials      | [Builder Profile](https://polymarket.com/settings?tab=builder) |
| User's private key or signer | Your wallet integration                                        |
| USDC.e balance               | For trading (not for gas)                                      |

## Installation

<CodeGroup>
  ```bash npm theme={null}
  npm install @polymarket/builder-relayer-client @polymarket/builder-signing-sdk
  ```

  ```bash pip theme={null}
  pip install py-builder-relayer-client py-builder-signing-sdk
  ```
</CodeGroup>

## Client Setup

Initialize the relayer client with your signing configuration:

<Tabs>
  <Tab title="Local Signing">
    Use local signing when your backend handles all transactions securely.

    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { createWalletClient, http, Hex } from "viem";
      import { privateKeyToAccount } from "viem/accounts";
      import { polygon } from "viem/chains";
      import { RelayClient } from "@polymarket/builder-relayer-client";
      import { BuilderConfig } from "@polymarket/builder-signing-sdk";

      const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
      const wallet = createWalletClient({
        account,
        chain: polygon,
        transport: http(process.env.RPC_URL),
      });

      const builderConfig = new BuilderConfig({
        localBuilderCreds: {
          key: process.env.POLY_BUILDER_API_KEY!,
          secret: process.env.POLY_BUILDER_SECRET!,
          passphrase: process.env.POLY_BUILDER_PASSPHRASE!,
        },
      });

      const client = new RelayClient(
        "https://relayer-v2.polymarket.com/",
        137,
        wallet,
        builderConfig,
      );
      ```

      ```python Python theme={null}
      import os
      from py_builder_relayer_client.client import RelayClient
      from py_builder_signing_sdk import BuilderConfig, BuilderApiKeyCreds

      builder_config = BuilderConfig(
          local_builder_creds=BuilderApiKeyCreds(
              key=os.getenv("POLY_BUILDER_API_KEY"),
              secret=os.getenv("POLY_BUILDER_SECRET"),
              passphrase=os.getenv("POLY_BUILDER_PASSPHRASE"),
          )
      )

      client = RelayClient(
          "https://relayer-v2.polymarket.com",
          137,
          os.getenv("PRIVATE_KEY"),
          builder_config
      )
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Remote Signing">
    Use remote signing to keep credentials on a secure server you control.

    **Your signing server** receives request details and returns authentication headers:

    <CodeGroup>
      ```typescript Server (TypeScript) theme={null}
      import {
        buildHmacSignature,
        BuilderApiKeyCreds,
      } from "@polymarket/builder-signing-sdk";

      const BUILDER_CREDENTIALS: BuilderApiKeyCreds = {
        key: process.env.POLY_BUILDER_API_KEY!,
        secret: process.env.POLY_BUILDER_SECRET!,
        passphrase: process.env.POLY_BUILDER_PASSPHRASE!,
      };

      // POST /sign endpoint
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

      ```python Server (Python) theme={null}
      import os
      import time
      from py_builder_signing_sdk.signing.hmac import build_hmac_signature
      from py_builder_signing_sdk import BuilderApiKeyCreds

      BUILDER_CREDENTIALS = BuilderApiKeyCreds(
          key=os.environ["POLY_BUILDER_API_KEY"],
          secret=os.environ["POLY_BUILDER_SECRET"],
          passphrase=os.environ["POLY_BUILDER_PASSPHRASE"],
      )

      # POST /sign endpoint
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

    **Your client** points to your signing server:

    <CodeGroup>
      ```typescript Client (TypeScript) theme={null}
      import { RelayClient } from "@polymarket/builder-relayer-client";
      import { BuilderConfig } from "@polymarket/builder-signing-sdk";

      const builderConfig = new BuilderConfig({
        remoteBuilderConfig: {
          url: "https://your-server.com/sign",
        },
      });

      const client = new RelayClient(
        "https://relayer-v2.polymarket.com/",
        137,
        wallet,
        builderConfig,
      );
      ```

      ```python Client (Python) theme={null}
      from py_builder_relayer_client.client import RelayClient
      from py_builder_signing_sdk import BuilderConfig, RemoteBuilderConfig

      builder_config = BuilderConfig(
          remote_builder_config=RemoteBuilderConfig(
              url="https://your-server.com/sign"
          )
      )

      client = RelayClient(
          "https://relayer-v2.polymarket.com",
          137,
          private_key,
          builder_config
      )
      ```
    </CodeGroup>
  </Tab>
</Tabs>

<Warning>
  Never expose Builder API credentials in client-side code. Use environment
  variables or a secrets manager.
</Warning>

### Relayer Authentication Headers

All requests to the relayer must include these authentication headers:

| Header                    | Description             |
| ------------------------- | ----------------------- |
| `POLY_BUILDER_API_KEY`    | Your Builder API key    |
| `POLY_BUILDER_TIMESTAMP`  | Unix timestamp          |
| `POLY_BUILDER_PASSPHRASE` | Your Builder passphrase |
| `POLY_BUILDER_SIGNATURE`  | HMAC-SHA256 signature   |

The SDKs handle header generation automatically when you provide your credentials via `BuilderConfig`.

## Wallet Types

Choose a wallet type when initializing the client:

| Type      | Deployment                               | Best For                  |
| --------- | ---------------------------------------- | ------------------------- |
| **Safe**  | Call `deploy()` before first transaction | Most builder integrations |
| **Proxy** | Auto-deploys on first transaction        | Magic Link users          |

<CodeGroup>
  ```typescript Safe Wallet (TypeScript) theme={null}
  import { RelayClient, RelayerTxType } from "@polymarket/builder-relayer-client";

  const client = new RelayClient(
    "https://relayer-v2.polymarket.com/",
    137,
    wallet,
    builderConfig,
    RelayerTxType.SAFE,
  );

  // Deploy before first transaction
  const response = await client.deploy();
  const result = await response.wait();
  console.log("Safe Address:", result?.proxyAddress);
  ```

  ```python Safe Wallet (Python) theme={null}
  from py_builder_relayer_client.client import RelayClient

  # client initialized with builder_config (see Client Setup above)

  # Deploy before first transaction
  response = client.deploy()
  result = response.wait()
  print("Safe Address:", result.get("proxyAddress"))
  ```

  ```typescript Proxy Wallet (TypeScript) theme={null}
  import { RelayClient, RelayerTxType } from "@polymarket/builder-relayer-client";

  const client = new RelayClient(
    "https://relayer-v2.polymarket.com/",
    137,
    wallet,
    builderConfig,
    RelayerTxType.PROXY,
  );

  // No deploy needed - auto-deploys on first transaction
  ```

  ```python Proxy Wallet (Python) theme={null}
  from py_builder_relayer_client.client import RelayClient

  # client initialized with builder_config (see Client Setup above)
  # No deploy needed - auto-deploys on first transaction
  ```
</CodeGroup>

## Executing Transactions

Use the `execute` method to send transactions through the relayer:

```typescript  theme={null}
interface Transaction {
  to: string; // Target contract address
  data: string; // Encoded function call
  value: string; // POL to send (usually "0")
}

const response = await client.execute(transactions, "Description");
const result = await response.wait();
```

### Token Approval

Approve contracts to spend tokens:

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { encodeFunctionData, maxUint256 } from "viem";

  const USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const CTF = "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045";

  const approveTx = {
    to: USDC,
    data: encodeFunctionData({
      abi: [
        {
          name: "approve",
          type: "function",
          inputs: [
            { name: "spender", type: "address" },
            { name: "amount", type: "uint256" },
          ],
          outputs: [{ type: "bool" }],
        },
      ],
      functionName: "approve",
      args: [CTF, maxUint256],
    }),
    value: "0",
  };

  const response = await client.execute([approveTx], "Approve USDC.e for CTF");
  await response.wait();
  ```

  ```python Python theme={null}
  from web3 import Web3

  USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  CTF = "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045"
  MAX_UINT256 = 2**256 - 1

  approve_tx = {
      "to": USDC,
      "data": Web3().eth.contract(
          address=USDC,
          abi=[{
              "name": "approve",
              "type": "function",
              "inputs": [
                  {"name": "spender", "type": "address"},
                  {"name": "amount", "type": "uint256"}
              ],
              "outputs": [{"type": "bool"}]
          }]
      ).encode_abi(abi_element_identifier="approve", args=[CTF, MAX_UINT256]),
      "value": "0"
  }

  response = client.execute([approve_tx], "Approve USDC.e for CTF")
  response.wait()
  ```
</CodeGroup>

### Redeem Positions

Exchange winning tokens for USDC.e after market resolution:

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { encodeFunctionData } from "viem";

  const redeemTx = {
    to: CTF_ADDRESS,
    data: encodeFunctionData({
      abi: [
        {
          name: "redeemPositions",
          type: "function",
          inputs: [
            { name: "collateralToken", type: "address" },
            { name: "parentCollectionId", type: "bytes32" },
            { name: "conditionId", type: "bytes32" },
            { name: "indexSets", type: "uint256[]" },
          ],
          outputs: [],
        },
      ],
      functionName: "redeemPositions",
      args: [collateralToken, parentCollectionId, conditionId, indexSets],
    }),
    value: "0",
  };

  const response = await client.execute([redeemTx], "Redeem positions");
  await response.wait();
  ```

  ```python Python theme={null}
  CTF = "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045"

  redeem_tx = {
      "to": CTF,
      "data": Web3().eth.contract(
          address=CTF,
          abi=[{
              "name": "redeemPositions",
              "type": "function",
              "inputs": [
                  {"name": "collateralToken", "type": "address"},
                  {"name": "parentCollectionId", "type": "bytes32"},
                  {"name": "conditionId", "type": "bytes32"},
                  {"name": "indexSets", "type": "uint256[]"}
              ],
              "outputs": []
          }]
      ).encode_abi(
          abi_element_identifier="redeemPositions",
          args=[collateral_token, parent_collection_id, condition_id, index_sets]
      ),
      "value": "0"
  }

  response = client.execute([redeem_tx], "Redeem positions")
  response.wait()
  ```
</CodeGroup>

### Batch Transactions

Execute multiple operations atomically in a single call:

<CodeGroup>
  ```typescript TypeScript theme={null}
  const approveTx = {
    to: USDC,
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [CTF, maxUint256],
    }),
    value: "0",
  };

  const transferTx = {
    to: USDC,
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: "transfer",
      args: [recipientAddress, parseUnits("50", 6)],
    }),
    value: "0",
  };

  // Both execute atomically
  const response = await client.execute(
    [approveTx, transferTx],
    "Approve and transfer",
  );
  await response.wait();
  ```

  ```python Python theme={null}
  approve_tx = {
      "to": USDC,
      "data": contract.encode_abi(
          abi_element_identifier="approve",
          args=[CTF, MAX_UINT256]
      ),
      "value": "0"
  }

  transfer_tx = {
      "to": USDC,
      "data": contract.encode_abi(
          abi_element_identifier="transfer",
          args=[recipient_address, 50 * 10**6]
      ),
      "value": "0"
  }

  # Both execute atomically
  response = client.execute([approve_tx, transfer_tx], "Approve and transfer")
  response.wait()
  ```
</CodeGroup>

<Tip>
  Batching reduces latency and ensures all transactions succeed or fail
  together.
</Tip>

## Transaction States

Track transaction progress through these states:

| State             | Terminal | Description                     |
| ----------------- | -------- | ------------------------------- |
| `STATE_NEW`       | No       | Transaction received by relayer |
| `STATE_EXECUTED`  | No       | Submitted onchain               |
| `STATE_MINED`     | No       | Included in a block             |
| `STATE_CONFIRMED` | Yes      | Finalized successfully          |
| `STATE_FAILED`    | Yes      | Failed permanently              |
| `STATE_INVALID`   | Yes      | Rejected as invalid             |

## Contract Addresses

See [Contract Addresses](/resources/contract-addresses) for all Polymarket smart contract addresses on Polygon.

## Resources

* [Builder Relayer Client (TypeScript)](https://github.com/Polymarket/builder-relayer-client)
* [Builder Relayer Client (Python)](https://github.com/Polymarket/py-builder-relayer-client)
* [Builder Signing SDK (TypeScript)](https://github.com/Polymarket/builder-signing-sdk)
* [Builder Signing SDK (Python)](https://github.com/Polymarket/py-builder-signing-sdk)

## Next Steps

<CardGroup cols={2}>
  <Card title="Negative Risk Markets" icon="scale-balanced" href="/advanced/neg-risk">
    Learn about capital-efficient trading for multi-outcome events.
  </Card>

  <Card title="Positions & Tokens" icon="coins" href="/concepts/positions-tokens">
    Understand token operations like split, merge, and redeem.
  </Card>
</CardGroup>
