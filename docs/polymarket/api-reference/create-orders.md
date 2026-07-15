> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create Orders

> Create new orders.
Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).


<Badge color="gray" size="md">Request Weight: **1 + floor(n / 20)**</Badge> <Badge color="gray" size="md">Action Weight: **1 / order**</Badge>


## OpenAPI

````yaml /api-spec/perps-openapi.json post /v1/trade/orders
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
  /v1/trade/orders:
    post:
      summary: Create Orders
      description: >
        Create new orders.

        Requires proxy signature, see [proxy
        signing](/http/signing#2-proxy-signing).
      operationId: createOrders
      requestBody:
        description: Order request.
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OrderRequest'
      responses:
        '200':
          description: >-
            Order ACK response. Order result should be fetched using the get
            orders endpoint.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/OrderResponse'
        '400':
          $ref: '#/components/responses/Error400Response'
        '429':
          $ref: '#/components/responses/Error429Response'
        '500':
          $ref: '#/components/responses/Error500Response'
      security: []
components:
  schemas:
    OrderRequest:
      allOf:
        - type: object
          required:
            - op
          properties:
            op:
              $ref: '#/components/schemas/OpCreateOrders'
        - $ref: '#/components/schemas/BaseOp'
        - type: object
          properties:
            exp:
              $ref: '#/components/schemas/exp'
    OrderResponse:
      oneOf:
        - $ref: '#/components/schemas/OrderAccepted'
        - $ref: '#/components/schemas/OrderRejected'
    OpCreateOrders:
      type: object
      required:
        - type
        - args
      properties:
        type:
          type: string
          enum:
            - createOrders
        args:
          type: array
          items:
            $ref: '#/components/schemas/CreateOrder'
        grp:
          $ref: '#/components/schemas/grp'
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
    exp:
      type: integer
      description: >-
        Command expiry timestamp in Unix milliseconds. If provided, it must be
        in the future and within the gateway's default command timeout. It can
        shorten request validity but cannot extend it. This is not an order
        auto-cancel time.
      example: 1767225600000
    OrderAccepted:
      type: object
      required:
        - status
        - oid
      properties:
        status:
          type: string
          enum:
            - ok
        oid:
          $ref: '#/components/schemas/oid'
        coid:
          $ref: '#/components/schemas/coid'
          description: Echoed only when the request carried a client_order_id.
    OrderRejected:
      type: object
      required:
        - status
        - error
      properties:
        status:
          type: string
          enum:
            - err
        oid:
          $ref: '#/components/schemas/oid'
        coid:
          $ref: '#/components/schemas/coid'
        error:
          $ref: '#/components/schemas/error'
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
    CreateOrder:
      type: object
      required:
        - iid
        - buy
        - qty
      properties:
        iid:
          $ref: '#/components/schemas/iid'
        buy:
          $ref: '#/components/schemas/buy'
        p:
          $ref: '#/components/schemas/p'
        qty:
          $ref: '#/components/schemas/qty'
        tif:
          $ref: '#/components/schemas/tif'
        po:
          $ref: '#/components/schemas/po'
        ro:
          $ref: '#/components/schemas/ro'
        c:
          $ref: '#/components/schemas/coid'
        tr:
          type: object
          description: Optional trigger attached to this order.
          properties:
            market:
              $ref: '#/components/schemas/market'
            trp:
              $ref: '#/components/schemas/trp'
            tpsl:
              $ref: '#/components/schemas/tpsl'
    grp:
      type: string
      description: TPSL grouping
      enum:
        - order
        - position
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
    oid:
      type: integer
      description: Order ID
      example: 1234567890
    coid:
      type: string
      description: Client order ID
      minLength: 32
      maxLength: 32
      pattern: ^[0-9a-f]{32}$
      example: 550e8400e29b41d4a716446655440000
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
    iid:
      type: integer
      description: Instrument ID
      example: 1
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
    market:
      type: boolean
      description: Whether the trigger executes as a market order
    trp:
      type: string
      description: Trigger price
      example: '110.00'
    tpsl:
      type: string
      description: Trigger type
      enum:
        - tp
        - sl
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