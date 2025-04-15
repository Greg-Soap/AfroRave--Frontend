import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import carouselImage from "@/assets/landing-page/c1.png";

export default function Hero() {
  return (
    <div className="relative h-[615px]">
      <Carousel className="max-w-[1536px] w-full h-[615px]">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselCards key={index} />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function CarouselCards() {
  return (
    <CarouselItem className="w-full h-[615px]">
      <div className="relative w-full h-[615px] flex flex-col items-center justify-center">
        <img src={carouselImage} alt="Rave" className="w-full h-full" />
        <Button className="absolute bottom-10 w-[285px] h-[70px] opacity-90 bg-white text-black text-[15px] font-input-mono hover:bg-white">
          Find Tickets
        </Button>
      </div>
    </CarouselItem>
  );
}
