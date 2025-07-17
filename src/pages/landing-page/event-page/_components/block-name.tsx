export function BlockName({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <p
      className={`text-2xl font-sf-pro-display font-black tracking-[-0.25px] text-white uppercase ${className}`}
    >
      {name}
    </p>
  );
}
