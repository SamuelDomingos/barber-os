"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react";
import { CatalogItemType } from "@/generated/enums";
import { useUrlParams } from "@/hooks/useUrlParams";
import useSearch from "@/hooks/use-Search";

const CatalogFilters = ({
  type,
  search,
  active,
}: {
  type?: CatalogItemType;
  search: string;
  active?: string;
}) => {
  const { updateParams } = useUrlParams();
  const { input, setInput } = useSearch(search);

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Buscar..."
        className="w-48 h-8 text-sm"
        defaultValue={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
            <SlidersHorizontal size={14} />
            Filtros
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            Tipo
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={type ?? "ALL"}
            onValueChange={(v) =>
              updateParams({ type: v === "ALL" ? null : v, page: null })
            }
          >
            <DropdownMenuRadioItem value="ALL">Todos</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="SERVICE">Serviços</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="PRODUCT">Produtos</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="PACKAGE">Pacotes</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            Status
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={active ?? "all"}
            onValueChange={(v) =>
              updateParams({ active: v === "all" ? null : v, page: null })
            }
          >
            <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="true">Ativos</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="false">Inativos</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CatalogFilters;