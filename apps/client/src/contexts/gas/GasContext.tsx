import type * as server from "@apps/server";
import type { GoogleScriptFunctions } from "@hemlock5738/gas-client";
import type { ServerFunctions } from "gas-client";
import { type FC, type ReactNode, createContext } from "react";
import { useGoogleScriptFunctions } from "./hooks/useGoogleScriptFunctions";
import { useServerFunctions } from "./hooks/useServerFunctions";

type Value = {
  serverFunctions: ServerFunctions<typeof server>;
  googleScriptFunctions: GoogleScriptFunctions;
};

const defaultValue: Value = {
  serverFunctions: {} as ServerFunctions<typeof server>,
  googleScriptFunctions: {} as GoogleScriptFunctions,
};

export const GasContext = createContext<Value>(defaultValue);

export const GasContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const urlPattern = /https:\/\/.*\.googleusercontent\.com$/;

  const serverFunctionsRef = useServerFunctions(urlPattern);
  const googleScriptFunctionsRef = useGoogleScriptFunctions(urlPattern);

  const value: Value = {
    serverFunctions: serverFunctionsRef.current as ServerFunctions<
      typeof server
    >,
    googleScriptFunctions:
      googleScriptFunctionsRef.current as GoogleScriptFunctions,
  };

  return <GasContext.Provider value={value}>{children}</GasContext.Provider>;
};
