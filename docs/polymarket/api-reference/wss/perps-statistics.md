> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Statistics

> Perps WebSocket 24-hour statistics updates.



## AsyncAPI

````yaml asyncapi-perps.json statistics
id: statistics
title: Statistics
description: 24-hour statistics updates. Pushed every 1 second.
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
    id: StatisticsSubscribe
    title: Statistics subscribe
    description: Subscribe to statistics
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: >-
              Subscribe to 24-hour statistics updates for all instruments or a
              specific one
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
                description: >
                  Statistics subscription: `statistics::all` for every active
                  instrument,

                  or `statistics::{iid}` (e.g. `statistics::1`) for a specific
                  one.
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
              x-parser-schema-id: <anonymous-schema-342>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-343>
            chs:
              type: array
              description: >
                Statistics subscription: `statistics::all` for every active
                instrument,

                or `statistics::{iid}` (e.g. `statistics::1`) for a specific
                one.
              items:
                type: string
                pattern: ^statistics::(\d+|all)$
                x-parser-schema-id: <anonymous-schema-345>
              example:
                - statistics::all
              x-parser-schema-id: <anonymous-schema-344>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-341>
        title: Subscribe
        description: >-
          Subscribe to 24-hour statistics updates for all instruments or a
          specific one
        example: |-
          {
            "req": "sub",
            "chs": [
              "statistics::all"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: statistics
  - &ref_3
    id: StatisticsSubscribeResponse
    title: Statistics subscribe response
    description: Statistics subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to statistics subscribe request
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
              x-parser-schema-id: <anonymous-schema-347>
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
                        x-parser-schema-id: <anonymous-schema-351>
                    x-parser-schema-id: <anonymous-schema-350>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-353>
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
                        x-parser-schema-id: <anonymous-schema-354>
                    x-parser-schema-id: <anonymous-schema-352>
                x-parser-schema-id: <anonymous-schema-349>
              x-parser-schema-id: <anonymous-schema-348>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-346>
        title: Subscribe Response
        description: Response to statistics subscribe request
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
    id: StatisticsUnsubscribe
    title: Statistics unsubscribe
    description: Unsubscribe from statistics
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from statistics updates
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
                description: >
                  Statistics subscription: `statistics::all` for every active
                  instrument,

                  or `statistics::{iid}` (e.g. `statistics::1`) for a specific
                  one.
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
              x-parser-schema-id: <anonymous-schema-356>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-357>
            chs:
              type: array
              description: >
                Statistics subscription: `statistics::all` for every active
                instrument,

                or `statistics::{iid}` (e.g. `statistics::1`) for a specific
                one.
              items:
                type: string
                pattern: ^statistics::(\d+|all)$
                x-parser-schema-id: <anonymous-schema-359>
              example:
                - statistics::all
              x-parser-schema-id: <anonymous-schema-358>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-355>
        title: Unsubscribe
        description: Unsubscribe from statistics updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "statistics::all"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: StatisticsUnsubscribeResponse
    title: Statistics unsubscribe response
    description: Statistics unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to statistics unsubscribe request
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
              x-parser-schema-id: <anonymous-schema-361>
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
                        x-parser-schema-id: <anonymous-schema-365>
                    x-parser-schema-id: <anonymous-schema-364>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-367>
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
                        x-parser-schema-id: <anonymous-schema-368>
                    x-parser-schema-id: <anonymous-schema-366>
                x-parser-schema-id: <anonymous-schema-363>
              x-parser-schema-id: <anonymous-schema-362>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-360>
        title: Unsubscribe Response
        description: Response to statistics unsubscribe request
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
    id: StatisticsUpdate
    title: Statistics update
    description: Receive statistics updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: 24-hour statistics for subscribed instruments
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
                description: Array of statistics objects
                required: true
                properties:
                  - name: iid
                    type: integer
                    description: Instrument ID
                    required: true
                  - name: vol
                    type: string
                    description: 24-hour trading volume in contracts
                    required: true
                  - name: open
                    type: string
                    description: Opening price from 24 hours ago
                    required: true
                  - name: klines
                    type: array
                    description: Last 24-hour kline data
                    required: true
                    properties:
                      - name: item
                        type: array
                        description: |
                          - `1767225600000` - Open time
                          - `"100.00"` - Open price
                          - `"105.00"` - High price
                          - `"99.00"` - Low price
                          - `"102.00"` - Close price
                          - `"500.00"` - Volume (base unit)
                          - `42` - Number of trades
                        required: false
        headers: []
        jsonPayloadSchema:
          title: Statistics Update
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
              x-parser-schema-id: <anonymous-schema-370>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-371>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-372>
            data:
              type: object
              description: Array of statistics objects
              properties:
                iid:
                  type: integer
                  description: Instrument ID
                  example: 1
                  x-parser-schema-id: <anonymous-schema-374>
                vol:
                  type: string
                  description: 24-hour trading volume in contracts
                  example: '1000.00'
                  x-parser-schema-id: <anonymous-schema-375>
                open:
                  type: string
                  description: Opening price from 24 hours ago
                  example: '100.50'
                  x-parser-schema-id: <anonymous-schema-376>
                klines:
                  type: array
                  items:
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
                    x-parser-schema-id: <anonymous-schema-378>
                  description: Last 24-hour kline data
                  x-parser-schema-id: <anonymous-schema-377>
              required:
                - iid
                - vol
                - open
                - klines
              x-parser-schema-id: <anonymous-schema-373>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-369>
        title: Update
        description: 24-hour statistics for subscribed instruments
        example: |-
          {
            "ch": "statistics::all",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": [
              {
                "iid": 1,
                "vol": "1000.00",
                "open": "100.50",
                "klines": [
                  [
                    1767225600000,
                    "100.00",
                    "105.00",
                    "99.00",
                    "102.00",
                    "500.00",
                    42
                  ]
                ]
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
    value: statistics
securitySchemes: []

````