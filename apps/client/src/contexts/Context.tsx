import type { FC, ReactNode } from "react";
import { GasContextProvider } from "./gas/GasContext";
import { SeatContextProvider } from "./seat/SeatContext";

export const Context: FC<{ children: ReactNode }> = ({ children }) => (
  <GasContextProvider>
    <SeatContextProvider>{children}</SeatContextProvider>
  </GasContextProvider>
);
