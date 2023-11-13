import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import styles from "./css/changeTermForm.module.css";
import DisplayData from "./DisplayData";
import FileUploader from "./fileUpload";

function ChangeTermForm() {
    const [formData, setFormData] = useState({
        courseName: "",
        toTerm: "",
        creditTime: "",
    });
    const [messageState, setMessageState] = useState(null);
    const [messageDetail, setMessageDetail] = useState(null);
    const [course, setCourse] = useState([{ name: "", Term: "" }]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:3008/api/transCourse",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ formData }),
                },
            );
            const data = await response.json();
            console.log(data);
            if (data[0] === "success") {
                try {
                    await fetch("http://localhost:3009/api/transCourseGraph", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ formData }),
                    });
                } catch (error) {
                    console.error("Failed to regenertate graph", error);
                }
                setMessageState("调课成功");
                setMessageDetail(" ");
            } else {
                if (data[1] === 1) {
                    setMessageState("调课失败");
                    setMessageDetail(
                        "该课程被调整到其前置课程之前的学期中，其前置课程如下，以供参考",
                    );
                    setCourse(data[2]);
                } else {
                    setMessageState("调课失败");
                    setMessageDetail(
                        "该课程被调整到其后继课程之后的学期中，其后置课程如下，以供参考",
                    );
                    setCourse(data[2]);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div
            className={styles.root}
            style={{ height: "350px", width: "550px" }}
        >
            <form onSubmit={handleSubmit}>
                <center className={styles.subtitle}>
                    欢迎进入课程调整界面
                </center>
                <center className={styles.box}>
                    <label className={styles.label}>调换课程名称</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleInputChange}
                    />
                </center>
                <center className={styles.box}>
                    <label className={styles.label}>调整到第几学期</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="toTerm"
                        value={formData.toTerm}
                        onChange={handleInputChange}
                    />
                </center>
                <center className={styles.box}>
                    <label className={styles.label}>调整学生每学期课时</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="creditTime"
                        value={formData.creditTime}
                        onChange={handleInputChange}
                    />
                </center>
                <center>
                    <FileUploader />
                    <button className={styles.buttom}>尝试调整</button>
                </center>
            </form>
            <DisplayData
                data={messageState}
                message={messageDetail}
                course={course}
            />
            {/* <Link to={{
                pathname: '/pageA',
                state: { courseInfo }
            }}>立即查询选课结果</Link> */}
        </div>
    );
}

export default observer(ChangeTermForm);
