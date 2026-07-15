> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Klines

> Get klines for an instrument.
If no end time is provided, the current time will be used.
Maximum of 1000 entries returned per request.


<Badge color="gray" size="md">Request Weight: **5**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/info/klines
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
  /v1/info/klines:
    get:
      summary: Get Klines
      description: |
        Get klines for an instrument.
        If no end time is provided, the current time will be used.
        Maximum of 1000 entries returned per request.
      operationId: getKlines
      parameters:
        - name: instrument_id
          in: query
          required: true
          schema:
            $ref: '#/components/schemas/instrument_id'
        - name: interval
          in: query
          required: true
          schema:
            $ref: '#/components/schemas/interval'
        - name: start_timestamp
          in: query
          required: true
          schema:
            $ref: '#/components/schemas/start_timestamp'
        - name: end_timestamp
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/end_timestamp'
      responses:
        '200':
          description: Klines response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/KlinesResponse'
        '400':
          $ref: '#/components/responses/Error400Response'
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
    interval:
      type: string
      description: Kline interval
      enum:
        - 1s
        - 1m
        - 5m
        - 15m
        - 30m
        - 1h
        - 4h
        - 6h
        - 12h
        - 1d
        - 1w
    start_timestamp:
      type: integer
      description: Start timestamp in milliseconds
      example: 1767225600000
    end_timestamp:
      type: integer
      description: End timestamp in milliseconds
      example: 1767229200000
    KlinesResponse:
      type: object
      required:
        - data
        - more
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/kline'
          maxItems: 1000
        more:
          $ref: '#/components/schemas/more'
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