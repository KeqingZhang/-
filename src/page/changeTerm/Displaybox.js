import React from "react";
import style from "./css/displaybox.module.css";

const Displaybox = (props) => {
    return (
        <div className={style.root}>
            <center className={style.title}>{props.name}</center>
            <center className={style.title}>{props.term}</center>
        </div>
    );
};

export default Displaybox;
