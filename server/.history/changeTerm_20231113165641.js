const express = require("express");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const cors = require("cors");
const { log } = require("console");

const app = express();
const port = 3008;

app.use(cors());
app.use(bodyParser.json());

// 处理前端登录请求
app.post("/api/transCourse", async (req, res) => {
  try {
    const filePath = "./data/courseData.json";

    let courseData = await fs.readFile(filePath, "utf-8");
    const questData = req.body;
    let requestState = 0; // 标志哪一步出现错误
    console.log(questData);
    const courseName = questData.formData.courseName;
    const courseTerm = questData.formData.toTerm;
    const existingData = JSON.parse(courseData);
    let success = 1; // 标志错误种类

    let preCourse = []; // 报错信息，返回前驱课程
    let afterCourse = []; // 报错信息，返回后继课程

    for (const key in existingData) {
      if (existingData[key].name === courseName) {
        const preCourseList = existingData[key]["pre_course"];

        // 遍历前驱课程，是否课程被调整到前驱课程前
        preCourseList.map((preCourseitem) => {
          console.log(preCourseitem);
          existingData.map((courseitem) => {
            if (preCourseitem === courseitem.name) {
              if (courseitem.term > courseTerm) {
                preCourse.push(courseitem);
                success = 0;
                requestState = 1;
              }
              console.log(courseitem);
            }
          });
        });
        // 遍历该课程的后继课程，
        // 判断该课程是否被调整到后继课程的后面
        existingData.map((courseitem) => {
          courseitem["pre_course"].map((item) => {
            if (item === courseName) {
              if (courseitem.term < courseTerm) {
                afterCourse.push(courseitem);
                requestState = 2;
                success = 0;
              }
            }
          });
        });
        if (success === 1) {
          let newexistingData = [];
          existingData.map((item) => {
            if (item.name === courseName) {
              newexistingData.push({
                name: item.name,
                pre_course: item.pre_course,
                credit_hour: item.credit_hour,
                class_capacity: item.class_capacity,
                class_number: item.class_number,
                term: parseInt(courseTerm),
              });
            } else {
              newexistingData.push(item);
            }
          });
          res.json(["success", requestState, []]);
          await fs.writeFile(
            filePath,
            JSON.stringify(newexistingData, null, 2)
          );
        } else {
          if (requestState === 1) {
            res.json(["failed", requestState, preCourse]);
          } else {
            res.json(["failed", requestState, afterCourse]);
          }
        }
      }
    }
  } catch (error) {
    console.error("原始json文件存在格式错误", error);
  }
});

app.listen(port, () => {
  console.log(`登录处理服务器运行在端口 ${port}`);
});
