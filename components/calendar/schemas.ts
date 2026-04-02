import { z } from "zod";

export const eventSchema = z
  .object({
    clientId: z.string().min(1, "Cliente é obrigatório"),
    barberId: z.string().min(1, "Barbeiro é obrigatório"),
    date: z.date({ error: "Data é obrigatória" }),
    time: z.object(
      { hour: z.number(), minute: z.number() },
      { error: "Horário é obrigatório" },
    ),
    notes: z.string().optional(),
    color: z.enum(["blue", "green", "red", "yellow", "purple", "orange", "gray"], {
      error: "Cor é obrigatória",
    }),
    items: z
      .array(z.object({
        catalogItemId: z.string().min(1),
      }))
      .min(1, "Adicione pelo menos 1 serviço ou produto"),
  });

export type TEventFormData = z.infer<typeof eventSchema>;