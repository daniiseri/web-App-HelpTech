import { Dispatch, SetStateAction, useEffect, useState } from "react";

type IResponse<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistedState<T>(key: string, initialState: T): IResponse<T> {
  const [state, setState] = useState(() => {
    const storage = localStorage.getItem(key);

    if (storage) return JSON.parse(storage);
    else return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export { usePersistedState };
