import { CatalogItemType, Prisma } from "@/generated/client";
import { auth } from "@/lib/auth";
import { authGuard } from "@/lib/auth-guard";
import prisma from "@/lib/prisma";
import { Package, Scissors } from "lucide-react";

const getCatalog = async (
  page: number,
  search?: string,
  type?: CatalogItemType,
  active?: boolean,
) => {
  const session = await auth();
  const barbershopId = session?.user?.barbershopId;

  if (!barbershopId) return null;

  await authGuard(barbershopId);

  const where: Prisma.CatalogItemWhereInput = {
    barbershopId,
    ...(type && { type }),
    ...(active !== undefined && { active }),
    ...(search && {
      name: { contains: search, mode: "insensitive" },
    }),
  };

  const [items, total] = await Promise.all([
    prisma.catalogItem.findMany({
      where,
      orderBy: { name: "asc" },
      skip: (page - 1) * 10,
      take: 10,
      include: {
        packageItems: {
          include: { item: true },
        },
      },
    }),
    prisma.catalogItem.count({ where }),
  ]);
  
  const stats = await prisma.catalogItem.groupBy({
    by: ["type"],
    where: { barbershopId, active: true },
    _count: { id: true },
  });

  const getStatCount = (t: CatalogItemType) =>
    stats?.find((s) => s.type === t)?._count?.id ?? 0;

  const statsPacket = [
    {
      label: "Serviços ativos",
      value: String(getStatCount("SERVICE")),
      sub: "no catálogo",
      icon: Scissors,
      danger: false,
    },
    {
      label: "Pacotes ativos",
      value: String(getStatCount("PACKAGE")),
      sub: "disponíveis",
      icon: Package,
      danger: false,
    },
  ];

  return { items: JSON.parse(JSON.stringify(items)), total, statsPacket };
};

export default getCatalog;
