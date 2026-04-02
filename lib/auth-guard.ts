import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const authGuard = async (barbershopId?: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Não autenticado");
  }
  if (
    barbershopId &&
    session.user.role !== "CLIENT" &&
    session.user.barbershopId !== barbershopId
  ) {
    throw new Error("Sem permissão");
  }

  return session;
};