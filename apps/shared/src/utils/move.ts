import type { MemberSeat, MemberSeats } from "../types/MemberSeat.js";
import type { Seat, Seats } from "../types/Seat.js";

export const leaveSeat = (
  email: string,
  seatId: string,
  memberSeats: MemberSeats,
) => {
  const filter = (memberSeat: MemberSeat) =>
    memberSeat.email === email && memberSeat.seatId === seatId;
  const newMemberSeats = memberSeats.filter(
    (memberSeat) => !filter(memberSeat),
  );
  const deletionIndices = memberSeats
    .map((memberSeat, i) => ({ index: i, ...memberSeat }))
    .filter((memberSeat) => filter(memberSeat))
    .map((memberSeat) => memberSeat.index);
  return { newMemberSeats, deletionIndices };
};

export const sitDown = (
  email: string,
  seatId: string,
  memberSeats: MemberSeats,
  seats: Seats,
) => {
  const isConferenceRoom = (seat: Seat) => {
    return seat.category === "conference";
  };
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
  return { newMemberSeats, deletionIndices, newMemberSeat };
};
