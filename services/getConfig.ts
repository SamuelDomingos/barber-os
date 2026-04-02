import { auth } from "@/lib/auth";
import { authGuard } from "@/lib/auth-guard";
import prisma from "@/lib/prisma";

const getConfig = async () => {
  const session = await auth();
  const barbershopId = session?.user?.barbershopId;

  if (!barbershopId) return null;

  await authGuard(barbershopId);

  const [config, workingHours] = await prisma.$transaction([
    prisma.configAppointmentBarber.findUnique({
      where: { barbershopId },
    }),
    prisma.workingHours.findMany({
      where: { barbershopId },
    }),
  ]);

  if (!config) {
    throw new Error("Configuração de agenda não encontrada");
  }

  return { config, workingHours };
};

export default getConfig;
