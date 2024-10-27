import type {
  Member,
  MemberSeat,
  MemberSeats,
  Members,
  Seat,
  Seats,
} from "@apps/shared";
import { getRecords } from "../utils/getRecords.js";
import { objectify } from "../utils/objectify.js";

export function getSeats(): Seats {
  return objectify(getRecords<Seat>("seats"), "id");
}

export function getMembers(): Members {
  return objectify(getRecords<Member>("members"), "email");
}

export function getMemberSeats(): MemberSeats {
  return getRecords<MemberSeat>("memberSeats");
}
