const express = require("express");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

// 读取暂时保存txt文件中的课程信息
app.post("/api/readCourse", async (req, res) => {
  const filePath = "tempdata.json";
  const userData = {
    StudentName: "",
    course: {},
    courseIndex: {},
  };
  try {
    const rawData = await fs.readFile(filePath, "utf-8");
    existingData = JSON.parse(rawData);

    userData.StudentName = existingData.courseInfo.StudentName;
    userData.course = existingData.courseInfo.course;
    const rawcourseIndex = await fs.readFile("courseLimit.json", "utf-8");
    const courseIndex = JSON.parse(rawcourseIndex);
    console.log("以下打开的是existingData", courseIndex);
    userData.courseIndex = courseIndex;
    res.json(userData);
    console.log("以下打开的是userData", userData);
  } catch (error) {
    console.error("原始json文件存在格式错误", error);
  }
});

app.listen(port, () => {
  console.log(`读取课程信息服务器运行在端口 ${port}`);
});
