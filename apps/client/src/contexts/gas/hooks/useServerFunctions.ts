import type * as server from "@apps/server";
import { GASClient, type ServerFunctions } from "gas-client";
import { useRef } from "react";

export const useServerFunctions = (urlPattern: RegExp) => {
  const serverFunctionsRef = useRef<ServerFunctions<typeof server>>();

  if (serverFunctionsRef.current === undefined) {
    const { serverFunctions } = new GASClient<typeof server>({
      allowedDevelopmentDomains: (origin) => urlPattern.test(origin),
    });
    serverFunctionsRef.current = serverFunctions;
  }

  return serverFunctionsRef;
};
