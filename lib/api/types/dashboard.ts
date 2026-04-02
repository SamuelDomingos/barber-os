export interface DashboardStats {
  appointmentsToday: number;
  diffLabel: string;
  revenueToday: number;
  lowStock: number;
  newClientsToday: number;
  totalClientsMonth: number;
}

export interface DashboardAppointment {
  id: string;
  clientName: string;
  barberName: string;
  service: string;
  time: string;
  status: string;
}

export interface DashboardBarber {
  id: string;
  name: string;
  status: "Livre" | "Ocupado" | "Em andamento";
}

export interface DashboardResponse {
  stats: DashboardStats;
  appointments: DashboardAppointment[];
  barbers: DashboardBarber[];
}