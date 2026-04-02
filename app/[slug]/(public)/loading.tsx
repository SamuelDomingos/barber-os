import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
      <Skeleton className="h-14 w-14 rounded-2xl" />
      <Skeleton className="h-9 w-52" />
      <Skeleton className="h-4 w-72" />
      <div className="grid sm:grid-cols-2 gap-4">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
      <Skeleton className="h-11 w-full rounded-xl" />
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-28 w-full rounded-2xl" />
      ))}
    </div>
  );
};

export default Loading;
