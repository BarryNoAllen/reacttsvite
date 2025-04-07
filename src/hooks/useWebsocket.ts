import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface GlobalData {
  getToken: () => string;
}

interface UseWebsocketOptions {
  productIds?: string[];
  globalDataRef: React.MutableRefObject<GlobalData>;
}

interface UseWebsocketResult {
  run: (ids: string[]) => void;
}

const useWebsocket = (options: UseWebsocketOptions): UseWebsocketResult => {
  const clientRef = useRef<Socket>(null);
  const initSocket = () => {
    const socket = io("http://localhost:4000", {
      path: "/ws",
      transports: ["websocket"], // 可强制使用 WebSocket 协议
    });
    socket.on("connect", () => {
      console.log("Connected!");
    });
    socket.on("message", (data: any) => {
      console.log("接受服务器发送的消息", data);
    });
    clientRef.current = socket;
  };

  useEffect(() => {
    if (!clientRef.current) {
      initSocket();
    }
  }, [options.globalDataRef, options.productIds]);

  const run = useCallback((ids: string[]) => {
    if (clientRef.current) {
      //   clientRef.current.emit("message", ids.join(","));
      ids.map((item) => {
        clientRef?.current?.emit("message", item);
        return void 0;
      });
    }
  }, []);

  return {
    run,
  };
};

export default useWebsocket;
