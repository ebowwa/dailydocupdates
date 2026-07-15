> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Auto Cancel

> Perps WebSocket dead man's switch updates.



## AsyncAPI

````yaml asyncapi-perps.json autoCancel
id: autoCancel
title: Auto-Cancel
description: |
  Arm or clear the per-account auto-cancel schedule.
  Requires proxy signature, see [proxy signing](/http/signing#2-proxy-signing).

  <Badge color="gray" size="md">Action Weight: **10**</Badge>
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
    id: AutoCancelSend
    title: Auto cancel send
    description: Set or clear auto-cancel
    type: receive
    messages:
      - &ref_3
        id: Request
        contentType: application/json
        payload:
          - name: Auto-Cancel Request
            description: Client submits a signed auto-cancel request
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
                      - autoCancel
                    required: true
                  - name: args
                    type: object
                    required: true
                    properties:
                      - name: time
                        type: integer
                        description: Timestamp in milliseconds
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
              x-parser-schema-id: <anonymous-schema-96>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-97>
            op:
              type: object
              required:
                - type
                - args
              properties:
                type:
                  type: string
                  enum:
                    - autoCancel
                  x-parser-schema-id: <anonymous-schema-99>
                args:
                  type: object
                  required:
                    - time
                  properties:
                    time:
                      type: integer
                      description: Timestamp in milliseconds
                      example: 1767225600000
                      x-parser-schema-id: <anonymous-schema-101>
                  x-parser-schema-id: <anonymous-schema-100>
              x-parser-schema-id: <anonymous-schema-98>
            sig:
              type: string
              description: Signature in hex format
              example: 0x1234567890...
              x-parser-schema-id: <anonymous-schema-102>
            salt:
              type: integer
              description: Salt
              example: 1234567890
              x-parser-schema-id: <anonymous-schema-103>
            ts:
              type: integer
              description: >-
                Request timestamp. Unix milliseconds for most operations; Unix
                seconds for withdrawals (must match the on-chain EIP-712 struct
                verified against block.timestamp).
              example: 1767225600000
              x-parser-schema-id: <anonymous-schema-104>
          required:
            - req
            - op
            - sig
            - salt
            - ts
          x-parser-schema-id: <anonymous-schema-95>
        title: Auto-Cancel Request
        description: Client submits a signed auto-cancel request
        example: |-
          {
            "req": "post",
            "op": {
              "type": "autoCancel",
              "args": {
                "time": 1767225600000
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
        value: autoCancel
  - &ref_2
    id: AutoCancelReceive
    title: Auto cancel receive
    description: Auto-cancel response
    type: send
    messages:
      - &ref_4
        id: Response
        contentType: application/json
        payload:
          - name: Auto-Cancel Response
            description: Server responds with auto-cancel result
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
              x-parser-schema-id: <anonymous-schema-106>
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
                      x-parser-schema-id: <anonymous-schema-109>
                  x-parser-schema-id: <anonymous-schema-108>
                - type: object
                  required:
                    - status
                    - error
                  properties:
                    status:
                      type: string
                      enum:
                        - err
                      x-parser-schema-id: <anonymous-schema-111>
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
                      x-parser-schema-id: <anonymous-schema-112>
                  x-parser-schema-id: <anonymous-schema-110>
              x-parser-schema-id: <anonymous-schema-107>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-105>
        title: Auto-Cancel Response
        description: Server responds with auto-cancel result
        example: |-
          {
            "id": 5,
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
    value: autoCancel
securitySchemes: []

````