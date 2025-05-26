import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { getRoutePath } from '@/config/get-route-path'
import { CategoryBlockSkeleton } from '../event-page/event-category-blocks'
import { Suspense } from 'react'
import { CategoryBlock } from '../event-page/event-category-blocks'
import { events } from '@/data/events'

export default function OwnTheStage() {
  return (
    <section className='relative flex flex-col gap-10 md:gap-[100px] py-[75px] pb-[182px] w-full overflow-hidden'>
      {/* Background layers */}
      <div className='absolute inset-0 bg-[url(/assets/landing-page/section-bg.png)] bg-cover bg-center [filter:grayscale(100%)_opacity(25%)]' />
      <div className='absolute inset-0 bg-gradient-to-t from-smoky-gray via-black/30 to-black/0 [background-position:0%_41%]' />

      {/* Lightning bolt */}
      <img
        src='/assets/landing-page/bolt.png'
        alt='BOLT'
        width={644}
        height={880}
        className='hidden md:block absolute left-[62%] top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] w-auto scale-x-[1.5] scale-y-[1.2] opacity-40'
      />

      {/* Content container */}
      <div className='relative px-[56px]'>
        <div className='mb-[124px] overflow-x-hidden'>
          <Suspense fallback={<CategoryBlockSkeleton />}>
            <CategoryBlock name='Trending' data={events} isTrending />
          </Suspense>
        </div>
        {/* First row - blocks 1 and 3 */}
        <div className='flex justify-between items-start gap-10 mb-10 md:mb-24'>
          <DetailsBlock {...details[0]} />
          <DetailsBlock {...details[2]} />
        </div>

        {/* Second row - block 2 centered */}
        <div className='flex justify-center'>
          <DetailsBlock {...details[1]} isSecond />
        </div>
      </div>

      <Link
        to={getRoutePath('about_us')}
        className='relative self-center underline text-[20px] font-phosphate'>
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
      </div>
      <p
        className={clsx(' text-[20px] uppercase max-md:text-center font-phosphate', {
          'text-center mb-2 max-w-[444px]': isSecond,
        })}>
        {details}
      </p>
      <LinkToAuth href={href} linkName={linkName} />
    </div>
  )
}

function LinkToAuth({ href, linkName }: { href: string; linkName: string }) {
  return (
    <Link
      to={href}
      className='  w-fit bg-[#AE0D0D] text-[15px] font-light uppercase rounded-[6px] flex items-center justify-center text-center  font-input-mono px-4 py-2'>
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
