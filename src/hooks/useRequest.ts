import { useState, useEffect, useCallback, useRef } from 'react';

interface UseRequestOptions<TParams extends any[], TData> {
  manual?: boolean; // 是否手动触发
  defaultParams?: TParams; // 默认参数
  pollingInterval?: number; // 轮询间隔
  debounceInterval?: number; // 防抖间隔
  throttleInterval?: number; // 节流间隔
  cacheKey?: string; // 缓存键
  onSuccess?: (data: TData) => void; // 请求成功回调
  onError?: (error: Error) => void; // 请求失败回调
}

interface UseRequestResult<TParams extends any[], TData> {
  loading: boolean; // 加载状态
  data?: TData; // 请求数据
  error?: Error; // 请求错误
  run: (...params: TParams) => Promise<TData>; // 手动触发请求
  cancel: () => void; // 取消请求
  refresh: () => void; // 刷新请求
}

function useRequest<TParams extends any[], TData>(
  service: (...args: TParams) => Promise<TData>,
  options: UseRequestOptions<TParams, TData> = {}
): UseRequestResult<TParams, TData> {
  const {
    manual = false,
    defaultParams = [] as unknown as TParams,
    pollingInterval,
    debounceInterval,
    throttleInterval,
    cacheKey,
    onSuccess,
    onError,
  } = options;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TData | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const throttleLastRunRef = useRef<number>(0);

  const fetchData = useCallback(
    async (...params: TParams) => {
      setLoading(true);
      setError(undefined);

      try {
        const result = await service(...params);
        setData(result);
        if (onSuccess) onSuccess(result);
        return result;
      } catch (err) {
        setError(err as Error);
        if (onError) onError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [service, onSuccess, onError]
  );

  const run = useCallback(
    async (...params: TParams): Promise<TData> => {
      if (debounceInterval) {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        return new Promise((resolve) => {
          debounceTimerRef.current = setTimeout(async () => {
            const result = await fetchData(...params);
            resolve(result);
          }, debounceInterval);
        });
      }

      if (throttleInterval) {
        const now = Date.now();
        if (now - throttleLastRunRef.current < throttleInterval) {
          return Promise.resolve(data as TData);
        }
        throttleLastRunRef.current = now;
      }

      return fetchData(...params);
    },
    [fetchData, debounceInterval, throttleInterval, data]
  );

  const cancel = useCallback(() => {
    if (pollingTimerRef.current) clearTimeout(pollingTimerRef.current);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
  }, []);

  const refresh = useCallback(() => {
    run(...defaultParams);
  }, [run, defaultParams]);

  useEffect(() => {
    if (!manual) {
      run(...defaultParams);
    }
  }, [manual, run, defaultParams]);

  useEffect(() => {
    if (pollingInterval) {
      pollingTimerRef.current = setInterval(() => {
        run(...defaultParams);
      }, pollingInterval);
    }
    return () => {
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
    };
  }, [pollingInterval, run, defaultParams]);

  return {
    loading,
    data,
    error,
    run,
    cancel,
    refresh,
  };
}

export default useRequest;