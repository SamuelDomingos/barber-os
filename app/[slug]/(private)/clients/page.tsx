import GridCards from "@/components/gridCards";
import TableClients from "./_components/tableClients";
import { getClientsData } from "./_services/getClients";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
  };
}) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const search = params.search ?? "";

  const data = await getClientsData({ page, search });

  if (!data) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-medium">Clientes</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Visualize os clientes que agendaram na sua barbearia
        </p>
      </div>

      <GridCards stats={data.stats} />

      <TableClients
        clients={data.clients}
        search={search}
        page={page}
        total={data.total}
      />
    </div>
  );
}
