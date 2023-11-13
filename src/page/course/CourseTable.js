import React, { useState } from "react";
import { observer } from "mobx-react";
import List from "./CourseChange";
import FileDownloadComponent from "./download";
import styles from "./css/CourseTable.module.css";
import { appViewModel } from "../../data/AppViewModel";
import Button from "@mui/material/Button";
import { parse } from "jsonpath";

const selectedNumber = appViewModel.currentSelectedTerm;
const sections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => `第${i}节`);
const weeks = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => `周${i}`);
const term_name = [
    "大一上半学期",
    "大一下半学期",
    "大二上半学期",
    "大二下半学期",
    "大三上半学期",
    "大三下半学期",
];

let course = [];
let courselist = [];
let tempCourse = null;
let courseIndex = null;
let name = null;

function CourseTable() {
    const [jsonData, setJsonData] = useState(null);

    // const [selectedNumber, setSelectedNumber] = useState('');

    const setSelectedNumber = () => {};

    const NumberSelector = () => {
        const selectedNumber = appViewModel.currentSelectedTerm;

        const handleNumberChange = (event) => {
            const selectedTerm = parseInt(event.target.value);
            appViewModel.selectCurrentTerm(selectedTerm);
        };

        return (
            <div>
                <h2 className={styles.selectText}>请选择你想要查询的学期</h2>
                <select
                    className={styles.selectCustom}
                    // value={selectedTerm}
                    onChange={handleNumberChange}
                >
                    <option value="-1">请选择</option>
                    <option value="0">大一上半学期</option>
                    <option value="1">大一下半学期</option>
                    <option value="2">大二上半学期</option>
                    <option value="3">大二下半学期</option>
                    <option value="4">大三上半学期</option>
                    <option value="5">大三下半学期</option>
                </select>
            </div>
        );
    };

    const existCourse = async (item) => {
        try {
            const response = await fetch(
                "http://localhost:3013/api/existCourse",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tempData: item }),
                },
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.text();
            console.log("Response from backend:", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleClick = async () => {
        const selectedNumber = appViewModel.currentSelectedTerm;
        try {
            const response = await fetch(
                "http://localhost:3002/api/readCourse",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                },
            );
            // if (!response.ok) {
            //     throw new Error("Network response was not ok");
            // }
            const data = await response.json();
            setJsonData(data);

            name = jsonData.StudentName;
            courseIndex = jsonData.courseIndex;
            tempCourse = jsonData.course;
            for (let i in tempCourse) {
                courselist.push(tempCourse[i]);
            }
            course = [];
            // console.log(tempCourse);
            // console.log("选课结果：", tempCourse[selectedNumber][0]);
            tempCourse[selectedNumber][0].map((item1) => {
                courseIndex.map((item2) => {
                    if (item2["name"] === item1) {
                        // console.log("查找成功");
                        course.push(item2);
                    }
                });
            });
            // console.log(course);
        } catch (error) {
            console.error("Error fetching JSON:", error);
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                学生{name}
                {term_name[selectedNumber]}课表
            </div>
            <center>
                <FileDownloadComponent />
                <button
                    className={styles.button}
                    onClick={handleClick}
                    // disabled={selectedNumber == -1}
                >
                    查询
                </button>
                <NumberSelector />
            </center>
            <div className={styles.takePlace}>tokensss</div>
            <div className={styles.content}>
                <div className={styles.rowHead}>
                    {weeks.map((item, index) => {
                        if (index === 0) {
                            return <div className={styles.empty} />;
                        }
                        return <div className={styles.headItem}>{item}</div>;
                    })}
                </div>
                {sections.map((rowItem, i) => (
                    <div className={styles.rowItem}>
                        {weeks.map((columnItem, j) => {
                            if (j === 0) {
                                return (
                                    <div className={styles.columnHead}>
                                        {rowItem}
                                    </div>
                                );
                            }
                            return <div className={styles.columnItem} />;
                        })}
                    </div>
                ))}
            </div>
            {/*课程名称代码*/}
            <div className={styles.topContent}>
                {course.map((item) => {
                    return (
                        <div
                            className={styles.item}
                            key={item.name}
                            style={{
                                top: `${(item.startSection - 1) * 52 + 80}px`,
                                left: `${(item.week - 1) * 100}px`,
                                height: `${
                                    (item.endSection - item.startSection + 1) *
                                    52
                                }px`,
                                lineHeight: `${
                                    (item.endSection - item.startSection + 1) *
                                    52
                                }px`,
                                fontSize: "9px",
                            }}
                        >
                            <p>{item.name}</p>
                            <Button onClick={() => existCourse(item)}>
                                退课！
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default observer(CourseTable);
