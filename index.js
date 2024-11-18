const express = require("express");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.write(
    `<html>
      <head>
        <title>HTML Streaming</title>
      </head>
      <body>
        <template shadowrootmode="open">
          <h1>HTML Goofiness</h1>
          <main>
            <ul>
              <li><slot name="item-1">Loading...</slot></li>
              <li><slot name="item-2">Loading...</slot></li>
              <li><slot name="item-3">Loading...</slot></li>
              <li><slot name="item-4">Loading...</slot></li>
              <li><slot name="item-5">Loading...</slot></li>
            </ul>
          </main>
        </template>
      </body>
    </html>`,
  );

  for (let i = 5; i > 0; i--) {
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    res.write(`<p slot="item-${i}">Hello from item ${i}!</p>`);
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
