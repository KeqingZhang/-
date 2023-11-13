import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Home from "./page/Home/home";
import Course from "./page/course/Course";
import RegStudentPage from "./page/RegStudent/RegStudentPage";
import LogStudentPage from "./page/LoginStudent/LogStudentPage";
import ShowGraphPage from "./page/showGraph/showGraph";
import ChangeTermPage from "./page/changeTerm/changeTerm";

import "./App.css";

const App = () => {
    return (
        <Router>
            <div>
                <nav className="navbar">
                    <ul id="navbar-ul">
                        <li>
                            <Link to="/">主页</Link>
                        </li>
                        <li>
                            <Link to="/course">课程查询</Link>
                        </li>
                        <li>
                            <Link to="/regstudent">注册</Link>
                        </li>
                        <li>
                            <Link to="/logstudent">登录</Link>
                        </li>
                        <li>
                            <Link to="/changeTerm">调换课程学期</Link>
                        </li>
                        <li>
                            <Link to="/showgraph">课程拓扑图展示</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/course" element={<Course />} />
                    <Route path="/regstudent" element={<RegStudentPage />} />
                    <Route path="/logstudent" element={<LogStudentPage />} />
                    <Route path="/changeTerm" element={<ChangeTermPage />} />
                    <Route path="/showgraph" element={<ShowGraphPage />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
