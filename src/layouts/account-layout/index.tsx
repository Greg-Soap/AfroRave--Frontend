import { Outlet } from "react-router-dom";
import AccountHeader from "./header";
import AccountFooter from "./footer";

export default function AccountLayout() {
  return (
    <>
      <div className="w-full flex flex-col items-center bg-pure-black">
        <AccountHeader />

        <main className="w-full flex flex-col items-center">
          <Outlet />
        </main>

        <AccountFooter />
      </div>
    </>
  );
}
