export const memberSeat = ["email", "seatId"] as const;

export type MemberSeat = {
  [key in (typeof memberSeat)[number]]: string;
};

export type MemberSeats = MemberSeat[];
