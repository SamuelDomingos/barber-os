"use client";

import { useFetch } from "@/hooks/useFetch";
import { getAppointmentById } from "@/lib/api/appointments";
import { useEffect, useMemo } from "react";

export const useEventDetails = (eventId?: string, isOpen?: boolean) => {
  const fetchOptions = useMemo(
    () => ({
      auto: false,
      defaultArgs: eventId ? [eventId] : [],
    }),
    [eventId],
  );

  const { data, isLoading, execute } = useFetch(
    getAppointmentById,
    fetchOptions,
  );

  useEffect(() => {
    if (isOpen && eventId) {
      execute(eventId);
    }
  }, [isOpen, execute, eventId]);

  return {
    event: data,
    isLoading,
    refresh: execute,
  };
};

export default useEventDetails;
