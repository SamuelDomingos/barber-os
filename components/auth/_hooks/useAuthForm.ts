"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema, registerSchema } from "../_schema/authForm";
import z from "zod";
import { registerBarberShop } from "@/lib/api/registerBarberShop";
import { registerClient } from "@/lib/api/registerClient";
import { toast } from "sonner";

export const useAuthForm = (
  mode: "login" | "register",
  context: "barbershop" | "client",
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const redirectAfterAuth = async () => {
    const session = await getSession();

    if (context === "client") {
      router.push(`/${slug}`);
      return;
    }

    if (session?.user?.slug) {
      router.push(`/${session.user.slug}/dashboard`);
    } else {
      router.push("/auth/onboarding");
    }
  };

  const onLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        context,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result?.error);
        return;
      }

      toast.success("Login realizado com sucesso!");
      await redirectAfterAuth();
    } catch {
      toast.error("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...rest } = values;

      if (context === "barbershop") {
        await registerBarberShop(rest);
      } else {
        await registerClient(rest);
      }

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      toast.success("Conta criada com sucesso!");
      await redirectAfterAuth();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginForm,
    registerForm,
    isLoading,
    onSubmit:
      mode === "login"
        ? loginForm.handleSubmit(onLogin)
        : registerForm.handleSubmit(onRegister),
  };
};
