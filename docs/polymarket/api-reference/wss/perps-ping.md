> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Ping

> Perps WebSocket heartbeat.



## AsyncAPI

````yaml asyncapi-perps.json ping
id: ping
title: Ping
description: >-
  Connections are automatically closed after 60 seconds of inactivity. Send a
  ping message periodically to keep the connection alive.
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
    id: PingSend
    title: Ping send
    description: Send ping
    type: receive
    messages:
      - &ref_3
        id: Request
        contentType: application/json
        payload:
          - name: Ping
            description: Client sends ping to test connection and keep alive
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
                      - ping
                    required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Request
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-2>
            req:
              type: string
              description: Request type
              enum:
                - post
                - sub
                - unsub
              x-parser-schema-id: <anonymous-schema-3>
            op:
              type: object
              required:
                - type
              properties:
                type:
                  type: string
                  enum:
                    - ping
                  x-parser-schema-id: <anonymous-schema-5>
              x-parser-schema-id: <anonymous-schema-4>
          required:
            - req
            - op
          x-parser-schema-id: <anonymous-schema-1>
        title: Ping
        description: Client sends ping to test connection and keep alive
        example: |-
          {
            "req": "post",
            "op": {
              "type": "ping"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: Request
    bindings: []
    extensions: &ref_0
      - id: x-parser-unique-object-id
        value: ping
  - &ref_2
    id: PingReceive
    title: Ping receive
    description: Pong response
    type: send
    messages:
      - &ref_4
        id: Response
        contentType: application/json
        payload:
          - name: Pong
            description: Server responds with pong including connection info
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
                    description: Result status
                    enumValues:
                      - ok
                      - err
                    required: true
                  - name: ts
                    type: integer
                    description: >-
                      Request timestamp. Unix milliseconds for most operations;
                      Unix seconds for withdrawals (must match the on-chain
                      EIP-712 struct verified against block.timestamp).
                    required: true
                  - name: sq
                    type: integer
                    description: Sequence number
                    required: true
        headers: []
        jsonPayloadSchema:
          type: object
          title: Base Response
          properties:
            id:
              type: integer
              description: Correlation ID for request-response matching
              x-parser-schema-id: <anonymous-schema-7>
            data:
              type: object
              required:
                - status
                - ts
                - sq
              properties:
                status:
                  type: string
                  enum:
                    - ok
                    - err
                  description: Result status
                  x-parser-schema-id: <anonymous-schema-9>
                ts:
                  type: integer
                  description: >-
                    Request timestamp. Unix milliseconds for most operations;
                    Unix seconds for withdrawals (must match the on-chain
                    EIP-712 struct verified against block.timestamp).
                  example: 1767225600000
                  x-parser-schema-id: <anonymous-schema-10>
                sq:
                  type: integer
                  description: Sequence number
                  example: 1234567890
                  x-parser-schema-id: <anonymous-schema-11>
              x-parser-schema-id: <anonymous-schema-8>
          required:
            - data
          x-parser-schema-id: <anonymous-schema-6>
        title: Pong
        description: Server responds with pong including connection info
        example: |-
          {
            "data": {
              "status": "ok",
              "ts": 1767225600000,
              "sq": 1234567890
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
    value: ping
securitySchemes: []

````