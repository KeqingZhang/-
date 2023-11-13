import React, { useEffect } from "react";
import * as echarts from "echarts";

const CourseGraph = () => {
    useEffect(() => {
        const courseData = require("./data/coursePosition.json");
        const courseLinks = require("./data/courseLink.json");

        const courseNames = courseData.map((course) => course.name);
        const coordinates = courseData.map((course) => [course.x, course.y]);
        const links = courseLinks.map((link) => ({
            source: link.source,
            target: link.target,
            label: {
                show: true,
                position: "middle",
                formatter: " ",
                fontSize: 12,
                color: "#000",
            },
            lineStyle: link.lineStyle,
            z: 100,
        }));

        const colors = [
            "#001F3F",
            "#0074D9",
            "#7FDBFF",
            "#ADD8E6",
            "#87CEEB",
            "#4682B4",
        ];

        const chartDom = document.getElementById("course-graph");
        const myChart = echarts.init(chartDom);

        const option = {
            title: {
                text: "课程拓扑图关系展示",
            },
            series: [
                {
                    type: "graph",
                    layout: "none",
                    data: courseNames.map((name, index) => ({
                        name,
                        x: coordinates[index][1],
                        y: coordinates[index][0],
                        itemStyle: {
                            color: colors[index % colors.length],
                        },
                        z: 1,
                    })),
                    links: links,
                    force: {
                        edgeLength: 1, 
                    },
                    emphasis: {
                        label: {
                            show: true,
                        },
                    },
                    symbol: "rect",
                    symbolSize: [100, 50], 
                    roam: true,
                    edgeSymbol: ["circle", "arrow"],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        show: true,
                        formatter: "{c}",
                    },
                    label: {
                        show: true,
                        position: "inside",
                    },
                    dataZoom: [
                        {
                            type: "slider",
                            show: true,
                            yAxisIndex: [0],
                            filterMode: "empty",
                            width: 10,
                            height: "70%",
                            handleSize: 8,
                        },
                        {
                            type: "slider",
                            show: true,
                            xAxisIndex: [0],
                            filterMode: "empty",
                            width: "70%",
                            height: 10,
                            handleSize: 8,
                        },
                    ],
                },
            ],
        };

        myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, []); 

    return (
        <div id="course-graph" style={{ width: "1920px", height: "1080px" }} />
    );
};

export default CourseGraph;
