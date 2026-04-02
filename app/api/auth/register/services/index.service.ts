import { Prisma, UserRole } from "@/generated/client";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const RegisterService = () => {
  const registerUser = async (data: Prisma.UserCreateInput, role: UserRole) => {
    if (!data) {
      throw new Error("Dados incompletos");
    }

    const usuarioExistente = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (usuarioExistente) {
      throw new Error("Email já cadastrado");
    }

    const senhaHash = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: { ...data, role: role, password: senhaHash },
    });
  };

  const registerOnBoarding = async (
    data: Prisma.BarbershopCreateInput &
      Prisma.ThemeConfigCreateInput &
      Prisma.BarbershopLocationCreateInput,
  ) => {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      throw new Error("Não autorizado");
    }

    const userId = session.user.id;

    const usuario = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!usuario) throw new Error("Usuário não existe");
    if (usuario.role !== "ADMIN") throw new Error("Usuário não tem permissão");

    const adminJaPossuiBarbearia = await prisma.user.findFirst({
      where: { id: userId, barbershopId: { not: null } },
    });

    if (adminJaPossuiBarbearia)
      throw new Error("Usuário já possui uma barbearia");

    return prisma.barbershop.create({
      data: {
        name: data.name,
        slug: data.slug,
        users: {
          connect: { id: userId },
        },
        themeConfig: {
          create: {
            style: data.style,
          },
        },
        locations: {
          create: {
            country: data.country,
            state: data.state,
            city: data.city,
            address: data.address,
            numberAddress: data.numberAddress,
            postalCode: data.postalCode,
            maxDistancia: data.maxDistancia,
          },
        },
      },
    });
  };

  return { registerUser, registerOnBoarding };
};

export default RegisterService;
