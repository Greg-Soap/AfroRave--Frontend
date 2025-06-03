import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { getRoutePath } from '@/config/get-route-path'
import { FooterLinks } from '../components/footer-links'
import { Socials } from '../components/socials'

export default function Footer() {
  return (
    <footer className='w-full flex flex-col items-center gap-7 pt-[50px] pb-16 bg-primary font-input-mono'>
      <div className=' w-full flex flex-col  gap-5 px-[1rem] md:px-[2rem]'>
        <img
          src='/assets/landing-page/AR.png'
          alt='AR'
          width={83}
          height={33}
          className='self-center'
        />

        <FooterLinks />
      </div>

      <Separator orientation='horizontal' className='w-full bg-[#686868]' />

      <div className='  w-full flex max-md:flex-col gap-[120px] px-[1rem] md:px-[2rem] justify-start md:pr-[160px]'>
        {footer_links.map((footer_link) => (
          <FooterLinkBlock key={footer_link.title} {...footer_link} />
        ))}
      </div>

      <Socials />
    </footer>
  )
}

function FooterLinkBlock({ title, links }: IFooterLinks) {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-base font-light'>{title}</p>

      <div className='flex flex-col gap-2'>
        {links.map((item) => (
          <Link key={item.name} to={item.href} className='font-light text-[14px] hover:underline'>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

const footer_links: IFooterLinks[] = [
  {
    title: 'Company',
    links: [
      { href: getRoutePath('about_us'), name: 'About Us' },
      { href: getRoutePath('blog'), name: 'Blog' },
      { href: getRoutePath('creators'), name: 'Creators' },
      { href: getRoutePath('work_with_us'), name: 'Work With Us' },
    ],
  },
  {
    title: 'Helpful Links',
    links: [
      { href: getRoutePath('sell'), name: 'Sell' },
      { href: getRoutePath('support'), name: 'Support' },
      { href: getRoutePath('faq'), name: 'FAQ' },
      { href: getRoutePath('refund_policy'), name: 'Refund Policy' },
    ],
  },
]

interface IFooterLinks {
  title: string
  links: { href: string; name: string }[]
}
