const express = require("express");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const cors = require("cors");
const { log } = require("console");

const app = express();
const port = 3007;

app.use(cors());
app.use(bodyParser.json());

// 处理前端登录请求
app.post("/api/changeCourse", async (req, res) => {
  try {
    const filePath = "resCoursecapacity.json";
    const tempStudent = "tempdata.json";
    const alluserDataPath = "data.json";

    let loginUser = await fs.readFile(tempStudent, "utf-8");

    try {
      const questData = req.body;

      const reqInfo = questData[0];
      const termNumber = questData[1];

      // 读取剩余课程信息
      const rawData = await fs.readFile(filePath, "utf-8");

      // 读取所有学生的课程信息
      let alluserData = await fs.readFile(alluserDataPath, "utf-8");

      alluserData = await JSON.parse(alluserData);
      loginUser = await JSON.parse(loginUser);
      existingData = JSON.parse(rawData);

      let newexistingData = [];
      let newalluserData = [];
      let newloginUser = {
        courseInfo: {
          StudentName: " ",
          course: null,
        },
      };
      existingData.map((item) => {
        // console.log(this.currentSelectedTerm + 1);
        let newitem = { name: "", resNumber: "", totalCap: "", term: "" };
        if (item["resNumber"] > 0 && item["name"] === reqInfo.name) {
          console.log("调课成功");
          res.json("OK");
          newitem.name = item["name"];
          newitem.resNumber = item["resNumber"] - 1;
          newitem.totalCap = item["totalCap"];
          newitem.term = item["term"];
          newexistingData.push(newitem);

          try {
            // console.log("alluserData:", typeof alluserData);
            alluserData.map((item2) => {
              console.log(loginUser.courseInfo.Studentname, item2.username);
              if (loginUser.courseInfo.Studentname === item2.username) {
                item2.course[termNumber][0].push(reqInfo.name);
                console.log("修改后：", item2.course[termNumber]);
                newalluserData.push(item2);
                // console.log();

                newloginUser.courseInfo.StudentName =
                  loginUser.courseInfo.Studentname;
                newloginUser.courseInfo.course = item2.course;
              } else {
                newalluserData.push(item2);
                newloginUser = loginUser;
              }
            });
          } catch (error) {
            console.error("修改用户数据json文件错误", error);
          }
        } else {
          newexistingData.push(item);
          newloginUser = loginUser;
        }
      });
      //   console.log(typeof newloginUser);
      console.log(JSON.stringify(newloginUser));
      await fs.writeFile(tempStudent, JSON.stringify(newloginUser));
      await fs.writeFile(alluserDataPath, JSON.stringify(newalluserData));
      await fs.writeFile(filePath, JSON.stringify(newexistingData, null, 2));
    } catch (error) {
      console.error("原始json文件存在格式错误", error);
    }
    // await fs.writeFile(savePath, JSON.stringify(existingData,null,2));
  } catch (error) {
    console.error("访问文本时发生错误：", error);
    res.status(500).json({ error: "保存失败" });
  }
});

app.listen(port, () => {
  console.log(`登录处理服务器运行在端口 ${port}`);
});
