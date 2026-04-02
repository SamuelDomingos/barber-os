import prisma from "@/lib/prisma";

const DashboardService = () => {
  const getStats = async (barbershopId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
      appointmentsToday,
      appointmentsYesterday,
      revenueToday,
      lowStock,
      newClientsToday,
      totalClientsMonth,
    ] = await prisma.$transaction([
      prisma.appointment.count({
        where: {
          barbershopId,
          date: { gte: today, lt: tomorrow },
          status: { not: "CANCELLED" },
        },
      }),
      prisma.appointment.count({
        where: {
          barbershopId,
          date: { gte: yesterday, lt: today },
          status: { not: "CANCELLED" },
        },
      }),
      prisma.appointmentService.aggregate({
        where: {
          appointment: {
            barbershopId,
            date: { gte: today, lt: tomorrow },
            status: "COMPLETED",
          },
        },
        _sum: { price: true },
      }),
      prisma.product.count({
        where: { barbershopId, active: true, stock: { lte: 5 } },
      }),
      prisma.appointment.groupBy({
        by: ["clientId"],
        where: { barbershopId, date: { gte: today, lt: tomorrow } },
        orderBy: { clientId: "asc" },
        _count: true,
      }),
      prisma.appointment.groupBy({
        by: ["clientId"],
        where: { barbershopId, date: { gte: firstDayOfMonth } },
        orderBy: { clientId: "asc" },
        _count: true,
      }),
    ]);

    const diff = appointmentsToday - appointmentsYesterday;
    const diffLabel = diff >= 0 ? `+${diff} em relação a ontem` : `${diff} em relação a ontem`;

    return {
      appointmentsToday,
      diffLabel,
      revenueToday: Number(revenueToday._sum.price ?? 0),
      lowStock,
      newClientsToday: newClientsToday.length,
      totalClientsMonth: totalClientsMonth.length,
    };
  };

  const getAppointmentsToday = async (barbershopId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointments = await prisma.appointment.findMany({
      where: {
        barbershopId,
        date: { gte: today, lt: tomorrow },
        status: { not: "CANCELLED" },
      },
      orderBy: { date: "asc" },
      include: {
        client: { select: { name: true } },
        barber: { select: { name: true } },
        services: { include: { service: { select: { name: true } } } },
      },
    });

    return appointments.map((a) => ({
      id: a.id,
      clientName: a.client.name,
      barberName: a.barber.name,
      service: a.services.map((s) => s.service.name).join(", "),
      time: a.date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      status: a.status,
    }));
  };

  const getBarbersOccupation = async (barbershopId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const barbers = await prisma.user.findMany({
      where: { barbershopId, role: "BARBER", active: true },
      select: { id: true, name: true },
    });

    const activeAppointments = await prisma.appointment.findMany({
      where: {
        barbershopId,
        date: { gte: today, lt: tomorrow },
        status: { in: ["CONFIRMED", "IN_PROGRESS"] },
      },
      select: { barberId: true, status: true },
      orderBy: { date: "desc" },
    });

    return barbers.map((b) => {
      const appointment = activeAppointments.find((a) => a.barberId === b.id);
      const status =
        appointment?.status === "IN_PROGRESS"
          ? "Em andamento"
          : appointment?.status === "CONFIRMED"
          ? "Ocupado"
          : "Livre";

      return { id: b.id, name: b.name, status };
    });
  };

  return { getStats, getAppointmentsToday, getBarbersOccupation };
};

export default DashboardService;