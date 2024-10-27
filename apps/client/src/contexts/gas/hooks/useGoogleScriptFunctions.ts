import { GasClient } from "@hemlock5738/gas-client";
import type { GoogleScriptFunctions } from "@hemlock5738/gas-client";
import { useRef } from "react";

export const useGoogleScriptFunctions = (urlPattern: RegExp) => {
  const googleScriptFunctionsRef = useRef<GoogleScriptFunctions>();

  if (googleScriptFunctionsRef.current === undefined) {
    const { googleScriptFunctions } = new GasClient({
      allowedDevelopmentDomains: (origin) => urlPattern.test(origin),
    });
    googleScriptFunctionsRef.current = googleScriptFunctions;
  }

  return googleScriptFunctionsRef;
};
