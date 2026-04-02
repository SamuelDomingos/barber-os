"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formUserTeam } from "../_schema/form";
import { useSession } from "next-auth/react";
import { postTeam, putTeam } from "@/lib/api/team";
import { toast } from "sonner";
import useImageUpload from "@/hooks/useImageUpload";

type FormData = z.infer<typeof formUserTeam>;

const useFormTeam = ({
  data,
  isEditing,
  onSuccess,
}: {
  data?: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    active: boolean;
  };
  isEditing?: boolean;
  onSuccess?: () => void;
}) => {
  const { data: session } = useSession();
  const barbershopId = session?.user?.barbershopId;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formUserTeam),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      avatar: undefined,
    },
  });

  const {
    fileInputRef,
    imagePreview: avatarPreviewUrl,
    handleImageChange: handleAvatarFileChange,
    resetPreview,
  } = useImageUpload({ form, fieldName: "avatar" });

  useEffect(() => {
    if (isEditing && data) {
      form.reset({
        name: data.name,
        email: data.email,
        phone: data.phone ?? "",
        password: "",
        confirmPassword: "",
      });
      resetPreview(data.avatar ?? null);
    } else {
      form.reset();
      resetPreview(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, data?.id]);

  const handleSubmit = async (values: FormData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone ?? "");
      formData.append("password", values.password);
      formData.append("role", "BARBER");
      if (barbershopId) formData.append("barbershopId", barbershopId);
      if (values.avatar) formData.append("avatar", values.avatar);

      if (isEditing && data?.id) {
        await putTeam(data.id, formData);
      } else {
        await postTeam(formData);
      }

      form.reset();
      toast.success(
        isEditing
          ? "Barbeiro atualizado com sucesso"
          : "Barbeiro cadastrado com sucesso",
      );
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao salvar barbeiro");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    handleAvatarFileChange,
    handleSubmit: form.handleSubmit(handleSubmit),
    avatarPreviewUrl,
    isLoading,
    fileInputRef,
  };
};

export default useFormTeam;
