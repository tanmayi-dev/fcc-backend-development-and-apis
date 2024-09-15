require("dotenv").config(); // Challenge 6

let express = require("express");
let app = express();

// Challenge 11
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Challenge 10

// e.g. ?first=firstname&last=lastname.

app.route("/name").get((req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;

  if (!firstName || !lastName) {
    return res
      .status(400)
      .json({ error: "First and last name are required in query string" });
  }

  res.json({ name: `${firstName} ${lastName}` });
});

// Challenge 9

// e.g. your-app-rootpath/freecodecamp/echo.

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

// Challenge 8

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

// Challenge 7

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Challenge 6

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

// Challenge 5

app.get("/json", (req, res) => {
  res.json({ message: "Hello json" });
});

// Challenge 4
const staticFile = __dirname + "/public";

app.use("/public", express.static(staticFile));

// Challenge 3
const filePath = __dirname + "/views/index.html";

app.get("/", (req, res) => {
  res.sendFile(filePath);
});

// Challenge 2
app.get("/", (req, res) => {
  res.send("Hello Express");
});

// Challenge 1
console.log("Hello World");

module.exports = app;
