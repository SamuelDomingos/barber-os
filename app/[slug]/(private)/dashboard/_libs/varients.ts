export const badgeVariant: Record<string, "default" | "secondary" | "outline"> = {
  Confirmado: "default",
  Pendente: "secondary",
  "Em andamento": "outline",
};

export const avatarColors: Record<string, string> = {
  blue: "bg-blue-50 text-blue-800",
  teal: "bg-teal-50 text-teal-800",
  amber: "bg-amber-50 text-amber-800",
  pink: "bg-pink-50 text-pink-800",
};

export const dotColors: Record<string, string> = {
  green: "bg-green-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
};

export const gridCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export const statusVariant: Record<string, { badge: string; dot: string }> = {
  Ativo: { badge: "bg-green-50 text-green-800", dot: "bg-green-500" },
  "Em pausa": { badge: "bg-amber-50 text-amber-800", dot: "bg-amber-500" },
  Folga: { badge: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
};