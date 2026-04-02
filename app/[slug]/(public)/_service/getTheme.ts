import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getTheme = unstable_cache(
  async (slug: string) => {
    return prisma.barbershop.findUnique({
      where: { slug },
      select: {
        themeConfig: { select: { style: true } },
      },
    });
  },
  ["barbershop-theme"],
  { revalidate: 3600 },
);

export default getTheme;