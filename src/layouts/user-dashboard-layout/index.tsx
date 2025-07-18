import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth-context";
import { AuthModal } from "@/components/auth/auth-modal";
import AccountHeader from "./header";
import AccountFooter from "./footer";

export default function UserDashboardLayout() {
  return (
    <AuthProvider>
      <div className="w-full min-h-screen flex flex-col items-center bg-pure-black">
        <AccountHeader />
        <AuthModal />

        <main className="w-full min-h-[calc(100vh-250px)] flex flex-col items-center">
          <Outlet />
        </main>

        <AccountFooter />
      </div>
    </AuthProvider>
  );
}
