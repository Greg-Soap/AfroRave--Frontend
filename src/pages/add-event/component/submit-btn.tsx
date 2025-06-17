import { Button } from "@/components/ui/button";

export function SubmitBtn({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-8 justify-center py-8">
      {children}

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
