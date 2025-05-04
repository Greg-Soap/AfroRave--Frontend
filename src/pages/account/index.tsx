import { BaseTab } from "@/components/reusable/base-tab";
import ProfileTab from "./tabs/profile-tab";
import PayoutTab from "./tabs/payout-tab";
import { ChevronLeft } from "lucide-react";
import SettingsTab from "./tabs/settings-tab";
import SupportTab from "./tabs/support-tab";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

  // Call this when changing tabs (e.g., onClick)
  const setActiveTabState = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ account: tab });
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-[162px] mt-[124px]">
      <ChevronLeft
        width={14}
        height={30}
        color="#ffffff"
        className="!w-[14px] !h-[30px] self-start ml-[50px]"
      />

      <BaseTab
        activeTab={activeTab}
        setActiveTab={setActiveTabState}
        tab={account_tabs}
      />
    </div>
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
