import React, { useState } from "react";
import Button from "@mui/material/Button";

const FileUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("请先选择文件");
            return;
        }

        const formData = new FormData();
        let aaaaaaaaa = null;
        formData.append("fileName", selectedFile.name);
        for (const pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
            aaaaaaaaa = pair[1];
        }
        console.log(aaaaaaaaa);
        try {
            const response = await fetch(
                "http://localhost:3011/api/fileupload",
                {
                    method: "POST",
                    body: aaaaaaaaa,
                },
            );

            if (response.ok) {
                alert("文件上传成功！");
            } else {
                alert("文件上传失败，请重试。");
            }
        } catch (error) {
            console.error("文件上传失败:", error);
            alert("文件上传失败，请检查网络连接并重试。");
        }
    };

    return (
        <div>
            <p>选择上传的课程文件</p>
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload}>上传文件</Button>
        </div>
    );
};

export default FileUploader;
