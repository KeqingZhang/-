import React, { useState } from "react";
import styles from "./RegStudentForm.module.css";

function RegStudentForm() {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password:'',
        passwordconfirm:''});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch('http://localhost:3003/api/registUser', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formData }),
        });
    
        if (response.ok) {
            console.log(formData);
            console.log('文本保存成功');
        } else {
            console.error('文本保存失败', formData);
        }
        } catch (error) {
        console.error('发生错误：', error);
        }
    };

    // const username, email, password, passwordconfirm;
    return (
        <div className={styles.root}
        style={{height: "350px",
                width: "550px",}}>
            <form onSubmit={handleSubmit}>
                <center className={styles.subtitle}>欢迎注册学生选课系统</center>
                <center className={styles.box}>
                    <label className={styles.label}>用户名</label>
                    <input
                        className={styles.input}
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </center>
                <center className={styles.box}>
                    <label className={styles.label}>邮箱</label>
                    <input
                        className={styles.input}
                        type='text'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </center>
                <center className={styles.box}>
                    <label className={styles.label}>密码</label>
                    <input
                        className={styles.input}
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </center>
                <center className={styles.box}>
                    <label className={styles.label}>确认密码</label>
                    <input
                        className={styles.input}
                        type='password'
                        name='passwordconfirm'
                        value={formData.passwordconfirm}
                        onChange={handleInputChange}
                    />
                </center>
                <center>
                    <button className={styles.buttom}>注册</button>
                </center>
            </form>
        </div>
    )
}

export default RegStudentForm