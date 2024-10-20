const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
