import type { Color } from "../types/Color";
import type { Category } from "@apps/shared";

export const categoryColor: Record<Category, Color> = {
  normal: "blue",
  fixed: "green",
  conference: "red",
};

export const colorHue: Record<Color, string> = {
  blue: "hue-rotate-0",
  red: "hue-rotate-[120deg]",
  green: "hue-rotate-[240deg]",
};
