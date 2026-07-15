> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Funding Charges

> Get funding payment history for the authenticated account.
If no end time is provided, the current time will be used.
Maximum of 100 entries returned per request.


<Badge color="gray" size="md">Request Weight: **10**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/account/funding
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
  /v1/account/funding:
    get:
      summary: Get Funding Charges
      description: |
        Get funding payment history for the authenticated account.
        If no end time is provided, the current time will be used.
        Maximum of 100 entries returned per request.
      operationId: getAccountFunding
      parameters:
        - name: instrument_id
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/instrument_id'
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
          description: Account funding history response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AccountFundingHistory'
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
    instrument_id:
      type: integer
      description: Instrument ID
    start_timestamp:
      type: integer
      description: Start timestamp in milliseconds
      example: 1767225600000
    end_timestamp:
      type: integer
      description: End timestamp in milliseconds
      example: 1767229200000
    AccountFundingHistory:
      type: object
      required:
        - data
        - more
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/AccountFundingData'
        more:
          $ref: '#/components/schemas/more'
    AccountFundingData:
      type: object
      required:
        - instrument_id
        - size
        - funding_rate
        - funding_asset
        - funding
        - timestamp
      properties:
        instrument_id:
          $ref: '#/components/schemas/iid'
        size:
          $ref: '#/components/schemas/sz'
        funding_rate:
          $ref: '#/components/schemas/fr'
        funding_asset:
          $ref: '#/components/schemas/fua'
        funding:
          $ref: '#/components/schemas/fund'
        timestamp:
          $ref: '#/components/schemas/ts'
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
    iid:
      type: integer
      description: Instrument ID
      example: 1
    sz:
      type: string
      description: >-
        Signed position size in no. of contracts (positive = long, negative =
        short)
      example: '10.00'
    fr:
      type: string
      description: Funding rate
      example: '0.0001'
    fua:
      type: string
      description: Funding asset name
      example: USDC
    fund:
      type: string
      description: Funding paid in USD
      example: '1.00'
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