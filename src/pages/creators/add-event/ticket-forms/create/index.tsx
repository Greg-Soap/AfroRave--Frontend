import { BasePopover } from '@/components/reusable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  useCreateTicket,
  useDeleteTicket,
  useGetEventTickets,
  useUpdateTicket,
} from '@/hooks/use-event-mutations'
import { FakeDataGenerator } from '@/lib/fake-data-generator'
import { cn } from '@/lib/utils'
import { useEventStore } from '@/stores'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import type { z } from 'zod'
import { TabContainer } from '../../component/tab-ctn'
import { defaultUnifiedTicketValues, unifiedTicketFormSchema } from '../../schemas/ticket-schema'
import { ConfirmationMailForm } from './confirmation-mail-form'
import {
  type SavedTicket,
  type TicketType,
  addTicket,
  createTicket,
  fillCurrentFormWithSampleData,
  handleCancelEdit,
  handleDeleteTicket,
  handleEditTicket,
  onSubmit,
  transformTicketsResponse,
  updateTicket,
} from './helper'
import { TicketForm } from './ticket-form'
import { TicketModal } from './ticket-modal'

type TForm = z.infer<typeof unifiedTicketFormSchema>

export default function CreateTicketForm({
  handleFormChange,
  showError,
}: {
  handleFormChange: (form: string) => void
  showError: () => void
}) {
  const { eventId } = useEventStore()

  const createTicketMutation = useCreateTicket(eventId || '')
  const updateTicketMutation = useUpdateTicket(eventId || '')
  const deleteTicketMutation = useDeleteTicket(eventId || '')

  const { data: ticketsResponse, isLoading: isLoadingTickets } = useGetEventTickets(
    eventId || undefined,
  )

  const savedTickets: SavedTicket[] = transformTicketsResponse(ticketsResponse)

  const form = useForm<TForm>({
    resolver: zodResolver(unifiedTicketFormSchema),
    defaultValues: defaultUnifiedTicketValues as TForm,
  })

  const tickets = useWatch({ control: form.control, name: 'tickets' }) ?? []

  const [editingTicketId, setEditingTicketId] = useState<string | null>(null)
  const [currentTicketType, setCurrentTicketType] = useState<TicketType | null>(null)

  const handleCreateTicket = () =>
    createTicket(
      tickets,
      eventId,
      form,
      createTicketMutation,
      setEditingTicketId,
      setCurrentTicketType,
    )

  const handleUpdateTicket = () =>
    updateTicket(
      tickets,
      eventId,
      editingTicketId,
      form,
      updateTicketMutation,
      setEditingTicketId,
      setCurrentTicketType,
    )

  const handleAddTicket = (selectedType: TicketType) =>
    addTicket(selectedType, form, setEditingTicketId, setCurrentTicketType)

  const handleEditTicketWrapper = (ticket: SavedTicket) =>
    handleEditTicket(ticket, form, setEditingTicketId, setCurrentTicketType)

  const handleDeleteTicketWrapper = (ticketId: string) =>
    handleDeleteTicket(ticketId, deleteTicketMutation)

  const handleCancelEditWrapper = () =>
    handleCancelEdit(form, setEditingTicketId, setCurrentTicketType)

  const handleFillSampleData = () => fillCurrentFormWithSampleData(tickets, currentTicketType, form)

  const handleSubmit = () => onSubmit(eventId, handleFormChange)

  return (
    <div className='w-full flex flex-col gap-8'>
      <TabContainer<TForm>
        heading='CREATE TICKETS'
        className='w-full flex flex-col'
        form={form}
        onSubmit={handleSubmit}
        actionOnError={showError}>
        {tickets.length > 0 && currentTicketType && (
          <FakeDataGenerator
            type='tickets'
            onGenerate={handleFillSampleData}
            buttonText='🎲 Fill with sample data'
            variant='outline'
            className='mb-4'
          />
        )}

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
                onEdit={() => handleEditTicketWrapper(ticket)}
                onDelete={() => handleDeleteTicketWrapper(ticket.ticketId)}
                isUpdating={updateTicketMutation.isPending}
                isDeleting={deleteTicketMutation.isPending}
              />
            ))}
          </div>
        )}

        {tickets.length > 0 && (
          <div className='w-full flex flex-col gap-8'>
            <TicketForm
              form={form}
              type={tickets[0].ticketType}
              idx={0}
              onSubmit={editingTicketId ? handleUpdateTicket : handleCreateTicket}
              isLoading={
                editingTicketId ? updateTicketMutation.isPending : createTicketMutation.isPending
              }
              isEditMode={!!editingTicketId}
              onCancel={editingTicketId ? handleCancelEditWrapper : undefined}
            />
          </div>
        )}

        {tickets.length === 0 && <TicketModal onContinue={handleAddTicket} />}
      </TabContainer>

      <ConfirmationMailForm />
      <div className='flex flex-col md:flex-row items-center gap-3 md:gap-8 justify-center py-8'>
        <Button
          type='submit'
          variant='destructive'
          onClick={() => handleFormChange('promocode')}
          className='w-full md:w-[240px] h-10 rounded-[8px] pt-[13px] px-[153px] text-xs font-sf-pro-text uppercase'>
          Continue
        </Button>
      </div>
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
            <CustomBadge text={ticket.ticketType.replace('_', ' ')} />
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
