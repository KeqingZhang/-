const express = require("express");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3013;

app.use(cors());
app.use(bodyParser.json()); // 使用 text 解析器

// 处理文件上传请求
app.post("/api/existCourse", async (req, res) => {
  try {
    const changeName = req.body;
    const tempdataPath = "./data/tempdata.json";
    const alldataPath = "./data/courseData.json";
    // const filePath = "resCoursecapacity.json";
    // const rawData = await fs.readFile(filePath, "utf-8");
    // existingData = JSON.parse(rawData);
    let newexistingData = [];
    // const questData = req.body;

    // 读取文件内容
    let rawtempData = await fs.readFile(tempdataPath, "utf-8");
    let rawallData = await fs.readFile(alldataPath, "utf-8");
    rawtempData = await JSON.parse(rawtempData);
    rawallData = await JSON.parse(rawallData);
    // console.log(rawtempData);
    let tempcourse = rawtempData.courseInfo.course;
    console.log(rawtempData.courseInfo.StudentName);
    // console.log(tempcourse);
    let newtempData = {
      courseInfo: {
        Studentname: rawtempData.courseInfo.StudentName,
        course: [],
      },
    };
    tempcourse.map((term) => {
      let tempList = [[], term[1]];
      term[0].map((course) => {
        if (course === changeName.tempData.name) {
          console.log("find it");
          tempList[1] = term[1] - 60;
        } else {
          tempList[0].push(course);
        }
      });
      newtempData.courseInfo.course.push(tempList);
    });
    // 写入 JSON 文件
    // await fs.writeFile(filePath, JSON.stringify(newexistingData, null, 2));
    await fs.writeFile(tempdataPath, JSON.stringify(newtempData), "utf-8");

    res.sendStatus(200);
  } catch (error) {
    console.error("保存文件名时发生错误：", error);
    res.status(500).json({ error: "保存失败" });
  }
});

app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});
