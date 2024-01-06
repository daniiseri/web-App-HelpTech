import { createContext, useState, useContext, PropsWithChildren } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

import { CategoryID } from "../pages/profile-check/index";

interface Check {
  endPoint(categories: CategoryID[]): void;
  response: number;
}

const CheckContext = createContext({} as Check);

function CheckProvider({ children }: PropsWithChildren) {
  const [response, setResponse] = usePersistedState("response", 1);

  function endPoint(categories: CategoryID[]) {
    if (categories.some((item) => item.levels?.includes(4))) {
      setResponse(4);
    } else if (categories.some((item) => item.levels?.includes(3))) {
      setResponse(3);
    } else if (categories.some((item) => item.levels?.includes(2))) {
      setResponse(2);
    } else setResponse(1);
  }

  return (
    <CheckContext.Provider
      value={{
        endPoint,
        response,
      }}
    >
      {children}
    </CheckContext.Provider>
  );
}

function useCheck() {
  return useContext(CheckContext);
}

export { CheckProvider, useCheck };
