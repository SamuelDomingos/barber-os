import { format } from "date-fns";

import { useDisclosure } from "@/hooks/use-disclosure";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import type { ButtonHTMLAttributes } from "react";
import DatePicker from "./date-picker";
import { ptBR } from "date-fns/locale";
import { CalendarProps } from "react-aria-components";

type TProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onSelect" | "value"
> & {
  onSelect: (value: Date | undefined) => void;
  value?: Date | undefined;
  placeholder: string;
  labelVariant?: "P" | "PP" | "PPP";
  calendarDisabled?: CalendarProps["disabled"];
};

function SingleDayPicker({
  id,
  onSelect,
  className,
  placeholder,
  labelVariant = "PPP",
  value,
  calendarDisabled,
  ...props
}: TProps) {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const handleSelect = (date: Date | undefined) => {
    onSelect(date);
    onClose();
  };

  return (
    <Popover open={isOpen} onOpenChange={onToggle} modal>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            "group relative h-9 w-full justify-start whitespace-nowrap px-3 py-2 font-normal hover:bg-inherit",
            className,
          )}
          {...props}
        >
          {value && (
            <span>{format(value, labelVariant, { locale: ptBR })}</span>
          )}
          {!value && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="center" className="w-fit p-0">
        <DatePicker selected={value} onSelect={handleSelect} disabled={calendarDisabled} />
      </PopoverContent>
    </Popover>
  );
}

export { SingleDayPicker };
