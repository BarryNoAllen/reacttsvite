import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import CustomSider from "./Sider/Sider";
import "./index.scss";
const { Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="custom-layout w-h-100">
      <Sider
        className="custom-sider"
        collapsedWidth={60}
        collapsible
        theme="light"
        width={200}
        collapsed={collapsed}
        trigger={null}
      >
        <CustomSider collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
