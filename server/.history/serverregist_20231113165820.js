const express = require("express");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3003;

app.use(cors());
app.use(bodyParser.json());

// 处理注册请求
app.post("/api/registUser", async (req, res) => {
  try {
    const userData = {
      username: null,
      email: null,
      password: null,
      course: [
        [[], 0],
        [[], 0],
        [[], 0],
        [[], 0],
        [[], 0],
        [[], 0],
      ],
    };

    userData.username = req.body.formData.username;
    userData.email = req.body.formData.email;
    userData.password = req.body.formData.password;

    const filePath = "./data/data.json";
    const nameList = "./makePYGraph/studentInfo.txt";

    let existingData = [];
    try {
      const rawData = await fs.readFile(filePath, "utf-8");
      existingData = JSON.parse(rawData);
    } catch (error) {
      console.error("原始json文件存在格式错误", error);
    }

    existingData.push(userData);

    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

    const rawName = await fs.readFile(nameList, "utf-8");
    await fs.writeFile(
      nameList,
      JSON.stringify(rawName + userData.username + "\r", null, 2)
    );
    res.sendStatus(200);
  } catch (error) {
    // console.error(existingData, inputData);
    console.error("保存文本时发生错误：", error);
    res.status(500).json({ error: "保存失败" });
  }
});

app.listen(port, () => {
  console.log(`注册处理服务器运行在端口 ${port}`);
});
