import React, { useState, useRef, useEffect } from "react";
import useStreamFetch from "../../hooks/useStreamFetch";
import { Button } from "antd";

const Home: React.FC = () => {
  const [text, setText] = useState("");
  const textRef = useRef(text);
  const animationFrameRef = useRef<number | null>(null); // 用于存储 requestAnimationFrame 的 ID

  const { loading, run } = useStreamFetch({
    url: "/api/stream",
    onValue: (value: { content: string; code: number }) => {
      const newText = value.content;
      let index = 0;
      const showText = () => {
        if (index < newText.length) {
          textRef.current = textRef.current + newText[index];
          setText(textRef.current);
          index++;
          animationFrameRef.current = requestAnimationFrame(showText);
        }
      };

      animationFrameRef.current = requestAnimationFrame(showText);
    },
  });

  // 组件卸载时取消动画帧
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const onClick = () => {
    setText("");
    textRef.current = "";
    run({ prompt: "你好" });
  };

  return (
    <div>
      <div>{text}</div>
      <Button onClick={onClick} loading={loading}>
        请求数据
      </Button>
    </div>
  );
};

export default Home;
