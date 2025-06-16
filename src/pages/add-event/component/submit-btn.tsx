import { Button } from "@/components/ui/button";

export function SubmitBtn() {
  return (
    <div className="flex items-center justify-center py-8">
      <Button
        type="submit"
        variant="destructive"
        className="w-[240px] h-10 rounded-[8px] pt-[13px] px-[153px] text-xs font-sf-pro-text uppercase"
      >
        Continue
      </Button>
    </div>
  );
}
