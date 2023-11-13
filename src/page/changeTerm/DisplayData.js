import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import styles from "./DisplayData.module.css";

function DisplayData({ data, message, course }) {
    return (
        <Paper
            className={styles.root}
            elevation={3}
            sx={{
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "8px",
                height: "150px",
            }}
        >
            <Typography variant="h6" align="center" gutterBottom>
                {data}
            </Typography>
            <Typography variant="body1" align="center" paragraph>
                {message}
            </Typography>
            <List>
                {course.map((course, index) => (
                    <ListItem
                        key={course.name}
                        style={{
                            top: "20px",
                            width: "120px",
                            left: `${(index - 1) * 120 + 100}px`,
                            height: "20px",
                            lineHeight: "52px",
                            fontSize: "9px",
                            position: "absolute",
                            margin: "4px",
                        }}
                    >
                        <ListItemText>
                            <Typography
                                variant="body1"
                                sx={{
                                    height: "20px",
                                    width: "120px",
                                    fontSize: "14px",
                                    margin: "5px",
                                    background: "#999",
                                }}
                            >
                                {course.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    height: "20px",
                                    width: "100px",
                                    fontSize: "14px",
                                    margin: "30px",
                                }}
                            >
                                在第{course.term}学期
                            </Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default DisplayData;
