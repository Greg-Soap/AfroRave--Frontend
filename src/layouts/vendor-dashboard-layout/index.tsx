import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import VendorSidebar from "./sections/vendor-side-bar";
import VendorDashboardHeader from "./sections/header";

import { useAfroStore } from "@/stores";
import { useEffect } from "react";

export default function VendorDashboardLayout() {
  const { user, setAuth } = useAfroStore();

  useEffect(() => {
    // Inject mock data if user is missing or doesn't have the correct business name for dev purposes
    if (!user || user.businessName !== "Sooyah Bistro") {
      setAuth({
        userId: "vendor-123",
        email: "eseoseatie22@icloud.com",
        accountType: "Vendor",
        profile: {
          firstName: "Favour",
          lastName: "Eseose Atie",
        },
        businessName: "Sooyah Bistro",
        vendorType: "Food & Drinks",
        telphone: "+234 814 602 7405",
        gender: "Female",
        description: "",
        profilePicture: "",
        gallery: [],
        messages: 6,
        createdAt: "2025-04-01T00:00:00.000Z",
        portfolio: "https://sooyahbistro.com/portfolio",
        socialLinks: {
          instagram: "https://instagram.com/sooyahbistro",
          twitter: "https://x.com/sooyahbistro"
        },
        website: "https://sooyahbistro.com",
      }, "mock-token-123");
    }
  }, [user, setAuth]);

  return (
    <SidebarProvider className="w-full flex flex-col items-center bg-light-gray">
      <VendorDashboardHeader />

      <main className="relative w-full flex">
        <VendorSidebar />

        <SidebarTrigger className="absolute flex md:hidden top-[60px] left-2 text-black" />

        <div className="w-full flex flex-col items-center justify-center">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
