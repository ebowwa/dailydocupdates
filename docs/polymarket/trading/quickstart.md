<!--
Source: https://docs.polymarket.com/trading/quickstart.md
Downloaded: 2026-07-23T21:04:54.619Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Place Your First Order

> Learn how to authenticate with the CLOB and submit your first market order.

This guide shows you how to place your first order using an existing Polymarket account. For this guide, we recommend having at least 10 pUSD available. Create or fund an account at [polymarket.com](https://polymarket.com/) before you start.

Find your Polymarket wallet address in your profile menu:

<Frame>
  <img className="hidden lg:block" src="https://mintcdn.com/polymarket-292d1b1b/1lJ_npwaE_MShiVL/images/deposit-wallet-desktop.png?fit=max&auto=format&n=1lJ_npwaE_MShiVL&q=85&s=6be3b87c53d6718f973db37e134ee944" alt="Polymarket profile menu showing the account wallet address on desktop" width="1280" height="274" data-path="images/deposit-wallet-desktop.png" />

  <img className="block lg:hidden" src="https://mintcdn.com/polymarket-292d1b1b/1lJ_npwaE_MShiVL/images/deposit-wallet-mobile.png?fit=max&auto=format&n=1lJ_npwaE_MShiVL&q=85&s=4d6f87ed5440c5297e60d6331c47dc73" alt="Polymarket profile menu showing the account wallet address on mobile" width="529" height="274" data-path="images/deposit-wallet-mobile.png" />
</Frame>

<Steps>
  <Step title="Authenticate">
    First, authenticate with the CLOB.

    <Tabs>
      <Tab title="TypeScript">
        Pass the signer and wallet address to `createSecureClient`.

        ```ts theme={null}
        import { createSecureClient, OrderSide } from "@polymarket/client";
        import { privateKey } from "@polymarket/client/viem";

        const client = await createSecureClient({
          wallet: process.env.POLYMARKET_WALLET_ADDRESS,
          signer: privateKey(process.env.POLYMARKET_PRIVATE_KEY),
        });
        ```

        <Note>
          This example uses Viem. See [Wallet
          Integrations](/getting-started/typescript#wallet-integrations) to connect a
          signer from another supported wallet library.
        </Note>
      </Tab>

      <Tab title="Python">
        Pass the private key and wallet address to `AsyncSecureClient.create`.

        ```python theme={null}
        import os

        from polymarket import AsyncSecureClient

        client = await AsyncSecureClient.create(
            private_key=os.environ["POLYMARKET_PRIVATE_KEY"],
            wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
        )
        ```
      </Tab>
    </Tabs>
  </Step>

  <Step title="Choose an Outcome">
    Then, fetch the market and select the outcome you want to buy. Orders identify each outcome by its token ID. See [Market Data](/market-data/overview) to find a different market.

    <Tabs>
      <Tab title="TypeScript">
        ```ts theme={null}
        const market = await client.fetchMarket({
          slug: "will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
        });

        const tokenId = market.outcomes.yes.tokenId!;
        ```
      </Tab>

      <Tab title="Python">
        ```python theme={null}
        market = await client.get_market(
            slug="will-the-us-confirm-that-aliens-exist-before-2027-789-924-249",
        )

        token_id = market.outcomes.yes.token_id
        assert token_id is not None
        ```
      </Tab>
    </Tabs>
  </Step>

  <Step title="Place a Market Order">
    Then, submit a small market buy. The order fills against available liquidity, and any unfilled amount is canceled instead of remaining open.

    <Tabs>
      <Tab title="TypeScript">
        Use `placeMarketOrder` to place the market order.

        ```ts theme={null}
        const response = await client.placeMarketOrder({
          tokenId,
          side: OrderSide.BUY,
          amount: "10", // Spend up to 10 pUSD
        });

        if (!response.ok) {
          throw new Error(response.message);
        }

        // response.orderId: string
        ```
      </Tab>

      <Tab title="Python">
        Use `place_market_order` to place the market order.

        ```python theme={null}
        response = await client.place_market_order(
            token_id=token_id,
            side="BUY",
            amount="10",  # Spend up to 10 pUSD
        )

        if not response.ok:
            raise RuntimeError(response.message)

        # response.order_id: str
        ```
      </Tab>
    </Tabs>
  </Step>

  <Step title="Check Your Position">
    Finally, after the trade settles, list your positions for the selected market and find the outcome you bought.

    <Tabs>
      <Tab title="TypeScript">
        ```ts theme={null}
        const page = await client
          .listPositions({
            market: [market.conditionId!],
          })
          .firstPage();

        const position = page.items.find((item) => item.tokenId === tokenId);
        if (!position) {
          throw new Error("Position not found.");
        }

        const positionSize = position.size; // Outcome shares held
        ```
      </Tab>

      <Tab title="Python">
        ```python theme={null}
        condition_id = market.condition_id
        assert condition_id is not None

        page = await client.list_positions(market=[condition_id]).first_page()

        position = next(
            (item for item in page.items if item.token_id == token_id),
            None,
        )
        if position is None:
            raise RuntimeError("Position not found.")

        position_size = position.size  # Outcome shares held
        ```
      </Tab>
    </Tabs>

    That's it—you placed your first market order on Polymarket.
  </Step>
</Steps>
