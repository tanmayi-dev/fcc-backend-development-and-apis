let express = require("express");
let app = express();

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
