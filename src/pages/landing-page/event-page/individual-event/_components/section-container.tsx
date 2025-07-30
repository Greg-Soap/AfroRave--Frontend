export function SectionContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-lg:flex-col gap-[30px] lg:gap-[120px]  px-5 lg:px-[120px]">
      {children}
    </div>
  );
}
