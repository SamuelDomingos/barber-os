import {
  BarbershopLocation,
  CatalogItem,
  WorkingHours,
} from "@/generated/client";

export type BarbershopPublic = {
  id: string;
  name: string;
  slug: string;
  config: { slotInterval: number };
  locations: BarbershopLocation[];
  workingHours: WorkingHours[];
  catalogItems: CatalogItem[];
};
