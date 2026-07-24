<!--
Source: https://docs.polymarket.com/trading/wallet-activity.md
Downloaded: 2026-07-24T21:04:03.617Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Wallet Activity

> Track the positions and activity associated with a Polymarket wallet.

Use a wallet address to understand an account's current exposure and trace how
its activity has changed over time.

## Open Positions

Inspect a wallet's current outcome exposure and unrealized performance.

<Tabs>
  <Tab title="TypeScript">
    Call `listPositions()` on a `PublicClient` or `SecureClient`.

    ```ts theme={null}
    const address = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";

    const pages = client.listPositions({ user: address, pageSize: 1 });

    for await (const page of pages) {
      // page.items: Position[]
    }
    ```

    <Accordion title="Output: Position[]">
      <CodeGroup>
        ```ts Position Type theme={null}
        type Position = {
          conditionId: CtfConditionId;
          wallet?: Address | null;
          tokenId?: TokenId | null;
          size?: DecimalString | null;
          avgPrice?: DecimalString | null;
          initialValue?: DecimalString | null;
          currentValue?: DecimalString | null;
          cashPnl?: DecimalString | null;
          percentPnl?: number | null;
          totalBought?: DecimalString | null;
          realizedPnl?: DecimalString | null;
          percentRealizedPnl?: number | null;
          curPrice?: DecimalString | null;
          redeemable?: boolean | null;
          mergeable?: boolean | null;
          title?: string | null;
          slug?: string | null;
          icon?: string | null;
          eventId?: string | null;
          eventSlug?: string | null;
          outcome?: string | null;
          outcomeIndex?: number | null;
          oppositeOutcome?: string | null;
          oppositeTokenId?: TokenId | null;
          endDate?: IsoCalendarDateString | null;
          negativeRisk?: boolean | null;
        };
        ```

        ```json Position Example theme={null}
        [
          {
            "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "wallet": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "size": "125.5",
            "avgPrice": "0.42",
            "initialValue": "52.71",
            "currentValue": "61.50",
            "cashPnl": "8.79",
            "percentPnl": 16.68,
            "curPrice": "0.49",
            "title": "Will the US confirm that aliens exist before 2027?",
            "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "eventSlug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "outcome": "Yes",
            "outcomeIndex": 0,
            "redeemable": false,
            "mergeable": false
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `list_positions()` on an `AsyncPublicClient` or `AsyncSecureClient`.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    address = "0x8ba1f109551bD432803012645Ac136ddd64DBA72"

    pages = client.list_positions(user=address, page_size=1)

    async for page in pages:
        ...  # page.items: tuple[Position, ...]
    ```

    <Accordion title="Output: tuple[Position, ...]">
      <CodeGroup>
        ```python Position Type theme={null}
        class Position:
            condition_id: CtfConditionId
            wallet: EvmAddress | None
            token_id: TokenId | None
            size: Decimal | None
            avg_price: Decimal | None
            initial_value: Decimal | None
            current_value: Decimal | None
            cash_pnl: Decimal | None
            percent_pnl: float | None
            total_bought: Decimal | None
            realized_pnl: Decimal | None
            percent_realized_pnl: float | None
            cur_price: Decimal | None
            redeemable: bool | None
            mergeable: bool | None
            title: str | None
            slug: str | None
            icon: str | None
            event_id: str | None
            event_slug: str | None
            outcome: str | None
            outcome_index: int | None
            opposite_outcome: str | None
            opposite_token_id: TokenId | None
            end_date: date | None
            negative_risk: bool | None
        ```

        ```json Position Example theme={null}
        [
          {
            "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "wallet": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "size": "125.5",
            "avg_price": "0.42",
            "initial_value": "52.71",
            "current_value": "61.50",
            "cash_pnl": "8.79",
            "percent_pnl": 16.68,
            "cur_price": "0.49",
            "title": "Will the US confirm that aliens exist before 2027?",
            "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "event_slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "outcome": "Yes",
            "outcome_index": 0,
            "redeemable": false,
            "mergeable": false
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    List the open positions for a wallet:

    ```bash theme={null}
    ADDRESS="0x8ba1f109551bD432803012645Ac136ddd64DBA72"

    curl "https://data-api.polymarket.com/positions?user=$ADDRESS&limit=1"
    ```

    The response contains the wallet's open positions:

    <Accordion title="Response">
      ```json theme={null}
      [
        {
          "proxyWallet": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
          "asset": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
          "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
          "size": 125.5,
          "avgPrice": 0.42,
          "initialValue": 52.71,
          "currentValue": 61.5,
          "cashPnl": 8.79,
          "percentPnl": 16.68,
          "curPrice": 0.49,
          "title": "Will the US confirm that aliens exist before 2027?",
          "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
          "eventSlug": "will-the-us-confirm-that-aliens-exist-before-2027",
          "outcome": "Yes",
          "outcomeIndex": 0
        }
      ]
      ```
    </Accordion>
  </Tab>
</Tabs>

## Closed Positions

Review the positions a wallet has exited or that have resolved, including
their realized performance.

<Tabs>
  <Tab title="TypeScript">
    Call `listClosedPositions()` on a `PublicClient` or `SecureClient`.

    ```ts theme={null}
    const pages = client.listClosedPositions({
      user: address,
      pageSize: 1,
    });

    for await (const page of pages) {
      // page.items: ClosedPosition[]
    }
    ```

    <Accordion title="Output: ClosedPosition[]">
      <CodeGroup>
        ```ts ClosedPosition Type theme={null}
        type ClosedPosition = {
          wallet?: Address | null;
          tokenId?: TokenId | null;
          conditionId?: CtfConditionId | null;
          avgPrice?: DecimalString | null;
          totalBought?: DecimalString | null;
          realizedPnl?: DecimalString | null;
          curPrice?: DecimalString | null;
          timestamp?: EpochMilliseconds | null;
          title?: string | null;
          slug?: string | null;
          icon?: string | null;
          eventSlug?: string | null;
          outcome?: string | null;
          outcomeIndex?: number | null;
          oppositeOutcome?: string | null;
          oppositeTokenId?: TokenId | null;
          endDate?: MixedDateTimeString | null;
        };
        ```

        ```json ClosedPosition Example theme={null}
        [
          {
            "wallet": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            "tokenId": "7305630249804085635496399869905769372294302716159034447326228509068694952392",
            "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "avgPrice": "0.58",
            "totalBought": "250.00",
            "realizedPnl": "34.25",
            "curPrice": "0.00",
            "timestamp": 1782752879000,
            "title": "Will the US confirm that aliens exist before 2027?",
            "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "eventSlug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "outcome": "No",
            "outcomeIndex": 1
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `list_closed_positions()` on an `AsyncPublicClient` or `AsyncSecureClient`.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    pages = client.list_closed_positions(user=address, page_size=1)

    async for page in pages:
        ...  # page.items: tuple[ClosedPosition, ...]
    ```

    <Accordion title="Output: tuple[ClosedPosition, ...]">
      <CodeGroup>
        ```python ClosedPosition Type theme={null}
        class ClosedPosition:
            wallet: EvmAddress | None
            token_id: TokenId | None
            condition_id: CtfConditionId | None
            avg_price: Decimal | None
            total_bought: Decimal | None
            realized_pnl: Decimal | None
            cur_price: Decimal | None
            timestamp: datetime | None
            title: str | None
            slug: str | None
            icon: str | None
            event_slug: str | None
            outcome: str | None
            outcome_index: int | None
            opposite_outcome: str | None
            opposite_token_id: TokenId | None
            end_date: date | None
        ```

        ```json ClosedPosition Example theme={null}
        [
          {
            "wallet": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            "token_id": "7305630249804085635496399869905769372294302716159034447326228509068694952392",
            "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "avg_price": "0.58",
            "total_bought": "250.00",
            "realized_pnl": "34.25",
            "cur_price": "0.00",
            "timestamp": "2026-06-29T17:07:59Z",
            "title": "Will the US confirm that aliens exist before 2027?",
            "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "event_slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "outcome": "No",
            "outcome_index": 1
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    List the closed positions for a wallet:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/closed-positions?user=$ADDRESS&limit=1"
    ```

    The response contains the wallet's closed positions:

    <Accordion title="Response">
      ```json theme={null}
      [
        {
          "proxyWallet": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
          "asset": "7305630249804085635496399869905769372294302716159034447326228509068694952392",
          "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
          "avgPrice": 0.58,
          "totalBought": 250,
          "realizedPnl": 34.25,
          "curPrice": 0,
          "timestamp": 1782752879,
          "title": "Will the US confirm that aliens exist before 2027?",
          "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
          "eventSlug": "will-the-us-confirm-that-aliens-exist-before-2027",
          "outcome": "No",
          "outcomeIndex": 1
        }
      ]
      ```
    </Accordion>
  </Tab>
</Tabs>

## Activity History

Follow the timeline for a wallet across trades and other activity.

<Tabs>
  <Tab title="TypeScript">
    Call `listActivity()` on a `PublicClient` or `SecureClient`.

    ```ts theme={null}
    const pages = client.listActivity({ user: address, pageSize: 1 });

    for await (const page of pages) {
      // page.items: Activity[]
    }
    ```

    `Activity` is a discriminated union. The `type` field identifies each
    variant:

    <Accordion title="Output: Activity[]">
      <CodeGroup>
        ```ts Activity Union theme={null}
        type Activity =
          | TradeActivity
          | SplitActivity
          | MergeActivity
          | RedeemActivity
          | ConversionActivity
          | RewardActivity
          | MakerRebateActivity
          | ReferralRewardActivity
          | YieldActivity;
        ```

        ```json Activity Example theme={null}
        [
          {
            "type": "TRADE",
            "isCombo": false,
            "wallet": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            "timestamp": 1782752879000,
            "transactionHash": "0x4f3d2c1b0a9876543210fedcba9876543210fedcba9876543210fedcba987654",
            "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "side": "BUY",
            "shares": "25",
            "amount": "12.25",
            "price": "0.49",
            "title": "Will the US confirm that aliens exist before 2027?",
            "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "eventSlug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "outcome": "Yes",
            "outcomeIndex": 0
          },
          {
            "type": "REWARD",
            "wallet": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            "timestamp": 1782752979000,
            "transactionHash": "0x7a6b5c4d3e2f109876543210fedcba9876543210fedcba9876543210fedcba98",
            "amount": "5"
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `list_activity()` on an `AsyncPublicClient` or `AsyncSecureClient`.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    pages = client.list_activity(user=address, page_size=1)

    async for page in pages:
        ...  # page.items: tuple[Activity, ...]
    ```

    `Activity` is a union of the supported activity variants:

    <Accordion title="Output: tuple[Activity, ...]">
      <CodeGroup>
        ```python Activity Union theme={null}
        Activity = (
            TradeActivity
            | ComboTradeActivity
            | SplitActivity
            | MergeActivity
            | RedeemActivity
            | ConversionActivity
            | RewardActivity
            | MakerRebateActivity
            | ReferralRewardActivity
            | YieldActivity
            | UnknownActivity
        )
        ```

        ```json Activity Example theme={null}
        [
          {
            "type": "TRADE",
            "is_combo": false,
            "wallet": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            "timestamp": "2026-06-29T17:07:59Z",
            "transaction_hash": "0x4f3d2c1b0a9876543210fedcba9876543210fedcba9876543210fedcba987654",
            "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "side": "BUY",
            "shares": "25",
            "amount": "12.25",
            "price": "0.49",
            "title": "Will the US confirm that aliens exist before 2027?",
            "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "event_slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "outcome": "Yes",
            "outcome_index": 0
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    List the activity for a wallet:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/activity?user=$ADDRESS&limit=1"
    ```

    The response contains the wallet's activity:

    <Accordion title="Response">
      ```json theme={null}
      [
        {
          "proxyWallet": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
          "timestamp": 1782752879,
          "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
          "type": "TRADE",
          "size": 25,
          "usdcSize": 12.25,
          "transactionHash": "0x4f3d2c1b0a9876543210fedcba9876543210fedcba9876543210fedcba987654",
          "price": 0.49,
          "asset": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
          "side": "BUY",
          "title": "Will the US confirm that aliens exist before 2027?",
          "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
          "eventSlug": "will-the-us-confirm-that-aliens-exist-before-2027",
          "outcome": "Yes",
          "outcomeIndex": 0
        }
      ]
      ```
    </Accordion>
  </Tab>
</Tabs>

## Notifications

Notifications provide a short-lived record of unread events for the connected
account. The CLOB retains them for 48 hours.

### List Notifications

<Tabs>
  <Tab title="TypeScript">
    Call `fetchNotifications()` on a `SecureClient`:

    ```ts theme={null}
    const notifications = await client.fetchNotifications();

    // notifications: Notification[]
    ```

    <Accordion title="Output: Notification[]">
      <CodeGroup>
        ```ts Notification Type theme={null}
        type Notification = {
          id: NotificationId;
          owner: string;
          payload: unknown;
          timestamp: EpochMilliseconds;
          type: number;
        };
        ```

        ```json Notification Example theme={null}
        [
          {
            "id": 1,
            "owner": "f4f247b7-4ac7-ff29-a152-04fda0a8755a",
            "type": 2,
            "payload": {
              "order_id": "0x72c66a1f70c00ac5e5eb9ce0452b7d118bc4869f8b822a1a8d8580c16e3ca83e"
            },
            "timestamp": 1675277676000
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_notifications()` on an `AsyncSecureClient`. The synchronous
    `SecureClient` provides the same method:

    ```python theme={null}
    notifications = await client.get_notifications()

    # notifications: tuple[Notification, ...]
    ```

    <Accordion title="Output: tuple[Notification, ...]">
      <CodeGroup>
        ```python Notification Type theme={null}
        class Notification:
            id: int
            owner: str
            type: int
            payload: Any
            timestamp: datetime
        ```

        ```json Notification Example theme={null}
        [
          {
            "id": 1,
            "owner": "f4f247b7-4ac7-ff29-a152-04fda0a8755a",
            "type": 2,
            "payload": {
              "order_id": "0x72c66a1f70c00ac5e5eb9ce0452b7d118bc4869f8b822a1a8d8580c16e3ca83e"
            },
            "timestamp": "2023-02-01T18:54:36Z"
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    List unread notifications for the account:

    ```bash theme={null}
    curl -G "https://clob.polymarket.com/notifications" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      --data-urlencode "signature_type=<signature_type>"
    ```

    Using the signer address and CLOB API credentials from [API
    Authentication](/getting-started/api#authentication), create a fresh
    `<clob_request_timestamp>` and generate `<clob_l2_signature>` for
    `GET /notifications`. The `signature_type` query parameter is not part of
    the signed path:

    ```text theme={null}
    message = <clob_request_timestamp> + "GET" + "/notifications"

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    Select `signature_type` from the connected account's [wallet
    type](/trading/wallets-auth#wallet-types):

    | Wallet         | `signature_type` |
    | -------------- | ---------------: |
    | Deposit Wallet |              `3` |
    | Proxy Wallet   |              `1` |
    | Safe Wallet    |              `2` |
    | EOA            |              `0` |

    The response contains the unread notifications:

    ```json theme={null}
    [
      {
        "id": 1,
        "owner": "f4f247b7-4ac7-ff29-a152-04fda0a8755a",
        "type": 2,
        "payload": {
          "order_id": "0x72c66a1f70c00ac5e5eb9ce0452b7d118bc4869f8b822a1a8d8580c16e3ca83e"
        },
        "timestamp": 1675277676
      }
    ]
    ```
  </Tab>
</Tabs>

### Drop Notifications

Mark notifications as read after processing them. Dropped notifications no
longer appear when you list unread notifications.

<Tabs>
  <Tab title="TypeScript">
    Call `dropNotifications()` on a `SecureClient` with the notification IDs:

    ```ts theme={null}
    await client.dropNotifications({
      ids: notifications.map(({ id }) => String(id)),
    });
    ```
  </Tab>

  <Tab title="Python">
    Call `drop_notifications()` on an `AsyncSecureClient`. The synchronous
    `SecureClient` provides the same method:

    ```python theme={null}
    await client.drop_notifications(
        ids=[notification.id for notification in notifications],
    )
    ```
  </Tab>

  <Tab title="API">
    Send the notification IDs as a comma-separated list:

    ```bash theme={null}
    curl -X DELETE -G "https://clob.polymarket.com/notifications" \
      -H "POLY_ADDRESS: <signer_address>" \
      -H "POLY_SIGNATURE: <clob_l2_signature>" \
      -H "POLY_TIMESTAMP: <clob_request_timestamp>" \
      -H "POLY_API_KEY: <clob_api_key>" \
      -H "POLY_PASSPHRASE: <clob_api_passphrase>" \
      --data-urlencode "ids=1,2"
    ```

    Using the signer address and CLOB API credentials from [API
    Authentication](/getting-started/api#authentication), create a fresh
    `<clob_request_timestamp>` and generate `<clob_l2_signature>` for
    `DELETE /notifications`. The `ids` query parameter is not part of the signed
    path:

    ```text theme={null}
    message = <clob_request_timestamp> + "DELETE" + "/notifications"

    clob_l2_signature = urlsafeBase64WithPadding(
      HMAC-SHA256(base64Decode(<clob_api_secret>), message)
    )
    ```

    A successful request returns `OK`.
  </Tab>
</Tabs>

## Portfolio Value

Read the current portfolio value for a wallet.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchPortfolioValue()` on a `PublicClient` or `SecureClient`.

    ```ts theme={null}
    const value = await client.fetchPortfolioValue({ user: address });

    // value: Value[]
    ```

    <Accordion title="Output: Value[]">
      <CodeGroup>
        ```ts Value Type theme={null}
        type Value = {
          user?: Address | null;
          value?: DecimalString | null;
        };
        ```

        ```json Value Example theme={null}
        [
          {
            "user": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            "value": "1842.37"
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_portfolio_values()` on an `AsyncPublicClient` or `AsyncSecureClient`.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    value = await client.get_portfolio_values(user=address)

    # value: tuple[PortfolioValue, ...]
    ```

    <Accordion title="Output: tuple[PortfolioValue, ...]">
      <CodeGroup>
        ```python PortfolioValue Type theme={null}
        class PortfolioValue:
            user: EvmAddress | None
            value: Decimal | None
        ```

        ```json PortfolioValue Example theme={null}
        [
          {
            "user": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            "value": "1842.37"
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    Fetch the portfolio value for a wallet:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/value?user=$ADDRESS"
    ```

    The response contains the wallet's current portfolio value:

    <Accordion title="Response">
      ```json theme={null}
      [
        {
          "user": "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
          "value": 1842.37
        }
      ]
      ```
    </Accordion>
  </Tab>
</Tabs>
