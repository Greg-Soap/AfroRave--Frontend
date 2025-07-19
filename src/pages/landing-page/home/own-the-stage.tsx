import { getRoutePath } from '@/config/get-route-path'
import { events } from '@/data/events'
import { cn } from '@/lib/utils'
import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { CategoryBlockSkeleton } from '../event-page/event-category-blocks'
import { CategoryBlock } from '../event-page/event-category-blocks'

export default function OwnTheStage() {
  return (
    <section className='relative flex flex-col gap-10 md:gap-[100px] py-[75px] pb-[182px] w-full overflow-hidden'>
      {/* Background layers */}
      <div className='absolute inset-0 bg-[url(/assets/landing-page/section-bg.png)] bg-cover bg-center [filter:grayscale(100%)_opacity(25%)]' />
      <div className='absolute inset-0 bg-gradient-to-t  [background-position:0%_41%]' />

      {/* Lightning bolt
      <img
        src="/assets/landing-page/bolt.png"
        alt="BOLT"
        width={644}
        height={880}
        className="hidden md:block absolute left-[62%] top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80%] w-auto scale-x-[1.5] scale-y-[1.2] opacity-40"
      /> */}

      {/* Content container */}
      <div className='relative px-5 md:px-14'>
        <div className='mb-[124px] overflow-x-hidden'>
          <Suspense fallback={<CategoryBlockSkeleton />}>
            <CategoryBlock name='Trending' data={events} showLocation={true} layout='start' />
          </Suspense>
        </div>
        {/* First row - blocks 1 and 3 */}
        <div className='flex max-lg;flex-col lg:justify-between items-center lg:items-start gap-10 mb-10 md:mb-24'>
          <DetailsBlock {...details[0]} position='first' />
          <DetailsBlock {...details[2]} position='third' />
        </div>

        {/* Second row - block 2 centered */}
        <div className='flex justify-center'>
          <DetailsBlock {...details[1]} position='second' />
        </div>
      </div>
    </section>
  )
}

function DetailsBlock({ title, href, linkName, details, position = 'first' }: IDetailsBlockProps) {
  return (
    <div
      className={cn('max-w-[554px] flex flex-col max-lg:items-center gap-2 max-md:gap-5', {
        'items-center z-10 lg:max-w-[375px]': position === 'second',
        'items-end': position === 'third',
      })}>
      <span
        className={cn(
          'inline-block text-2xl md:text-[30px] leading-[110%] lg:text-[36px] max-md:text-center font-phosphate-inline text-white max-lg:text-center text-wrap',
          {
            'text-right lg:w-[426px]': position === 'third',
            'text-center w-full': position === 'second',
            'text-left w-full': position === 'first',
          },
        )}>
        {title}
      </span>
      <p
        className={cn('text-xl uppercase max-md:text-center font-phosphate max-lg:text-center', {
          'text-center mb-2 max-w-[444px]': position === 'second',
          'text-right': position === 'third',
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
      className='w-fit bg-deep-red text-sm font-light uppercase rounded-[6px] flex items-center justify-center text-center font-sf-compact px-4 py-2'>
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
  position: 'first' | 'second' | 'third'
}
