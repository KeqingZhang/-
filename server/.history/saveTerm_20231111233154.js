const express = require("express");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3006;

app.use(cors());
app.use(bodyParser.json());

// 处理注册请求
app.post("/api/saveTerm", async (req, res) => {
  try {
    const filePath = "saveTerm.json";
    console.log("写入数据到文件:", JSON.stringify(req.body, null, 2));
    await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
  } catch (error) {
    console.error("保存文本时发生错误：", error);
    res.status(500).json({ error: "保存失败" });
  }
});

app.listen(port, () => {
  console.log(`注册处理服务器运行在端口 ${port}`);
});
