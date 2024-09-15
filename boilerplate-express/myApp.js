require("dotenv").config(); // Challenge 6

let express = require("express");
let app = express();

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
