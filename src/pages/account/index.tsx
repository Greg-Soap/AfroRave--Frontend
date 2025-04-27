import { BaseTab, type ITabProps } from "@/components/reusable/base-tab";
import ProfileTab from "./tabs/profile-tab";

export default function AccountPage() {
  return <BaseTab tab={account_tabs} />;
}

const account_tabs: ITabProps[] = [
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
    element: <ProfileTab />,
  },
  {
    value: "settings",
    image: "/assets/harmburger/round-user.png",
    name: "Settings",
    element: <ProfileTab />,
  },
  {
    value: "support",
    image: "/assets/harmburger/round-user.png",
    name: "Support",
    element: <ProfileTab />,
  },
];
