import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatNaira } from '@/lib/format-price'
import { AddFilterBUtton } from './components/add-filter-btn'
import { getRoutePath } from '@/config/get-route-path'
import StandAloneModal from './components/standalone-modal'
import VendorSelect from '@/components/custom/vendor-select'
import { BasePopover } from '@/components/reusable'
import { DashboardCards } from '@/components/custom/dashboard-cards'

export default function StandalonePage() {
  return (
    <section className='w-full h-full flex flex-col items-center gap-14 lg:gap-24 mb-[75px]'>
      <StandAloneHeader />

      <div className='max-w-[836px] w-full flex flex-wrap justify-center gap-7'>
        {standalone_events.map((item) => (
          <StandAloneEvents key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}

function StandAloneHeader() {
  return (
    <div className='w-full flex items-center justify-between bg-white h-14 px-5 lg:px-8 border-l border-light-gray'>
      <AddFilterBUtton />

      <div className='flex items-center gap-3 md:gap-8'>
        <VendorSelect />

        <Button variant='destructive' className='p-3 h-8 rounded-[6px] gap-2 md:gap-8' asChild>
          <Link to={getRoutePath('add_event')}>
            <Plus color='#ffffff' size={12} />
            <span className='font-sf-pro-text text-xs'>Add Event</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

function StandAloneEvents({ id, image, name, sold, net_profit, status }: IStandaloneEventProps) {
  return (
    <DashboardCards
      image={image}
      name={name}
      status={status}
      cardInfo={[
        <p key='sold_items' className='font-sf-pro-rounded text-xs text-mid-dark-gray'>
          Sold: <span className='text-black font-medium'>{sold.unit}</span> / {sold.total}
        </p>,

        <p key='profit' className='font-sf-pro-rounded text-xs text-mid-dark-gray'>
          Net Profit: <span className='text-black font-medium'>{formatNaira(net_profit)}</span>
        </p>,
      ]}
      cardButtons={event_buttons}
      customButton={[
        <BasePopover
          key='popover_trigger'
          className='bg-black/50'
          trigger={
            <Button
              variant='ghost'
              className='flex items-center justify-center hover:bg-black/10 rounded-none border-l border-semi-light-gray/28'>
              <img
                src='/assets/dashboard/creator/ellipses.png'
                alt='Ellipses'
                width={12}
                height={10}
              />
            </Button>
          }
          content={<PopoverContent id={id} />}
        />,
      ]}
    />
  )
}

function PopoverContent({ id }: { id: number }) {
  return (
    <div className='w-[117px] flex flex-col bg-black/50 rounded-[5px] p-1 gap-1 text-xs font-sf-pro-text'>
      <Link
        to={getRoutePath('edit_event', { eventId: id })}
        className='text-white border-b border-white h-[22px] hover:bg-black/80'>
        Edit Event
      </Link>
      <Link
        to={getRoutePath('individual_event', { eventId: id })}
        className='border-b border-white text-white h-[22px] hover:bg-black/80'>
        View Event
      </Link>
      <StandAloneModal id={id} />
      <Button
        variant='ghost'
        className='flex h-[22px] items-center bg-transparent rounded-none text-xs text-white font-sf-pro-text px-0 justify-start hover:bg-black/80 hover:text-white'>
        Copy Link
      </Button>
    </div>
  )
}

const event_buttons: { src: string; alt: string }[] = [
  { src: '/assets/dashboard/creator/chart2.png', alt: 'Chart' },
  {
    src: '/assets/dashboard/creator/group-user.png',
    alt: 'Group User',
  },
]

const standalone_events: IStandaloneEventProps[] = [
  {
    id: 1,
    image: '/assets/landing-page/s1.png',
    name: 'Punk fest, unleash your inner rebel',
    status: 'drafts',
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
  {
    id: 2,
    image: '/assets/landing-page/s2.png',
    name: 'Punk fest, unleash your inner rebel',
    status: 'ended',
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
  {
    id: 3,
    image: '/assets/landing-page/s1.png',
    name: 'Punk fest, unleash your inner rebel',
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
  {
    id: 4,
    image: '/assets/landing-page/s1.png',
    name: 'Punk fest, unleash your inner rebel',
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
  {
    id: 5,
    image: '/assets/landing-page/s1.png',
    name: 'Punk fest, unleash your inner rebel',
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
  {
    id: 6,
    image: '/assets/landing-page/s1.png',
    name: 'Punk fest, unleash your inner rebel',
    sold: { unit: 1200, total: 2000 },
    net_profit: 5800000,
  },
]

interface IStandaloneEventProps {
  id: number
  image: string
  name: string
  status?: 'drafts' | 'ended'
  sold: { unit: number; total: number }
  net_profit: number
}
