"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock, Tag, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import useAppointmentClient from "./hooks/useAppointmentClient";
import { ConfigTime } from "./types/configTime";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComboboxPopover } from "@/components/ui/comboboxPopover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

const AppointmentsDrawer = ({
  configTime,
  barbers,
}: {
  configTime: ConfigTime;
  barbers: { id: string; name: string; avatar: string | null }[];
}) => {
  const {
    items,
    slug,
    remove,
    total,
    handleConfirm,
    form,
    slots,
    selectedDate,
  } = useAppointmentClient({ configTime });

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9 relative">
          <CalendarDays className="w-4 h-4" />
          {items.length > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {items.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-full top-0 right-0 left-auto mt-0 w-80 rounded-l-2xl rounded-r-none flex flex-col">
        <DrawerHeader className="border-b pb-4">
          <DrawerTitle className="text-base font-semibold">
            Agendamentos
          </DrawerTitle>
          {slug && <p className="text-xs text-muted-foreground">{slug}</p>}
        </DrawerHeader>

        <Form {...form}>
          <form className="flex flex-col h-full">
            {/* LISTA */}
            <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
                  <CalendarDays className="w-8 h-8 opacity-30" />
                  <p className="text-sm">Nenhum serviço adicionado</p>
                </div>
              ) : (
                <ScrollArea className="flex-1 rounded-md border p-4">
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      className="p-0 overflow-hidden rounded-2xl group"
                    >
                      <div className="flex">
                        {item.image ? (
                          <div className="w-24 h-24 overflow-hidden shrink-0">
                            <Image
                              width={1200}
                              height={720}
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 bg-muted/50 flex items-center justify-center shrink-0">
                            <Tag className="w-6 h-6 text-muted-foreground/30" />
                          </div>
                        )}

                        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                          <div>
                            <h3 className="font-semibold text-sm leading-tight line-clamp-1">
                              {item.name}
                            </h3>

                            {item.description && (
                              <p className="text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {item.duration ? (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {item.duration} min
                              </span>
                            ) : (
                              <span />
                            )}

                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-primary">
                                {formatCurrency(Number(item.price))}
                              </span>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-6 text-muted-foreground hover:text-destructive"
                                onClick={() => remove(item.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </ScrollArea>
              )}
            </div>

            <div className="px-4 pb-2 mt-2 mb-4">
              <FormField
                control={form.control}
                name="barberId"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Preferencia de barbeiro? (opcional)</FormLabel>
                    <ComboboxPopover
                      options={
                        barbers?.map((u) => ({
                          label: u.name,
                          value: u.id,
                          avatar: u.avatar || undefined,
                        })) ?? []
                      }
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.invalid}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="px-4 pb-4 flex flex-col gap-3">
              <FormField
                control={form.control}
                name="date"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Data de agendamento</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date as Date);
                          form.setValue("time", undefined as any);
                        }}
                        disabled={{ before: new Date() }}
                        data-invalid={fieldState.invalid}
                        locale={ptBR}
                        className="rounded-lg border mx-auto"
                        initialFocus
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horários disponiveis</FormLabel>

                    {slots.length === 0 ? (
                      <p className="text-sm text-muted-foreground pt-2">
                        {selectedDate
                          ? "Nenhum horário disponível para este dia."
                          : "Selecione uma data primeiro."}
                      </p>
                    ) : (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {slots.map((slot) => {
                          const isSelected =
                            field.value?.hour === slot.value.hour &&
                            field.value?.minute === slot.value.minute;

                          return (
                            <button
                              type="button"
                              key={slot.label}
                              onClick={() => field.onChange(slot.value)}
                              className={`min-w-[70px] px-3 py-2 rounded-md text-sm border transition ${
                                isSelected
                                  ? "bg-primary text-white border-primary"
                                  : "bg-background hover:bg-muted"
                              }`}
                            >
                              {slot.label}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* FOOTER */}
            {items.length > 0 && (
              <DrawerFooter className="border-t pt-4 gap-2">
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={handleConfirm}
                >
                  Confirmar agendamento
                </Button>
              </DrawerFooter>
            )}
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default AppointmentsDrawer;
