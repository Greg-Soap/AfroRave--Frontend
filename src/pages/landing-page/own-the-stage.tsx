import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { getRoutePath } from '@/config/get-route-path'

export default function OwnTheStage() {
  return (
    <section className='flex flex-col gap-10 md:gap-24 py-[75px] w-full'>
      <div className='container w-full max-w-[var(--max-width)] mx-auto'>
        <DetailsBlock {...details[0]} />
      </div>

      <div className='relative w-full py-10 md:py-20'>
        <div className='absolute inset-0 bg-[url(/assets/landing-page/section-bg.png)] bg-cover bg-center [filter:grayscale(100%)]' />
        <div className='absolute inset-0 bg-gradient-to-t from-[#494747] via-[#00000000] to-[#00000000] [background-position:0%_41%]' />

        <div className='relative max-w-[var(--max-width)] px-[1rem] md:px-[2rem] mx-auto flex items-center justify-end gap-[50px]'>
          <DetailsBlock {...details[1]} isSecond />
        </div>
      </div>

      <div className='container w-full flex max-lg:flex-col lg:items-center gap-[30px] max-w-[var(--max-width)] mx-auto relative'>
        <DetailsBlock {...details[2]} />

        <img
          src='/assets/landing-page/bolt.png'
          alt='BOLT'
          width={644}
          height={880}
          className='hidden md:block absolute right-0 top-[100%] -translate-y-1/2 max-w-1/2 h-auto opacity-40'
        />
      </div>

      <Link
        to={getRoutePath('about_us')}
        className='self-center underline text-2xl md:text-3xl font-phosphate'>
        LEARN MORE
      </Link>
    </section>
  )
}

function DetailsBlock({ title, href, linkName, details, isSecond = false }: IDetailsBlockProps) {
  return (
    <div
      className={clsx('max-w-[569px] flex flex-col gap-2 max-md:gap-5', {
        'items-center z-10': isSecond,
      })}>
      <div className='flex flex-wrap items-center max-md:justify-center text-[40px] leading-[88px] gap-x-3.5 max-md:gap-y-2'>
        <span
          className={clsx(
            'inline-block max-md:max-w-2/3 text-2xl md:text-[30px] leading-[110%] lg:text-[40px]  max-md:text-center font-phosphate-inline text-white',

            {
              'text-center max-w-[490px]': isSecond,
              'text-left': !isSecond,
            },
          )}>
          {title}
        </span>
        {!isSecond && (
          <span className='inline-block'>
            <LinkToAuth href={href} linkName={linkName} />
          </span>
        )}
      </div>
      <p
        className={clsx(' text-[20px] uppercase max-md:text-center font-phosphate', {
          'text-center mb-2 max-w-[444px]': isSecond,
        })}>
        {details}
      </p>
      {isSecond && <LinkToAuth href={href} linkName={linkName} />}
    </div>
  )
}

function LinkToAuth({ href, linkName }: { href: string; linkName: string }) {
  return (
    <Link
      to={href}
      className=' w-[200px] h-10 bg-secondary text-[15px] font-light uppercase rounded-[10px] flex items-center justify-center text-center  font-input-mono'>
      <span>{linkName}</span>
    </Link>
  )
}

const details: IDetails[] = [
  {
    title: 'OWN THE STAGE!',
    href: '/?login=creator',
    linkName: 'Create Your Event',
    details:
      'Ready to bring your event to life? With Afro Revive, creating and managing your event has never been easier! From ticket sales to attendee insights, we give you all the tools you need to sell out your event and make it unforgettable.',
  },
  {
    title: "CAN'T MAKE IT TO A CONCERT?",
    href: getRoutePath('resell'),
    linkName: 'RESELL YOUR TICKET',
    details:
      'Our Ticket Resell feature lets you easily sell your tickets to other fans, safely and securely. List, set your price, and let us handle the rest!',
  },
  {
    title: 'READY TO CONNECT WITH MORE EVENTS?',
    href: '/?login=vendor',
    linkName: 'REGISTER AS A VENDOR',
    details:
      "Get notified about open slots, express interest, and let organizers come to you. Whether you're offering food, tech, logistics, or entertainment—we'll help you stay booked and busy!",
  },
]

interface IDetails {
  title: string
  href: string
  linkName: string
  details: string
}

interface IDetailsBlockProps extends IDetails {
  isSecond?: boolean
}
