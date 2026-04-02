import { CatalogItemType } from "@/generated/enums";


export type Tab = CatalogItemType;

type BaseValues = {
  name: string;
  description?: string;
  price: number;
  active: boolean;
  image?: File;
  category?: string 
};

type ServiceValues = BaseValues & { duration: number };
type PackageValues = BaseValues & { items: { itemId: string }[] };

export type FormValues = ServiceValues | PackageValues;

export const typeOptions: { value: CatalogItemType; label: string }[] = [
  { value: "SERVICE", label: "Serviço" },
  { value: "PRODUCT", label: "Produto" },
  { value: "PACKAGE", label: "Pacote" },
];

export const newButtonLabels: Record<Tab, string> = {
  SERVICE: "Novo serviço",
  PRODUCT: "Novo produto",
  PACKAGE: "Novo pacote",
};