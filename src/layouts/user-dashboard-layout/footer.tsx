import { FooterLinks } from "../components/footer-links";
import { Socials } from "../components/socials";
import { NavLogo } from "../root-layout/header/nav-logo";

export default function AccountFooter() {
  return (
    <footer className="w-full h-fit flex flex-col gap-10 items-center py-10 border-t border-white/70">
      <NavLogo />

      <FooterLinks className="items-center justify-center" />

      <Socials className="justify-center" />
    </footer>
  );
}
