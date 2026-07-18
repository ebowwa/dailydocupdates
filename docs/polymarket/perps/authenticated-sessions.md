> ## Documentation Index
> Fetch the complete documentation index at: https://docs.polymarket.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authenticated Sessions

> Set up authenticated access for Perps trading and account data

An authenticated session is a two-way authenticated communication channel with
the Perps system that allows your app to place orders, read private Perps account
data, and receive private real-time updates.

## Set Up Perps Access

<Tabs>
  <Tab title="TypeScript">
    <Steps>
      <Step title="Create a Secure Client">
        Create a `SecureClient` for the Polymarket wallet that owns the Perps account,
        using the signer that controls it.

        ```ts theme={null}
        import { createSecureClient } from "@polymarket/client";
        import { privateKey } from "@polymarket/client/viem";

        const client = await createSecureClient({
          wallet: process.env.POLYMARKET_WALLET_ADDRESS!,
          signer: privateKey(process.env.PRIVATE_KEY!),
        });
        ```

        <Note>
          This example uses Viem for wallet signing. See the [TypeScript tooling
          guide](/dev-tooling/typescript#wallet-integrations) for other wallet library
          integrations.
        </Note>
      </Step>

      <Step title="Open a Perps Session">
        Open a Perps session. By default, delegated Perps credentials expire after one
        week.

        ```ts theme={null}
        const session = await client.openPerpsSession();
        ```

        You can also set the session lifetime and label explicitly. `expiresIn` is
        measured in milliseconds.

        ```ts theme={null}
        const session = await client.openPerpsSession({
          expiresIn: 7 * 24 * 60 * 60 * 1000,
          label: "trading-app",
        });
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="Python">
    <Steps>
      <Step title="Create a Secure Client">
        Create an `AsyncSecureClient` for the Polymarket wallet that owns the Perps
        account, using the signer that controls it.

        ```python theme={null}
        import os

        from polymarket import AsyncSecureClient

        client = await AsyncSecureClient.create(
            private_key=os.environ["PRIVATE_KEY"],
            wallet=os.environ["POLYMARKET_WALLET_ADDRESS"],
        )
        ```
      </Step>

      <Step title="Open a Perps Session">
        Open a Perps session. By default, delegated Perps credentials expire after one
        week.

        ```python theme={null}
        session = await client.open_perps_session()
        ```

        You can also set the session lifetime and label explicitly. `expires_in` is a
        `timedelta`.

        ```python theme={null}
        from datetime import timedelta

        session = await client.open_perps_session(
            expires_in=timedelta(days=7),
            label="trading-app",
        )
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="API">
    Start by registering new proxy credentials for an existing Polymarket account.
    If you do not have one yet, create an account at
    [polymarket.com](https://polymarket.com) first.

    <Steps>
      <Step title="Generate a Proxy Signer">
        Generate a fresh keypair for the proxy signer. Perps uses this key to authorize
        trading operations on behalf of the Polymarket account signer, without requiring
        the account signer to sign every order.

        Use any secure EVM key-generation flow.

        <CodeGroup>
          ```bash Foundry theme={null}
          $ cast wallet new
          Successfully created new keypair.
          Address: <proxy_address>
          Private key: <proxy_private_key>
          ```

          ```ts Viem theme={null}
          import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

          const privateKey = generatePrivateKey();
          const { address } = privateKeyToAccount(privateKey);
          ```
        </CodeGroup>

        Store the private key securely. It will be used to sign Perps trading operations
        for the Polymarket account signer.
      </Step>

      <Step title="Create Proxy Typed Data">
        Create an EIP-712 `CreateProxy` payload.

        ```json theme={null}
        {
          "domain": {
            "name": "Polymarket",
            "version": "1",
            "chainId": 137
          },
          "primaryType": "CreateProxy",
          "types": {
            "CreateProxy": [
              { "name": "addr", "type": "address" },
              { "name": "exp", "type": "uint64" },
              { "name": "salt", "type": "uint64" },
              { "name": "ts", "type": "uint64" }
            ]
          },
          "message": {
            "addr": "<proxy_address>",
            "exp": 1767225600000,
            "salt": 123456789,
            "ts": 1767000000000
          }
        }
        ```

        Use these values consistently in the typed data and request body.

        | Field  | Value                                                                   |
        | ------ | ----------------------------------------------------------------------- |
        | `addr` | `<proxy_address>` from the previous step.                               |
        | `exp`  | Unix timestamp in milliseconds when the proxy signer stops being valid. |
        | `ts`   | Current Unix timestamp in milliseconds.                                 |
        | `salt` | Random integer generated for this signed request.                       |
      </Step>

      <Step title="Sign Proxy Typed Data">
        Sign the `CreateProxy` typed data with the signer for the Polymarket account.

        ```ts Viem theme={null}
        import { privateKeyToAccount } from "viem/accounts";

        const account = privateKeyToAccount("<polymarket_account_signer_private_key>");

        const signature = await account.signTypedData({
          domain: {
            name: "Polymarket",
            version: "1",
            chainId: 137,
          },
          primaryType: "CreateProxy",
          types: {
            CreateProxy: [
              { name: "addr", type: "address" },
              { name: "exp", type: "uint64" },
              { name: "salt", type: "uint64" },
              { name: "ts", type: "uint64" },
            ],
          },
          message: {
            addr: "<proxy_address>",
            exp: 1767225600000,
            salt: 123456789,
            ts: 1767000000000,
          },
        });
        ```
      </Step>

      <Step title="Authorize the Proxy Signer">
        Authorize the generated proxy signer for your Perps account.

        ```bash theme={null}
        curl -X POST "https://api.perpetuals.polymarket.com/v1/account/proxy" \
          -H "content-type: application/json" \
          -d '{
            "op": {
              "type": "createProxy",
              "args": {
                "owner": "<polymarket_account_signer_address>",
                "proxy": "<proxy_address>",
                "expiry": 1767225600000
              }
            },
            "sig": "<signature>",
            "salt": 123456789,
            "ts": 1767000000000,
            "label": "trading-app"
          }'
        ```

        Map the request fields to the values from the previous steps.

        * `owner` is the signer address for the Polymarket account.
        * `proxy` is `<proxy_address>` from the first step.
        * `sig` is `<signature>` from the previous step.
        * `salt` and `ts` are the same values used in the typed data from step 2.
        * `label` is an identifier for this proxy credential instance.

        The response contains the proxy secret.

        ```json theme={null}
        {
          "secret": "<proxy_secret>"
        }
        ```

        Store the proxy private key, proxy address, proxy secret, and expiry securely.
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Session Lifecycle

Open an authenticated session to start trading, read private Perps account data,
and receive private real-time updates.

<Tabs>
  <Tab title="TypeScript">
    <Steps>
      <Step title="Listen for Session Events">
        After opening a Perps session, iterate over it to receive private real-time
        updates.

        ```ts theme={null}
        const session = await client.openPerpsSession();

        for await (const event of session) {
          switch (event.type) {
            case "order":
              // Update local order state.
              break;

            case "fill":
              // Update position, PnL, or execution history.
              break;

            case "portfolio":
              // Refresh margin, equity, and position views.
              break;
          }
        }
        ```

        This example handles a few common session events. `order` and `fill` are the
        core trading updates, while `portfolio` provides periodic account-level snapshots
        for margin, equity, positions, and withdrawable balance.

        See [Reconcile Trade State](/perps/trading#reconcile-trade-state) for how to use
        these events to keep local trading state in sync.
      </Step>

      <Step title="Close the Session">
        You can close the session at any time by calling `session.close()`. Closing a
        session releases local resources; stored credentials can still be resumed until
        they expire.

        ```ts theme={null}
        for await (const event of session) {
          if (shouldCloseSession) {
            await session.close();
            break;
          }

          // …
        }
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="Python">
    <Steps>
      <Step title="Listen for Session Events">
        After opening a Perps session, iterate over it to receive private real-time
        updates.

        ```python theme={null}
        session = await client.open_perps_session()

        async for event in session:
            if event.type == "order":
                # Update local order state.
                pass
            elif event.type == "fill":
                # Update position, PnL, or execution history.
                pass
            elif event.type == "portfolio":
                # Refresh margin, equity, and position views.
                pass
        ```

        This example handles a few common session events. `order` and `fill` are the
        core trading updates, while `portfolio` provides periodic account-level snapshots
        for margin, equity, positions, and withdrawable balance.

        See [Reconcile Trade State](/perps/trading#reconcile-trade-state) for how to use
        these events to keep local trading state in sync.
      </Step>

      <Step title="Close the Session">
        You can close the session at any time by calling `session.close()`. Closing a
        session releases local resources; stored credentials can still be resumed until
        they expire.

        ```python theme={null}
        async for event in session:
            if should_close_session:
                await session.close()
                break

            # …
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="API">
    <Steps>
      <Step title="Authenticate a WebSocket Connection">
        Connect to the Perps WebSocket production URL.

        ```text theme={null}
        wss://ws.perpetuals.polymarket.com/v1/ws
        ```

        After the connection opens, send an authentication frame with the proxy address
        and proxy secret.

        ```json theme={null}
        {
          "id": 1,
          "req": "post",
          "op": {
            "type": "auth",
            "args": {
              "proxy": "<proxy_address>",
              "secret": "<proxy_secret>"
            }
          }
        }
        ```

        Check the authentication response before subscribing to private channels.

        <CodeGroup>
          ```json Success theme={null}
          {
            "id": 1,
            "data": {
              "status": "ok"
            }
          }
          ```

          ```json Failure theme={null}
          {
            "id": 1,
            "data": {
              "status": "err",
              "error": "<error_message>"
            }
          }
          ```
        </CodeGroup>
      </Step>

      <Step title="Handle Session Events">
        Authenticated WebSocket connections receive private session update frames. These
        examples show a few common events: `orders` and `fills` for trading activity,
        and `portfolio` for periodic account-level snapshots.

        <CodeGroup>
          ```json Order theme={null}
          {
            "ch": "orders",
            "ts": 1767225600000,
            "sq": 1234567890,
            "data": {
              "oid": 1234567890,
              "iid": 1,
              "buy": true,
              "p": "65000.00",
              "qty": "0.01",
              "tif": "gtc",
              "po": false,
              "status": "open",
              "rest": "0.01",
              "fill": "0",
              "cts": 1767225600000,
              "uts": 1767225600000
            }
          }
          ```

          ```json Fill theme={null}
          {
            "ch": "fills",
            "ts": 1767225600000,
            "sq": 1234567891,
            "data": {
              "tid": 987654321,
              "oid": 1234567890,
              "iid": 1,
              "side": "long",
              "p": "65000.00",
              "qty": "0.01",
              "taker": true,
              "fee": "0.26",
              "fea": "pUSD",
              "psz": "0",
              "pep": "0",
              "pnl": "0",
              "liq": false,
              "ts": 1767225600000
            }
          }
          ```

          ```json Portfolio theme={null}
          {
            "ch": "portfolio",
            "ts": 1767225600000,
            "sq": 1234567892,
            "data": {
              "positions": [],
              "margin": {
                "total_account_value": "10.00",
                "total_initial_margin": "0",
                "total_maintenance_margin": "0",
                "total_position_value": "0"
              },
              "withdrawable": "10.00",
              "in_liquidation": false,
              "timestamp": 1767225600000
            }
          }
          ```
        </CodeGroup>

        These are examples of common session events, not the full event list.
      </Step>

      <Step title="Keep the Connection Alive">
        Send an application-level ping from the client about every 25 seconds.

        ```json theme={null}
        {
          "id": 0,
          "req": "post",
          "op": {
            "type": "ping"
          }
        }
        ```

        The server responds with a pong payload.

        ```json theme={null}
        {
          "id": 0,
          "data": {
            "status": "ok",
            "ts": 1767225600000,
            "sq": 1234567890
          }
        }
        ```

        Treat the connection as stale if no messages arrive for about 65 seconds.
      </Step>

      <Step title="Close the Connection">
        Close the WebSocket connection when the current workflow is finished. Closing the
        connection does not revoke the proxy credential.
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Resume a Session

Resume a session when stored credentials are still valid and a Perps workflow
needs to continue in a new runtime context.

<Tabs>
  <Tab title="TypeScript">
    Read `session.credentials` after opening a session and store the object in secure
    credential storage.

    ```ts theme={null}
    const credentials = session.credentials;
    // credentials: PerpsCredentials
    ```

    where `PerpsCredentials` is:

    <CodeGroup>
      ```ts Type theme={null}
      type PerpsCredentials = {
        proxy: EvmAddress;
        privateKey: PrivateKey;
        secret: string;
        expiresAt: number;
      };
      ```

      ```json Example theme={null}
      {
        "proxy": "0x1111111111111111111111111111111111111111",
        "privateKey": "0x2222222222222222222222222222222222222222222222222222222222222222",
        "secret": "<proxy_secret>",
        "expiresAt": 1766725200000
      }
      ```
    </CodeGroup>

    Pass stored credentials back to `openPerpsSession()` while they are still valid.
    The SDK validates them and resumes the session.

    ```ts theme={null}
    const session = await client.openPerpsSession({
      credentials,
    });
    // session: PerpsSession
    ```
  </Tab>

  <Tab title="Python">
    Read `session.credentials` after opening a session and store the object in secure
    credential storage.

    ```python theme={null}
    credentials = session.credentials
    # credentials: PerpsCredentials
    ```

    where `PerpsCredentials` is:

    <CodeGroup>
      ```python Type theme={null}
      from polymarket import PerpsCredentials

      # credentials: PerpsCredentials
      ```

      ```json Example theme={null}
      {
        "proxy": "0x1111111111111111111111111111111111111111",
        "private_key": "0x2222222222222222222222222222222222222222222222222222222222222222",
        "secret": "<proxy_secret>",
        "expires_at": "2026-01-25T18:20:00Z"
      }
      ```
    </CodeGroup>

    For JSON-backed storage, serialize the model and keep the result encrypted.

    ```python theme={null}
    stored_credentials = credentials.model_dump(mode="json")
    ```

    Pass stored credentials back to `open_perps_session()` while they are still
    valid. The SDK validates them and resumes the session.

    ```python theme={null}
    from polymarket import PerpsCredentials

    credentials = PerpsCredentials.model_validate(stored_credentials)

    session = await client.open_perps_session(credentials=credentials)
    # session: PerpsSession
    ```
  </Tab>

  <Tab title="API">
    Resume an API session by reusing stored proxy credentials while they are still
    valid.

    Store the credential material from the setup flow in secure credential storage.

    | Field                 | Use it to                                       |
    | --------------------- | ----------------------------------------------- |
    | `<proxy_address>`     | Identify the proxy credential.                  |
    | `<proxy_private_key>` | Sign Perps trading operations.                  |
    | `<proxy_secret>`      | Authenticate private REST and real-time access. |
    | `expiry`              | Know when to register a new proxy credential.   |

    For private REST reads, pass the proxy address and proxy secret as headers.

    ```bash theme={null}
    curl "https://api.perpetuals.polymarket.com/v1/account/portfolio" \
      -H "polymarket-proxy: <proxy_address>" \
      -H "polymarket-secret: <proxy_secret>"
    ```

    For a new WebSocket connection, send the same authentication frame used when the
    session was opened.

    ```json theme={null}
    {
      "id": 1,
      "req": "post",
      "op": {
        "type": "auth",
        "args": {
          "proxy": "<proxy_address>",
          "secret": "<proxy_secret>"
        }
      }
    }
    ```

    If the credential has expired, register a new proxy credential before resuming
    private workflows.
  </Tab>
</Tabs>
