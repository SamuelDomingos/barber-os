"use client";

import { CartProvider } from "@/contexts/cartContext";

const CartProviderWrapper = ({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) => {
  return <CartProvider slug={slug}>{children}</CartProvider>;
};

export default CartProviderWrapper;
