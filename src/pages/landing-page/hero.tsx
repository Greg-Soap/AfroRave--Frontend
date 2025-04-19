import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import clsx from "clsx";
import { useState, useEffect } from "react";

export default function Hero() {
  const length: number = 7;
  const [activeCarousel, setActiveCarousel] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setActiveCarousel(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative h-[615px]">
      <Carousel
        className="relative max-w-[1536px] w-full h-[615px] flex justify-center"
        setApi={setApi}
      >
        <CarouselContent>
          {Array.from({ length: length }).map((_, index) => (
            <CarouselCards key={index} />
          ))}
        </CarouselContent>

        <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-[#1f1f1f]/10 to-transparent" />

        <div className="absolute flex flex-col w-fit items-center bottom-20 gap-5">
          <ActiveCarouselIndicator
            activeCarousel={activeCarousel}
            length={length}
          />

          <Button className="w-[205px] h-[39px] opacity-90 bg-white text-black text-[15px] font-input-mono hover:bg-white">
            Find Tickets
          </Button>
        </div>

        <CarouselPrevious className="z-20 border-none bg-transparent hover:bg-white/10 hover:text-white" />
        <CarouselNext className="z-20 border-none bg-transparent hover:bg-white/10 hover:text-white" />
      </Carousel>
    </section>
  );
}

function CarouselCards() {
  return (
    <CarouselItem className="w-full h-[615px] flex flex-col items-center justify-center">
      <img
        src="/assets/landing-page/c1.png"
        alt="Rave"
        className="w-full h-full opacity-70"
      />
    </CarouselItem>
  );
}

function ActiveCarouselIndicator({
  activeCarousel,
  length,
}: {
  activeCarousel: number;
  length: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className={clsx("rounded-full transition-all duration-150", {
            "bg-[#949494] size-2": index !== activeCarousel,
            "outline-1 outline-white size-5": index === activeCarousel,
          })}
        />
      ))}
    </div>
  );
}
