import React, { useState } from 'react';
import Popover from './Popover'
const Home: React.FC = () => {
  // 使用 useState 来控制 Popover 的显示与隐藏
  const [visible, setVisible] = useState(false);

  // 处理 Popover 显示状态变化的函数
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  // 处理点击 Popover 内容时关闭 Popover 的函数
  const handleClickContent = () => {
    setVisible(false);
  };

  return (
    <div>
    </div>
  );
};

export default Home;