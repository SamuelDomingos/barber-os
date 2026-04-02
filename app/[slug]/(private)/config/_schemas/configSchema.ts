import z from "zod";

export const workingDaySchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    isOpen: z.boolean(),
    startMinutes: z.number().int().min(0).max(1439),
    endMinutes: z.number().int().min(0).max(1439),
  })
  .refine((day) => !day.isOpen || day.endMinutes > day.startMinutes, {
    message: "O horário de fim deve ser após o início.",
    path: ["endMinutes"],
  });

export const configSchema = z
  .object({
    slotInterval: z
      .number({ error: "Informe um número válido." })
      .int("Deve ser um número inteiro.")
      .min(5, "Mínimo de 5 minutos.")
      .max(120, "Máximo de 120 minutos."),

    autoAdjustVisibleHours: z.boolean(),

    visibleStartMinutes: z.number().int().min(0).max(1439).nullable(),
    visibleEndMinutes: z.number().int().min(0).max(1439).nullable(),

    workingDays: z.array(workingDaySchema).length(7),
  })
  .refine(
    (data) => {
      if (data.autoAdjustVisibleHours) return true;
      if (data.visibleStartMinutes == null || data.visibleEndMinutes == null)
        return true;
      return data.visibleEndMinutes > data.visibleStartMinutes;
    },
    {
      message: "O fim visível deve ser após o início visível.",
      path: ["visibleEndMinutes"],
    },
  );

export type ConfigFormValues = z.infer<typeof configSchema>;

const defaultWorkingDays: ConfigFormValues["workingDays"] = [
  { dayOfWeek: 0, isOpen: false, startMinutes: 480, endMinutes: 720 },
  { dayOfWeek: 1, isOpen: true, startMinutes: 480, endMinutes: 1080 },
  { dayOfWeek: 2, isOpen: true, startMinutes: 480, endMinutes: 1080 },
  { dayOfWeek: 3, isOpen: true, startMinutes: 480, endMinutes: 1080 },
  { dayOfWeek: 4, isOpen: true, startMinutes: 480, endMinutes: 1080 },
  { dayOfWeek: 5, isOpen: true, startMinutes: 480, endMinutes: 1080 },
  { dayOfWeek: 6, isOpen: false, startMinutes: 480, endMinutes: 720 },
];

export const defaultValues: ConfigFormValues = {
  slotInterval: 15,
  autoAdjustVisibleHours: true,
  visibleStartMinutes: 420,
  visibleEndMinutes: 1200,
  workingDays: defaultWorkingDays,
};
