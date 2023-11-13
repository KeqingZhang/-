const express = require("express");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3011;

app.use(cors());
app.use(bodyParser.text()); // 使用 text 解析器

// 处理文件上传请求
app.post("/api/fileupload", async (req, res) => {
  try {
    const filePath = "./data/courseData.json";
    const fileName = req.body; // 直接从请求体中获取字符串
    console.log(fileName);

    // 读取文件内容
    const rawData = await fs.readFile(fileName, "utf-8");

    // 写入 JSON 文件
    await fs.writeFile(filePath, rawData, "utf-8");

    res.sendStatus(200);
  } catch (error) {
    console.error("保存文件名时发生错误：", error);
    res.status(500).json({ error: "保存失败" });
  }
});

app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});
