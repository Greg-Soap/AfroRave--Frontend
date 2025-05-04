import { BaseTab, type ITabProps } from "@/components/reusable/base-tab";
import ProfileTab from "./tabs/profile-tab";
import PayoutTab from "./tabs/payout-tab";
import { ChevronLeft } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-[162px] mt-[124px]">
      <ChevronLeft
        width={14}
        height={30}
        color="#ffffff"
        className="!w-[14px] !h-[30px] self-start ml-[50px]"
      />

      <BaseTab tab={account_tabs} />
    </div>
  );
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
    element: <PayoutTab />,
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
