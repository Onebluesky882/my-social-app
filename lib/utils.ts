import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function turnCutText(text: string, count: number) {
  return text.length > count ? text.slice(0, count) + "..." : text;
}
