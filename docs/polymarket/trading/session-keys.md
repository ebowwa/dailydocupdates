> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Session Keys

> Authorize a separate signer for scoped, time-limited Deposit Wallet trading.

<Note>
  Session Keys are in beta. We welcome feedback as you integrate them.
</Note>

A Session Key is a separate signer that a Deposit Wallet Owner authorizes to
trade for a Deposit Wallet. It lets an integration perform routine trading
without using the owner's key. A Session Key cannot withdraw funds from the
Deposit Wallet.

<Note>
  Session Keys work only with Deposit Wallets. A dedicated migration flow from
  Safe Wallets and Proxy Wallets is planned.
</Note>

A Session Key can be scoped to trade on specific supported venues or all venues:

* **CLOB:** [Place prediction market orders](/trading/place-orders) on the
  central limit order book.
* **Combos:** [Trade Combos through RFQs](/trading/combos/overview).
* **All:** A shortcut that grants access to CLOB, Combos, and any future
  supported venues.

## Authorize a Session Key

The Deposit Wallet Owner authorizes a session signer address with an expiration
of 180 days and scoped permissions.

<Warning>
  Session Keys are Externally Owned Accounts (EOAs). Keep their private keys
  secret to prevent unauthorized trading on behalf of your Deposit Wallet.
</Warning>

Authorizing a Session Key requires a Builder API key. See [Create New
Accounts](/trading/wallets-auth#create-new-accounts) to generate one.

<Warning>
  During the initial rollout, contact
  [builder@polymarket.com](mailto:builder@polymarket.com) to authorize your
  Builder API key for session-key management. If you are already a member of the
  Builder Program Telegram group, you can also ask there.
</Warning>

<Tabs>
  <Tab title="TypeScript">
    <Steps>
      <Step title="Generate a Session Key">
        First, generate a fresh EVM keypair for the Session Key.

        ```ts theme={null}
        import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

        const sessionKeyPrivateKey = generatePrivateKey();
        const { address: sessionKeyAddress } =
          privateKeyToAccount(sessionKeyPrivateKey);
        ```

        Store **your private key** in a secrets manager or another secure key
        store.
      </Step>

      <Step title="Create the Deposit Wallet Owner Client">
        Then, create a `SecureClient` with the Deposit Wallet Owner's private key
        and Builder API credentials.

        ```ts theme={null}
        import { createSecureClient } from "@polymarket/client";
        import { builderApiKey } from "@polymarket/client/node";
        import { privateKey } from "@polymarket/client/viem";

        const secureClient = await createSecureClient({
          signer: privateKey(process.env.POLYMARKET_PRIVATE_KEY),
          wallet: process.env.POLYMARKET_DEPOSIT_WALLET!,
          apiKey: builderApiKey({
            key: process.env.POLYMARKET_BUILDER_API_KEY!,
            secret: process.env.POLYMARKET_BUILDER_SECRET!,
            passphrase: process.env.POLYMARKET_BUILDER_PASSPHRASE!,
          }),
        });
        ```
      </Step>

      <Step title="Authorize the Session Key">
        Finally, call `authorizeSessionKey()` to authorize your Session Key.

        ```ts theme={null}
        const authorization = await secureClient.authorizeSessionKey({
          address: sessionKeyAddress,
        });

        // authorization: AuthorizeSessionKeyResult
        ```

        You can also authorize only the desired trading venues with the `scopes`
        parameter:

        ```ts theme={null}
        import { SessionKeyKnownScope } from "@polymarket/client";

        const scopedAuthorization = await secureClient.authorizeSessionKey({
          address: sessionKeyAddress,
          scopes: [SessionKeyKnownScope.CLOB, SessionKeyKnownScope.COMBOSRFQ],
        });

        // scopedAuthorization: AuthorizeSessionKeyResult
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="Python">
    <Steps>
      <Step title="Generate a Session Key">
        First, generate a fresh EVM keypair for the Session Key.

        ```python theme={null}
        from eth_account import Account

        session_key = Account.create()
        session_key_private_key = "0x" + session_key.key.hex().removeprefix("0x")
        session_key_address = session_key.address
        ```

        Store **your private key** in a secrets manager or another secure key
        store.
      </Step>

      <Step title="Create the Deposit Wallet Owner Client">
        Then, create an `AsyncSecureClient` with the Deposit Wallet Owner's
        private key and Builder API credentials.

        ```python theme={null}
        import os

        from polymarket import AsyncSecureClient, BuilderApiKey

        secure_client = await AsyncSecureClient.create(
            private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
            wallet=os.environ["POLYMARKET_DEPOSIT_WALLET"],
            api_key=BuilderApiKey(
                key=os.environ["POLYMARKET_BUILDER_API_KEY"],
                secret=os.environ["POLYMARKET_BUILDER_SECRET"],
                passphrase=os.environ["POLYMARKET_BUILDER_PASSPHRASE"],
            ),
        )
        ```
      </Step>

      <Step title="Authorize the Session Key">
        Finally, call `authorize_session_key()` to authorize your Session Key.

        ```python theme={null}
        authorization = await secure_client.authorize_session_key(
            address=session_key_address,
        )

        # authorization: AuthorizeSessionKeyResult
        ```

        You can also authorize only the desired trading venues with the `scopes`
        parameter:

        ```python theme={null}
        from polymarket import SessionKeyKnownScope

        scoped_authorization = await secure_client.authorize_session_key(
            address=session_key_address,
            scopes=(
                SessionKeyKnownScope.CLOB,
                SessionKeyKnownScope.COMBOSRFQ,
            ),
        )

        # scoped_authorization: AuthorizeSessionKeyResult
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="API">
    Authorize the session signer through the Relayer, then confirm that it is
    available for trading.

    <Steps>
      <Step title="Generate a Session Key">
        First, generate a fresh EVM keypair for the Session Key:

        <CodeGroup>
          ```bash Foundry theme={null}
          $ cast wallet new
          Successfully created new keypair.
          Address: <session_signer_address>
          Private key: <session_signer_private_key>
          ```

          ```ts Viem theme={null}
          import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

          const sessionSignerPrivateKey = generatePrivateKey();
          const { address: sessionSignerAddress } = privateKeyToAccount(
            sessionSignerPrivateKey,
          );
          ```
        </CodeGroup>

        Store the `<session_signer_private_key>` in a secrets manager or another
        secure key store.
      </Step>

      <Step title="Fetch the Wallet Nonce">
        Then, fetch the Deposit Wallet's `WALLET` nonce by passing the Deposit
        Wallet Owner address.

        ```bash theme={null}
        curl -G "https://relayer-v2.polymarket.com/v1/account/transactions/params" \
          --data-urlencode "address=<deposit_wallet_owner_address>" \
          --data-urlencode "type=WALLET"
        ```

        The response includes the Deposit Wallet nonce:

        ```json Response theme={null}
        {
          "address": "<relayer_address>",
          "nonce": "<wallet_nonce>"
        }
        ```
      </Step>

      <Step title="Define the Session Key Authorization">
        Then, encode the `authorizeSessionSigner` call that the Deposit Wallet
        will execute:

        ```solidity theme={null}
        function authorizeSessionSigner(address sessionSigner, uint256 validUntil)
        ```

        `validUntil` is required. Always set it to the current whole Unix
        timestamp in seconds plus 180 days. Other values are rejected. The
        following Viem example computes this value:

        ```ts Example theme={null}
        import { encodeFunctionData, parseAbi } from "viem"

        const sessionSignerAddress = "<session_signer_address>" as `0x${string}`
        const sessionExpiryUnixSeconds = BigInt(
          Math.floor(Date.now() / 1_000) + 4_315 * 60 * 60,
        )

        const calldata = encodeFunctionData({
          abi: parseAbi([
            "function authorizeSessionSigner(address sessionSigner, uint256 validUntil)",
          ]),
          functionName: "authorizeSessionSigner",
          args: [sessionSignerAddress, sessionExpiryUnixSeconds],
        })
        ```
      </Step>

      <Step title="Prepare the Owner Authorization">
        Then, prepare the EIP-712 typed data for the Deposit Wallet Owner to
        approve:

        ```json walletBatchTypedData theme={null}
        {
          "domain": {
            "name": "DepositWallet",
            "version": "1",
            "chainId": 137,
            "verifyingContract": "<deposit_wallet_address>"
          },
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
          "primaryType": "Batch",
          "message": {
            "wallet": "<deposit_wallet_address>",
            "nonce": "<wallet_nonce>",
            "deadline": "<batch_deadline_unix_seconds>",
            "calls": [
              {
                "target": "<deposit_wallet_address>",
                "value": "0",
                "data": "<calldata>"
              }
            ]
          }
        }
        ```

        Where:

        * `<deposit_wallet_address>` is the Deposit Wallet address.
        * `<wallet_nonce>` is the nonce returned when fetching the Deposit
          Wallet nonce.
        * `<batch_deadline_unix_seconds>` is a future whole Unix timestamp in
          seconds after which the signed authorization request can no longer be
          executed. The Relayer requires at least 10 seconds of remaining
          validity.
        * `<calldata>` is the encoded authorization call from the previous step.
      </Step>

      <Step title="Sign as the Deposit Wallet Owner">
        Then, prove that the Deposit Wallet Owner approves the authorization by
        signing the typed data. The following example uses Viem:

        ```ts TypeScript with Viem theme={null}
        import { privateKeyToAccount } from "viem/accounts"

        const depositWalletOwner = privateKeyToAccount(
          process.env.DEPOSIT_WALLET_OWNER_PRIVATE_KEY as `0x${string}`,
        )

        const signature = await depositWalletOwner.signTypedData(walletBatchTypedData)
        ```
      </Step>

      <Step title="Build the Authorization Body">
        Then, build the request body that authorizes the session signer:

        ```json theme={null}
        {
          "walletAddress": "<deposit_wallet_address>",
          "sessionSignerAddress": "<session_signer_address>",
          "scopes": ["CLOB", "COMBOSRFQ"],
          "validUntil": "<session_expiry_unix_seconds>",
          "nonce": "<wallet_nonce>",
          "deadline": "<batch_deadline_unix_seconds>",
          "signature": "<signature>"
        }
        ```

        Where:

        * `<deposit_wallet_address>` is the Deposit Wallet address.
        * `<session_signer_address>` and `<session_expiry_unix_seconds>` are the
          signer and expiration encoded in `<calldata>`.
        * `scopes` contains one or more venue literals (`"CLOB"` or
          `"COMBOSRFQ"`), or `["ALL"]` by itself.
        * `<wallet_nonce>` and `<batch_deadline_unix_seconds>` match the values
          in the signed typed data.
        * `<signature>` is the value returned in the previous step.
      </Step>

      <Step title="Create the Builder Signature">
        Then, authorize the request with the Builder keys:

        ```text theme={null}
        authorization_body = <exact_serialized_authorization_body>
        request_timestamp = <unix_seconds>
        method = "POST"
        request_path = "/v1/session-signers/authorizations"

        message = request_timestamp + method + request_path + authorization_body
        builder_signature = urlsafeBase64WithPadding(
          HMAC-SHA256(base64Decode(<builder_api_secret>), message)
        )
        ```
      </Step>

      <Step title="Submit the Authorization">
        Then, submit the authorization request to the Relayer:

        ```bash theme={null}
        curl -X POST "https://relayer-v2.polymarket.com/v1/session-signers/authorizations" \
          -H "Content-Type: application/json" \
          -H "POLY_BUILDER_API_KEY: <builder_api_key>" \
          -H "POLY_BUILDER_TIMESTAMP: <request_timestamp>" \
          -H "POLY_BUILDER_PASSPHRASE: <builder_api_passphrase>" \
          -H "POLY_BUILDER_SIGNATURE: <builder_signature>" \
          -H "Idempotency-Key: <idempotency_key>" \
          -d '{
            "walletAddress": "<deposit_wallet_address>",
            "sessionSignerAddress": "<session_signer_address>",
            "scopes": ["CLOB", "COMBOSRFQ"],
            "validUntil": "<session_expiry_unix_seconds>",
            "nonce": "<wallet_nonce>",
            "deadline": "<batch_deadline_unix_seconds>",
            "signature": "<signature>"
          }'
        ```

        Where:

        * `<idempotency_key>` uniquely identifies this authorization request.
          Reuse it when retrying the same request.
        * `<request_timestamp>` is the Unix timestamp in seconds used to create
          the Builder signature.
        * `<builder_api_key>` is your Builder API key.
        * `<builder_api_passphrase>` is the passphrase for your Builder API key.
        * `<builder_signature>` is the signature created in the previous step.

        The response includes the Relayer transaction ID used to confirm the
        authorization:

        ```json Response theme={null}
        {
          "operationId": "<operation_id>",
          "status": "SUBMITTED",
          "transactionHash": "<transaction_hash>",
          "transactionId": "<transaction_id>"
        }
        ```
      </Step>

      <Step title="Confirm the Relayer Transaction">
        Then, poll the transaction endpoint using the returned
        `<transaction_id>`:

        ```bash theme={null}
        curl "https://relayer-v2.polymarket.com/v1/account/transactions/<transaction_id>"
        ```

        Continue until `state` is `STATE_CONFIRMED`. Treat `STATE_FAILED` and
        `STATE_INVALID` as terminal failures.

        ```json Response theme={null}
        {
          "transaction_id": "<transaction_id>",
          "transaction_hash": "<transaction_hash>",
          "state": "STATE_CONFIRMED",
          "error_msg": null
        }
        ```
      </Step>

      <Step title="Poll for the Session Key">
        Finally, poll the Session Keys endpoint until it returns the Session
        Key with the expected scopes and expiration:

        ```bash theme={null}
        curl "https://clob.polymarket.com/v1/user/session-signers" \
          -H "POLY_ADDRESS: <signer_address>" \
          -H "POLY_API_KEY: <clob_api_key>" \
          -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
          -H "POLY_SIGNATURE: <clob_l2_signature>" \
          -H "POLY_TIMESTAMP: <clob_request_timestamp>"
        ```

        Using the Deposit Wallet Owner's CLOB credentials from [API
        Authentication](/getting-started/api#authentication), create a fresh
        timestamp for each request and calculate `<clob_l2_signature>` from the
        exact request path:

        ```text theme={null}
        clob_request_timestamp = <unix_seconds>
        method = "GET"
        request_path = "/v1/user/session-signers"

        message = clob_request_timestamp + method + request_path
        clob_l2_signature = urlsafeBase64WithPadding(
          HMAC-SHA256(base64Decode(<clob_api_secret>), message)
        )
        ```

        Continue until `signers` contains the requested session signer with the
        expected scopes and expiration. The authorization is ready for use
        only after the session signer appears in the response.

        ```json Response theme={null}
        {
          "wallet": "<deposit_wallet_address>",
          "signers": [
            {
              "address": "<session_signer_address>",
              "scopes": ["CLOB", "COMBOSRFQ"],
              "valid_until": 1800000000 // <session_expiry_unix_seconds>
            }
          ]
        }
        ```
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Place an Order

This section shows how to place an order using a Session Key. See [Place
Orders](/trading/place-orders) for the complete order workflow.

<Tabs>
  <Tab title="TypeScript">
    <Steps>
      <Step title="Create the Session Client">
        First, create a `SecureClient` for the Deposit Wallet with the session
        signer.

        ```ts theme={null}
        import { createSecureClient } from "@polymarket/client";
        import { privateKey } from "@polymarket/client/viem";

        const sessionPrivateKey = process.env.POLYMARKET_SESSION_PRIVATE_KEY!;
        const depositWallet = process.env.POLYMARKET_DEPOSIT_WALLET!;

        const sessionClient = await createSecureClient({
          signer: privateKey(sessionPrivateKey),
          wallet: depositWallet,
        });
        ```
      </Step>

      <Step title="Place an Order">
        Then, use the `sessionClient` to submit a limit order.

        ```ts theme={null}
        import { OrderSide } from "@polymarket/client";

        const response = await sessionClient.placeLimitOrder({
          tokenId: yesTokenId,
          side: OrderSide.BUY,
          price: "0.52",
          size: "10",
        });

        // response: OrderResponse
        ```

        The order buys `10` shares at a price of `0.52` USD per share. See
        [Place Orders](/trading/place-orders#place-a-limit-order) for market
        constraints, order types, and response handling.
      </Step>
    </Steps>
  </Tab>

  <Tab title="Python">
    <Steps>
      <Step title="Create the Session Client">
        First, create an `AsyncSecureClient` for the Deposit Wallet with the
        Session Key.

        ```python theme={null}
        from polymarket import AsyncSecureClient

        session_client = await AsyncSecureClient.create(
            private_key=os.environ["POLYMARKET_SESSION_PRIVATE_KEY"],
            wallet=os.environ["POLYMARKET_DEPOSIT_WALLET"],
        )
        ```
      </Step>

      <Step title="Place an Order">
        Then, use the `session_client` to submit a limit order.

        ```python theme={null}
        response = await session_client.place_limit_order(
            token_id=yes_token_id,
            side="BUY",
            price="0.52",
            size="10",
        )

        # response: OrderResponse
        ```

        The order buys `10` shares at a price of `0.52` USD per share. See
        [Place Orders](/trading/place-orders#place-a-limit-order) for market
        constraints, order types, and response handling.
      </Step>
    </Steps>
  </Tab>

  <Tab title="API">
    Authenticate with the CLOB using the Session Key, then place an order. See
    [API Authentication](/getting-started/api#authentication) for the complete
    signing flow.

    <Steps>
      <Step title="Create a CLOB L1 Signature">
        First, create a `<clob_l1_signature>` with the Session Key to prove
        control of the session signer.

        ```json ClobAuth theme={null}
        {
          "domain": {
            "name": "ClobAuthDomain",
            "version": "1",
            "chainId": 137
          },
          "types": {
            "ClobAuth": [
              { "name": "address", "type": "address" },
              { "name": "timestamp", "type": "string" },
              { "name": "nonce", "type": "uint256" },
              { "name": "message", "type": "string" }
            ]
          },
          "primaryType": "ClobAuth",
          "message": {
            "address": "<session_signer_address>",
            "timestamp": "<unix_seconds>",
            "nonce": "<nonce>",
            "message": "This message attests that I control the given wallet"
          }
        }
        ```
      </Step>

      <Step title="Create or Derive CLOB Credentials">
        Then, create CLOB credentials for the session signer. If credentials
        already exist, derive them instead.

        <CodeGroup>
          ```bash Create theme={null}
          curl -X POST "https://clob.polymarket.com/auth/api-key" \
            -H "POLY_ADDRESS: <session_signer_address>" \
            -H "POLY_SIGNATURE: <clob_l1_signature>" \
            -H "POLY_TIMESTAMP: <unix_seconds>" \
            -H "POLY_NONCE: <nonce>"
          ```

          ```bash Derive theme={null}
          curl "https://clob.polymarket.com/auth/derive-api-key" \
            -H "POLY_ADDRESS: <session_signer_address>" \
            -H "POLY_SIGNATURE: <clob_l1_signature>" \
            -H "POLY_TIMESTAMP: <unix_seconds>" \
            -H "POLY_NONCE: <nonce>"
          ```
        </CodeGroup>

        `<nonce>` identifies the credential set. Use `0` unless you manage
        multiple credential sets.

        The response contains the credentials used to authenticate the order
        request:

        ```json theme={null}
        {
          "apiKey": "<clob_api_key>",
          "secret": "<clob_api_secret>",
          "passphrase": "<clob_api_passphrase>"
        }
        ```
      </Step>

      <Step title="Create the Order Typed Data">
        Then, create the order typed data for the Deposit Wallet using these
        values. This example uses a [limit
        order](/trading/place-orders#place-a-limit-order).

        | Field           | Value                      |
        | --------------- | -------------------------- |
        | `maker`         | `<deposit_wallet_address>` |
        | `signer`        | `<deposit_wallet_address>` |
        | `signatureType` | `3`                        |

        <Accordion title="TypedDataSign Example">
          ```json TypedDataSign theme={null}
          {
            "domain": {
              "name": "Polymarket CTF Exchange",
              "version": "2",
              "chainId": 137,
              "verifyingContract": "<exchange_address>"
            },
            "types": {
              "Order": [
                { "name": "salt", "type": "uint256" },
                { "name": "maker", "type": "address" },
                { "name": "signer", "type": "address" },
                { "name": "tokenId", "type": "uint256" },
                { "name": "makerAmount", "type": "uint256" },
                { "name": "takerAmount", "type": "uint256" },
                { "name": "side", "type": "uint8" },
                { "name": "signatureType", "type": "uint8" },
                { "name": "timestamp", "type": "uint256" },
                { "name": "metadata", "type": "bytes32" },
                { "name": "builder", "type": "bytes32" }
              ],
              "TypedDataSign": [
                { "name": "contents", "type": "Order" },
                { "name": "name", "type": "string" },
                { "name": "version", "type": "string" },
                { "name": "chainId", "type": "uint256" },
                { "name": "verifyingContract", "type": "address" },
                { "name": "salt", "type": "bytes32" }
              ]
            },
            "primaryType": "TypedDataSign",
            "message": {
              "contents": {
                "salt": "479249096354",
                "maker": "<deposit_wallet_address>",
                "signer": "<deposit_wallet_address>",
                "tokenId": "<yes_token_id>",
                "makerAmount": "5200000",
                "takerAmount": "10000000",
                "side": 0,
                "signatureType": 3,
                "timestamp": "<unix_milliseconds>",
                "metadata": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "builder": "0x0000000000000000000000000000000000000000000000000000000000000000"
              },
              "name": "DepositWallet",
              "version": "1",
              "chainId": 137,
              "verifyingContract": "<deposit_wallet_address>",
              "salt": "0x0000000000000000000000000000000000000000000000000000000000000000"
            }
          }
          ```
        </Accordion>
      </Step>

      <Step title="Sign the Order">
        Then, sign the order with the Session Key as shown in [Sign the
        Order](/trading/place-orders#sign-the-order):

        ```text theme={null}
        inner_signature = signTypedData(typed_data)
        deposit_wallet_order_signature = wrapDepositWalletSignature(
          typed_data,
          inner_signature
        )
        ```

        Use the `wrapDepositWalletSignature()` helper from the linked example.
      </Step>

      <Step title="Add the Session Signer Envelope">
        Then, wrap `<deposit_wallet_order_signature>` with the session signer
        address:

        ```text theme={null}
        signer_id = leftPadToBytes32(<session_signer_address>)
        session_payload = abiEncode(
          ["bytes32", "bytes32", "bytes"],
          [signer_id, bytes32(0), <deposit_wallet_order_signature>]
        )

        session_wrapped_order_signature =
          session_payload +
          0x6492649264926492649264926492649264926492649264926492649264926492
        ```
      </Step>

      <Step title="Create the Order Request">
        Then, create the order request using
        `<session_wrapped_order_signature>`:

        ```json requestBody theme={null}
        {
          "deferExec": false,
          "order": {
            "builder": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "expiration": "0",
            "maker": "<deposit_wallet_address>",
            "makerAmount": "5200000",
            "metadata": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "salt": 479249096354,
            "side": "BUY",
            "signature": "<session_wrapped_order_signature>",
            "signatureType": 3,
            "signer": "<deposit_wallet_address>",
            "takerAmount": "10000000",
            "timestamp": "<unix_milliseconds>",
            "tokenId": "<yes_token_id>"
          },
          "orderType": "GTC",
          "owner": "<clob_api_key>"
        }
        ```
      </Step>

      <Step title="Submit the Order">
        Finally, submit the order request:

        ```bash theme={null}
        curl -X POST "https://clob.polymarket.com/order" \
          -H "Content-Type: application/json" \
          -H "POLY_ADDRESS: <session_signer_address>" \
          -H "POLY_API_KEY: <clob_api_key>" \
          -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
          -H "POLY_SIGNATURE: <clob_l2_signature>" \
          -H "POLY_TIMESTAMP: <clob_request_timestamp>" \
          --data '<request_body>'
        ```

        `<clob_l2_signature>` authenticates the request. Generate it from the
        exact serialized request body and a fresh `<clob_request_timestamp>`:

        ```text theme={null}
        message = <clob_request_timestamp> + "POST" + "/order" + <request_body>
        clob_l2_signature = urlsafeBase64WithPadding(
          HMAC-SHA256(base64Decode(<clob_api_secret>), message)
        )
        ```
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Fetch Session Keys

List the active Session Keys for a Deposit Wallet to see which signers can
currently act on its behalf.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchSessionKeys()` on the Deposit Wallet Owner's `SecureClient`:

    ```ts theme={null}
    const sessionKeys = await secureClient.fetchSessionKeys();

    // sessionKeys: SessionKey[]
    ```

    <Accordion title="Output: SessionKey[]">
      <CodeGroup>
        ```ts SessionKey Type theme={null}
        type SessionKey = {
          address: EvmAddress;
          scopes: SessionKeyScope[];
          validUntil: number;
        };
        ```

        ```json SessionKey Example theme={null}
        [
          {
            "address": "<session_signer_address>",
            "scopes": ["CLOB", "COMBOSRFQ"],
            "validUntil": 1800000000
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `fetch_session_keys()` on the Deposit Wallet Owner's
    `AsyncSecureClient`. The synchronous `SecureClient` provides the same
    method without `await`.

    ```python theme={null}
    session_keys = await secure_client.fetch_session_keys()

    # session_keys: tuple[AuthorizedSessionKey, ...]
    ```

    <Accordion title="Output: tuple[AuthorizedSessionKey, ...]">
      <CodeGroup>
        ```python AuthorizedSessionKey Type theme={null}
        class AuthorizedSessionKey:
            address: EvmAddress
            scopes: tuple[SessionKeyScope, ...]
            valid_until: datetime
        ```

        ```json AuthorizedSessionKey Example theme={null}
        [
          {
            "address": "<session_signer_address>",
            "scopes": ["CLOB", "COMBOSRFQ"],
            "valid_until": "2027-01-15T08:00:00Z"
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    Authenticate the Deposit Wallet Owner with the CLOB, then fetch the Deposit
    Wallet's active Session Keys. See [API
    Authentication](/getting-started/api#authentication) for the complete
    signing flow.

    <Steps>
      <Step title="Create a CLOB L1 Signature">
        First, create a `<clob_l1_signature>` with the Deposit Wallet Owner to
        prove control of `<deposit_wallet_owner_address>`.

        ```json ClobAuth theme={null}
        {
          "domain": {
            "name": "ClobAuthDomain",
            "version": "1",
            "chainId": 137
          },
          "types": {
            "ClobAuth": [
              { "name": "address", "type": "address" },
              { "name": "timestamp", "type": "string" },
              { "name": "nonce", "type": "uint256" },
              { "name": "message", "type": "string" }
            ]
          },
          "primaryType": "ClobAuth",
          "message": {
            "address": "<deposit_wallet_owner_address>",
            "timestamp": "<unix_seconds>",
            "nonce": 0,
            "message": "This message attests that I control the given wallet"
          }
        }
        ```
      </Step>

      <Step title="Create or Derive CLOB Credentials">
        Then, create CLOB credentials for the Deposit Wallet Owner. If
        credentials already exist, derive them instead.

        <CodeGroup>
          ```bash Create theme={null}
          curl -X POST "https://clob.polymarket.com/auth/api-key" \
            -H "POLY_ADDRESS: <deposit_wallet_owner_address>" \
            -H "POLY_SIGNATURE: <clob_l1_signature>" \
            -H "POLY_TIMESTAMP: <unix_seconds>" \
            -H "POLY_NONCE: 0"
          ```

          ```bash Derive theme={null}
          curl "https://clob.polymarket.com/auth/derive-api-key" \
            -H "POLY_ADDRESS: <deposit_wallet_owner_address>" \
            -H "POLY_SIGNATURE: <clob_l1_signature>" \
            -H "POLY_TIMESTAMP: <unix_seconds>" \
            -H "POLY_NONCE: 0"
          ```
        </CodeGroup>

        The response contains the credentials used to authenticate the session
        keys request:

        ```json Response theme={null}
        {
          "apiKey": "<clob_api_key>",
          "secret": "<clob_api_secret>",
          "passphrase": "<clob_api_passphrase>"
        }
        ```
      </Step>

      <Step title="Fetch the Session Keys">
        Finally, fetch the active Session Keys:

        ```bash theme={null}
        curl "https://clob.polymarket.com/v1/user/session-signers" \
          -H "POLY_ADDRESS: <deposit_wallet_owner_address>" \
          -H "POLY_API_KEY: <clob_api_key>" \
          -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
          -H "POLY_SIGNATURE: <clob_l2_signature>" \
          -H "POLY_TIMESTAMP: <clob_request_timestamp>"
        ```

        `<clob_l2_signature>` authenticates the request. Generate it from the
        request path and a fresh `<clob_request_timestamp>`:

        ```text theme={null}
        message = <clob_request_timestamp> + "GET" + "/v1/user/session-signers"
        clob_l2_signature = urlsafeBase64WithPadding(
          HMAC-SHA256(base64Decode(<clob_api_secret>), message)
        )
        ```

        The response identifies the Deposit Wallet and lists its active session
        keys:

        ```json Response theme={null}
        {
          "wallet": "<deposit_wallet_address>",
          "signers": [
            {
              "address": "<session_signer_address>",
              "scopes": ["CLOB", "COMBOSRFQ"],
              "valid_until": 1800000000 // <session_expiry_unix_seconds>
            }
          ]
        }
        ```

        `signers` contains only usable, unexpired, non-revoked authorizations.
        An empty array means the request succeeded but there are no active
        Session Keys.
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Revoke a Session Key

Revoke a Session Key when an integration no longer needs access or its private
key may have been exposed. Revocation prevents further trading by that key and
cancels its open orders without affecting orders placed by other Session Keys.

<Tabs>
  <Tab title="TypeScript">
    Call `revokeSessionKey()` on the Deposit Wallet Owner's `SecureClient` with
    the Session Key's public address:

    ```ts theme={null}
    await secureClient.revokeSessionKey({
      address: sessionKeyAddress,
    });
    ```

    `revokeSessionKey()` resolves to `void` once the Session Key is no longer active in the Wallet Registry.
    The backend continues the remaining revocation work asynchronously, canceling open orders and finalizing the on-chain transaction.
  </Tab>

  <Tab title="Python">
    Call `revoke_session_key()` on the Deposit Wallet Owner's
    `AsyncSecureClient` with the Session Key's public address. The synchronous
    `SecureClient` provides the same method without `await`.

    ```python theme={null}
    await secure_client.revoke_session_key(
        address=session_key_address,
    )
    ```

    `revoke_session_key()` returns `None` once the Session Key is no longer active in the Wallet Registry.
    The backend continues the remaining revocation work asynchronously, canceling open orders and finalizing the on-chain transaction.
  </Tab>

  <Tab title="API">
    Authorize the revocation as the Deposit Wallet Owner, then submit it with
    Builder authentication.

    <Steps>
      <Step title="Fetch the Wallet Nonce">
        First, fetch the Deposit Wallet's `WALLET` nonce by passing the Deposit
        Wallet Owner address.

        ```bash theme={null}
        curl -G "https://relayer-v2.polymarket.com/v1/account/transactions/params" \
          --data-urlencode "address=<deposit_wallet_owner_address>" \
          --data-urlencode "type=WALLET"
        ```

        The response includes the Deposit Wallet nonce:

        ```json Response theme={null}
        {
          "address": "<relayer_address>",
          "nonce": "<wallet_nonce>"
        }
        ```
      </Step>

      <Step title="Define the Session Key Revocation">
        Then, encode the `revokeSessionSigner` call that the Deposit Wallet will
        execute:

        ```solidity theme={null}
        function revokeSessionSigner(address sessionSigner)
        ```

        The following example uses Viem:

        ```ts Example theme={null}
        import { encodeFunctionData, parseAbi } from "viem"

        const sessionSignerAddress = "<session_signer_address>" as `0x${string}`

        const calldata = encodeFunctionData({
          abi: parseAbi([
            "function revokeSessionSigner(address sessionSigner)",
          ]),
          functionName: "revokeSessionSigner",
          args: [sessionSignerAddress],
        })
        ```
      </Step>

      <Step title="Prepare the Owner Authorization">
        Then, prepare the EIP-712 typed data for the Deposit Wallet Owner to
        approve:

        ```json Batch theme={null}
        {
          "domain": {
            "name": "DepositWallet",
            "version": "1",
            "chainId": 137,
            "verifyingContract": "<deposit_wallet_address>"
          },
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
          "primaryType": "Batch",
          "message": {
            "wallet": "<deposit_wallet_address>",
            "nonce": "<wallet_nonce>",
            "deadline": "<batch_deadline_unix_seconds>",
            "calls": [
              {
                "target": "<deposit_wallet_address>",
                "value": "0",
                "data": "<calldata>"
              }
            ]
          }
        }
        ```

        Where:

        * `<deposit_wallet_address>` is the Deposit Wallet address.
        * `<wallet_nonce>` is the nonce returned when fetching the Deposit
          Wallet nonce.
        * `<batch_deadline_unix_seconds>` is a future whole Unix timestamp in
          seconds after which the signed revocation request can no longer be
          executed. The Relayer requires at least 10 seconds of remaining
          validity.
        * `<calldata>` is the encoded revocation call from the previous step.
      </Step>

      <Step title="Sign as the Deposit Wallet Owner">
        Then, prove that the Deposit Wallet Owner approves the revocation by
        signing the typed data. The following example uses Viem:

        ```ts TypeScript with Viem theme={null}
        import { privateKeyToAccount } from "viem/accounts"

        const depositWalletOwner = privateKeyToAccount(
          process.env.DEPOSIT_WALLET_OWNER_PRIVATE_KEY as `0x${string}`,
        )

        const signature =
          await depositWalletOwner.signTypedData(walletBatchTypedData)
        ```
      </Step>

      <Step title="Build the Revocation Body">
        Then, build the request body that revokes the session signer:

        ```json theme={null}
        {
          "walletAddress": "<deposit_wallet_address>",
          "sessionSignerAddress": "<session_signer_address>",
          "nonce": "<wallet_nonce>",
          "deadline": "<batch_deadline_unix_seconds>",
          "signature": "<signature>"
        }
        ```

        Where:

        * `<session_signer_address>` is the Session Key to revoke.
        * `<wallet_nonce>` and `<batch_deadline_unix_seconds>` match the values
          in the signed typed data.
        * `<signature>` is the value returned in the previous step.
      </Step>

      <Step title="Create the Builder Signature">
        Then, authorize the request with the Builder keys:

        ```text theme={null}
        revocation_body = <exact_serialized_revocation_body>
        request_timestamp = <unix_seconds>
        method = "POST"
        request_path = "/v1/session-signers/revocations"

        message = request_timestamp + method + request_path + revocation_body
        builder_signature = urlsafeBase64WithPadding(
          HMAC-SHA256(base64Decode(<builder_api_secret>), message)
        )
        ```
      </Step>

      <Step title="Submit the Revocation">
        Then, submit the revocation request to the Relayer:

        ```bash theme={null}
        curl -X POST "https://relayer-v2.polymarket.com/v1/session-signers/revocations" \
          -H "Content-Type: application/json" \
          -H "POLY_BUILDER_API_KEY: <builder_api_key>" \
          -H "POLY_BUILDER_TIMESTAMP: <request_timestamp>" \
          -H "POLY_BUILDER_PASSPHRASE: <builder_api_passphrase>" \
          -H "POLY_BUILDER_SIGNATURE: <builder_signature>" \
          -H "Idempotency-Key: <idempotency_key>" \
          -d '{
            "walletAddress": "<deposit_wallet_address>",
            "sessionSignerAddress": "<session_signer_address>",
            "nonce": "<wallet_nonce>",
            "deadline": "<batch_deadline_unix_seconds>",
            "signature": "<signature>"
          }'
        ```

        Where:

        * `<idempotency_key>` uniquely identifies this revocation request.
          Reuse it when retrying the same request.
        * `<request_timestamp>` is the Unix timestamp in seconds used to create
          the Builder signature.
        * `<builder_api_key>` is your Builder API key.
        * `<builder_api_passphrase>` is the passphrase for your Builder API key.
        * `<builder_signature>` is the signature created in the previous step.

        The accepted response contains the identifiers used to track the
        revocation:

        ```json Response theme={null}
        {
          "fenced": true,
          "operationId": "<operation_id>",
          "status": "<revocation_status>",
          "transactionId": "<transaction_id>"
        }
        ```
      </Step>

      <Step title="Confirm the Relayer Transaction">
        Finally, poll the transaction endpoint using the returned
        `<transaction_id>`:

        ```bash theme={null}
        curl "https://relayer-v2.polymarket.com/v1/account/transactions/<transaction_id>"
        ```

        Continue until `state` is `STATE_CONFIRMED`. Treat `STATE_FAILED` and
        `STATE_INVALID` as terminal failures.

        ```json Response theme={null}
        {
          "transaction_id": "<transaction_id>",
          "transaction_hash": "<transaction_hash>",
          "state": "STATE_CONFIRMED",
          "error_msg": null
        }
        ```
      </Step>
    </Steps>

    Revocation completes after the Session Key's open orders are canceled and
    the on-chain transaction is confirmed, which may take several minutes.
  </Tab>
</Tabs>

## Session Key Considerations

Configurable shorter Session Key expirations are not currently supported. To
end access before 180 days, [revoke the Session Key](#revoke-a-session-key).

If you are adding Session Key support to an existing integration, keep these
access boundaries in mind:

* **Notifications:** A Session Key receives only
  [notifications](/trading/wallet-activity#notifications) and [real-time order
  and trade updates](/trading/realtime-order-updates#user-stream) generated by
  its own activity.
* **Orders:** A Session Key can [fetch an
  order](/trading/manage-orders#fetch-an-order) or [list open
  orders](/trading/manage-orders#list-open-orders) only for orders it submitted.
  A Deposit Wallet Owner cannot fetch orders submitted by its authorized
  Session Keys.
* **Trades:** A Session Key can [list account
  trades](/trading/manage-orders#list-account-trades) only for trades associated
  with its own orders.
