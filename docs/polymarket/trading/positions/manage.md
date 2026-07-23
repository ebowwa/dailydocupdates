<!--
Source: https://docs.polymarket.com/trading/positions/manage.md
Downloaded: 2026-07-23T21:04:54.619Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage Positions

> Learn how to manage outcome-token inventory from creation through redemption.

Manage positions outside the order book by splitting collateral into complete
sets of outcome tokens, merging balanced tokens back into collateral, or
redeeming winning tokens after resolution.

Choose an operation based on how you want to change your position:

| Operation | Use it when                                                                   |
| --------- | ----------------------------------------------------------------------------- |
| Split     | You need to convert collateral into a complete set of outcome tokens.         |
| Merge     | You hold balanced outcome tokens and want to convert them back to collateral. |
| Redeem    | A market has resolved and you want to claim collateral for winning positions. |

Choose the integration surface you will use to submit position operations.

<Tabs>
  <Tab title="TypeScript">
    The examples on this page assume you have a `SecureClient` configured with
    either a Relayer API key or a Builder API key.

    <CodeGroup>
      ```ts Relayer API Key theme={null}
      import { createSecureClient, relayerApiKey } from "@polymarket/client";
      import { privateKey } from "@polymarket/client/viem";

      const client = await createSecureClient({
        signer: privateKey(process.env.SIGNER_PRIVATE_KEY),
        wallet: process.env.POLYMARKET_WALLET_ADDRESS,
        apiKey: relayerApiKey({
          key: process.env.POLYMARKET_RELAYER_API_KEY!,
          address: process.env.POLYMARKET_RELAYER_API_KEY_ADDRESS!,
        }),
      });
      ```

      ```ts Builder API Key theme={null}
      import { createSecureClient } from "@polymarket/client";
      import { builderApiKey } from "@polymarket/client/node";
      import { privateKey } from "@polymarket/client/viem";

      const client = await createSecureClient({
        signer: privateKey(process.env.SIGNER_PRIVATE_KEY),
        wallet: process.env.POLYMARKET_WALLET_ADDRESS,
        apiKey: builderApiKey({
          key: process.env.POLYMARKET_BUILDER_API_KEY!,
          secret: process.env.POLYMARKET_BUILDER_SECRET!,
          passphrase: process.env.POLYMARKET_BUILDER_PASSPHRASE!,
        }),
      });
      ```
    </CodeGroup>

    See [Wallets and
    Authentication](/trading/wallets-auth#execute-gasless-transactions) for the
    complete wallet setup and Relayer authorization flow.
  </Tab>

  <Tab title="Python">
    The examples on this page assume you have an `AsyncSecureClient` configured
    with either a Relayer API key or a Builder API key.

    <CodeGroup>
      ```python Relayer API Key theme={null}
      import os

      from polymarket import AsyncSecureClient, RelayerApiKey

      client = await AsyncSecureClient.create(
          private_key=os.environ["SIGNER_PRIVATE_KEY"],
          wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
          api_key=RelayerApiKey(
              key=os.environ["POLYMARKET_RELAYER_API_KEY"],
              address=os.environ["POLYMARKET_RELAYER_API_KEY_ADDRESS"],
          ),
      )
      ```

      ```python Builder API Key theme={null}
      import os

      from polymarket import AsyncSecureClient, BuilderApiKey

      client = await AsyncSecureClient.create(
          private_key=os.environ["SIGNER_PRIVATE_KEY"],
          wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
          api_key=BuilderApiKey(
              key=os.environ["POLYMARKET_BUILDER_API_KEY"],
              secret=os.environ["POLYMARKET_BUILDER_SECRET"],
              passphrase=os.environ["POLYMARKET_BUILDER_PASSPHRASE"],
          ),
      )
      ```
    </CodeGroup>

    The synchronous `SecureClient` provides the same methods and supports both
    API key types.

    See [Wallets and
    Authentication](/trading/wallets-auth#execute-gasless-transactions) for the
    complete wallet setup and Relayer authorization flow.
  </Tab>

  <Tab title="API">
    The examples on this page assume you can authenticate Relayer API requests
    with either a Relayer API key or a Builder API key. The examples below use
    a Relayer API key:

    ```bash theme={null}
    RELAYER_API_KEY="<relayer_api_key>"
    RELAYER_API_KEY_ADDRESS="<signer_address>"
    ```

    See [Execute Gasless
    Transactions](/trading/wallets-auth#execute-gasless-transactions) for the
    complete wallet setup and Relayer authorization flow.
  </Tab>

  <Tab title="Solidity">
    The examples on this page use these Polygon contracts:

    | Contract                      | Address                                                                                                                    |
    | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
    | pUSD                          | [`0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB`](https://polygonscan.com/address/0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB) |
    | Conditional Tokens            | [`0x4D97DCd97eC945f40cF65F87097ACe5EA0476045`](https://polygonscan.com/address/0x4D97DCd97eC945f40cF65F87097ACe5EA0476045) |
    | `CtfCollateralAdapter`        | [`0xAdA100Db00Ca00073811820692005400218FcE1f`](https://polygonscan.com/address/0xAdA100Db00Ca00073811820692005400218FcE1f) |
    | `NegRiskCtfCollateralAdapter` | [`0xadA2005600Dec949baf300f4C6120000bDB6eAab`](https://polygonscan.com/address/0xadA2005600Dec949baf300f4C6120000bDB6eAab) |
  </Tab>
</Tabs>

## Split a Position

Splitting converts pUSD into a complete set of outcome tokens. Every 1 pUSD
produces 1 YES token and 1 NO token.

```text theme={null}
100 pUSD → 100 YES tokens + 100 NO tokens
```

Before splitting, ensure you have:

1. Enough pUSD in the wallet for the amount you want to split.
2. Approved the collateral adapter for the market type to spend the wallet's
   pUSD.

<Tabs>
  <Tab title="TypeScript">
    Call `splitPosition()` on a `SecureClient`. The client identifies the
    market type from the condition ID and selects the correct collateral
    adapter.

    ```ts theme={null}
    const transaction = await client.splitPosition({
      conditionId: market.conditionId,
      amount: 1_000_000n,
    });

    const outcome = await transaction.wait();

    // outcome.transactionHash: TxHash
    // outcome.transactionId: TransactionId | null
    ```

    `amount` is denominated in pUSD base units, so `1_000_000n` splits 1 pUSD
    into 1 YES token and 1 NO token. `wait()` returns a `TransactionOutcome`
    after the transaction settles.
  </Tab>

  <Tab title="Python">
    Call `split_position()` on an `AsyncSecureClient`. The synchronous
    `SecureClient` provides the same method. Both clients identify the market
    type from the condition ID and select the correct collateral adapter.

    ```python theme={null}
    transaction = await client.split_position(
        condition_id=market.condition_id,
        amount=1_000_000,
    )

    outcome = await transaction.wait()

    # outcome.transaction_hash: TransactionHash
    # outcome.transaction_id: str | None
    ```

    `amount` is denominated in pUSD base units, so `1_000_000` splits 1 pUSD
    into 1 YES token and 1 NO token. `wait()` returns a `TransactionOutcome`
    after the transaction settles.
  </Tab>

  <Tab title="API">
    Build the `splitPosition` call, then execute it as a gasless wallet
    transaction.

    <Steps>
      <Step title="Build the Split Call">
        Select the call target from the market response's `negRisk` value:

        | `negRisk` | Call target                   | Address                                      |
        | --------- | ----------------------------- | -------------------------------------------- |
        | `false`   | `CtfCollateralAdapter`        | `0xAdA100Db00Ca00073811820692005400218FcE1f` |
        | `true`    | `NegRiskCtfCollateralAdapter` | `0xadA2005600Dec949baf300f4C6120000bDB6eAab` |

        ABI-encode this function call:

        ```solidity theme={null}
        function splitPosition(
            address collateralToken,
            bytes32 parentCollectionId,
            bytes32 conditionId,
            uint256[] partition,
            uint256 amount
        );
        ```

        | Argument             | Value                                        |
        | -------------------- | -------------------------------------------- |
        | `collateralToken`    | `0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB` |
        | `parentCollectionId` | 32 zero bytes                                |
        | `conditionId`        | `<market_condition_id>`                      |
        | `partition`          | `[1, 2]`                                     |
        | `amount`             | `<amount_in_pusd_base_units>`                |

        Place the encoded calldata in the wallet call:

        ```json theme={null}
        {
          "target": "<collateral_adapter_address>",
          "value": "0",
          "data": "<encoded_split_position_calldata>"
        }
        ```
      </Step>

      <Step title="Execute the Split">
        For a Deposit Wallet, include the split call in the signed wallet batch and
        submit it with the Relayer API key:

        ```bash theme={null}
        curl -X POST "https://relayer-v2.polymarket.com/submit" \
          -H "Content-Type: application/json" \
          -H "RELAYER_API_KEY: $RELAYER_API_KEY" \
          -H "RELAYER_API_KEY_ADDRESS: $RELAYER_API_KEY_ADDRESS" \
          --data '{
            "type": "WALLET",
            "from": "<signer_address>",
            "to": "0x00000000000Fb5C9ADea0298D729A0CB3823Cc07",
            "nonce": "<wallet_nonce>",
            "signature": "<wallet_batch_signature>",
            "metadata": "Split position",
            "depositWalletParams": {
              "depositWallet": "<deposit_wallet_address>",
              "deadline": "<unix_seconds>",
              "calls": [
                {
                  "target": "<collateral_adapter_address>",
                  "value": "0",
                  "data": "<encoded_split_position_calldata>"
                }
              ]
            }
          }'
        ```

        See [Execute Gasless
        Transactions](/trading/wallets-auth#execute-gasless-transactions) for nonce
        creation, wallet-batch signing, and confirmation. Wait for
        `STATE_CONFIRMED` before using the new balances.
      </Step>
    </Steps>
  </Tab>

  <Tab title="Solidity">
    Splitting pUSD through a collateral adapter follows this flow:

    * Approve the collateral adapter to spend the amount of pUSD being split.
    * Call the adapter with the market's condition ID and the amount.
    * The adapter executes the underlying CTF operation and mints equal YES and NO
      balances atomically.

    <Steps>
      <Step title="Approve pUSD">
        First, call `approve()` on the pUSD contract. Approve
        `CtfCollateralAdapter` for a standard market or
        `NegRiskCtfCollateralAdapter` for a negative-risk market:

        ```solidity theme={null}
        function approve(address spender, uint256 amount) external returns (bool);
        ```

        | Argument  | Value                                      |
        | --------- | ------------------------------------------ |
        | `spender` | The collateral adapter for the market type |
        | `amount`  | The amount of pUSD to split, in base units |
      </Step>

      <Step title="Split the Position">
        Then, call `splitPosition()` on the same contract you approved:
        `CtfCollateralAdapter` for standard markets or
        `NegRiskCtfCollateralAdapter` for negative-risk markets:

        ```solidity theme={null}
        function splitPosition(
            address collateralToken,
            bytes32 parentCollectionId,
            bytes32 conditionId,
            uint256[] partition,
            uint256 amount
        );
        ```

        | Argument             | Value                                        |
        | -------------------- | -------------------------------------------- |
        | `collateralToken`    | `0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB` |
        | `parentCollectionId` | 32 zero bytes                                |
        | `conditionId`        | The market's condition ID                    |
        | `partition`          | `[1, 2]`                                     |
        | `amount`             | The amount of pUSD to split, in base units   |

        The call mints the same amount of YES and NO tokens to the caller.
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Merge Positions

Merging converts a complete set of outcome tokens back into pUSD. Every 1 YES
token and 1 NO token returns 1 pUSD.

```text theme={null}
100 YES tokens + 100 NO tokens → 100 pUSD
```

Before merging, ensure you have:

1. Equal amounts of YES and NO tokens.
2. Approved the collateral adapter for the market type to transfer the wallet's
   outcome tokens.

<Tabs>
  <Tab title="TypeScript">
    Call `mergePositions()` on a `SecureClient`. The client identifies the
    market type, selects the correct collateral adapter, and checks the
    wallet's mergeable balance.

    ```ts theme={null}
    const transaction = await client.mergePositions({
      conditionId: market.conditionId,
      amount: "max",
    });

    const outcome = await transaction.wait();

    // outcome.transactionHash: TxHash
    // outcome.transactionId: TransactionId | null
    ```

    Pass a base-unit `bigint` to merge a specific amount. `"max"` merges the
    smaller of the wallet's YES and NO balances. `wait()` returns a
    `TransactionOutcome` after the transaction settles.
  </Tab>

  <Tab title="Python">
    Call `merge_positions()` on an `AsyncSecureClient`. The synchronous
    `SecureClient` provides the same method. Both clients identify the market
    type, select the correct collateral adapter, and check the wallet's
    mergeable balance.

    ```python theme={null}
    transaction = await client.merge_positions(
        condition_id=market.condition_id,
        amount="max",
    )

    outcome = await transaction.wait()

    # outcome.transaction_hash: TransactionHash
    # outcome.transaction_id: str | None
    ```

    Pass a base-unit `int` to merge a specific amount. `"max"` merges the
    smaller of the wallet's YES and NO balances. `wait()` returns a
    `TransactionOutcome` after the transaction settles.
  </Tab>

  <Tab title="API">
    Build the `mergePositions` call, then execute it as a gasless wallet
    transaction.

    <Steps>
      <Step title="Build the Merge Call">
        Use `CtfCollateralAdapter` at
        `0xAdA100Db00Ca00073811820692005400218FcE1f` when `negRisk` is `false`, or
        `NegRiskCtfCollateralAdapter` at
        `0xadA2005600Dec949baf300f4C6120000bDB6eAab` when it is `true`.

        ABI-encode this function call:

        ```solidity theme={null}
        function mergePositions(
            address collateralToken,
            bytes32 parentCollectionId,
            bytes32 conditionId,
            uint256[] partition,
            uint256 amount
        );
        ```

        | Argument             | Value                                        |
        | -------------------- | -------------------------------------------- |
        | `collateralToken`    | `0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB` |
        | `parentCollectionId` | 32 zero bytes                                |
        | `conditionId`        | `<market_condition_id>`                      |
        | `partition`          | `[1, 2]`                                     |
        | `amount`             | `<amount_in_pusd_base_units>`                |

        Place the encoded calldata in the wallet call:

        ```json theme={null}
        {
          "target": "<collateral_adapter_address>",
          "value": "0",
          "data": "<encoded_merge_positions_calldata>"
        }
        ```
      </Step>

      <Step title="Execute the Merge">
        For a Deposit Wallet, include the merge call in the signed wallet batch and
        submit it with the Relayer API key:

        ```bash theme={null}
        curl -X POST "https://relayer-v2.polymarket.com/submit" \
          -H "Content-Type: application/json" \
          -H "RELAYER_API_KEY: $RELAYER_API_KEY" \
          -H "RELAYER_API_KEY_ADDRESS: $RELAYER_API_KEY_ADDRESS" \
          --data '{
            "type": "WALLET",
            "from": "<signer_address>",
            "to": "0x00000000000Fb5C9ADea0298D729A0CB3823Cc07",
            "nonce": "<wallet_nonce>",
            "signature": "<wallet_batch_signature>",
            "metadata": "Merge positions",
            "depositWalletParams": {
              "depositWallet": "<deposit_wallet_address>",
              "deadline": "<unix_seconds>",
              "calls": [
                {
                  "target": "<collateral_adapter_address>",
                  "value": "0",
                  "data": "<encoded_merge_positions_calldata>"
                }
              ]
            }
          }'
        ```

        See [Execute Gasless
        Transactions](/trading/wallets-auth#execute-gasless-transactions) for nonce
        creation, wallet-batch signing, and confirmation. Wait for
        `STATE_CONFIRMED` before using the updated balances.
      </Step>
    </Steps>
  </Tab>

  <Tab title="Solidity">
    Merging outcome tokens through a collateral adapter follows this flow:

    * Approve the collateral adapter to transfer the caller's outcome tokens.
    * Call the adapter with the market's condition ID and the amount to merge.
    * The adapter burns equal YES and NO balances and returns pUSD atomically.

    <Steps>
      <Step title="Approve Outcome Tokens">
        First, call `setApprovalForAll()` on the Conditional Tokens contract.
        Approve `CtfCollateralAdapter` for a standard market or
        `NegRiskCtfCollateralAdapter` for a negative-risk market:

        ```solidity theme={null}
        function setApprovalForAll(address operator, bool approved) external;
        ```

        | Argument   | Value                                      |
        | ---------- | ------------------------------------------ |
        | `operator` | The collateral adapter for the market type |
        | `approved` | `true`                                     |
      </Step>

      <Step title="Merge the Positions">
        Then, call `mergePositions()` on the same contract you approved:
        `CtfCollateralAdapter` for standard markets or
        `NegRiskCtfCollateralAdapter` for negative-risk markets:

        ```solidity theme={null}
        function mergePositions(
            address collateralToken,
            bytes32 parentCollectionId,
            bytes32 conditionId,
            uint256[] partition,
            uint256 amount
        );
        ```

        | Argument             | Value                                        |
        | -------------------- | -------------------------------------------- |
        | `collateralToken`    | `0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB` |
        | `parentCollectionId` | 32 zero bytes                                |
        | `conditionId`        | The market's condition ID                    |
        | `partition`          | `[1, 2]`                                     |
        | `amount`             | The amount of each outcome token to merge    |

        `amount` cannot exceed either outcome-token balance. The call returns the
        same amount of pUSD to the caller.
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Redeem Resolved Positions

Redeeming converts outcome tokens into pUSD after a market resolves. Each
winning token returns 1 pUSD, while losing tokens return 0.

```text theme={null}
Market resolves YES:
100 YES tokens → 100 pUSD
100 NO tokens  → 0 pUSD
```

<Note>
  There is no redemption deadline. Winning tokens remain redeemable at any time
  after resolution.
</Note>

Before redeeming, ensure you have:

1. A resolved market.
2. Outcome tokens for the market.
3. Approved the collateral adapter for the market type to transfer the wallet's
   outcome tokens.

<Tabs>
  <Tab title="TypeScript">
    Call `redeemPositions()` on a `SecureClient`. The client uses the condition
    ID to select the correct collateral adapter for the market type.

    ```ts theme={null}
    const transaction = await client.redeemPositions({
      conditionId: market.conditionId,
    });

    const outcome = await transaction.wait();

    // outcome.transactionHash: TxHash
    // outcome.transactionId: TransactionId | null
    ```

    Redemption has no amount parameter: it redeems the wallet's balances for
    both outcomes. `wait()` returns a `TransactionOutcome` after the transaction
    settles.
  </Tab>

  <Tab title="Python">
    Call `redeem_positions()` on an `AsyncSecureClient`. The synchronous
    `SecureClient` provides the same method. Both clients use the condition ID
    to select the correct collateral adapter for the market type.

    ```python theme={null}
    transaction = await client.redeem_positions(
        condition_id=market.condition_id,
    )

    outcome = await transaction.wait()

    # outcome.transaction_hash: TransactionHash
    # outcome.transaction_id: str | None
    ```

    Redemption has no amount parameter: it redeems the wallet's balances for
    both outcomes. `wait()` returns a `TransactionOutcome` after the transaction
    settles.
  </Tab>

  <Tab title="API">
    Build the `redeemPositions` call for a resolved market, then execute it as a
    gasless wallet transaction.

    <Steps>
      <Step title="Build the Redemption Call">
        Use `CtfCollateralAdapter` at
        `0xAdA100Db00Ca00073811820692005400218FcE1f` when `negRisk` is `false`, or
        `NegRiskCtfCollateralAdapter` at
        `0xadA2005600Dec949baf300f4C6120000bDB6eAab` when it is `true`.

        ABI-encode this function call:

        ```solidity theme={null}
        function redeemPositions(
            address collateralToken,
            bytes32 parentCollectionId,
            bytes32 conditionId,
            uint256[] indexSets
        );
        ```

        | Argument             | Value                                        |
        | -------------------- | -------------------------------------------- |
        | `collateralToken`    | `0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB` |
        | `parentCollectionId` | 32 zero bytes                                |
        | `conditionId`        | `<market_condition_id>`                      |
        | `indexSets`          | `[1, 2]`                                     |

        Place the encoded calldata in the wallet call:

        ```json theme={null}
        {
          "target": "<collateral_adapter_address>",
          "value": "0",
          "data": "<encoded_redeem_positions_calldata>"
        }
        ```
      </Step>

      <Step title="Execute the Redemption">
        For a Deposit Wallet, include the redemption call in the signed wallet batch
        and submit it with the Relayer API key:

        ```bash theme={null}
        curl -X POST "https://relayer-v2.polymarket.com/submit" \
          -H "Content-Type: application/json" \
          -H "RELAYER_API_KEY: $RELAYER_API_KEY" \
          -H "RELAYER_API_KEY_ADDRESS: $RELAYER_API_KEY_ADDRESS" \
          --data '{
            "type": "WALLET",
            "from": "<signer_address>",
            "to": "0x00000000000Fb5C9ADea0298D729A0CB3823Cc07",
            "nonce": "<wallet_nonce>",
            "signature": "<wallet_batch_signature>",
            "metadata": "Redeem positions",
            "depositWalletParams": {
              "depositWallet": "<deposit_wallet_address>",
              "deadline": "<unix_seconds>",
              "calls": [
                {
                  "target": "<collateral_adapter_address>",
                  "value": "0",
                  "data": "<encoded_redeem_positions_calldata>"
                }
              ]
            }
          }'
        ```

        See [Execute Gasless
        Transactions](/trading/wallets-auth#execute-gasless-transactions) for nonce
        creation, wallet-batch signing, and confirmation. Wait for
        `STATE_CONFIRMED` before using the payout.
      </Step>
    </Steps>
  </Tab>

  <Tab title="Solidity">
    Redeeming outcome tokens through a collateral adapter follows this flow:

    * Approve the collateral adapter to transfer the caller's outcome tokens.
    * After resolution, call the adapter with the market's condition ID.
    * The adapter burns both outcome balances and returns the winning payout in
      pUSD atomically.

    <Steps>
      <Step title="Approve Outcome Tokens">
        First, call `setApprovalForAll()` on the Conditional Tokens contract.
        Approve `CtfCollateralAdapter` for a standard market or
        `NegRiskCtfCollateralAdapter` for a negative-risk market:

        ```solidity theme={null}
        function setApprovalForAll(address operator, bool approved) external;
        ```

        | Argument   | Value                                      |
        | ---------- | ------------------------------------------ |
        | `operator` | The collateral adapter for the market type |
        | `approved` | `true`                                     |
      </Step>

      <Step title="Redeem the Positions">
        Then, call `redeemPositions()` on the same contract you approved:
        `CtfCollateralAdapter` for standard markets or
        `NegRiskCtfCollateralAdapter` for negative-risk markets:

        ```solidity theme={null}
        function redeemPositions(
            address collateralToken,
            bytes32 parentCollectionId,
            bytes32 conditionId,
            uint256[] indexSets
        );
        ```

        | Argument             | Value                                        |
        | -------------------- | -------------------------------------------- |
        | `collateralToken`    | `0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB` |
        | `parentCollectionId` | 32 zero bytes                                |
        | `conditionId`        | The market's condition ID                    |
        | `indexSets`          | `[1, 2]`                                     |

        The call redeems the caller's full balances for both index sets and returns
        only the winning payout.
      </Step>
    </Steps>
  </Tab>
</Tabs>
