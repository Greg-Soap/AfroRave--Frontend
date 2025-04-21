import Footer from "@/components/custom/footer";
import Header from "@/components/custom/header";
import { Outlet } from "react-router-dom";

export default function IndexLayout() {
  return (
    <>
      <Header />

      <main className="w-full flex flex-col items-center">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
