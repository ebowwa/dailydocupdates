> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Set Auto-Cancel

> Set a dead man switch that will cancel all open orders at the specified time.
Time must be at least 5 seconds in the future, or `0` to clear an active
schedule without triggering it. Posting a new auto-cancel replaces the
previous one.

The switch is one-shot: once the deadline elapses and your open orders are
cancelled, the schedule clears automatically. Orders you place after the
fire are not affected by the expired deadline — re-arm to extend
protection.

Each account may trigger auto-cancel at most 10 times per UTC day. Once
that limit is reached, further attempts to arm a schedule are rejected with
`auto_cancel_daily_limit_reached` until the next UTC day; clearing an
existing schedule (`time: 0`) is always allowed.

Use `GET /v1/account/auto-cancel` to check the current deadline, today's
trigger count, and when the daily counter resets.

Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).


<Badge color="gray" size="md">Request Weight: **1**</Badge> <Badge color="gray" size="md">Action Weight: **10**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json patch /v1/trade/auto-cancel
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
  /v1/trade/auto-cancel:
    patch:
      summary: Set Auto-Cancel
      description: >
        Set a dead man switch that will cancel all open orders at the specified
        time.

        Time must be at least 5 seconds in the future, or `0` to clear an active

        schedule without triggering it. Posting a new auto-cancel replaces the

        previous one.


        The switch is one-shot: once the deadline elapses and your open orders
        are

        cancelled, the schedule clears automatically. Orders you place after the

        fire are not affected by the expired deadline — re-arm to extend

        protection.


        Each account may trigger auto-cancel at most 10 times per UTC day. Once

        that limit is reached, further attempts to arm a schedule are rejected
        with

        `auto_cancel_daily_limit_reached` until the next UTC day; clearing an

        existing schedule (`time: 0`) is always allowed.


        Use `GET /v1/account/auto-cancel` to check the current deadline, today's

        trigger count, and when the daily counter resets.


        Requires proxy signature, see [proxy
        signing](/http/signing#2-proxy-signing).
      operationId: setAutoCancel
      requestBody:
        description: Auto-cancel request.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AutoCancelRequest'
            examples:
              enable:
                summary: Enable auto-cancel
                value:
                  op:
                    type: autoCancel
                    args:
                      time: 1767000045000
                  sig: >-
                    0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b1c
                  salt: 666666666
                  ts: 1767000015000
              disable:
                summary: Disable auto-cancel
                value:
                  op:
                    type: autoCancel
                    args:
                      time: 0
                  sig: >-
                    0x8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f1c
                  salt: 666666667
                  ts: 1767000016000
      responses:
        '200':
          description: The effective auto-cancel schedule after the update.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AutoCancelResponse'
        '400':
          $ref: '#/components/responses/Error400Response'
        '404':
          $ref: '#/components/responses/Error404Response'
        '422':
          $ref: '#/components/responses/Error422Response'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    AutoCancelRequest:
      allOf:
        - type: object
          required:
            - op
          properties:
            op:
              $ref: '#/components/schemas/OpAutoCancel'
        - $ref: '#/components/schemas/BaseOp'
    AutoCancelResponse:
      description: >
        The effective auto-cancel schedule after the update. `deadline` echoes
        the

        armed Unix-ms time, or `0` when the schedule was cleared (`time: 0`).
      type: object
      required:
        - status
        - deadline
      properties:
        status:
          type: string
          enum:
            - ok
        deadline:
          $ref: '#/components/schemas/auto_cancel_deadline'
    OpAutoCancel:
      type: object
      required:
        - type
        - args
      properties:
        type:
          type: string
          enum:
            - autoCancel
        args:
          type: object
          required:
            - time
          properties:
            time:
              $ref: '#/components/schemas/time'
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
    auto_cancel_deadline:
      type: integer
      description: |
        Unix-ms deadline for the per-account auto-cancel dead-man-switch.
        Zero means no schedule is armed. When the deadline elapses, every
        open order on the account is cancelled and the schedule clears.
      example: 1767000045000
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
    Error404:
      title: Error404
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
    GenericRejected:
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
    time:
      type: integer
      description: Timestamp in milliseconds
      example: 1767225600000
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
    Error404Response:
      description: |
        Not found — the endpoint is disabled on this venue (e.g. auto-cancel) or
        the route does not exist. `error` is `not_found`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error404'
    Error422Response:
      description: |
        Unprocessable Entity — the request was well-formed but a domain rule
        rejected it on its merits (insufficient balance, invalid leverage,
        proxy already exists, …). The body is the discriminated rejection
        (`status: err`) with the engine error identifier in `error`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/GenericRejected'
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