import { WorkingHours } from "@/generated/client";

export type ConfigTime = {
  workingHours: Pick<
    WorkingHours,
    "dayOfWeek" | "startMinutes" | "endMinutes" | "isOpen"
  >[];
  slotInterval: number;
};