import type {
  MemberSeat,
  MemberSeats,
  Members,
  Seat,
  Seats,
} from "@apps/shared";
import { category } from "../../../constants/category";

export type SeatState = {
  members: Members;
  seats: Seats;
  memberSeats: MemberSeats;
  email: string;
  filteredSeatIds: Set<string>;
};

const leaveSeat = (email: string, seatId: string, memberSeats: MemberSeats) => {
  const filter = (memberSeat: MemberSeat) =>
    memberSeat.email === email && memberSeat.seatId === seatId;
  const newMemberSeats = memberSeats.filter(
    (memberSeat) => !filter(memberSeat),
  );
  const deletionIndices = memberSeats
    .map((memberSeat, i) => ({ index: i, ...memberSeat }))
    .filter((memberSeat) => filter(memberSeat))
    .map((memberSeat) => memberSeat.index);
  return [newMemberSeats, deletionIndices] as const;
};

const sitDown = (
  email: string,
  seatId: string,
  memberSeats: MemberSeats,
  seats: Seats,
) => {
  const isConferenceRoom = (seat: Seat) => seat.category === "conference";
  const filter = (memberSeat: MemberSeat) =>
    memberSeat.email === email &&
    (isConferenceRoom(seats[seatId])
      ? isConferenceRoom(seats[memberSeat.seatId])
      : !isConferenceRoom(seats[memberSeat.seatId]));
  const newMemberSeat = { email, seatId };
  const newMemberSeats = [
    ...memberSeats.filter((memberSeat) => !filter(memberSeat)),
    newMemberSeat,
  ];
  const deletionIndices = memberSeats
    .map((memberSeat, i) => ({ index: i, ...memberSeat }))
    .filter((memberSeat) => filter(memberSeat))
    .map((memberSeat) => memberSeat.index);
  return [newMemberSeats, deletionIndices, newMemberSeat] as const;
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
      const [newMemberSeats] = leaveSeat(
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
      const [newMemberSeats] = sitDown(
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