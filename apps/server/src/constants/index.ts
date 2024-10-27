import type { SheetName } from "@apps/shared";

export const properties = {
  SS_ID: PropertiesService.getScriptProperties().getProperty("SS_ID") as string,
};

export const sizePerKeys: Record<SheetName, number> = {
  members: 500,
  memberSeats: 1000,
  seats: 100,
};
