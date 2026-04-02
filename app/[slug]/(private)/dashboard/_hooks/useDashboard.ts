"use client"

import { useFetch } from "@/hooks/useFetch";
import { getDashboard } from "@/lib/api/dashboard";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { Calendar, Clock, Layers, Users } from "lucide-react";
import { DashboardBarber } from "@/lib/api/types/dashboard";

const useDashboard = () => {
  const { data: session } = useSession();
  const barbershopId = session?.user?.barbershopId;

  const fetchOptions = useMemo(
    () => ({
      auto: !!barbershopId,
      defaultArgs: [barbershopId!],
    }),
    [barbershopId],
  );

  const { data, isLoading } = useFetch(getDashboard, fetchOptions);

  const stats = data?.stats ? [
    {
      label: "Agendamentos hoje",
      value: String(data.stats.appointmentsToday),
      sub: data.stats.diffLabel,
      icon: Calendar,
      danger: false,
    },
    {
      label: "Faturamento do dia",
      value: data.stats.revenueToday.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      sub: null,
      icon: Clock,
      danger: false,
    },
    {
      label: "Estoque baixo",
      value: `${data.stats.lowStock} itens`,
      sub: null,
      icon: Layers,
      danger: data.stats.lowStock > 0,
    },
    {
      label: "Novos clientes",
      value: String(data.stats.newClientsToday),
      sub: `Este mês: ${data.stats.totalClientsMonth}`,
      icon: Users,
      danger: false,
    },
  ] : [];

  const getDot = (status: DashboardBarber["status"]) => {
    const map: Record<DashboardBarber["status"], string> = {
      Livre: "green",
      Ocupado: "red",
      "Em andamento": "blue",
    };
    return map[status];
  };
  

  return {
    data,
    stats,
    getDot,
    isLoading,
  };
};

export default useDashboard;