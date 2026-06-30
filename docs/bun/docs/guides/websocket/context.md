<!--
Source: https://bun.com/docs/guides/websocket/context.md
Downloaded: 2026-06-30T20:44:18.822Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Set per-socket contextual data on a WebSocket

A WebSocket server typically needs to store some identifying information or context for each connected client.

With [Bun.serve()](/runtime/http/websockets#contextual-data), set this "contextual data" by passing a `data` parameter to `server.upgrade()` when upgrading the connection.

```ts server.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
Bun.serve({
  fetch(req, server) {
    const success = server.upgrade(req, {
      data: {
        socketId: Math.random(),
      },
    });
    if (success) return undefined;

    // handle HTTP request normally
    // ...
  },
  websocket: {
    // TypeScript: specify the type of ws.data like this
    data: {} as { socketId: number },

    // define websocket handlers
    async message(ws, message) {
      // the contextual data is available as the `data` property
      // on the WebSocket instance
      console.log(`Received ${message} from ${ws.data.socketId}}`);
    },
  },
});
```

***

It's common to read cookies/headers from the incoming request to identify the connecting client.

```ts server.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
type WebSocketData = {
  createdAt: number;
  token: string;
  userId: string;
};

Bun.serve({
  async fetch(req, server) {
    // use a library to parse cookies
    const cookies = parseCookies(req.headers.get("Cookie"));
    const token = cookies["X-Token"];
    const user = await getUserFromToken(token);

    const upgraded = server.upgrade(req, {
      data: {
        createdAt: Date.now(),
        token: cookies["X-Token"],
        userId: user.id,
      },
    });

    if (upgraded) return undefined;
  },
  websocket: {
    // TypeScript: specify the type of ws.data like this
    data: {} as WebSocketData,

    async message(ws, message) {
      // save the message to a database
      await saveMessageToDatabase({
        message: String(message),
        userId: ws.data.userId,
      });
    },
  },
});
```
