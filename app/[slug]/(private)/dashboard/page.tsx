"use client";

import GridCards from "@/components/gridCards";
import OccupationBarbers from "./_components/occupationBarbers";
import TableClientToday from "./_components/tableClientToday";
import useDashboard from "./_hooks/useDashboard";

export default function DashboardPage() {
  const { data, stats, getDot, isLoading } = useDashboard();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-medium">Dashboard</h1>
        <span className="text-sm">Sexta-feira, 13 de março de 2026</span>
      </div>

      <GridCards stats={stats} isLoading={isLoading} />
      <div className="grid gap-3" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        <TableClientToday
          appointments={data?.appointments ?? []}
          isLoading={isLoading}
        />
        <OccupationBarbers
          barbers={data?.barbers ?? []}
          isLoading={isLoading}
          getDot={getDot}
        />
      </div>
    </div>
  );
}
