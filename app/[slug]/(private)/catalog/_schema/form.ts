import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Preço deve ser maior que zero"),
  active: z.boolean().default(true),
  image: z.instanceof(File).optional(),
  category: z.string().optional(),
});

export const serviceSchema = baseSchema.extend({
  duration: z.coerce.number().min(15, "Duração mínima de 15 minutos"),
});

export const productSchema = baseSchema;

export const packageSchema = baseSchema.extend({
  items: z
    .array(
      z.object({
        itemId: z.string().min(1, "Item obrigatório"),
      }),
    )
    .min(1, "Adicione pelo menos 1 item ao pacote"),
});

export const schemas = {
  SERVICE: serviceSchema,
  PRODUCT: productSchema,
  PACKAGE: packageSchema,
} as const;

export type ServiceFormValues = z.infer<typeof serviceSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;
export type PackageFormValues = z.infer<typeof packageSchema>;

export type FormValues =
  | ServiceFormValues
  | ProductFormValues
  | PackageFormValues;

export type Tab = keyof typeof schemas;

export const defaultValues: {
  SERVICE: ServiceFormValues;
  PRODUCT: ProductFormValues;
  PACKAGE: PackageFormValues;
} = {
  SERVICE: {
    name: "",
    description: "",
    price: 0,
    active: true,
    image: undefined,
    duration: 30,
    category: "",
  },
  PRODUCT: {
    name: "",
    description: "",
    price: 0,
    active: true,
    image: undefined,
    category: "",
  },
  PACKAGE: {
    name: "",
    description: "",
    price: 0,
    active: true,
    image: undefined,
    category: "",
    items: [],
  },
};