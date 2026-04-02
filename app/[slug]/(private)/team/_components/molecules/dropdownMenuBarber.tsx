"use client";

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
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import BarberDialog from "../barberDialog";
import { Button } from "@/components/ui/button";
import { deleteUserTeam } from "../../_services/serviceTeam";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const DropdownMenuBarber = ({
  data,
}: {
  data: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    active: boolean;
  };
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
          <MoreHorizontal size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <BarberDialog
            data={data}
            isEditing
            open={open}
            setOpen={setOpen}
            trigger={
              <button className="flex items-center gap-2 w-full text-sm">
                <Pencil size={14} />
                Editar
              </button>
            }
          />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              variant="destructive"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash2 size={14} />
              Deletar
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deseja realmente deletar?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. O barbeiro será desativado do
                sistema.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  try {
                    await deleteUserTeam(data.id);
                    router.refresh();
                  } catch {
                    toast.error("Erro ao deletar barbeiro");
                  }
                }}
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuBarber;
