"use client";

import "@/styles/barberShop.css";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { THEMES } from "@/styles/themes";

const OnboardingInner = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div className={cn("min-h-screen transition-all duration-500", theme)}>
      {children}
    </div>
  );
};


export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="clean-slate"
      themes={THEMES.map((t) => t.id)}
      enableSystem={false}
    >
      <OnboardingInner>{children}</OnboardingInner>
    </ThemeProvider>
  );
}
