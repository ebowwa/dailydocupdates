<!--
Source: https://docs.kalshi.com/websockets/market-&-event-lifecycle.md
Downloaded: 2026-03-03T20:11:28.687Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market & Event Lifecycle

> Market state changes and event creation notifications.

**Requirements:**
- Authentication required (authenticated WebSocket connection)
- Receives all market and event lifecycle notifications (`market_ticker` filters are not supported)
- Event creation notifications

**Use case:** Tracking market lifecycle including creation, de(activation), close date changes, determination, settlement




## AsyncAPI

````yaml asyncapi.yaml market_lifecycle_v2
id: market_lifecycle_v2
title: Market & Event Lifecycle
description: >
  Market state changes and event creation notifications.


  **Requirements:**

  - Authentication required (authenticated WebSocket connection)

  - Receives all market and event lifecycle notifications (`market_ticker`
  filters are not supported)

  - Event creation notifications


  **Use case:** Tracking market lifecycle including creation, de(activation),
  close date changes, determination, settlement
servers:
  - id: production
    protocol: wss
    host: api.elections.kalshi.com
    bindings: []
    variables: []
address: market_lifecycle_v2
parameters: []
bindings: []
operations:
  - &ref_2
    id: receiveMarketLifecycleV2
    title: Market Lifecycle Event
    description: Receive market lifecycle updates (open, close, determination, etc.)
    type: send
    messages:
      - &ref_4
        id: marketLifecycleV2
        contentType: application/json
        payload:
          - name: Market Lifecycle V2
            description: >-
              Market lifecycle events (created, activated, deactivated,
              close_date_updated, determined, settled)
            type: object
            properties:
              - name: type
                type: string
                description: market_lifecycle_v2
                required: true
              - name: sid
                type: integer
                description: >-
                  Server-generated subscription identifier (sid) used to
                  identify the channel
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: event_type
                    type: string
                    description: >
                      Field to annotate which of the event type this event is
                      for:

                      - `created` - Market created

                      - `activated` - Market activated

                      - `deactivated` - Market deactivated

                      - `close_date_updated` - Market close date updated

                      - `determined` - Market determined

                      - `settled` - Market settled
                    required: false
                  - name: market_ticker
                    type: string
                    description: Unique market identifier
                    required: false
                  - name: open_ts
                    type: integer
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      created. Unix timestamp for when the market opened (in
                      seconds)
                    required: false
                  - name: close_ts
                    type: integer
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      created OR when the close date is updated. Unix timestamp
                      for when the market is scheduled to close (in seconds).
                      Will be updated in case of early determination markets
                    required: false
                  - name: result
                    type: string
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      determined. Result of the market
                    required: false
                  - name: determination_ts
                    type: integer
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      determined. Unix timestamp for when the market is
                      determined (in seconds)
                    required: false
                  - name: settlement_value
                    type: string
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      determined. Settlement value of the market in fixed-point
                      dollars (e.g. "0.5000")
                    required: false
                  - name: settled_ts
                    type: integer
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      settled. Unix timestamp for when the market is settled (in
                      seconds)
                    required: false
                  - name: is_deactivated
                    type: boolean
                    description: >-
                      Optional - This key will ONLY exist when the market is
                      paused/unpaused. Boolean flag to indicate if trading is
                      paused on an open market. This should only be interpreted
                      for an open market
                    required: false
                  - name: additional_metadata
                    type: object
                    description: >-
                      Optional - This key will only be emitted when the market
                      is created
                    required: false
                    properties:
                      - name: name
                        type: string
                        required: false
                      - name: title
                        type: string
                        required: false
                      - name: yes_sub_title
                        type: string
                        required: false
                      - name: no_sub_title
                        type: string
                        required: false
                      - name: rules_primary
                        type: string
                        required: false
                      - name: rules_secondary
                        type: string
                        required: false
                      - name: can_close_early
                        type: boolean
                        required: false
                      - name: event_ticker
                        type: string
                        required: false
                      - name: expected_expiration_ts
                        type: integer
                        required: false
                      - name: strike_type
                        type: string
                        required: false
                      - name: floor_strike
                        type: number
                        required: false
                      - name: cap_strike
                        type: number
                        required: false
                      - name: custom_strike
                        type: object
                        required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
            - sid
            - msg
          properties:
            type:
              type: string
              const: market_lifecycle_v2
              x-parser-schema-id: <anonymous-schema-134>
            sid: &ref_0
              type: integer
              description: >-
                Server-generated subscription identifier (sid) used to identify
                the channel
              minimum: 1
              x-parser-schema-id: subscriptionId
            msg:
              type: object
              required:
                - event_type
                - market_ticker
              properties:
                event_type:
                  type: string
                  description: |
                    Field to annotate which of the event type this event is for:
                    - `created` - Market created
                    - `activated` - Market activated
                    - `deactivated` - Market deactivated
                    - `close_date_updated` - Market close date updated
                    - `determined` - Market determined
                    - `settled` - Market settled
                  enum:
                    - created
                    - deactivated
                    - activated
                    - close_date_updated
                    - determined
                    - settled
                  x-parser-schema-id: <anonymous-schema-136>
                market_ticker:
                  type: string
                  description: Unique market identifier
                  pattern: ^[A-Z0-9-]+$
                  examples:
                    - FED-23DEC-T3.00
                    - HIGHNY-22DEC23-B53.5
                  x-parser-schema-id: marketTicker
                open_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    created. Unix timestamp for when the market opened (in
                    seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-137>
                close_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    created OR when the close date is updated. Unix timestamp
                    for when the market is scheduled to close (in seconds). Will
                    be updated in case of early determination markets
                  format: int64
                  x-parser-schema-id: <anonymous-schema-138>
                result:
                  type: string
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Result of the market
                  x-parser-schema-id: <anonymous-schema-139>
                determination_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Unix timestamp for when the market is determined
                    (in seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-140>
                settlement_value:
                  type: string
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Settlement value of the market in fixed-point
                    dollars (e.g. "0.5000")
                  x-parser-schema-id: <anonymous-schema-141>
                settled_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    settled. Unix timestamp for when the market is settled (in
                    seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-142>
                is_deactivated:
                  type: boolean
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    paused/unpaused. Boolean flag to indicate if trading is
                    paused on an open market. This should only be interpreted
                    for an open market
                  x-parser-schema-id: <anonymous-schema-143>
                additional_metadata:
                  type: object
                  description: >-
                    Optional - This key will only be emitted when the market is
                    created
                  properties:
                    name:
                      type: string
                      x-parser-schema-id: <anonymous-schema-145>
                    title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-146>
                    yes_sub_title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-147>
                    no_sub_title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-148>
                    rules_primary:
                      type: string
                      x-parser-schema-id: <anonymous-schema-149>
                    rules_secondary:
                      type: string
                      x-parser-schema-id: <anonymous-schema-150>
                    can_close_early:
                      type: boolean
                      x-parser-schema-id: <anonymous-schema-151>
                    event_ticker:
                      type: string
                      x-parser-schema-id: <anonymous-schema-152>
                    expected_expiration_ts:
                      type: integer
                      format: int64
                      x-parser-schema-id: <anonymous-schema-153>
                    strike_type:
                      type: string
                      x-parser-schema-id: <anonymous-schema-154>
                    floor_strike:
                      type: number
                      x-parser-schema-id: <anonymous-schema-155>
                    cap_strike:
                      type: number
                      x-parser-schema-id: <anonymous-schema-156>
                    custom_strike:
                      type: object
                      x-parser-schema-id: <anonymous-schema-157>
                  x-parser-schema-id: <anonymous-schema-144>
              x-parser-schema-id: <anonymous-schema-135>
          x-parser-schema-id: marketLifecycleV2Payload
        title: Market Lifecycle V2
        description: >-
          Market lifecycle events (created, activated, deactivated,
          close_date_updated, determined, settled)
        example: |-
          {
            "type": "market_lifecycle_v2",
            "sid": 13,
            "msg": {
              "market_ticker": "INXD-23SEP14-B4487",
              "event_type": "created",
              "open_ts": 1694635200,
              "close_ts": 1694721600,
              "additional_metadata": {
                "name": "S&P 500 daily return on Sep 14",
                "title": "S&P 500 closes up by 0.02% or more",
                "yes_sub_title": "S&P 500 closes up 0.02%+",
                "no_sub_title": "S&P 500 closes up <0.02%",
                "rules_primary": "The S&P 500 index level at 4:00 PM ET...",
                "rules_secondary": "",
                "can_close_early": true,
                "event_ticker": "INXD-23SEP14",
                "expected_expiration_ts": 1694721600,
                "strike_type": "greater",
                "floor_strike": 4487
              }
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: marketLifecycleV2
    bindings: []
    extensions: &ref_1
      - id: x-parser-unique-object-id
        value: market_lifecycle_v2
  - &ref_3
    id: receiveEventLifecycle
    title: Event Lifecycle
    description: Receive event creation notifications
    type: send
    messages:
      - &ref_5
        id: eventLifecycle
        contentType: application/json
        payload:
          - name: Event Lifecycle
            description: Event creation notification
            type: object
            properties:
              - name: type
                type: string
                description: event_lifecycle
                required: true
              - name: sid
                type: integer
                description: >-
                  Server-generated subscription identifier (sid) used to
                  identify the channel
                required: true
              - name: msg
                type: object
                required: true
                properties:
                  - name: event_ticker
                    type: string
                    description: Unique identifier for the event being created
                    required: false
                  - name: title
                    type: string
                    description: Title of event
                    required: false
                  - name: subtitle
                    type: string
                    description: Subtitle of event
                    required: false
                  - name: collateral_return_type
                    type: string
                    description: >-
                      Collateral return type, MECNET or DIRECNET of the event.
                      Empty if there is no collateral return scheme for the
                      event
                    required: false
                  - name: series_ticker
                    type: string
                    description: Series ticker for the event
                    required: false
                  - name: strike_date
                    type: integer
                    description: >-
                      Optional - Unix timestamp to indicate the strike date of
                      the event if there is one
                    required: false
                  - name: strike_period
                    type: string
                    description: >-
                      Optional - String to indicate the strike period of the
                      event if there is one
                    required: false
        headers: []
        jsonPayloadSchema:
          type: object
          required:
            - type
            - sid
            - msg
          properties:
            type:
              type: string
              const: event_lifecycle
              x-parser-schema-id: <anonymous-schema-158>
            sid: *ref_0
            msg:
              type: object
              required:
                - event_ticker
                - title
                - subtitle
                - collateral_return_type
                - series_ticker
              properties:
                event_ticker:
                  type: string
                  description: Unique identifier for the event being created
                  x-parser-schema-id: <anonymous-schema-160>
                title:
                  type: string
                  description: Title of event
                  x-parser-schema-id: <anonymous-schema-161>
                subtitle:
                  type: string
                  description: Subtitle of event
                  x-parser-schema-id: <anonymous-schema-162>
                collateral_return_type:
                  type: string
                  description: >-
                    Collateral return type, MECNET or DIRECNET of the event.
                    Empty if there is no collateral return scheme for the event
                  enum:
                    - MECNET
                    - DIRECNET
                    - ''
                  x-parser-schema-id: <anonymous-schema-163>
                series_ticker:
                  type: string
                  description: Series ticker for the event
                  x-parser-schema-id: <anonymous-schema-164>
                strike_date:
                  type: integer
                  description: >-
                    Optional - Unix timestamp to indicate the strike date of the
                    event if there is one
                  format: int64
                  x-parser-schema-id: <anonymous-schema-165>
                strike_period:
                  type: string
                  description: >-
                    Optional - String to indicate the strike period of the event
                    if there is one
                  x-parser-schema-id: <anonymous-schema-166>
              x-parser-schema-id: <anonymous-schema-159>
          x-parser-schema-id: eventLifecyclePayload
        title: Event Lifecycle
        description: Event creation notification
        example: |-
          {
            "type": "event_lifecycle",
            "sid": 5,
            "msg": {
              "event_ticker": "KXQUICKSETTLE-26JAN25H2150",
              "title": "What will 1+1 equal on Jan 25 at 21:50?",
              "subtitle": "Jan 25 at 21:50",
              "collateral_return_type": "MECNET",
              "series_ticker": "KXQUICKSETTLE"
            }
          }
        bindings: []
        extensions:
          - id: x-parser-unique-object-id
            value: eventLifecycle
    bindings: []
    extensions: *ref_1
sendOperations: []
receiveOperations:
  - *ref_2
  - *ref_3
sendMessages: []
receiveMessages:
  - *ref_4
  - *ref_5
extensions:
  - id: x-parser-unique-object-id
    value: market_lifecycle_v2
securitySchemes:
  - id: apiKey
    name: apiKey
    type: apiKey
    description: |
      API key authentication required for WebSocket connections.
      The API key should be provided during the WebSocket handshake.
    in: user
    extensions: []

````