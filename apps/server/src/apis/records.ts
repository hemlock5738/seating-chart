import type { Member, MemberSeat, Seat } from "@apps/shared";
import { getRecords } from "../utils/getRecords.js";
import { objectify } from "../utils/objectify.js";

export const getSeats = () => {
  return objectify(getRecords<Seat>("seats"), "id");
};

export const getMembers = () => {
  return objectify(getRecords<Member>("members"), "id");
};

export const getMemberSeats = () => {
  return getRecords<MemberSeat>("memberSeats");
};
