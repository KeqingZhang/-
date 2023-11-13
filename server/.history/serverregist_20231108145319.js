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

    // console.log(req.body, req.body.formData.username);
    // console.log(userData);
    const filePath = "data.json";
    const nameList = "./makePYGraph/studentInfo.txt";

    let existingData = [];
    try {
      const rawData = await fs.readFile(filePath, "utf-8");
      // console.log(rawData);
      existingData = JSON.parse(rawData);
      // console.log(existingData);
    } catch (error) {
      console.error("原始json文件存在格式错误", error);
    }

    existingData.push(userData);
    // console.log("caonima:", existingData);

    // existingData.push(inputData);
    // console.log("写入数据到文件:", JSON.stringify(existingData, null, 2));
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

    const rawName = await fs.readFile(nameList, "utf-8");
    console.log(typeof rawName);
    console.log(rawName);
    console.log(rawName + userData.username + "\n");
    // rawName.push(userData.username);
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
