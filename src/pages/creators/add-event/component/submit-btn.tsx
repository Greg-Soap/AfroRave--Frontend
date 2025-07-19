import { Button } from "@/components/ui/button";

export function SubmitBtn({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8 justify-center py-8">
      {children}

      <Button
        type="submit"
        variant="destructive"
        className="w-full md:w-[240px] h-10 rounded-[8px] pt-[13px] px-[153px] text-xs font-sf-pro-text uppercase"
      >
        Continue
      </Button>
    </div>
  );
}
