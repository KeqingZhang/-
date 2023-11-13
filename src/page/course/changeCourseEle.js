import React from "react";
import style from "./css/changeCourseEle.module.css"

const CourseEle = (props) => {
    return (
        <div className={style.root}>
            <center className={style.title}>{props.name}</center>
            <center>
                <button className={style.bottom} onClick={headleClike}>选课</button>
            </center>
            
        </div>
    );
  };
  
  export default CourseEle;
  