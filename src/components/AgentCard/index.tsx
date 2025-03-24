import ICON from "./icon.png";
import "./index.scss";
const AgentCard = () => {
  return (
    <div className="custom-agent-card">
      <img src={ICON} className="custom-agent-card-icon" />
      <div>
        <div className="custom-agent-card-title">合同助手</div>
        <div className="custom-agent-card-desc">合同助手合同助手</div>
      </div>
      <div className="custom-agent-card-action_default">添加</div>
    </div>
  );
};
export default AgentCard;
