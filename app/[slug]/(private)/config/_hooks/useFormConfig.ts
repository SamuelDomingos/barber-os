import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ConfigFormValues,
  configSchema,
  defaultValues,
} from "../_schemas/configSchema";
import { useFetch } from "@/hooks/useFetch";
import {
  postConfigAppointments,
  putConfigAppointments,
} from "@/lib/api/configAppointments";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { ConfigAppointmentBarber, WorkingHours } from "@/generated/client";

const useFormConfig = (initialData?: {
  config: ConfigAppointmentBarber;
  workingHours: WorkingHours[];
}) => {
  const { data: session } = useSession();
  const barbershopId = session?.user?.barbershopId;

  const isEditing = !!initialData;

  const form = useForm<ConfigFormValues>({
    resolver: zodResolver(configSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (!initialData) return;

    form.reset({
      slotInterval:
        initialData.config.slotInterval ?? defaultValues.slotInterval,
      autoAdjustVisibleHours:
        initialData.config.autoAdjustVisibleHours ??
        defaultValues.autoAdjustVisibleHours,
      visibleStartMinutes: initialData.config.visibleStartMinutes ?? null,
      visibleEndMinutes: initialData.config.visibleEndMinutes ?? null,
      workingDays: initialData.workingHours.map((wh) => ({
        dayOfWeek: wh.dayOfWeek,
        isOpen: wh.isOpen ?? false,
        startMinutes: wh.startMinutes,
        endMinutes: wh.endMinutes,
      })),
    });
  }, [initialData]);

  const { execute: post } = useFetch(postConfigAppointments, {
    auto: false,
    successMessage: "Configurações de agenda criadas com sucesso",
  });

  const { execute: put } = useFetch(putConfigAppointments, {
    auto: false,
    successMessage: "Configurações de agenda atualizadas com sucesso",
  });

  const onSubmit = async (data: ConfigFormValues) => {
    if (!barbershopId) return;

    const payload = {
      barbershopId,
      config: {
        slotInterval: data.slotInterval,
        autoAdjustVisibleHours: data.autoAdjustVisibleHours,
        visibleStartMinutes: data.visibleStartMinutes,
        visibleEndMinutes: data.visibleEndMinutes,
        barbershop: { connect: { id: barbershopId } },
      },
      workingHours: data.workingDays.map((day) => ({
        dayOfWeek: day.dayOfWeek,
        isOpen: day.isOpen,
        startMinutes: day.startMinutes,
        endMinutes: day.endMinutes,
        barbershop: { connect: { id: barbershopId } },
      })),
    };

    if (isEditing) {
      await put(payload);
    } else {
      await post(payload);
    }
  };

  const onCancel = () => form.reset(defaultValues);

  return {
    form,
    onSubmit,
    onCancel,
  };
};

export default useFormConfig;
