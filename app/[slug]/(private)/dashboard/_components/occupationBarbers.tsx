import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {dotColors } from "../_libs/varients";
import { DashboardBarber } from "@/lib/api/types/dashboard";
import { Users } from "lucide-react";

const OccupationBarbers = ({
  barbers,
  isLoading,
  getDot
}: {
  barbers: DashboardBarber[];
  isLoading?: boolean;
  getDot: any
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">
          Ocupação dos barbeiros
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-border">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1 flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="w-2 h-2 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))
        ) : barbers.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
            <Users size={32} strokeWidth={1.5} />
            <p className="text-sm">Nenhum barbeiro ativo</p>
          </div>
        ) : (
          barbers.map((b) => (
            <div key={b.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium`}>
                {b.name}
              </div>
              <div className="flex-1">
                <p className="text-sm">{b.name}</p>
                <p className="text-xs text-muted-foreground">Barbeiro</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${dotColors[getDot(b.status)]}`} />
              <span className="text-xs text-muted-foreground">{b.status}</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default OccupationBarbers;