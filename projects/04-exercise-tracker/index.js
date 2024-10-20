const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

const users = [];
const exercises = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", (req, res) => {
  const username = req.body.username;
  const _id = uuidv4();

  const newUser = { username, _id };
  users.push(newUser);

  res.json(newUser);
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users/:_id/exercises", (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  const user = users.find((u) => u._id === _id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const exerciseDate = date ? new Date(date) : new Date();
  const newExercise = {
    _id,
    username: user.username,
    description,
    duration: parseInt(duration),
    date: exerciseDate.toDateString(),
  };

  exercises.push(newExercise);

  res.json(newExercise);
});

app.get("/api/users/:_id/logs", (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  const user = users.find((u) => u._id === _id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  let userExercises = exercises.filter((e) => e._id === _id);

  if (from) {
    const fromDate = new Date(from);
    userExercises = userExercises.filter((e) => new Date(e.date) >= fromDate);
  }
  if (to) {
    const toDate = new Date(to);
    userExercises = userExercises.filter((e) => new Date(e.date) <= toDate);
  }

  if (limit) {
    userExercises = userExercises.slice(0, parseInt(limit));
  }

  const response = {
    username: user.username,
    _id: user._id,
    count: userExercises.length,
    log: userExercises.map((e) => ({
      description: e.description,
      duration: e.duration,
      date: e.date,
    })),
  };

  res.json(response);
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
