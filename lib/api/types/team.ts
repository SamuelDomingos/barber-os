import { User } from "@/generated/client";

export interface TeamResponse {
  data: User[];
  stats: { total: number; activeToday: number; commissionsMonth: number };
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}