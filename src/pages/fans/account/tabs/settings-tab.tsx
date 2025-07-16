import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function SettingsTab() {
  return (
    <div className="max-w-[366px] w-full flex flex-col gap-[77px] pb-[324px]">
      <div className="flex space-x-2">
        <Checkbox id="updates" />
        <label
          htmlFor="updates"
          className="text-[15px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-phosphate uppercase"
        >
          keep me updated with afro revive News letter and special offers!
        </label>
      </div>

      <Button className="w-full h-[58px] rounded-[5px] opacity-70 font-input-mono text-[15px] font-light text-deep-red bg-white hover:bg-white/90">
        Delete Account
      </Button>
    </div>
  );
}
