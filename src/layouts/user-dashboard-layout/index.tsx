import { Outlet } from "react-router-dom";
import AccountHeader from "./header";
import AccountFooter from "./footer";

export default function UserDashboardLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-pure-black">
      <AccountHeader />

      <main className="w-full min-h-[calc(100vh-250px)] flex flex-col items-center">
        <Outlet />
      </main>

      <AccountFooter />
    </div>
  );
}
