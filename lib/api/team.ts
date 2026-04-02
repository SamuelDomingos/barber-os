import { TeamResponse } from "./types/team";

export const getTeam = async (
  barbershopId: string,
  page = 1,
  limit = 10,
): Promise<TeamResponse> => {
  const response = await fetch(
    `/api/team?barbershopId=${barbershopId}&page=${page}&limit=${limit}`,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao buscar equipe");
  }

  return response.json();
};

export const postTeam = async (data: FormData): Promise<void> => {
  const response = await fetch("/api/team", {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const putTeam = async (id: string, data: FormData): Promise<void> => {
  const response = await fetch(`/api/team/${id}`, {
    method: "PUT",
    body: data,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const deleteTeam = async (id: string): Promise<void> => {
  const response = await fetch(`/api/team/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};