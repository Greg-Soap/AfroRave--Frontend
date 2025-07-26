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
      <div className='absolute inset-0 bg-gradient-to-b from-[#1e1f1f] via-transparent to-[#1e1f1f] from-[5%] via-50% to-[96%]' />

      {/* Content container */}
      <div className='relative px-5 md:px-14'>
        <div className='mb-[124px] overflow-x-hidden '>
          <Suspense fallback={<CategoryBlockSkeleton />}>
            <CategoryBlock
              name='Trending'
              data={events}
              showLocation={true}
              layout='start'
              homePage={true}
            />
          </Suspense>
        </div>
        {/* First row - blocks 1 and 3 */}
        <div className='flex max-lg:flex-col items-center lg:items-start justify-center gap-10 lg:gap-[100px] mb-10 md:mb-24'>
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
      className={cn('max-w-[554px] flex flex-col items-center gap-2 max-md:gap-5', {
        ' z-10 lg:max-w-[375px]': position === 'second',
      })}>
      <span
        className={cn(
          'inline-block text-2xl md:text-[30px] leading-[110%] lg:text-[36px] text-center font-phosphate-inline text-white max-lg:text-center text-wrap',
          {
            'lg:w-[426px]': position === 'third' || position === 'first',
            'w-full': position === 'second',
          },
        )}>
        {title}
      </span>
      <p
        className={cn('text-xl uppercase text-center font-phosphate max-lg:text-center', {
          ' mb-2 max-w-[444px]': position === 'second',
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
    href: getRoutePath('creators_home'),
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
    href: '/?signup=vendor',
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
