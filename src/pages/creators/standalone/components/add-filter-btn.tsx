import { Button } from "@/components/ui/button";
import { BaseDropdown } from "@/components/reusable";
import { UserIcon, SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AddFilterBUtton({
  img = "/assets/dashboard/creator/filter.png",
  className,
}: {
  className?: string;
  img?: string;
}) {
  return (
    <BaseDropdown
      trigger={
        <Button variant="outline" className="gap-2 px-3 h-9 border border-gray-300 bg-white hover:bg-gray-50 rounded-[6px]">
          <img src={img} alt="Filter" width={16} height={14} />
          <span
            className={cn(
              "font-medium text-xs font-sf-pro-rounded text-black",
              className
            )}
          >
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
