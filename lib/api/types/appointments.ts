export interface AppointmentsData {
  date: string;
  notes?: string;
  color: string;
  clientId: string;
  barberId?: string;
  barbershopId: string;

  items: { catalogItemId: string }[];
}

export interface IAppointmentDetails {
  id: string;
  date: string;
  status: string;
  notes?: string;
  color: string;
  client: {
    id: string;
    name: string;
    avatar: string | null;
  };
  barber?: {
    id: string;
    name: string;
    avatar: string | null;
  } | null;
  items: {
    id: string;
    price: number;
    quantity: number;
    catalogItem: {
      id: string;
      name: string;
      description: string | null;
      price: number;
      active: boolean;
      image: string | null;
      type: string;
      createdAt: string;
      duration: number | null;
      category: string | null;
      barbershopId: string;
    };
  }[];
}
