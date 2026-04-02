import { CatalogItemType } from "@/generated";


export interface CatalogItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  active: boolean;
  image: string | null;
  type: CatalogItemType;
  duration: number | null;
  category: string | null;
  createdAt: string;
  packageItems?: {
    id: string;
    item: CatalogItem;
  }[];
}

export interface CatalogStats {
  type: CatalogItemType;
  _count: { id: number };
}

export interface CatalogResponse {
  data: CatalogItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  stats: CatalogStats[];
  lowStock: number;
}