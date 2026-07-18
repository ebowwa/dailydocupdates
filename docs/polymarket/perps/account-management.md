> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Account Management

> Monitor balances, positions, and account history

Use account reads to turn Perps activity into a reliable local view of account
health, trading history, and performance.

<Note>
  Account management workflows require an [authenticated
  session](/perps/authenticated-sessions).
</Note>

## Review Account Health

Start with the account's current collateral and exposure when showing portfolio
health or checking whether a trade fits the account's risk state.

### Balances

Use balances to show collateral by asset and account value.

<Tabs>
  <Tab title="TypeScript">
    ```ts theme={null}
    const balances = await session.fetchBalances();
    ```

    Use this shape to render collateral balances and account value by asset.

    <Accordion title="Output: PerpsBalance[]">
      <CodeGroup>
        ```ts Type theme={null}
        type PerpsBalance = {
          asset: string;
          balance: string;
          value: string;
        };

        type Output = PerpsBalance[];
        ```

        ```json Example theme={null}
        [
          {
            "asset": "pUSD",
            "balance": "1000",
            "value": "1000"
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    balances = await session.fetch_balances()
    ```

    Use this shape to render collateral balances and account value by asset.

    <Accordion title="Output: tuple[PerpsBalance, ...]">
      ```json theme={null}
      [
        {
          "asset": "pUSD",
          "balance": "1000",
          "value": "1000"
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    ```bash theme={null}
    curl "https://api.perpetuals.polymarket.com/v1/account/balances" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>"
    ```

    Use this shape to render collateral balances and account value by asset.

    <Accordion title="Output: Balances">
      ```json theme={null}
      [
        {
          "asset": "pUSD",
          "balance": "1000",
          "value": "1000"
        }
      ]
      ```
    </Accordion>
  </Tab>
</Tabs>

### Portfolio

Use the portfolio to show open positions, margin usage, withdrawable collateral,
and liquidation state.

<Tabs>
  <Tab title="TypeScript">
    ```ts theme={null}
    const portfolio = await session.fetchPortfolio();
    ```

    Use this shape to render positions, margin usage, and liquidation state.

    <Accordion title="Output: PerpsPortfolio">
      <CodeGroup>
        ```ts Type theme={null}
        type PerpsPortfolio = {
          positions: Array<{
            instrumentId: number;
            symbol: string;
            size: string;
            entryPrice: string;
            leverage: number;
            cross: boolean;
            initialMargin: string;
            maintenanceMargin: string;
            positionValue: string;
            liquidationPrice: string;
            unrealizedPnl: string;
            returnOnEquity: string;
            cumulativeFunding: string;
          }>;
          margin: {
            totalAccountValue: string;
            totalInitialMargin: string;
            totalMaintenanceMargin: string;
            totalPositionValue: string;
          };
          withdrawable: string;
          inLiquidation: boolean;
          timestamp: number;
        };

        type Output = PerpsPortfolio;
        ```

        ```json Example theme={null}
        {
          "positions": [
            {
              "instrumentId": 1,
              "symbol": "BTC-PERP",
              "size": "0.01",
              "entryPrice": "65000",
              "leverage": 5,
              "cross": false,
              "initialMargin": "130",
              "maintenanceMargin": "65",
              "positionValue": "650",
              "liquidationPrice": "52000",
              "unrealizedPnl": "0",
              "returnOnEquity": "0",
              "cumulativeFunding": "0"
            }
          ],
          "margin": {
            "totalAccountValue": "1000",
            "totalInitialMargin": "130",
            "totalMaintenanceMargin": "65",
            "totalPositionValue": "650"
          },
          "withdrawable": "870",
          "inLiquidation": false,
          "timestamp": 1767000000000
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    portfolio = await session.fetch_portfolio()
    ```

    Use this shape to render positions, margin usage, and liquidation state.

    <Accordion title="Output: PerpsPortfolio">
      ```json theme={null}
      {
        "positions": [
          {
            "instrument_id": 1,
            "symbol": "BTC-PERP",
            "size": "0.01",
            "entry_price": "65000",
            "leverage": 5,
            "cross": false,
            "initial_margin": "130",
            "maintenance_margin": "65",
            "position_value": "650",
            "liquidation_price": "52000",
            "unrealized_pnl": "0",
            "return_on_equity": "0",
            "cumulative_funding": "0"
          }
        ],
        "margin": {
          "total_account_value": "1000",
          "total_initial_margin": "130",
          "total_maintenance_margin": "65",
          "total_position_value": "650"
        },
        "withdrawable": "870",
        "in_liquidation": false,
        "timestamp": 1767000000000
      }
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    ```bash theme={null}
    curl "https://api.perpetuals.polymarket.com/v1/account/portfolio" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>"
    ```

    Use this shape to render positions, margin usage, and liquidation state.

    <Accordion title="Output: Portfolio">
      ```json theme={null}
      {
        "positions": [
          {
            "instrument_id": 1,
            "symbol": "BTC-PERP",
            "size": "0.01",
            "entry_price": "65000",
            "leverage": 5,
            "cross": false,
            "initial_margin": "130",
            "maintenance_margin": "65",
            "position_value": "650",
            "liquidation_price": "52000",
            "unrealized_pnl": "0",
            "return_on_equity": "0",
            "cumulative_funding": "0"
          }
        ],
        "margin": {
          "total_account_value": "1000",
          "total_initial_margin": "130",
          "total_maintenance_margin": "65",
          "total_position_value": "650"
        },
        "withdrawable": "870",
        "in_liquidation": false,
        "timestamp": 1767000000000
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

### Account Stats

Use account stats to review trailing 7-day trading activity such as volume and
maker share. Stats are cached by UTC day and may be stale by up to 24 hours. See
[Fee Metrics](/perps/learn-about-trading/fees#fee-metrics) for what each metric
means.

<Tabs>
  <Tab title="TypeScript">
    ```ts theme={null}
    const stats = await session.fetchStats();
    ```

    Use this shape to render trailing 7-day volume and maker-share activity.

    <Accordion title="Output: PerpsAccountStats">
      <CodeGroup>
        ```ts Type theme={null}
        type PerpsAccountStats = {
          volume7d: string;
          takerVolume7d: string;
          makerVolume7d: string;
          accountMakerShare7d: string;
          entityMakerShare7d?: string;
          entityId?: number;
          entityName?: string;
        };
        ```

        ```json Example theme={null}
        {
          "volume7d": "5000000",
          "takerVolume7d": "3500000",
          "makerVolume7d": "1500000",
          "accountMakerShare7d": "0.35",
          "entityMakerShare7d": "0.40",
          "entityId": 42,
          "entityName": "desk"
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    stats = await session.fetch_stats()
    ```

    Use this shape to render trailing 7-day volume and maker-share activity.

    <Accordion title="Output: PerpsAccountStats">
      ```json theme={null}
      {
        "volume_7d": "5000000",
        "taker_volume_7d": "3500000",
        "maker_volume_7d": "1500000",
        "account_maker_share_7d": "0.35",
        "entity_maker_share_7d": "0.40",
        "entity_id": 42,
        "entity_name": "desk"
      }
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    ```bash theme={null}
    curl "https://api.perpetuals.polymarket.com/v1/account/stats" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>"
    ```

    Use this shape to render trailing 7-day volume and maker-share activity.

    <Accordion title="Output: Account Stats">
      ```json theme={null}
      {
        "volume_7d": "5000000",
        "taker_volume_7d": "3500000",
        "maker_volume_7d": "1500000",
        "account_maker_share_7d": "0.35",
        "entity_maker_share_7d": "0.40",
        "entity_id": 42,
        "entity_name": "desk"
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

## Reconcile Orders and Fills

Use order state and fills to connect submitted orders with resting liquidity,
executions, fees, and exposure changes.

### Open Orders

Use open orders to show what is still resting on the book.

<Tabs>
  <Tab title="TypeScript">
    ```ts theme={null}
    const openOrders = await session.fetchOpenOrders({
      instrumentId: instrument.id,
    });
    ```

    Use this shape to render resting orders that can still fill or be canceled.

    <Accordion title="Output: PerpsOrder[]">
      ```json theme={null}
      [
        {
          "id": 1234567890,
          "instrumentId": 1,
          "buy": true,
          "price": "65000",
          "quantity": "0.01",
          "timeInForce": "gtc",
          "postOnly": false,
          "status": "open",
          "restingQuantity": "0.01",
          "filledQuantity": "0",
          "createdTimestamp": 1767000010000,
          "updatedTimestamp": 1767000010000
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    open_orders = await session.fetch_open_orders(
        instrument_id=instrument.id,
    )
    ```

    Use this shape to render resting orders that can still fill or be canceled.

    <Accordion title="Output: tuple[PerpsOrder, ...]">
      ```json theme={null}
      [
        {
          "id": 1234567890,
          "instrument_id": 1,
          "side": "BUY",
          "price": "65000",
          "quantity": "0.01",
          "time_in_force": "gtc",
          "post_only": false,
          "status": "open",
          "resting_quantity": "0.01",
          "filled_quantity": "0",
          "created_at": 1767000010000,
          "updated_at": 1767000010000
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/account/open-orders" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>" \
      --data-urlencode "instrument_id=1"
    ```

    Use this shape to render resting orders that can still fill or be canceled.

    <Accordion title="Output: Open Orders">
      ```json theme={null}
      [
        {
          "order_id": 1234567890,
          "instrument_id": 1,
          "buy": true,
          "price": "65000",
          "quantity": "0.01",
          "tif": "gtc",
          "post_only": false,
          "ro": false,
          "status": "open",
          "resting_quantity": "0.01",
          "filled_quantity": "0",
          "created_timestamp": 1767000010000,
          "updated_timestamp": 1767000010000
        }
      ]
      ```
    </Accordion>
  </Tab>
</Tabs>

### Orders

Use orders to inspect the latest known state for submitted orders.

<Tabs>
  <Tab title="TypeScript">
    ```ts theme={null}
    const orders = await session.fetchOrders({
      instrumentId: instrument.id,
    });
    ```

    Use this shape to reconcile submitted orders with their latest known state.

    <Accordion title="Output: PerpsOrder[]">
      ```json theme={null}
      [
        {
          "id": 1234567890,
          "instrumentId": 1,
          "buy": true,
          "price": "65000",
          "quantity": "0.01",
          "timeInForce": "ioc",
          "postOnly": false,
          "status": "filled",
          "restingQuantity": "0",
          "filledQuantity": "0.01",
          "createdTimestamp": 1767000010000,
          "updatedTimestamp": 1767000010500
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    orders = await session.fetch_orders(
        instrument_id=instrument.id,
    )
    ```

    Use this shape to reconcile submitted orders with their latest known state.

    <Accordion title="Output: tuple[PerpsOrder, ...]">
      ```json theme={null}
      [
        {
          "id": 1234567890,
          "instrument_id": 1,
          "side": "BUY",
          "price": "65000",
          "quantity": "0.01",
          "time_in_force": "ioc",
          "post_only": false,
          "status": "filled",
          "resting_quantity": "0",
          "filled_quantity": "0.01",
          "created_at": 1767000010000,
          "updated_at": 1767000010500
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/account/orders" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>" \
      --data-urlencode "instrument_id=1"
    ```

    Use this shape to reconcile submitted orders with their latest known state.

    <Accordion title="Output: Orders">
      ```json theme={null}
      [
        {
          "order_id": 1234567890,
          "instrument_id": 1,
          "buy": true,
          "price": "65000",
          "quantity": "0.01",
          "tif": "ioc",
          "post_only": false,
          "ro": false,
          "status": "filled",
          "resting_quantity": "0",
          "filled_quantity": "0.01",
          "created_timestamp": 1767000010000,
          "updated_timestamp": 1767000010500
        }
      ]
      ```
    </Accordion>
  </Tab>
</Tabs>

### Fills

Use fills to reconcile executions, fees, realized PnL, and exposure changes.

<Tabs>
  <Tab title="TypeScript">
    ```ts theme={null}
    const fills = session.listFills({
      start: Date.now() - 24 * 60 * 60 * 1000,
      end: Date.now(),
    });

    for await (const page of fills) {
      // page.items: PerpsAccountFill[]
    }
    ```

    Each page returns execution records you can use to reconcile fees, PnL, and exposure.

    <Accordion title="Output: PerpsAccountFill[]">
      ```json theme={null}
      [
        {
          "tradeId": 987654321,
          "orderId": 1234567890,
          "instrumentId": 1,
          "side": "long",
          "price": "65000",
          "quantity": "0.01",
          "taker": true,
          "fee": "0.26",
          "feeAsset": "pUSD",
          "previousSize": "0",
          "previousEntryPrice": "0",
          "pnl": "0",
          "liquidation": false,
          "timestamp": 1767000010500,
          "hash": "0x1111111111111111111111111111111111111111111111111111111111111111"
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    from datetime import datetime, timedelta, timezone

    end = datetime.now(timezone.utc)
    start = end - timedelta(days=1)

    fills = session.list_fills(start=start, end=end)

    async for page in fills:
        # page.items: tuple[PerpsFill, ...]
        pass
    ```

    Each page returns execution records you can use to reconcile fees, PnL, and exposure.

    <Accordion title="Output: tuple[PerpsFill, ...]">
      ```json theme={null}
      [
        {
          "trade_id": 987654321,
          "order_id": 1234567890,
          "instrument_id": 1,
          "side": "long",
          "price": "65000",
          "quantity": "0.01",
          "taker": true,
          "fee": "0.26",
          "fee_asset": "pUSD",
          "previous_size": "0",
          "previous_entry_price": "0",
          "pnl": "0",
          "liquidation": false,
          "timestamp": 1767000010500,
          "hash": "0x1111111111111111111111111111111111111111111111111111111111111111"
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/account/fills" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>" \
      --data-urlencode "start_timestamp=1766913600000" \
      --data-urlencode "end_timestamp=1767000000000"
    ```

    Use the response's `more` field to continue fetching older or newer records.

    Each page returns execution records you can use to reconcile fees, PnL, and exposure.

    <Accordion title="Output: Fills">
      ```json theme={null}
      {
        "data": [
          {
            "trade_id": 987654321,
            "order_id": 1234567890,
            "instrument_id": 1,
            "side": "long",
            "price": "65000",
            "quantity": "0.01",
            "taker": true,
            "fee": "0.26",
            "fee_asset": "pUSD",
            "previous_size": "0",
            "previous_entry_price": "0",
            "pnl": "0",
            "liquidation": false,
            "timestamp": 1767000010500,
            "hash": "0x1111111111111111111111111111111111111111111111111111111111111111"
          }
        ],
        "more": false
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

## Reconcile Funding and Transfers

Funding, deposits, and withdrawals explain collateral changes that did not come
from order fills. Use [Fund Your Account](/perps/fund-your-account) for deposit
and withdrawal submission workflows.

### Funding Payments

Use funding payments to explain periodic funding debits or credits for a market.

<Tabs>
  <Tab title="TypeScript">
    ```ts theme={null}
    const fundingPayments = session.listFundingPayments({
      instrumentId: instrument.id,
    });

    for await (const page of fundingPayments) {
      // page.items: PerpsAccountFundingPayment[]
    }
    ```

    Each page returns funding records you can use to explain non-trade PnL changes.

    <Accordion title="Output: PerpsAccountFundingPayment[]">
      ```json theme={null}
      [
        {
          "instrumentId": 1,
          "size": "0.01",
          "fundingRate": "0.0001",
          "fundingAsset": "pUSD",
          "funding": "0.05",
          "timestamp": 1767000010000
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    funding_payments = session.list_funding_payments(
        instrument_id=instrument.id,
    )

    async for page in funding_payments:
        # page.items: tuple[PerpsFundingPayment, ...]
        pass
    ```

    Each page returns funding records you can use to explain non-trade PnL changes.

    <Accordion title="Output: tuple[PerpsFundingPayment, ...]">
      ```json theme={null}
      [
        {
          "instrument_id": 1,
          "size": "0.01",
          "funding_rate": "0.0001",
          "funding_asset": "pUSD",
          "funding": "0.05",
          "timestamp": 1767000010000
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/account/funding" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>" \
      --data-urlencode "instrument_id=1" \
      --data-urlencode "start_timestamp=1766913600000" \
      --data-urlencode "end_timestamp=1767000000000"
    ```

    Use the response's `more` field to continue fetching older or newer records.

    Each page returns funding records you can use to explain non-trade PnL changes.

    <Accordion title="Output: Funding Payments">
      ```json theme={null}
      {
        "data": [
          {
            "instrument_id": 1,
            "size": "0.01",
            "funding_rate": "0.0001",
            "funding_asset": "pUSD",
            "funding": "0.05",
            "timestamp": 1767000010000
          }
        ],
        "more": false
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

### Deposits

Use deposits to reconcile collateral added to the Perps account.

<Tabs>
  <Tab title="TypeScript">
    ```ts theme={null}
    const deposits = session.listDeposits();

    for await (const page of deposits) {
      // page.items: PerpsDeposit[]
    }
    ```

    Each page returns deposits you can match against collateral arriving in the account.

    <Accordion title="Output: PerpsDeposit[]">
      ```json theme={null}
      [
        {
          "hash": "0x2222222222222222222222222222222222222222222222222222222222222222",
          "asset": "pUSD",
          "amount": "100000000",
          "status": "confirmed",
          "from": "0x1234567890abcdef1234567890abcdef12345678",
          "to": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
          "confirmations": 12,
          "requiredConfirmations": 12,
          "createdTimestamp": 1767000010000,
          "confirmedTimestamp": 1767000030000
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    deposits = session.list_deposits()

    async for page in deposits:
        # page.items: tuple[PerpsDeposit, ...]
        pass
    ```

    Each page returns deposits you can match against collateral arriving in the account.

    <Accordion title="Output: tuple[PerpsDeposit, ...]">
      ```json theme={null}
      [
        {
          "hash": "0x2222222222222222222222222222222222222222222222222222222222222222",
          "asset": "pUSD",
          "amount": "100000000",
          "status": "confirmed",
          "from_address": "0x1234567890abcdef1234567890abcdef12345678",
          "to": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
          "confirmations": 12,
          "required_confirmations": 12,
          "created_at": 1767000010000,
          "confirmed_at": 1767000030000
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/account/deposits" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>" \
      --data-urlencode "start_timestamp=1766913600000" \
      --data-urlencode "end_timestamp=1767000000000"
    ```

    Use the response's `more` field to continue fetching older or newer records.

    Each page returns deposits you can match against collateral arriving in the account.

    <Accordion title="Output: Deposits">
      ```json theme={null}
      {
        "data": [
          {
            "hash": "0x2222222222222222222222222222222222222222222222222222222222222222",
            "asset": "pUSD",
            "amount": "100000000",
            "status": "confirmed",
            "from": "0x1234567890abcdef1234567890abcdef12345678",
            "to": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
            "confirmations": 12,
            "required_confirmations": 12,
            "created_timestamp": 1767000010000,
            "confirmed_timestamp": 1767000030000
          }
        ],
        "more": false
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

### Withdrawals

Use withdrawals to reconcile collateral leaving the Perps account.

<Tabs>
  <Tab title="TypeScript">
    ```ts theme={null}
    const withdrawals = session.listWithdrawals();

    for await (const page of withdrawals) {
      // page.items: PerpsWithdrawal[]
    }
    ```

    Each page returns withdrawals you can match against collateral leaving the account.

    <Accordion title="Output: PerpsWithdrawal[]">
      ```json theme={null}
      [
        {
          "withdrawalId": 1234567891,
          "asset": "pUSD",
          "amount": "50000000",
          "fee": "1.5",
          "status": "confirmed",
          "to": "0x1234567890abcdef1234567890abcdef12345678",
          "hash": "0x3333333333333333333333333333333333333333333333333333333333333333",
          "confirmations": 12,
          "requiredConfirmations": 12,
          "createdTimestamp": 1767000010000,
          "confirmedTimestamp": 1767000030000
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    withdrawals = session.list_withdrawals()

    async for page in withdrawals:
        # page.items: tuple[PerpsWithdrawal, ...]
        pass
    ```

    Each page returns withdrawals you can match against collateral leaving the account.

    <Accordion title="Output: tuple[PerpsWithdrawal, ...]">
      ```json theme={null}
      [
        {
          "withdrawal_id": 1234567891,
          "asset": "pUSD",
          "amount": "50000000",
          "fee": "1.5",
          "status": "confirmed",
          "to": "0x1234567890abcdef1234567890abcdef12345678",
          "hash": "0x3333333333333333333333333333333333333333333333333333333333333333",
          "confirmations": 12,
          "required_confirmations": 12,
          "created_at": 1767000010000,
          "confirmed_at": 1767000030000
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/account/withdrawals" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>" \
      --data-urlencode "start_timestamp=1766913600000" \
      --data-urlencode "end_timestamp=1767000000000"
    ```

    Use the response's `more` field to continue fetching older or newer records.

    Each page returns withdrawals you can match against collateral leaving the account.

    <Accordion title="Output: Withdrawals">
      ```json theme={null}
      {
        "data": [
          {
            "withdrawal_id": 1234567891,
            "asset": "pUSD",
            "amount": "50000000",
            "fee": "1.5",
            "status": "confirmed",
            "to": "0x1234567890abcdef1234567890abcdef12345678",
            "hash": "0x3333333333333333333333333333333333333333333333333333333333333333",
            "confirmations": 12,
            "required_confirmations": 12,
            "created_timestamp": 1767000010000,
            "confirmed_timestamp": 1767000030000
          }
        ],
        "more": false
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

## Track Equity and PnL

Use equity and PnL history to explain how the account's value changed over time.

### Equity

Use equity history to chart account value over time.

<Tabs>
  <Tab title="TypeScript">
    ```ts theme={null}
    const equity = session.listEquityHistory({
      interval: "1h",
      start: Date.now() - 7 * 24 * 60 * 60 * 1000,
      end: Date.now(),
    });

    for await (const page of equity) {
      // page.items: PerpsEquityPoint[]
    }
    ```

    Each page returns points you can plot as account equity over time.

    <Accordion title="Output: PerpsEquityPoint[]">
      ```json theme={null}
      [
        {
          "timestamp": 1767000000000,
          "equity": "1000"
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    from datetime import datetime, timedelta, timezone

    end = datetime.now(timezone.utc)
    start = end - timedelta(days=7)

    equity = session.list_equity_history(
        interval="1h",
        start=start,
        end=end,
    )

    async for page in equity:
        # page.items: tuple[PerpsEquityPoint, ...]
        pass
    ```

    Each page returns points you can plot as account equity over time.

    <Accordion title="Output: tuple[PerpsEquityPoint, ...]">
      ```json theme={null}
      [
        {
          "timestamp": 1767000000000,
          "equity": "1000"
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/account/equity" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>" \
      --data-urlencode "interval=1h" \
      --data-urlencode "start_timestamp=1766395200000" \
      --data-urlencode "end_timestamp=1767000000000"
    ```

    Use the response's `more` field to continue fetching older or newer records.

    Each page returns points you can plot as account equity over time.

    <Accordion title="Output: Equity">
      ```json theme={null}
      {
        "data": [[1767000000000, "1000"]],
        "more": false
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

### PnL

Use PnL history to chart account profit and loss over the same interval.

<Tabs>
  <Tab title="TypeScript">
    ```ts theme={null}
    const pnl = session.listPnlHistory({
      interval: "1h",
      start: Date.now() - 7 * 24 * 60 * 60 * 1000,
      end: Date.now(),
    });

    for await (const page of pnl) {
      // page.items: PerpsPnlPoint[]
    }
    ```

    Each page returns points you can plot as account PnL over time.

    <Accordion title="Output: PerpsPnlPoint[]">
      ```json theme={null}
      [
        {
          "timestamp": 1767000000000,
          "pnl": "12.5"
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    ```python theme={null}
    from datetime import datetime, timedelta, timezone

    end = datetime.now(timezone.utc)
    start = end - timedelta(days=7)

    pnl = session.list_pnl_history(
        interval="1h",
        start=start,
        end=end,
    )

    async for page in pnl:
        # page.items: tuple[PerpsPnlPoint, ...]
        pass
    ```

    Each page returns points you can plot as account PnL over time.

    <Accordion title="Output: tuple[PerpsPnlPoint, ...]">
      ```json theme={null}
      [
        {
          "timestamp": 1767000000000,
          "pnl": "12.5"
        }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    ```bash theme={null}
    curl -G "https://api.perpetuals.polymarket.com/v1/account/pnl" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>" \
      --data-urlencode "interval=1h" \
      --data-urlencode "start_timestamp=1766395200000" \
      --data-urlencode "end_timestamp=1767000000000"
    ```

    Use the response's `more` field to continue fetching older or newer records.

    Each page returns points you can plot as account PnL over time.

    <Accordion title="Output: PnL">
      ```json theme={null}
      {
        "data": [[1767000000000, "12.5"]],
        "more": false
      }
      ```
    </Accordion>
  </Tab>
</Tabs>
