import { generateTimeSlots } from "@/helpers/time";
import { useMemo } from "react";

type WorkingHour = {
  dayOfWeek: number;
  isOpen: boolean;
  startMinutes: number;
  endMinutes: number;
};

type ConfigData = {
  config: { slotInterval: number };
  workingHours: WorkingHour[];
};

export const useAvailableSlots = ({
  selectedDate,
  configData,
}: {
  selectedDate?: Date;
  configData?: ConfigData | null;
}) => {
  const slots = useMemo(() => {
    const slotInterval = configData?.config.slotInterval ?? 15;
    const allSlots = generateTimeSlots(slotInterval);

    if (!selectedDate || !configData) return allSlots;

    const dayOfWeek = selectedDate.getDay();
    const workingDay = configData.workingHours.find(
      (wh) => wh.dayOfWeek === dayOfWeek,
    );

    if (!workingDay || !workingDay.isOpen) return [];

    const now = new Date();
    const isToday =
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate();

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return allSlots.filter((slot) => {
      const slotMinutes = slot.value.hour * 60 + slot.value.minute;

      const withinWorkingHours =
        slotMinutes >= workingDay.startMinutes &&
        slotMinutes < workingDay.endMinutes;

      const notInThePast = isToday ? slotMinutes > currentMinutes : true;

      return withinWorkingHours && notInThePast;
    });
  }, [selectedDate, configData]);

  return { slots };
};
