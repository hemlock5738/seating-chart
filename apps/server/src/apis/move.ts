import { type MemberSeat, type Seat, memberSeat } from "@apps/shared";
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
  let filter: (memberSeat: MemberSeat) => boolean;

  switch (type) {
    case "leaveSeat": {
      filter = (memberSeat: MemberSeat) =>
        memberSeat.email === email && memberSeat.seatId === seatId;
      const deletionMemberSeats = memberSeats
        .map((memberSeat, i) => ({ index: i, ...memberSeat }))
        .filter((memberSeat) => filter(memberSeat));
      for (const memberSeat of deletionMemberSeats) {
        memberSeatsSheet.deleteRow(memberSeat.index + 2);
      }
      break;
    }
    case "sitDown": {
      const seats = getSeats();
      filter = (memberSeat: MemberSeat) =>
        memberSeat.email === email &&
        (isConferenceRoom(seats[seatId])
          ? isConferenceRoom(seats[memberSeat.seatId])
          : !isConferenceRoom(seats[memberSeat.seatId]));
      const isConferenceRoom = (seat: Seat) => seat.category === "conference";
      const deletionMemberSeats = memberSeats
        .map((memberSeat, i) => ({ index: i, ...memberSeat }))
        .filter((memberSeat) => filter(memberSeat));
      for (const memberSeat of deletionMemberSeats) {
        memberSeatsSheet.deleteRow(memberSeat.index + 2);
      }
      const newRecord = { email, seatId };
      memberSeatsSheet.appendRow(memberSeat.map((column) => newRecord[column]));
      break;
    }
  }

  const newMemberSeats = memberSeats.filter(
    (memberSeat) => !filter(memberSeat),
  );
  putCache("memberSeats", newMemberSeats);

  lock.releaseLock();
};
