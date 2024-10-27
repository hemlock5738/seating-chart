import {
  type MemberSeats,
  type Members,
  type Seats,
  leaveSeat,
  sitDown,
} from "@apps/shared";
import { category } from "../../../constants/category";

export type SeatState = {
  members: Members;
  seats: Seats;
  memberSeats: MemberSeats;
  email: string;
  filteredSeatIds: Set<string>;
};

export type SeatAction =
  | {
      type: "set";
      key: keyof SeatState;
      value: SeatState[keyof SeatState];
    }
  | { type: "sitDown"; email: string; seatId: string }
  | { type: "leaveSeat"; email: string; seatId: string }
  | { type: "filter"; text: string };

export const seatReducer = (
  state: SeatState,
  action: SeatAction,
): SeatState => {
  switch (action.type) {
    case "set": {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    case "leaveSeat": {
      const { newMemberSeats } = leaveSeat(
        action.email,
        action.seatId,
        state.memberSeats,
      );
      return {
        ...state,
        memberSeats: newMemberSeats,
      };
    }
    case "sitDown": {
      const { newMemberSeats } = sitDown(
        action.email,
        action.seatId,
        state.memberSeats,
        state.seats,
      );
      return {
        ...state,
        memberSeats: newMemberSeats,
      };
    }
    case "filter": {
      const text = action.text;
      if (text === "") {
        return {
          ...state,
          filteredSeatIds: new Set(
            Object.values(state.seats).map((seat) => seat.id),
          ),
        };
      }
      const seatdIds = new Set(
        Object.values(state.seats)
          .filter(
            (seat) =>
              match(text, seat.id) || match(text, category[seat.category]),
          )
          .map((seat) => seat.id),
      );
      const emails = new Set(
        Object.values(state.members)
          .filter(
            (member) =>
              match(text, member.name) ||
              match(text, member.nameKana) ||
              match(text, member.department) ||
              match(text, member.position),
          )
          .map((member) => member.email),
      );
      const seatIdsFromEmails = new Set(
        state.memberSeats
          .filter((memberSeat) => emails.has(memberSeat.email))
          .map((memberSeat) => memberSeat.seatId),
      );
      return { ...state, filteredSeatIds: seatdIds.union(seatIdsFromEmails) };
    }
  }
};

function match(item: string, criteria: string) {
  return criteria.toLowerCase().includes(item.toLowerCase());
}
