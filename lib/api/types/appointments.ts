export interface AppointmentsData {
  date: string;
  notes?: string;
  color: string;
  clientId: string;
  barberId?: string;
  barbershopId: string;

  items: { catalogItemId: string }[];
}
