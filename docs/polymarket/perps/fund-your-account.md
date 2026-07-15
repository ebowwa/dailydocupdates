> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fund Your Account

> Deposit and withdraw pUSD collateral for Perps trading

Fund the Perps account with pUSD before placing orders. Deposits move pUSD from
the user's Polymarket wallet into the Perps account. Withdrawals move available
pUSD back to the authenticated wallet.

## Deposit Collateral

Deposit pUSD when the account needs collateral for opening or maintaining Perps
positions.

<Tabs>
  <Tab title="TypeScript">
    <Steps>
      <Step title="Create a Secure Client">
        Create a `SecureClient` for the wallet that will fund the Perps account. If you
        already have a Polymarket wallet, pass it as `wallet` and include a Relayer API
        key so the SDK can submit gasless transactions. If you are creating a wallet
        programmatically, use a Builder API key so the SDK can create the Deposit Wallet
        for that signer.

        <CodeGroup>
          ```ts Existing Account theme={null}
          import { createSecureClient, relayerApiKey } from "@polymarket/client";
          import { privateKey } from "@polymarket/client/viem";

          const client = await createSecureClient({
            wallet: process.env.POLYMARKET_WALLET_ADDRESS!,
            signer: privateKey(process.env.PRIVATE_KEY!),
            apiKey: relayerApiKey({
              key: process.env.RELAYER_API_KEY!,
              address: process.env.RELAYER_API_KEY_ADDRESS!,
            }),
          });
          ```

          ```ts New Programmatic Wallet theme={null}
          import { createSecureClient } from "@polymarket/client";
          import { builderApiKey } from "@polymarket/client/node";
          import { privateKey } from "@polymarket/client/viem";

          const client = await createSecureClient({
            signer: privateKey(process.env.PRIVATE_KEY!),
            apiKey: builderApiKey({
              key: process.env.BUILDER_API_KEY!,
              secret: process.env.BUILDER_SECRET!,
              passphrase: process.env.BUILDER_PASSPHRASE!,
            }),
          });
          ```
        </CodeGroup>
      </Step>

      <Step title="Set Up Deposit Approvals">
        Set up the approvals required for Perps collateral deposits. The SDK skips work
        that is already complete.

        ```ts theme={null}
        await client.setupTradingApprovals();
        ```
      </Step>

      <Step title="Deposit Collateral">
        Deposit pUSD from the user's Polymarket wallet into the Perps account. Make sure
        the wallet has pUSD before depositing. The minimum Perps deposit is 10 pUSD.
        Amounts use raw pUSD base units, so 10 pUSD is `10_000_000n`.

        ```ts theme={null}
        const deposit = await client.depositToPerps({
          amount: 10_000_000n,
        });

        const receipt = await deposit.wait();
        // receipt.transactionHash: TxHash
        ```

        `deposit.wait()` confirms that the chain transaction settled. Perps may take a
        moment to credit the account after that.
      </Step>

      <Step title="Verify the Deposit">
        Open a Perps session and read account state after the deposit settles.

        ```ts theme={null}
        const session = await client.openPerpsSession();

        try {
          const portfolio = await session.fetchPortfolio();
          const deposits = await session.listDeposits().firstPage();
        } finally {
          await session.close();
        }
        ```

        Use `portfolio.withdrawable` to check available collateral and `deposits.items`
        to reconcile deposit history.
      </Step>
    </Steps>
  </Tab>

  <Tab title="Python">
    <Steps>
      <Step title="Create a Secure Client">
        Create an `AsyncSecureClient` for the wallet that will fund the Perps account.
        If you already have a Polymarket wallet, pass it as `wallet` and include a
        Relayer API key so the SDK can submit gasless transactions. If you are creating a
        wallet programmatically, use a Builder API key so the SDK can create the Deposit
        Wallet for that signer.

        <CodeGroup>
          ```python Existing Account theme={null}
          import os

          from polymarket import AsyncSecureClient, RelayerApiKey

          client = await AsyncSecureClient.create(
              private_key=os.environ["PRIVATE_KEY"],
              wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
              api_key=RelayerApiKey(
                  key=os.environ["RELAYER_API_KEY"],
                  address=os.environ["RELAYER_API_KEY_ADDRESS"],
              ),
          )
          ```

          ```python New Programmatic Wallet theme={null}
          import os

          from polymarket import AsyncSecureClient, BuilderApiKey

          client = await AsyncSecureClient.create(
              private_key=os.environ["PRIVATE_KEY"],
              api_key=BuilderApiKey(
                  key=os.environ["BUILDER_API_KEY"],
                  secret=os.environ["BUILDER_SECRET"],
                  passphrase=os.environ["BUILDER_PASSPHRASE"],
              ),
          )
          ```
        </CodeGroup>
      </Step>

      <Step title="Set Up Deposit Approvals">
        Set up the approvals required for Perps collateral deposits. The SDK skips work
        that is already complete.

        ```python theme={null}
        await client.setup_trading_approvals()
        ```
      </Step>

      <Step title="Deposit Collateral">
        Deposit pUSD from the user's Polymarket wallet into the Perps account. Make sure
        the wallet has pUSD before depositing. The minimum Perps deposit is 10 pUSD.
        Amounts use raw pUSD base units, so 10 pUSD is `10_000_000`.

        ```python theme={null}
        deposit = await client.deposit_to_perps(amount=10_000_000)

        receipt = await deposit.wait()
        # receipt.transaction_hash: TransactionHash
        ```

        `deposit.wait()` confirms that the chain transaction settled. Perps may take a
        moment to credit the account after that.
      </Step>

      <Step title="Verify the Deposit">
        Open a Perps session and read account state after the deposit settles.

        ```python theme={null}
        session = await client.open_perps_session()

        try:
            portfolio = await session.fetch_portfolio()
            deposits = await session.list_deposits().first_page()
        finally:
            await session.close()
        ```

        Use `portfolio.withdrawable` to check available collateral and `deposits.items`
        to reconcile deposit history.
      </Step>
    </Steps>
  </Tab>

  <Tab title="API">
    <Steps>
      <Step title="Check Deposit Approval">
        Before depositing, the Polymarket wallet must approve the Perps deposit contract
        to spend pUSD. If the approval is already in place, skip the approval call.

        ```solidity Approval Call theme={null}
        pUSD.approve(PerpsDepositContract, maxUint256)
        ```

        Use these contract addresses when building the approval call.

        | Contract               | Address                                      |
        | ---------------------- | -------------------------------------------- |
        | pUSD collateral token  | `0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB` |
        | Perps deposit contract | `0xDCa4af75705dbB50f62437045afF9921947917d2` |

        <Note>
          The following steps show the Deposit Wallet batch path. If you are trading
          with a Safe or Poly Proxy wallet, use an SDK that handles the wallet-specific
          transaction flow for you.
        </Note>
      </Step>

      <Step title="Build the Deposit Call">
        Create the Perps deposit call. Deposit amounts use pUSD base units, so 10 pUSD
        is `10000000`.

        ```solidity theme={null}
        function deposit(address token, uint256 amount, address to);
        ```

        Encode the deposit calldata with these arguments.

        | Argument | Value                                        |
        | -------- | -------------------------------------------- |
        | `token`  | `0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB` |
        | `amount` | `10000000`                                   |
        | `to`     | Signer address for the Polymarket account.   |

        Build the final ordered call list. Include the approval call first only when
        approval is needed.

        <CodeGroup>
          ```json Without Approval theme={null}
          [
            {
              "target": "0xDCa4af75705dbB50f62437045afF9921947917d2",
              "value": "0",
              "data": "<deposit_calldata>"
            }
          ]
          ```

          ```json With Approval theme={null}
          [
            {
              "target": "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB",
              "value": "0",
              "data": "<approve_calldata>"
            },
            {
              "target": "0xDCa4af75705dbB50f62437045afF9921947917d2",
              "value": "0",
              "data": "<deposit_calldata>"
            }
          ]
          ```
        </CodeGroup>
      </Step>

      <Step title="Fetch a Relayer Nonce">
        Fetch a fresh `WALLET` nonce before submitting the Deposit Wallet batch.

        ```bash theme={null}
        curl -G "https://relayer-v2.polymarket.com/v1/account/transactions/params" \
          -H "RELAYER_API_KEY: $RELAYER_API_KEY" \
          -H "RELAYER_API_KEY_ADDRESS: $RELAYER_API_KEY_ADDRESS" \
          --data-urlencode "address=<polymarket_account_signer_address>" \
          --data-urlencode "type=WALLET"
        ```

        The response includes the nonce to sign with the batch.

        ```json theme={null}
        {
          "address": "<polymarket_account_signer_address>",
          "nonce": "<wallet_nonce>"
        }
        ```
      </Step>

      <Step title="Build the Deposit Wallet Batch">
        Build the EIP-712 `Batch` typed data for the Deposit Wallet. Use the final
        ordered call list from the previous step, and omit the approval call when
        allowance is already sufficient. Set `deadline` to a Unix timestamp in seconds
        after which the relayer should reject the batch.

        ```json theme={null}
        {
          "domain": {
            "name": "DepositWallet",
            "version": "1",
            "chainId": 137,
            "verifyingContract": "<polymarket_wallet_address>"
          },
          "primaryType": "Batch",
          "types": {
            "Call": [
              { "name": "target", "type": "address" },
              { "name": "value", "type": "uint256" },
              { "name": "data", "type": "bytes" }
            ],
            "Batch": [
              { "name": "wallet", "type": "address" },
              { "name": "nonce", "type": "uint256" },
              { "name": "deadline", "type": "uint256" },
              { "name": "calls", "type": "Call[]" }
            ]
          },
          "message": {
            "wallet": "<polymarket_wallet_address>",
            "nonce": "<wallet_nonce>",
            "deadline": "<unix_seconds>",
            "calls": [
              {
                "target": "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB",
                "value": "0",
                "data": "<approve_calldata>"
              },
              {
                "target": "0xDCa4af75705dbB50f62437045afF9921947917d2",
                "value": "0",
                "data": "<deposit_calldata>"
              }
            ]
          }
        }
        ```

        Sign this typed data with the signer for the Polymarket account.
      </Step>

      <Step title="Submit the Deposit Transaction">
        Submit the signed batch to the Relayer API. Use the same ordered call list you
        signed in the previous step.

        ```bash theme={null}
        curl -X POST "https://relayer-v2.polymarket.com/submit" \
          -H "Content-Type: application/json" \
          -H "RELAYER_API_KEY: $RELAYER_API_KEY" \
          -H "RELAYER_API_KEY_ADDRESS: $RELAYER_API_KEY_ADDRESS" \
          -d '{
            "type": "WALLET",
            "from": "<polymarket_account_signer_address>",
            "to": "0x00000000000Fb5C9ADea0298D729A0CB3823Cc07",
            "nonce": "<wallet_nonce>",
            "signature": "<wallet_batch_signature>",
            "metadata": "Deposit pUSD to Perps",
            "depositWalletParams": {
              "depositWallet": "<polymarket_wallet_address>",
              "deadline": "<unix_seconds>",
              "calls": [
                {
                  "target": "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB",
                  "value": "0",
                  "data": "<approve_calldata>"
                },
                {
                  "target": "0xDCa4af75705dbB50f62437045afF9921947917d2",
                  "value": "0",
                  "data": "<deposit_calldata>"
                }
              ]
            }
          }'
        ```

        The response includes the relayer transaction ID.

        ```json theme={null}
        {
          "transactionID": "<transaction_id>",
          "state": "STATE_NEW"
        }
        ```
      </Step>

      <Step title="Poll the Deposit Transaction">
        Poll the relayer transaction until it reaches `STATE_CONFIRMED` before relying
        on the deposited collateral.

        ```bash theme={null}
        curl "https://relayer-v2.polymarket.com/v1/account/transactions/<transaction_id>" \
          -H "RELAYER_API_KEY: $RELAYER_API_KEY" \
          -H "RELAYER_API_KEY_ADDRESS: $RELAYER_API_KEY_ADDRESS"
        ```

        ```json theme={null}
        {
          "transaction_id": "<transaction_id>",
          "transaction_hash": "<transaction_hash>",
          "state": "STATE_CONFIRMED",
          "error_msg": null
        }
        ```

        Perps may take a moment to credit the account after the onchain transaction
        settles. Treat `STATE_FAILED` and `STATE_INVALID` as terminal failures.
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Withdraw Collateral

Withdraw pUSD when the account has available collateral that should return to the
authenticated wallet.

<Tabs>
  <Tab title="TypeScript">
    Request a withdrawal to the authenticated wallet.
    Amounts use raw pUSD base units, so 10 pUSD is `10_000_000n`.

    ```ts theme={null}
    const withdrawalId = await client.withdrawFromPerps({
      amount: 10_000_000n,
    });
    ```

    The SDK signs the withdrawal request with the Polymarket account signer and
    returns the Perps withdrawal ID.

    To track the withdrawal, open a Perps session and list withdrawals.

    ```ts theme={null}
    const session = await client.openPerpsSession();

    try {
      const withdrawals = await session.listWithdrawals().firstPage();
    } finally {
      await session.close();
    }
    ```

    For more details on authenticated sessions, see [Authenticated
    Sessions](/perps/authenticated-sessions).
  </Tab>

  <Tab title="Python">
    Request a withdrawal to the authenticated wallet. Amounts use raw pUSD base
    units, so 10 pUSD is `10_000_000`.

    ```python theme={null}
    withdrawal_id = await client.withdraw_from_perps(amount=10_000_000)
    ```

    The SDK signs the withdrawal request with the Polymarket account signer and
    returns the Perps withdrawal ID.

    To track the withdrawal, open a Perps session and list withdrawals.

    ```python theme={null}
    session = await client.open_perps_session()

    try:
        withdrawals = await session.list_withdrawals().first_page()
    finally:
        await session.close()
    ```

    For more details on authenticated sessions, see [Authenticated
    Sessions](/perps/authenticated-sessions).
  </Tab>

  <Tab title="API">
    <Steps>
      <Step title="Build the Withdrawal Operation">
        Create a `withdraw` operation with the account signer, pUSD token, raw token
        amount, and destination wallet. For withdrawals, `amount` is the raw pUSD token
        amount, so 10 pUSD is `10000000`.

        ```json theme={null}
        {
          "type": "withdraw",
          "args": {
            "account": "<polymarket_account_signer_address>",
            "token": "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB",
            "amount": "10000000",
            "to": "<polymarket_wallet_address>"
          }
        }
        ```

        | Field     | Value                                      |
        | --------- | ------------------------------------------ |
        | `account` | Signer address for the Polymarket account. |
        | `token`   | pUSD collateral token address.             |
        | `amount`  | Raw pUSD token amount.                     |
        | `to`      | Wallet that receives the withdrawal.       |
      </Step>

      <Step title="Create Withdrawal Typed Data">
        The withdrawal signature uses EIP-712 typed data with `Withdraw` as the primary
        type. Use the same `account`, `token`, `amount`, and `to` values from the
        withdrawal operation.

        For withdrawals, `ts` is a Unix timestamp in seconds because the onchain contract
        validates it against `block.timestamp`. It must match the `ts` value in the
        request body.

        ```json theme={null}
        {
          "domain": {
            "name": "Polymarket",
            "version": "1",
            "chainId": 137,
            "verifyingContract": "0xDCa4af75705dbB50f62437045afF9921947917d2"
          },
          "primaryType": "Withdraw",
          "types": {
            "Withdraw": [
              { "name": "account", "type": "address" },
              { "name": "token", "type": "address" },
              { "name": "amount", "type": "uint256" },
              { "name": "fee", "type": "uint256" },
              { "name": "to", "type": "address" },
              { "name": "salt", "type": "uint64" },
              { "name": "ts", "type": "uint64" }
            ]
          },
          "message": {
            "account": "<polymarket_account_signer_address>",
            "token": "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB",
            "amount": "10000000",
            "fee": "0",
            "to": "<polymarket_wallet_address>",
            "salt": 555555555,
            "ts": 1767000014
          }
        }
        ```

        | Field  | Value                                                |
        | ------ | ---------------------------------------------------- |
        | `salt` | Random integer generated for this signed request.    |
        | `ts`   | Current Unix timestamp in seconds, not milliseconds. |
      </Step>

      <Step title="Sign Withdrawal Typed Data">
        Sign the typed data with the Polymarket account signer. The example below uses
        Viem.

        ```ts Viem theme={null}
        import { privateKeyToAccount } from "viem/accounts";

        const account = privateKeyToAccount("<polymarket_account_signer_private_key>");

        const signature = await account.signTypedData({
          domain: {
            name: "Polymarket",
            version: "1",
            chainId: 137,
            verifyingContract: "0xDCa4af75705dbB50f62437045afF9921947917d2",
          },
          primaryType: "Withdraw",
          types: {
            Withdraw: [
              { name: "account", type: "address" },
              { name: "token", type: "address" },
              { name: "amount", type: "uint256" },
              { name: "fee", type: "uint256" },
              { name: "to", type: "address" },
              { name: "salt", type: "uint64" },
              { name: "ts", type: "uint64" },
            ],
          },
          message: {
            account: "<polymarket_account_signer_address>",
            token: "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB",
            amount: 10000000n,
            fee: 0n,
            to: "<polymarket_wallet_address>",
            salt: 555555555n,
            ts: 1767000014n,
          },
        });
        ```
      </Step>

      <Step title="Submit the Withdrawal">
        Submit the signed withdrawal request to `POST /v1/account/withdraw`. Use the
        same operation values, `salt`, and `ts` from the typed data.

        ```bash theme={null}
        curl -X POST "https://api.perpetuals.polymarket.com/v1/account/withdraw" \
          -H "content-type: application/json" \
          -d '{
            "op": {
              "type": "withdraw",
              "args": {
                "account": "<polymarket_account_signer_address>",
                "token": "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB",
                "amount": "10000000",
                "to": "<polymarket_wallet_address>"
              }
            },
            "sig": "<signature>",
            "salt": 555555555,
            "ts": 1767000014
          }'
        ```

        The response indicates whether the withdrawal was accepted.

        <CodeGroup>
          ```json Success theme={null}
          {
            "status": "ok",
            "withdraw_id": 1234567890
          }
          ```

          ```json Failure theme={null}
          {
            "status": "err",
            "withdraw_id": 1234567890,
            "error": "insufficient_balance"
          }
          ```
        </CodeGroup>
      </Step>

      <Step title="Track the Withdrawal">
        Use the returned `withdraw_id` to match the withdrawal against history results.

        ```bash theme={null}
        curl -G "https://api.perpetuals.polymarket.com/v1/account/withdrawals" \
          -H "polymarket-proxy: <proxy_address>" \
          -H "polymarket-secret: <proxy_secret>" \
          --data-urlencode "withdrawal_status=pending"
        ```

        For more details on proxy credentials and private account-read headers, see
        [Authenticated Sessions](/perps/authenticated-sessions).
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Review Funding History

Use deposit and withdrawal history to reconcile collateral movements after your
integration submits funding requests.

See [Authenticated Sessions](/perps/authenticated-sessions) for how to create an
authenticated session for private account history reads.

<Tabs>
  <Tab title="TypeScript">
    List deposit or withdrawal history from an authenticated Perps session.

    <CodeGroup>
      ```ts Deposits theme={null}
      import type { PerpsDeposit } from "@polymarket/client";

      const session = await client.openPerpsSession();

      try {
        const deposits: PerpsDeposit[] = [];

        for await (const page of session.listDeposits()) {
          deposits.push(...page.items);
        }
      } finally {
        await session.close();
      }
      ```

      ```ts Withdrawals theme={null}
      import type { PerpsWithdrawal } from "@polymarket/client";

      const session = await client.openPerpsSession();

      try {
        const withdrawals: PerpsWithdrawal[] = [];

        for await (const page of session.listWithdrawals()) {
          withdrawals.push(...page.items);
        }
      } finally {
        await session.close();
      }
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Python">
    List deposit or withdrawal history from an authenticated Perps session.

    <CodeGroup>
      ```python Deposits theme={null}
      session = await client.open_perps_session()

      try:
          deposits = []

          async for page in session.list_deposits():
              deposits.extend(page.items)
      finally:
          await session.close()
      ```

      ```python Withdrawals theme={null}
      session = await client.open_perps_session()

      try:
          withdrawals = []

          async for page in session.list_withdrawals():
              withdrawals.extend(page.items)
      finally:
          await session.close()
      ```
    </CodeGroup>
  </Tab>

  <Tab title="API">
    List deposit history.

    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/account/deposits" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>"
    ```

    List withdrawal history.

    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/account/withdrawals" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>"
    ```

    Use the optional `deposit_status`, `withdrawal_status`, `start_timestamp`, and
    `end_timestamp` query parameters when reconciling a specific window.
  </Tab>
</Tabs>
