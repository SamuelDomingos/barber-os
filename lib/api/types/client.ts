import { User } from "@/generated/client";

export interface ClientsResponde {
  clients: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  stats: {
    total: number;
    newThisMonth: number;
    recurring: number;
  };
}
