import { memberSeat, leaveSeat, sitDown } from "@apps/shared";
import { properties } from "../constants/index.js";
import { putCache } from "../utils/cache.js";
import { getEmail } from "./getEmail.js";
import { getMemberSeats, getSeats } from "./records.js";

export const move = (type: "leaveSeat" | "sitDown", seatId: string) => {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  const ss = SpreadsheetApp.openById(properties.SS_ID);
  const memberSeatsSheet = ss.getSheetByName("memberSeats");
  if (!memberSeatsSheet) return;

  const email = getEmail();
  const memberSeats = getMemberSeats();

  switch (type) {
    case "leaveSeat": {
      const { newMemberSeats, deletionIndices } = leaveSeat(
        email,
        seatId,
        memberSeats,
      );
      for (const index of deletionIndices) {
        memberSeatsSheet.deleteRow(index + 2);
      }
      putCache("memberSeats", newMemberSeats);
      break;
    }
    case "sitDown": {
      const seats = getSeats();
      const { newMemberSeats, deletionIndices, newMemberSeat } = sitDown(
        email,
        seatId,
        memberSeats,
        seats,
      );
      for (const index of deletionIndices) {
        memberSeatsSheet.deleteRow(index + 2);
      }
      memberSeatsSheet.appendRow(
        memberSeat.map((column) => newMemberSeat[column]),
      );
      putCache("memberSeats", newMemberSeats);
      break;
    }
  }

  lock.releaseLock();
};
