"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Stepper } from "../../_stepper/define";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "../_hooks/useOnboardingForm";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { THEMES } from "@/styles/themes";
import { useTheme } from "next-themes";

const Steps3 = ({ form }: { form: UseFormReturn<OnboardingFormData> }) => {
  const { setTheme } = useTheme();

  return (
    <Stepper.Panel>
      <Form {...form}>
        <form className="space-y-4 pt-2">
          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Escolha um tema</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 gap-3">
                    {THEMES.map((theme) => {
                      const isSelected = field.value === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => {
                            field.onChange(theme.id);
                            setTheme(theme.id);
                          }}
                          className={cn(
                            "relative rounded-lg border-2 p-3 text-left transition-all",
                            isSelected
                              ? "border-primary shadow-md"
                              : "border-border hover:border-muted-foreground",
                          )}
                        >
                          <div
                            className="mb-2 h-16 w-full rounded-md"
                            style={{ background: theme.preview.background }}
                          >
                            <div className="flex h-full gap-1 p-2">
                              {/* sidebar simulada */}
                              <div
                                className="h-full w-4 rounded-sm opacity-60"
                                style={{ background: theme.preview.card }}
                              />
                              {/* conteúdo simulado */}
                              <div className="flex flex-1 flex-col gap-1">
                                <div
                                  className="h-2 w-3/4 rounded-sm"
                                  style={{ background: theme.preview.primary }}
                                />
                                <div
                                  className="h-2 w-1/2 rounded-sm opacity-40"
                                  style={{ background: theme.preview.primary }}
                                />
                                <div className="mt-auto flex justify-end">
                                  <div
                                    className="h-3 w-8 rounded-sm"
                                    style={{
                                      background: theme.preview.primary,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <p className="text-sm font-medium">{theme.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {theme.description}
                          </p>

                          {isSelected && (
                            <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                              <CheckIcon className="h-3 w-3 text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Stepper.Panel>
  );
};

export default Steps3;
