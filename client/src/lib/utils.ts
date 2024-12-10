import type { CookieAttributes } from "../types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPriceInRange(price: number, range: string) {
  const [min, max] = range.split("-").map((str) => parseInt(str));
  return price >= min && price <= max;
}

export const getAllCategories = (items: string[]) => {
  const uniqueCategories = new Set(items);
  return Array.from(uniqueCategories);
};

// Set a cookie
export function setCookie(
  name: string,
  value: string,
  days?: number,
  path = "/",
) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=${path}`;
}

// Get a cookie by name
export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}
