import React, { useState } from "react";
import styles from "./LogStudentForm.module.css";

function RegStudentForm() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    let [courseInfo, setCourseInfo] = useState({
        StudentName: "",
        course: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:3001/api/Userlogin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            const data = await response.json();
            setData([data]);
            console.log("输入的用户名", formData.username);
            let flag = 0;
            for (const key in data) {
                if (data[key].username === formData.username) {
                    console.log(data[key].username);
                    console.log(data[key].password, formData.password);
                    if (String(data[key].password) === formData.password) {
                        console.log("登录成功");
                        flag = 1;
                        courseInfo.StudentName = data[key].username;
                        courseInfo.course = data[key].course;
                        console.log("登陆成功后courseInfo", courseInfo);
                        try {
                            const response2 = await fetch(
                                "http://localhost:3004/api/saveCourse",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ courseInfo }),
                                },
                            );
                            const data = await response2.json();
                            console.log(courseInfo);
                            console.log(data);
                        } catch (error) {
                            console.error("保存登录课程数据失败", error);
                        }
                    }
                }
            }
            if (flag) {
                console.log("登陆成功！");
            } else {
                console.log("登陆失败");
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
                    欢迎登录学生选课系统
                </center>
                <center className={styles.box}>
                    <label className={styles.label}>用户名</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </center>
                <center className={styles.box}>
                    <label className={styles.label}>密码</label>
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </center>
                <center>
                    <button className={styles.buttom}>登录</button>
                </center>
            </form>
        </div>
    );
}

export default RegStudentForm;
