import type { SheetName } from "@apps/shared";
import { properties } from "../constants/index.js";
import { getCache, putCache } from "./cache.js";

export const getRecords = <T>(sheetName: SheetName): T[] => {
  const cache = getCache<T, typeof sheetName>(sheetName);
  if (cache.length > 0) return cache;
  const ss = SpreadsheetApp.openById(properties.SS_ID);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const [columnNames, ...values] = sheet.getDataRange().getValues();
  const records = values.map((vals) =>
    Object.fromEntries(
      columnNames.map((columnName, i) => [columnName, vals[i]]),
    ),
  );
  putCache(sheetName, records);
  return records;
};
