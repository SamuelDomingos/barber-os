import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Stepper } from "../../_stepper/define";
import {
  MapPinIcon,
  BuildingIcon,
  GlobeIcon,
  MailboxIcon,
  NavigationIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import useViaCep from "../../_hooks/steps/useViaCep";
import { Spinner } from "@/components/ui/spinner";

const Steps2 = ({ form }: { form: UseFormReturn<OnboardingFormData> }) => {
  const { fetchCep, isLoadingCep } = useViaCep({ form });

  return (
    <Stepper.Panel>
      <Form {...form}>
        <form className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    CEP{" "}
                    <span className="text-muted-foreground text-xs">
                      (opcional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      {isLoadingCep ? (
                        <Spinner />
                      ) : (
                        <MailboxIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      )}
                      <Input
                        {...field}
                        placeholder="00000-000"
                        className="pl-9"
                        maxLength={9}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .replace(/(\d{5})(\d)/, "$1-$2")
                            .slice(0, 9);
                          field.onChange(value);
                          if (value.length === 9) fetchCep(value);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxDistancia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distância máxima (km)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <NavigationIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type="number"
                        placeholder="100"
                        className="pl-9"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input {...field} placeholder="Brasil" className="pl-9" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input {...field} placeholder="SP" className="pl-9" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <div className="relative">
                    <BuildingIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder="São Paulo"
                      className="pl-9"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input {...field} placeholder="Rua" className="pl-9" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Numero"
                        className="pl-9"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </Stepper.Panel>
  );
};

export default Steps2;
