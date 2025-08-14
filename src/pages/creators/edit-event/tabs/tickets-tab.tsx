import BaseTable from '@/components/reusable/base-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDeleteTicket } from '@/hooks/use-event-mutations'
import { eventService } from '@/services/event.service'
import type { TicketData } from '@/types'
import { EllipsisVertical, Plus, Ticket, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function TicketsTab() {
  const { eventId } = useParams()
  const fetchEventTickets = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await eventService.getEventTickets(eventId)
      setTickets(response.data || [])
    } catch (err) {
      console.error('Failed to fetch event tickets:', err)
      setError('Failed to load tickets. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [eventId])

  const [tickets, setTickets] = useState<TicketData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (eventId) {
      fetchEventTickets()
    }
  }, [eventId, fetchEventTickets])

  const handleTicketDeleted = () => {
    // Refresh tickets after deletion
    fetchEventTickets()
  }

  return (
    <div className='w-full flex flex-col-reverse md:flex-col gap-14 md:p-14'>
      <div className='flex flex-col pl-2 gap-[13px]'>
        <div className='flex items-center justify-between'>
          <p className='font-sf-pro-display font-black text-black text-xl'>Ticket Types</p>

          <Button className='hover:bg-black/10 rounded-[5px] bg-white flex items-center gap-1.5 px-2 py-[13px] font-sf-pro-text font-medium text-deep-red text-[11px]'>
            <Plus size={12} />
            ADD TICKET
          </Button>
        </div>

        {isLoading ? (
          <div className='w-full py-8 flex items-center justify-center'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-deep-red mx-auto mb-2'></div>
              <p className='text-sm text-gray-600'>Loading tickets...</p>
            </div>
          </div>
        ) : error ? (
          <div className='w-full py-8 flex items-center justify-center'>
            <div className='text-center'>
              <p className='text-sm text-red-600 mb-2'>{error}</p>
              <Button variant='outline' size='sm' onClick={fetchEventTickets} className='text-xs'>
                Try Again
              </Button>
            </div>
          </div>
        ) : tickets.length === 0 ? (
          <EmptyTicketState />
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.ticketId}
              ticket={ticket}
              onTicketDeleted={handleTicketDeleted}
            />
          ))
        )}
      </div>

      {tickets.length > 0 ? <TicketSales tickets={tickets} /> : null}
    </div>
  )
}

function EmptyTicketState() {
  return (
    <div className='w-full py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'>
      <Ticket className='w-12 h-12 text-gray-400 mb-4' />
      <h3 className='text-lg font-medium text-gray-900 mb-2'>No tickets created yet</h3>
      <p className='text-sm text-gray-500 text-center max-w-md'>
        Start by creating your first ticket type. You can add multiple ticket types with different
        pricing and features.
      </p>
    </div>
  )
}

function TicketSales({ tickets }: { tickets: TicketData[] }) {
  // Transform ticket data for the sales table
  const salesData = tickets.map((ticket) => ({
    ticketName: ticket.ticketName,
    ticketSold: `${ticket.quantity - ticket.availableQuantity}/${ticket.quantity}`,
    price: `₦${ticket.price.toLocaleString()}`,
    status: ticket.availableQuantity === 0 ? 'SOLD OUT' : ('ONGOING' as const),
  }))

  return (
    <div className='w-full bg-white p-3 md:p-8 flex flex-col gap-5 rounded-[10px]'>
      <div className='flex items-center gap-1'>
        <img src='/assets/harmburger/ticket.png' alt='Ticket' className='size-5' />
        <p className='text-black font-medium text-xl font-sf-pro-display'>Ticket Sales</p>
      </div>

      <BaseTable caption='A table of your ticket sales' columns={columns} data={salesData} />
    </div>
  )
}

function TicketCard({
  ticket,
  onTicketDeleted,
}: { ticket: TicketData; onTicketDeleted: () => void }) {
  const deleteTicketMutation = useDeleteTicket()

  const handleDeleteTicket = async () => {
    try {
      await deleteTicketMutation.mutateAsync(ticket.ticketId)
      console.log('Ticket deleted successfully')
      onTicketDeleted()
    } catch (error) {
      console.error('Failed to delete ticket:', error)
    }
  }

  return (
    <div className='w-full h-16 bg-white py-4 pl-3 pr-1 rounded-[8px] flex items-center justify-between shadow-sm border border-gray-100'>
      <div className='flex items-center gap-5'>
        <Button variant='ghost' className='py-0 px-1 w-fit h-fit hover:bg-black/20'>
          <img src='/assets/event/menu.png' alt='Grip' className='size-4' />
        </Button>
        <div className='flex flex-col'>
          <p className='text-sm font-sf-pro-display text-black'>{ticket.ticketName}</p>
          <p className='text-xs text-gray-500'>
            {ticket.availableQuantity} of {ticket.quantity} available
          </p>
        </div>
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
