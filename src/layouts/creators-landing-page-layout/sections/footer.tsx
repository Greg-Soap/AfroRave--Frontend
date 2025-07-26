import { Separator } from '@/components/ui/separator'
import { getRoutePath } from '@/config/get-route-path'
import { FooterLinks } from '@/layouts/components/footer-links'
import { FooterLinkBlock, type IFooterLinks } from '@/layouts/components/footer-links-block'
import { Socials } from '@/layouts/components/socials'

export default function Footer() {
  return (
    <footer className='relative w-full flex flex-col items-center gap-7 pt-[50px] pb-16 bg-transparent font-input-mono z-20'>
      <FooterLinks className='md:h-5 px-[1rem] md:px-[2rem]' />

      <Separator orientation='horizontal' className='w-full bg-white max-md:mt-7' />

      <div className='w-full flex flex-wrap gap-5 md:gap-[120px] px-[1rem] md:px-[2rem] justify-between md:justify-start md:pr-[160px]'>
        {footer_links.map((footer_link) => (
          <FooterLinkBlock key={footer_link.title} {...footer_link} />
        ))}
      </div>

      <Socials className='justify-end px-[1rem] md:px-[2rem]' />
    </footer>
  )
}

const footer_links: IFooterLinks[] = [
  {
    title: 'Helpful Links',
    links: [
      { href: getRoutePath('home'), name: 'Discover events' },
      { href: getRoutePath('support'), name: 'Support' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: getRoutePath('creators_blog'), name: 'Blog' },
      { href: getRoutePath('work_with_us'), name: 'Work With Us' },
    ],
  },
]
