import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const parseCurrency = (value: string) => {
  const numeric = value.replace(/\D/g, "");
  return Number(numeric) / 100;
};

export const getInitials = (name?: string | null): string => {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .filter((n) => n.length > 0)
    .map((n) => n[0].toUpperCase())
    .join("");
};

export const phoneMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
    .slice(0, 15);
};