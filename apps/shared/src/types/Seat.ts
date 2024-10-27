import type { Overwrite } from "./utility.js";

export type Category = "normal" | "fixed" | "conference";

export const seat = ["id", "category", "floor", "lat", "lng"] as const;

export type Seat = Overwrite<
  { [key in (typeof seat)[number]]: string },
  {
    category: Category;
    floor: number;
    lat: number;
    lng: number;
  }
>;

export type Seats = {
  [key: string]: Seat;
};
