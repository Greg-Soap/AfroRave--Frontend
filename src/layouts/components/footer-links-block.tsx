import { Link } from "react-router-dom";

export function FooterLinkBlock({ title, links }: IFooterLinks) {
  return (
    <div className="flex flex-col gap-4 font-sf-pro-rounded">
      <p>{title}</p>

      <div className="flex flex-col gap-2">
        {links.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="font-light text-[14px] hover:underline"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export interface IFooterLinks {
  title: string;
  links: { href: string; name: string }[];
}
