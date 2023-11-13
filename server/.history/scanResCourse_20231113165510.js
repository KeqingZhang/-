const express = require("express");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3005;

app.use(cors());
app.use(bodyParser.json());

// 读取暂时保存txt文件中的课程信息
app.post("/api/scanResCourse", async (req, res) => {
  const filePath = "./data/resCoursecapacity.json";
  const termPath = "./data/saveTerm.json";
  try {
    const rawData = await fs.readFile(filePath, "utf-8");
    const rawterm = await fs.readFile(termPath, "utf-8");

    existingData = JSON.parse(rawData);
    term = JSON.parse(rawterm);
    // existingData.push(term)
    console.log(existingData);
    res.json(existingData);
  } catch (error) {
    console.error("原始json文件存在格式错误", error);
  }
});

app.listen(port, () => {
  console.log(`读取课程信息服务器运行在端口 ${port}`);
});
