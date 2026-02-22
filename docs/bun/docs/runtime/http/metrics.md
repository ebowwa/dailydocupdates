<!--
Source: https://bun.com/docs/runtime/http/metrics.md
Downloaded: 2026-02-22T05:01:20.577Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Metrics

> Monitor server activity with built-in metrics

### `server.pendingRequests` and `server.pendingWebSockets`

Monitor server activity with built-in counters:

```ts  theme={"theme":{"light":"github-light","dark":"dracula"}}
const server = Bun.serve({
  fetch(req, server) {
    return new Response(
      `Active requests: ${server.pendingRequests}\n` + `Active WebSockets: ${server.pendingWebSockets}`,
    );
  },
});
```

### `server.subscriberCount(topic)`

Get count of subscribers for a WebSocket topic:

```ts  theme={"theme":{"light":"github-light","dark":"dracula"}}
const server = Bun.serve({
  fetch(req, server) {
    const chatUsers = server.subscriberCount("chat");
    return new Response(`${chatUsers} users in chat`);
  },
  websocket: {
    message(ws) {
      ws.subscribe("chat");
    },
  },
});
```
