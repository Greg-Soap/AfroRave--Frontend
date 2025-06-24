import { AuthProvider } from "@/contexts/auth-context";
import { AuthModal } from "@/components/auth/auth-modal";
import { Outlet } from "react-router-dom";
import SupportFooter from "./sections/footer";
import SupportHeader from "./sections/header";
import SearchHelp from "./sections/search-help";

export default function SupportLayout() {
  return (
    <AuthProvider>
      <SupportHeader />
      <AuthModal />

      <main className="w-full flex flex-col items-center bg-[#f8f8f8] pb-[62px]">
        <SearchHelp />

        <Outlet />
      </main>

      <SupportFooter />
    </AuthProvider>
  );
}
