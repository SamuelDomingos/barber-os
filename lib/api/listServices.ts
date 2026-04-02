export const getListServices = async (
  barbershopId: string,
  search?: string,
): Promise<{
  items: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    duration: number;
  }[];
}> => {
  const params = new URLSearchParams({
    barbershopId,
    ...(search && { search }),
  });

  const response = await fetch(
    `/api/catalog/listServices?${params.toString()}`,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao buscar catálogo");
  }

  return response.json();
};
