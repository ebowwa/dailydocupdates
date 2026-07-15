> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Book

> Perps WebSocket order book updates.



## AsyncAPI

````yaml asyncapi-perps.json book
id: book
title: Book
description: Order book snapshot updates. Pushed every 100ms.
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
    id: BookSubscribe
    title: Book subscribe
    description: Subscribe to book
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to order book updates for an instrument
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
              - name: chs
                type: array
                description: Book subscription in format "book::{iid}" (e.g., "book::1")
                required: true
                properties:
                  - name: item
                    type: string
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-228>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-229>
            chs:
              type: array
              description: Book subscription in format "book::{iid}" (e.g., "book::1")
              items:
                type: string
                pattern: ^book::\d+$
                x-parser-schema-id: <anonymous-schema-231>
              example:
                - book::1
              x-parser-schema-id: <anonymous-schema-230>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-227>
        title: Subscribe
        description: Subscribe to order book updates for an instrument
        example: |-
          {
            "req": "sub",
            "chs": [
              "book::1"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: book
  - &ref_3
    id: BookSubscribeResponse
    title: Book subscribe response
    description: Book subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to book subscribe request
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: array
                title: Subscribe Response
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
              x-parser-schema-id: <anonymous-schema-233>
            data:
              title: Subscribe Response
              type: array
              items:
                oneOf:
                  - type: object
                    required:
                      - status
                    properties:
                      status:
                        type: string
                        enum:
                          - ok
                        x-parser-schema-id: <anonymous-schema-237>
                    x-parser-schema-id: <anonymous-schema-236>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-239>
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
                        x-parser-schema-id: <anonymous-schema-240>
                    x-parser-schema-id: <anonymous-schema-238>
                x-parser-schema-id: <anonymous-schema-235>
              x-parser-schema-id: <anonymous-schema-234>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-232>
        title: Subscribe Response
        description: Response to book subscribe request
        example: |-
          {
            "data": []
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeResponse
    bindings: []
    extensions: *ref_0
  - &ref_2
    id: BookUnsubscribe
    title: Book unsubscribe
    description: Unsubscribe from book
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from order book updates
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
              - name: chs
                type: array
                description: Book subscription in format "book::{iid}" (e.g., "book::1")
                required: true
                properties:
                  - name: item
                    type: string
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-242>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-243>
            chs:
              type: array
              description: Book subscription in format "book::{iid}" (e.g., "book::1")
              items:
                type: string
                pattern: ^book::\d+$
                x-parser-schema-id: <anonymous-schema-245>
              example:
                - book::1
              x-parser-schema-id: <anonymous-schema-244>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-241>
        title: Unsubscribe
        description: Unsubscribe from order book updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "book::1"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: BookUnsubscribeResponse
    title: Book unsubscribe response
    description: Book unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to book unsubscribe request
            type: object
            properties:
              - name: id
                type: integer
                description: Correlation ID for request-response matching
                required: false
              - name: data
                type: array
                title: Subscribe Response
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
              x-parser-schema-id: <anonymous-schema-247>
            data:
              title: Subscribe Response
              type: array
              items:
                oneOf:
                  - type: object
                    required:
                      - status
                    properties:
                      status:
                        type: string
                        enum:
                          - ok
                        x-parser-schema-id: <anonymous-schema-251>
                    x-parser-schema-id: <anonymous-schema-250>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-253>
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
                        x-parser-schema-id: <anonymous-schema-254>
                    x-parser-schema-id: <anonymous-schema-252>
                x-parser-schema-id: <anonymous-schema-249>
              x-parser-schema-id: <anonymous-schema-248>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-246>
        title: Unsubscribe Response
        description: Response to book unsubscribe request
        example: |-
          {
            "data": []
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeResponse
    bindings: []
    extensions: *ref_0
  - &ref_5
    id: BookUpdate
    title: Book update
    description: Receive book updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Real-time order book updates for subscribed instruments
            type: object
            properties:
              - name: ch
                type: string
                description: >-
                  Channel name for push data. Parameterized channels include the
                  instrument ID (e.g. "trades::1", "book::1", "klines::1::1m",
                  "tickers::all"). Private channels use plain names (e.g.
                  "fills", "orders").
                required: true
              - name: ts
                type: integer
                description: >-
                  Request timestamp. Unix milliseconds for most operations; Unix
                  seconds for withdrawals (must match the on-chain EIP-712
                  struct verified against block.timestamp).
                required: true
              - name: sq
                type: integer
                description: Sequence number
                required: true
              - name: data
                type: object
                required: true
                properties:
                  - name: b
                    type: array
                    description: Bid levels
                    required: true
                    properties:
                      - name: item
                        type: array
                        description: |
                          - `"100.00"` - Price
                          - `"10.00"` - Quantity
                        required: false
                        properties:
                          - name: item
                            type: string
                            required: false
                  - name: a
                    type: array
                    description: Ask levels
                    required: true
                    properties:
                      - name: item
                        type: array
                        description: |
                          - `"100.00"` - Price
                          - `"10.00"` - Quantity
                        required: false
                        properties:
                          - name: item
                            type: string
                            required: false
        headers: []
        jsonPayloadSchema:
          title: Book Update
          type: object
          properties:
            ch:
              type: string
              description: >-
                Channel name for push data. Parameterized channels include the
                instrument ID (e.g. "trades::1", "book::1", "klines::1::1m",
                "tickers::all"). Private channels use plain names (e.g. "fills",
                "orders").
              example: trades::1
              x-parser-schema-id: <anonymous-schema-256>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-257>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-258>
            data:
              type: object
              required:
                - b
                - a
              properties:
                b:
                  type: array
                  items:
                    type: array
                    items:
                      type: string
                      x-parser-schema-id: <anonymous-schema-262>
                    maxItems: 2
                    description: |
                      - `"100.00"` - Price
                      - `"10.00"` - Quantity
                    example:
                      - '100.00'
                      - '10.00'
                    x-parser-schema-id: <anonymous-schema-261>
                  description: Bid levels
                  x-parser-schema-id: <anonymous-schema-260>
                a:
                  type: array
                  items:
                    type: array
                    items:
                      type: string
                      x-parser-schema-id: <anonymous-schema-265>
                    maxItems: 2
                    description: |
                      - `"100.00"` - Price
                      - `"10.00"` - Quantity
                    example:
                      - '100.00'
                      - '10.00'
                    x-parser-schema-id: <anonymous-schema-264>
                  description: Ask levels
                  x-parser-schema-id: <anonymous-schema-263>
              x-parser-schema-id: <anonymous-schema-259>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-255>
        title: Update
        description: Real-time order book updates for subscribed instruments
        example: |-
          {
            "ch": "book::1",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": {
              "b": [
                [
                  "100.00",
                  "10.00"
                ]
              ],
              "a": [
                [
                  "100.00",
                  "10.00"
                ]
              ]
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Update
    bindings: []
    extensions: *ref_0
sendOperations:
  - *ref_1
  - *ref_2
receiveOperations:
  - *ref_3
  - *ref_4
  - *ref_5
sendMessages:
  - *ref_6
  - *ref_7
receiveMessages:
  - *ref_8
  - *ref_9
  - *ref_10
extensions:
  - id: x-parser-unique-object-id
    value: book
securitySchemes: []

````