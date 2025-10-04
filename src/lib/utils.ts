import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

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

const SALT_ROUND = 10;
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUND);
};

const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { cn, toStringSafe, toNumberSafe, hashPassword, comparePassword };
