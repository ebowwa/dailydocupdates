> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Update Leverage

> Perps WebSocket leverage updates.



## AsyncAPI

````yaml asyncapi-perps.json updateLeverage
id: updateLeverage
title: Update Leverage
description: |
  Set leverage and margin type for an instrument.
  Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).

  <Badge color="gray" size="md">Action Weight: **1**</Badge>
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
    id: UpdateLeverageSend
    title: Update leverage send
    description: Update leverage
    type: receive
    messages:
      - &ref_3
        id: Request
        contentType: application/json
        payload:
          - name: Update Leverage Request
            description: Client submits a signed leverage update request
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
                      - updateLeverage
                    required: true
                  - name: args
                    type: object
                    required: true
                    properties:
                      - name: iid
                        type: integer
                        description: Instrument ID
                        required: true
                      - name: lev
                        type: integer
                        description: Leverage
                        required: true
                      - name: cross
                        type: boolean
                        description: Whether to use cross margin mode
                        required: true
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
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-114>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-115>
            op:
              type: object
              required:
                - type
                - args
              properties:
                type:
                  type: string
                  enum:
                    - updateLeverage
                  x-parser-schema-id: <anonymous-schema-117>
                args:
                  type: object
                  required:
                    - iid
                    - lev
                    - cross
                  properties:
                    iid:
                      type: integer
                      description: Instrument ID
                      example: 1
                      x-parser-schema-id: <anonymous-schema-119>
                    lev:
                      type: integer
                      description: Leverage
                      example: 10
                      x-parser-schema-id: <anonymous-schema-120>
                    cross:
                      type: boolean
                      description: Whether to use cross margin mode
                      x-parser-schema-id: <anonymous-schema-121>
                  x-parser-schema-id: <anonymous-schema-118>
              x-parser-schema-id: <anonymous-schema-116>
            sig:
              type: string
              description: Signature in hex format
              example: 0x1234567890...
              x-parser-schema-id: <anonymous-schema-122>
            salt:
              type: integer
              description: Salt
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-123>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-124>
          required:
            - req
            - op
            - sig
            - salt
            - ts
          x-parser-schema-id: <anonymous-schema-113>
        title: Update Leverage Request
        description: Client submits a signed leverage update request
        example: |-
          {
            "req": "post",
            "op": {
              "type": "updateLeverage",
              "args": {
                "iid": 1,
                "lev": 10
              }
            },
            "sig": "0x1234567890...",
            "salt": 1234567890,
            "ts": 1767225600000
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Request
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: updateLeverage
  - &ref_2
    id: UpdateLeverageReceive
    title: Update leverage receive
    description: Update leverage response
    type: send
    messages:
      - &ref_4
        id: Response
        contentType: application/json
        payload:
          - name: Update Leverage Response
            description: Server responds with leverage update result
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: object
                required: true
                properties:
                  - name: status
                    type: string
                    enumValues:
                      - ok
                    required: true
                  - name: status
                    type: string
                    enumValues:
                      - err
                    required: true
                  - name: error
                    type: string
                    description: >-
                      Error identifier. For domain rejections and transport
                      errors (`401`/`404`/`429`/`500`) this is a stable,
                      machine-readable snake_case identifier that is part of the
                      API contract and safe to branch on, e.g.
                      `insufficient_margin`, `insufficient_balance`,
                      `order_not_found`, `reduce_only_invalid`, `unauthorized`,
                      `not_found`. For `400` it is a human-readable validation
                      detail whose wording may change. See the Error handling
                      guide for the domain identifiers. (Post-only /
                      Fill-or-Kill outcomes are order statuses such as
                      `post_only_rejected`, not rejections.)
                    required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Response
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-126>
            data:
              oneOf:
                - type: object
                  required:
                    - status
                  properties:
                    status:
                      type: string
                      enum:
                        - ok
                      x-parser-schema-id: <anonymous-schema-129>
                  x-parser-schema-id: <anonymous-schema-128>
                - type: object
                  required:
                    - status
                    - error
                  properties:
                    status:
                      type: string
                      enum:
                        - err
                      x-parser-schema-id: <anonymous-schema-131>
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
                      x-parser-schema-id: <anonymous-schema-132>
                  x-parser-schema-id: <anonymous-schema-130>
              x-parser-schema-id: <anonymous-schema-127>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-125>
        title: Update Leverage Response
        description: Server responds with leverage update result
        example: |-
          {
            "id": 6,
            "data": {
              "status": "ok"
            }
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
    value: updateLeverage
securitySchemes: []

````