<!--
Source: https://docs.polymarket.com/market-data/public-analytics.md
Downloaded: 2026-09-10T22:17:46.066Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Analytics

> Understand activity and performance across Polymarket.

Use these reads to understand where trading activity is concentrated and how
traders and integrations perform over time.

## Market Activity

The examples below assume you already have a market object. To find or fetch
one, see [**Discover Markets**](/market-data/discover-markets).

<Tabs>
  <Tab title="TypeScript">
    Given a market, read its condition and event IDs:

    ```ts theme={null}
    const conditionId = market.conditionId;
    const eventId = market.events[0].id;
    ```
  </Tab>

  <Tab title="Python">
    Given a market, read its condition and event IDs:

    ```python theme={null}
    condition_id = market.condition_id
    event_id = market.events[0].id
    ```
  </Tab>

  <Tab title="API">
    Given a market object, its condition and event IDs are available in these
    fields:

    ```json theme={null}
    {
      "conditionId": "<condition_id>",
      "events": [{ "id": "<event_id>" }]
    }
    ```

    Assign the identifiers for the requests below:

    ```bash theme={null}
    CONDITION_ID="<condition_id>"
    EVENT_ID="<event_id>"
    ```
  </Tab>
</Tabs>

### Recent Trades

Review the trades recently matched in a market, including their side, price,
size, outcome, wallet, and timestamp.

<Tabs>
  <Tab title="TypeScript">
    Call `listTrades()` on a `PublicClient` or `SecureClient`.

    ```ts theme={null}
    const pages = client.listTrades({ conditionId: [conditionId], pageSize: 1 });

    for await (const page of pages) {
      // page.items: Trade[]
    }
    ```

    <Accordion title="Output: Trade[]">
      <CodeGroup>
        ```ts Trade Type theme={null}
        type Trade = {
          wallet: EvmAddress;
          side: OrderSide;
          assetId: TokenId | PositionId;
          conditionId: ConditionId;
          size: DecimalString;
          price: DecimalString;
          timestamp: EpochMilliseconds;
          transactionHash: TxHash;
          title?: string;
          slug?: string;
          icon?: string;
          eventSlug?: string;
          outcome?: string;
          outcomeIndex?: number;
          name?: string;
          pseudonym?: string;
          bio?: string;
          profileImage?: string;
          profileImageOptimized?: string;
        };
        ```

        ```json Trade Example theme={null}
        [
          {
            "side": "SELL",
            "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "size": "42.62",
            "price": "0.91",
            "timestamp": 1782752879000,
            "title": "Will the US confirm that aliens exist before 2027?",
            "outcome": "No",
            "wallet": "0x50a0cebecfb81dbcbfa6d38f82040343f1e3d95f",
            "assetId": "7305630249804085635496399869905769372294302716159034447326228509068694952392",
            "transactionHash": "0x4f3d2c1b0a9876543210fedcba9876543210fedcba9876543210fedcba987654"
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `list_trades()` on an existing `AsyncPublicClient` or `AsyncSecureClient`.

    ```python theme={null}
    pages = client.list_trades(condition_id=[condition_id], page_size=1)

    async for page in pages:
        # page.items: tuple[Trade, ...]
        pass
    ```

    <Accordion title="Output: Trade">
      <CodeGroup>
        ```python Trade Type theme={null}
        class Trade:
            wallet: EvmAddress
            asset_id: ClobAssetId
            condition_id: ConditionId
            side: OrderSide
            size: Decimal
            price: Decimal
            timestamp: datetime
            transaction_hash: TransactionHash
            title: str | None
            slug: str | None
            icon: str | None
            event_slug: str | None
            outcome: str | None
            outcome_index: int | None
            name: str | None
            pseudonym: str | None
            bio: str | None
            profile_image: str | None
            profile_image_optimized: str | None
        ```

        ```json Trade Example theme={null}
        {
          "wallet": "0x84cfffc3f16dcc353094de30d4a45226eccd2f63",
          "asset_id": "100621704916396384184205224105871827982844371725320616822883322969092312254616",
          "condition_id": "0xc8a2f17f42fa8493ebae503abec9d51efa7b57c3cc59a7b88933bffaa3618387",
          "side": "BUY",
          "size": "78.55",
          "price": "0.62",
          "timestamp": "2026-09-08T17:03:34Z",
          "transaction_hash": "0x8b2fd0c7480cd78bd9f57e8b935cf10c6635d2c479c66ea26d358e1425f44a95",
          "title": "Will Real Madrid CF win on 2026-09-08?",
          "slug": "ucl-rma-int-2026-09-08-rma",
          "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/champions-league-pic-QIUFsL8vaDdq.png",
          "event_slug": null,
          "outcome": "Yes",
          "outcome_index": null,
          "name": "mooseborzoi",
          "pseudonym": "Agitated-Bricklaying",
          "bio": null,
          "profile_image": "https://polymarket-upload.s3.us-east-2.amazonaws.com/profile-image-7634413-4dea3150-84ad-4278-9e45-d96e51769b7e.png",
          "profile_image_optimized": null
        }
        ```
      </CodeGroup>
    </Accordion>

    `size` is in shares and `price` is in USDC per share. To read a wallet's full trade history, pass `user=address, full_history=True`. Do not combine `full_history` with `start` or `end`.
  </Tab>

  <Tab title="API">
    List recent trades for a market:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/v2/trades?condition=$CONDITION_ID&limit=1"
    ```

    The response contains the recent trades (row fields trimmed for brevity):

    <Accordion title="Response">
      ```json theme={null}
      {
        "data": [
          {
            "proxy_wallet": "0xc6a5ceb4083f9209c31c45dc86f5714583f552e3",
            "side": "SELL",
            "token_id": "7305630249804085635496399869905769372294302716159034447326228509068694952392",
            "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "size": 6.96,
            "price": 0.962,
            "timestamp": 1788204232,
            "transaction_hash": "0x6929c40832394d64d84a0a9170c4174f9d9f18de23f82de05a750fdbf7350ca9",
            "title": "Will the US confirm that aliens exist before 2027?",
            "outcome": "No"
          }
        ],
        "pagination": {
          "limit": 1,
          "offset": 0,
          "has_more": true,
          "next_cursor": "eyJkYXRhIjp7InR5cGUiOiJ0cmFkZXMi…"
        }
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

### Open Interest

Measure the value currently held in outstanding positions for one or more
markets.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchOpenInterest()` on a `PublicClient` or `SecureClient`. Pass up
    to 20 condition IDs, or omit `conditionIds` for the single global figure
    (served as `conditionId: null`).

    ```ts theme={null}
    const openInterest = await client.fetchOpenInterest({
      conditionIds: [conditionId],
    });

    // openInterest: OpenInterest[]
    ```

    <Accordion title="Output: OpenInterest[]">
      <CodeGroup>
        ```ts OpenInterest Type theme={null}
        type OpenInterest = {
          conditionId: ConditionId | null;
          value: DecimalString;
        };
        ```

        ```json OpenInterest Example theme={null}
        [
          {
            "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "value": "7484304.679057"
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_open_interests()` on an existing `AsyncPublicClient` or `AsyncSecureClient`.

    ```python theme={null}
    open_interest = await client.get_open_interests()

    # open_interest: tuple[OpenInterest, ...]
    ```

    <Accordion title="Output: OpenInterest">
      <CodeGroup>
        ```python OpenInterest Type theme={null}
        class OpenInterest:
            condition_id: ConditionId | None
            value: Decimal
        ```

        ```json OpenInterest Example theme={null}
        {
          "condition_id": null,
          "value": "356037494.1056115"
        }
        ```
      </CodeGroup>
    </Accordion>

    The result is a tuple of `OpenInterest` rows. Global open interest has `condition_id=None`. Pass `condition_ids=[condition_id]` to read a market’s open interest. Values are in USDC.
  </Tab>

  <Tab title="API">
    Fetch open interest for a market:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/v2/oi?condition=$CONDITION_ID"
    ```

    The response contains open interest by market:

    <Accordion title="Response">
      ```json theme={null}
      {
        "data": [
          {
            "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
            "value": 7113116.142022
          }
        ]
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

### Market Holders

Find the largest public holders for each outcome token in a market.

<Tabs>
  <Tab title="TypeScript">
    Call `listMarketHolders()` on a `PublicClient` or `SecureClient` and walk
    the cursor pages. `pageSize` applies separately to each outcome token, so
    merge groups by `assetId` across pages. Set `includePnl: true` (one
    condition ID, page size at most 100) to add position economics to every
    holder row.

    ```ts theme={null}
    const pages = client.listMarketHolders({
      conditionIds: [conditionId],
      pageSize: 1,
    });

    for await (const page of pages) {
      // page.items: MetaHolder[]
    }
    ```

    <Accordion title="Output: MetaHolder[]">
      <CodeGroup>
        ```ts MetaHolder Type theme={null}
        type Holder = {
          wallet: EvmAddress;
          assetId: TokenId | PositionId;
          /** Net holding in shares; per-side gross when `includePnl` is set. */
          amount: DecimalString;
          outcomeIndex: number | null;
          verified: boolean;
          name: string | null;
          pseudonym: string | null;
          bio: string | null;
          displayUsernamePublic: boolean;
          profileImage: string | null;
          profileImageOptimized: string | null;
          avgPrice?: DecimalString | null;
          entryCostUsdc?: DecimalString | null;
          currentPrice?: DecimalString | null;
          currentValue?: DecimalString | null;
          realizedPnl?: DecimalString | null;
          unrealizedPnl?: DecimalString | null;
          totalPnl?: DecimalString | null;
        };

        type MetaHolder = {
          assetId: TokenId | PositionId;
          /** Holders for this outcome, ordered by amount descending. */
          holders: Holder[];
        };
        ```

        ```json MetaHolder Example theme={null}
        [
          {
            "assetId": "92338023949892178944669766466918011858071833335063600591564160751176113496073",
            "holders": [
              {
                "wallet": "0x1b5ca5e84705cd14ca9953b57434094cac726c0f",
                "amount": "1878.77239",
                "outcomeIndex": 0,
                "verified": false,
                "name": null
              }
            ]
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `list_market_holders()` on an existing `AsyncPublicClient` or `AsyncSecureClient`.

    ```python theme={null}
    pages = client.list_market_holders(condition_ids=[condition_id], page_size=1)

    async for page in pages:
        # page.items: tuple[MetaHolder, ...]
        pass
    ```

    `page_size` applies separately to each outcome asset. Merge groups across pages by `asset_id`. Set `include_pnl=True` to include position economics for one condition, with a page size of at most 100.

    <Accordion title="Output: MetaHolder">
      <CodeGroup>
        ```python Holder Type theme={null}
        class Holder:
            wallet: EvmAddress
            asset_id: ClobAssetId
            amount: Decimal
            outcome_index: int | None
            display_username_public: bool
            verified: bool
            name: str | None
            pseudonym: str | None
            bio: str | None
            profile_image: str | None
            profile_image_optimized: str | None
            avg_price: Decimal | None
            entry_cost_usdc: Decimal | None
            current_price: Decimal | None
            current_value: Decimal | None
            realized_pnl: Decimal | None
            unrealized_pnl: Decimal | None
            total_pnl: Decimal | None
        ```

        ```python MetaHolder Type theme={null}
        class MetaHolder:
            asset_id: ClobAssetId
            holders: tuple[Holder, ...]
        ```

        ```json MetaHolder Example theme={null}
        {
          "asset_id": "92338023949892178944669766466918011858071833335063600591564160751176113496073",
          "holders": [
            {
              "wallet": "0x1b5ca5e84705cd14ca9953b57434094cac726c0f",
              "asset_id": "92338023949892178944669766466918011858071833335063600591564160751176113496073",
              "amount": "1878.77239",
              "outcome_index": 0,
              "display_username_public": false,
              "verified": false,
              "name": null,
              "pseudonym": null,
              "bio": null,
              "profile_image": null,
              "profile_image_optimized": null,
              "avg_price": "0.2794",
              "entry_cost_usdc": "524.991",
              "current_price": "1.0",
              "current_value": "1878.7723",
              "realized_pnl": "0.0001",
              "unrealized_pnl": "1353.7812",
              "total_pnl": "1353.7813"
            }
          ]
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    List the largest holders for a market:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/v2/holders?condition=$CONDITION_ID&limit=1"
    ```

    The response groups holders by outcome token (holder fields trimmed for
    brevity):

    <Accordion title="Response">
      ```json theme={null}
      {
        "data": [
          {
            "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417",
            "holders": [
              {
                "proxy_wallet": "0xcd09c7f5132a160b41578a79a9e3453da7aeda63",
                "amount": 550253.927993,
                "outcome_index": 0,
                "name": "ShayaEredyon"
              }
            ]
          },
          {
            "token_id": "7305630249804085635496399869905769372294302716159034447326228509068694952392",
            "holders": [
              {
                "proxy_wallet": "0xa2cd4ccda9a1f95949df7a3355c4c2daa0642ba0",
                "amount": 1455975.51944,
                "outcome_index": 1,
                "name": "0xA2cd4CcdA9A1f95949DF7A3355C4c2DAa0642Ba0-1729178570395"
              }
            ]
          }
        ],
        "pagination": {
          "limit": 1,
          "offset": 0,
          "has_more": true,
          "next_cursor": "eyJkYXRhIjp7InR5cGUiOiJob2xkZXJzIi…"
        }
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

### Event Live Volume

Summarize activity across an event and break the volume down by market.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchEventLiveVolume()` on a `PublicClient` or `SecureClient`. Pass
    one or more event IDs; a list spans events and returns one combined
    result.

    ```ts theme={null}
    const liveVolume = await client.fetchEventLiveVolume({
      eventIds: [eventId],
    });

    // liveVolume: LiveVolume
    ```

    <Accordion title="Output: LiveVolume">
      <CodeGroup>
        ```ts LiveVolume Type theme={null}
        type MarketLiveVolume = {
          /** Condition ID of the market, or `null` when the source row is unidentified. */
          conditionId: ConditionId | null;
          /** Cumulative one-side taker volume in shares. */
          takerVolume: DecimalString;
        };

        type LiveVolume = {
          /** Sum of every returned market's taker volume, in shares. */
          takerVolumeTotal: DecimalString;
          /** Markets ordered by taker volume descending. */
          markets: MarketLiveVolume[];
        };
        ```

        ```json LiveVolume Example theme={null}
        {
          "takerVolumeTotal": "698627.625937",
          "markets": [
            {
              "conditionId": "0x435620fa180dbedb59d34f164d82a447304436b57e87850ca3d1ab2070667006",
              "takerVolume": "631069.486412"
            },
            {
              "conditionId": "0xce67b495c754cd29548e0381d18e9b4701446fa9e32c29d7eec3e7e72ad55152",
              "takerVolume": "67558.139525"
            }
          ]
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_event_live_volume()` on an existing `AsyncPublicClient` or `AsyncSecureClient`.

    ```python theme={null}
    live_volume = await client.get_event_live_volume(event_ids=[int(event_id)])

    # live_volume: LiveVolume
    ```

    <Accordion title="Output: LiveVolume">
      <CodeGroup>
        ```python MarketLiveVolume Type theme={null}
        class MarketLiveVolume:
            condition_id: ConditionId | None
            taker_volume: Decimal
        ```

        ```python LiveVolume Type theme={null}
        class LiveVolume:
            taker_volume_total: Decimal
            markets: tuple[MarketLiveVolume, ...]
        ```

        ```json LiveVolume Example theme={null}
        {
          "taker_volume_total": "4439931.266595",
          "markets": [
            {
              "condition_id": "0xe7f239d76b59c4e614f0bdb80467026da833083e38a31a27fde8e0907417ea12",
              "taker_volume": "1057493.399838"
            },
            {
              "condition_id": "0x4d162a40c3e3f458b0e0017485d7f9e6ead0cdd0573e38b26e0d5420525ccfa4",
              "taker_volume": "780331.374022"
            },
            {
              "condition_id": "0xc8929e80e74ae959b3ed9b9e1c5e0903ad38e02e1339462e3acf8b49bbca35a9",
              "taker_volume": "588112.023677"
            },
            {
              "condition_id": "0x02507350fc2b81c3af36c659a805adbda9b0a81e63a27b29cb273cdd7dbc072e",
              "taker_volume": "576353.148052"
            },
            {
              "condition_id": "0x626d0441b078eefbe2c49047960e7a3b6b4512c235507a2528ccc0f95f2474a6",
              "taker_volume": "507319.025175"
            },
            {
              "condition_id": "0xb4022c0b2718eca7ad27195f2d48f06527fa000269d188e1d3001ff8bbc16956",
              "taker_volume": "479549.81298"
            },
            {
              "condition_id": "0xc60022fe066abd6f96c375adb09f38d92c4931f09c10b805354581b4e5465e93",
              "taker_volume": "313649.055908"
            },
            {
              "condition_id": "0x4092815fea8f91e60586882d45fa2f61bfca8a36d595f47fdea9eec5d2893025",
              "taker_volume": "137123.426943"
            }
          ]
        }
        ```
      </CodeGroup>
    </Accordion>

    Pass one or more integer event IDs to get a combined result. `taker_volume_total` is total taker volume in shares. `markets` contains the per-market breakdown.
  </Tab>

  <Tab title="API">
    Fetch live volume for an event:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/v2/live-volume?event_id=$EVENT_ID"
    ```

    The response contains the event's total taker volume and its market
    breakdown (additional rows trimmed for brevity):

    <Accordion title="Response">
      ```json theme={null}
      {
        "data": {
          "taker_volume_total": 65834357.807271,
          "conditions": [
            {
              "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
              "taker_volume": 37828643.727694
            },
            {
              "condition_id": "0xa7962b12241616d83dcb8c70fc33aa0f48b1ec46a3ad6a23db21d3885dedc4cb",
              "taker_volume": 11161362.976257
            }
          ]
        }
      }
      ```
    </Accordion>

    Markets are ordered by taker volume, largest first.
  </Tab>
</Tabs>

### Market Resolution

Check a market's resolution progress.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchResolutions()` on a `PublicClient` or `SecureClient`.

    ```ts theme={null}
    const resolutions = await client.fetchResolutions({
      conditionIds: [conditionId],
    });

    // resolutions: Resolution[]
    ```

    Each row includes its `status` and `lastUpdatedAt`. `payouts` is present
    when published. No matching resolution returns an empty array.
  </Tab>

  <Tab title="Python">
    Call `get_resolutions()` on an existing `AsyncPublicClient` or `AsyncSecureClient`.

    ```python theme={null}
    resolutions = await client.get_resolutions(condition_ids=[condition_id])

    # resolutions: tuple[Resolution, ...]
    ```

    Each row includes `status` and `last_updated_at`. `payouts` contains the published payouts when available. No matching resolution returns an empty tuple.
  </Tab>

  <Tab title="API">
    Fetch resolution progress for the market:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/v2/resolutions?condition=$CONDITION_ID"
    ```

    `data` contains resolution rows with `status` and `last_update_timestamp`, or
    an empty list when no resolution matches.
  </Tab>
</Tabs>

## Trader Leaderboard

Compare trader volume and profit and loss over a selected period.

<Tabs>
  <Tab title="TypeScript">
    Call `listTraderLeaderboard()` on a `PublicClient` or `SecureClient`.
    `window` defaults to one day, `category` to overall, and `sortBy` to PnL.
    Tied traders share a rank and the next rank skips.

    ```ts theme={null}
    import { LeaderboardWindow, TraderLeaderboardSort } from "@polymarket/client";

    const pages = client.listTraderLeaderboard({
      window: LeaderboardWindow.Day,
      sortBy: TraderLeaderboardSort.Pnl,
      pageSize: 1,
    });

    for await (const page of pages) {
      // page.items: TraderLeaderboardEntry[]
    }
    ```

    <Accordion title="Output: TraderLeaderboardEntry[]">
      <CodeGroup>
        ```ts TraderLeaderboardEntry Type theme={null}
        type TraderLeaderboardEntry = {
          /** Competition rank; ties share a rank and the next rank skips. */
          rank: number;
          wallet: EvmAddress;
          /** PnL in USD for the selected window. */
          pnl: DecimalString;
          /** Both-sides traded volume in shares. */
          volume: DecimalString;
          userName: string | null;
          profileImage: string | null;
          xUsername: string | null;
          verified: boolean;
        };
        ```

        ```json TraderLeaderboardEntry Example theme={null}
        [
          {
            "rank": 1,
            "wallet": "0xfe787d2da716d60e8acff57fb87eb13cd4d10319",
            "pnl": "372027.33333288063",
            "volume": "3036239.1641930016",
            "userName": "ferrariChampions2026",
            "verified": false
          }
        ]
        ```
      </CodeGroup>
    </Accordion>

    Call `fetchTraderLeaderboardStanding()` on a `PublicClient` or
    `SecureClient` to read one wallet's standing on both boards.

    ```ts theme={null}
    const standing = await client.fetchTraderLeaderboardStanding({
      user: wallet,
      window: LeaderboardWindow.Day,
    });

    // standing: TraderLeaderboardStanding | null
    ```

    When called on a `SecureClient`, `user` can be omitted and defaults to the
    authenticated account's wallet.

    <Accordion title="Output: TraderLeaderboardStanding">
      <CodeGroup>
        ```ts TraderLeaderboardStanding Type theme={null}
        type TraderLeaderboardStanding = {
          wallet: EvmAddress;
          pnl: DecimalString;
          volume: DecimalString;
          pnlRank: number | null;
          volumeRank: number | null;
          userName: string | null;
          profileImage: string | null;
          xUsername: string | null;
          verified: boolean;
        };
        ```

        ```json TraderLeaderboardStanding Example theme={null}
        {
          "wallet": "0xfe787d2da716d60e8acff57fb87eb13cd4d10319",
          "pnl": "420711.02199365385",
          "volume": "3920263.4910460007",
          "pnlRank": 1,
          "volumeRank": 1,
          "userName": "ferrariChampions2026",
          "profileImage": null,
          "xUsername": null,
          "verified": false
        }
        ```
      </CodeGroup>
    </Accordion>

    A `null` rank means the wallet is unranked on that board.
  </Tab>

  <Tab title="Python">
    Call `list_trader_leaderboard()` on an existing `AsyncPublicClient` or `AsyncSecureClient`.

    ```python theme={null}
    pages = client.list_trader_leaderboard(window="day", sort_by="PNL", page_size=1)

    async for page in pages:
        # page.items: tuple[TraderLeaderboardEntry, ...]
        pass
    ```

    <Accordion title="Output: TraderLeaderboardEntry">
      <CodeGroup>
        ```python TraderLeaderboardEntry Type theme={null}
        class TraderLeaderboardEntry:
            rank: int
            wallet: EvmAddress
            pnl: Decimal
            volume: Decimal
            user_name: str | None
            profile_image: str | None
            x_username: str | None
            verified: bool
        ```

        ```json TraderLeaderboardEntry Example theme={null}
        {
          "rank": 1,
          "wallet": "0x31e5d54aded22aa7cd80dbe9e33102abe2504879",
          "pnl": "966725.5781960003",
          "volume": "1491184.383039",
          "user_name": "Noprajsk",
          "profile_image": null,
          "x_username": null,
          "verified": false
        }
        ```
      </CodeGroup>
    </Accordion>

    `pnl` is in USDC and `volume` is in shares. Tied traders share a rank and the next rank skips.

    Call `get_trader_leaderboard_standing()` on an existing `AsyncPublicClient` or `AsyncSecureClient`.

    ```python theme={null}
    standing = await client.get_trader_leaderboard_standing(
        user="0x983eedfbd75803602e4a6e6ea9aab6dc6b9c6748",
        window="day",
    )

    # standing: TraderLeaderboardStanding | None
    ```

    <Accordion title="Output: TraderLeaderboardStanding">
      <CodeGroup>
        ```python TraderLeaderboardStanding Type theme={null}
        class TraderLeaderboardStanding:
            wallet: EvmAddress
            pnl: Decimal
            volume: Decimal
            user_name: str | None
            profile_image: str | None
            x_username: str | None
            verified: bool
            pnl_rank: int | None
            volume_rank: int | None
        ```

        ```json TraderLeaderboardStanding Example theme={null}
        {
          "wallet": "0x7c3db723f1d4d8cb9c550095203b686cb11e5c6b",
          "pnl": "957.4473660823187",
          "volume": "64431.760178000004",
          "user_name": "Car",
          "profile_image": "https://polymarket-upload.s3.us-east-2.amazonaws.com/profile-image-501613-aa434e55-7732-41b1-9650-83a9d1d716ef.png",
          "x_username": "CarOnPolymarket",
          "verified": true,
          "pnl_rank": 1045,
          "volume_rank": 424
        }
        ```
      </CodeGroup>
    </Accordion>

    `None` means no standing is available. A `None` rank means the wallet is unranked on that board. Secure clients default `user` to the authenticated wallet.
  </Tab>

  <Tab title="API">
    List the trader leaderboard for a time period. The board ranks by PnL by
    default; pass `sort_by=VOLUME` for the volume board:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/v2/leaderboard?time_period=day&limit=1"
    ```

    The response contains the ranked traders (row fields trimmed for brevity):

    <Accordion title="Response">
      ```json theme={null}
      {
        "data": [
          {
            "rank": 1,
            "user_id": "0x34dd4a4b70eaf79a17878f7938263c801d4dfd83",
            "user_name": "vito3corleone",
            "pnl": 470760.47323424,
            "volume": 1485869.23,
            "verified": false
          }
        ],
        "pagination": {
          "limit": 1,
          "offset": 0,
          "has_more": true,
          "next_cursor": "eyJkYXRhIjp7InR5cGUiOiJsZWFkZXJib2FyZCI…"
        }
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

## Biggest Winners

Compare individual winning positions by their profit at resolution.

<Tabs>
  <Tab title="TypeScript">
    Call `listBiggestWinners()` on a `PublicClient` or `SecureClient`.

    ```ts theme={null}
    import { LeaderboardWindow } from "@polymarket/client";

    const pages = client.listBiggestWinners({
      window: LeaderboardWindow.Day,
      pageSize: 10,
    });

    for await (const page of pages) {
      // page.items: BiggestWinner[]
    }
    ```

    `window` selects the resolution period. Each row is one position. Check
    `kind` before using `eventId`, which is `null` for Combos.
  </Tab>

  <Tab title="Python">
    Call `list_biggest_winners()` on an existing `AsyncPublicClient` or `AsyncSecureClient`.

    ```python theme={null}
    pages = client.list_biggest_winners(window="day", page_size=10)

    async for page in pages:
        # page.items: tuple[MarketBiggestWinner | ComboBiggestWinner, ...]
        pass
    ```

    `window` selects the resolution period. Each row is one winning position. Check `kind` before accessing market-specific fields. `MarketBiggestWinner` identifies the asset with `asset_id` and includes `event_id`. `ComboBiggestWinner` uses `position_id`.
  </Tab>

  <Tab title="API">
    List the largest wins resolved in the last day:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/v2/biggest-winners?time_period=day&limit=10"
    ```

    `data` contains one row per winning position. Continue with
    `pagination.next_cursor` as `cursor` until it is `null`.
  </Tab>
</Tabs>

## Builder Analytics

Evaluate the reach of a builder integration through its attributed trading
activity.

### Builder Leaderboard

Compare builders by attributed volume and active users.

<Tabs>
  <Tab title="TypeScript">
    Call `listBuilderLeaderboard()` on a `PublicClient` or `SecureClient`.

    ```ts theme={null}
    import { LeaderboardWindow } from "@polymarket/client";

    const pages = client.listBuilderLeaderboard({
      window: LeaderboardWindow.Day,
      pageSize: 1,
    });

    for await (const page of pages) {
      // page.items: BuilderStanding[]
    }
    ```

    <Accordion title="Output: BuilderStanding[]">
      <CodeGroup>
        ```ts BuilderStanding Type theme={null}
        type BuilderStanding = {
          rank: number;
          /** Display name; use `builderCode` as the stable identifier. */
          builderName: string;
          builderCode: BuilderCode;
          profileImage?: string;
          verified: boolean;
          /** Builder-attributed volume in shares. */
          volume: DecimalString;
          activeUsers: number;
        };
        ```

        ```json BuilderStanding Example theme={null}
        [
          {
            "rank": 1,
            "builderName": "betmoar",
            "builderCode": "0xceebf77a833b30520287ddd9478ff51abbdffa30aa90a8d655dba0e8a79ce0c1",
            "verified": true,
            "volume": "1994518.4590840002",
            "activeUsers": 150
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `list_builder_leaderboard()` on an existing `AsyncPublicClient` or `AsyncSecureClient`.

    ```python theme={null}
    pages = client.list_builder_leaderboard(window="day", page_size=1)

    async for page in pages:
        # page.items: tuple[BuilderStanding, ...]
        pass
    ```

    <Accordion title="Output: BuilderStanding">
      <CodeGroup>
        ```python BuilderStanding Type theme={null}
        class BuilderStanding:
            rank: int
            builder_name: str
            builder_code: HexString
            profile_image: str | None
            verified: bool
            volume: Decimal
            active_users: int
        ```

        ```json BuilderStanding Example theme={null}
        {
          "rank": 1,
          "builder_name": "betmoar",
          "builder_code": "0xceebf77a833b30520287ddd9478ff51abbdffa30aa90a8d655dba0e8a79ce0c1",
          "profile_image": "https://polymarket-upload.s3.us-east-2.amazonaws.com/betmoar_2.png",
          "verified": true,
          "volume": "3420022.424486001",
          "active_users": 165
        }
        ```
      </CodeGroup>
    </Accordion>

    Use `builder_code` as the stable identifier. `volume` is builder-attributed trading volume in shares.
  </Tab>

  <Tab title="API">
    List the builder leaderboard for a time period:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/v2/builders/leaderboard?time_period=day&limit=1"
    ```

    The response contains the ranked builders (row fields trimmed for brevity):

    <Accordion title="Response">
      ```json theme={null}
      {
        "data": [
          {
            "rank": 1,
            "builder_name": "betmoar",
            "builder_code": "0xceebf77a833b30520287ddd9478ff51abbdffa30aa90a8d655dba0e8a79ce0c1",
            "verified": true,
            "volume": 3001409.090169,
            "active_users": 160
          }
        ],
        "pagination": {
          "limit": 1,
          "offset": 0,
          "has_more": true,
          "next_cursor": "eyJkYXRhIjp7InR5cGUiOiJidWlsZGVyc19sZWFkZXJib2FyZCI…"
        }
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

### Builder Volume

Track attributed builder volume and active users over time.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchBuilderVolume()` on a `PublicClient` or `SecureClient`.
    `interval` picks the bucket width and `bucketLimit` counts the most recent
    complete buckets (at most 90); every builder active in a bucket gets one
    row.

    ```ts theme={null}
    import { BuilderVolumeInterval } from "@polymarket/client";

    const builderVolume = await client.fetchBuilderVolume({
      interval: BuilderVolumeInterval.Day,
      bucketLimit: 1,
    });

    // builderVolume: BuilderVolumePoint[]
    ```

    <Accordion title="Output: BuilderVolumePoint[]">
      <CodeGroup>
        ```ts BuilderVolumePoint Type theme={null}
        type BuilderVolumePoint = {
          /** UTC start date of the volume bucket. */
          bucketDate: IsoCalendarDateString;
          /** Builder rank within this bucket. */
          rank: number;
          /** Display name; use `builderCode` as the stable identifier. */
          builderName: string;
          builderCode: BuilderCode;
          profileImage?: string;
          verified: boolean;
          /** Builder-attributed volume in shares for this bucket. */
          volume: DecimalString;
          activeUsers: number;
        };
        ```

        ```json BuilderVolumePoint Example theme={null}
        [
          {
            "bucketDate": "2026-09-03",
            "rank": 1,
            "builderName": "betmoar",
            "builderCode": "0xceebf77a833b30520287ddd9478ff51abbdffa30aa90a8d655dba0e8a79ce0c1",
            "verified": true,
            "volume": "1990330.1396780002",
            "activeUsers": 150
          }
        ]
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_builder_volumes()` on an existing `AsyncPublicClient` or `AsyncSecureClient`.

    ```python theme={null}
    builder_volume = await client.get_builder_volumes(interval="day", bucket_limit=1)

    # builder_volume: tuple[BuilderVolumePoint, ...]
    ```

    <Accordion title="Output: BuilderVolumePoint">
      <CodeGroup>
        ```python BuilderVolumePoint Type theme={null}
        class BuilderVolumePoint:
            rank: int
            builder_name: str
            builder_code: HexString
            profile_image: str | None
            verified: bool
            volume: Decimal
            active_users: int
            bucket_date: date
        ```

        ```json BuilderVolumePoint Example theme={null}
        {
          "rank": 1,
          "builder_name": "betmoar",
          "builder_code": "0xceebf77a833b30520287ddd9478ff51abbdffa30aa90a8d655dba0e8a79ce0c1",
          "profile_image": "https://polymarket-upload.s3.us-east-2.amazonaws.com/betmoar_2.png",
          "verified": true,
          "volume": "3419926.8151110006",
          "active_users": 165,
          "bucket_date": "2026-09-08"
        }
        ```
      </CodeGroup>
    </Accordion>

    The result is a tuple of calendar buckets. `bucket_limit` counts dates, not rows, and accepts at most 90. Each active builder has a row for that date. `volume` is in shares.
  </Tab>

  <Tab title="API">
    Fetch builder volume over time. Each row is one builder's volume in one
    time bucket, with the builder's rank within that bucket; `limit` counts
    the most recent buckets:

    ```bash theme={null}
    curl "https://data-api.polymarket.com/v2/builders/volume?interval=day&limit=1"
    ```

    The response contains builder activity by time bucket (row fields and
    additional rows trimmed for brevity):

    <Accordion title="Response">
      ```json theme={null}
      {
        "data": [
          {
            "date": "2026-08-31",
            "rank": 1,
            "builder_name": "betmoar",
            "builder_code": "0xceebf77a833b30520287ddd9478ff51abbdffa30aa90a8d655dba0e8a79ce0c1",
            "verified": true,
            "volume": 2961462.652905,
            "active_users": 160
          },
          {
            "date": "2026-08-31",
            "rank": 2,
            "builder_name": "traderline",
            "builder_code": "0x6b0e773fada0a2ec67c956b25a737d353a534ea33db56c717ba7854346c67984",
            "verified": true,
            "volume": 2445464.426092,
            "active_users": 112
          }
        ]
      }
      ```
    </Accordion>
  </Tab>
</Tabs>
