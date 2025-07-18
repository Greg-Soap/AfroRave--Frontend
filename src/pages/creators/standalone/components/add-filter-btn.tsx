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
        <Button variant="ghost" className="gap-2 p-2.5 hover:bg-black/10">
          <img src={img} alt="Filter" width={20} height={18} />
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
