"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/contexts/cartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAvailableSlots } from "@/hooks/useAvailableSlots";
import { ConfigTime } from "../types/configTime";
import {
  BookingFormValues,
  bookingSchema,
} from "../schema/formAppointmentClient";
import { useFetch } from "@/hooks/useFetch";
import { postAppointments } from "@/lib/api/appointments";

const useAppointmentClient = ({ configTime }: { configTime: ConfigTime }) => {
  const { items, slug, remove } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      barberId: "",
      date: undefined,
      time: undefined,
    },
  });

  const selectedDate = form.watch("date");

  const configData = {
    config: { slotInterval: configTime.slotInterval },
    workingHours: configTime.workingHours,
  };

  const { slots } = useAvailableSlots({ selectedDate, configData });

  const total = items.reduce((acc, item) => acc + Number(item.price), 0);

  const { execute } = useFetch(postAppointments, {
    successMessage: "Agendamento realizado com sucesso!",
    errorMessage: "Erro ao agendar.",
  });

  const handleConfirm = form.handleSubmit(async (values) => {
    if (!values.date || !values.time) return;

    const { hour, minute } = values.time;

    const dateTime = new Date(values.date);
    dateTime.setHours(hour, minute, 0, 0);

    await execute({
      origin: "client",
      barbershopId: slug,
      color: "blue",
      barberId: values.barberId,
      date: dateTime.toISOString(),
      items: items.map((item) => ({
        catalogItemId: item.id,
      })),
      clientId: session?.user?.id,
    });

    form.reset();
    router.push(`/${slug}`);
  });

  return {
    form,
    items,
    slug,
    remove,
    total,
    slots,
    selectedDate,
    handleConfirm,
    session,
  };
};

export default useAppointmentClient;
