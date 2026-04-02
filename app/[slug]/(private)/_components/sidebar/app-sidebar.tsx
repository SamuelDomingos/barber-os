"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Settings } from "lucide-react";
import Link from "next/link";
import useSidebar from "./hooks/useSidebar";
import { useSession } from "next-auth/react";

export function AppSidebar() {
  const { data } = useSession();
  const { pathname, buildHref, menuItems } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <span className="text-base font-medium">barber-os</span>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const fullHref = buildHref(item.href);
                  const isActive = pathname === fullHref;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={fullHref}>
                          <Icon size={16} />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {data?.user.role === "ADMIN" ? (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === buildHref("config")}
              >
                <Link href={buildHref("config")}>
                  <Settings size={16} />
                  <span>Configurações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      ) : (
        ""
      )}
    </Sidebar>
  );
}
