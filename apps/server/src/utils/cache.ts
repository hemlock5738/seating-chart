import type { SheetName } from "@apps/shared";
import { sizePerKeys } from "../constants/index.js";

export const getCache = <T, U extends SheetName>(key: U): T[] => {
  const size = Number(CacheService.getDocumentCache()?.get(key) ?? -1);
  const sizePerKey = sizePerKeys[key];
  const count = (size + sizePerKey - 1) / sizePerKey;
  const values: T[] = [];
  for (let i = 0; i < count; i++) {
    const pKey = `${key}${i}`;
    const pRecords = CacheService.getDocumentCache()?.get(pKey) ?? "[]";
    values.push(...JSON.parse(pRecords));
  }
  return values;
};

export const putCache = (key: SheetName, values: unknown[]) => {
  const sizePerKey = sizePerKeys[key];
  const count = (values.length + sizePerKey - 1) / sizePerKey;
  CacheService.getDocumentCache()?.put(key, String(values.length));
  for (let i = 0; i < count; i++) {
    const pKey = `${key}${i}`;
    const pRecords = JSON.stringify(
      values.slice(i * sizePerKey, (i + 1) * sizePerKey),
    );
    CacheService.getDocumentCache()?.put(pKey, pRecords);
  }
};

export const removeCache = (key: SheetName) => {
  CacheService.getDocumentCache()?.remove(key);
};
