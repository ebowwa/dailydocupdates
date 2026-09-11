> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Requesters

> Request Combo quotes and execute accepted trades

Use the Requester API to request executable Combo quotes, accept a winning
quote, and track the trade through onchain execution. This guide walks through
the complete workflow.

<Warning>
  Keep the CLOB API secret and passphrase on trusted infrastructure. Never
  expose them in a browser or other untrusted client.
</Warning>

## Request and Execute a Quote

<Tabs>
  <Tab title="API">
    The production gateway is
    `https://combos-rfq-gateway-requester-api.polymarket.com`, with base path
    `/v1/requester/rfq`.

    <Steps>
      <Step title="Prepare the Trading Account">
        Create a Polymarket account, obtain its [CLOB API
        credentials](/getting-started/api#authentication), and fund the account wallet.
        Set up the wallet and trading approvals by following [Wallets and
        Authentication](/trading/wallets-auth).

        Resolve the CLOB credential address, order signer, order maker, and signature
        type for the account's wallet:

        | Wallet type    | `signature_type` | `POLY_ADDRESS`                                  | `signer_address`       | `maker_address`        |
        | -------------- | ---------------- | ----------------------------------------------- | ---------------------- | ---------------------- |
        | Deposit Wallet | `3` POLY\_1271   | Account or session signer with CLOB credentials | Deposit Wallet address | Deposit Wallet address |
        | Proxy Wallet   | `1` Proxy        | Account signer with CLOB credentials            | Account signer         | Proxy Wallet address   |
        | Safe Wallet    | `2` Safe         | Account signer with CLOB credentials            | Account signer         | Safe Wallet address    |
        | EOA            | `0` EOA          | Not supported                                   | Not supported          | Not supported          |

        Both requester gateways reject EOA accounts. The Requester API returns
        `UNSUPPORTED_REQUESTER_SIGNATURE_TYPE`; use a Deposit, Proxy, or Safe Wallet.
      </Step>

      <Step title="Sign Request Headers">
        Every request requires these CLOB L2 headers:

        * `POLY_ADDRESS`
        * `POLY_API_KEY`
        * `POLY_PASSPHRASE`
        * `POLY_TIMESTAMP`
        * `POLY_SIGNATURE`

        `POLY_ADDRESS` is the address associated with the CLOB API credentials. Use the
        wallet identity values resolved in the previous step for the request body and
        signed order.

        Compute `POLY_SIGNATURE` with HMAC-SHA256, using the base64-decoded CLOB secret
        as the key. Sign an uppercase method, a Unix timestamp in seconds, the full
        request path without the host or query string, and the exact serialized body
        sent on the wire. Omit the body for `GET` requests. Encode the digest as
        base64url with padding preserved.

        ```text theme={null}
        HMAC-SHA256(
          base64Decode(secret),
          timestamp + HTTP_METHOD + FULL_REQUEST_PATH + REQUEST_BODY
        )
        ```

        Generate a fresh timestamp and signature for every request, including each
        status poll.
      </Step>

      <Step title="Choose the Combo Legs">
        Fetch active Combo-enabled markets from the public catalog:

        ```bash theme={null}
        curl -G "https://combos-rfq-api.polymarket.com/v1/rfq/combo-markets" \
          --data-urlencode "limit=50"
        ```

        The response contains a `markets` array and an opaque `next_cursor`. Pass the
        cursor back as `cursor` to fetch the next page. For each market,
        `position_ids`, `outcomes`, and `outcome_prices` are aligned by array index:
        index `0` is YES and index `1` is NO.

        Choose 2–50 unique, mutually compatible outcome position IDs and pass them in
        `leg_position_ids`.
      </Step>

      <Step title="Create the RFQ">
        Choose the request direction and size:

        * A BUY sets the maximum collateral budget, including fees. Use
          `unit: "notional"`.
        * A SELL specifies the number of Combo shares to sell. Use `unit: "shares"`.

        `value_e6` is a string in 6-decimal base units, and `side` must currently be
        `"YES"`. The gateway holds the request until the quote competition finishes.
        The examples below use a Deposit Wallet. The API accepts at most 15 create
        requests per rolling minute for each `maker_address`; requests above that limit
        return HTTP `429` with `RATE_LIMITED`.

        <CodeGroup>
          ```http BUY theme={null}
          POST /v1/requester/rfq/requests
          Content-Type: application/json
          POLY_ADDRESS: <clob-credential-address>
          POLY_API_KEY: <clob-api-key>
          POLY_PASSPHRASE: <clob-passphrase>
          POLY_TIMESTAMP: <unix-seconds>
          POLY_SIGNATURE: <l2-signature>

          {
            "signer_address": "<deposit-wallet-address>",
            "maker_address": "<deposit-wallet-address>",
            "signature_type": 3,
            "leg_position_ids": ["<yes-position-id-1>", "<yes-position-id-2>"],
            "direction": "BUY",
            "side": "YES",
            "requested_size": {
              "unit": "notional",
              "value_e6": "1000000"
            }
          }
          ```

          ```http SELL theme={null}
          POST /v1/requester/rfq/requests
          Content-Type: application/json
          POLY_ADDRESS: <clob-credential-address>
          POLY_API_KEY: <clob-api-key>
          POLY_PASSPHRASE: <clob-passphrase>
          POLY_TIMESTAMP: <unix-seconds>
          POLY_SIGNATURE: <l2-signature>

          {
            "signer_address": "<deposit-wallet-address>",
            "maker_address": "<deposit-wallet-address>",
            "signature_type": 3,
            "leg_position_ids": ["<yes-position-id-1>", "<yes-position-id-2>"],
            "direction": "SELL",
            "side": "YES",
            "requested_size": {
              "unit": "shares",
              "value_e6": "1000000"
            }
          }
          ```
        </CodeGroup>

        An executable response includes the server-owned RFQ ID, winning quote, and
        acceptance deadline:

        <Accordion title="Create RFQ Response">
          ```json theme={null}
          {
            "rfq_id": "<rfq-id>",
            "status": "AWAITING_REQUESTER_ACCEPTANCE",
            "expires_at": 1773890763000,
            "request": {
              "rfq_id": "<rfq-id>",
              "maker_address": "<deposit-wallet-address>",
              "requestor_public_id": "<requester-public-id>",
              "leg_position_ids": ["<yes-position-id-1>", "<yes-position-id-2>"],
              "condition_id": "<combo-condition-id>",
              "yes_position_id": "<combo-yes-position-id>",
              "no_position_id": "<combo-no-position-id>",
              "direction": "BUY",
              "side": "YES",
              "requested_size": {
                "unit": "notional",
                "value_e6": "1000000"
              },
              "created_at": 1773890758000
            },
            "quote": {
              "quote_id": "<quote-id>",
              "blended_price_e6": "500000",
              "maker_amount_e6": "966191",
              "taker_amount_e6": "1932381",
              "total_required_e6": "1000000",
              "net_receive_e6": "1932381"
            }
          }
          ```
        </Accordion>

        `expires_at` and `request.created_at` are Unix timestamps in milliseconds. The
        acceptance window is five seconds from quote readiness. Sign and accept the
        order before `expires_at`. `total_required_e6` is the exact balance required:
        collateral including fees for BUY, or Combo shares for SELL. For BUY,
        `net_receive_e6` is the Combo shares received. For SELL, it is the exact
        collateral proceeds after fees.

        If no usable quote is available, the gateway returns HTTP `200` with a terminal
        business outcome:

        ```json theme={null}
        {
          "rfq_id": "<rfq-id>",
          "status": "FAILED",
          "error": {
            "code": "NO_QUOTES",
            "message": "no quotes"
          }
        }
        ```

        <Warning>
          A local create timeout or lost connection has an unknown outcome. The RFQ may
          have been created even if you never received its server-owned ID. This API has
          no idempotency key or lookup for that case, and retrying may create another
          RFQ.
        </Warning>
      </Step>

      <Step title="Build and Sign the Requester Order">
        Build an Exchange v3 order from the returned request and quote. Use Polygon
        chain ID `137` and Exchange v3 contract
        `0xe3333700cA9d93003F00f0F71f8515005F6c00Aa` for the EIP-712 domain.

        For both directions, copy `maker_amount_e6` to `makerAmount` and
        `taker_amount_e6` to `takerAmount`, and use the returned Combo YES position ID
        as `tokenId`. Set `side` to `0` for BUY or `1` for SELL.

        The `builder` field must be the zero bytes32 value. A non-zero value is rejected
        with `BUILDER_ATTRIBUTION_NOT_ALLOWED`. This gateway does not support Builder
        attribution. Approved builders that need orders attributed to their Builder
        code must authenticate and submit them through the [Builder Gateway
        workflow](/trading/combos/builders#request-and-execute-a-quote) instead.

        Use the same wallet identity selected when creating the RFQ. The wallet type
        determines which payload to sign and how to encode `signed_order.signature`:

        | Wallet type    | `signatureType` | Payload to sign            | Submitted signature            |
        | -------------- | --------------- | -------------------------- | ------------------------------ |
        | Deposit Wallet | `3`             | `depositWalletTypedData`   | ERC-7739-wrapped signature     |
        | Proxy Wallet   | `1`             | `exchangeV3OrderTypedData` | Standard 65-byte EVM signature |
        | Safe Wallet    | `2`             | `exchangeV3OrderTypedData` | Standard 65-byte EVM signature |

        For a Deposit Wallet, wrap the Exchange v3 order in the Deposit Wallet's
        `TypedDataSign` structure. Both `maker` and `signer` in `contents` are the
        Deposit Wallet address. The account or session signer signs this outer payload.

        ```json Deposit Wallet Typed Data theme={null}
        {
          "domain": {
            "name": "Polymarket CTF Exchange",
            "version": "3",
            "chainId": 137,
            "verifyingContract": "0xe3333700cA9d93003F00f0F71f8515005F6c00Aa"
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
              "salt": "<salt>",
              "maker": "<deposit-wallet-address>",
              "signer": "<deposit-wallet-address>",
              "tokenId": "<combo-yes-position-id>",
              "makerAmount": "966191",
              "takerAmount": "1932381",
              "side": 0,
              "signatureType": 3,
              "timestamp": "<unix-seconds>",
              "metadata": "0x0000000000000000000000000000000000000000000000000000000000000000",
              "builder": "0x0000000000000000000000000000000000000000000000000000000000000000"
            },
            "name": "DepositWallet",
            "version": "1",
            "chainId": 137,
            "verifyingContract": "<deposit-wallet-address>",
            "salt": "0x0000000000000000000000000000000000000000000000000000000000000000"
          }
        }
        ```

        For a Proxy or Safe Wallet, sign the Exchange v3 `Order` directly. Set `maker`
        to the Proxy or Safe Wallet address, `signer` to the account signer, and
        `signatureType` to `1` or `2`, respectively.

        ```json Proxy or Safe Wallet Typed Data theme={null}
        {
          "domain": {
            "name": "Polymarket CTF Exchange",
            "version": "3",
            "chainId": 137,
            "verifyingContract": "0xe3333700cA9d93003F00f0F71f8515005F6c00Aa"
          },
          "types": {
            "EIP712Domain": [
              { "name": "name", "type": "string" },
              { "name": "version", "type": "string" },
              { "name": "chainId", "type": "uint256" },
              { "name": "verifyingContract", "type": "address" }
            ],
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
            ]
          },
          "primaryType": "Order",
          "message": {
            "salt": "<salt>",
            "maker": "<proxy-or-safe-wallet-address>",
            "signer": "<account-signer-address>",
            "tokenId": "<combo-yes-position-id>",
            "makerAmount": "966191",
            "takerAmount": "1932381",
            "side": 0,
            "signatureType": 1,
            "timestamp": "<unix-seconds>",
            "metadata": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "builder": "0x0000000000000000000000000000000000000000000000000000000000000000"
          }
        }
        ```

        Sign the selected payload with the account or session signer. Deposit Wallets
        must wrap the raw signature for ERC-7739 validation; Proxy and Safe Wallets
        submit the signature returned by signing the Exchange `Order` directly.

        <CodeGroup>
          ```js Deposit Wallet theme={null}
          import { privateKeyToAccount } from "viem/accounts";

          const signer = privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
          const innerSignature = await signer.signTypedData(depositWalletTypedData);
          const signature = wrapDepositWalletSignature(
            depositWalletTypedData,
            innerSignature,
          );
          ```

          ```js Proxy or Safe Wallet theme={null}
          import { privateKeyToAccount } from "viem/accounts";

          const signer = privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
          const signature = await signer.signTypedData(exchangeV3OrderTypedData);
          ```

          ```js wrapDepositWalletSignature() theme={null}
          import { concatHex, encodeAbiParameters, keccak256, toHex } from "viem";

          const ORDER_TYPE =
            "Order(uint256 salt,address maker,address signer,uint256 tokenId,uint256 makerAmount,uint256 takerAmount,uint8 side,uint8 signatureType,uint256 timestamp,bytes32 metadata,bytes32 builder)";
          const EIP712_DOMAIN_TYPE =
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)";

          function wrapDepositWalletSignature(typedData, innerSignature) {
            const order = typedData.message.contents;
            const exchangeDomain = typedData.domain;

            const appDomainSeparator = keccak256(
              encodeAbiParameters(
                [
                  { type: "bytes32" },
                  { type: "bytes32" },
                  { type: "bytes32" },
                  { type: "uint256" },
                  { type: "address" },
                ],
                [
                  keccak256(toHex(EIP712_DOMAIN_TYPE)),
                  keccak256(toHex(exchangeDomain.name)),
                  keccak256(toHex(exchangeDomain.version)),
                  BigInt(exchangeDomain.chainId),
                  exchangeDomain.verifyingContract,
                ],
              ),
            );
            const contentsHash = keccak256(
              encodeAbiParameters(
                [
                  { type: "bytes32" },
                  { type: "uint256" },
                  { type: "address" },
                  { type: "address" },
                  { type: "uint256" },
                  { type: "uint256" },
                  { type: "uint256" },
                  { type: "uint8" },
                  { type: "uint8" },
                  { type: "uint256" },
                  { type: "bytes32" },
                  { type: "bytes32" },
                ],
                [
                  keccak256(toHex(ORDER_TYPE)),
                  BigInt(order.salt),
                  order.maker,
                  order.signer,
                  BigInt(order.tokenId),
                  BigInt(order.makerAmount),
                  BigInt(order.takerAmount),
                  order.side,
                  order.signatureType,
                  BigInt(order.timestamp),
                  order.metadata,
                  order.builder,
                ],
              ),
            );

            return concatHex([
              innerSignature,
              appDomainSeparator,
              contentsHash,
              toHex(ORDER_TYPE),
              toHex(ORDER_TYPE.length, { size: 2 }),
            ]);
          }
          ```
        </CodeGroup>
      </Step>

      <Step title="Accept the Quote">
        Submit the signed order with the winning `quote_id` before the returned
        `expires_at` deadline.

        ```http theme={null}
        POST /v1/requester/rfq/requests/<rfq-id>/accept
        Content-Type: application/json
        POLY_ADDRESS: <clob-credential-address>
        POLY_API_KEY: <clob-api-key>
        POLY_PASSPHRASE: <clob-passphrase>
        POLY_TIMESTAMP: <unix-seconds>
        POLY_SIGNATURE: <l2-signature>

        {
          "quote_id": "<quote-id>",
          "signed_order": {
            "salt": "<salt>",
            "maker": "<deposit-wallet-address>",
            "signer": "<deposit-wallet-address>",
            "tokenId": "<combo-yes-position-id>",
            "makerAmount": "966191",
            "takerAmount": "1932381",
            "side": 0,
            "signatureType": 3,
            "timestamp": "<unix-seconds>",
            "metadata": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "builder": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "signature": "<order-signature>"
          }
        }
        ```

        The response contains the latest known state. If Last Look is pending, the
        gateway waits up to one second for an execution or terminal update before
        returning.

        ```json theme={null}
        {
          "rfq_id": "<rfq-id>",
          "status": "EXECUTING",
          "taker_order_hash": "<order-hash>"
        }
        ```

        `EXECUTING` is not a confirmed fill. A response may instead remain
        `AWAITING_MAKER_CONFIRMATION`, or return HTTP `200` with `status: "FAILED"` and
        an `error` object if the maker declines or execution fails. Retrying the same
        authenticated acceptance does not execute the order twice; use `rfq_id` as the
        stable recovery identifier.
      </Step>

      <Step title="Poll Status">
        After acceptance, fetch durable status with a newly signed L2 request.

        ```http theme={null}
        GET /v1/requester/rfq/requests/<rfq-id>
        Accept: application/json
        POLY_ADDRESS: <clob-credential-address>
        POLY_API_KEY: <clob-api-key>
        POLY_PASSPHRASE: <clob-passphrase>
        POLY_TIMESTAMP: <unix-seconds>
        POLY_SIGNATURE: <l2-signature>
        ```

        ```json theme={null}
        {
          "rfq_id": "<rfq-id>",
          "status": "FILLED",
          "tx_hash": "<transaction-hash>"
        }
        ```

        Status reads before acceptance return HTTP `409`. Poll while the state is
        `AWAITING_MAKER_CONFIRMATION`, `EXECUTING`, `MINED`, or `RETRYING`. Stop on a
        successful `CONFIRMED` or `FILLED` state, or a terminal `FAILED`, `EXPIRED`, or
        `CANCELED` state. A local polling timeout does not mean the trade failed; resume
        polling the same `rfq_id`.
      </Step>
    </Steps>
  </Tab>

  <Tab title="TypeScript">
    <Info>
      TypeScript SDK support is coming soon. Use the API workflow in the API tab for
      now.
    </Info>
  </Tab>

  <Tab title="Python">
    <Info>
      Python SDK support is coming soon. Use the API workflow in the API tab for
      now.
    </Info>
  </Tab>
</Tabs>

## Handle Errors

Validation and dependency failures use non-`200` HTTP statuses with stable
string codes:

```json theme={null}
{
  "error": "invalid acceptance",
  "code": "INVALID_ACCEPTANCE"
}
```

| HTTP status | Common codes                                                                                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`       | `INVALID_JSON`, `INVALID_RFQ`, `INVALID_IDENTITY`, `INVALID_ACCEPTANCE`, `INVALID_SIGNATURE`, `UNSUPPORTED_REQUESTER_SIGNATURE_TYPE`, `BUILDER_ATTRIBUTION_NOT_ALLOWED` |
| `401`       | `UNAUTHENTICATED`                                                                                                                                                       |
| `403`       | `ADDRESS_MISMATCH`, `REQUEST_FAILED`                                                                                                                                    |
| `404`       | `UNKNOWN_RFQ`                                                                                                                                                           |
| `409`       | `REQUEST_FAILED`, `QUOTE_MISMATCH`, `EXPIRED_RFQ`, `INVALID_RFQ_STATE`                                                                                                  |
| `429`       | `RATE_LIMITED`                                                                                                                                                          |
| `503`       | `SERVICE_UNAVAILABLE`, `PRE_EXECUTION_BALANCE_RESERVATION_FAILED`, `TRADE_SUBMISSION_FAILED`                                                                            |

Treat codes as strings so integrations remain compatible with new codes. HTTP
`200` can still contain a failed business outcome; always inspect both `status`
and the nested `error` object.
