import Footer from "@/components/custom/footer";
import Header from "@/components/custom/header";
import { Outlet } from "react-router-dom";
import UserLogin from "@/pages/auth/user-login";

export default function IndexLayout() {
  return (
    <>
      <Header />
      <UserLogin />

      <main className="w-full flex flex-col items-center">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
