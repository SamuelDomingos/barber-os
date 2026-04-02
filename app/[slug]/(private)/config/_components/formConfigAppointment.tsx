"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { TimeInput } from "@/components/ui/time-input";
import { Moon } from "lucide-react";
import useFormConfig from "../_hooks/useFormConfig";
import { days } from "../_types/days";
import { minutesToTimeValue, timeValueToMinutes } from "@/helpers/time";
import { ConfigAppointmentBarber, WorkingHours } from "@/generated/client";

const FormConfigAppointment = ({
  data,
}: {
  data: {
    config: ConfigAppointmentBarber;
    workingHours: WorkingHours[];
  };
}) => {
  const { form, onSubmit, onCancel } = useFormConfig(data ?? undefined);

  const autoAdjust = form.watch("autoAdjustVisibleHours");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-6 space-y-6 max-w-4xl mx-auto"
      >
        <h1 className="text-2xl font-bold">Configurações de Agenda</h1>

        <Card>
          <CardHeader>
            <CardTitle>Configurações Gerais</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="slotInterval"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-base font-normal">
                    Intervalo de horários (minutos)
                  </FormLabel>
                  <div className="flex flex-col items-end gap-1">
                    <FormControl>
                      <Input
                        type="number"
                        className="w-24 text-right"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="autoAdjustVisibleHours"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-base font-normal">
                    Ajustar horário visível automaticamente
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {!autoAdjust && (
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="visibleStartMinutes"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Início visível</FormLabel>
                      <FormControl>
                        <TimeInput
                          value={
                            field.value != null
                              ? minutesToTimeValue(field.value)
                              : null
                          }
                          onChange={(v) =>
                            field.onChange(v ? timeValueToMinutes(v) : null)
                          }
                          hourCycle={24}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="visibleEndMinutes"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Fim visível</FormLabel>
                      <FormControl>
                        <TimeInput
                          value={
                            field.value != null
                              ? minutesToTimeValue(field.value)
                              : null
                          }
                          onChange={(v) =>
                            field.onChange(v ? timeValueToMinutes(v) : null)
                          }
                          hourCycle={24}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Horários de Funcionamento</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {days.map((day, index) => (
              <div
                key={day}
                className="flex items-center gap-4 border p-3 rounded-xl"
              >
                <div className="w-28 font-medium">{day}</div>

                <FormField
                  control={form.control}
                  name={`workingDays.${index}.isOpen`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch(`workingDays.${index}.isOpen`) ? (
                  <div className="flex gap-2 items-start">
                    <FormField
                      control={form.control}
                      name={`workingDays.${index}.startMinutes`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TimeInput
                              value={minutesToTimeValue(field.value)}
                              onChange={(v) =>
                                field.onChange(timeValueToMinutes(v))
                              }
                              hourCycle={24}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <span className="pt-2 text-muted-foreground">até</span>

                    <FormField
                      control={form.control}
                      name={`workingDays.${index}.endMinutes`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TimeInput
                              value={minutesToTimeValue(field.value)}
                              onChange={(v) =>
                                field.onChange(timeValueToMinutes(v))
                              }
                              hourCycle={24}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Moon className="w-4 h-4" />
                    <span>Fechado</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Salvar alterações
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormConfigAppointment;
