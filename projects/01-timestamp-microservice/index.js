var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  let inputDate;

  if (!date) {
    inputDate = new Date();
  } else if (!isNaN(date)) {
    inputDate = new Date(parseInt(date));
  } else {
    inputDate = new Date(date);
  }

  if (inputDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  const unix = inputDate.getTime();
  const utc = inputDate.toUTCString();

  res.json({ unix, utc });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
