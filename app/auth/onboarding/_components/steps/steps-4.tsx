"use client";

import { Stepper } from "../../_stepper/define";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, ExternalLinkIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "../../_hooks/useFormsOnboarding";

const Steps4 = ({ form }: { form: UseFormReturn<OnboardingFormData> }) => {
  const slug = form.getValues("slug");
  const name = form.getValues("name");

  return (
    <Stepper.Panel className="flex flex-col items-center justify-center gap-6 py-10 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <CheckCircleIcon className="h-10 w-10 text-primary" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Tudo pronto, {name}!</h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          Sua barbearia foi configurada com sucesso. Agora você pode acessar seu site e começar a receber clientes.
        </p>
      </div>

      <Button asChild size="lg" className="gap-2">
        <a href={`/${slug}`} target="_blank" rel="noopener noreferrer">
          <ExternalLinkIcon className="h-4 w-4" />
          Acessar meu site
        </a>
      </Button>
    </Stepper.Panel>
  );
};

export default Steps4;