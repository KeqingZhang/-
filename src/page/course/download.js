import React from "react";
import Button from "@mui/material/Button";
import styles from "./css/download.module.css";

class FileDownloadComponent extends React.Component {
    downloadFile = () => {
        const apiUrl = "http://localhost:3012/api/download";

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("文件下载失败");
                }
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));

                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "courseData.json");
                document.body.appendChild(link);
                link.click();

                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("文件下载失败", error);
            });
    };

    render() {
        return (
            <div>
                <Button className={styles.button} onClick={this.downloadFile}>
                    下载文件
                </Button>
            </div>
        );
    }
}

export default FileDownloadComponent;
