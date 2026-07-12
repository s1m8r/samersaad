import { useAuthStore } from "@/stores/userStore";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Toaster } from "sonner";
import SideBar from "@/components/layout/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Route = createFileRoute("/(proteced)")({
  beforeLoad: () => {
    const token = useAuthStore.getState().token;

    if (!token) {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: () => (
    <SidebarProvider>
      <TooltipProvider>
        <SideBar />
        <Outlet />
        <Toaster richColors position="top-center" />
      </TooltipProvider>
    </SidebarProvider>
  ),
});
