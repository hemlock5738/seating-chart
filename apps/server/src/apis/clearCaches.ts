import { sheetNames } from "@apps/shared";
import { removeCache } from "../utils/cache.js";

export function clearCaches() {
  for (const sheetName of sheetNames) {
    removeCache(sheetName);
  }
}
