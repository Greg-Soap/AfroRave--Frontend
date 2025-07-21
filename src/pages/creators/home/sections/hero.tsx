import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="container w-full min-h-screen flex flex col items-center justify-center py-[100px]">
      <div className="max-w-[700px] w-full flex flex-col items-center gap-5 text-white font-sf-pro">
        <p className="max-w-[514px] text-center text-white text-[40px] font-black">
          All-in-One Hub for Fans and Creators
        </p>
        <p className="text-center">
          We equip organizers with the tools to create, manage, and sell out
          their events, And vendors? They discover new opportunities, connect
          with organizers, and grow their businesses.
        </p>
        <Button className="max-w-[120px] h-10 rounded-[20px] font-sf-pro-text text-sm font-semibold px-[17px] py-[11px]">
          Get Started
        </Button>
      </div>
    </section>
  );
}
