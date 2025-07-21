import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function EmptyPage({
  className = "max-h-[510px] bg-gray-400/30",
  withGradient = true,
}: IEmptyPageProps) {
  return (
    <div className="bg-transparent text-white min-h-screen mx-auto w-full z-20">
      <section
        className={cn(
          "relative h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 w-full",
          className
        )}
      >
        {/* Background Image with Grayscale */}
        {withGradient && (
          <>
            <div className="absolute inset-0 bg-cover bg-center filter grayscale" />

            <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/10 to-transparent" />
          </>
        )}

        {/* Centered Content */}
        <div className="relative z-50 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Coming Soon...
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed uppercase">
            We're cooking up stories, insights, and behind-the-scenes updates
            just for you.
          </p>
          <Link to="/">
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-5 py-3">
              Stay Tuned
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

interface IEmptyPageProps {
  withGradient?: boolean;
  className?: string;
}
