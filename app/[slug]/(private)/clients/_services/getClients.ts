import { Prisma } from "@/generated/client";
import { auth } from "@/lib/auth";
import { authGuard } from "@/lib/auth-guard";
import prisma from "@/lib/prisma";
import { Repeat, UserPlus, Users } from "lucide-react";

export const getClientsData = async ({
  page,
  search,
}: {
  page: number;
  search: string;
}) => {
  const session = await auth();
  const barbershopId = session?.user?.barbershopId;

  if (!barbershopId) return null;

  await authGuard(barbershopId);

  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  firstDayOfMonth.setHours(0, 0, 0, 0);

  const where: Prisma.UserWhereInput = {
    role: "CLIENT" as const,
    barbershopId,
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

  const [clients, total, newThisMonth, recurring] = await prisma.$transaction([
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
        clientAppointments: {
          some: { createdAt: { gte: firstDayOfMonth } },
        },
      },
    }),
    prisma.user.count({
      where: {
        ...where,
        clientAppointments: { some: {} },
      },
    }),
  ]);

  const stats = [
    {
      label: "Total de clientes",
      value: String(total),
      sub: "que já agendaram aqui",
      icon: Users,
      danger: false,
    },
    {
      label: "Novos este mês",
      value: String(newThisMonth),
      sub: "primeiro agendamento aqui",
      icon: UserPlus,
      danger: false,
    },
    {
      label: "Recorrentes",
      value: String(recurring),
      sub: "mais de 1 agendamento",
      icon: Repeat,
      danger: false,
    },
  ];

  return {
    clients: clients,
    stats,
    total: total,
  };
};
