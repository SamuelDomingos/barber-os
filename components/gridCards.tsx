import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { gridCols } from "../app/[slug]/(private)/dashboard/_libs/varients";
import { LucideIcon } from "lucide-react";

const GridCards = ({
  stats,
  isLoading,
}: {
  stats: {
    label: string;
    value: string;
    sub: string | null;
    icon: LucideIcon;
    danger: boolean;
  }[];
  isLoading?: boolean;
}) => {
  const cols = gridCols[isLoading ? 4 : stats.length] ?? "grid-cols-4";

  if (isLoading) {
    return (
      <div className={`grid ${cols} gap-3 mb-6`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="relative overflow-hidden">
            <CardContent className="pt-4">
              <Skeleton className="h-3 w-28 mb-3" />
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${cols} gap-3 mb-6`}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="relative overflow-hidden">
            <div className="absolute -right-2 -bottom-2 opacity-[0.06] pointer-events-none text-foreground">
              <Icon size={80} strokeWidth={1.5} />
            </div>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1.5">
                {stat.label}
              </p>
              <p className={`text-2xl font-medium mb-1 ${stat.danger ? "text-destructive" : ""}`}>
                {stat.value}
              </p>
              {stat.danger ? (
                <Badge variant="destructive" className="text-xs font-normal">
                  Requer atenção
                </Badge>
              ) : (
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default GridCards;