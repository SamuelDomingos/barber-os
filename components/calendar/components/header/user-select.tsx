"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { useCalendar } from "@/components/calendar/contexts/calendar-context";

export function UserSelect() {
  const { users, selectedUserId, setSelectedUserId } = useCalendar();
  const [open, setOpen] = useState(false);

  const selectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 md:w-48 justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            {selectedUserId === "all" ? (
              <>
                <AvatarGroup max={2}>
                  {users.map((user) => (
                    <Avatar key={user.id} className="size-5">
                      <AvatarImage src={user.avatar ?? undefined} />
                      <AvatarFallback className="text-xs">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
                <span>Todos</span>
              </>
            ) : (
              <>
                <Avatar className="size-5">
                  <AvatarImage src={selectedUser?.avatar ?? undefined} />
                  <AvatarFallback className="text-xs">
                    {selectedUser?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{selectedUser?.name}</span>
              </>
            )}
          </div>
          <ChevronsUpDown size={14} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" align="end">
        <Command>
          <CommandInput placeholder="Buscar barbeiro..." className="h-8" />
          <CommandList>
            <CommandEmpty>Nenhum barbeiro encontrado</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="all"
                onSelect={() => { setSelectedUserId("all"); setOpen(false); }}
              >
                <div className="flex items-center gap-2">
                  <AvatarGroup max={2}>
                    {users.map((user) => (
                      <Avatar key={user.id} className="size-5">
                        <AvatarImage src={user.avatar ?? undefined} />
                        <AvatarFallback className="text-xs">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <span>Todos</span>
                </div>
                <Check
                  size={14}
                  className={cn("ml-auto", selectedUserId === "all" ? "opacity-100" : "opacity-0")}
                />
              </CommandItem>

              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  onSelect={() => { setSelectedUserId(user.id); setOpen(false); }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="size-5">
                      <AvatarImage src={user.avatar ?? undefined} />
                      <AvatarFallback className="text-xs">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{user.name}</span>
                  </div>
                  <Check
                    size={14}
                    className={cn("ml-auto", selectedUserId === user.id ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}