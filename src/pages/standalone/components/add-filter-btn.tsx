import { Button } from "@/components/ui/button";
import { BaseDropdown } from "@/components/reusable";
import { UserIcon, SettingsIcon } from "lucide-react";

export function AddFilterBUtton() {
  return (
    <BaseDropdown
      trigger={
        <Button variant="ghost" className="gap-2 p-2.5 hover:bg-black/10">
          <img
            src="/assets/dashboard/creator/filter.png"
            alt="Filter"
            width={20}
            height={18}
          />
          <span className="font-medium text-xs font-sf-pro-rounded text-black">
            Add Filter
          </span>
        </Button>
      }
      items={[
        { label: "Profile", to: "/profile", icon: <UserIcon /> },
        {
          label: "Settings",
          icon: <SettingsIcon />,
        },
      ]}
    />
  );
}
