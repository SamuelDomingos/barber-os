import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import HeaderBarber from "./_components/headerBarber/header";

export default async function LayoutPages({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <HeaderBarber />
        <main className="flex-1 overflow-y-auto h-full container mx-auto p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
