import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import { getListServices } from "@/lib/api/listServices";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

const useListServices = () => {
  const { data: session } = useSession();
  const barbershopId = session?.user?.barbershopId;
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const fetchOptions = useMemo(
    () => ({
      auto: !!barbershopId && !!debouncedSearch,
      defaultArgs: [barbershopId!, debouncedSearch || undefined],
    }),
    [barbershopId, debouncedSearch],
  );

  const { data, isLoading } = useFetch(getListServices, fetchOptions);

  return {
    data: data?.items ?? [],
    isLoading,
    setSearch
  };
};

export default useListServices;
