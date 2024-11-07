import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPriceInRange(price: number, range: string) {
  const [min, max] = range.split("-").map((str) => parseInt(str));
  return price >= min && price <= max;
}
