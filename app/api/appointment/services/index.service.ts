import prisma from "@/lib/prisma";
import { PaginationParams } from "@/lib/pagination";
import { validateAppointmentAvailability } from "./validateAppointment.service";
import { AppointmentStatus } from "@/generated/enums";
import { Prisma } from "@/generated/client";

const AppointmentService = () => {
  const postByBarbershop = async (data: {
    date: string;
    notes?: string;
    color: string;
    clientId: string;
    barberId?: string;
    barbershopId: string;
    items: { catalogItemId: string }[];
  }) => {
    const clientHistory = await prisma.appointment.findFirst({
      where: {
        clientId: data.clientId,
        barbershopId: data.barbershopId,
      },
    });

    if (!clientHistory) {
      throw new Error(
        "Cliente não possui histórico nesta barbearia. Apenas clientes que já realizaram um agendamento podem ser vinculados.",
      );
    }

    const catalogItems = await prisma.catalogItem.findMany({
      where: {
        id: { in: data.items.map((i) => i.catalogItemId) },
        barbershopId: data.barbershopId,
        active: true,
      },
    });

    if (catalogItems.length !== data.items.length) {
      throw new Error("Um ou mais itens não estão disponíveis nesta barbearia");
    }

    const totalDuration = catalogItems.reduce(
      (acc, item) => acc + (item.duration ?? 0),
      0,
    );

    await validateAppointmentAvailability({
      date: new Date(data.date),
      duration: totalDuration,
      barberId: data.barberId,
      barbershopId: data.barbershopId,
    });

    return prisma.appointment.create({
      data: {
        date: new Date(data.date),
        notes: data.notes,
        color: data.color,
        status: "PENDING",
        client: { connect: { id: data.clientId } },
        ...(data.barberId && { barber: { connect: { id: data.barberId } } }),
        barbershop: { connect: { id: data.barbershopId } },
        items: {
          create: data.items.map((item) => {
            const catalogItem = catalogItems.find(
              (c) => c.id === item.catalogItemId,
            );

            if (!catalogItem) {
              throw new Error("Item inválido");
            }

            return {
              price: catalogItem.price,
              quantity: 1,
              catalogItem: { connect: { id: item.catalogItemId } },
            };
          }),
        },
      },
      include: {
        client: true,
        barber: true,
        items: { include: { catalogItem: true } },
      },
    });
  };

  const postByClient = async (data: {
    date: string;
    notes?: string;
    color: string;
    clientId: string;
    barberId?: string;
    barbershopId: string;
    items: { catalogItemId: string }[];
  }) => {
    
    const date = new Date(data.date);
    if (isNaN(date.getTime())) {
      throw new Error("Data inválida");
    }

    const barbershop = await prisma.barbershop.findUnique({
      where: { slug: data.barbershopId },
    });

    if (!barbershop) {
      throw new Error("Barbearia não encontrada");
    }

    const catalogItems = await prisma.catalogItem.findMany({
      where: {
        id: { in: data.items.map((i) => i.catalogItemId) },
        barbershopId: barbershop.id,
        active: true,
      },
    });

    if (catalogItems.length !== data.items.length) {
      throw new Error("Um ou mais itens não estão disponíveis nesta barbearia");
    }

    const totalDuration = catalogItems.reduce(
      (acc, item) => acc + (item.duration ?? 0),
      0,
    );

    await validateAppointmentAvailability({
      date,
      duration: totalDuration,
      barberId: data.barberId,
      barbershopId: barbershop.id,
    });

    if (data.barberId) {
      const barber = await prisma.user.findFirst({
        where: {
          id: data.barberId,
          barbershopId: barbershop.id,
          role: "BARBER",
          active: true,
        },
      });

      if (!barber) {
        throw new Error("Barbeiro não encontrado nesta barbearia");
      }
    }

    return prisma.appointment.create({
      data: {
        date,
        notes: data.notes,
        color: data.color,
        status: "PENDING",
        client: { connect: { id: data.clientId } },
        ...(data.barberId && {
          barber: { connect: { id: data.barberId } },
        }),
        barbershop: { connect: { id: barbershop.id } },
        items: {
          create: catalogItems.map((catalogItem) => ({
            price: catalogItem.price,
            quantity: 1,
            catalogItem: { connect: { id: catalogItem.id } },
          })),
        },
      },
      include: {
        client: true,
        barber: true,
        items: { include: { catalogItem: true } },
      },
    });
  };

  const get = async (barbershopId: string, pagination: PaginationParams) => {
    const [appointments, total] = await prisma.$transaction([
      prisma.appointment.findMany({
        where: { barbershopId },
        orderBy: { date: "desc" },
        skip: pagination.skip,
        take: pagination.limit,
        include: {
          client: true,
          barber: true,
          items: { include: { catalogItem: true } },
        },
      }),
      prisma.appointment.count({ where: { barbershopId } }),
    ]);

    return { appointments, total };
  };

  const getById = async (id: string) => {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        client: true,
        barber: true,
        items: { include: { catalogItem: true } },
      },
    });

    if (!appointment) throw new Error("Agendamento não encontrado");

    return appointment;
  };

  const updateStatus = async (id: string, status: string) => {
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) throw new Error("Agendamento não encontrado");

    return prisma.appointment.update({
      where: { id },
      data: { status: status as AppointmentStatus },
    });
  };

  const put = async (id: string, data: Prisma.AppointmentUpdateInput) => {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        items: { include: { catalogItem: true } },
      },
    });

    if (!appointment) throw new Error("Agendamento não encontrado");

    const totalDuration = appointment.items.reduce(
      (acc, item) => acc + (item.catalogItem.duration ?? 0),
      0,
    );

    const date =
      typeof data.date === "string" || data.date instanceof Date
        ? new Date(data.date)
        : appointment.date;

    await validateAppointmentAvailability({
      date,
      duration: totalDuration,
      barberId: data.barber?.connect?.id ?? appointment.barberId ?? undefined,
      barbershopId: data.barbershop?.connect?.id ?? appointment.barbershopId,
    });

    return prisma.appointment.update({
      where: { id },
      data,
      include: {
        client: true,
        barber: true,
        items: { include: { catalogItem: true } },
      },
    });
  };

  const remove = async (id: string) => {
    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) throw new Error("Agendamento não encontrado");

    return prisma.appointment.update({
      where: { id },
      data: { status: "CANCELLED" },
    });
  };

  return {
    postByBarbershop,
    postByClient,
    get,
    getById,
    updateStatus,
    put,
    remove,
  };
};

export default AppointmentService;
