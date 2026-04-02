import { TimeValue } from "react-aria-components";
import { Time } from "@internationalized/date";

export const minutesToTimeValue = (minutes: number): TimeValue =>
  new Time(Math.floor(minutes / 60), minutes % 60);

export const timeValueToMinutes = (value: TimeValue): number =>
  value.hour * 60 + value.minute;

export const minutesToTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};

export const generateTimeSlots = (slotInterval: number) => {
  const slots = [];

  for (let minutes = 0; minutes < 24 * 60; minutes += slotInterval) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    slots.push({
      label: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
      value: { hour, minute },
    });
  }

  return slots;
};

export const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
