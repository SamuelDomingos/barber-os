"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Columns, Grid3x3, List, Plus, Grid2x2, CalendarRange } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserSelect } from "@/components/calendar/components/header/user-select";
import { TodayButton } from "@/components/calendar/components/header/today-button";
import { DateNavigator } from "@/components/calendar/components/header/date-navigator";
import { AddEventDialog } from "@/components/calendar/components/dialogs/add-event-dialog";

import type { IEvent } from "@/components/calendar/interfaces";
import type { TCalendarView } from "@/components/calendar/types";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

const viewButtons = [
  { view: "day", icon: List, label: "Dia" },
  { view: "week", icon: Columns, label: "Semana" },
  { view: "month", icon: Grid2x2, label: "Mês" },
  { view: "year", icon: Grid3x3, label: "Ano" },
  { view: "agenda", icon: CalendarRange, label: "Agenda" },
] as const;

export function CalendarHeader({ view, events }: IProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setView = (v: TCalendarView) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", v);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} events={events} />
      </div>

      <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center gap-1.5">
          <div className="inline-flex">
            {viewButtons.map((btn, i) => {
              const Icon = btn.icon;
              const isFirst = i === 0;
              const isLast = i === viewButtons.length - 1;
              return (
                <Button
                  key={btn.view}
                  aria-label={btn.label}
                  size="icon"
                  variant={view === btn.view ? "default" : "outline"}
                  className={`[&_svg]:size-5 ${isFirst ? "rounded-r-none" : isLast ? "-ml-px rounded-l-none" : "-ml-px rounded-none"}`}
                  onClick={() => setView(btn.view)}
                >
                  <Icon strokeWidth={1.8} />
                </Button>
              );
            })}
          </div>

          <UserSelect />
        </div>

        <AddEventDialog>
          <Button className="w-full sm:w-auto">
            <Plus />
            Criar Agendamento
          </Button>
        </AddEventDialog>
      </div>
    </div>
  );
}