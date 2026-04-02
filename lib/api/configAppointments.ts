import { ConfigAppointmentBarber, WorkingHours } from "@/generated/client";
import {
  ConfigAppointmentBarberCreateInput,
  WorkingHoursCreateInput,
} from "@/generated/models";

export const getConfigAppointments = async (
  barbershopId: string,
): Promise<{
  config: ConfigAppointmentBarber;
  workingHours: WorkingHours[];
}> => {
  const params = new URLSearchParams({
    barbershopId,
  });

  const response = await fetch(`/api/configAppointment?${params.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao buscar catálogo");
  }

  return response.json();
};

export const postConfigAppointments = async (data: {
  barbershopId: string;
  config: ConfigAppointmentBarberCreateInput;
  workingHours: WorkingHoursCreateInput[];
}): Promise<void> => {
  const response = await fetch("/api/configAppointment", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar item");
  }
};

export const putConfigAppointments = async (data: {
  barbershopId: string;
  config: ConfigAppointmentBarberCreateInput;
  workingHours: WorkingHoursCreateInput[];
}): Promise<void> => {
  const response = await fetch(`/api/configAppointment`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao atualizar item");
  }
};
