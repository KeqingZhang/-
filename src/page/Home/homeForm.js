import React, { useState, useEffect } from "react";
import styles from "./homeForm.module.css";
import ReactMarkdown from "react-markdown";

function homeForm() {
    // setMarkdownContent(markdownText);

    return (
        <div className={styles.root}>
            {/* <center className={styles.title}>
                Welcome to BJUT in the BeiJing City
            </center> */}
            <h2 className={styles.title}>主要功能</h2>
            <ol className={styles.context}>
                <li>
                    <strong>调研课程开设：</strong>
                    进行有关计算机专业应该开设的课程的调研，通过构建课程的有向无环图，解决拓扑子集划分问题，得到参考解。
                </li>
                <li>
                    <strong>拓扑子集划分调整：</strong>
                    允许对拓扑子集划分的结果进行调整。通常情况下，直接的课程编排结果可能过于密集，即某学期内总课时过多，难以承受。因此，有必要对所求的课程与学期的编排表进行人为的调整，适度拉长修业时间，以满足课程之间的次序关系，同时不使学生负担过重（限制每学期的学分总数），最终形成满意的学期与课程编排表。
                </li>
                <li>
                    <strong>建立图形界面：</strong>
                    建立有向无环图以及课程编排结果，并提供图形界面展示。对子集划分结果的人工调整也应提供友好的界面支持。
                </li>
                <li>
                    <strong>处理划分方案：</strong>
                    处理直接求得的拓扑子集划分方案，其中每学期课时总量通常超过学校规定的学期课时数。这可能需要将某些课程调整到后续学期，但某门课的向后调整可能引发新的制约冲突。因此，需要再次启动划分算法得出合理的划分方案。
                </li>
                <li>
                    <strong>图形界面操作：</strong>
                    图形界面显示与人工调整的界面处理需要一定的技巧。用户可以自由选择同一学期内感兴趣的课程，也可以灵活设置一些参数，例如每学期学时数的上限值，并根据其调整选课计划。
                </li>
                <li>
                    <strong>数据输入与存储：</strong>
                    原始数据的输入可以通过适当的界面，输入有向弧的顶点对的方式来完成。实际的数据应以文件的形式存储，以备再次启动本辅助编排系统时导入。
                </li>
                <li>
                    <strong>用户注册和登录：</strong>
                    允许添加新的学生用户，扩大整体的排课规模
                </li>
            </ol>
        </div>
    );
}

export default homeForm;
