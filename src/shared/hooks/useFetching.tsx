import { useState, useCallback, useEffect } from "react";

const useFetching = <T, >(callback: (...args: unknown[]) => Promise<T>): [T | undefined, boolean, string | undefined] => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const fetching = useCallback(async (...args: unknown[]) => {
    try {
      setIsLoading(true);
      const result = await callback(...args);
      setData(result);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [callback]);

  useEffect(() => {
    fetching();
  }, [fetching]);

  return [data, isLoading, error];
};

export default useFetching;