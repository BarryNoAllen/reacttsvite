import { useState } from "react";

interface UseStreamFetchOptions<T> {
  url: string;
  defaultParams?: Record<string, any>;
  speed?: number;
  onDone?: () => void;
  onValue?: (value: T) => void;
  onError?: (error: Error) => void;
  onBefore?: () => void;
  onFinally?: () => void;
}

interface UseStreamFetchResult {
  done: boolean;
  isAborted: boolean;
  loading: boolean;
  abort: () => void;
  run: (body: Record<string, any>) => Promise<void>;
}

interface FetchOptions extends RequestInit {
  signal?: AbortSignal;
}
const useStreamFetch = <T extends Record<string, any>>(
  options: UseStreamFetchOptions<T>
): UseStreamFetchResult => {
  const [isAborted, setIsAborted] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(true);
  const controller = new AbortController();
  const abort = () => {
    setIsAborted(true);
    controller.abort();
  };
  const run = async (body: Record<string, any>) => {
    options?.onBefore?.();
    setLoading(true);
    setIsAborted(false);
    setDone(false);
    try {
      await fetchCreate(body);
    } catch (error) {
      if (error instanceof Error) {
        options?.onError?.(error);
      }
    } finally {
      options?.onFinally?.();
      setLoading(false);
    }
  };
  const processReader = async (
    reader: ReadableStreamDefaultReader<Uint8Array>
  ) => {
    const decoder = new TextDecoder();
    let result = await reader.read();
    let buffer = "";
    while (!result.done) {
      const chunk = decoder.decode(result.value);
      console.log("chunk", chunk);
      try {
        const obj = JSON.parse(buffer + chunk);
        buffer = "";
        // 尝试解析 JSON 对象
        options?.onValue?.(obj);
      } catch (error) {
        buffer += chunk;
      }
      result = await reader.read(); // 更新 result
    }
    // if (buffer.trim()) {
    //   try {
    //     const arr = buffer.split("\n").filter((item) => item);
    //     const mergedArr = arr.reduce((acc: string[], cur, index, src) => {
    //       if (index % 2 === 0 && src[index + 1]) {
    //         const combined = [cur, src[index + 1]].join("");
    //         acc.push(combined);
    //       } else if (index % 2 === 0 && !src[index + 1]) {
    //         console.log("Single JSON:", cur);
    //         acc.push(cur);
    //       }
    //       return acc;
    //     }, [] as string[]);
    //     mergedArr.map((item) => {
    //       const json = JSON.parse(item);
    //       if (json) {
    //         options?.onValue?.(json);
    //       } else {
    //         options.onError?.(new Error("Failed to parse JSON"));
    //       }
    //     });
    //   } catch (error) {
    //     console.error("Failed to parse final JSON:", buffer);
    //   }
    // }
    setDone(true);
    options?.onDone?.();
  };
  const fetchCreate = async (body: Record<string, any>) => {
    try {
      setLoading(true);
      const fetchOptions: FetchOptions = {
        signal: controller.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      const response: Response = await fetch(options.url, fetchOptions);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const reader: ReadableStreamDefaultReader<Uint8Array> | undefined =
        response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is null");
      }
      await processReader(reader);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  return {
    done,
    abort,
    isAborted,
    loading,
    run,
  };
};

export default useStreamFetch;
