<!--
Source: https://bun.com/docs/guides/http/file-uploads.md
Downloaded: 2026-06-30T20:44:18.804Z
-->

> ## Documentation Index
> Fetch the complete documentation index at: https://bun.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Upload files via HTTP using FormData

To upload files over HTTP with Bun, use the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) API. Start with an HTTP server that serves an HTML form.

```ts index.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
const server = Bun.serve({
  port: 4000,
  async fetch(req) {
    const url = new URL(req.url);

    // return index.html for root path
    if (url.pathname === "/")
      return new Response(Bun.file("index.html"), {
        headers: {
          "Content-Type": "text/html",
        },
      });

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
```

***

Define the HTML form in another file, `index.html`.

```html index.html icon="file-code" theme={"theme":{"light":"github-light","dark":"dracula"}}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Form</title>
  </head>
  <body>
    <form action="/action" method="post" enctype="multipart/form-data">
      <input type="text" name="name" placeholder="Name" />
      <input type="file" name="profilePicture" />
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```

***

Run the server and visit [`localhost:4000`](http://localhost:4000) to see the form.

```bash theme={"theme":{"light":"github-light","dark":"dracula"}}
bun run index.ts
Listening on http://localhost:4000
```

***

The form sends a `POST` request with the form data to the `/action` endpoint. Handle that request in the server.

First, call [`.formData()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData) on the incoming `Request` to asynchronously parse its contents into a `FormData` instance. Then use [`.get()`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/get) to extract the `name` and `profilePicture` fields; `name` is a `string` and `profilePicture` is a `Blob`.

Finally, write the `Blob` to disk with [`Bun.write()`](/runtime/file-io#writing-files-bun-write).

```ts index.ts icon="https://mintcdn.com/bun-1dd33a4e/JUhaF6Mf68z_zHyy/icons/typescript.svg?fit=max&auto=format&n=JUhaF6Mf68z_zHyy&q=85&s=7ac549adaea8d5487d8fbd58cc3ea35b" theme={"theme":{"light":"github-light","dark":"dracula"}}
const server = Bun.serve({
  port: 4000,
  async fetch(req) {
    const url = new URL(req.url);

    // return index.html for root path
    if (url.pathname === "/")
      return new Response(Bun.file("index.html"), {
        headers: {
          "Content-Type": "text/html",
        },
      });

    // parse formdata at /action // [!code ++]
    if (url.pathname === "/action") { // [!code ++]
      const formdata = await req.formData(); // [!code ++]
      const name = formdata.get("name"); // [!code ++]
      const profilePicture = formdata.get("profilePicture"); // [!code ++]
      if (!profilePicture) throw new Error("Must upload a profile picture."); // [!code ++]
      // write profilePicture to disk // [!code ++]
      await Bun.write("profilePicture.png", profilePicture); // [!code ++]
      return new Response("Success"); // [!code ++]
    } // [!code ++]

    return new Response("Not Found", { status: 404 });
  },
});
```
