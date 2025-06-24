import { BaseDropdown } from "@/components/reusable";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function LoginButton() {
  const { openAuthModal } = useAuth();

  return (
    <BaseDropdown
      trigger={
        <Button className="h-6 w-[48px] rounded-[4px] bg-white text-[10px] text-black font-sf-pro-rounded hover:bg-white/90">
          Log In
        </Button>
      }
      items={[
        {
          label: "Guest",
          onClick: () => openAuthModal("login", "guest"),
        },
        {
          label: "Creator",
          onClick: () => openAuthModal("login", "creator"),
        },
        {
          label: "Vendor",
          onClick: () => openAuthModal("login", "vendor"),
        },
      ]}
    />
  );
}
