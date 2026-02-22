<!--
Source: https://docs.polymarket.com/market-makers/getting-started.md
Downloaded: 2026-02-22T10:30:19.691Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Getting Started

> One-time setup for market making on Polymarket

Before you can start market making, you need to complete these one-time setup steps — deposit USDC.e to Polygon, deploy a wallet, approve tokens for trading, and generate API credentials.

<Steps>
  <Step title="Deposit USDC.e">
    Market makers need USDC.e on Polygon to fund their trading operations.

    | Method                  | Best For                             | Documentation                                        |
    | ----------------------- | ------------------------------------ | ---------------------------------------------------- |
    | Bridge API              | Automated deposits from other chains | [Bridge Deposit](/trading/bridge/deposit)            |
    | Direct Polygon transfer | Already have USDC.e on Polygon       | N/A                                                  |
    | Cross-chain bridge      | Large deposits from Ethereum         | [Supported Assets](/trading/bridge/supported-assets) |

    ### Using the Bridge API

    ```typescript  theme={null}
    // Get deposit addresses for your Polymarket wallet
    const deposit = await fetch("https://bridge.polymarket.com/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: "YOUR_POLYMARKET_WALLET_ADDRESS",
      }),
    });

    // Returns deposit addresses for EVM, SVM, and BTC networks
    const addresses = await deposit.json();
    // Send USDC to the appropriate address for your source chain
    ```
  </Step>

  <Step title="Deploy a Wallet">
    ### EOA

    Standard Ethereum wallet. You pay for all onchain transactions (approvals, splits, merges, trade execution).

    ### Safe Wallet

    Gnosis Safe-based wallet deployed via Polymarket's relayer. Benefits:

    * **Gasless transactions** — Polymarket pays gas fees for onchain operations
    * **Contract wallet** — Enables advanced features like batched transactions

    Deploy a Safe wallet using the Relayer Client:

    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { RelayClient, RelayerTxType } from "@polymarket/builder-relayer-client";

      const client = new RelayClient(
        "https://relayer-v2.polymarket.com/",
        137, // Polygon mainnet
        signer,
        builderConfig,
        RelayerTxType.SAFE,
      );

      // Deploy the Safe wallet
      const response = await client.deploy();
      const result = await response.wait();
      console.log("Safe Address:", result?.proxyAddress);
      ```

      ```python Python theme={null}
      from py_builder_relayer_client.client import RelayClient

      # client initialized with builder_config

      # Deploy the Safe wallet
      response = client.deploy()
      result = response.wait()
      print("Safe Address:", result.get("proxyAddress"))
      ```
    </CodeGroup>

    <Info>
      See [Gasless Transactions](/trading/gasless) for full Relayer Client setup
      including local and remote signing configurations.
    </Info>
  </Step>

  <Step title="Approve Tokens">
    Before trading, you must approve the exchange contracts to spend your tokens.

    ### Required Approvals

    | Token                | Spender               | Purpose                          |
    | -------------------- | --------------------- | -------------------------------- |
    | USDC.e               | CTF Contract          | Split USDC.e into outcome tokens |
    | CTF (outcome tokens) | CTF Exchange          | Trade outcome tokens             |
    | CTF (outcome tokens) | Neg Risk CTF Exchange | Trade neg-risk market tokens     |

    ### Contract Addresses

    ```typescript  theme={null}
    const ADDRESSES = {
      USDCe: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      CTF: "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045",
      CTF_EXCHANGE: "0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E",
      NEG_RISK_CTF_EXCHANGE: "0xC5d563A36AE78145C45a50134d48A1215220f80a",
      NEG_RISK_ADAPTER: "0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296",
    };
    ```

    ### Approve via Relayer Client

    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { ethers } from "ethers";
      import { Interface } from "ethers/lib/utils";

      const erc20Interface = new Interface([
        "function approve(address spender, uint256 amount) returns (bool)",
      ]);

      // Approve USDCe for CTF contract
      const approveTx = {
        to: ADDRESSES.USDCe,
        data: erc20Interface.encodeFunctionData("approve", [
          ADDRESSES.CTF,
          ethers.constants.MaxUint256,
        ]),
        value: "0",
      };

      const response = await client.execute([approveTx], "Approve USDCe for CTF");
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

      response = client.execute([approve_tx], "Approve USDC for CTF")
      response.wait()
      ```
    </CodeGroup>
  </Step>

  <Step title="Generate API Credentials">
    To place orders and access authenticated endpoints, you need L2 API credentials derived from your wallet.

    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { ClobClient } from "@polymarket/clob-client";

      const client = new ClobClient("https://clob.polymarket.com", 137, signer);

      // Derive API credentials from your wallet
      const credentials = await client.createOrDeriveApiKey();
      console.log("API Key:", credentials.key);
      console.log("Secret:", credentials.secret);
      console.log("Passphrase:", credentials.passphrase);
      ```

      ```python Python theme={null}
      from py_clob_client.client import ClobClient
      import os

      private_key = os.getenv("PRIVATE_KEY")

      temp_client = ClobClient("https://clob.polymarket.com", key=private_key, chain_id=137)
      credentials = temp_client.create_or_derive_api_creds()
      ```
    </CodeGroup>

    Once you have credentials, initialize the client for authenticated operations:

    <CodeGroup>
      ```typescript TypeScript theme={null}
      const tradingClient = new ClobClient(
        "https://clob.polymarket.com",
        137,
        wallet,
        credentials,
      );
      ```

      ```python Python theme={null}
      client = ClobClient(
          "https://clob.polymarket.com",
          key=private_key,
          chain_id=137,
          creds=credentials,
      )
      ```
    </CodeGroup>

    See [Authentication](/trading/overview#authentication) for full details on signature types and REST API headers.
  </Step>
</Steps>

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Trading" icon="chart-line" href="/market-makers/trading">
    Post limit orders and manage quotes
  </Card>

  <Card title="Market Data" icon="database" href="/market-data/overview">
    Connect to real-time market data
  </Card>
</CardGroup>
