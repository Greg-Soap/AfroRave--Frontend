import { BaseTab } from "@/components/reusable/base-tab";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-auth";
import { ChevronLeft } from "lucide-react";
import { useAccountTab } from "@/hooks/use-account-tabs";

export default function AccountPage() {
  const { activeTab, setActiveTabState, account_tabs } = useAccountTab();

  return (
    <section className="w-full flex flex-col items-center justify-center gap-10 md:gap-[162px] mt-[124px] max-md:px-5">
      <div className="w-full flex items-center gap-2.5">
        <Button
          variant="ghost"
          className="md:ml-[50px] self-start w-fit hover:bg-white/10"
        >
          <ChevronLeft color="#ffffff" className="w-[14px] h-[30px]" />
        </Button>
      </div>

      <BaseTab
        activeTab={activeTab}
        setActiveTab={setActiveTabState}
        tabs={account_tabs}
        CustomElement={<LogOutBtn />}
      />
    </section>
  );
}

function LogOutBtn() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Button
      variant="ghost"
      className="w-fit md:w-full py-7 md:border-t border-white flex justify-start items-center gap-2 rounded-none opacity-100 md:opacity-50 hover:opacity-100 hover:bg-white/20"
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
    >
      <img
        src="/assets/harmburger/logout.png"
        alt="Logout"
        width={17}
        height={18}
      />

      <span>{logoutMutation.isPending ? "LOGGING OUT..." : "LOGOUT"}</span>
    </Button>
  );
}
