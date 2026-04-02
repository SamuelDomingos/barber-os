"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ProfileDropdown from "@/components/blocks/dropdown-profile";
import NotificationDropdown from "@/components/blocks/dropdown-notification";
import { Bell } from "lucide-react";
import { ModeToggle } from "@/components/modeToggle";

const HeaderBarber = () => {
  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-2 sm:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="hidden !h-4 sm:block" />
          <div>
            <p>logo</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />

          <NotificationDropdown
            trigger={
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9.5 relative"
                >
                  <Bell />
                  <span className="ring-card absolute right-2 top-2 block size-2 rounded-full bg-green-600 ring-2" />
                </Button>
                {/* <Badge className="ring-card absolute right-0 bottom-0 block size-1 rounded-full bg-green-600 ring-2"></Badge> */}
              </div>
            }
          />

          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default HeaderBarber;
