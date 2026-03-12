import { Link } from "react-router-dom";
import { getRoutePath } from "@/config/get-route-path";

export function NavLogo() {
  return (
    <Link to={getRoutePath("home")}>
      <img
        src="/assets/landing-page/logo.png"
        alt="Logo"
        className="h-14 md:h-12 w-auto"
      />
    </Link>
  );
}
