import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combina clsx + tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAmount(amount: string): number {
  return parseFloat(amount.replace(/[^0-9.-]+/g, ""));
}

export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

export function fromCents(amount: number): number {
  return amount / 100;
}