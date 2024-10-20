require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dns = require("dns");
const url = require("url");

const app = express();
const port = process.env.PORT || 3000;

const urls = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;

  let hostname;
  try {
    hostname = new URL(originalUrl).hostname;
  } catch (err) {
    return res.json({ error: "invalid URL" });
  }

  dns.lookup(hostname, (err) => {
    if (err) {
      return res.json({ error: "invalid URL" });
    }

    const shortUrl = urls.length + 1;
    urls.push({ originalUrl, shortUrl });

    res.json({ original_url: originalUrl, short_url: shortUrl });
  });
});

app.get("/api/shorturl/:short_url", (req, res) => {
  const shortUrl = parseInt(req.params.short_url);

  const urlEntry = urls.find((entry) => entry.shortUrl === shortUrl);

  if (!urlEntry) {
    return res.status(404).json({ error: "No short URL found" });
  }

  res.redirect(urlEntry.originalUrl);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
