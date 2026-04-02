import prisma from "@/lib/prisma";

export const validateAppointmentAvailability = async ({
  date,
  duration,
  barberId,
  barbershopId,
}: {
  date: Date;
  duration: number;
  barberId?: string;
  barbershopId: string;
}) => {
  const dayOfWeek = date.getDay();

  const [config, workingHours] = await Promise.all([
    prisma.configAppointmentBarber.findUnique({
      where: { barbershopId },
    }),
    prisma.workingHours.findUnique({
      where: {
        barbershopId_dayOfWeek: {
          barbershopId,
          dayOfWeek,
        },
      },
    }),
  ]);

  if (!workingHours || !workingHours.isOpen) {
    throw new Error("Barbearia fechada neste dia");
  }

  const startMinutes = date.getHours() * 60 + date.getMinutes();
  const endMinutes = startMinutes + duration;

  if (
    startMinutes < workingHours.startMinutes ||
    endMinutes > workingHours.endMinutes
  ) {
    throw new Error("Agendamento ultrapassa horário de funcionamento");
  }

  if (config?.slotInterval && startMinutes % config.slotInterval !== 0) {
    throw new Error("Horário inválido para o intervalo configurado");
  }

  const startDate = date;
  const endDate = new Date(date.getTime() + duration * 60000);

  const conflict = await prisma.appointment.findFirst({
    where: {
      barbershopId,
      ...(barberId && { barberId }),
      status: {
        in: ["PENDING", "CONFIRMED", "IN_PROGRESS"],
      },
      AND: [
        {
          date: {
            lt: endDate,
          },
        },
      ],
    },
    include: {
      items: {
        include: { catalogItem: true },
      },
    },
  });

  if (conflict) {
    const conflictDuration = conflict.items.reduce(
      (acc, item) => acc + (item.catalogItem.duration ?? 0),
      0,
    );

    const conflictEnd = new Date(
      conflict.date.getTime() + conflictDuration * 60000,
    );

    if (conflict.date < endDate && conflictEnd > startDate) {
      throw new Error("Horário já ocupado");
    }
  }
};