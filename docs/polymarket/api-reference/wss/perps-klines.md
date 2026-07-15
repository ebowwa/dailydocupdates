> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Klines

> Perps WebSocket candle updates.



## AsyncAPI

````yaml asyncapi-perps.json klines
id: klines
title: Klines
description: Real-time kline updates.
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
    id: KlinesSubscribe
    title: Klines subscribe
    description: Subscribe to klines
    type: receive
    messages:
      - &ref_6
        id: SubscribeRequest
        contentType: application/json
        payload:
          - name: Subscribe
            description: Subscribe to kline updates for an instrument and interval
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
                description: >-
                  Klines subscription in format "klines::{iid}::{interval}"
                  (e.g., "klines::1::1m")
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
              x-parser-schema-id: <anonymous-schema-267>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-268>
            chs:
              type: array
              description: >-
                Klines subscription in format "klines::{iid}::{interval}" (e.g.,
                "klines::1::1m")
              items:
                type: string
                pattern: ^klines::\d+::(1m|5m|15m|30m|1h|4h|6h|12h|1d|1w)$
                x-parser-schema-id: <anonymous-schema-270>
              example:
                - klines::1::1m
              x-parser-schema-id: <anonymous-schema-269>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-266>
        title: Subscribe
        description: Subscribe to kline updates for an instrument and interval
        example: |-
          {
            "req": "sub",
            "chs": [
              "klines::1::1m"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: SubscribeRequest
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: klines
  - &ref_3
    id: KlinesSubscribeResponse
    title: Klines subscribe response
    description: Klines subscribe response
    type: send
    messages:
      - &ref_8
        id: SubscribeResponse
        contentType: application/json
        payload:
          - name: Subscribe Response
            description: Response to klines subscribe request
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
              x-parser-schema-id: <anonymous-schema-272>
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
                        x-parser-schema-id: <anonymous-schema-276>
                    x-parser-schema-id: <anonymous-schema-275>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-278>
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
                        x-parser-schema-id: <anonymous-schema-279>
                    x-parser-schema-id: <anonymous-schema-277>
                x-parser-schema-id: <anonymous-schema-274>
              x-parser-schema-id: <anonymous-schema-273>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-271>
        title: Subscribe Response
        description: Response to klines subscribe request
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
    id: KlinesUnsubscribe
    title: Klines unsubscribe
    description: Unsubscribe from klines
    type: receive
    messages:
      - &ref_7
        id: UnsubscribeRequest
        contentType: application/json
        payload:
          - name: Unsubscribe
            description: Unsubscribe from kline updates
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
                description: >-
                  Klines subscription in format "klines::{iid}::{interval}"
                  (e.g., "klines::1::1m")
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
              x-parser-schema-id: <anonymous-schema-281>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-282>
            chs:
              type: array
              description: >-
                Klines subscription in format "klines::{iid}::{interval}" (e.g.,
                "klines::1::1m")
              items:
                type: string
                pattern: ^klines::\d+::(1m|5m|15m|30m|1h|4h|6h|12h|1d|1w)$
                x-parser-schema-id: <anonymous-schema-284>
              example:
                - klines::1::1m
              x-parser-schema-id: <anonymous-schema-283>
          required:
            - req
            - chs
          x-parser-schema-id: <anonymous-schema-280>
        title: Unsubscribe
        description: Unsubscribe from kline updates
        example: |-
          {
            "req": "unsub",
            "chs": [
              "klines::1::1m"
            ]
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: UnsubscribeRequest
    bindings: []
    extensions: *ref_0
  - &ref_4
    id: KlinesUnsubscribeResponse
    title: Klines unsubscribe response
    description: Klines unsubscribe response
    type: send
    messages:
      - &ref_9
        id: UnsubscribeResponse
        contentType: application/json
        payload:
          - name: Unsubscribe Response
            description: Response to klines unsubscribe request
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
              x-parser-schema-id: <anonymous-schema-286>
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
                        x-parser-schema-id: <anonymous-schema-290>
                    x-parser-schema-id: <anonymous-schema-289>
                  - type: object
                    required:
                      - status
                      - error
                    properties:
                      status:
                        type: string
                        enum:
                          - err
                        x-parser-schema-id: <anonymous-schema-292>
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
                        x-parser-schema-id: <anonymous-schema-293>
                    x-parser-schema-id: <anonymous-schema-291>
                x-parser-schema-id: <anonymous-schema-288>
              x-parser-schema-id: <anonymous-schema-287>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-285>
        title: Unsubscribe Response
        description: Response to klines unsubscribe request
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
    id: KlinesUpdate
    title: Klines update
    description: Receive kline updates
    type: send
    messages:
      - &ref_10
        id: Update
        contentType: application/json
        payload:
          - name: Update
            description: Real-time kline updates for subscribed instruments
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
                type: array
                description: Array of kline arrays
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
          title: Kline Update
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
              x-parser-schema-id: <anonymous-schema-295>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-296>
            sq:
              type: integer
              description: Sequence number
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-297>
            data:
              type: array
              description: Array of kline arrays
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
                x-parser-schema-id: <anonymous-schema-299>
              x-parser-schema-id: <anonymous-schema-298>
          required:
            - ch
            - ts
            - sq
            - data
          x-parser-schema-id: <anonymous-schema-294>
        title: Update
        description: Real-time kline updates for subscribed instruments
        example: |-
          {
            "ch": "klines::1::1m",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": [
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
    value: klines
securitySchemes: []

````