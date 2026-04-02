import type { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  trigger: ReactNode;
  align?: "start" | "center" | "end";
};

const NotificationDropdown = ({ trigger, align = "end" }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-[380px] p-0" align={align}>
        <div className="border-b px-4 py-3 flex items-center justify-between">
          <span className="font-semibold text-sm">Notifications</span>

          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">
            8 New
          </span>
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          <div className="flex gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer border-b">
            <Avatar className="size-9">
              <AvatarImage src={"https://i.pravatar.cc/40?img=1"} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <p className="text-sm font-medium">Mark Bush</p>

              <p className="text-sm text-muted-foreground">New post</p>

              <span className="text-xs text-muted-foreground">12 minutes ago</span>
            </div>

            <div className="size-2 rounded-full bg-green-500 mt-2" />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
