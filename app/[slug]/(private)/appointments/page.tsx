// AppointmentsPage
import { ClientContainer } from "@/components/calendar/components/client-container";
import { CalendarProvider } from "@/components/calendar/contexts/calendar-context";
import { TCalendarView } from "@/components/calendar/types";
import getBarbers from "@/services/getBarbers";
import getConfig from "@/services/getConfig";

const AppointmentsPage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ search?: string; view?: string }>;
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const { view: viewParam } = await searchParams;

  const [data, configData] = await Promise.all([
    getBarbers(slug),
    getConfig(),
  ]);

  const view = (viewParam as TCalendarView) ?? "month";

  return (
    <CalendarProvider
      events={[]}
      users={data ?? []}
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