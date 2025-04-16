import { Link } from "react-router-dom";
import firstSocialPost from "@/assets/landing-page/s1.png";
import secondSocialPost from "@/assets/landing-page/s2.png";
import thirdSocialPost from "@/assets/landing-page/s3.png";

export default function Socials() {
  return (
    <section className="max-w-[1536px] w-full flex flex-col gap-10 pt-[75px]">
      <p className="container font-input-mono font-bold text-[30px]">Socials</p>

      <div className="flex flex-col">
        <div className="grid grid-cols-2">
          {social_posts.slice(0, 2).map((item) => (
            <Link
              key={item.alt}
              to={item.href}
              className="w-fit h-fit overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.alt}
                width={883}
                height={842}
                className="w-full h-[700px] hover:scale-105 transition-all duration-300"
              />
            </Link>
          ))}
        </div>
        <Link to={social_posts[2].href} className="w-fit h-fit overflow-hidden">
          <img
            src={social_posts[2].image}
            alt={social_posts[2].alt}
            className="w-full h-auto  hover:scale-105 transition-all duration-300"
          />
        </Link>
      </div>
    </section>
  );
}

const social_posts: { image: string; alt: string; href: string }[] = [
  { image: firstSocialPost, alt: "Rema", href: "/" },
  { image: secondSocialPost, alt: "Ragga", href: "/" },
  { image: thirdSocialPost, alt: "Logo", href: "/" },
];
