import { Button } from "@/components/ui/button";
import { BaseCarousel } from "@/components/reusable/base-carousel";
import { Link } from "react-router-dom";

interface AfroCarouselProps {
  items: {
    id: string;
    image: string;
    alt: string;
  }[];
  buttonText?: string;
  buttonLink?: string;
}

export function AfroCarousel({
  items,
  buttonText = "Find Tickets",
  buttonLink = "/events",
}: AfroCarouselProps) {
  const carouselItems = items.map((item) => ({
    id: item.id,
    content: (
      <img
        src={item.image}
        alt={item.alt}
        className="w-full  object-cover object-center h-screen"
      />
    ),
  }));

  return (
    <section className="relative w-full min-h-screen">
      <div className="w-full min-h-screen">
        <BaseCarousel
          items={carouselItems}
          className="w-full min-h-screen"
          itemClassName="h-full"
          indicatorsPosition="bottom-38"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/10 to-transparent" />

      <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col w-fit items-center bottom-24 gap-5 z-[9999]">
        <Button
          asChild
          className="w-[196px] h-8 bg-light-silver text-black text-sm font-input-mono hover:bg-white"
        >
          <Link to={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
}
