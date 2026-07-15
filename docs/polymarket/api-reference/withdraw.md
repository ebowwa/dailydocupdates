> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Withdraw

> Submit a signed withdrawal request.
Requires EOA signature, see [EOA signing](/http/signing#1-eoa-signing).

The `amount` field is the raw token amount including decimals (e.g. `"100000000"` for 100 USDC).
This must match the `uint256 amount` value used in the EIP-712 `Withdraw` signature.

The `ts` field is Unix seconds (not milliseconds) because the on-chain contract validates it
against `block.timestamp`. It must also match the `uint64 ts` in the signed EIP-712 struct.


<Badge color="gray" size="md">Request Weight: **1**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json post /v1/account/withdraw
openapi: 3.0.3
info:
  title: Polymarket Perps HTTP API
  version: 1.0.0
  description: HTTP API for Polymarket perpetual trading system.
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0.html
servers:
  - url: https://api.perpetuals.polymarket.com
    description: Production Perps HTTP API
security: []
paths:
  /v1/account/withdraw:
    post:
      summary: Withdraw
      description: >
        Submit a signed withdrawal request.

        Requires EOA signature, see [EOA signing](/http/signing#1-eoa-signing).


        The `amount` field is the raw token amount including decimals (e.g.
        `"100000000"` for 100 USDC).

        This must match the `uint256 amount` value used in the EIP-712
        `Withdraw` signature.


        The `ts` field is Unix seconds (not milliseconds) because the on-chain
        contract validates it

        against `block.timestamp`. It must also match the `uint64 ts` in the
        signed EIP-712 struct.
      operationId: withdraw
      requestBody:
        description: Withdraw request.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/WithdrawRequest'
            examples:
              withdraw:
                summary: Withdraw 100 USDC
                value:
                  op:
                    type: withdraw
                    args:
                      account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
                      token: '0xaf88d065e77c8cc2239327c5edb3a432268e5831'
                      amount: '100000000'
                      to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
                  sig: >-
                    0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a1c
                  salt: 555555555
                  ts: 1767000014
      responses:
        '200':
          description: The accepted withdrawal, carrying its `withdraw_id`.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WithdrawAccepted'
        '400':
          $ref: '#/components/responses/Error400Response'
        '422':
          description: >
            The withdrawal was rejected on its merits (e.g. insufficient
            balance).

            The body carries `withdraw_id` and `error`.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WithdrawRejected'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    WithdrawRequest:
      allOf:
        - type: object
          required:
            - op
          properties:
            op:
              $ref: '#/components/schemas/OpWithdraw'
        - $ref: '#/components/schemas/BaseOp'
    WithdrawAccepted:
      type: object
      required:
        - status
        - withdraw_id
      properties:
        status:
          type: string
          enum:
            - ok
        withdraw_id:
          $ref: '#/components/schemas/withdraw_id'
    WithdrawRejected:
      type: object
      required:
        - status
        - withdraw_id
        - error
      properties:
        status:
          type: string
          enum:
            - err
        withdraw_id:
          $ref: '#/components/schemas/withdraw_id'
        error:
          $ref: '#/components/schemas/error'
    OpWithdraw:
      type: object
      required:
        - type
        - args
      properties:
        type:
          type: string
          enum:
            - withdraw
        args:
          type: object
          required:
            - account
            - token
            - amount
            - to
          properties:
            account:
              $ref: '#/components/schemas/account'
            token:
              $ref: '#/components/schemas/token'
            amount:
              $ref: '#/components/schemas/amount'
            to:
              $ref: '#/components/schemas/to'
    BaseOp:
      type: object
      required:
        - sig
        - salt
        - ts
      properties:
        sig:
          $ref: '#/components/schemas/sig'
        salt:
          $ref: '#/components/schemas/salt'
        ts:
          $ref: '#/components/schemas/ts'
    withdraw_id:
      type: integer
      description: Withdraw ID
    Error400:
      title: Error400
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    error:
      type: string
      description: >-
        Error identifier. For domain rejections and transport errors
        (`401`/`404`/`429`/`500`) this is a stable, machine-readable snake_case
        identifier that is part of the API contract and safe to branch on, e.g.
        `insufficient_margin`, `insufficient_balance`, `order_not_found`,
        `reduce_only_invalid`, `unauthorized`, `not_found`. For `400` it is a
        human-readable validation detail whose wording may change. See the Error
        handling guide for the domain identifiers. (Post-only / Fill-or-Kill
        outcomes are order statuses such as `post_only_rejected`, not
        rejections.)
      example: insufficient_margin
    Error429:
      title: Error429
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    Error500:
      title: Error500
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        error:
          $ref: '#/components/schemas/error'
    account:
      type: string
      description: Account address in hex format
      example: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    token:
      type: string
      description: Token contract address in hex format
      example: '0xaf88d065e77c8cc2239327c5edb3a432268e5831'
    amount:
      type: string
      description: >-
        Raw token amount including decimals. For withdrawals this matches the
        uint256 amount in the EIP-712 signature (e.g. "100000000" for 100 USDC
        with 6 decimals).
      example: '100000000'
    to:
      type: string
      description: Destination address in hex format
      example: '0x1234567890abcdef1234567890abcdef12345678'
    sig:
      type: string
      description: Signature in hex format
      example: 0x1234567890...
    salt:
      type: integer
      description: Salt
      example: 1234567890
    ts:
      type: integer
      description: >-
        Request timestamp. Unix milliseconds for most operations; Unix seconds
        for withdrawals (must match the on-chain EIP-712 struct verified against
        block.timestamp).
      example: 1767225600000
  responses:
    Error400Response:
      description: |
        Bad request — the request was malformed or failed validation (bad query
        parameters, unparseable body, invalid signature, or a domain pre-check).
        The `error` field is a human-readable validation detail.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error400'
    Error429Response:
      description: >
        Too Many Requests. `error` distinguishes the limit that was hit:

        `ip_rate_limited` (per-IP token bucket), `action_rate_limited`
        (per-account

        action rate), or `open_orders_limit` (resting open-order cap).
      headers:
        Retry-After:
          description: >
            Whole seconds to wait before retrying. Present only on token-bucket

            rate-limit rejections (`ip_rate_limited` and `action_rate_limited`);
            a

            conservative estimate of when enough capacity will have refilled to

            admit the request. Absent on `open_orders_limit`, which is a
            capacity

            limit, not a rate limit — waiting does not free order slots; cancel

            resting orders or wait for fills instead.
          schema:
            type: integer
            example: 2
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error429'
    Error500Response:
      description: |
        Internal server error. `error` is `internal_error`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error500'

````