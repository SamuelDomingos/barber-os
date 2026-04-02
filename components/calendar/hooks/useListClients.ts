import { useDebounce } from "@/hooks/useDebounce";
import { useFetch } from "@/hooks/useFetch";
import { getListClients } from "@/lib/api/clients";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

const useListClients = () => {
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

  const { data, isLoading } = useFetch(getListClients, fetchOptions);

  return {
    data: Array.isArray(data) ? data : [],
    isLoading,
    setSearch
  };
};

export default useListClients;
