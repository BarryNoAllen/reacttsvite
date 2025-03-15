import React, { useState } from 'react';
import { Popover } from 'antd';

const Home: React.FC = () => {
  // 使用 useState 来控制 Popover 的显示与隐藏
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };
  const handleClickContent = () => {
    setVisible(false);
  };
  return (
    <div>
      <Popover
        content={
          <div onClick={handleClickContent}>
            888
          </div>
        }
        open={visible}
        onOpenChange={handleVisibleChange}
        trigger="click"
      >
        <div style={{ width: 120, backgroundColor: 'red', }}>哈哈</div>
      </Popover>
    </div>
  );
};

export default Home;