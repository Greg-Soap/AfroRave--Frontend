import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth-context";
import { AuthModal } from "@/components/auth/auth-modal";
import Header from "./sections/header";
import Footer from "./sections/footer";

export default function CreatorsLandingPageLayout() {
  return (
    <div className="w-full h-full bg-mid-gray">
      <AuthProvider>
        <Header />
        <AuthModal />

        <main className="w-full min-h-screen flex flex-col items-center gap-[200px] bg-mid-gray">
          <Outlet />
        </main>

        <Footer />
      </AuthProvider>
    </div>
  );
}
