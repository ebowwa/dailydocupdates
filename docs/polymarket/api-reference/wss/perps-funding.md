> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Funding

> Perps WebSocket private funding updates.



## AsyncAPI

````yaml asyncapi-perps.json funding
id: funding
title: Funding
description: >-
  Real-time funding payment updates. Requires authentication, see
  [Auth](/ws/auth).
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
    id: FundingSubscribe
    title: Funding subscribe
    description: Subscribe to funding
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to private funding payment updates (requires prior auth)
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
                description: 'Funding private channel: "funding"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - funding
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-475>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-476>
            chs:
              type: array
              description: 'Funding private channel: "funding"'
              items:
                type: string
                enum:
                  - funding
                x-parser-schema-id: <anonymous-schema-478>
              example:
                - funding
              x-parser-schema-id: <anonymous-schema-477>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-474>
        title: Subscribe
        description: Subscribe to private funding payment updates (requires prior auth)
        example: |-
          {
            "req": "sub",
            "chs": [
              "funding"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: funding
  - &ref_3
    id: FundingSubscribeResponse
    title: Funding subscribe response
    description: Funding subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to funding subscribe request
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
              x-parser-schema-id: <anonymous-schema-480>
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
                        x-parser-schema-id: <anonymous-schema-484>
                    x-parser-schema-id: <anonymous-schema-483>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-486>
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
                        x-parser-schema-id: <anonymous-schema-487>
                    x-parser-schema-id: <anonymous-schema-485>
                x-parser-schema-id: <anonymous-schema-482>
              x-parser-schema-id: <anonymous-schema-481>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-479>
        title: Subscribe Response
        description: Response to funding subscribe request
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
    id: FundingUnsubscribe
    title: Funding unsubscribe
    description: Unsubscribe from funding
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from private funding updates
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
                description: 'Funding private channel: "funding"'
                required: true
                properties:
                  - name: item
                    type: string
                    enumValues:
                      - funding
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-489>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-490>
            chs:
              type: array
              description: 'Funding private channel: "funding"'
              items:
                type: string
                enum:
                  - funding
                x-parser-schema-id: <anonymous-schema-492>
              example:
                - funding
              x-parser-schema-id: <anonymous-schema-491>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-488>
        title: Unsubscribe
        description: Unsubscribe from private funding updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "funding"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: FundingUnsubscribeResponse
    title: Funding unsubscribe response
    description: Funding unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to funding unsubscribe request
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
              x-parser-schema-id: <anonymous-schema-494>
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
                        x-parser-schema-id: <anonymous-schema-498>
                    x-parser-schema-id: <anonymous-schema-497>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-500>
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
                        x-parser-schema-id: <anonymous-schema-501>
                    x-parser-schema-id: <anonymous-schema-499>
                x-parser-schema-id: <anonymous-schema-496>
              x-parser-schema-id: <anonymous-schema-495>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-493>
        title: Unsubscribe Response
        description: Response to funding unsubscribe request
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
    id: FundingUpdate
    title: Funding update
    description: Receive funding updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Real-time funding payment updates for authenticated users
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
                description: Array of funding objects
                required: true
                properties:
                  - name: iid
                    type: integer
                    description: Instrument ID
                    required: true
                  - name: sz
                    type: string
                    description: >-
                      Signed position size in no. of contracts (positive = long,
                      negative = short)
                    required: true
                  - name: fr
                    type: string
                    description: Funding rate
                    required: true
                  - name: fund
                    type: string
                    description: Funding paid in USD
                    required: true
                  - name: fua
                    type: string
                    description: Funding asset name
                    required: true
                  - name: ts
                    type: integer
                    description: >-
                      Request timestamp. Unix milliseconds for most operations;
                      Unix seconds for withdrawals (must match the on-chain
                      EIP-712 struct verified against block.timestamp).
                    required: true
        headers: []
        jsonPayloadSchema:
          title: Funding Update
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
              x-parser-schema-id: <anonymous-schema-503>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-504>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-505>
            data:
              type: object
              description: Array of funding objects
              properties:
                iid:
                  type: integer
                  description: Instrument ID
                  example: 1
                  x-parser-schema-id: <anonymous-schema-507>
                sz:
                  type: string
                  description: >-
                    Signed position size in no. of contracts (positive = long,
                    negative = short)
                  example: '10.00'
                  x-parser-schema-id: <anonymous-schema-508>
                fr:
                  type: string
                  description: Funding rate
                  example: '0.0001'
                  x-parser-schema-id: <anonymous-schema-509>
                fund:
                  type: string
                  description: Funding paid in USD
                  example: '1.00'
                  x-parser-schema-id: <anonymous-schema-510>
                fua:
                  type: string
                  description: Funding asset name
                  example: USDC
                  x-parser-schema-id: <anonymous-schema-511>
                ts:
                  type: integer
                  description: >-
                    Request timestamp. Unix milliseconds for most operations;
                    Unix seconds for withdrawals (must match the on-chain
                    EIP-712 struct verified against block.timestamp).
                  example: 1767225600000
                  x-parser-schema-id: <anonymous-schema-512>
              required:
                - iid
                - sz
                - fr
                - fund
                - fua
                - ts
              x-parser-schema-id: <anonymous-schema-506>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-502>
        title: Update
        description: Real-time funding payment updates for authenticated users
        example: |-
          {
            "ch": "funding",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": [
              {
                "iid": 1,
                "sz": "10.00",
                "fr": "0.0001",
                "fund": "1.00",
                "fua": "USDC",
                "ts": 1767225600000
              }
            ]
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
    value: funding
securitySchemes: []

````