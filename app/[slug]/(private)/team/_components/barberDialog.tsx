import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormBarber from "./molecules/formBarber";

const BarberDialog = ({
  data,
  isEditing,
  open,
  setOpen,
  trigger,
}: {
  data?: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    active: boolean;
  };
  open: boolean;
  setOpen: (open: boolean) => void;
  isEditing?: boolean;
  trigger?: React.ReactNode;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" className="gap-1.5">
            <Plus size={14} />
            Cadastrar barbeiro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar barbeiro" : "Cadastrar barbeiro"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os dados do membro da equipe"
              : "Preencha os dados do novo membro da equipe"}
          </DialogDescription>
        </DialogHeader>
        <FormBarber
          data={data}
          isEditing={isEditing}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BarberDialog;
