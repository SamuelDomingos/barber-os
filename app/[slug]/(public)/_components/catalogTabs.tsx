"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSearch from "@/hooks/use-Search";
import { Scissors, Search } from "lucide-react";
import CatalogCard from "./catalogCard";
import { CatalogItemType } from "@/generated/enums";

const CatalogTabs = ({
  categories,
  search,
}: {
  categories: {
    name: string;
    items: {
      image: string | null;
      id: string;
      name: string;
      type: CatalogItemType;
      description: string | null;
      price: number;
      duration: number | null;
      category: string | null;
    }[];
  }[];
  search: string;
}) => {
  const { input, setInput } = useSearch(search);

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar serviço ou produto..."
          className="pl-9 rounded-xl h-11"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Scissors className="w-10 h-10 text-muted-foreground/20" />
          <p className="text-muted-foreground text-sm">
            Nenhum serviço disponível.
          </p>
        </div>
      ) : (
        <Tabs defaultValue={categories[0].name}>
          <TabsList className="flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-xl">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.name}
                value={cat.name}
                className="rounded-lg text-xs"
              >
                {cat.name}
                <span className="ml-1.5 text-muted-foreground text-[10px]">
                  {cat.items.length}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => {
            const filtered = input
              ? cat.items.filter((item) =>
                  item.name.toLowerCase().includes(input.toLowerCase()),
                )
              : cat.items;

            return (
              <TabsContent
                key={cat.name}
                value={cat.name}
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.length === 0 ? (
                  <p className="text-muted-foreground text-center py-10 text-sm col-span-full">
                    Nenhum resultado para &quot;{input}&quot;.
                  </p>
                ) : (
                  filtered.map((item) => (
                    <CatalogCard key={item.id} item={item} />
                  ))
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </div>
  );
};

export default CatalogTabs;
