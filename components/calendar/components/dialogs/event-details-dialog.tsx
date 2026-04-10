"use client";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Calendar,
  Clock,
  Text,
  User,
  Loader2,
  ShoppingBag,
  UserRound,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditEventDialog } from "@/components/calendar/components/dialogs/edit-event-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEventDetails } from "@/components/calendar/hooks/useEventDetails";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

import type { IEvent } from "@/components/calendar/interfaces";
import { IAppointmentDetails } from "@/lib/api/types/appointments";
import { ReactNode, useState } from "react";

export function EventDetailsDialog({
  event,
  children,
}: {
  event: IEvent;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { event: detailedEvent, isLoading } = useEventDetails(event.id, isOpen);

  const displayEvent = (detailedEvent ||
    event) as unknown as IAppointmentDetails;
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);

  return (
    <>
      <Dialog onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {event.title}
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex h-60 items-center justify-center">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid gap-6 py-4">
              {/* Client & Barber Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
                  <User className="mt-1 size-4 shrink-0 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase text-muted-foreground">
                      Cliente
                    </p>
                    <p className="text-sm font-semibold">
                      {displayEvent.client?.name || "Cliente não identificado"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
                  <UserRound className="mt-1 size-4 shrink-0 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase text-muted-foreground">
                      Responsável
                    </p>
                    <p className="text-sm font-semibold">
                      {displayEvent.barber?.name || "Não atribuído"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date and Time Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Data</span>
                  </div>
                  <span className="text-sm font-medium">
                    {format(startDate, "PPP", { locale: ptBR })}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Horário
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {format(startDate, "HH:mm", { locale: ptBR })} -{" "}
                    {format(endDate, "HH:mm", { locale: ptBR })}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="size-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Serviços</p>
                </div>
                <ScrollArea className="h-auto max-h-[200px] rounded-md border p-4">
                  <div className="grid gap-3">
                    {displayEvent.items?.map((item, idx: number) => (
                      <Card
                        key={idx}
                        className="p-0 overflow-hidden rounded-2xl group"
                      >
                        <div className="flex">
                          {item.catalogItem?.image ? (
                            <div className="w-20 h-20 overflow-hidden shrink-0">
                              <Image
                                width={80}
                                height={80}
                                src={item.catalogItem.image}
                                alt={item.catalogItem.name || "Serviço"}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-20 bg-muted/50 flex items-center justify-center shrink-0">
                              <Tag className="w-6 h-6 text-muted-foreground/30" />
                            </div>
                          )}

                          <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                            <div>
                              <h3 className="font-semibold text-sm leading-tight line-clamp-1">
                                {item.catalogItem?.name || "Serviço"}
                              </h3>

                              {item.catalogItem?.description && (
                                <p className="text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed">
                                  {item.catalogItem.description}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              {item.catalogItem?.duration ? (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  {item.catalogItem.duration} min
                                </span>
                              ) : (
                                <span />
                              )}

                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-primary">
                                  {item.catalogItem?.price
                                    ? formatCurrency(
                                        Number(item.catalogItem.price),
                                      )
                                    : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {(!displayEvent.items ||
                      displayEvent.items.length === 0) && (
                      <p className="text-xs text-muted-foreground text-center py-4">
                        Nenhum serviço selecionado
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Text className="size-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Observações</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed rounded-md bg-muted/20 p-2">
                  {displayEvent.notes || "Sem observações adicionais."}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            {/* <EditEventDialog event={displayEvent}>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Editar Agendamento
              </Button>
            </EditEventDialog> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
