import { useCallback, useEffect } from 'react';

const useDebounce = (func, milliSeconds, deps) => {
  const callback = useCallback(func, [deps]);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, milliSeconds);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, milliSeconds]);
};

export default useDebounce;
