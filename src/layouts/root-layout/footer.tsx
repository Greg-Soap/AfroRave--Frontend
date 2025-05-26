import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FormField } from '@/components/reusable'
import { FormBase } from '@/components/reusable'
import { Input } from '@/components/ui/input'
import { getRoutePath } from '@/config/get-route-path'
import { FooterLinks } from '../components/footer-links'
import { Socials } from '../components/socials'

const formSchema = z.object({
  email: z.string().email({ message: 'Provide a valid email address' }),
})

export default function Footer() {
  return (
    <footer className='w-full flex flex-col items-center gap-7 pt-[50px] pb-16 bg-primary font-input-mono'>
      <div className=' w-full flex flex-col  gap-5 px-[1rem] md:px-[2rem]'>
        <img
          src='/assets/landing-page/AR.png'
          alt='AR'
          width={139}
          height={55}
          className='self-center'
        />

        <NewsLetterForm />

        <FooterLinks />
      </div>

      <Separator orientation='horizontal' className='w-full bg-[#686868]' />

      <div className='  w-full flex max-md:flex-col gap-[120px] px-[1rem] md:px-[2rem] justify-end md:pr-[160px]'>
        {footer_links.map((footer_link) => (
          <FooterLinkBlock key={footer_link.title} {...footer_link} />
        ))}
      </div>

      <Socials />
    </footer>
  )
}

function NewsLetterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className='flex flex-col gap-2 max-w-[772px] space-y-0'>
      <p className='text-base font-light'>
        Sign up to our newsletter to receive information about upcoming events.
      </p>
      <div className='flex items-center gap-2 '>
        <FormField form={form} name='email'>
          <Input
            placeholder='Your Email'
            className='w-[320px] h-11 placeholder:text-white/70 border-white'
          />
        </FormField>

        <Button
          type='submit'
          className='w-[128px] h-[49px] bg-secondary font-input-mono text-lg hover:opacity-75 hover:bg-secondary hover:transition-all hover:duration-300'>
          Subscribe
        </Button>
      </div>
    </FormBase>
  )
}

function FooterLinkBlock({ title, links }: IFooterLinks) {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-xl font-light'>{title}</p>

      <div className='flex flex-col gap-2'>
        {links.map((item) => (
          <Link key={item.name} to={item.href} className='font-light text-[15px] hover:underline'>
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
