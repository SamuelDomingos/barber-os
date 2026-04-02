"use client";

import { UserIcon, SettingsIcon, UsersIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProfileDropdown = ({
  align = "end",
  showLoginFallback = false,
}: {
  align?: "start" | "center" | "end";
  showLoginFallback?: boolean;
}) => {
  const { data: session, status } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const user = session?.user;

  if (showLoginFallback && status === "unauthenticated") {
    return (
    <Button size="sm" asChild className="rounded-full px-4 gap-2">
      <Link href={`${slug}/auth`}>
        <UserIcon className="size-3.5" />
        Entrar
      </Link>
    </Button>
    );
  }

  // carregando
  if (status === "loading") {
    return <div className="size-9.5 rounded-md bg-muted animate-pulse" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9.5">
          <Avatar className="size-9.5 rounded-md">
            <AvatarImage
              src={user?.avatar ?? undefined}
              alt={user?.name ?? ""}
            />
            <AvatarFallback>{getInitials(user?.name ?? "")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align={align}>
        <DropdownMenuLabel className="flex items-center gap-4 px-4 py-2.5 font-normal">
          <div className="relative">
            <Avatar className="size-10">
              <AvatarImage
                src={user?.avatar ?? undefined}
                alt={user?.name ?? ""}
              />
              <AvatarFallback>{getInitials(user?.name ?? "")}</AvatarFallback>
            </Avatar>
            <span className="ring-card absolute right-0 bottom-0 block size-2 rounded-full bg-green-600 ring-2" />
          </div>
          <div className="flex flex-1 flex-col items-start">
            <span className="text-foreground text-lg font-semibold">
              {user?.name}
            </span>
            <span className="text-muted-foreground text-base">
              {user?.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="px-4 py-2.5 text-base">
            <UserIcon className="text-foreground size-5" />
            <span>Minha conta</span>
          </DropdownMenuItem>
          {session?.user.role === "ADMIN" ? (
            <>
              <DropdownMenuItem className="px-4 py-2.5 text-base">
                <SettingsIcon className="text-foreground size-5" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <Link href={`/${slug}/team`}>
                <DropdownMenuItem className="px-4 py-2.5 text-base">
                  <UsersIcon className="text-foreground size-5" />
                  <span>Meu Time</span>
                </DropdownMenuItem>
              </Link>
            </>
          ) : (
            ""
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="px-4 py-2.5 text-base"
          onClick={() => signOut({ callbackUrl: "/auth" })}
        >
          <LogOutIcon className="size-5" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
