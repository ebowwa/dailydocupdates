> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Statistics

> Get last 24-hour statistics for all instruments.

<Badge color="gray" size="md">Request Weight: **2**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/info/statistics
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
  /v1/info/statistics:
    get:
      summary: Get Statistics
      description: Get last 24-hour statistics for all instruments.
      operationId: getStatistics
      parameters:
        - name: instrument_id
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/instrument_id'
      responses:
        '200':
          description: Statistics response.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Statistic'
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
    Statistic:
      type: object
      required:
        - instrument_id
        - symbol
        - volume
        - open_price
        - klines
      properties:
        instrument_id:
          $ref: '#/components/schemas/iid'
        symbol:
          $ref: '#/components/schemas/symbol'
        volume:
          $ref: '#/components/schemas/volume'
        open_price:
          $ref: '#/components/schemas/open_price'
        klines:
          $ref: '#/components/schemas/klines'
    iid:
      type: integer
      description: Instrument ID
      example: 1
    symbol:
      type: string
      description: Instrument symbol
      example: NVDA-USDC
    volume:
      type: string
      description: 24-hour trading volume in contracts
      example: '1000.00'
    open_price:
      type: string
      description: Opening price from 24 hours ago
      example: '100.50'
    klines:
      type: array
      items:
        $ref: '#/components/schemas/kline'
      description: Last 24-hour kline data
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
    kline:
      type: array
      description: |
        - `1767225600000` - Open time
        - `"100.00"` - Open price
        - `"105.00"` - High price
        - `"99.00"` - Low price
        - `"102.00"` - Close price
        - `"500.00"` - Volume (base unit)
        - `42` - Number of trades
      example:
        - 1767225600000
        - '100.00'
        - '105.00'
        - '99.00'
        - '102.00'
        - '500.00'
        - 42
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