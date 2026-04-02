import GridCards from "@/components/gridCards";
import CardBarber from "./_components/cardBarber";
import { getTeam } from "./_services/serviceTeam";

const TeamPage = async ({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
  };
}) => {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const search = params.search ?? "";

  const data = await getTeam({ search, page });

  if (!data) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-medium">Time</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gerencie os barbeiros da sua barbearia
          </p>
        </div>
      </div>

      <GridCards stats={data.stats} />

      <CardBarber barbers={data.barbers} />
    </div>
  );
};

export default TeamPage;
