const express = require("express");
const cors = require("cors");
const multer = require("multer"); // Import multer for handling file uploads
require("dotenv").config();

const app = express();

// Middleware setup
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// Home route
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory (no disk storage)
const upload = multer({ storage: storage });

// Handle file upload and return metadata
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Return file metadata
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
