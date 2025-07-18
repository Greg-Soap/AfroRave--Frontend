import ProfileTab from "./tabs/profile-tab";
import PayoutTab from "./tabs/payout-tab";
import { ChevronLeft } from "lucide-react";
import SettingsTab from "./tabs/settings-tab";
import SupportTab from "./tabs/support-tab";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BaseTab } from "@/components/reusable/base-tab";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const accountParam = searchParams.get("account");

    if (
      accountParam === "profile" ||
      accountParam === "payout" ||
      accountParam === "settings" ||
      accountParam === "support"
    ) {
      setActiveTab(accountParam);
    } else {
      setActiveTab("profile");
      setSearchParams({ account: "profile" });
    }
  }, [searchParams]);

  const setActiveTabState = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ account: tab });
  };
  return (
    <section className="w-full flex flex-col items-center justify-center gap-10 md:gap-[162px] mt-[124px] max-md:px-5">
      <Button
        variant="ghost"
        className="md:ml-[50px] self-start w-fit hover:bg-white/10"
      >
        <ChevronLeft color="#ffffff" className="w-[14px] h-[30px]" />
      </Button>

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
  return (
    <Button
      variant="ghost"
      className="w-full py-7 border-t border-white flex justify-start items-center gap-2 rounded-none opacity-50 hover:opacity-100 hover:bg-white/20"
    >
      <img
        src="/assets/harmburger/logout.png"
        alt="Logout"
        width={17}
        height={18}
        className="opacity-60 group-hover:opacity-100 group-data-[state=active]:opacity-100"
      />

      <span className="opacity-60 group-hover:opacity-100 group-data-[state=active]:opacity-100">
        LOGOUT
      </span>
    </Button>
  );
}

const account_tabs: IAccountTab[] = [
  {
    value: "profile",
    image: "/assets/harmburger/round-user.png",
    name: "Profile",
    element: <ProfileTab />,
  },
  {
    value: "payout",
    image: "/assets/harmburger/payout.png",
    name: "Payout",
    element: <PayoutTab />,
  },
  {
    value: "support",
    image: "/assets/harmburger/support.png",
    name: "Support",
    element: <SupportTab />,
  },
];

interface IAccountTab {
  value: "profile" | "payout" | "settings" | "support";
  image: string;
  name: string;
  element: React.ReactNode;
}
