const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 3012;

app.use(cors());

app.get("/api/download", (req, res) => {
  const filePath = path.join(__dirname, "./data/tempdata.json");
  res.download(filePath, "./data/tempdata.json");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
