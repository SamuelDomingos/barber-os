"use client";

import { CatalogItemType } from "@/generated/client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type CartItem = {
  image: string | null;
  id: string;
  name: string;
  type: CatalogItemType;
  description: string | null;
  price: number;
  duration: number | null;
  category: string | null;
};

type CartContextType = {
  items: CartItem[];
  slug: string;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const storageKey = (slug: string) => `cart:${slug}`;

export const CartProvider = ({
  children,
  slug,
}: {
  children: ReactNode;
  slug: string;
}) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(storageKey(slug));
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey(slug), JSON.stringify(items));
  }, [items, slug]);

  const add = (item: CartItem) =>
    setItems((prev) =>
      prev.find((i) => i.id === item.id) ? prev : [...prev, item],
    );

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const clear = () => {
    setItems([]);
    localStorage.removeItem(storageKey(slug));
  };

  return (
    <CartContext.Provider value={{ items, slug, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};