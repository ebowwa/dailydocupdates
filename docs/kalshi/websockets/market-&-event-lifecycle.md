<!--
Source: https://docs.kalshi.com/websockets/market-&-event-lifecycle.md
Downloaded: 2026-03-25T20:15:21.274Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.kalshi.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Market & Event Lifecycle

> Market state changes and event creation notifications.

**Requirements:**
- No additional channel-level authentication beyond the authenticated WebSocket connection
- Receives all market and event lifecycle notifications (`market_ticker` filters are not supported)
- Event creation notifications

**Use case:** Tracking market lifecycle including creation, de(activation), close date changes, determination, settlement, fractional trading updates, and price level structure changes




## AsyncAPI

````yaml asyncapi.yaml market_lifecycle_v2
id: market_lifecycle_v2
title: Market & Event Lifecycle
description: >
  Market state changes and event creation notifications.


  **Requirements:**

  - No additional channel-level authentication beyond the authenticated
  WebSocket connection

  - Receives all market and event lifecycle notifications (`market_ticker`
  filters are not supported)

  - Event creation notifications


  **Use case:** Tracking market lifecycle including creation, de(activation),
  close date changes, determination, settlement, fractional trading updates, and
  price level structure changes
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
              close_date_updated, determined, settled,
              fractional_trading_updated, price_level_structure_updated)
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

                      - `fractional_trading_updated` - Market fractional trading
                      setting changed

                      - `price_level_structure_updated` - Market price level
                      structure changed
                    enumValues:
                      - created
                      - deactivated
                      - activated
                      - close_date_updated
                      - determined
                      - settled
                      - fractional_trading_updated
                      - price_level_structure_updated
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
                  - name: fractional_trading_enabled
                    type: boolean
                    description: >-
                      Optional - This key will exist when the market is created
                      or when fractional trading is updated. Whether fractional
                      trading is enabled for the market
                    required: false
                  - name: price_level_structure
                    type: string
                    description: >-
                      Optional - This key will exist when the market is created
                      or when the price level structure is updated. The price
                      level structure of the market
                    enumValues:
                      - linear_cent
                      - deci_cent
                      - tapered_deci_cent
                      - banded_centi_cent
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
              x-parser-schema-id: <anonymous-schema-103>
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
                  description: >
                    Field to annotate which of the event type this event is for:

                    - `created` - Market created

                    - `activated` - Market activated

                    - `deactivated` - Market deactivated

                    - `close_date_updated` - Market close date updated

                    - `determined` - Market determined

                    - `settled` - Market settled

                    - `fractional_trading_updated` - Market fractional trading
                    setting changed

                    - `price_level_structure_updated` - Market price level
                    structure changed
                  enum:
                    - created
                    - deactivated
                    - activated
                    - close_date_updated
                    - determined
                    - settled
                    - fractional_trading_updated
                    - price_level_structure_updated
                  x-parser-schema-id: <anonymous-schema-105>
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
                  x-parser-schema-id: <anonymous-schema-106>
                close_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    created OR when the close date is updated. Unix timestamp
                    for when the market is scheduled to close (in seconds). Will
                    be updated in case of early determination markets
                  format: int64
                  x-parser-schema-id: <anonymous-schema-107>
                result:
                  type: string
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Result of the market
                  x-parser-schema-id: <anonymous-schema-108>
                determination_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Unix timestamp for when the market is determined
                    (in seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-109>
                settlement_value:
                  type: string
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    determined. Settlement value of the market in fixed-point
                    dollars (e.g. "0.5000")
                  x-parser-schema-id: <anonymous-schema-110>
                settled_ts:
                  type: integer
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    settled. Unix timestamp for when the market is settled (in
                    seconds)
                  format: int64
                  x-parser-schema-id: <anonymous-schema-111>
                is_deactivated:
                  type: boolean
                  description: >-
                    Optional - This key will ONLY exist when the market is
                    paused/unpaused. Boolean flag to indicate if trading is
                    paused on an open market. This should only be interpreted
                    for an open market
                  x-parser-schema-id: <anonymous-schema-112>
                fractional_trading_enabled:
                  type: boolean
                  description: >-
                    Optional - This key will exist when the market is created or
                    when fractional trading is updated. Whether fractional
                    trading is enabled for the market
                  x-parser-schema-id: <anonymous-schema-113>
                price_level_structure:
                  type: string
                  description: >-
                    Optional - This key will exist when the market is created or
                    when the price level structure is updated. The price level
                    structure of the market
                  enum:
                    - linear_cent
                    - deci_cent
                    - tapered_deci_cent
                    - banded_centi_cent
                  x-parser-schema-id: <anonymous-schema-114>
                additional_metadata:
                  type: object
                  description: >-
                    Optional - This key will only be emitted when the market is
                    created
                  properties:
                    name:
                      type: string
                      x-parser-schema-id: <anonymous-schema-116>
                    title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-117>
                    yes_sub_title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-118>
                    no_sub_title:
                      type: string
                      x-parser-schema-id: <anonymous-schema-119>
                    rules_primary:
                      type: string
                      x-parser-schema-id: <anonymous-schema-120>
                    rules_secondary:
                      type: string
                      x-parser-schema-id: <anonymous-schema-121>
                    can_close_early:
                      type: boolean
                      x-parser-schema-id: <anonymous-schema-122>
                    event_ticker:
                      type: string
                      x-parser-schema-id: <anonymous-schema-123>
                    expected_expiration_ts:
                      type: integer
                      format: int64
                      x-parser-schema-id: <anonymous-schema-124>
                    strike_type:
                      type: string
                      x-parser-schema-id: <anonymous-schema-125>
                    floor_strike:
                      type: number
                      x-parser-schema-id: <anonymous-schema-126>
                    cap_strike:
                      type: number
                      x-parser-schema-id: <anonymous-schema-127>
                    custom_strike:
                      type: object
                      x-parser-schema-id: <anonymous-schema-128>
                  x-parser-schema-id: <anonymous-schema-115>
              x-parser-schema-id: <anonymous-schema-104>
          x-parser-schema-id: marketLifecycleV2Payload
        title: Market Lifecycle V2
        description: >-
          Market lifecycle events (created, activated, deactivated,
          close_date_updated, determined, settled, fractional_trading_updated,
          price_level_structure_updated)
        example: |-
          {
            "type": "market_lifecycle_v2",
            "sid": 13,
            "msg": {
              "market_ticker": "INXD-23SEP14-B4487",
              "event_type": "created",
              "open_ts": 1694635200,
              "close_ts": 1694721600,
              "fractional_trading_enabled": false,
              "price_level_structure": "linear_cent",
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
                    enumValues:
                      - MECNET
                      - DIRECNET
                      - ''
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
              x-parser-schema-id: <anonymous-schema-129>
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
                  x-parser-schema-id: <anonymous-schema-131>
                title:
                  type: string
                  description: Title of event
                  x-parser-schema-id: <anonymous-schema-132>
                subtitle:
                  type: string
                  description: Subtitle of event
                  x-parser-schema-id: <anonymous-schema-133>
                collateral_return_type:
                  type: string
                  description: >-
                    Collateral return type, MECNET or DIRECNET of the event.
                    Empty if there is no collateral return scheme for the event
                  enum:
                    - MECNET
                    - DIRECNET
                    - ''
                  x-parser-schema-id: <anonymous-schema-134>
                series_ticker:
                  type: string
                  description: Series ticker for the event
                  x-parser-schema-id: <anonymous-schema-135>
                strike_date:
                  type: integer
                  description: >-
                    Optional - Unix timestamp to indicate the strike date of the
                    event if there is one
                  format: int64
                  x-parser-schema-id: <anonymous-schema-136>
                strike_period:
                  type: string
                  description: >-
                    Optional - String to indicate the strike period of the event
                    if there is one
                  x-parser-schema-id: <anonymous-schema-137>
              x-parser-schema-id: <anonymous-schema-130>
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

Built with [Mintlify](https://mintlify.com).