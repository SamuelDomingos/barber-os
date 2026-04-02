// _hooks/useViaCep.ts
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "./useOnboardingForm";
import { useState } from "react";

const useViaCep = ({ form }: { form: UseFormReturn<OnboardingFormData> }) => {
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const fetchCep = async (cep: string) => {
    const cleaned = cep.replace(/\D/g, "");
    if (cleaned.length !== 8) return;

    setIsLoadingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
      const data = await res.json();

      if (data.erro) {
        form.setError("postalCode", { message: "CEP não encontrado" });
        return;
      }

      form.setValue("address", data.logradouro || "", { shouldValidate: true });
      form.setValue("city", data.localidade || "", { shouldValidate: true });
      form.setValue("state", data.uf || "", { shouldValidate: true });
      form.setValue("country", "Brasil", { shouldValidate: true });
      form.clearErrors("postalCode");
    } catch {
      form.setError("postalCode", { message: "Erro ao buscar CEP" });
    } finally {
      setIsLoadingCep(false);
    }
  };

  return { fetchCep, isLoadingCep };
};

export default useViaCep;