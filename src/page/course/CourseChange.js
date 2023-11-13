import React, { useState, useEffect } from "react";
import styles from "./CourseChange.module.css";
import { AppViewModel, appViewModel } from "../../data/AppViewModel";
import { observer } from "mobx-react";
import Button from "@mui/material/Button";
// import CourseEle from './changeCourseEle';

const ScrollableTable = () => {
    // const [data, setData] = useState(null);
    const data = appViewModel.currentSelectedTermCourses();

    const CourseElement = (props) => {
        let message = {
            name: props.name,
            totalCap: props.totalCap,
            resNumber: props.resNumber,
        };
        const headleEleClike = async () => {
            console.log(message);
            appViewModel.fetchCourseChange(message);
            return message;
        };

        return (
            <div className={styles.element}>
                <center className={styles.title}>{props.name}</center>
                <center className={styles.time}>
                    {String(props.resNumber)}未选/
                    {String(props.totalCap)}总容量
                </center>

                {/* <center className={style.nsumber}>{props}</center> */}
                <center>
                    <Button
                        variant="contained"
                        onClick={headleEleClike}
                        className={styles.button}
                    >
                        选课
                    </Button>
                </center>
            </div>
        );
    };

    useEffect(() => {
        const timer = setInterval(() => {
            appViewModel.fetchCourseData();
            // console.log("学期中的总课程：", data);
        }, 100);

        // 在组件卸载时清除定时器，以避免内存泄漏
        return () => {
            clearInterval(timer);
        };
    }, []);

    const courseElementList = data.map((item) => (
        <CourseElement
            name={item.name}
            resNumber={item.resNumber}
            totalCap={item.totalCap}
        />
    ));

    const headleClike = async () => {
        const result = appViewModel.fetchCourseChange();
    };

    return (
        <div className={styles.root}>
            <table className={styles.table}>
                <thead className={styles.head}>
                    <tr>
                        <th className={styles.th}>可选课程</th>
                    </tr>
                </thead>
                <tbody>{courseElementList}</tbody>
            </table>
        </div>
    );
};

export default observer(ScrollableTable);
