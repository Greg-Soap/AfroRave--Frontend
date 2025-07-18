import { Outlet } from "react-router-dom";
import CreatorDashboardHeader from "./header";
import { SidebarProvider } from "@/components/ui/sidebar";
import CreatorSidebar from "./creator-side-bar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function CreatorDashboardLayout() {
  return (
    <SidebarProvider className="w-full flex flex-col items-center bg-light-gray">
      <CreatorDashboardHeader />

      <main className="relative w-full flex">
        <CreatorSidebar />

        <SidebarTrigger className="absolute flex md:hidden top-[60px] left-2 text-black" />

        <div className="w-full flex flex-col items-center justify-center">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
