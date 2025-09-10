import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import type { LucideIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { RenderEventImage } from './render-event-flyer'

export function DashboardCardSkeleton() {
  return <Skeleton className='w-[260px] h-[225px]' />
}

export function DashboardCards({
  image,
  name,
  status,
  cardInfo,
  cardButtons,
  className,
  customButton,
  startDate,
}: IDashboardCardProps) {
  return (
    <div className='w-[260px] h-fit flex flex-col shadow-xl'>
      <div className='relative flex flex-col items-start justify-end h-[172px] group overflow-hidden'>
        <RenderEventImage
          event_name={name}
          image={image}
          className={cn(
            'w-full h-full object-cover absolute group-hover:scale-105 transition-all duration-300',
            {
              'grayscale-100': status === 'ended',
            },
          )}
        />

        <img
          src='/assets/dashboard/creator/link.png'
          alt='Link'
          width={10}
          height={10}
          className='absolute top-1 right-1 z-10'
        />

        {status && <StatusBadge status={status} />}

        <div className='absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300' />

        <p className='capitalize font-sf-pro-text font-medium text-sm z-10 px-1'>{name}</p>
        <p className='text-[10px] font-sf-pro-display z-10 px-1 mb-1'>{startDate}</p>
      </div>
      <div className='flex items-center justify-center gap-6 px-[26px] py-4 bg-white'>
        {cardInfo}
      </div>
      <div
        className={cn(
          'grid grid-cols-3 border-t border-t-semi-light-gray/28 h-fit bg-white',
          className,
        )}>
        {cardButtons.map((item, index) => (
          <EventButtons
            key={item.alt}
            {...item}
            className={index < cardButtons.length - 1 ? 'border-r' : 'border-none'}
          />
        ))}

        {customButton}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={cn(
        'py-1.5 px-2 rounded-full text-xs font-black text-white font-sf-pro-text absolute top-1 left-1 z-10 uppercase',
        {
          'bg-tech-blue': status === 'drafts',
          'bg-deep-red': status === 'ended',
        },
      )}>
      {status}
    </Badge>
  )
}

function EventButtons({ Icon, alt, className, action, src }: IEventButtonsProps) {
  return (
    <Button
      onClick={action}
      variant='ghost'
      className={cn(
        'flex items-center justify-center hover:bg-black/10 rounded-none border-r-semi-light-gray/28',
        className,
      )}>
      {Icon && <Icon color='#000000' xlinkTitle={alt} />}
      {src && <img src={src} alt={alt} width={12} height={10} />}
    </Button>
  )
}

interface IDashboardCardProps {
  className?: string
  image?: string
  name: string
  startDate: string
  status?: string
  cardInfo: React.ReactNode[]
  cardButtons: Omit<IEventButtonsProps, 'className'>[]
  customButton?: React.ReactNode[]
}

interface IEventButtonsProps {
  Icon?: LucideIcon
  src?: string
  alt: string
  className?: string
  action?: () => void
}
