import React, { useState } from 'react';
import style from './css/Numberselect.module.css'

const NumberSelector = () => {
  // 使用useState来保存选择的数字
  const [selectedNumber, setSelectedNumber] = useState('');

  // 处理下拉框值的变化
  const handleNumberChange = (event) => {
    setSelectedNumber(event.target.value);
  };

  return (
    <div className={style.root}>
      <h2 className={style.title}>请选择你想要查询的学期</h2>
      <select value={selectedNumber} onChange={handleNumberChange}>
        <option value="">请选择</option>
        <option value="1">大一上半学期</option>
        <option value="2">大一下半学期</option>
        <option value="3">大二上半学期</option>
        <option value="4">大二下半学期</option>
        <option value="5">大三上半学期</option>
        <option value="6">大三下半学期</option>
      </select>
      {/* {selectedNumber && <p>你选择了：{selectedNumber}</p>} */}
    </div>
  );
};

export default NumberSelector;
