import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Stepper } from "../../_stepper/define";
import { HomeIcon, LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormData } from "../_hooks/useOnboardingForm";
import useGenerateSlug from "../../_hooks/steps/useGenerateSlug";

const Steps1 = ({ form }: { form: UseFormReturn<OnboardingFormData> }) => {
  const { previewUrl } = useGenerateSlug({ form });

  return (
    <Stepper.Panel>
      <Form {...form}>
        <form className="space-y-4 pt-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da empresa</FormLabel>
                <FormControl>
                  <div className="relative">
                    <HomeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      {...field}
                      type="text"
                      placeholder="Nome da sua empresa aqui..."
                      className="pl-9"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link da empresa</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      {...field}
                      readOnly
                      className="pl-9 text-muted-foreground bg-muted cursor-not-allowed"
                    />
                  </div>
                </FormControl>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <LinkIcon className="w-3 h-3" />
                  Seu site ficará em:{" "}
                  <span className="font-medium text-foreground">{previewUrl}</span>
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Stepper.Panel>
  );
};

export default Steps1;
