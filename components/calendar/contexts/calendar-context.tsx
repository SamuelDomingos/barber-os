"use client";

import { createContext, useContext, useState, useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import type {
  Barber,
  ConfigData,
  TBadgeVariant,
  TVisibleHours,
  TWorkingHours,
} from "@/components/calendar/types";
import { IEvent } from "../interfaces";

interface ICalendarContext {
  selectedDate: Date;
  setSelectedDate: (date: Date | undefined) => void;
  selectedUserId: Barber["id"] | "all";
  setSelectedUserId: (userId: Barber["id"] | "all") => void;
  badgeVariant: TBadgeVariant;
  setBadgeVariant: (variant: TBadgeVariant) => void;
  users: Barber[];
  configData: ConfigData;
  workingHours: TWorkingHours;
  visibleHours: TVisibleHours;
  events: IEvent[];
  setLocalEvents: Dispatch<SetStateAction<IEvent[]>>;
}

const CalendarContext = createContext({} as ICalendarContext);

const DEFAULT_WORKING_HOURS: TWorkingHours = {
  0: { from: 0, to: 0 },
  1: { from: 8, to: 17 },
  2: { from: 8, to: 17 },
  3: { from: 8, to: 17 },
  4: { from: 8, to: 17 },
  5: { from: 8, to: 17 },
  6: { from: 8, to: 12 },
};

const DEFAULT_VISIBLE_HOURS: TVisibleHours = { from: 7, to: 18 };

export function CalendarProvider({
  children,
  users,
  events,
  configData,
}: {
  children: React.ReactNode;
  users: Barber[];
  events: IEvent[];
  configData: ConfigData;
}) {
  const workingHours = useMemo<TWorkingHours>(() => {
    if (!configData) return DEFAULT_WORKING_HOURS;

    return Object.fromEntries(
      configData.workingHours.map((day) => [
        day.dayOfWeek,
        {
          from: day.isOpen ? Math.floor(day.startMinutes / 60) : 0,
          to: day.isOpen ? Math.floor(day.endMinutes / 60) : 0,
        },
      ]),
    );
  }, [configData]);

  const visibleHours = useMemo<TVisibleHours>(() => {
    if (!configData || configData.config.autoAdjustVisibleHours)
      return DEFAULT_VISIBLE_HOURS;

    return {
      from: Math.floor(
        (configData.config.visibleStartMinutes ??
          DEFAULT_VISIBLE_HOURS.from * 60) / 60,
      ),
      to: Math.floor(
        (configData.config.visibleEndMinutes ?? DEFAULT_VISIBLE_HOURS.to * 60) /
          60,
      ),
    };
  }, [configData]);

  const [badgeVariant, setBadgeVariant] = useState<TBadgeVariant>("colored");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUserId, setSelectedUserId] = useState<Barber["id"] | "all">(
    "all",
  );
  const [localEvents, setLocalEvents] = useState<IEvent[]>(events);

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };
  

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate: handleSelectDate,
        selectedUserId,
        setSelectedUserId,
        badgeVariant,
        setBadgeVariant,
        users,
        configData,
        workingHours,
        visibleHours,
        events: localEvents,
        setLocalEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within a CalendarProvider.");
  return context;
}
