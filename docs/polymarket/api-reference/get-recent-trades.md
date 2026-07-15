> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Recent Trades

> Get public trades for an instrument.
Maximum of 100 entries returned per request.


<Badge color="gray" size="md">Request Weight: **10**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/info/trades
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
  /v1/info/trades:
    get:
      summary: Get Recent Trades
      description: |
        Get public trades for an instrument.
        Maximum of 100 entries returned per request.
      operationId: getTrades
      parameters:
        - name: instrument_id
          in: query
          required: true
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
          description: Trades response.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Trades'
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
    start_timestamp:
      type: integer
      description: Start timestamp in milliseconds
      example: 1767225600000
    end_timestamp:
      type: integer
      description: End timestamp in milliseconds
      example: 1767229200000
    Trades:
      type: object
      required:
        - data
        - more
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/TradeData'
          description: Public trades for the instrument
        more:
          $ref: '#/components/schemas/more'
    TradeData:
      type: object
      required:
        - trade_id
        - instrument_id
        - side
        - price
        - quantity
        - timestamp
        - hash
      properties:
        trade_id:
          $ref: '#/components/schemas/tid'
        instrument_id:
          $ref: '#/components/schemas/iid'
        side:
          $ref: '#/components/schemas/side'
        price:
          $ref: '#/components/schemas/p'
        quantity:
          $ref: '#/components/schemas/qty'
        timestamp:
          $ref: '#/components/schemas/ts'
        hash:
          $ref: '#/components/schemas/hash'
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
    tid:
      type: integer
      description: Trade ID
      example: 1
    iid:
      type: integer
      description: Instrument ID
      example: 1
    side:
      type: string
      description: Side
      enum:
        - long
        - short
    p:
      type: string
      description: Price
      example: '100.00'
    qty:
      type: string
      description: Quantity in no. of contracts
      example: '10.00'
    ts:
      type: integer
      description: >-
        Request timestamp. Unix milliseconds for most operations; Unix seconds
        for withdrawals (must match the on-chain EIP-712 struct verified against
        block.timestamp).
      example: 1767225600000
    hash:
      type: string
      description: On-chain transaction hash, "0x" if not yet mined
      default: 0x
      example: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
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