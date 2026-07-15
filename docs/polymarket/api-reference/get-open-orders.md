> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Open Orders

> Get open orders for the authenticated account.

<Badge color="gray" size="md">Request Weight:</Badge>

<br />

<Badge color="gray" size="md">With instrument ID: **1**</Badge>

<br />

<Badge color="gray" size="md">Without instrument ID: **20**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json get /v1/account/open-orders
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
  /v1/account/open-orders:
    get:
      summary: Get Open Orders
      description: Get open orders for the authenticated account.
      operationId: getOpenOrders
      parameters:
        - name: instrument_id
          in: query
          required: false
          schema:
            $ref: '#/components/schemas/iid'
      responses:
        '200':
          description: Orders response.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/OrderData'
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
    iid:
      type: integer
      description: Instrument ID
      example: 1
    OrderData:
      type: object
      required:
        - order_id
        - instrument_id
        - buy
        - price
        - quantity
        - tif
        - post_only
        - ro
        - status
        - resting_quantity
        - filled_quantity
        - created_timestamp
        - updated_timestamp
      properties:
        order_id:
          $ref: '#/components/schemas/oid'
        instrument_id:
          $ref: '#/components/schemas/iid'
        buy:
          $ref: '#/components/schemas/buy'
        price:
          $ref: '#/components/schemas/p'
        quantity:
          $ref: '#/components/schemas/qty'
        tif:
          $ref: '#/components/schemas/tif'
        post_only:
          $ref: '#/components/schemas/po'
        ro:
          $ref: '#/components/schemas/ro'
        resting_quantity:
          $ref: '#/components/schemas/rest'
        filled_quantity:
          $ref: '#/components/schemas/fill'
        status:
          $ref: '#/components/schemas/st'
        created_timestamp:
          $ref: '#/components/schemas/cts'
        updated_timestamp:
          $ref: '#/components/schemas/uts'
        client_order_id:
          $ref: '#/components/schemas/coid'
        tpsl:
          $ref: '#/components/schemas/TpSlOrderFields'
          description: >-
            Conditional-order fields. Present only when the order is a TP/SL
            conditional order — `null`/omitted for regular orders.
    oid:
      type: integer
      description: Order ID
      example: 1234567890
    buy:
      type: boolean
      description: Is buy
      example: true
    p:
      type: string
      description: Price
      example: '100.00'
    qty:
      type: string
      description: Quantity in no. of contracts
      example: '10.00'
    tif:
      type: string
      description: Time in force
      enum:
        - gtc
        - ioc
        - fok
    po:
      type: boolean
      description: Post only
      default: false
      example: false
    ro:
      type: boolean
      description: Reduce only
      example: false
      default: false
    rest:
      type: string
      description: Resting quantity
      example: '9.00'
    fill:
      type: string
      description: Filled quantity
      example: '1.00'
    st:
      type: string
      description: Order status
      example: open
    cts:
      type: integer
      description: Create timestamp in milliseconds
      example: 1767225600000
    uts:
      type: integer
      description: Update timestamp in milliseconds
      example: 1767225600000
    coid:
      type: string
      description: Client order ID
      minLength: 32
      maxLength: 32
      pattern: ^[0-9a-f]{32}$
      example: 550e8400e29b41d4a716446655440000
    TpSlOrderFields:
      type: object
      description: TP/SL-specific fields surfaced alongside the regular order shape.
      required:
        - kind
        - scope
        - trp
      properties:
        kind:
          $ref: '#/components/schemas/kind'
        scope:
          $ref: '#/components/schemas/tr_scope'
        trp:
          $ref: '#/components/schemas/trp'
        parent_oid:
          $ref: '#/components/schemas/parent_oid'
        armed_qty:
          $ref: '#/components/schemas/qty'
          description: >-
            Quantity armed at attach time (OCO) or `"0"` for position-based
            (sized at trigger time).
        slip_bps:
          $ref: '#/components/schemas/slip_bps'
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
    kind:
      type: string
      description: Conditional order type (TakeProfit / StopLoss)
      enum:
        - tp
        - sl
    tr_scope:
      type: string
      description: >
        How the conditional order sizes itself.

        - `order` - child of a parent entry (bracket / OCO ladder). Quantity is
        required.

        - `position` - attached to an open position. v1 always closes the full
        position (`qty` must be `"0"`).
      enum:
        - order
        - position
    trp:
      type: string
      description: Trigger price
      example: '110.00'
    parent_oid:
      type: integer
      description: >-
        Parent entry order id. Optional — omit it (do not send `0`) when the
        parent is created in the same request (inline `CreateOrder.tpsl` or
        `CreateTpSlArgs.parent`); the gateway auto-wires the child to it. Set it
        only to attach an order-scoped leg to an existing resting order. Inline
        `CreateOrder.tpsl` rejects a non-zero value; position-scoped legs carry
        no parent.
      example: 1234567890
    slip_bps:
      type: integer
      minimum: 0
      maximum: 10000
      description: >-
        Per-order market-trigger slippage cap in basis points. 0 = use the
        per-instrument default. Clamped to the instrument cap.
      example: 1000
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