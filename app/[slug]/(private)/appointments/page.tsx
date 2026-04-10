import { ClientContainer } from "@/components/calendar/components/client-container";
import { CalendarProvider } from "@/components/calendar/contexts/calendar-context";
import { TCalendarView, TEventColor } from "@/components/calendar/types";
import getBarbers from "@/services/getBarbers";
import getConfig from "@/services/getConfig";
import getAppointments from "./_services/getAppointments";
import { IEvent } from "@/components/calendar/interfaces";

const AppointmentsPage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ search?: string; view?: string }>;
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { view: viewParam } = await searchParams;
  const view = (viewParam as TCalendarView) ?? "month";

  const [users, configData, appointments] = await Promise.all([
    getBarbers(slug),
    getConfig(),
    getAppointments(slug, view),
  ]);

  const events: IEvent[] = (appointments ?? []).map((appointment) => {
    const totalDuration = appointment.items.reduce(
      (acc, item) => acc + (item.catalogItem.duration ?? 0),
      0,
    );

    return {
      id: appointment.id,
      startDate: appointment.date.toISOString(),
      endDate: new Date(
        appointment.date.getTime() + totalDuration * 60 * 1000,
      ).toISOString(),
      title: appointment.client.name,
      color: "blue" as TEventColor,
      description: "",
      user: {
        id: appointment.client.id,
        name: appointment.client.name,
        avatar: appointment.client.avatar,
      },
    };
  });

  return (
    <CalendarProvider
      events={events ?? []}
      users={users ?? []}
      configData={configData}
    >
      <div>
        <div className="mb-6">
          <h1 className="text-lg font-medium">Agendamentos</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Visualize os agendamentos da barbearia
          </p>
        </div>
        <ClientContainer view={view} />
      </div>
    </CalendarProvider>
  );
};

export default AppointmentsPage;
