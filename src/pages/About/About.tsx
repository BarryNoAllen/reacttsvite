import AgentCard from "../../components/AgentCard";
import { Row, Col } from "antd";
const MyList = () => {
  return (
    <Row gutter={[16, 16]} style={{ width: 776, margin: "0 auto" }}>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return (
          <Col span={8} xs={24} sm={12} md={8} key={item}>
            <AgentCard />
          </Col>
        );
      })}
    </Row>
  );
};

export default MyList;
