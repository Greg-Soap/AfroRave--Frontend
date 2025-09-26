import { BlockName } from '../../_components/block-name'
import { cn } from '@/lib/utils'
import { formatNaira } from '@/lib/format-price'
import { type LucideIcon, Plus, Minus, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetEventTickets } from '@/hooks/use-event-mutations'
import { Skeleton } from '@/components/ui/skeleton'
import {
  useCreateCart,
  useUpdateCartQuantity,
  useExtendReservation,
  useGetAllCart,
} from '@/hooks/use-cart'
import { useEffect, useState } from 'react'

export default function TicketSection({ eventId, layout }: ITicketProps) {
  const { data: ticketResponse, isPending: isLoading } = useGetEventTickets(eventId)

  const rawCarts = useGetAllCart().data?.data || []

  const tickets = ticketResponse?.data

  return (
    <div
      className={cn('!w-full flex flex-col gap-7', {
        'px-5 lg:px-[120px]': layout === 'default',
        'pl-5 lg:pl-[120px]': layout !== 'default',
      })}>
      <div className='flex items-center gap-5'>
        <BlockName name='tickets' />

        <p className='font-sf-pro-display text-xl font-extrabold text-white/60'>SALE</p>
      </div>

      {isLoading ? (
        <TicketCardSkeleton layout={layout} />
      ) : (
        <>
          <div
            className={cn('w-full', {
              'flex gap-7 overflow-x-scroll scrollbar-none':
                layout === 'with-flyer' || layout === 'standard-carousel',
              'grid sm:grid-cols-2 gap-x-5 gap-y-7': layout === 'default',
            })}>
            {tickets?.map((item) => {
              const cartTicket = rawCarts.find((cart) => cart.ticketId === item.ticketId)

              const quantity = cartTicket?.quantity || 0
              const cartId = cartTicket?.cartId || ''

              return (
                <TicketCard
                  key={item.ticketName}
                  name={item.ticketName}
                  price={item.price}
                  ticketId={item.ticketId}
                  layout={layout}
                  quantity={quantity}
                  initialCartId={String(cartId)}
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

function TicketCard({ name, price, layout, ticketId, quantity, initialCartId }: ITicketCard) {
  const [ticketCount, setTicketCount] = useState<number>(quantity)
  const [cartId, setCardId] = useState<string>(initialCartId)

  useEffect(() => {
    setTicketCount(quantity)
  }, [quantity])

  const createCartMutation = useCreateCart()
  const updateQuantityMutation = useUpdateCartQuantity()
  const extendReservationMutation = useExtendReservation()

  function createCart() {
    createCartMutation.mutate(
      { ticketId: ticketId, quantity: 1 },
      {
        onSuccess: (data) => {
          setTicketCount((t) => t + 1)
          setCardId(String(data.data.id))
        },
      },
    )
  }

  function updateCart(quantity: number) {
    updateQuantityMutation.mutate(
      { data: quantity, cartId: cartId },
      {
        onSuccess: () => {
          setTicketCount(quantity)
          extendReservationMutation.mutate({ cartId: cartId })
        },
      },
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-[8px] bg-gunmetal-gray pl-5 pr-2 py-2.5 text-xl font-sf-pro-display',
        {
          'min-w-[480px] last:mr-5': layout === 'with-flyer' || layout === 'standard-carousel',
          'w-full': layout === 'default',
        },
      )}>
      <div className='flex flex-col gap-1 font-sf-pro-display text-base font-normal'>
        <p>{name}</p>
        <p>{formatNaira(price)}</p>
        <p className='text-[10px] font-sf-pro-display leading-[100%] text-[#ACACAC]'>
          (includes fees)
        </p>
      </div>

      <div className='flex items-center gap-2 px-3 rounded-full h-12 bg-light-green'>
        {ticketCount > 0 && (
          <>
            <TicketButton
              action={() => updateCart(ticketCount - 1)}
              Icon={Minus}
              isLoading={updateQuantityMutation.isPending}
            />

            <span className='font-sf-pro-rounded font-bold text-sm'>{ticketCount}</span>
          </>
        )}

        <TicketButton
          action={() => (ticketCount > 0 ? updateCart(ticketCount + 1) : createCart())}
          Icon={Plus}
          isLoading={createCartMutation.isPending || updateQuantityMutation.isPending}
        />
      </div>
    </div>
  )
}

function TicketButton({ action, Icon, isLoading = false }: ITicketButton) {
  return (
    <Button
      disabled={isLoading}
      variant='ghost'
      className='p-1 w-fit h-fit hover:bg-black/10'
      onClick={action}>
      {isLoading ? (
        <LoaderCircle color='var(--foreground)' size={16} className='animate-spin' />
      ) : (
        <Icon color='var(--foreground)' size={16} />
      )}
    </Button>
  )
}

function TicketCardSkeleton({ layout }: { layout: ITicketProps['layout'] }) {
  return (
    <Skeleton
      className={cn(
        'flex items-center justify-between h-[76px] rounded-[8px] bg-gunmetal-gray pl-5 pr-2 py-2.5 text-xl font-sf-pro-display',
        {
          'min-w-[480px] last:mr-5': layout === 'with-flyer' || layout === 'standard-carousel',
          'w-full': layout === 'default',
        },
      )}
    />
  )
}

interface ITicketProps {
  layout: 'default' | 'standard-carousel' | 'with-flyer'
  eventId: string
}

interface ITicketButton {
  action: () => void
  Icon: LucideIcon
  isLoading?: boolean
}

interface ITicketCard {
  name: string
  price: number
  ticketId: string
  layout: ITicketProps['layout']
  quantity: number
  initialCartId: string
}
