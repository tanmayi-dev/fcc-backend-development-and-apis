require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // To parse POST body
const dns = require("dns"); // To validate URL hostname
const url = require("url"); // For parsing URLs

const app = express();
const port = process.env.PORT || 3000;

const urls = []; // Temporary in-memory storage for URLs

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data
app.use("/public", express.static(`${process.cwd()}/public`));

// Home route
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Test API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// POST endpoint to shorten a URL
app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;

  // Extract hostname from the URL
  let hostname;
  try {
    hostname = new URL(originalUrl).hostname;
  } catch (err) {
    return res.json({ error: "invalid URL" });
  }

  // Validate the hostname using DNS lookup
  dns.lookup(hostname, (err) => {
    if (err) {
      return res.json({ error: "invalid URL" });
    }

    // Save the original URL with a short URL ID
    const shortUrl = urls.length + 1;
    urls.push({ originalUrl, shortUrl });

    // Respond with the shortened URL info
    res.json({ original_url: originalUrl, short_url: shortUrl });
  });
});

// GET endpoint to redirect to the original URL
app.get("/api/shorturl/:short_url", (req, res) => {
  const shortUrl = parseInt(req.params.short_url);

  // Find the matching URL entry
  const urlEntry = urls.find((entry) => entry.shortUrl === shortUrl);

  if (!urlEntry) {
    return res.status(404).json({ error: "No short URL found" });
  }

  // Redirect to the original URL
  res.redirect(urlEntry.originalUrl);
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
