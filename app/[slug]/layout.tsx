import getTheme from "./(public)/_service/getTheme";
import "@/styles/barberShop.css";
import ThemeWrapper from "./_components/themeWrapper";
import { redirect } from "next/navigation";

export default async function LayoutSlug({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const barbershop = await getTheme(slug);

  if (!barbershop) redirect("/");

  const style = barbershop.themeConfig?.style ?? "clean-slate";

  return (
      <ThemeWrapper style={style}>
        <main>
          {children}
        </main>
      </ThemeWrapper>
  );
}
