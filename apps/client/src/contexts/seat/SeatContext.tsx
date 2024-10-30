import {
  type Dispatch,
  type FC,
  type ReactNode,
  createContext,
  useReducer,
} from "react";
import { useEmail } from "./hooks/useEmail";
import { useFilteredSeatIds } from "./hooks/useFilteredSeatIds";
import { useMemberSeats } from "./hooks/useMemberSeats";
import {
  type MemberSeatsMap,
  initialMemberSeatsMap,
  useMemberSeatsMap,
} from "./hooks/useMemberSeatsMap";
import { useMembers } from "./hooks/useMembers";
import { useSeats } from "./hooks/useSeats";
import {
  type SeatAction,
  type SeatState,
  seatReducer,
} from "./reducers/seatReducer";

type Value = {
  seatState: SeatState;
  memberSeatsMap: MemberSeatsMap;
  seatDispatch: Dispatch<SeatAction>;
};

const initialState: SeatState = {
  members: undefined,
  seats: undefined,
  memberSeats: undefined,
  email: undefined,
  filteredSeatIds: undefined,
};

const defaultValue: Value = {
  seatState: initialState,
  memberSeatsMap: initialMemberSeatsMap,
  seatDispatch: () => {},
};

export const SeatContext = createContext<Value>(defaultValue);

export const SeatContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [seatState, seatDispatch] = useReducer(seatReducer, initialState);

  useMembers(seatDispatch);
  useSeats(seatDispatch);
  useMemberSeats(seatDispatch);
  useEmail(seatDispatch);
  useFilteredSeatIds(seatDispatch, seatState.seats);

  const value: Value = {
    seatState,
    memberSeatsMap: useMemberSeatsMap(seatState.memberSeats),
    seatDispatch,
  };

  return <SeatContext.Provider value={value}>{children}</SeatContext.Provider>;
};
