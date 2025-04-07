import { useEffect, useRef, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  url: string;
  events?: {
    [eventName: string]: (data: any) => void;
  };
  autoConnect?: boolean;
  reconnect?: boolean;
  reconnectAttempts?: number;
  reconnectDelay?: number;
}

interface UseSocketResult {
  socket: Socket | null;
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
  emit: (event: string, ...args: any[]) => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string) => void;
}

const useSocket = (options: UseSocketOptions): UseSocketResult => {
  const {
    url,
    events = {},
    autoConnect = true,
    reconnect = true,
    reconnectAttempts = 5,
    reconnectDelay = 5000,
  } = options;

  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const eventsRef = useRef(events);

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return;

    socketRef.current = io(url, {
      autoConnect: false,
      reconnection: reconnect,
      reconnectionAttempts: reconnectAttempts,
      reconnectionDelay: reconnectDelay,
    });

    socketRef.current.on('connect', () => {
      setConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setConnected(false);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    // 注册初始事件
    Object.entries(eventsRef.current).forEach(([event, handler]) => {
      socketRef.current?.on(event, handler);
    });

    socketRef.current.connect();
  }, [url, reconnect, reconnectAttempts, reconnectDelay]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setConnected(false);
    }
  }, []);

  const emit = useCallback((event: string, ...args: any[]) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, ...args);
    }
  }, []);

  const on = useCallback((event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
      eventsRef.current[event] = callback;
    }
  }, []);

  const off = useCallback((event: string) => {
    if (socketRef.current) {
      socketRef.current.off(event);
      delete eventsRef.current[event];
    }
  }, []);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    socket: socketRef.current,
    connected,
    connect,
    disconnect,
    emit,
    on,
    off,
  };
};

export default useSocket;