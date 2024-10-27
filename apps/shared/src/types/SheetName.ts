export const sheetNames = ["seats", "members", "memberSeats"] as const;

export type SheetName = (typeof sheetNames)[number];
