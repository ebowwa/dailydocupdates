> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Tickers

> Get all instrument tickers with live market data.

<Badge color="gray" size="md">Request Weight: **2**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/info/tickers
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
  /v1/info/tickers:
    get:
      summary: Get Tickers
      description: Get all instrument tickers with live market data.
      operationId: getTickers
      parameters:
        - name: instrument_id
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/instrument_id'
      responses:
        '200':
          description: Tickers response.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Ticker'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    instrument_id:
      type: integer
      description: Instrument ID
    Ticker:
      allOf:
        - $ref: '#/components/schemas/TickerData'
        - type: object
          required:
            - timestamp
          properties:
            timestamp:
              $ref: '#/components/schemas/timestamp'
    TickerData:
      type: object
      required:
        - instrument_id
        - symbol
        - index_price
        - mark_price
        - last_price
        - mid_price
        - open_interest
        - funding_rate
        - next_funding
      properties:
        instrument_id:
          $ref: '#/components/schemas/instrument_id'
        symbol:
          $ref: '#/components/schemas/symbol'
        index_price:
          $ref: '#/components/schemas/index_price'
        mark_price:
          $ref: '#/components/schemas/mark_price'
        last_price:
          $ref: '#/components/schemas/last_price'
        mid_price:
          $ref: '#/components/schemas/mid_price'
        open_interest:
          $ref: '#/components/schemas/open_interest'
        funding_rate:
          $ref: '#/components/schemas/funding_rate'
        next_funding:
          $ref: '#/components/schemas/next_funding'
    timestamp:
      type: integer
      description: Timestamp in milliseconds
      example: 1767225600000
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
    symbol:
      type: string
      description: Instrument symbol
      example: NVDA-USDC
    index_price:
      type: string
      description: Index price
      example: '100.00'
    mark_price:
      type: string
      description: Mark price
      example: '100.00'
    last_price:
      type: string
      description: Last traded price
      example: '100.00'
    mid_price:
      type: string
      description: Mid price
      example: '100.00'
    open_interest:
      type: string
      description: Open interest in number of contracts
      example: '10.00'
    funding_rate:
      type: string
      description: Funding rate
      example: '0.0001'
    next_funding:
      type: integer
      description: Next funding timestamp in milliseconds
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