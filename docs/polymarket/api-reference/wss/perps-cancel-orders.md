> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Cancel Orders

> Perps WebSocket order cancellation by order ID.



## AsyncAPI

````yaml asyncapi-perps.json cancelOrders
id: cancelOrders
title: Cancel Orders
description: |
  Cancel orders.
  Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).

  <Badge color="gray" size="md">Action Weight: **0**</Badge>
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
    id: CancelOrdersSend
    title: Cancel orders send
    description: Cancel orders
    type: receive
    messages:
      - &ref_3
        id: Request
        contentType: application/json
        payload:
          - name: Cancel Orders Request
            description: Client submits a signed order cancellation request
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
                      - cancelOrders
                    required: true
                  - name: args
                    type: array
                    description: >
                      Array of order IDs to cancel. Cancelling an order that has
                      attached

                      take-profit / stop-loss children (see `CreateOrder.tr`)
                      cascades to

                      those children — they are cancelled with reason
                      `ParentCancelled`.
                    required: true
                    properties:
                      - name: item
                        type: integer
                        description: Order ID
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
              x-parser-schema-id: <anonymous-schema-48>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-49>
            op:
              type: object
              required:
                - type
                - args
              properties:
                type:
                  type: string
                  enum:
                    - cancelOrders
                  x-parser-schema-id: <anonymous-schema-51>
                args:
                  type: array
                  description: >
                    Array of order IDs to cancel. Cancelling an order that has
                    attached

                    take-profit / stop-loss children (see `CreateOrder.tr`)
                    cascades to

                    those children — they are cancelled with reason
                    `ParentCancelled`.
                  items:
                    type: integer
                    description: Order ID
                    example: 1234567890
                    x-parser-schema-id: <anonymous-schema-53>
                  x-parser-schema-id: <anonymous-schema-52>
              x-parser-schema-id: <anonymous-schema-50>
            sig:
              type: string
              description: Signature in hex format
              example: 0x1234567890...
              x-parser-schema-id: <anonymous-schema-54>
            salt:
              type: integer
              description: Salt
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-55>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-56>
            exp:
              type: integer
              description: >-
                Command expiry timestamp in Unix milliseconds. If provided, it
                must be in the future and within the gateway's default command
                timeout. It can shorten request validity but cannot extend it.
                This is not an order auto-cancel time.
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-57>
          required:
            - req
            - op
            - sig
            - salt
            - ts
          x-parser-schema-id: <anonymous-schema-47>
        title: Cancel Orders Request
        description: Client submits a signed order cancellation request
        example: |-
          {
            "req": "post",
            "op": {
              "type": "cancelOrders",
              "args": [
                1234567890
              ]
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
        value: cancelOrders
  - &ref_2
    id: CancelOrdersReceive
    title: Cancel orders receive
    description: Cancel response
    type: send
    messages:
      - &ref_4
        id: Response
        contentType: application/json
        payload:
          - name: Cancel Orders Response
            description: Server responds with cancel result for each order
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: array
                description: Array of cancel results
                required: true
                properties:
                  - name: item
                    type: object
                    required: false
                    properties:
                      - name: status
                        type: string
                        enumValues:
                          - ok
                        required: true
                      - name: oid
                        type: integer
                        description: Order ID
                        required: true
                      - name: coid
                        type: string
                        description: Client order ID
                        required: false
                      - name: status
                        type: string
                        enumValues:
                          - err
                        required: true
                      - name: oid
                        type: integer
                        description: Order ID
                        required: false
                      - name: coid
                        type: string
                        description: Client order ID
                        required: false
                      - name: error
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
                        required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Response
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-59>
            data:
              type: array
              description: Array of cancel results
              items:
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
                        x-parser-schema-id: <anonymous-schema-63>
                      oid:
                        type: integer
                        description: Order ID
                        example: 1234567890
                        x-parser-schema-id: <anonymous-schema-64>
                      coid:
                        type: string
                        description: Client order ID
                        minLength: 32
                        maxLength: 32
                        pattern: ^[0-9a-f]{32}$
                        example: 550e8400e29b41d4a716446655440000
                        x-parser-schema-id: <anonymous-schema-65>
                    x-parser-schema-id: <anonymous-schema-62>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-67>
                      oid:
                        type: integer
                        description: Order ID
                        example: 1234567890
                        x-parser-schema-id: <anonymous-schema-68>
                      coid:
                        type: string
                        description: Client order ID
                        minLength: 32
                        maxLength: 32
                        pattern: ^[0-9a-f]{32}$
                        example: 550e8400e29b41d4a716446655440000
                        x-parser-schema-id: <anonymous-schema-69>
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
                        x-parser-schema-id: <anonymous-schema-70>
                    x-parser-schema-id: <anonymous-schema-66>
                x-parser-schema-id: <anonymous-schema-61>
              x-parser-schema-id: <anonymous-schema-60>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-58>
        title: Cancel Orders Response
        description: Server responds with cancel result for each order
        example: |-
          {
            "id": 3,
            "data": [
              {
                "status": "ok",
                "oid": 1234567890
              },
              {
                "status": "ok",
                "oid": 1234567891
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
    value: cancelOrders
securitySchemes: []

````