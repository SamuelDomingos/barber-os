import { MapPin, Clock, Scissors } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DAY_NAMES, minutesToTime } from "@/helpers/time";
import HeaderClient from "./_components/headerClient";
import CatalogTabs from "./_components/catalogTabs";
import getBarbershop from "./_service/getBarbershop";
import MapBarbershop from "./_components/mapBarbershop";

export default async function BarberPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ search?: string }>;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { search = "" } = await searchParams;

  const data = await getBarbershop(slug, search);

  const location = data?.locations?.[0];

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <Scissors className="w-10 h-10 text-muted-foreground/30" />
        <p className="text-muted-foreground">Barbearia não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient
        slug={slug}
        configTime={{
          workingHours: data.workingHours,
          slotInterval: data.configAppointment?.slotInterval ?? 15,
        }}
      />
      <div className="flex-1 overflow-y-auto h-full container mx-auto">
        <div className="relative bg-card border-b overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-primary blur-3xl" />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 py-10 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Scissors className="w-6 h-6 text-primary" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">{data.name}</h1>
              {location && (
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {location.address}, {location.numberAddress} —{" "}
                    {location.city}, {location.state}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto px-4 py-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4 items-stretch">
            {data?.workingHours?.length > 0 && (
              <div className="rounded-2xl border bg-card p-5 space-y-3 flex flex-col">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  Horários
                </div>
                <div className="space-y-2 flex-1">
                  {data.workingHours.map((wh) => (
                    <div
                      key={wh.dayOfWeek}
                      className="flex items-center justify-between text-sm py-1 border-b border-border/40 last:border-0"
                    >
                      <span className="text-muted-foreground w-8 text-xs font-medium">
                        {DAY_NAMES[wh.dayOfWeek]}
                      </span>
                      {wh.isOpen ? (
                        <span className="text-xs tabular-nums">
                          {minutesToTime(wh.startMinutes)} –{" "}
                          {minutesToTime(wh.endMinutes)}
                        </span>
                      ) : (
                        <Badge variant="outline" className="text-xs h-5">
                          Fechado
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {location && <MapBarbershop location={location} />}
          </div>

          <CatalogTabs
            search={search}
            categories={Object.entries(
              data.catalogItems.reduce(
                (acc, item) => {
                  const key = item.category ?? "Outros";
                  if (!acc[key]) acc[key] = [];
                  acc[key].push(item);
                  return acc;
                },
                {} as Record<string, typeof data.catalogItems>,
              ),
            ).map(([name, items]) => ({ name, items }))}
          />
        </div>
      </div>
    </div>
  );
}
