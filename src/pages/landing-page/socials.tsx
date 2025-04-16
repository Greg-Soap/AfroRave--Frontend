import { Link } from "react-router-dom";
import firstSocialPost from "@/assets/landing-page/s1.png";
import secondSocialPost from "@/assets/landing-page/s2.png";
import thirdSocialPost from "@/assets/landing-page/s3.png";
import fourthSocialPost from "@/assets/landing-page/s4.png";
import fifthSocialPost from "@/assets/landing-page/s5.png";
import sixthSocialPost from "@/assets/landing-page/s6.png";
import seventhSocialPost from "@/assets/landing-page/s7.png";
import eigthSocialPost from "@/assets/landing-page/s8.png";
import ninthSocialPost from "@/assets/landing-page/s9.png";
import tenthSocialPost from "@/assets/landing-page/s10.png";
import eleventhSocialPost from "@/assets/landing-page/s11.png";
import twelvthSocialPost from "@/assets/landing-page/s2.png";
import thirteenthSocialPost from "@/assets/landing-page/s4.png";
import clsx from "clsx";

export default function Socials() {
  return (
    <section className="max-w-[1536px] w-full flex flex-col gap-10 pt-[75px]">
      <p className="container font-input-mono font-bold text-[30px]">Socials</p>

      <div className="flex flex-col">
        <div className="grid grid-cols-5">
          {social_posts.map((item, index) => (
            <Link
              key={item.alt}
              to={item.href}
              className={clsx("w-full overflow-hidden", {
                "col-span-2 row-span-2 h-[550px]": index === 1 || index === 10,
                "h-[275px]": index !== 1 && index !== 10,
              })}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full hover:scale-105 transition-all duration-300 opacity-60"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const social_posts: { image: string; alt: string; href: string }[] = [
  { image: firstSocialPost, alt: "Rema", href: "/" },
  { image: secondSocialPost, alt: "Ragga", href: "/" },
  { image: thirdSocialPost, alt: "Logo", href: "/" },
  { image: fourthSocialPost, alt: "Logo", href: "/" },
  { image: fifthSocialPost, alt: "Logo", href: "/" },
  { image: sixthSocialPost, alt: "Logo", href: "/" },
  { image: seventhSocialPost, alt: "Logo", href: "/" },
  { image: eigthSocialPost, alt: "Logo", href: "/" },
  { image: ninthSocialPost, alt: "Logo", href: "/" },
  { image: tenthSocialPost, alt: "Logo", href: "/" },
  { image: eleventhSocialPost, alt: "Logo", href: "/" },
  { image: twelvthSocialPost, alt: "Logo", href: "/" },
  { image: thirteenthSocialPost, alt: "Logo", href: "/" },
  { image: thirdSocialPost, alt: "Logo", href: "/" },
];
