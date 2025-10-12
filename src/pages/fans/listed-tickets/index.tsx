import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
// import { AddFilterBUtton } from '@/pages/creators/standalone/components/add-filter-btn'
import { ChevronLeft, Info, Search } from 'lucide-react'

export default function ListedTicketPage() {
  return (
    <section className='w-full flex flex-col items-center justify-center gap-8 mt-[124px]'>
      <Button variant='ghost' className='ml-[50px] self-start w-fit hover:bg-white/10'>
        <ChevronLeft color='#ffffff' className='w-[14px] h-[30px]' />
      </Button>

      <div className='container w-full flex flex-col px-5 md:px-[60px] lg:px-[120px] py-[62px]'>
        <div className='w-full flex items-center justify-between py-5 px-8 font-sf-pro-display text-white'>
          <div className='flex items-center gap-2'>
            <Search size={14} opacity={70} color='#ffffff' />
            <Input
              placeholder='Search'
              className='p-0 text-white border-none placeholder:text-white/70 text-xs'
            />
          </div>
          {/* 
          <AddFilterBUtton
            className="!text-white"
            img="/assets/dashboard/filter.png"
          /> */}
        </div>

        {listedTickets.map((item) => (
          <ListedTickets key={item.name} {...item} />
        ))}
      </div>
    </section>
  )
}

function ListedTickets({ name, ticket, date, status }: IListedTickets) {
  return (
    <div className='w-full flex items-center justify-between py-5 px-3 md:px-8 border-t border-mid-dark-gray/30 font-sf-pro-display text-white'>
      <div className='flex flex-col gap-0.5'>
        <p>{name}</p>
        <p className='text-xs'>{ticket}</p>
      </div>

      <div className='flex items-center gap-3 md:gap-8'>
        <p className='text-sm hidden md:flex'>{date}</p>

        <Badge
          className={cn('capitalize', {
            'text-[#34C759]': status === 'sold',
            'text-[#FF9500]': status === 'active',
          })}>
          {status}
        </Badge>

        <Info size={20} />
      </div>
    </div>
  )
}

const listedTickets: IListedTickets[] = [
  {
    name: 'Lady Donli & The Lagos Madness',
    ticket: 'EARLY BIRD ACCESS',
    date: 'May 4, 2025',
    status: 'active',
  },
  {
    name: 'Punk Fest, Unleash Your Inner Rebel',
    ticket: 'VIP ACCESS',
    date: 'May 4, 2025',
    status: 'sold',
  },
  {
    name: 'Blackmarket Flea',
    ticket: 'VIP ACCESS',
    date: 'May 4, 2025',
    status: 'sold',
  },
]

interface IListedTickets {
  name: string
  ticket: string
  date: string
  status: 'active' | 'sold'
}
