
import { Appointment } from "@/generated/client";
import { AppointmentsData } from "./types/appointments";

export const getAppointments = async (
  barbershopId: string,
  page = 1,
  search?: string,
): Promise<Appointment[]> => {
  const params = new URLSearchParams({
    barbershopId,
    page: String(page),
    limit: "10",
    ...(search && { search }),
  });

  const response = await fetch(`/api/appointment?${params.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao buscar catálogo");
  }

  return response.json();
};

export const postAppointments = async (data: AppointmentsData): Promise<void> => {
  const response = await fetch("/api/appointment", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar item");
  }
};

export const putAppointments = async (id: string, data: AppointmentsData): Promise<void> => {
  const response = await fetch(`/api/appointment/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao atualizar item");
  }
};

export const deleteAppointments = async (id: string): Promise<void> => {
  const response = await fetch(`/api/appointment/${id}`, { method: "DELETE" });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao excluir item");
  }
};
