import prisma from "@/lib/prisma";
import { PaginationParams } from "@/lib/pagination";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/client";

const TeamService = () => {
  const post = async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
    barbershopId: string;
  }) => {
    const barbershop = await prisma.barbershop.findUnique({
      where: { id: data.barbershopId },
      include: { locations: { take: 1 } },
    });

    if (!barbershop) throw new Error("Barbearia não encontrada");

    if (barbershop.locations.length === 0) {
      throw new Error(
        "Complete o cadastro da barbearia antes de adicionar barbeiros",
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new Error("Email já cadastrado");

    const senhaHash = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatar: data.avatar,
        password: senhaHash,
        barbershopId: data.barbershopId,
        role: "BARBER",
        active: true,
      },
    });
  };

  const put = async (
    id: string,
    data: Prisma.UserUpdateInput & { avatar?: string },
  ) => {
    const barber = await prisma.user.findUnique({ where: { id } });
    if (!barber || barber.role !== "BARBER") {
      throw new Error("Barbeiro não encontrado");
    }

    return prisma.user.update({ where: { id }, data });
  };

  const remove = async (id: string) => {
    const barber = await prisma.user.findUnique({ where: { id } });
    if (!barber || barber.role !== "BARBER")
      throw new Error("Barbeiro não encontrado");

    return prisma.user.update({
      where: { id },
      data: { active: false, email: `${barber.email}_deleted_${Date.now()}` },
    });
  };

  const get = async (barbershopId: string, pagination: PaginationParams) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const where = { barbershopId, role: "BARBER" as const, active: true };

    const [barbers, total, activeToday, commissionsMonth] =
      await prisma.$transaction([
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

    return {
      barbers,
      total,
      stats: {
        total,
        activeToday,
        commissionsMonth: Number(commissionsMonth._sum.price ?? 0),
      },
    };
  };

  const getById = async (id: string) => {
    const barber = await prisma.user.findUnique({
      where: { id },
      include: { barberAppointments: true },
    });

    if (!barber || barber.role !== "BARBER") {
      throw new Error("Barbeiro não encontrado");
    }

    return barber;
  };

  return { post, remove, put, get, getById };
};

export default TeamService;
