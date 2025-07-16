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
    <section className="w-full flex flex-col items-center justify-center gap-[162px] mt-[124px]">
      <Button
        variant="ghost"
        className="ml-[50px] self-start w-fit hover:bg-white/10"
      >
        <ChevronLeft color="#ffffff" className="w-[14px] h-[30px]" />
      </Button>

      <BaseTab
        activeTab={activeTab}
        setActiveTab={setActiveTabState}
        tabs={account_tabs}
      />
    </section>
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
    image: "/assets/harmburger/round-user.png",
    name: "Payout",
    element: <PayoutTab />,
  },
  {
    value: "settings",
    image: "/assets/harmburger/round-user.png",
    name: "Settings",
    element: <SettingsTab />,
  },
  {
    value: "support",
    image: "/assets/harmburger/round-user.png",
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
