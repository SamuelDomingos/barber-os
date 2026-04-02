"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CatalogItem } from "@/lib/api/types/catalog";
import FormCatalog from "./formCatalog";

const CatalogDialog = ({
  data,
  isEditing,
  open,
  onOpenChange,
  trigger,
}: {
  data?: CatalogItem;
  isEditing?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
}) => {

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? `Editar` : `Novo`}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Atualize as informações" : "Preencha as informações"}
          </DialogDescription>
        </DialogHeader>
        <FormCatalog
          data={data}
          isEditing={isEditing}
          onSuccess={() => {
            onOpenChange
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CatalogDialog;
