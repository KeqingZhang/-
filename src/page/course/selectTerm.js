import React, { useState } from 'react';

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);

    // 添加条件以控制刷新
    if (event.target.value === 'your_condition_here') {
      window.location.reload();
    }
  }

  return (
    <div>
        <select
            value={selectedValue} 
            onChange={handleSelectChange}>
          <option value="">请选择</option>
          <option value="0">大一上半学期</option>
          <option value="1">大一下半学期</option>
          <option value="2">大二上半学期</option>
          <option value="3">大二下半学期</option>
          <option value="4">大三上半学期</option>
          <option value="5">大三下半学期</option>
        </select>
    </div>
  );
}

export default MyComponent;
