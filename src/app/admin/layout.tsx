import type { ReactNode } from "react";
import { AppSidebar } from "../components/admin/sideBar";
import { SidebarProvider } from "../components/ui/sidebar";
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
<div className="flex min-h-screen overflow-x-hidden">
        <AppSidebar className="w-64 border-r" />
<main className="flex-1 min-w-0 w-full bg-white">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
