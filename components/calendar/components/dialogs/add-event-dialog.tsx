"use client";

import { useDisclosure } from "@/hooks/use-disclosure";
import { useCalendar } from "@/components/calendar/contexts/calendar-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SingleDayPicker } from "@/components/ui/single-day-picker";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import useCreateEvent from "../../hooks/use-create-event";
import { ComboboxPopover } from "@/components/ui/comboboxPopover";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import useListClients from "../../hooks/useListClients";
import useListServices from "../../hooks/useListServices";

export function AddEventDialog({
  children,
  startDate,
  startTime,
}: {
  children: React.ReactNode;
  startDate?: Date;
  startTime?: { hour: number; minute: number };
}) {
  const { users } = useCalendar();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const { form, onSubmit, toggleService, isServiceSelected, slots } =
    useCreateEvent({
      onClose,
      startDate,
      startTime,
    });

  const { data, setSearch, isLoading } = useListServices();
  const {
    data: clients,
    setSearch: setSearchClient,
    isLoading: isLoadingClients,
  } = useListClients();

  const selectedDate = form.watch("date");

  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Criar Agendamento</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="event-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-2"
          >
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="barberId"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Barbeiro</FormLabel>
                    <ComboboxPopover
                      options={users.map((u) => ({
                        label: u.name,
                        value: u.id,
                        avatar: u.avatar,
                      }))}
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.invalid}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientId"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <ComboboxPopover
                      options={clients?.map((u) => ({
                        label: u.name,
                        value: u.id,
                        avatar: u?.avatar,
                      }))}
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.invalid}
                      onSearch={setSearchClient}
                      isLoading={isLoadingClients}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-start gap-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field, fieldState }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <SingleDayPicker
                        value={field.value}
                        onSelect={(date) => {
                          field.onChange(date as Date);
                          form.setValue("time", undefined as any);
                        }}
                        calendarDisabled={{ before: new Date() }}
                        placeholder="Selecionar data"
                        data-invalid={fieldState.invalid}
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
                  <FormItem className="w-full">
                    <FormLabel>Horário</FormLabel>

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
                              className={`min-w-[70px] px-3 py-2 rounded-md text-sm border transition
                                ${
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

            <FormField
              control={form.control}
              name="items"
              render={({}) => (
                <FormItem>
                  <FormLabel>Serviços</FormLabel>
                  <input
                    placeholder="Buscar serviço..."
                    className="w-full border rounded px-2 py-1 text-sm"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <ScrollArea className="h-48 mt-2 border rounded-md p-2">
                    {isLoading && (
                      <p className="text-sm text-muted-foreground">
                        Carregando...
                      </p>
                    )}
                    {!isLoading && data?.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Nenhum serviço encontrado
                      </p>
                    )}
                    <div className="flex flex-col gap-2">
                      <ItemGroup>
                        {data?.map((service) => (
                          <Item
                            asChild
                            className={`bg-background ${isServiceSelected(form, service.id) ? "bg-primary/10 border-primary" : "hover:bg-muted"}`}
                            key={service.id}
                            onClick={() => toggleService(form, service)}
                            variant="outline"
                          >
                            <a href="#">
                              <ItemMedia variant="image">
                                <Image
                                  src={service.image}
                                  alt={service.name}
                                  className="object-cover grayscale"
                                  height={32}
                                  width={32}
                                />
                              </ItemMedia>
                              <ItemContent>
                                <ItemTitle className="line-clamp-1">
                                  {service.name} - {service.duration} min
                                </ItemTitle>
                                <ItemDescription>
                                  {service.description}
                                </ItemDescription>
                              </ItemContent>
                              <ItemContent className="flex-none text-center">
                                <ItemDescription>
                                  R$ {service.price}
                                </ItemDescription>
                              </ItemContent>
                            </a>
                          </Item>
                        ))}
                      </ItemGroup>
                    </div>
                  </ScrollArea>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Cor de Marcação</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger data-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Selecionar cor" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { value: "blue", label: "Azul", bg: "bg-blue-600" },
                          {
                            value: "green",
                            label: "Verde",
                            bg: "bg-green-600",
                          },
                          { value: "red", label: "Vermelho", bg: "bg-red-600" },
                          {
                            value: "yellow",
                            label: "Amarelo",
                            bg: "bg-yellow-600",
                          },
                          {
                            value: "purple",
                            label: "Roxo",
                            bg: "bg-purple-600",
                          },
                          {
                            value: "orange",
                            label: "Laranja",
                            bg: "bg-orange-600",
                          },
                          {
                            value: "gray",
                            label: "Cinza",
                            bg: "bg-neutral-600",
                          },
                        ].map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`size-3.5 rounded-full ${c.bg}`}
                              />
                              {c.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      data-invalid={fieldState.invalid}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button form="event-form" type="submit">
            Criar Agendamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
