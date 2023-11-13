const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// 处理前端登录请求
app.post('/api/Userlogin', async (req, res) =>{
  try {
    const filePath = 'data.json';
    // const savePath = 'tempdata.json';
    let existingData = []
    
    try{
      const rawData = await fs.readFile(filePath,'utf-8');
      existingData = JSON.parse(rawData);
      res.json(existingData)
      console.log(existingData)
    } catch (error) {
      console.error('原始json文件存在格式错误', error);
    }
    // await fs.writeFile(savePath, JSON.stringify(existingData,null,2));

  } catch (error) {
    console.error('访问文本时发生错误：', error);
    res.status(500).json({ error: '保存失败' });
  }
});


app.listen(port, () => {
  console.log(`登录处理服务器运行在端口 ${port}`);
});
