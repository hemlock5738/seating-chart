export type Category = "normal" | "fixed" | "conference";

export const seat = ["id", "category", "floor", "lat", "lng"] as const;

export type Seat = {
  [key in (typeof seat)[number]]: key extends "category" ? Category : string;
};

export type Seats = {
  [key: string]: Seat;
};
