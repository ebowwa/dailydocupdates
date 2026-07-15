> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Place Orders

> Perps WebSocket order placement.



## AsyncAPI

````yaml asyncapi-perps.json placeOrders
id: placeOrders
title: Create Orders
description: |
  Create new orders.
  Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).

  <Badge color="gray" size="md">Action Weight: **1 / order**</Badge>
servers:
  - id: production
    protocol: wss
    host: ws.perpetuals.polymarket.com
    bindings: []
    variables: []
address: /v1/ws
parameters: []
bindings: []
operations:
  - &ref_1
    id: PlaceOrdersSend
    title: Place orders send
    description: Submit new orders
    type: receive
    messages:
      - &ref_3
        id: Request
        contentType: application/json
        payload:
          - name: Create Orders Request
            description: Client submits a signed order placement request
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: req
                type: string
                description: Request type
                enumValues:
                  - post
                  - sub
                  - unsub
                required: true
              - name: op
                type: object
                required: true
                properties:
                  - name: type
                    type: string
                    enumValues:
                      - createOrders
                    required: true
                  - name: args
                    type: object
                    description: Array of orders to create
                    required: true
                    properties:
                      - name: iid
                        type: integer
                        description: Instrument ID
                        required: true
                      - name: buy
                        type: boolean
                        description: Is buy
                        required: true
                      - name: p
                        type: string
                        description: Price
                        required: false
                      - name: qty
                        type: string
                        description: Quantity in no. of contracts
                        required: true
                      - name: tif
                        type: string
                        description: Time in force
                        enumValues:
                          - gtc
                          - ioc
                          - fok
                        required: false
                      - name: po
                        type: boolean
                        description: Post only
                        required: false
                      - name: ro
                        type: boolean
                        description: Reduce only
                        required: false
                      - name: c
                        type: string
                        description: Client order ID
                        required: false
                      - name: tr
                        type: object
                        description: Optional trigger attached to this order.
                        required: false
                        properties:
                          - name: market
                            type: boolean
                            description: Whether the trigger executes as a market order
                            required: false
                          - name: trp
                            type: string
                            description: Trigger price
                            required: false
                          - name: tpsl
                            type: string
                            description: Trigger type
                            enumValues:
                              - tp
                              - sl
                            required: false
                  - name: grp
                    type: string
                    description: TPSL grouping
                    enumValues:
                      - order
                      - position
                    required: false
              - name: sig
                type: string
                description: Signature in hex format
                required: true
              - name: salt
                type: integer
                description: Salt
                required: true
              - name: ts
                type: integer
                description: >-
                  Request timestamp. Unix milliseconds for most operations; Unix
                  seconds for withdrawals (must match the on-chain EIP-712
                  struct verified against block.timestamp).
                required: true
              - name: exp
                type: integer
                description: >-
                  Command expiry timestamp in Unix milliseconds. If provided, it
                  must be in the future and within the gateway's default command
                  timeout. It can shorten request validity but cannot extend it.
                  This is not an order auto-cancel time.
                required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-13>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-14>
            op:
              type: object
              required:
                - type
                - args
              properties:
                type:
                  type: string
                  enum:
                    - createOrders
                  x-parser-schema-id: <anonymous-schema-16>
                args:
                  description: Array of orders to create
                  type: object
                  required:
                    - iid
                    - buy
                    - qty
                  properties:
                    iid:
                      type: integer
                      description: Instrument ID
                      example: 1
                      x-parser-schema-id: <anonymous-schema-18>
                    buy:
                      type: boolean
                      description: Is buy
                      example: true
                      x-parser-schema-id: <anonymous-schema-19>
                    p:
                      type: string
                      description: Price
                      example: '100.00'
                      x-parser-schema-id: <anonymous-schema-20>
                    qty:
                      type: string
                      description: Quantity in no. of contracts
                      example: '10.00'
                      x-parser-schema-id: <anonymous-schema-21>
                    tif:
                      type: string
                      description: Time in force
                      enum:
                        - gtc
                        - ioc
                        - fok
                      x-parser-schema-id: <anonymous-schema-22>
                    po:
                      type: boolean
                      description: Post only
                      default: false
                      example: false
                      x-parser-schema-id: <anonymous-schema-23>
                    ro:
                      type: boolean
                      description: Reduce only
                      example: false
                      default: false
                      x-parser-schema-id: <anonymous-schema-24>
                    c:
                      type: string
                      description: Client order ID
                      minLength: 32
                      maxLength: 32
                      pattern: ^[0-9a-f]{32}$
                      example: 550e8400e29b41d4a716446655440000
                      x-parser-schema-id: <anonymous-schema-25>
                    tr:
                      type: object
                      description: Optional trigger attached to this order.
                      properties:
                        market:
                          type: boolean
                          description: Whether the trigger executes as a market order
                          x-parser-schema-id: <anonymous-schema-27>
                        trp:
                          type: string
                          description: Trigger price
                          example: '110.00'
                          x-parser-schema-id: <anonymous-schema-28>
                        tpsl:
                          type: string
                          description: Trigger type
                          enum:
                            - tp
                            - sl
                          x-parser-schema-id: <anonymous-schema-29>
                      x-parser-schema-id: <anonymous-schema-26>
                  x-parser-schema-id: <anonymous-schema-17>
                grp:
                  type: string
                  description: TPSL grouping
                  enum:
                    - order
                    - position
                  x-parser-schema-id: <anonymous-schema-30>
              x-parser-schema-id: <anonymous-schema-15>
            sig:
              type: string
              description: Signature in hex format
              example: 0x1234567890...
              x-parser-schema-id: <anonymous-schema-31>
            salt:
              type: integer
              description: Salt
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-32>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-33>
            exp:
              type: integer
              description: >-
                Command expiry timestamp in Unix milliseconds. If provided, it
                must be in the future and within the gateway's default command
                timeout. It can shorten request validity but cannot extend it.
                This is not an order auto-cancel time.
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-34>
          required:
            - req
            - op
            - sig
            - salt
            - ts
          x-parser-schema-id: <anonymous-schema-12>
        title: Create Orders Request
        description: Client submits a signed order placement request
        example: |-
          {
            "req": "post",
            "op": {
              "type": "createOrders",
              "args": [
                {
                  "iid": 1,
                  "buy": true,
                  "p": "100.00",
                  "qty": "10.00",
                  "tif": "gtc",
                  "po": false,
                  "ro": false,
                  "c": "550e8400e29b41d4a716446655440000",
                  "tr": {
                    "trp": "110.00",
                    "tpsl": "tp"
                  }
                }
              ],
              "grp": "order"
            },
            "sig": "0x1234567890...",
            "salt": 1234567890,
            "ts": 1767225600000,
            "exp": 1767225600000
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Request
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: placeOrders
  - &ref_2
    id: PlaceOrdersReceive
    title: Place orders receive
    description: Order ACK response
    type: send
    messages:
      - &ref_4
        id: Response
        contentType: application/json
        payload:
          - name: Create Orders Response
            description: Server responds with order ACK for each submitted order
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: object
                description: Array of order results
                required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Response
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-36>
            data:
              type: object
              description: Array of order results
              oneOf:
                - type: object
                  required:
                    - status
                    - oid
                  properties:
                    status:
                      type: string
                      enum:
                        - ok
                      x-parser-schema-id: <anonymous-schema-39>
                    oid:
                      type: integer
                      description: Order ID
                      example: 1234567890
                      x-parser-schema-id: <anonymous-schema-40>
                    coid:
                      type: string
                      description: Client order ID
                      minLength: 32
                      maxLength: 32
                      pattern: ^[0-9a-f]{32}$
                      example: 550e8400e29b41d4a716446655440000
                      x-parser-schema-id: <anonymous-schema-41>
                  x-parser-schema-id: <anonymous-schema-38>
                - type: object
                  required:
                    - status
                    - error
                  properties:
                    status:
                      type: string
                      enum:
                        - err
                      x-parser-schema-id: <anonymous-schema-43>
                    error:
                      type: string
                      description: >-
                        Error identifier. For domain rejections and transport
                        errors (`401`/`404`/`429`/`500`) this is a stable,
                        machine-readable snake_case identifier that is part of
                        the API contract and safe to branch on, e.g.
                        `insufficient_margin`, `insufficient_balance`,
                        `order_not_found`, `reduce_only_invalid`,
                        `unauthorized`, `not_found`. For `400` it is a
                        human-readable validation detail whose wording may
                        change. See the Error handling guide for the domain
                        identifiers. (Post-only / Fill-or-Kill outcomes are
                        order statuses such as `post_only_rejected`, not
                        rejections.)
                      example: insufficient_margin
                      x-parser-schema-id: <anonymous-schema-44>
                    oid:
                      type: integer
                      description: Order ID
                      example: 1234567890
                      x-parser-schema-id: <anonymous-schema-45>
                    coid:
                      type: string
                      description: Client order ID
                      minLength: 32
                      maxLength: 32
                      pattern: ^[0-9a-f]{32}$
                      example: 550e8400e29b41d4a716446655440000
                      x-parser-schema-id: <anonymous-schema-46>
                  x-parser-schema-id: <anonymous-schema-42>
              x-parser-schema-id: <anonymous-schema-37>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-35>
        title: Create Orders Response
        description: Server responds with order ACK for each submitted order
        example: |-
          {
            "id": 1,
            "data": [
              {
                "status": "ok",
                "oid": 1234567890
              }
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Response
    bindings: []
    extensions: *ref_0
sendOperations:
  - *ref_1
receiveOperations:
  - *ref_2
sendMessages:
  - *ref_3
receiveMessages:
  - *ref_4
extensions:
  - id: x-parser-unique-object-id
    value: placeOrders
securitySchemes: []

````