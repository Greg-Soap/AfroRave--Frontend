import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProfileTab from "@/pages/fans/account/tabs/profile-tab";
import WalletTab from "@/pages/fans/account/tabs/wallet-tab";
import SupportTab from "@/pages/fans/account/tabs/support-tab";

export function useAccountTab() {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const accountParam = searchParams.get("account");

    if (
      accountParam === "profile" ||
      accountParam === "wallet" ||
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
    value: "wallet",
    image: "/assets/harmburger/payout.png",
    name: "Wallet",
    element: <WalletTab />,
  },
  {
    value: "support",
    image: "/assets/harmburger/support.png",
    name: "Support",
    element: <SupportTab />,
  },
];

interface IAccountTab {
  value: "profile" | "wallet" | "settings" | "support";
  image: string;
  name: string;
  element: React.ReactNode;
}
