import prisma from "@/lib/prisma";

import {
  ConfigAppointmentBarberCreateInput,
  WorkingHoursCreateInput,
} from "@/generated/models";

const ConfigAppointmentService = () => {

  const post = async (data: {
    barbershopId: string;
    config: ConfigAppointmentBarberCreateInput;
    workingHours: WorkingHoursCreateInput[];
  }) => {
    const exists = await prisma.configAppointmentBarber.findUnique({
      where: { barbershopId: data.barbershopId },
    });

    if (exists) {
      throw new Error("Configuração já existe para esta barbearia");
    }

    return await prisma.$transaction(async (tx) => {
      const config = await tx.configAppointmentBarber.create({
        data: {
          barbershopId: data.barbershopId,
          slotInterval: data.config.slotInterval,
          autoAdjustVisibleHours: data.config.autoAdjustVisibleHours,
          visibleStartMinutes: data.config.visibleStartMinutes,
          visibleEndMinutes: data.config.visibleEndMinutes,
        },
      });

      await tx.workingHours.createMany({
        data: data.workingHours.map((wh) => ({
          barbershopId: data.barbershopId,
          dayOfWeek: wh.dayOfWeek,
          startMinutes: wh.startMinutes,
          endMinutes: wh.endMinutes,
          isOpen: wh.isOpen,
        })),
      });

      return config;
    });
  };

  const put = async (data: {
    barbershopId: string;
    config: ConfigAppointmentBarberCreateInput;
    workingHours: WorkingHoursCreateInput[];
  }) => {
    const config = await prisma.configAppointmentBarber.findUnique({
      where: { barbershopId: data.barbershopId },
    });

    if (!config) {
      throw new Error("Configuração não encontrada");
    }

    const updatedConfig = await prisma.configAppointmentBarber.update({
      where: { barbershopId: data.barbershopId },
      data: data.config,
    });

    if (data.workingHours) {
      await prisma.workingHours.deleteMany({
        where: { barbershopId: data.barbershopId },
      });

      await prisma.workingHours.createMany({
        data: data.workingHours.map((wh) => ({
          barbershopId: data.barbershopId,
          dayOfWeek: wh.dayOfWeek,
          startMinutes: wh.startMinutes,
          endMinutes: wh.endMinutes,
          isOpen: wh.isOpen ?? true,
        })),
      });
    }

    return updatedConfig;
  };

  return {
    post,
    put,
  };
};

export default ConfigAppointmentService;
