import { defineStepper } from "@/components/ui/stepper";

export const { Stepper } = defineStepper(
  { id: "step-1", title: "Nome da Barbearia" },
  { id: "step-2", title: "Endereço" },
  { id: "step-3", title: "Tema da Barbearia" },
  { id: "step-4", title: "Concluido!" },
);

export type StepId = "step-1" | "step-2" | "step-3" | "step-4";