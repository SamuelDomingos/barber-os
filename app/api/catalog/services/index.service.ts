import { CatalogItemType, Prisma } from "@/generated/client";
import prisma from "@/lib/prisma";

const CatalogService = () => {

  const getServices = async (barbershopId: string, search?: string) => {
    const where: Prisma.CatalogItemWhereInput = {
      barbershopId,
      ...(search && {
        name: { contains: search, mode: "insensitive" },
      }),
      active: true,
      type: "SERVICE",
    };

    const items = await prisma.catalogItem.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        duration: true,
      },
    });

    return { items };
  };

  const getById = async (id: string) => {
    const item = await prisma.catalogItem.findUnique({
      where: { id },
      include: {
        packageItems: {
          include: { item: true },
        },
      },
    });

    if (!item) throw new Error("Item não encontrado");
    return item;
  };

  const post = async (data: {
    name: string;
    description?: string;
    price: number;
    active: boolean;
    type: CatalogItemType;
    barbershopId: string;
    image?: string;
    duration?: number;
    category?: string;
    items?: { itemId: string }[];
  }) => {
    const existing = await prisma.catalogItem.findFirst({
      where: {
        name: data.name,
        barbershopId: data.barbershopId,
        type: data.type,
        active: true,
      },
    });

    if (existing) throw new Error("Já existe um item com esse nome");

    const { items, ...rest } = data;

    return prisma.catalogItem.create({
      data: {
        ...rest,
        ...(data.type === "PACKAGE" && items?.length
          ? {
              packageItems: {
                create: items.map((i) => ({
                  item: { connect: { id: i.itemId } },
                })),
              },
            }
          : {}),
      },
      include: {
        packageItems: { include: { item: true } },
      },
    });
  };

  const put = async (
    id: string,
    data: Partial<{
      name: string;
      description: string;
      price: number;
      active: boolean;
      image: string;
      duration: number;
      category: string;
      items: { itemId: string }[];
    }>,
  ) => {
    const item = await getById(id);
    if (item.type === "SERVICE" && !item.duration) {
      throw new Error("Serviço precisa de duração");
    }

    if (data.name) {
      const existing = await prisma.catalogItem.findFirst({
        where: {
          name: data.name,
          barbershopId: item.barbershopId,
          type: item.type,
          active: true,
          NOT: { id },
        },
      });
      if (existing) throw new Error("Já existe um item com esse nome");
    }

    const { items, ...rest } = data;

    return prisma.catalogItem.update({
      where: { id },
      data: {
        ...rest,
        ...(item.type === "PACKAGE" && items
          ? {
              packageItems: {
                deleteMany: {},
                create: items.map((i) => ({
                  item: { connect: { id: i.itemId } },
                })),
              },
            }
          : {}),
      },
      include: {
        packageItems: { include: { item: true } },
      },
    });
  };

  const remove = async (id: string) => {
    await getById(id);
    return prisma.catalogItem.update({
      where: { id },
      data: { active: false },
    });
  };

  return { get, getServices, getById, post, put, remove };
};

export default CatalogService;
