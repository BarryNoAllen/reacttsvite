import React from "react";
import { useParams } from "react-router-dom";
const Home: React.FC = () => {
  const { id } = useParams();
  console.log(id, "id");

  return <div>哦哦888</div>;
};

export default Home;
