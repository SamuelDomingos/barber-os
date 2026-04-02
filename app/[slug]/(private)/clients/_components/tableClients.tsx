"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users } from "lucide-react";
import { avatarColors } from "../../dashboard/_libs/varients";
import AppPagination from "@/components/pagination/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import useSearch from "@/hooks/use-Search";

const TableClients = ({
  clients,
  isLoading,
  page,
  search,
  total,
}: {
  clients: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    active: boolean;
  }[];
  isLoading?: boolean;
  page: number;
  search: string;
  total: number;
}) => {
  const { input, setInput } = useSearch(search);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm font-medium">Lista de clientes</span>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Buscar por nome ou email..."
              className="w-56 h-8 text-sm"
              defaultValue={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-3.5 w-28" />
                        <Skeleton className="h-3 w-36" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Users size={32} strokeWidth={1.5} />
                    <p className="text-sm">Nenhum cliente encontrado</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              clients.map((c) => (
                <TableRow key={c.id} className="cursor-pointer">
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={c.avatar ?? undefined} />
                        <AvatarFallback
                          className={`text-xs font-medium ${avatarColors[c.name]}`}
                        >
                          {getInitials(c.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">{c.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{c.phone ?? "—"}</TableCell>
                  <TableCell className="text-sm">
                    {c.active ? (
                      <span className="text-xs bg-green-50 text-green-800 px-2.5 py-1 rounded-full">
                        Ativo
                      </span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                        Inativo
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <span className="text-xs text-muted-foreground">
            Mostrando {Math.min((page - 1) * 10 + 1, total)}–
            {Math.min(page * 10, total)} de {total} clientes
          </span>
          <AppPagination total={total} limit={10} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TableClients;
