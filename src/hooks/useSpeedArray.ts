import { useState, useEffect, useRef, useCallback } from "react";

interface UseSpeedArrayOptions<T> {
  speed?: number; // 读取速度（毫秒）
  autoStart?: boolean; // 是否自动开始
  onValue: (v: T) => void; // 注册值回调
}

interface UseSpeedArrayResult<T> {
  currentItem: T | null; // 当前读取的元素
  isPlaying: boolean; // 是否正在读取
  pause: () => void; // 暂停读取
  play: () => void; // 继续读取
  addItems: (items: T[]) => void; // 向数组添加元素
}

function useSpeedArray<T>(
  initialArray: T[] = [],
  options: UseSpeedArrayOptions<T>
): UseSpeedArrayResult<T> {
  const { speed = 1000, autoStart = false, onValue } = options;
  const [array, setArray] = useState<T[]>(initialArray);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoStart);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 注册值回调

  // 添加元素到数组
  const addItems = (items: T[]) => {
    setArray((prev) => [...prev, ...items]);
  };

  // 暂停读取
  const pause = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  // 继续读取
  const play = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  // 读取逻辑
  useEffect(() => {
    if (currentIndex >= array.length) return;
    timerRef.current = setTimeout(() => {
      const item = array[currentIndex];
      onValue(item);
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentIndex, array, speed]);

  return {
    currentItem: array[currentIndex] || null,
    isPlaying,
    pause,
    play,
    addItems,
  };
}

export default useSpeedArray;
