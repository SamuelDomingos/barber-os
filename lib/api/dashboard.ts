import { DashboardResponse } from "./types/dashboard";

export const getDashboard = async (
  barbershopId: string,
): Promise<DashboardResponse> => {
  const response = await fetch(`/api/dashboard?barbershopId=${barbershopId}`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar GC");
  }

  return response.json();
};
