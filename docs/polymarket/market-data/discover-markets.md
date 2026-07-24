<!--
Source: https://docs.polymarket.com/market-data/discover-markets.md
Downloaded: 2026-07-24T21:04:03.609Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Discover Markets

> Learn how to find and filter events and markets and explore related metadata.

Find the events and markets your integration needs, from a specific Polymarket link to a broader view of what is active. This data is public and does not require authentication.

## Events

An event groups one or more markets under a shared question set. A single-market event asks one yes/no question; a multi-market event splits a broader question into individual outcomes, such as one market per candidate in an election.

### Fetch an Event

Fetch an event when you already know its identifier.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchEvent()` on a `PublicClient` or `SecureClient` to fetch an event by ID.

    ```ts theme={null}
    const event = await client.fetchEvent({ id: "90177" });

    // event: Event
    ```

    You can also fetch an event by its Polymarket URL or slug:

    <CodeGroup>
      ```ts URL theme={null}
      const event = await client.fetchEvent({
        url: "https://polymarket.com/event/will-the-us-confirm-that-aliens-exist-before-2027",
      });
      ```

      ```ts Slug theme={null}
      const event = await client.fetchEvent({
        slug: "will-the-us-confirm-that-aliens-exist-before-2027",
      });
      ```
    </CodeGroup>

    <Accordion title="Output: Event">
      <CodeGroup>
        ```ts Event Type theme={null}
        type Market = {
          id: string;
          slug?: string | null;
          question?: string | null;
          conditionId: string | null;
          outcomes: {
            yes: { tokenId: string | null };
            no: { tokenId: string | null };
          };
        };

        type Event = {
          id: string;
          slug?: string | null;
          title?: string | null;
          markets: Market[];
        };
        ```

        ```json Event Example theme={null}
        {
          "id": "90177",
          "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
          "title": "Will the US confirm that aliens exist by...?",
          "markets": [
            {
              "id": "703257",
              "slug": "will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
              "question": "Will the US confirm that aliens exist before 2027?",
              "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
              "outcomes": {
                "yes": {
                  "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417"
                },
                "no": {
                  "tokenId": "7305630249804085635496399869905769372294302716159034447326228509068694952392"
                }
              }
            },
            "..."
          ]
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_event()` on an `AsyncPublicClient` or `AsyncSecureClient` to fetch an event by ID.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    event = await client.get_event(id="90177")

    # event: Event
    ```

    You can also fetch an event by its Polymarket URL or slug:

    <CodeGroup>
      ```python URL theme={null}
      event = await client.get_event(
          url="https://polymarket.com/event/will-the-us-confirm-that-aliens-exist-before-2027",
      )
      ```

      ```python Slug theme={null}
      event = await client.get_event(
          slug="will-the-us-confirm-that-aliens-exist-before-2027",
      )
      ```
    </CodeGroup>

    <Accordion title="Output: Event">
      <CodeGroup>
        ```python Event Type theme={null}
        class MarketOutcome:
            token_id: str | None

        class MarketOutcomes:
            yes: MarketOutcome
            no: MarketOutcome

        class Market:
            id: str
            slug: str | None
            question: str | None
            condition_id: str | None
            outcomes: MarketOutcomes

        class Event:
            id: str
            slug: str | None
            title: str | None
            markets: tuple[Market, ...]
        ```

        ```json Event Example theme={null}
        {
          "id": "90177",
          "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
          "title": "Will the US confirm that aliens exist by...?",
          "markets": [
            {
              "id": "703257",
              "slug": "will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
              "question": "Will the US confirm that aliens exist before 2027?",
              "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
              "outcomes": {
                "yes": {
                  "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417"
                },
                "no": {
                  "token_id": "7305630249804085635496399869905769372294302716159034447326228509068694952392"
                }
              }
            },
            "..."
          ]
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    Fetch an event by ID:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/events/90177"
    ```

    You can also fetch an event by slug:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/events/slug/will-the-us-confirm-that-aliens-exist-before-2027"
    ```

    <Accordion title="Output: Event">
      <CodeGroup>
        ```ts Event Type theme={null}
        type Market = {
          id: string;
          slug: string;
          question: string | null;
          conditionId: string | null;
          clobTokenIds: string | null;
        };

        type Event = {
          id: string;
          slug: string | null;
          title: string | null;
          markets: Market[];
        };
        ```

        ```json Event Example theme={null}
        {
          "id": "90177",
          "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
          "title": "Will the US confirm that aliens exist by...?",
          "markets": [
            {
              "id": "703257",
              "slug": "will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
              "question": "Will the US confirm that aliens exist before 2027?",
              "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
              "clobTokenIds": "[\"107505882767731489358349912513945399560393482969656700824895970500493757150417\",\"7305630249804085635496399869905769372294302716159034447326228509068694952392\"]"
            },
            "..."
          ]
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>
</Tabs>

### List Events

List events when you need a browsable or filterable feed.

<Tabs>
  <Tab title="TypeScript">
    Call `listEvents()` on a `PublicClient` or `SecureClient` to page through events.

    ```ts theme={null}
    const pages = client.listEvents({ closed: false, pageSize: 20 });

    for await (const page of pages) {
      // page.items: Event[]
    }
    ```

    <Accordion title="Output: Event[]">
      <CodeGroup>
        ```ts Page Type theme={null}
        type Market = {
          id: string;
          slug?: string | null;
          question?: string | null;
          conditionId: string | null;
        };

        type Event = {
          id: string;
          slug?: string | null;
          title?: string | null;
          markets: Market[];
        };

        type Page = {
          items: Event[];
          hasMore: boolean;
          nextCursor?: string;
        };
        ```

        ```json Page Example theme={null}
        {
          "items": [
            {
              "id": "16183",
              "slug": "kraken-ipo-in-2025",
              "title": "Kraken IPO by ___ ?",
              "markets": [
                {
                  "id": "516950",
                  "slug": "kraken-ipo-in-2025",
                  "question": "Kraken IPO in 2025?"
                },
                "..."
              ]
            },
            {
              "id": "16263",
              "slug": "macron-out-in-2025",
              "title": "Macron out by...?",
              "markets": ["..."]
            },
            "..."
          ],
          "hasMore": true,
          "nextCursor": "9YTr9qyfU9571U9_leL7LNSWUI6EXd7rpAqdh-EbPr17InYiOjEsImsiOiJldmVudHMiLCJvaCI6IjRmNTNjZGExOGMyYmFhMGMwMzU0YmI1ZjlhM2VjYmU1ZWQxMmFiNGQ4ZTExYmE4NzNjMmYxMTE2MTIwMmI5NDUiLCJrZXlzIjpbeyJ0Ijoic3RyaW5nIiwidiI6IjI1ODE1In1dfQ"
        }
        ```
      </CodeGroup>
    </Accordion>

    Filter by tag by passing one or more numeric tag IDs:

    ```ts theme={null}
    const pages = client.listEvents({
      tagIds: [745], // numeric ID for the "nba" tag; see Tags below to look these up
      closed: false,
    });

    for await (const page of pages) {
      // page.items: Event[]
    }
    ```
  </Tab>

  <Tab title="Python">
    Call `list_events()` on an `AsyncPublicClient` or `AsyncSecureClient` to page through events.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    pages = client.list_events(closed=False, page_size=20)

    async for page in pages:
        ...  # page.items: tuple[Event, ...]
    ```

    <Accordion title="Output: Event[]">
      <CodeGroup>
        ```python Page Type theme={null}
        class Market:
            id: str
            slug: str | None
            question: str | None
            condition_id: str | None

        class Event:
            id: str
            slug: str | None
            title: str | None
            markets: tuple[Market, ...]

        class Page:
            items: tuple[Event, ...]
            has_more: bool
            next_cursor: str | None
        ```

        ```json Page Example theme={null}
        {
          "items": [
            {
              "id": "16183",
              "slug": "kraken-ipo-in-2025",
              "title": "Kraken IPO by ___ ?"
            },
            {
              "id": "16263",
              "slug": "macron-out-in-2025",
              "title": "Macron out by...?"
            },
            "..."
          ],
          "has_more": true,
          "next_cursor": "eyJmIjoiYWQyZjRkNmY4ZDZkIiwiayI6IjlZVHI5cXlmVTk1NzFVOV9sZUw3TE5TV1VJNkVYZDdycEFxZGgtRWJQcjE3SW5ZaU9qRXNJbXNpT2lKbGRtVnVkSE1pTENKdmFDSTZJalJtTlROalpHRXhPR015WW1GaE1HTXdNelUwWW1JMVpqbGhNMlZqWW1VMVpXUXhNbUZpTkdRNFpURXhZbUU0TnpOak1tWXhNVEUyTVRJd01tSTVORFVpTENKclpYbHpJanBiZXlKMElqb2ljM1J5YVc1bklpd2lkaUk2SWpJMU9ERTFJbjFkZlEiLCJwIjoiL2V2ZW50cy9rZXlzZXQiLCJzdmMiOiJnYW1tYSIsInYiOjF9"
        }
        ```
      </CodeGroup>
    </Accordion>

    Filter by tag by passing a numeric tag ID:

    ```python theme={null}
    pages = client.list_events(
        tag_ids=[745],  # numeric ID for the "nba" tag; see Tags below to look these up
        closed=False,
    )

    async for page in pages:
        ...  # page.items: tuple[Event, ...]
    ```
  </Tab>

  <Tab title="API">
    List active events:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/events/keyset?closed=false&limit=20"
    ```

    <Accordion title="Output: Events Page">
      ```json Example theme={null}
      {
        "events": [
          {
            "id": "16183",
            "slug": "kraken-ipo-in-2025",
            "title": "Kraken IPO by ___ ?"
          },
          "..."
        ],
        "next_cursor": "9YTr9qyfU9571U9_leL7LNSWUI6EXd7rpAqdh-EbPr17InYiOjEsImsiOiJldmVudHMiLCJvaCI6IjRmNTNjZGExOGMyYmFhMGMwMzU0YmI1ZjlhM2VjYmU1ZWQxMmFiNGQ4ZTExYmE4NzNjMmYxMTE2MTIwMmI5NDUiLCJrZXlzIjpbeyJ0Ijoic3RyaW5nIiwidiI6IjI1ODE1In1dfQ"
      }
      ```
    </Accordion>

    Pass `next_cursor` as `after_cursor` to fetch the next page:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/events/keyset?closed=false&limit=20&after_cursor=<next_cursor>"
    ```

    Filter by tag with `tag_id`:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/events/keyset?tag_id=745&closed=false&limit=20"
    ```
  </Tab>
</Tabs>

## Markets

A market is a single yes/no question with two outcome token IDs: one for YES and one for NO.

### Fetch a Market

Fetch a market when you already know its identifier.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchMarket()` on a `PublicClient` or `SecureClient` to fetch a market by ID.

    ```ts theme={null}
    const market = await client.fetchMarket({ id: "703257" });

    // market: Market
    ```

    You can also fetch a market by its Polymarket URL or slug:

    <CodeGroup>
      ```ts URL theme={null}
      const market = await client.fetchMarket({
        url: "https://polymarket.com/market/will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
      });
      ```

      ```ts Slug theme={null}
      const market = await client.fetchMarket({
        slug: "will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
      });
      ```
    </CodeGroup>

    <Accordion title="Output: Market">
      <CodeGroup>
        ```ts Market Type theme={null}
        type Market = {
          id: string;
          slug?: string | null;
          question?: string | null;
          conditionId: string | null;
          outcomes: {
            yes: { tokenId: string | null };
            no: { tokenId: string | null };
          };
        };
        ```

        ```json Market Example theme={null}
        {
          "id": "703257",
          "slug": "will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
          "question": "Will the US confirm that aliens exist before 2027?",
          "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
          "outcomes": {
            "yes": {
              "tokenId": "107505882767731489358349912513945399560393482969656700824895970500493757150417"
            },
            "no": {
              "tokenId": "7305630249804085635496399869905769372294302716159034447326228509068694952392"
            }
          }
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_market()` on an `AsyncPublicClient` or `AsyncSecureClient` to fetch a market by ID.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    market = await client.get_market(id="703257")

    # market: Market
    ```

    You can also fetch a market by its Polymarket URL or slug:

    <CodeGroup>
      ```python URL theme={null}
      market = await client.get_market(
          url="https://polymarket.com/market/will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
      )
      ```

      ```python Slug theme={null}
      market = await client.get_market(
          slug="will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
      )
      ```
    </CodeGroup>

    <Accordion title="Output: Market">
      <CodeGroup>
        ```python Market Type theme={null}
        class MarketOutcome:
            token_id: str | None

        class MarketOutcomes:
            yes: MarketOutcome
            no: MarketOutcome

        class Market:
            id: str
            slug: str | None
            question: str | None
            condition_id: str | None
            outcomes: MarketOutcomes
        ```

        ```json Market Example theme={null}
        {
          "id": "703257",
          "slug": "will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
          "question": "Will the US confirm that aliens exist before 2027?",
          "condition_id": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
          "outcomes": {
            "yes": {
              "token_id": "107505882767731489358349912513945399560393482969656700824895970500493757150417"
            },
            "no": {
              "token_id": "7305630249804085635496399869905769372294302716159034447326228509068694952392"
            }
          }
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    Fetch a market by ID:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/markets/703257"
    ```

    You can also fetch a market by slug:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/markets/slug/will-the-us-confirm-that-aliens-exist-before-2027-789-924-249"
    ```

    <Accordion title="Output: Market">
      ```json Example theme={null}
      {
        "id": "703257",
        "slug": "will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
        "question": "Will the US confirm that aliens exist before 2027?",
        "conditionId": "0x747dc809fb79e1b05be09c42d6179459a58de2ef3e40f02484a4e1260f741f75",
        "clobTokenIds": "[\"107505882767731489358349912513945399560393482969656700824895970500493757150417\",\"7305630249804085635496399869905769372294302716159034447326228509068694952392\"]"
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

### List Markets

List markets when you need a filterable feed, such as browsing by tag, sport, or liquidity.

<Tabs>
  <Tab title="TypeScript">
    Call `listMarkets()` on a `PublicClient` or `SecureClient` to page through markets.

    ```ts theme={null}
    const pages = client.listMarkets({
      tagId: 745, // numeric ID for the "nba" tag; see Tags below to look these up
      closed: false,
      pageSize: 20,
    });

    for await (const page of pages) {
      // page.items: Market[]
    }
    ```

    <Accordion title="Output: Market[]">
      ```json Example theme={null}
      [
        {
          "id": "741099",
          "slug": "will-lebron-james-retire-before-next-nba-season",
          "question": "Will LeBron James retire before next NBA season?",
          "conditionId": "0x73057b771600660ac6e659c5b831587fd3bdd378e63f359731aa3e1538577fb0"
        },
        {
          "id": "1747460",
          "slug": "will-giannis-antetokounmpo-play-for-the-atlanta-hawks-in-2026-27",
          "question": "Will Giannis Antetokounmpo play for the Atlanta Hawks in 2026-27?",
          "conditionId": "0xff2715084bb2cf20d9b88b74ef809c3317b1e99f6c006faee9b83bc85aa0fc99"
        },
        "..."
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `list_markets()` on an `AsyncPublicClient` or `AsyncSecureClient` to page through markets.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    pages = client.list_markets(
        tag_id=745,  # numeric ID for the "nba" tag; see Tags below to look these up
        closed=False,
        page_size=20,
    )

    async for page in pages:
        ...  # page.items: tuple[Market, ...]
    ```

    <Accordion title="Output: Market[]">
      ```json Example theme={null}
      [
        {
          "id": "741099",
          "slug": "will-lebron-james-retire-before-next-nba-season",
          "question": "Will LeBron James retire before next NBA season?",
          "condition_id": "0x73057b771600660ac6e659c5b831587fd3bdd378e63f359731aa3e1538577fb0"
        },
        {
          "id": "1747460",
          "slug": "will-giannis-antetokounmpo-play-for-the-atlanta-hawks-in-2026-27",
          "question": "Will Giannis Antetokounmpo play for the Atlanta Hawks in 2026-27?",
          "condition_id": "0xff2715084bb2cf20d9b88b74ef809c3317b1e99f6c006faee9b83bc85aa0fc99"
        },
        "..."
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    List active markets by tag:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/markets/keyset?tag_id=745&closed=false&limit=20"
    ```

    <Accordion title="Output: Markets Page">
      ```json Example theme={null}
      {
        "markets": [
          {
            "id": "540817",
            "slug": "new-rhianna-album-before-gta-vi-926",
            "question": "New Rihanna Album before GTA VI?",
            "conditionId": "0x1fad72fae204143ff1c3035e99e7c0f65ea8d5cd9bd1070987bd1a3316f772be"
          },
          "..."
        ],
        "next_cursor": "8ejWEAtEdA8gG05m-tRMeLtBDl1Wbw1fUbXVfm0eYSZ7InYiOjEsImsiOiJtYXJrZXRzIiwib2giOiI0ZjUzY2RhMThjMmJhYTBjMDM1NGJiNWY5YTNlY2JlNWVkMTJhYjRkOGUxMWJhODczYzJmMTExNjEyMDJiOTQ1Iiwia2V5cyI6W3sidCI6InN0cmluZyIsInYiOiI1NTg5NDAifV19"
      }
      ```
    </Accordion>

    Pass `next_cursor` as `after_cursor` to fetch the next page:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/markets/keyset?tag_id=745&closed=false&limit=20&after_cursor=<next_cursor>"
    ```
  </Tab>
</Tabs>

After you choose a market, continue to [Market Details](/market-data/market-details) to extract token IDs and trading fields.

## Series

A series groups a recurring set of events under one theme. For example, a weekly Fed rate-decision series has one event per meeting, and a season-long league series has one event per matchup.

### Fetch a Series

Fetch a series by ID.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchSeries()` on a `PublicClient` or `SecureClient` to fetch a series by ID.

    ```ts theme={null}
    const series = await client.fetchSeries({ id: "1" });

    // series: Series
    ```

    <Accordion title="Output: Series">
      ```json Example theme={null}
      {
        "id": "1",
        "slug": "nfl",
        "title": "NFL",
        "recurrence": "weekly",
        "closed": false
      }
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_series()` on an `AsyncPublicClient` or `AsyncSecureClient` to fetch a series by ID.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    series = await client.get_series("1")

    # series: Series
    ```

    <Accordion title="Output: Series">
      ```json Example theme={null}
      {
        "id": "1",
        "slug": "nfl",
        "title": "NFL",
        "recurrence": "weekly",
        "closed": false
      }
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    Fetch a series by ID:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/series/1"
    ```

    <Accordion title="Output: Series">
      ```json Example theme={null}
      {
        "id": "1",
        "slug": "nfl",
        "title": "NFL",
        "recurrence": "weekly",
        "closed": false
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

### List Series

<Tabs>
  <Tab title="TypeScript">
    Call `listSeries()` on a `PublicClient` or `SecureClient` to page through series.

    ```ts theme={null}
    const pages = client.listSeries({
      recurrence: "weekly",
      closed: false,
      pageSize: 20,
    });

    for await (const page of pages) {
      // page.items: Series[]
    }
    ```

    <Accordion title="Output: Series[]">
      ```json Example theme={null}
      [
        { "id": "1", "slug": "nfl", "title": "NFL" },
        { "id": "2", "slug": "nba", "title": "NBA" },
        { "id": "3", "slug": "mlb", "title": "MLB" },
        "..."
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `list_series()` on an `AsyncPublicClient` or `AsyncSecureClient` to page through series.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    pages = client.list_series(
        recurrence="weekly",
        closed=False,
        page_size=20,
    )

    async for page in pages:
        ...  # page.items: tuple[Series, ...]
    ```

    <Accordion title="Output: Series[]">
      ```json Example theme={null}
      [
        { "id": "1", "slug": "nfl", "title": "NFL" },
        { "id": "2", "slug": "nba", "title": "NBA" },
        { "id": "3", "slug": "mlb", "title": "MLB" },
        "..."
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    List active weekly series:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/series?recurrence=weekly&closed=false&limit=20"
    ```

    <Accordion title="Output: Series[]">
      ```json Example theme={null}
      [
        { "id": "1", "slug": "nfl", "title": "NFL" },
        { "id": "2", "slug": "nba", "title": "NBA" },
        { "id": "3", "slug": "mlb", "title": "MLB" },
        "..."
      ]
      ```
    </Accordion>
  </Tab>
</Tabs>

## Sports

Sports metadata maps a sport to its Polymarket tags and market types. Use it to browse sports markets by league, look up the valid market types for filtering, or resolve team rosters.

### List Sports

<Tabs>
  <Tab title="TypeScript">
    Call `listSports()` on a `PublicClient` or `SecureClient` to list supported sports.

    ```ts theme={null}
    const sports = await client.listSports();

    // sports: SportsMetadata[]
    ```

    <Accordion title="Output: SportsMetadata[]">
      ```json Example theme={null}
      [
        { "id": 1, "sport": "ncaab", "tags": "1,100149,100639" },
        { "id": 2, "sport": "epl", "tags": "1,82,306,100639,100350" },
        { "id": 3, "sport": "lal", "tags": "1,780,100639,100350" }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_sports()` on an `AsyncPublicClient` or `AsyncSecureClient` to list supported sports.
    The synchronous `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    sports = await client.get_sports()

    # sports: tuple[SportsMetadata, ...]
    ```

    <Accordion title="Output: SportsMetadata[]">
      ```json Example theme={null}
      [
        { "id": 1, "sport": "ncaab", "tags": "1,100149,100639" },
        { "id": 2, "sport": "epl", "tags": "1,82,306,100639,100350" },
        { "id": 3, "sport": "lal", "tags": "1,780,100639,100350" }
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    List supported sports:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/sports"
    ```

    <Accordion title="Output: SportsMetadata[]">
      ```json Example theme={null}
      [
        { "sport": "ncaab", "tags": "1,100149,100639" },
        { "sport": "epl", "tags": "1,82,306,100639,100350" },
        { "sport": "lal", "tags": "1,780,100639,100350" }
      ]
      ```
    </Accordion>
  </Tab>
</Tabs>

### Sports Market Types

A sports market's `sportsMarketType` field tells you which line it prices: a moneyline (which team wins), a spread (win by how much), or a total (over/under a combined score). Fetch the valid values, then pass one or more of them to `listMarkets` to filter.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchSportsMarketTypes()` on a `PublicClient` or `SecureClient` to list the
    supported market types.

    ```ts theme={null}
    const { marketTypes } = await client.fetchSportsMarketTypes();

    // marketTypes: string[]
    ```

    <Accordion title="Output: string[]">
      ```json Example theme={null}
      {
        "marketTypes": ["moneyline", "spreads", "totals"]
      }
      ```
    </Accordion>

    Filter markets by type:

    ```ts theme={null}
    const pages = client.listMarkets({
      sportsMarketTypes: ["spreads"],
      closed: false,
      pageSize: 20,
    });

    for await (const page of pages) {
      // page.items: Market[]
    }
    ```
  </Tab>

  <Tab title="Python">
    Call `get_sports_market_types()` on an `AsyncPublicClient` or
    `AsyncSecureClient` to list the supported market types. The synchronous
    `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    market_types = await client.get_sports_market_types()

    # market_types.market_types: tuple[str, ...] | None
    ```

    <Accordion title="Output: string[]">
      ```json Example theme={null}
      {
        "market_types": ["moneyline", "spreads", "totals"]
      }
      ```
    </Accordion>

    Filter markets by type:

    ```python theme={null}
    pages = client.list_markets(
        sports_market_types=["spreads"],
        closed=False,
        page_size=20,
    )

    async for page in pages:
        ...  # page.items: tuple[Market, ...]
    ```
  </Tab>

  <Tab title="API">
    List supported sports market types:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/sports/market-types"
    ```

    <Accordion title="Output: string[]">
      ```json Example theme={null}
      {
        "marketTypes": ["moneyline", "spreads", "totals"]
      }
      ```
    </Accordion>

    Filter markets by type:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/markets/keyset?sports_market_types=spreads&closed=false&limit=20"
    ```
  </Tab>
</Tabs>

### List Teams

<Tabs>
  <Tab title="TypeScript">
    Call `listTeams()` on a `PublicClient` or `SecureClient` to page through teams.

    ```ts theme={null}
    const pages = client.listTeams({ league: ["nba"], pageSize: 20 });

    for await (const page of pages) {
      // page.items: Team[]
    }
    ```

    <Accordion title="Output: Team[]">
      ```json Example theme={null}
      [
        {
          "id": 114168,
          "name": "Candace's Rising Stars",
          "league": "nba",
          "abbreviation": "crs"
        },
        {
          "id": 114166,
          "name": "Chuck's Global Stars",
          "league": "nba",
          "abbreviation": "cgs"
        },
        "..."
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `list_teams()` on an `AsyncPublicClient` or `AsyncSecureClient` to page
    through teams. The synchronous `PublicClient` and `SecureClient` provide the
    same method.

    ```python theme={null}
    pages = client.list_teams(league="nba", page_size=20)

    async for page in pages:
        ...  # page.items: tuple[Team, ...]
    ```

    <Accordion title="Output: Team[]">
      ```json Example theme={null}
      [
        {
          "id": 114168,
          "name": "Candace's Rising Stars",
          "league": "nba",
          "abbreviation": "crs"
        },
        {
          "id": 114166,
          "name": "Chuck's Global Stars",
          "league": "nba",
          "abbreviation": "cgs"
        },
        "..."
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    List teams in a league:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/teams?league=nba&limit=20"
    ```

    <Accordion title="Output: Team[]">
      ```json Example theme={null}
      [
        {
          "id": 114168,
          "name": "Candace's Rising Stars",
          "league": "nba",
          "abbreviation": "crs"
        },
        "..."
      ]
      ```
    </Accordion>
  </Tab>
</Tabs>

## Search

Search returns matching events, tags, and profiles for a free-text query in one call. Use it for a search bar or a "jump to market" input.

<Tabs>
  <Tab title="TypeScript">
    Call `search()` on a `PublicClient` or `SecureClient` to search Polymarket.

    ```ts theme={null}
    const pages = client.search({ q: "aliens", pageSize: 10 });

    for await (const page of pages) {
      // page.items.events: Event[]
      // page.items.tags: SearchTag[]
      // page.items.profiles: Profile[]
    }
    ```

    <Accordion title="Output: SearchResults">
      <CodeGroup>
        ```ts SearchResults Type theme={null}
        type Event = {
          id: string;
          slug?: string | null;
          title?: string | null;
        };

        type SearchTag = {
          id: string;
          label?: string | null;
          slug?: string | null;
          eventCount?: number | null;
        };

        type Profile = {
          pseudonym?: string | null;
          wallet?: string | null;
        };

        type SearchResults = {
          events: Event[];
          tags: SearchTag[];
          profiles: Profile[];
        };
        ```

        ```json SearchResults Example theme={null}
        {
          "events": [
            {
              "id": "90177",
              "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
              "title": "Will the US confirm that aliens exist by...?"
            },
            "..."
          ],
          "tags": [],
          "profiles": []
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `search()` on an `AsyncPublicClient` or `AsyncSecureClient` to search
    Polymarket. The synchronous `PublicClient` and `SecureClient` provide the
    same method.

    ```python theme={null}
    pages = client.search(q="aliens", page_size=10)

    async for page in pages:
        for search_results in page.items:
            # search_results.events: tuple[Event, ...]
            # search_results.tags: tuple[SearchTag, ...]
            # search_results.profiles: tuple[Profile, ...]
            ...
    ```

    <Accordion title="Output: SearchResults">
      <CodeGroup>
        ```python SearchResults Type theme={null}
        class Event:
            id: str
            slug: str | None
            title: str | None

        class SearchTag:
            id: str
            label: str | None
            slug: str | None
            event_count: int | None

        class Profile:
            pseudonym: str | None
            wallet: str | None

        class SearchResults:
            events: tuple[Event, ...]
            tags: tuple[SearchTag, ...]
            profiles: tuple[Profile, ...]
        ```

        ```json SearchResults Example theme={null}
        {
          "events": [
            {
              "id": "90177",
              "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
              "title": "Will the US confirm that aliens exist by...?"
            },
            "..."
          ],
          "tags": [],
          "profiles": []
        }
        ```
      </CodeGroup>
    </Accordion>
  </Tab>

  <Tab title="API">
    Search Polymarket:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/public-search?q=aliens"
    ```

    <Accordion title="Output: Search">
      ```json Example theme={null}
      {
        "events": [
          {
            "id": "90177",
            "slug": "will-the-us-confirm-that-aliens-exist-before-2027",
            "title": "Will the US confirm that aliens exist by...?"
          },
          "..."
        ],
        "tags": [],
        "profiles": [],
        "pagination": {
          "hasMore": true,
          "totalResults": 28
        }
      }
      ```
    </Accordion>
  </Tab>
</Tabs>

## Tags

Tags group events and markets by categories, leagues, people, and themes. Each
tag can link to multiple ranked related tags, forming a directed graph rather
than a strict tree. Use these relationships to expand discovery from one topic
to adjacent topics.

### List Tags

Browse the available tags, for example to build a category filter.

<Tabs>
  <Tab title="TypeScript">
    Call `listTags()` on a `PublicClient` or `SecureClient` to page through tags.

    ```ts theme={null}
    const pages = client.listTags({ pageSize: 20 });

    for await (const page of pages) {
      // page.items: Tag[]
    }
    ```

    <Accordion title="Output: Tag[]">
      ```json Example theme={null}
      [
        {
          "id": "101867",
          "slug": "product-marekt-fit",
          "label": "product marekt fit"
        },
        { "id": "1512", "slug": "caitlin-clark", "label": "caitlin clark" },
        "..."
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `list_tags()` on an `AsyncPublicClient` or `AsyncSecureClient` to page
    through tags. The synchronous `PublicClient` and `SecureClient` provide the
    same method.

    ```python theme={null}
    pages = client.list_tags(page_size=20)

    async for page in pages:
        ...  # page.items: tuple[Tag, ...]
    ```

    <Accordion title="Output: Tag[]">
      ```json Example theme={null}
      [
        {
          "id": "101867",
          "slug": "product-marekt-fit",
          "label": "product marekt fit"
        },
        { "id": "1512", "slug": "caitlin-clark", "label": "caitlin clark" },
        "..."
      ]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    List tags:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/tags?limit=20"
    ```

    <Accordion title="Output: Tag[]">
      ```json Example theme={null}
      [
        {
          "id": "101867",
          "slug": "product-marekt-fit",
          "label": "product marekt fit"
        },
        { "id": "1512", "slug": "caitlin-clark", "label": "caitlin clark" },
        "..."
      ]
      ```
    </Accordion>
  </Tab>
</Tabs>

### Fetch a Tag

Fetch a tag by slug to resolve its numeric ID. You'll need that ID for the `tagId`/`tagIds` filters used earlier in Events and Markets.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchTag()` on a `PublicClient` or `SecureClient` to fetch a tag by slug.

    ```ts theme={null}
    const nba = await client.fetchTag({ slug: "nba" });

    // nba: Tag
    ```

    <Accordion title="Output: Tag">
      ```json Example theme={null}
      { "id": "745", "slug": "nba", "label": "NBA" }
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_tag()` on an `AsyncPublicClient` or `AsyncSecureClient` to fetch a
    tag by slug. The synchronous `PublicClient` and `SecureClient` provide the
    same method.

    ```python theme={null}
    nba = await client.get_tag(slug="nba")

    # nba: Tag
    ```

    <Accordion title="Output: Tag">
      ```json Example theme={null}
      { "id": "745", "slug": "nba", "label": "NBA" }
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    Fetch a tag by slug:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/tags/slug/nba"
    ```

    <Accordion title="Output: Tag">
      ```json Example theme={null}
      { "id": "745", "slug": "nba", "label": "NBA" }
      ```
    </Accordion>
  </Tab>
</Tabs>

### Fetch Tag Relationships

Get the relationship records that link a tag to related tags, useful for building "you might also like" surfaces. Each record is a lightweight pointer (a rank and the two numeric tag IDs), not a full tag object.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchRelatedTags()` on a `PublicClient` or `SecureClient` to fetch a tag's
    relationship records.

    ```ts theme={null}
    const relatedTags = await client.fetchRelatedTags({ slug: "nba" });

    // relatedTags: RelatedTag[]
    ```

    <Accordion title="Output: RelatedTag[]">
      ```json Example theme={null}
      [{ "id": "58212", "tagId": 745, "relatedTagId": 1512, "rank": 1 }]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_related_tags()` on an `AsyncPublicClient` or `AsyncSecureClient`
    to fetch a tag's relationship records. The synchronous `PublicClient` and
    `SecureClient` provide the same method.

    ```python theme={null}
    related_tags = await client.get_related_tags(slug="nba")

    # related_tags: tuple[RelatedTag, ...]
    ```

    <Accordion title="Output: RelatedTag[]">
      ```json Example theme={null}
      [{ "id": "58212", "tag_id": 745, "related_tag_id": 1512, "rank": 1 }]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    Fetch a tag's relationship records:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/tags/slug/nba/related-tags"
    ```

    <Accordion title="Output: RelatedTag[]">
      ```json Example theme={null}
      [{ "id": "58212", "tagID": 745, "relatedTagID": 1512, "rank": 1 }]
      ```
    </Accordion>
  </Tab>
</Tabs>

### Fetch Related Tags

Get the full `Tag` objects for a tag's related tags in one call, skipping the extra round trip to fetch each related tag by ID.

<Tabs>
  <Tab title="TypeScript">
    Call `fetchRelatedTagResources()` on a `PublicClient` or `SecureClient` to fetch the
    related tag objects.

    ```ts theme={null}
    const relatedTagObjects = await client.fetchRelatedTagResources({
      slug: "nba",
      status: "active",
    });

    // relatedTagObjects: Tag[]
    ```

    <Accordion title="Output: Tag[]">
      ```json Example theme={null}
      [{ "id": "1512", "slug": "caitlin-clark", "label": "caitlin clark" }]
      ```
    </Accordion>
  </Tab>

  <Tab title="Python">
    Call `get_related_tag_resources()` on an `AsyncPublicClient` or
    `AsyncSecureClient` to fetch the related tag objects. The synchronous
    `PublicClient` and `SecureClient` provide the same method.

    ```python theme={null}
    related_tag_objects = await client.get_related_tag_resources(
        slug="nba",
        status="active",
    )

    # related_tag_objects: tuple[Tag, ...]
    ```

    <Accordion title="Output: Tag[]">
      ```json Example theme={null}
      [{ "id": "1512", "slug": "caitlin-clark", "label": "caitlin clark" }]
      ```
    </Accordion>
  </Tab>

  <Tab title="API">
    Fetch the related tag objects:

    ```bash theme={null}
    curl "https://gamma-api.polymarket.com/tags/slug/nba/related-tags/tags"
    ```

    <Accordion title="Output: Tag[]">
      ```json Example theme={null}
      [{ "id": "1512", "slug": "caitlin-clark", "label": "caitlin clark" }]
      ```
    </Accordion>
  </Tab>
</Tabs>
