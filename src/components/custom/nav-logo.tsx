import { Link } from "react-router-dom";

export function NavLogo() {
  return (
    <Link to="/">
      <img
        src="/assets/landing-page/logo.png"
        alt="Logo"
        width={282}
        height={202}
        className="-ml-7"
      />
    </Link>
  );
}
