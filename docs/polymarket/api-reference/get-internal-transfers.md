> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Internal Transfers

> Get settled internal transfer history for the authenticated account.
Returns both inbound and outbound transfers.


<Badge color="gray" size="md">Request Weight: **10**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/account/internal-transfers
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
  /v1/account/internal-transfers:
    get:
      summary: Get Internal Transfers
      description: |
        Get settled internal transfer history for the authenticated account.
        Returns both inbound and outbound transfers.
      operationId: getInternalTransfers
      parameters:
        - name: start_timestamp
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/start_timestamp'
        - name: end_timestamp
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/end_timestamp'
      responses:
        '200':
          description: Internal transfer history response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InternalTransfers'
        '400':
          $ref: '#/components/responses/Error400Response'
        '401':
          $ref: '#/components/responses/Error401Response'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security:
        - polymarket_proxy: []
          polymarket_secret: []
components:
  schemas:
    start_timestamp:
      type: integer
      description: Start timestamp in milliseconds
      example: 1767225600000
    end_timestamp:
      type: integer
      description: End timestamp in milliseconds
      example: 1767229200000
    InternalTransfers:
      type: object
      required:
        - data
        - more
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/InternalTransfer'
        more:
          $ref: '#/components/schemas/more'
    InternalTransfer:
      type: object
      required:
        - transfer_id
        - asset
        - amount
        - direction
        - counterparty
        - created_timestamp
      properties:
        transfer_id:
          $ref: '#/components/schemas/transfer_id'
        asset:
          $ref: '#/components/schemas/asset'
        amount:
          $ref: '#/components/schemas/amount'
        direction:
          $ref: '#/components/schemas/direction'
        counterparty:
          $ref: '#/components/schemas/counterparty'
        label:
          $ref: '#/components/schemas/label'
        created_timestamp:
          $ref: '#/components/schemas/created_timestamp'
    more:
      type: boolean
      description: More data available
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
    Error401:
      title: Error401
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
    transfer_id:
      type: integer
      description: Internal transfer ID
    asset:
      type: string
      description: Asset name
      example: USDC
    amount:
      type: string
      description: >-
        Raw token amount including decimals. For withdrawals this matches the
        uint256 amount in the EIP-712 signature (e.g. "100000000" for 100 USDC
        with 6 decimals).
      example: '100000000'
    direction:
      type: string
      description: Transfer direction relative to the authenticated account
      enum:
        - in
        - out
    counterparty:
      type: string
      description: Counterparty account address in hex format
      example: '0x1234567890abcdef1234567890abcdef12345678'
    label:
      type: string
      description: Human-readable label for a proxy key or internal transfer
      example: trading-bot
    created_timestamp:
      type: integer
      description: Creation timestamp in milliseconds
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
    Error401Response:
      description: >
        Unauthorized — missing or invalid `POLYMARKET-PROXY` /
        `POLYMARKET-SECRET`

        credentials. `error` is `unauthorized`.
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error401'
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
  securitySchemes:
    polymarket_proxy:
      type: apiKey
      name: POLYMARKET-PROXY
      in: header
      description: Proxy address
    polymarket_secret:
      type: apiKey
      name: POLYMARKET-SECRET
      in: header
      description: Correponding proxy secret

````