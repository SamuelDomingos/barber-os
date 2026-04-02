"use client";

import { useState } from "react";
import { CatalogItemType } from "@/generated/client";
import { Clock, Tag, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/cartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

const CatalogCard = ({
  item,
}: {
  item: {
    image: string | null;
    id: string;
    name: string;
    type: CatalogItemType;
    description: string | null;
    price: number;
    duration: number | null;
    category: string | null;
  };
}) => {
  const [open, setOpen] = useState(false);
  const { add, items } = useCart();
  const alreadyAdded = items.some((i) => i.id === item.id);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="sm:max-w-md p-0 overflow-hidden rounded-2xl cursor-pointer group hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
      >
        {item.image ? (
          <div className="w-full h-52 overflow-hidden">
            <Image
              width={1280}
              height={720}
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-full h-32 bg-muted/50 flex items-center justify-center">
            <Tag className="w-10 h-10 text-muted-foreground/30" />
          </div>
        )}

        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm leading-tight line-clamp-1">
                {item.name}
              </h3>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-0.5" />
            </div>
            {item.description && (
              <p className="text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {item.duration && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {item.duration} min
                </span>
              )}
            </div>
            <span className="text-sm font-bold text-primary">
              {formatCurrency(Number(item.price))}
            </span>
          </div>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl">
          {item.image ? (
            <div className="w-full h-52 overflow-hidden">
              <Image
                width={1280}
                height={720}
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-32 bg-muted/50 flex items-center justify-center">
              <Tag className="w-10 h-10 text-muted-foreground/30" />
            </div>
          )}

          <div className="p-6 space-y-4">
            <DialogHeader>
              <div className="flex items-start justify-between gap-3">
                <DialogTitle className="text-xl font-bold leading-tight">
                  {item.name}
                </DialogTitle>
                <span className="text-xl font-bold text-primary whitespace-nowrap">
                  {formatCurrency(Number(item.price))}
                </span>
              </div>
            </DialogHeader>

            <div className="flex flex-wrap gap-2">
              {item.duration && (
                <Badge variant="secondary" className="gap-1">
                  <Clock className="w-3 h-3" />
                  {item.duration} min
                </Badge>
              )}
              {item.category && (
                <Badge variant="outline" className="gap-1">
                  <Tag className="w-3 h-3" />
                  {item.category}
                </Badge>
              )}
              {item.type && (
                <Badge variant="outline">
                  {item.type === "SERVICE"
                    ? "Serviço"
                    : item.type === "PRODUCT"
                      ? "Produto"
                      : "Pacote"}
                </Badge>
              )}
            </div>

            {item.description && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            )}

            <Button
              className="w-full"
              variant={alreadyAdded ? "secondary" : "default"}
              disabled={alreadyAdded}
              onClick={() => add(item)}
            >
              {alreadyAdded ? "Adicionado" : "Adicionar ao agendamento"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CatalogCard;
