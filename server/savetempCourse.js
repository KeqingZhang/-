const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3004;

app.use(cors());
app.use(bodyParser.json());

// 登陆后保存用户的课程数据
app.post('/api/saveCourse', async (req, res) =>{
  try {

    const savePath = 'tempdata.json';
    let existingData = [];
    console.log(req.body);
    existingData = req.body;
    await fs.writeFile(savePath, JSON.stringify(existingData,null,2));

  } catch (error) {
    console.error('访问文本时发生错误：', error);
    res.status(500).json({ error: 'tempCourse 保存失败' });
  }
});

app.listen(port, () => {
  console.log(`登录处理服务器运行在端口 ${port}`);
});
