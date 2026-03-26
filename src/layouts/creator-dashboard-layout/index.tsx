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

        <SidebarTrigger className="absolute flex md:hidden top-[54px] left-3 z-10 text-white bg-deep-red hover:bg-deep-red/90 rounded-lg w-10 h-10 shadow-md [&>svg]:size-5" />

        <div className="w-full flex flex-col items-center justify-center">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
