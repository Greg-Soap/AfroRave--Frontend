import { Button } from "@/components/ui/button";

export default function SupportPage() {
  return (
    <>
      <div className="w-full flex flex-col items-end py-2.5 px-8">
        <Button className="p-3 bg-charcoal rounded-[8px] text-sm font-sf-pro-display">
          Contact Us
        </Button>
      </div>

      <div className="w-full h-[389px] flex gap-7 px-24 items-center justify-center">
        {support.map((item) => (
          <SupportCard key={item.heading} {...item} />
        ))}
      </div>
    </>
  );
}

function SupportCard({ src, alt, heading, content }: ISupport) {
  return (
    <div className="w-[320px] h-[120px] flex flex-col gap-1 items-center justify-center py-3 px-5 bg-white rounded-[8px] font-sf-pro-display text-black">
      <div className="flex gap-0.5 items-center">
        <img src={src} alt={alt} width={18} height={18} />
        <p className="font-semibold capitalize">{heading}</p>
      </div>
      <p className="text-sm text-center">{content}</p>
    </div>
  );
}

const support: ISupport[] = [
  {
    src: "/assets/support/sp1.png",
    alt: "Bolt",
    heading: "creator support",
    content: "Support for afro revive vendors & event organizers",
  },
  {
    src: "/assets/support/sp2.png",
    alt: "User",
    heading: "fan support",
    content: "Support for ticket purchasers",
  },
];

interface ISupport {
  src: string;
  alt: string;
  heading: string;
  content: string;
}
