import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "./useOnboardingForm";

const useGenerateSlug = ({ form }: { form: UseFormReturn<OnboardingFormData> }) => {
  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();

  const name = form.watch("name");
  const slug = form.watch("slug");

  const previewUrl = slug ? `seusite.com/${slug}` : "seusite.com/nome-da-empresa";

  useEffect(() => {
    form.setValue("slug", generateSlug(name), { shouldValidate: true });
  }, [name]);

  return {
    previewUrl,
  };
};

export default useGenerateSlug;