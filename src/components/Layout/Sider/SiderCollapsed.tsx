import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { SiderProps } from "./index";
import { FC } from "react";
const SiderCollapsed: FC<SiderProps> = (props) => {
  const { collapsed, toggleCollapsed } = props;
  const onClick = () => {
    toggleCollapsed?.();
  };
  return (
    <div
      className={`custom-sider-collapsed ${
        collapsed ? "custom-sider-collapsed_collapsed" : ""
      }`}
    >
      {collapsed ? (
        <MenuUnfoldOutlined onClick={onClick} />
      ) : (
        <MenuFoldOutlined onClick={onClick} />
      )}
    </div>
  );
};
export default SiderCollapsed;
