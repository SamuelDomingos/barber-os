import { ClientsResponde } from "./types/client";

export const getClients = async (
  barbershopId: string,
  page = 1,
  limit = 10,
): Promise<ClientsResponde> => {
  const response = await fetch(
    `/api/client?barbershopId=${barbershopId}&page=${page}&limit=${limit}`,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao buscar clientes");
  }

  return response.json();
};

export const getListClients = async (
  barbershopId: string,
  search?: string,
): Promise<{ id: string; name: string; avatar: string }[]> => {
  const params = new URLSearchParams({
    barbershopId,
    ...(search && { search }),
  });

  const response = await fetch(`/api/client?${params.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao buscar clientes");
  }

  return response.json();
};
