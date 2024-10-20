require("dotenv").config();
var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/whoami", (req, res) => {
  const ipaddress =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  const language = req.headers["accept-language"] || "Not specified";
  const software = req.headers["user-agent"] || "Not specified";

  res.json({ ipaddress, language, software });
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
