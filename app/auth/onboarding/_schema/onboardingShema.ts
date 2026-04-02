import z from "zod";

const barbershopSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  slug: z
    .string()
    .min(2, "Slug deve ter pelo menos 2 caracteres")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug deve conter apenas letras minúsculas, números e hífens",
    ),
});

const locationSchema = z.object({
  country: z.string().min(1, "País é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  address: z.string(),
  numberAddress: z.string(),
  postalCode: z.string().optional(),
  maxDistancia: z.number().min(1, "Distância mínima é 1"),
});

const themeSchema = z.object({
  style: z.string().min(1, "Estilo é obrigatório")
});

export const onboardingSchema = barbershopSchema
  .merge(locationSchema)
  .merge(themeSchema);
