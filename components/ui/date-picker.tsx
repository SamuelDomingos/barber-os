"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { CalendarProps } from "react-aria-components";

interface DatePickerProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  disabled?: CalendarProps["disabled"];
}

const DatePicker = ({ selected, onSelect, disabled }: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={(date) => {
        onSelect(date);
        setOpen(false);
      }}
      disabled={disabled}
      locale={ptBR}
      initialFocus
    />
  );
};

export default DatePicker;
