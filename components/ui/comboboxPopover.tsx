import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { useState } from "react";
import { Spinner } from "./spinner";

type Option = {
  label: string;
  value: string;
  avatar?: string;
};

type ComboboxPopoverProps = {
  options: Option[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  error?: boolean;
  renderSelected?: (options: Option[]) => React.ReactNode;
  onSearch?: (value: string) => void;
  isLoading?: boolean;
};

export function ComboboxPopover({
  options,
  value,
  onChange,
  multiple = false,
  placeholder = "Selecionar...",
  searchPlaceholder = "Buscar...",
  emptyText = "Nenhum item encontrado",
  error,
  renderSelected,
  onSearch,
  isLoading,
}: ComboboxPopoverProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = !multiple
    ? options.find((opt) => opt.value === value)
    : undefined;

  const selectedOptions = multiple
    ? options.filter((opt) => (value as string[])?.includes(opt.value))
    : [];

  const toggleValue = (val: string) => {
    if (!multiple) {
      if (value === val) {
        onChange("");
      } else {
        onChange(val);
      }
      setOpen(false);
      return;
    }

    const current = (value as string[]) || [];

    if (current.includes(val)) {
      onChange(current.filter((v) => v !== val));
    } else {
      onChange([...current, val]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between font-normal",
            error && "border-destructive",
          )}
        >
          <div className="flex items-center gap-2 truncate">
            {multiple ? (
              selectedOptions.length > 0 ? (
                renderSelected ? (
                  renderSelected(selectedOptions)
                ) : (
                  <div className="flex items-center gap-1 flex-wrap max-w-full">
                    {selectedOptions.slice(0, 2).map((opt) => (
                      <div
                        key={opt.value}
                        className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs"
                      >
                        <Avatar className="size-4">
                          <AvatarImage src={opt.avatar} />
                          <AvatarFallback className="text-[10px]">
                            {opt.label[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate max-w-[80px]">
                          {opt.label}
                        </span>
                      </div>
                    ))}
                    {selectedOptions.length > 2 && (
                      <span className="text-xs text-muted-foreground flex items-center">
                        +{selectedOptions.length - 2}
                      </span>
                    )}
                  </div>
                )
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )
            ) : selectedOption ? (
              <>
                <Avatar className="size-5">
                  <AvatarImage src={selectedOption.avatar} />
                  <AvatarFallback className="text-xs">
                    {selectedOption.label[0]}
                  </AvatarFallback>
                </Avatar>
                <span>{selectedOption.label}</span>
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown size={14} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={!onSearch}>
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-8"
            onValueChange={onSearch}
          />
          <CommandList>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup>
                  {options.map((opt) => {
                    const isSelected = multiple
                      ? (value as string[])?.includes(opt.value)
                      : value === opt.value;

                    return (
                      <CommandItem
                        key={opt.value}
                        value={opt.label}
                        onSelect={() => toggleValue(opt.value)}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="size-5">
                            <AvatarImage src={opt.avatar} />
                            <AvatarFallback className="text-xs">
                              {opt.label[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span>{opt.label}</span>
                        </div>
                        <Check
                          size={14}
                          className={cn(
                            "ml-auto",
                            isSelected ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
