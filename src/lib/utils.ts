import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const toStringSafe = (value: string | number | null | undefined | unknown) => {
  return value === null ? "" : String(value);
};

const toNumberSafe = (value: string | number | null | undefined) => {
  if (value == null) return 0;
  if (typeof value === "number") return value;
  const parsed = Number(value);
  return isNaN(parsed) ? 0 : parsed;
};

export { cn, toStringSafe, toNumberSafe };
