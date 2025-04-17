import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Hero() {
  return (
    <section className="relative h-[615px]">
      <Carousel className="relative max-w-[1536px] w-full h-[615px] flex justify-center">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselCards key={index} />
          ))}
        </CarouselContent>

        <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f1f] via-[#1f1f1f]/10 to-transparent" />

        <Button className="absolute bottom-20 w-[205px] h-[39px] opacity-90 bg-white text-black text-[15px] font-input-mono hover:bg-white">
          Find Tickets
        </Button>

        <CarouselPrevious className="z-20" />
        <CarouselNext className="z-20" />
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
