import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { VideoBackgroundWrapper } from "@/components/shared/video-background-wrapper";

export function EmptyPage() {
  return (
    <VideoBackgroundWrapper
      videoSrc='/assets/creators-background.mp4'
      backgroundImage='/assets/landing-page/c1.png'
      secondColor='#b8856a'
      overlayOpacity={0.75}
    >
      <div className="bg-transparent text-white min-h-screen mx-auto w-full z-20">
        <section className="relative h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 w-full">
          {/* Centered Content */}
          <div className="relative z-50 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Coming Soon.....
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
    </VideoBackgroundWrapper>
  );
}
