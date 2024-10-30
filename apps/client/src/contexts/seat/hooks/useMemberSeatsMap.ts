import type { MemberSeats } from "@apps/shared";
import { useMemo } from "react";
import { type Mapping, createMap } from "../../../utils/createMap";

export type MemberSeatsMap = {
  seatId: Mapping;
  email: Mapping;
};

export const initialMemberSeatsMap: MemberSeatsMap = {
  seatId: {},
  email: {},
};

export const useMemberSeatsMap = (
  memberSeats?: MemberSeats,
): MemberSeatsMap => {
  const seatidMap = useMemo(
    () => createMap(memberSeats ?? [], "seatId", "email"),
    [memberSeats],
  );

  const emailMap = useMemo(
    () => createMap(memberSeats ?? [], "email", "seatId"),
    [memberSeats],
  );

  return { seatId: seatidMap, email: emailMap };
};
