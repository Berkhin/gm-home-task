import { useState, useEffect } from 'react';

const useDebounce = (initialState, delay = 300) => {
  const [state, setState] = useState(initialState);
  const [debouncedState, setDebouncedState] = useState(initialState);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedState(state);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [state, delay]);

  return [debouncedState, setState];
};

export default useDebounce;
