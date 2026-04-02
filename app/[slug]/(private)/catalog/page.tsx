import GridCards from "@/components/gridCards";
import CatalogTable from "./_components/catalogTable";
import { Card, CardContent } from "@/components/ui/card";
import CatalogFilters from "./_components/catalogFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CatalogDialog from "./_components/catalogDialog";
import { CatalogItemType } from "@/generated/enums";
import getCatalog from "./_services/getCatalog";

const PageCatalog = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    type?: CatalogItemType;
    active?: string;
  }>;
}) => {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const search = params.search ?? "";
  const type = (params.type as CatalogItemType) ?? undefined;
  const active =
    params.active === "false"
      ? false
      : params.active === "true"
        ? true
        : undefined;

  const data = await getCatalog(page, search, type, active);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-lg font-medium">Catálogo</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gerencie serviços, produtos e pacotes da barbearia
          </p>
        </div>

        <GridCards stats={data?.statsPacket ?? []} />

        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center justify-end mb-4">
              <div className="flex items-center gap-2">
                <CatalogFilters
                  type={type}
                  search={search}
                  active={params.active}
                />
                <CatalogDialog
                  trigger={
                    <Button size="sm" className="h-8 gap-1.5 text-sm">
                      <Plus size={14} />
                      Novo item
                    </Button>
                  }
                />
              </div>
            </div>

            <CatalogTable
              type={type}
              data={data?.items}
              total={data?.total ?? 0}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PageCatalog;
