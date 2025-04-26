import { FooterLinks } from "../components/footer-links";
import { Socials } from "../components/socials";
import { NavLogo } from "../root-layout/header/nav-logo";

export default function AccountFooter() {
  return (
    <footer className="w-full flex flex-col gap-[78px] items-center py-[136px] border-t border-white/70">
      <NavLogo />

      <FooterLinks type="account" />

      <Socials type="account" />
    </footer>
  );
}
