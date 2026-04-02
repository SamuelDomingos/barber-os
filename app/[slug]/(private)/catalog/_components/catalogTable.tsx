"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash2, ImageIcon } from "lucide-react";
import AppPagination from "@/components/pagination/pagination";
import { CatalogItem } from "@/lib/api/types/catalog";
import CatalogDialog from "./catalogDialog";
import { useState } from "react";
import { CatalogItemType } from "@/generated/enums";
import { formatCurrency } from "@/lib/utils";

const CatalogTable = ({
  type,
  data,
  total,
}: {
  type?: CatalogItemType;
  data: CatalogItem[];
  total: number;
}) => {
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Preço</TableHead>
            {(!type || type === "SERVICE") && <TableHead>Duração</TableHead>}
            {(!type || type === "PRODUCT") && <TableHead>Estoque</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-10 text-muted-foreground text-sm"
              >
                Nenhum item encontrado
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="w-9 h-9 rounded-md">
                      <AvatarImage src={item.image ?? undefined} />
                      <AvatarFallback className="rounded-md bg-muted">
                        <ImageIcon
                          size={14}
                          className="text-muted-foreground"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.name}</span>
                      <p className="text-sm text-muted-foreground">
                        {item.description ?? "—"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="default" className="text-xs font-normal">
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {formatCurrency(item.price)}
                </TableCell>
                {(!type || type === "SERVICE") && (
                  <TableCell className="text-sm">
                    {item.type === "SERVICE" ? `${item.duration} min` : "—"}
                  </TableCell>
                )}
                <TableCell>
                  <Badge
                    variant={item.active ? "default" : "secondary"}
                    className="text-xs font-normal"
                  >
                    {item.active ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem onClick={() => setEditingItem(item)}>
                        <Pencil size={13} />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            variant="destructive"
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash2 size={13} />
                            Excluir
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Deseja excluir?</AlertDialogTitle>
                            <AlertDialogDescription>
                              O item será desativado do catálogo.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction>Confirmar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <span className="text-xs text-muted-foreground">
          {total} itens encontrados
        </span>
        <AppPagination total={total} limit={10} />
      </div>

      {editingItem && (
        <CatalogDialog
          data={editingItem}
          isEditing
          open={!!editingItem}
          onOpenChange={(open) => {
            if (!open) setEditingItem(null);
          }}
          trigger={<span />}
        />
      )}
    </div>
  );
};

export default CatalogTable;
