import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProfileTab from "@/pages/fans/account/tabs/profile-tab";
import PayoutTab from "@/pages/fans/account/tabs/payout-tab";
import SupportTab from "@/pages/fans/account/tabs/support-tab";

export function useAccountTab() {
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
  }, [searchParams, setSearchParams]);

  const setActiveTabState = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ account: tab });
  };

  return { activeTab, setActiveTabState, account_tabs };
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
