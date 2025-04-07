import React, { useState, useRef, useEffect } from "react";
// import useStreamFetch from "../../hooks/useStreamFetch";
import { Button } from "antd";
// import useWebsocket from "../../hooks/useWebsocket";
import useSpeedArray from "../../hooks/useSpeedArray";

const Home: React.FC = () => {
  const [text, setText] = useState("");
  const [arr, setArr] = useState([]);
  const { addItems, pause, play } = useSpeedArray<number>(arr, {
    onValue: (v) => {
      console.log(v, "onValue");
    },
  });
  // const { run } = useWebsocket({
  //   globalDataRef: resRef,
  // });
  // const { loading, run } = useStreamFetch({
  //   url: "/api/stream",
  //   onValue: (value: { content: string; code: number }) => {
  //     console.log(value, "value");
  //     if (value.code === 200) {
  //       setText((pre) => {
  //         return pre + value.content;
  //       });
  //     }
  //   },
  // });

  const onClick = () => {
    addItems([1, 2, 3, 4, 5, 6, 7]);
  };

  return (
    <div>
      <div>{text}</div>
      <Button onClick={onClick}>请求数据</Button>
      <Button onClick={pause}>暂停</Button>
      <Button onClick={play}>继续</Button>
    </div>
  );
};

export default Home;
