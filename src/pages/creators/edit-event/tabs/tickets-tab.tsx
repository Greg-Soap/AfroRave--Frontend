import BaseTable from '@/components/reusable/base-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeleteTicket, useGetEventTickets } from '@/hooks/use-event-mutations'
import type { TicketData } from '@/types'
import { EllipsisVertical, Plus, Ticket, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CreateTicketForm from '../../add-event/ticket-forms/create'
import PromoCodeForm from '../../add-event/ticket-forms/promo-code-form/promo-code-form'

export default function TicketsTab({ eventId }: { eventId: string }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentForm, setCurrentForm] = useState<string>()

  const { data: ticketsResponse, isLoading, error, refetch } = useGetEventTickets(eventId)
  const tickets = ticketsResponse?.data || []

  useEffect(() => {
    const formParam = searchParams.get('form')

    if (formParam === 'create' || formParam === 'promocode') {
      setCurrentForm(formParam)
    }
  }, [searchParams, setSearchParams])

  function handleFormChange(form: string) {
    setSearchParams({ tab: 'tickets', form: form })
    setCurrentForm(form)
  }

  function handleBackClick() {
    setCurrentForm(undefined)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('form')
      return next
    })
  }

  if (currentForm === 'promocode') {
    return (
      <div className='w-full'>
        <div className='flex items-center gap-4 mb-6'>
          <Button
            variant='ghost'
            onClick={handleBackClick}
            className='text-sm text-gray-600 hover:text-black'>
            ← Back to Tickets
          </Button>
        </div>
        <PromoCodeForm handleFormChange={handleFormChange} />
      </div>
    )
  }

  if (currentForm === 'create') {
    return (
      <div className='w-full'>
        <div className='flex items-center gap-4 mb-6'>
          <Button
            variant='ghost'
            onClick={handleBackClick}
            className='text-sm text-gray-600 hover:text-black'>
            ← Back to Tickets
          </Button>
        </div>
        <CreateTicketForm handleFormChange={handleFormChange} showError={() => {}} />
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col-reverse md:flex-col gap-14 md:p-14'>
      <div className='flex flex-col pl-2 gap-[13px]'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-3'>
            {[
              { value: 'tickets', name: 'Your Tickets' },
              { value: 'promocode', name: 'Promo Codes' },
            ].map((item) => (
              <Button
                key={item.value}
                className='font-sf-pro-display font-black text-black text-xl p-0 bg-transparent hover:bg-transparent shadow-none'>
                {item.name}
              </Button>
            ))}
          </div>

          <Button
            type='button'
            onClick={() => handleFormChange('create')}
            className='self-center w-fit flex items-center gap-2 py-2 px-3 bg-[#00AD2E] rounded-[20px] text-white text-xs font-sf-pro-text hover:bg-[#00AD2E]/90'>
            <Plus size={12} />
            ADD TICKET
          </Button>
        </div>

        {isLoading ? (
          <div className='w-full py-8 flex items-center justify-center'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-deep-red mx-auto mb-2' />
              <p className='text-sm text-gray-600'>Loading tickets...</p>
            </div>
          </div>
        ) : error ? (
          <div className='w-full py-8 flex items-center justify-center'>
            <div className='text-center'>
              <p className='text-sm text-red-600 mb-2'>Failed to load tickets. Please try again.</p>
              <Button variant='outline' size='sm' onClick={() => refetch()} className='text-xs'>
                Try Again
              </Button>
            </div>
          </div>
        ) : tickets.length === 0 ? (
          <EmptyTicketState onAddTicket={() => handleFormChange('create')} />
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.ticketId}
              ticket={ticket}
              onTicketDeleted={() => refetch()}
              eventId={eventId}
            />
          ))
        )}
      </div>

      {tickets.length > 0 ? <TicketSales tickets={tickets} /> : null}
    </div>
  )
}

function EmptyTicketState({ onAddTicket }: { onAddTicket: () => void }) {
  return (
    <div className='w-full py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'>
      <Ticket className='w-12 h-12 text-gray-400 mb-4' />
      <h3 className='text-lg font-medium text-gray-900 mb-2'>No tickets created yet</h3>
      <p className='text-sm text-gray-500 text-center max-w-md'>
        Start by creating your first ticket type. You can add multiple ticket types with different
        pricing and features.
      </p>
      <Button onClick={onAddTicket} className='mt-4 bg-deep-red text-white hover:bg-red-700'>
        Create First Ticket
      </Button>
    </div>
  )
}

function TicketSales({ tickets }: { tickets: TicketData[] }) {
  const salesData = tickets.map((ticket) => ({
    ticketName: ticket.ticketName,
    ticketSold: `${ticket.quantity - ticket.availableQuantity}/${ticket.quantity}`,
    price: `₦${ticket.price.toLocaleString()}`,
    status: ticket.availableQuantity === 0 ? 'SOLD OUT' : ('ONGOING' as const),
  }))

  return (
    <div className='w-full bg-white p-3 md:p-5 flex flex-col gap-5 rounded-[10px]'>
      <div className='flex items-center gap-1'>
        <img src='/assets/harmburger/ticket.png' alt='Ticket' className='size-5' />
        <p className='text-black font-medium text-xl font-sf-pro-display'>Ticket Sales</p>
      </div>

      <BaseTable caption='A table of your ticket sales' columns={columns} data={salesData} />
    </div>
  )
}

function TicketCard({ ticket, onTicketDeleted, eventId }: ITIcketCard) {
  const deleteTicketMutation = useDeleteTicket(eventId)

  const handleDeleteTicket = async () => {
    deleteTicketMutation.mutateAsync(ticket.ticketId, { onSuccess: () => onTicketDeleted() })
  }

  return (
    <div className='w-full h-16 bg-white py-4 pl-3 pr-1 rounded-[8px] flex items-center justify-between shadow-sm border border-gray-100'>
      <div className='flex items-center gap-5'>
        <Button variant='ghost' className='py-0 px-1 w-fit h-fit hover:bg-black/20'>
          <img src='/assets/event/menu.png' alt='Grip' className='size-4' />
        </Button>
        <p className='text-sm font-sf-pro-display text-black'>{ticket.ticketName}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='p-1 !w-fit h-fit hover:bg-black/20'>
            <EllipsisVertical className='w-[3px] h-[13px]' color='#000000' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={handleDeleteTicket}
            disabled={deleteTicketMutation.isPending}
            className='text-red-600 focus:text-red-600'>
            <Trash2 size={16} className='mr-2' />
            {deleteTicketMutation.isPending ? 'Deleting...' : 'Delete Ticket'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const columns: { key: string; label: string }[] = [
  { key: 'ticketName', label: 'Ticket Name' },
  { key: 'ticketSold', label: 'Ticket Sold' },
  { key: 'price', label: 'Price' },
  { key: 'status', label: 'Status' },
]

interface ITIcketCard {
  ticket: TicketData
  onTicketDeleted: () => void
  eventId: string
}
