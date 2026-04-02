"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { postCatalog, putCatalog } from "@/lib/api/catalog";
import { CatalogItem } from "@/lib/api/types/catalog";
import { FormValues, Tab } from "../_types/catalogComponentType";
import { defaultValues, schemas } from "../_schema/form";
import useImageUpload from "@/hooks/useImageUpload";
import z from "zod";

const useFormCatalog = ({
  tab,
  data,
  isEditing,
  onSuccess,
}: {
  tab: Tab;
  data?: CatalogItem;
  isEditing?: boolean;
  onSuccess?: () => void;
}) => {
  const { data: session } = useSession();
  const barbershopId = session?.user?.barbershopId;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schemas[tab]),
    defaultValues: defaultValues[tab],
  });

  const { fileInputRef, imagePreview, handleImageChange, resetPreview } =
    useImageUpload({ form, fieldName: "image" });

  useEffect(() => {
    if (isEditing && data) {
      form.reset({
        name: data.name,
        description: data.description ?? "",
        price: Number(data.price),
        active: data.active,
        category: data.category ?? "",
        ...(tab === "SERVICE" && { duration: data.duration ?? 30 }),
        ...(tab === "PACKAGE" && {
          items:
            data.packageItems?.map((pi) => ({
              itemId: pi.item.id,
            })) ?? [],
        }),
      });
      resetPreview(data.image ?? null);
    } else {
      form.reset(defaultValues[tab]);
      resetPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, data?.id, tab]);

  const handleSubmit = async (values: z.infer<typeof schemas[typeof tab]>) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description ?? "");
      formData.append("price", String(values.price));
      formData.append("active", String(values.active));
      formData.append("type", tab);
      formData.append("category", values.category ?? "");
      if (barbershopId) formData.append("barbershopId", barbershopId);
      if (values.image instanceof File) formData.append("image", values.image);

      if (tab === "SERVICE" && "duration" in values)
        formData.append("duration", String(values.duration));
      if (tab === "PACKAGE" && "items" in values)
        formData.append("items", JSON.stringify(values.items));

      if (isEditing && data?.id) {
        await putCatalog(data.id, formData);
      } else {
        await postCatalog(formData);
        form.reset(defaultValues[tab]);
      }

      toast.success(
        isEditing ? "Atualizado com sucesso" : "Criado com sucesso",
      );
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao salvar");
    } finally {
      setIsLoading(false);
    }
  };

  // const servicesFetchOptions = useMemo(
  //   () => ({
  //     auto: tab === "PACKAGE" && !!barbershopId,
  //     defaultArgs: [barbershopId!, "SERVICE" as never, 1] as const,
  //   }),
  //   [tab, barbershopId],
  // );

  // const productsFetchOptions = useMemo(
  //   () => ({
  //     auto: tab === "PACKAGE" && !!barbershopId,
  //     defaultArgs: [barbershopId!, "PRODUCT" as never, 1] as const,
  //   }),
  //   [tab, barbershopId],
  // );

  // const { data: servicesData } = useFetch(getCatalog, servicesFetchOptions);
  // const { data: productsData } = useFetch(getCatalog, productsFetchOptions);

  // const availableItems = [
  //   ...(servicesData?.data ?? []),
  //   ...(productsData?.data ?? []),
  // ];

  return {
    form,
    isLoading,
    imagePreview,
    fileInputRef,
    // availableItems,
    handleImageChange,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};

export default useFormCatalog;
