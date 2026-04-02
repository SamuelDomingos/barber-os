"use server";

import { Users, Clock, DollarSign } from "lucide-react";
import { auth } from "@/lib/auth";
import { authGuard } from "@/lib/auth-guard";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/client";

export const getTeam = async ({
  search,
  page,
}: {
  search: string;
  page: number;
}) => {
  const session = await auth();
  const barbershopId = session?.user?.barbershopId;

  if (!barbershopId) return null;

  await authGuard(barbershopId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const where: Prisma.UserWhereInput = {
    barbershopId,
    role: "BARBER" as const,
    active: true,
    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),
  };

  const [barbers, total, activeToday, commissionsMonth] =
    await prisma.$transaction([
      prisma.user.findMany({
        where,
        orderBy: { name: "asc" },
        skip: (page - 1) * 10,
        take: 10,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatar: true,
          active: true,
        },
      }),
      prisma.user.count({ where }),
      prisma.user.count({
        where: {
          ...where,
          barberAppointments: {
            some: {
              date: { gte: today, lt: tomorrow },
              status: { in: ["CONFIRMED", "IN_PROGRESS", "COMPLETED"] },
            },
          },
        },
      }),
      prisma.appointmentItem.aggregate({
        where: {
          appointment: {
            barbershopId,
            status: "COMPLETED",
            date: { gte: firstDayOfMonth },
          },
        },
        _sum: { price: true },
      }),
    ]);

  const stats = [
    {
      label: "Total de barbeiros",
      value: String(total),
      sub: "na equipe",
      icon: Users,
      danger: false,
    },
    {
      label: "Ativos hoje",
      value: String(activeToday),
      sub: "em atendimento",
      icon: Clock,
      danger: false,
    },
    {
      label: "Comissões do mês",
      value: (commissionsMonth._sum.price ?? 0).toFixed(2),
      sub: "a pagar",
      icon: DollarSign,
      danger: false,
    },
  ];

  return {
    barbers,
    stats,
    total,
  };
};

export const deleteUserTeam = async (id: string) => {
  const session = await auth();
  const barbershopId = session?.user?.barbershopId;

  if (!barbershopId) return null;

  await authGuard(barbershopId);

  const barber = await prisma.user.findUnique({ where: { id } });
  if (!barber || barber.role !== "BARBER")
    throw new Error("Barbeiro não encontrado");

  return prisma.user.update({
    where: { id },
    data: { active: false, email: `${barber.email}_deleted_${Date.now()}` },
  });
};
