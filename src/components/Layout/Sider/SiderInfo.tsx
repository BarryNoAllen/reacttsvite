import { Avatar, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const SiderInfo = () => {
  return (
    <Menu className="custom-sider-userinfo">
      <Menu.Item
        key="userinfo"
        icon={<Avatar icon={<UserOutlined />} size={40} />}
      >
        <span>用户信息</span>
      </Menu.Item>
    </Menu>
  );
};
export default SiderInfo;
