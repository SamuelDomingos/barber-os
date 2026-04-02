import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetch } from "@/hooks/useFetch";
import z from "zod";
import { onboardingSchema } from "../_schema/onboardingShema";
import { createdOnboarding } from "@/lib/api/onBoarding";
import { StepId } from "../_stepper/define";

const useOnboardingForm = () => {
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: "",
      slug: "",
      country: "",
      state: "",
      city: "",
      address: "",
      postalCode: "",
      maxDistancia: 100,
      style: "",
    },
    mode: "onChange",
  });

  const validateStep = async (step: StepId) => {
    const fieldsPerStep: Record<
      string,
      (keyof z.infer<typeof onboardingSchema>)[]
    > = {
      "step-1": ["name", "slug"],
      "step-2": [
        "country",
        "state",
        "city",
        "address",
        "postalCode",
        "maxDistancia",
      ],
      "step-3": ["style"],
    };

    return form.trigger(fieldsPerStep[step]);
  };

  const {
    execute: createBarbershop,
    isLoading,
    error,
  } = useFetch(createdOnboarding, {
    successMessage: "Barbearia criada com sucesso!",
    errorMessage: "Erro ao criar barbearia.",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await createBarbershop(data);
  });

  const handleNext = async (
    currentId: string,
    goNext: () => void,
    isLast: boolean,
  ) => {
    const isValid = await validateStep(currentId as StepId);
    if (!isValid) return;

    if (currentId === "step-3") {
      await onSubmit();
      goNext();
      return;
    }
    if (isLast) return;

    goNext();
  };

  return {
    form,
    onSubmit,
    handleNext,
    validateStep,
    isLoading,
    error,
  };
};

export default useOnboardingForm;
