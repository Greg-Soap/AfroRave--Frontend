import { Link } from 'react-router-dom'
import { Separator } from './ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { InputTypeField } from './form-fields'

const formSchema = z.object({
  email: z.string().email({ message: 'Provide a valid email address' }),
})

export default function Footer() {
  return (
    <footer className='w-full flex flex-col items-center gap-7 pt-[50px] pb-16 bg-primary font-input-mono'>
      <div className='max-w-[1536px] w-full flex flex-col items-center gap-5 px-[1rem] md:px-[2rem]'>
        <img src='/assets/landing-page/AR.png' alt='AR' width={139} height={55} />

        <NewsLetterForm />

        <div className='w-full flex max-md:flex-col md:items-center gap-2.5 md:h-5'>
          <Link to='/' className='font-semilight hover:underline'>
            Privacy Policy
          </Link>

          <Separator orientation='vertical' className='h-full bg-white max-md:hidden' />

          <Link to='/' className='font-semilight hover:underline'>
            Terms and Conditions
          </Link>
        </div>
      </div>

      <Separator orientation='horizontal' className='w-full bg-white' />

      <div className='max-w-[1536px]  w-full flex max-md:flex-col gap-10 px-[1rem] md:px-[2rem]'>
        {footer_links.map((footer_link) => (
          <FooterLinkBlock key={footer_link.title} {...footer_link} />
        ))}
      </div>

      <div className='max-w-[1536px]  w-full flex items-center gap-5 md:justify-end px-[1rem] md:px-[2rem]'>
        {socials.map((item) => (
          <Link key={item.alt} to={item.href} className='cursor-pointer hover:opacity-80'>
            <img src={item.icon} alt={item.alt} className='w-10 h-auto' />
          </Link>
        ))}
      </div>
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
        <InputTypeField
          name='email'
          label='Sign up to our newsletter to receive information about upcoming events.'
          placeholder='Your Email'
          form={form}
          className='max-w-[772px]'
          submitButton={
            <Button type='submit' className='w-[128px] h-[49px] bg-red-500 hover:bg-red-600'>
              Subscribe
            </Button>
          }
        />
      </form>
    </Form>
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
      { href: '/', name: 'About Us' },
      { href: '/', name: 'Blog' },
      { href: '/', name: 'Creators' },
      { href: '/', name: 'Work With Us' },
    ],
  },
  {
    title: 'Helpful Links',
    links: [
      { href: '/', name: 'Sell' },
      { href: '/', name: 'Support' },
      { href: '/', name: 'FAQ' },
      { href: '/', name: 'Refund Policy' },
    ],
  },
]

const socials: ISocials[] = [
  { href: '/', icon: '/assets/landing-page/insta.png', alt: 'Instagram' },
  { href: '/', icon: '/assets/landing-page/X.png', alt: 'X' },
  { href: '/', icon: '/assets/landing-page/tiktok.png', alt: 'TikTok' },
  { href: '/', icon: '/assets/landing-page/yt.png', alt: 'Youtube' },
]

interface IFooterLinks {
  title: string
  links: { href: string; name: string }[]
}

interface ISocials {
  href: string
  icon: string
  alt: string
}
