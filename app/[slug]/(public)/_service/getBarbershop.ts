import { CatalogItemType } from "@/generated/enums";
import prisma from "@/lib/prisma";

type BarbershopCatalogItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  type: CatalogItemType;
  category: string | null;
  duration: number | null;
};

const getBarbershop = async (slug: string, search: string) => {
  const barbershop = await prisma.barbershop.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      locations: {
        select: {
          city: true,
          state: true,
          country: true,
          address: true,
          numberAddress: true,
          postalCode: true,
        },
      },
      workingHours: {
        select: {
          dayOfWeek: true,
          startMinutes: true,
          endMinutes: true,
          isOpen: true,
        },
        orderBy: { dayOfWeek: "asc" },
      },
      configAppointment: {
        select: { slotInterval: true },
      },
      catalogItems: {
        where: { active: true, type: "SERVICE" },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
          type: true,
          category: true,
          duration: true,
        },
        orderBy: { name: "asc" },
      },
    },
  });

    if (!barbershop) return null;

  return {
    ...barbershop,
    catalogItems: barbershop.catalogItems.map(
      (item): BarbershopCatalogItem => ({
        ...item,
        price: Number(item.price),
      }),
    ),
  };
};

export default getBarbershop;
