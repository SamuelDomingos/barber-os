import z from "zod";

export const bookingSchema = z.object({
  barberId: z.string().optional(),
  date: z.date({ error: "Selecione uma data" }),
  time: z.object({ hour: z.number(), minute: z.number() }).optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;