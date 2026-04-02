import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const LoadingConfig = () => {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <Skeleton className="h-8 w-64" />

      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-9 w-24" />
          </div>

          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-6 w-10 rounded-full" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-56" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border p-3 rounded-xl"
            >
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-6 w-10 rounded-full" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-4 w-6" />
              <Skeleton className="h-9 w-24" />
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex justify-end gap-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-36" />
      </div>
    </div>
  );
};

export default LoadingConfig;
