import { Link } from "react-router-dom";
import { getRoutePath } from "@/config/get-route-path";

export function NavLogo() {
  return (
    <Link to={getRoutePath("home")}>
      <img
        src="/assets/landing-page/logo.png"
        alt="Logo"
        width={121}
        height={68}
      />
    </Link>
  );
}
