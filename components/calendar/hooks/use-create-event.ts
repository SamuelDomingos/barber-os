"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { eventSchema, TEventFormData } from "../schemas";
import { useFetch } from "@/hooks/useFetch";
import { postAppointments } from "@/lib/api/appointments";
import { useEffect } from "react";
import { useCalendar } from "@/components/calendar/contexts/calendar-context";
import { useAvailableSlots } from "@/hooks/useAvailableSlots";

const useCreateEvent = ({
  onClose,
  startDate,
  startTime,
  barberId,
}: {
  onClose: () => void;
  startDate?: Date;
  startTime?: { hour: number; minute: number };
  barberId?: string;
}) => {
  const { data: session } = useSession();
  const barbershopId = session?.user?.barbershopId;
  const { configData } = useCalendar();

  const form = useForm<TEventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      clientId: "",
      barberId: barberId ?? "",
      date: startDate ?? new Date(),
      time: startTime ?? { hour: 9, minute: 0 },
      notes: "",
      color: "blue",
      items: [],
    },
  });

  const selectedDate = form.watch("date");

  const { slots } = useAvailableSlots({ selectedDate, configData });

  const { execute } = useFetch(postAppointments, {
    auto: false,
    successMessage: "Agendamento Criado com Sucesso!",
  });

  const onSubmit = async (values: TEventFormData) => {
    const date = new Date(values.date);
    date.setHours(values.time.hour, values.time.minute, 0, 0);

    await execute({
      date: date.toISOString(),
      notes: values.notes,
      color: values.color,
      clientId: values.clientId,
      barberId: values.barberId,
      barbershopId: barbershopId!,
      items: values.items,
    });

    form.reset();
    onClose();
  };

  const toggleService = (
    form: UseFormReturn<TEventFormData>,
    service: { id: string; price: number },
  ) => {
    const items = form.getValues("items");
    const exists = items.some((item) => item.catalogItemId === service.id);

    if (exists) {
      form.setValue(
        "items",
        items.filter((item) => item.catalogItemId !== service.id),
      );
    } else {
      form.setValue("items", [...items, { catalogItemId: service.id }]);
    }
  };

  const isServiceSelected = (
    form: UseFormReturn<TEventFormData>,
    serviceId: string,
  ) => form.getValues("items").some((item) => item.catalogItemId === serviceId);

  useEffect(() => {
    if (startDate || startTime) {
      form.reset({
        ...form.getValues(),
        date: startDate ?? form.getValues("date"),
        time: startTime ?? form.getValues("time"),
      });
    }
  }, [startDate, startTime]);

  return { form, onSubmit, toggleService, isServiceSelected, slots };
};

export default useCreateEvent;