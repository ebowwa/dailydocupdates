> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Place Your First Trade

> Learn how to prepare a Perps account and submit a first buy order

This guide walks through the shortest safe path to a first Perps trade. You will
set up a Perps account, add collateral, and place a small buy order.

You need a Polymarket account with pUSD available before you start. Create one at
[polymarket.com](https://polymarket.com).

<Note>
  Building directly against the API? Start with [Authenticated
  Sessions](/perps/authenticated-sessions), then use [Fund Your
  Account](/perps/fund-your-account) and [Trading](/perps/trading).
</Note>

<Tabs>
  <Tab title="TypeScript">
    <Steps>
      <Step title="Install the SDK">
        Install the Unified TypeScript SDK with the package manager of your choice.

        <CodeGroup>
          ```bash pnpm theme={null}
          pnpm add @polymarket/client@beta viem
          ```

          ```bash npm theme={null}
          npm install @polymarket/client@beta viem
          ```

          ```bash yarn theme={null}
          yarn add @polymarket/client@beta viem
          ```
        </CodeGroup>

        <Note>
          This page uses Viem for wallet signing. See the [TypeScript tooling
          guide](/dev-tooling/typescript#wallet-integrations) for other wallet library
          integrations.
        </Note>
      </Step>

      <Step title="Create a Secure Client">
        Create a `SecureClient` with the wallet and signer that owns the Perps account.
        Include a Relayer API key so the SDK can submit gasless transactions.

        ```ts theme={null}
        import { createSecureClient, relayerApiKey } from "@polymarket/client";
        import { privateKey } from "@polymarket/client/viem";

        const client = await createSecureClient({
          wallet: process.env.POLYMARKET_WALLET_ADDRESS!,
          signer: privateKey(process.env.PRIVATE_KEY!),
          apiKey: relayerApiKey({
            key: process.env.RELAYER_API_KEY!,
            address: process.env.RELAYER_API_KEY_ADDRESS!,
          }),
        });
        ```

        Create a [Relayer API key](https://polymarket.com/settings?tab=api-keys) from
        polymarket.com → Settings → API Keys.
      </Step>

      <Step title="Fund the Account">
        Set up the approvals required for Perps collateral deposits, then deposit pUSD
        from the user's Polymarket wallet into the Perps account. The minimum Perps
        deposit is 10 pUSD. Amounts use raw pUSD base units, so 10 pUSD is
        `10_000_000n`.

        ```ts theme={null}
        await client.setupTradingApprovals();

        const deposit = await client.depositToPerps({
          amount: 10_000_000n,
        });

        await deposit.wait();
        ```

        `deposit.wait()` confirms that the chain transaction settled. Perps may take a
        moment to credit the account after that. See [Fund Your
        Account](/perps/fund-your-account) for the full funding workflow.
      </Step>

      <Step title="Open a Perps Session">
        Open a Perps session for private reads and trading.

        ```ts theme={null}
        const session = await client.openPerpsSession();
        ```
      </Step>

      <Step title="Choose a Market">
        Fetch the available Perps instruments and choose the market you want to trade.

        ```ts theme={null}
        const instruments = await client.fetchPerpsInstruments();
        const instrument = instruments.find(
          (instrument) => instrument.symbol === "SP500-USD",
        );

        if (instrument === undefined) {
          throw new Error("Instrument not found.");
        }
        ```
      </Step>

      <Step title="Place the Order">
        Place a long buy order for `1` quantity unit of `SP500-USD` with an explicit
        limit price of `100` USD per quantity unit and immediate-or-cancel execution.

        ```ts theme={null}
        import { OrderSide, PerpsTimeInForce } from "@polymarket/client";

        const order = await session.placeOrder({
          instrumentId: instrument.id,
          side: OrderSide.BUY,
          quantity: "1",
          price: "100",
          timeInForce: PerpsTimeInForce.IOC,
        });

        // order.id: PerpsOrderId
        ```

        The returned order includes the accepted order state. See
        [Trading](/perps/trading) for direction, order behavior, cancellation, and state
        reconciliation.
      </Step>
    </Steps>
  </Tab>

  <Tab title="Python">
    <Steps>
      <Step title="Install the SDK">
        Install the Unified Python SDK with the package manager of your choice.

        <CodeGroup>
          ```bash uv theme={null}
          uv add polymarket-client
          ```

          ```bash pip theme={null}
          pip install polymarket-client
          ```

          ```bash poetry theme={null}
          poetry add polymarket-client
          ```
        </CodeGroup>
      </Step>

      <Step title="Create a Secure Client">
        Create an `AsyncSecureClient` with the wallet and signer that owns the Perps
        account. Include a Relayer API key so the SDK can submit gasless transactions.

        ```python theme={null}
        import os

        from polymarket import AsyncSecureClient, RelayerApiKey

        client = await AsyncSecureClient.create(
            private_key=os.environ["PRIVATE_KEY"],
            wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
            api_key=RelayerApiKey(
                key=os.environ["RELAYER_API_KEY"],
                address=os.environ["RELAYER_API_KEY_ADDRESS"],
            ),
        )
        ```

        Create a [Relayer API key](https://polymarket.com/settings?tab=api-keys) from
        polymarket.com → Settings → API Keys.
      </Step>

      <Step title="Fund the Account">
        Set up the approvals required for Perps collateral deposits, then deposit pUSD
        from the user's Polymarket wallet into the Perps account. The minimum Perps
        deposit is 10 pUSD. Amounts use raw pUSD base units, so 10 pUSD is `10_000_000`.

        ```python theme={null}
        await client.setup_trading_approvals()

        deposit = await client.deposit_to_perps(amount=10_000_000)

        await deposit.wait()
        ```

        `deposit.wait()` confirms that the chain transaction settled. Perps may take a
        moment to credit the account after that. See [Fund Your
        Account](/perps/fund-your-account) for the full funding workflow.
      </Step>

      <Step title="Open a Perps Session">
        Open a Perps session for private reads and trading.

        ```python theme={null}
        session = await client.open_perps_session()
        ```
      </Step>

      <Step title="Choose a Market">
        Fetch the available Perps instruments and choose the market you want to trade.

        ```python theme={null}
        instruments = await client.fetch_perps_instruments()
        instrument = next(
            (item for item in instruments if item.symbol == "SP500-USD"),
            None,
        )

        if instrument is None:
            raise RuntimeError("Instrument not found.")
        ```
      </Step>

      <Step title="Place the Order">
        Place a long buy order for `1` quantity unit of `SP500-USD` with an explicit
        limit price of `100` USD per quantity unit and immediate-or-cancel execution.

        ```python theme={null}
        result = await session.place_order(
            instrument_id=instrument.id,
            side="BUY",
            quantity="1",
            price="100",
            time_in_force="ioc",
        )

        # result.order.id: PerpsOrderId
        ```

        The returned order includes the accepted order state. See
        [Trading](/perps/trading) for direction, order behavior, cancellation, and state
        reconciliation.
      </Step>
    </Steps>
  </Tab>
</Tabs>
