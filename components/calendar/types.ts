import { CatalogItemType } from "@/generated/enums";
import { Decimal } from "@prisma/client/runtime/client";

export type TCalendarView = "day" | "week" | "month" | "year" | "agenda";
export type TEventColor =
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "orange"
  | "gray";
export type TBadgeVariant = "dot" | "colored" | "mixed";
export type TWorkingHours = { [key: number]: { from: number; to: number } };
export type TVisibleHours = { from: number; to: number };

export type Barber = {
  id: string;
  name: string;
  avatar: string | null;
};

export type ConfigData = {
  config: {
    autoAdjustVisibleHours: boolean;
    visibleStartMinutes: number | null;
    visibleEndMinutes: number | null;
  };
  workingHours: {
    dayOfWeek: number;
    startMinutes: number;
    endMinutes: number;
    isOpen: boolean;
  }[];
} | null;

export type TAppointment = {
  id: string;
  date: Date;
  status: string;
  client: {
    id: string;
    name: string;
    avatar: string | null;
  };
  barber: Barber | null;
  items: {
    catalogItem: {
      id: string;
      name: string;
      price: number;
      duration: number | null;
      image: string | null;
      type: CatalogItemType;
      category: string | null;
    };
  }[];
};
