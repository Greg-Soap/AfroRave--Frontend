import { BasePopover } from '@/components/reusable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  useCreateTicket,
  useDeleteTicket,
  useGetEventTickets,
  useUpdateTicket,
} from '@/hooks/use-event-mutations'
import { transformTicketsToCreateRequest } from '@/lib/event-transforms'
import { FakeDataGenerator } from '@/lib/fake-data-generator'
import { cn } from '@/lib/utils'
import { useEventStore } from '@/stores'
import type { TicketData } from '@/types/event'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ellipsis } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import type { z } from 'zod'
import { SubmitBtn } from '../../component/submit-btn'
import { TabContainer } from '../../component/tab-ctn'
import { defaultUnifiedTicketValues, unifiedTicketFormSchema } from '../../schemas/ticket-schema'
import { ConfirmationMailForm } from './confirmation-mail-form'
import { TicketForm } from './ticket-form'
import { TicketModal } from './ticket-modal'

type TForm = z.infer<typeof unifiedTicketFormSchema>

interface SavedTicket {
  ticketId: string
  ticketName: string
  ticketType: string
  invite_only?: boolean
  price?: number
  quantity?: number
  description?: string
}

type TicketType = 'single_ticket' | 'group_ticket' | 'multi_day'

export default function CreateTicketForm({
  handleFormChange,
  showError,
}: {
  handleFormChange: (form: string) => void
  showError: () => void
}) {
  const createTicketMutation = useCreateTicket()
  const updateTicketMutation = useUpdateTicket()
  const deleteTicketMutation = useDeleteTicket()
  const { eventId } = useEventStore()

  const { data: ticketsResponse, isLoading: isLoadingTickets } = useGetEventTickets(
    eventId || undefined,
  )

  const savedTickets: SavedTicket[] = (ticketsResponse?.data || []).map((ticket: TicketData) => ({
    ticketId: ticket.ticketId,
    ticketName: ticket.ticketName,
    ticketType: 'single_ticket',
    invite_only: false,
    price: ticket.price,
    quantity: ticket.quantity,
    description: ticket.ticketDetails?.description,
  }))

  const form = useForm<TForm>({
    resolver: zodResolver(unifiedTicketFormSchema),
    defaultValues: defaultUnifiedTicketValues as TForm,
  })

  const tickets = useWatch({ control: form.control, name: 'tickets' }) ?? []

  const createTicket = async () => {
    const currentTicket = tickets[tickets.length - 1]
    if (!currentTicket || !eventId) return

    const ticketRequests = transformTicketsToCreateRequest({ tickets: [currentTicket] }, eventId)
    const result = await createTicketMutation.mutateAsync(ticketRequests[0])

    console.log('result', result)

    form.setValue('tickets', [], { shouldDirty: true })
  }

  const addTicket = (selectedType: TicketType) => {
    const current = tickets
    const base = {
      ticketType: selectedType,
      ticketName: '',
      type: 'paid',
      invite_only: false,
      salesType: 'online',
      quantity: { availability: 'limited', amount: '' },
      price: '',
      purchase_limit: '',
      description: '',
    }
    const withTypeFields =
      selectedType === 'group_ticket'
        ? { ...base, group_size: '' }
        : selectedType === 'multi_day'
          ? { ...base, days_valid: '' }
          : base

    form.setValue('tickets', [...current, withTypeFields], { shouldDirty: true })
  }

  const handleEditTicket = async (ticket: SavedTicket) => {
    // TODO: Open edit modal or form with pre-filled data
    console.log('Edit ticket:', ticket)
  }

  // const handleUpdateTicket = async (ticketId: string, updatedData: Partial<SavedTicket>) => {
  //   await updateTicketMutation.mutateAsync({ ticketId, data: updatedData })
  // }

  const handleDeleteTicket = async (ticketId: string) => {
    await deleteTicketMutation.mutateAsync(ticketId)
  }

  async function onSubmit() {
    if (!eventId) return

    handleFormChange('promocode')
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <TabContainer<TForm>
        heading='CREATE TICKETS'
        className='w-full flex flex-col'
        form={form}
        onSubmit={onSubmit}
        actionOnError={showError}>
        <FakeDataGenerator
          type='tickets'
          onGenerate={(data) => {
            form.reset(data as unknown as TForm)
          }}
          buttonText='🎲 Fill with sample data'
          variant='outline'
          className='mb-4'
        />

        {savedTickets.length > 0 && (
          <div className='w-full flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-medium text-gray-700'>
                Created Tickets ({savedTickets.length})
              </p>
              {isLoadingTickets && <span className='text-xs text-gray-500'>Loading...</span>}
            </div>
            {savedTickets.map((ticket: SavedTicket, idx: number) => (
              <CreatedTicketCard
                key={`created-${ticket.ticketId}-${idx}`}
                ticket={ticket}
                onEdit={() => handleEditTicket(ticket)}
                onDelete={() => handleDeleteTicket(ticket.ticketId)}
                isUpdating={updateTicketMutation.isPending}
                isDeleting={deleteTicketMutation.isPending}
              />
            ))}
          </div>
        )}

        {tickets.map((ticket: TForm['tickets'][number], idx: number) => (
          <div
            key={`ticket-${idx}-${ticket.ticketType}`}
            id={`ticket-${idx}`}
            className='w-full flex flex-col gap-8'>
            <TicketForm
              form={form}
              type={ticket.ticketType}
              idx={idx}
              onSubmit={createTicket}
              isLoading={createTicketMutation.isPending}
            />
          </div>
        ))}

        <TicketModal onContinue={addTicket} />
      </TabContainer>

      <ConfirmationMailForm />

      <SubmitBtn />
    </div>
  )
}

function CreatedTicketCard({
  ticket,
  onEdit,
  onDelete,
  isUpdating,
  isDeleting,
}: {
  ticket: SavedTicket
  onEdit: () => void
  onDelete: () => void
  isUpdating: boolean
  isDeleting: boolean
}) {
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex flex-col gap-5'>
        <div className='w-full flex items-center justify-between border border-mid-dark-gray/30 px-3 py-[11px] shadow-[0px_2px_10px_2px_#0000001A] rounded-[5px]'>
          <div className='flex flex-col gap-1'>
            <p className='uppercase text-sm font-sf-pro-display leading-[100%] text-charcoal'>
              {ticket.ticketName || ticket.ticketType}
            </p>
            {ticket.price && <p className='text-xs text-gray-600'>${ticket.price}</p>}
            {ticket.quantity && <p className='text-xs text-gray-600'>Qty: {ticket.quantity}</p>}
          </div>
          <div className='flex items-center gap-3'>
            <CustomBadge text={ticket.ticketType} />
            {ticket.invite_only && <CustomBadge type='invite-only' />}
            <BasePopover
              trigger={
                <Button
                  variant='ghost'
                  className='hover:bg-black/10'
                  disabled={isUpdating || isDeleting}>
                  <Ellipsis width={3} height={15} color='#1E1E1E' />
                </Button>
              }
              content={
                <>
                  <Button variant='ghost' onClick={onEdit} disabled={isUpdating || isDeleting}>
                    {isUpdating ? 'Updating...' : 'Edit'}
                  </Button>
                  <Button
                    variant='ghost'
                    onClick={onDelete}
                    disabled={isUpdating || isDeleting}
                    className='text-red-600 hover:text-red-700'>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </>
              }
            />
          </div>
        </div>
      </div>

      <p className='p-2.5 text-xs leading-[100%] font-sf-pro-display uppercase text-deep-red/70'>
        access the invite link in your dashboard
      </p>
    </div>
  )
}

function CustomBadge({
  type = 'default',
  text = 'invite only',
}: { type?: 'default' | 'invite-only'; text?: string }) {
  return (
    <Badge
      className={cn('py-1.5 px-2 rounded-[6px] text-xs font-sf-pro-rounded leading-[100%]', {
        'bg-[#00AD2E4D] text-[#00AD2E]': type === 'default',
        'bg-deep-red/30 text-deep-red': type === 'invite-only',
      })}>
      {text}
    </Badge>
  )
}
