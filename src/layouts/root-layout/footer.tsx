import { Separator } from "@/components/ui/separator";
import { getRoutePath } from "@/config/get-route-path";
import { FooterLinks } from "../components/footer-links";
import { Socials } from "../components/socials";
import {
  FooterLinkBlock,
  type IFooterLinks,
} from "../components/footer-links-block";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center md:gap-6 px-8 md:px-[60px] pb-3 md:pb-5 bg-primary font-sf-pro-rounded">
      <div className=" w-full flex flex-col gap-1 pb-3 md:gap-5 md:px-[2rem]">
        <img
          src="/assets/landing-page/AR.png"
          alt="AR"
          width={83}
          height={33}
          className="self-center py-3 ms:py-5 md:pb-3"
        />

        <FooterLinks className="max-md:justify-center items-center h-5" />
      </div>

      <Separator
        orientation="horizontal"
        className="w-full bg-[#686868] max-md:mt-7"
      />

      <div className="w-full flex justify-between md:gap-[120px] md:px-[2rem] md:justify-start md:pr-[160px]">
        {footer_links.map((footer_link) => (
          <FooterLinkBlock
            key={footer_link.title}
            {...footer_link}
            className="max-md:py-4"
          />
        ))}
      </div>

      <Socials className="justify-end pr-8 max-md:py-3 md:px-[2rem]" />
    </footer>
  );
}

const footer_links: IFooterLinks[] = [
  {
    title: "Company",
    links: [
      { href: getRoutePath("about_us"), name: "About Us" },
      { href: getRoutePath("blog"), name: "Blog" },
      { href: getRoutePath("creators"), name: "Creators" },
      { href: getRoutePath("work_with_us"), name: "Work With Us" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { href: getRoutePath("sell"), name: "Sell" },
      { href: getRoutePath("support"), name: "Support" },
      { href: getRoutePath("faq"), name: "FAQ" },
      { href: getRoutePath("refund_policy"), name: "Refund Policy" },
    ],
  },
];
