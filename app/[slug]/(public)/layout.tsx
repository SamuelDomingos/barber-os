import CartProviderWrapper from "./_components/cartProviderWrapper";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CartProviderWrapper slug={slug}>{children}</CartProviderWrapper>;
}