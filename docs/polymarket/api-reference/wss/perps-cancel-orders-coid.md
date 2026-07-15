> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Cancel Orders by Client Order ID

> Perps WebSocket order cancellation by client order ID.



## AsyncAPI

````yaml asyncapi-perps.json cancelOrdersCOID
id: cancelOrdersCOID
title: Cancel Orders COID
description: |
  Cancel orders by client order ID.
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
    id: CancelOrdersCOIDSend
    title: Cancel orders c o i d send
    description: Cancel orders by client order ID
    type: receive
    messages:
      - &ref_3
        id: Request
        contentType: application/json
        payload:
          - name: Cancel Orders COID Request
            description: Client submits a signed cancel-by-client-order-id request
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
                      - cancelOrdersCOID
                    required: true
                  - name: args
                    type: array
                    description: >
                      Array of client order IDs to cancel. Cancelling an order
                      that has

                      attached take-profit / stop-loss children (see
                      `CreateOrder.tr`)

                      cascades to those children — they are cancelled with
                      reason

                      `ParentCancelled`.
                    required: true
                    properties:
                      - name: item
                        type: string
                        description: Client order ID
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
              x-parser-schema-id: <anonymous-schema-72>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-73>
            op:
              type: object
              required:
                - type
                - args
              properties:
                type:
                  type: string
                  enum:
                    - cancelOrdersCOID
                  x-parser-schema-id: <anonymous-schema-75>
                args:
                  type: array
                  description: >
                    Array of client order IDs to cancel. Cancelling an order
                    that has

                    attached take-profit / stop-loss children (see
                    `CreateOrder.tr`)

                    cascades to those children — they are cancelled with reason

                    `ParentCancelled`.
                  items:
                    type: string
                    description: Client order ID
                    minLength: 32
                    maxLength: 32
                    pattern: ^[0-9a-f]{32}$
                    example: 550e8400e29b41d4a716446655440000
                    x-parser-schema-id: <anonymous-schema-77>
                  x-parser-schema-id: <anonymous-schema-76>
              x-parser-schema-id: <anonymous-schema-74>
            sig:
              type: string
              description: Signature in hex format
              example: 0x1234567890...
              x-parser-schema-id: <anonymous-schema-78>
            salt:
              type: integer
              description: Salt
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-79>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-80>
            exp:
              type: integer
              description: >-
                Command expiry timestamp in Unix milliseconds. If provided, it
                must be in the future and within the gateway's default command
                timeout. It can shorten request validity but cannot extend it.
                This is not an order auto-cancel time.
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-81>
          required:
            - req
            - op
            - sig
            - salt
            - ts
          x-parser-schema-id: <anonymous-schema-71>
        title: Cancel Orders COID Request
        description: Client submits a signed cancel-by-client-order-id request
        example: |-
          {
            "req": "post",
            "op": {
              "type": "cancelOrdersCOID",
              "args": [
                "550e8400e29b41d4a716446655440000"
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
        value: cancelOrdersCOID
  - &ref_2
    id: CancelOrdersCOIDReceive
    title: Cancel orders c o i d receive
    description: Cancel by client order ID response
    type: send
    messages:
      - &ref_4
        id: Response
        contentType: application/json
        payload:
          - name: Cancel Orders COID Response
            description: Server responds with cancel result for each client order ID
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
              x-parser-schema-id: <anonymous-schema-83>
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
                        x-parser-schema-id: <anonymous-schema-87>
                      oid:
                        type: integer
                        description: Order ID
                        example: 1234567890
                        x-parser-schema-id: <anonymous-schema-88>
                      coid:
                        type: string
                        description: Client order ID
                        minLength: 32
                        maxLength: 32
                        pattern: ^[0-9a-f]{32}$
                        example: 550e8400e29b41d4a716446655440000
                        x-parser-schema-id: <anonymous-schema-89>
                    x-parser-schema-id: <anonymous-schema-86>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-91>
                      oid:
                        type: integer
                        description: Order ID
                        example: 1234567890
                        x-parser-schema-id: <anonymous-schema-92>
                      coid:
                        type: string
                        description: Client order ID
                        minLength: 32
                        maxLength: 32
                        pattern: ^[0-9a-f]{32}$
                        example: 550e8400e29b41d4a716446655440000
                        x-parser-schema-id: <anonymous-schema-93>
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
                        x-parser-schema-id: <anonymous-schema-94>
                    x-parser-schema-id: <anonymous-schema-90>
                x-parser-schema-id: <anonymous-schema-85>
              x-parser-schema-id: <anonymous-schema-84>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-82>
        title: Cancel Orders COID Response
        description: Server responds with cancel result for each client order ID
        example: |-
          {
            "id": 3,
            "data": [
              {
                "status": "ok",
                "oid": 1234567890,
                "coid": "550e8400e29b41d4a716446655440000"
              },
              {
                "status": "ok",
                "oid": 1234567891,
                "coid": "550e8400e29b41d4a716446655440001"
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
    value: cancelOrdersCOID
securitySchemes: []

````