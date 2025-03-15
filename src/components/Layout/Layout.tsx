import React, { useState } from "react";
import { Layout, Menu, Popover, Drawer, Image } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "./index.css";
const { Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname === "/" ? "home" : "about";
  const [collapsed, setCollapsed] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const MenuRender = () => {
    return (
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        className="dark no-scrollbar"
        style={{
          height: "100%",
          borderRight: 0,
          width: 200,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Menu.Item key="about" icon={<InfoCircleOutlined />}>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.SubMenu title="最近对话">
          <Menu.Item key="about1">
            <Link to="/about/1">最近话题</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item style={{ marginTop: "auto" }}>
          <Image
            width={40}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            preview={false}
          />
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <Layout style={{ maxHeight: "100vh", height: "100vh" }}>
      <Layout.Header
        style={{
          backgroundColor: "#fff",
          paddingLeft: 0,
          height: 56,
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            width: collapsed ? 242 : 200,
            backgroundColor: collapsed ? "#fff" : "#f3f4f6",
            paddingLeft: 20,
          }}
        >
          {collapsed ? (
            <Popover
              content={MenuRender}
              align={
                {
                  // offset: [22, -16],
                }
              }
              color="#f3f4f6"
              styles={{
                body: {
                  height: "calc(100vh - 56px)",
                  overflowY: "hidden",
                },
                root: { height: "calc(100vh - 56px)", overflowY: "auto" },
              }}
              rootClassName="iiii"
            >
              <MenuUnfoldOutlined
                style={{ marginLeft: 0 }}
                onClick={() => setCollapsed(!collapsed)}
                // onClick={() => setOpenDrawer(true)}
              />
            </Popover>
          ) : (
            <MenuFoldOutlined
              style={{ marginLeft: 160 }}
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
        </div>
      </Layout.Header>
      <Layout style={{ backgroundColor: "#fff" }}>
        <Sider
          collapsed={collapsed}
          trigger={null}
          zeroWidthTriggerStyle={{
            top: 10,
            left: 10,
          }}
          collapsedWidth={0}
          collapsible
          theme="light"
          width={200}
          style={{
            backgroundColor: "#f3f4f6!important",
            overflow: "hidden",
          }}
        >
          <MenuRender />
        </Sider>
        <Content
          style={{
            margin: "16px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <Drawer
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        closeIcon={false}
        placement="left"
        height={"100vh"}
        width={"auto"}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <MenuRender />
      </Drawer>
    </Layout>
  );
};

export default AppLayout;
