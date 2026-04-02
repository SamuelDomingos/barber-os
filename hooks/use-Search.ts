"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const useSearch = (search: string ) => {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState<string>(search);
  const debouncedSearch = useDebounce(input, 500);

  useEffect(() => {
    const newParams = new URLSearchParams(params.toString());

    if (debouncedSearch) {
      newParams.set("search", debouncedSearch);
      newParams.set("page", "1");
    } else {
      newParams.delete("search");
    }

    startTransition(() => {
      router.push(`?${newParams.toString()}`);
    });
  }, [debouncedSearch]);

  return {
    input,
    setInput,
    isPending,
  };
};

export default useSearch;