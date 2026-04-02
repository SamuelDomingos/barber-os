import prisma from "@/lib/prisma";

const getBarbers = (slug: string, search?: string) => {
    return prisma.user.findMany({
      where: {
        barbershop: { slug },
        role: "BARBER" as const,
        active: true,
        ...(search && {
          name: { contains: search, mode: "insensitive" },
        }),
      },
      take: 10,
      select: {
        id: true,
        name: true,
        avatar: true,
      },
    });
}

export default getBarbers