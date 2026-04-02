"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import LoginForm from "./molecules/loginForm";
import RegisterForm from "./molecules/registerForm";

const AuthForm = ({ context }: { context: "barbershop" | "client" }) => {
  const searchParams = useSearchParams();
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const router = useRouter();
  const mode = searchParams.get("mode") === "register" ? "register" : "login";

  return (
    <div className="flex flex-col gap-6">
      {mode === "login" ? (
        <LoginForm context={context} />
      ) : (
        <RegisterForm context={context} />
      )}

      <p className="text-sm text-muted-foreground text-center">
        {mode === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
        <button
          className="text-foreground underline underline-offset-4"
          onClick={() => {
            const base = context === "client" ? `/${slug}/auth` : `/auth`;
            const newMode = mode === "login" ? "register" : "login";
            router.push(`${base}?mode=${newMode}`);
          }}
        >
          {mode === "login" ? "Criar conta" : "Entrar"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
