import { CatalogItemType } from "@/generated";
import { CatalogResponse } from "./types/catalog";

export const getCatalog = async (
  barbershopId: string,
  type?: CatalogItemType,
  page = 1,
  search?: string,
  active?: boolean,
): Promise<CatalogResponse> => {
  const params = new URLSearchParams({
    barbershopId,
    page: String(page),
    limit: "10",
    ...(type && { type }),
    ...(search && { search }),
    ...(active !== undefined && { active: String(active) }),
  });

  const response = await fetch(`/api/catalog?${params.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao buscar catálogo");
  }

  return response.json();
};

export const postCatalog = async (data: FormData): Promise<void> => {
  const response = await fetch("/api/catalog", { method: "POST", body: data });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar item");
  }
};

export const putCatalog = async (id: string, data: FormData): Promise<void> => {
  const response = await fetch(`/api/catalog/${id}`, {
    method: "PUT",
    body: data,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao atualizar item");
  }
};

export const deleteCatalog = async (id: string): Promise<void> => {
  const response = await fetch(`/api/catalog/${id}`, { method: "DELETE" });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao excluir item");
  }
};

export const updateStock = async (
  id: string,
  quantity: number,
): Promise<void> => {
  const response = await fetch(`/api/catalog/${id}/stock`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao atualizar estoque");
  }
};
