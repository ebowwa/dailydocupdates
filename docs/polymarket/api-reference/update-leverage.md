> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Leverage

> Update leverage for an instrument.
Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).


<Badge color="gray" size="md">Request Weight: **1**</Badge> <Badge color="gray" size="md">Action Weight: **1**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json patch /v1/trade/leverage
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
  /v1/trade/leverage:
    patch:
      summary: Update Leverage
      description: >
        Update leverage for an instrument.

        Requires proxy signature, see [proxy
        signing](/http/signing#2-proxy-signing).
      operationId: updateLeverage
      requestBody:
        description: Leverage request.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LeverageRequest'
            examples:
              updateLeverage:
                summary: Update leverage for one instrument
                value:
                  op:
                    type: updateLeverage
                    args:
                      iid: 1
                      lev: 5
                      cross: false
                  sig: >-
                    0x59ed57f6dce8d15aa01e774ef53d9957c84801fb34ec655f6a2ea344af8a58843095314730a3f1bd8f0f4560f6dc6f8de69d3f2d0a6f3365fc877f7f4845d40b1c
                  salt: 333333333
                  ts: 1767000012000
      responses:
        '200':
          description: The instrument's effective leverage configuration after the update.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LeverageResponse'
        '400':
          $ref: '#/components/responses/Error400Response'
        '422':
          $ref: '#/components/responses/Error422Response'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    LeverageRequest:
      allOf:
        - type: object
          required:
            - op
          properties:
            op:
              $ref: '#/components/schemas/OpUpdateLeverage'
        - $ref: '#/components/schemas/BaseOp'
    LeverageResponse:
      description: The instrument's effective leverage configuration after the update.
      type: object
      required:
        - status
        - instrument_id
        - leverage
        - cross
      properties:
        status:
          type: string
          enum:
            - ok
        instrument_id:
          $ref: '#/components/schemas/iid'
        leverage:
          $ref: '#/components/schemas/lev'
        cross:
          $ref: '#/components/schemas/cross'
    OpUpdateLeverage:
      type: object
      required:
        - type
        - args
      properties:
        type:
          type: string
          enum:
            - updateLeverage
        args:
          type: object
          required:
            - iid
            - lev
            - cross
          properties:
            iid:
              $ref: '#/components/schemas/iid'
            lev:
              $ref: '#/components/schemas/lev'
            cross:
              $ref: '#/components/schemas/cross'
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
    iid:
      type: integer
      description: Instrument ID
      example: 1
    lev:
      type: integer
      description: Leverage
      example: 10
    cross:
      type: boolean
      description: Whether to use cross margin mode
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