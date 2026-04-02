import prisma from "@/lib/prisma";
import { PaginationParams } from "@/lib/pagination";

const ClientService = () => {
  const get = async (barbershopId: string, pagination: PaginationParams) => {
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const where = { role: "CLIENT" as const };

    const [clients, total, newThisMonth, recurring] = await prisma.$transaction(
      [
        prisma.user.findMany({
          where,
          orderBy: { name: "asc" },
          skip: pagination.skip,
          take: pagination.limit,
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
      ],
    );

    return {
      clients,
      total,
      stats: { total, newThisMonth, recurring },
    };
  };

  const getList = async (barbershopId: string, search?: string) => {
    const clients = await prisma.user.findMany({
      where: {
        role: "CLIENT",
        active: true,

        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),

        clientAppointments: {
          some: {
            barbershopId,
          },
        },
      },

      take: 10,

      select: {
        id: true,
        name: true,
        avatar: true,
      },
    });

    return { clients };
  };

  const getById = async (id: string) => {
    const client = await prisma.user.findUnique({
      where: { id },
      include: { clientAppointments: true },
    });

    if (!client || client.role !== "CLIENT") {
      throw new Error("Cliente não encontrado");
    }

    return client;
  };

  return { get, getList, getById };
};

export default ClientService;
