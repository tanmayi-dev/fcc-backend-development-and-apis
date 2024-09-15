let express = require("express");
let app = express();

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
