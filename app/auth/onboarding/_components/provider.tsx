"use client";

import { Button } from "@/components/ui/button";
import { Stepper } from "../_stepper/define";
import Steps1 from "./steps/steps-1";
import useOnboardingForm from "../_hooks/useFormsOnboarding";
import Steps2 from "./steps/steps-2";
import Steps3 from "./steps/steps-3";
import Steps4 from "./steps/steps-4";

export const Provider = () => {
  const { form, isLoading, handleNext } = useOnboardingForm();
  return (
    <Stepper.Provider className="space-y-4">
      {({ methods }) => (
        <>
          <Stepper.Navigation>
            {methods.all.map((step) => (
              <Stepper.Step key={step.id} of={step.id}>
                <Stepper.Title>{step.title}</Stepper.Title>
              </Stepper.Step>
            ))}
          </Stepper.Navigation>
          {methods.switch({
            "step-1": () => <Steps1 form={form} />,
            "step-2": () => <Steps2 form={form} />,
            "step-3": () => <Steps3 form={form} />,
            "step-4": () => <Steps4 form={form} />,
          })}
          <Stepper.Controls>
            {!methods.isLast && (
              <Button
                type="button"
                variant="secondary"
                onClick={methods.prev}
                disabled={methods.isFirst}
              >
                Voltar
              </Button>
            )}
            <Button
              type="button"
              disabled={isLoading}
              onClick={() =>
                handleNext(methods.current.id, methods.next, methods.isLast)
              }
            >
              {isLoading
                ? "Salvando..."
                : methods.current.id === "step-3"
                  ? "Finalizar"
                  : "Continuar"}
            </Button>
          </Stepper.Controls>
        </>
      )}
    </Stepper.Provider>
  );
};
