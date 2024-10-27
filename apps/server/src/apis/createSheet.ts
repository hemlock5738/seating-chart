import { member, memberSeat, seat, sheetNames } from "@apps/shared";
import { isEditor } from "../utils/user.js";

const getParent = () => {
  const scriptId = ScriptApp.getScriptId();
  const file = DriveApp.getFileById(scriptId);
  const folder = file.getParents().next();
  return folder;
};

export function createSheet() {
  if (!isEditor()) {
    Logger.log("You don't have permission.");
    return;
  }
  const scheme = {
    seats: seat,
    members: member,
    memberSeats: memberSeat,
  };
  const ss = SpreadsheetApp.create("db");
  const defaultSheet = ss.getActiveSheet();
  for (const sheetName of sheetNames) {
    const sheet = ss.insertSheet();
    sheet.setName(sheetName);
    const columnNames = scheme[sheetName];
    sheet.getRange(1, 1, 1, columnNames.length).setValues([[...columnNames]]);
  }
  ss.deleteSheet(defaultSheet);
  DriveApp.getFileById(ss.getId()).moveTo(getParent());
  PropertiesService.getScriptProperties().setProperty("SS_ID", ss.getId());
}
