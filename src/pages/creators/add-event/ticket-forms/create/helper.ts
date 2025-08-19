/* eslint-disable @typescript-eslint/no-explicit-any */
import { transformTicketsToCreateRequest } from '@/lib/event-transforms'
import { defaultUnifiedTicketValues } from '../../schemas/ticket-schema'

export interface SavedTicket {
  ticketId: string
  ticketName: string
  ticketType: string
  invite_only?: boolean
  price?: number
  quantity?: number
  description?: string
}

export type TicketType = 'single_ticket' | 'group_ticket' | 'multi_day'

export function createTicket(
  tickets: any[],
  eventId: string | null,
  form: any,
  createTicketMutation: any,
  setEditingTicketId: (id: string | null) => void,
  setCurrentTicketType: (type: TicketType | null) => void,
) {
  const currentTicket = tickets[0]
  if (!currentTicket || !eventId) return

  const ticketRequests = transformTicketsToCreateRequest({ tickets: [currentTicket] }, eventId)
  createTicketMutation.mutateAsync(ticketRequests[0])

  form.reset(defaultUnifiedTicketValues)
  setEditingTicketId(null)
  setCurrentTicketType(null)
}

export function updateTicket(
  tickets: any[],
  eventId: string | null,
  editingTicketId: string | null,
  form: any,
  updateTicketMutation: any,
  setEditingTicketId: (id: string | null) => void,
  setCurrentTicketType: (type: TicketType | null) => void,
) {
  const currentTicket = tickets[0]
  if (!currentTicket || !eventId || !editingTicketId) return

  const ticketRequests = transformTicketsToCreateRequest({ tickets: [currentTicket] }, eventId)
  updateTicketMutation.mutateAsync({
    ticketId: editingTicketId,
    data: ticketRequests[0],
  })

  form.reset(defaultUnifiedTicketValues)
  setEditingTicketId(null)
  setCurrentTicketType(null)
}

export function addTicket(
  selectedType: TicketType,
  form: any,
  setEditingTicketId: (id: string | null) => void,
  setCurrentTicketType: (type: TicketType | null) => void,
) {
  form.reset(defaultUnifiedTicketValues)
  setEditingTicketId(null)

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

  form.setValue('whenToStart', 'at-a-scheduled-date', { shouldDirty: true })
  form.setValue(
    'scheduledDate',
    {
      date: new Date(),
      hour: '12',
      minute: '00',
      period: 'AM' as const,
    },
    { shouldDirty: true },
  )

  form.setValue('tickets', [withTypeFields], { shouldDirty: true })
  setCurrentTicketType(selectedType)
}

export function handleEditTicket(
  ticket: SavedTicket,
  form: any,
  setEditingTicketId: (id: string | null) => void,
  setCurrentTicketType: (type: TicketType | null) => void,
) {
  const formTicket = {
    ticketType: ticket.ticketType as TicketType,
    ticketName: ticket.ticketName || '',
    type: 'paid' as const,
    invite_only: ticket.invite_only || false,
    salesType: 'online' as const,
    quantity: {
      availability: 'limited' as const,
      amount: ticket.quantity?.toString() || '100',
    },
    price: ticket.price?.toString() || '1000',
    purchase_limit: '5',
    description: ticket.description || 'Sample ticket description',
    ...(ticket.ticketType === 'group_ticket' && { group_size: '4' }),
    ...(ticket.ticketType === 'multi_day' && { days_valid: '3' }),
  }

  form.reset(defaultUnifiedTicketValues)

  form.setValue('whenToStart', 'at-a-scheduled-date', { shouldDirty: true })
  form.setValue(
    'scheduledDate',
    {
      date: new Date(),
      hour: '12',
      minute: '00',
      period: 'AM' as const,
    },
    { shouldDirty: true },
  )

  form.setValue('tickets', [formTicket], { shouldDirty: true })
  setEditingTicketId(ticket.ticketId)
  setCurrentTicketType(ticket.ticketType as TicketType)
}

export function handleDeleteTicket(ticketId: string, deleteTicketMutation: any) {
  deleteTicketMutation.mutateAsync(ticketId)
}

export function handleCancelEdit(
  form: any,
  setEditingTicketId: (id: string | null) => void,
  setCurrentTicketType: (type: TicketType | null) => void,
) {
  form.reset(defaultUnifiedTicketValues)
  setEditingTicketId(null)
  setCurrentTicketType(null)
}

export function fillCurrentFormWithSampleData(
  tickets: any[],
  currentTicketType: TicketType | null,
  form: any,
) {
  if (tickets.length === 0 || !currentTicketType) return

  const sampleTicket = {
    ticketName: `Sample ${currentTicketType.replace('_', ' ')}`,
    type: 'paid' as const,
    invite_only: false,
    salesType: 'online' as const,
    ticketType: currentTicketType,
    quantity: {
      availability: 'limited' as const,
      amount: '100',
    },
    price: '5000',
    purchase_limit: '5',
    description: 'This is a sample ticket description for testing purposes.',
    ...(currentTicketType === 'group_ticket' && { group_size: '4' }),
    ...(currentTicketType === 'multi_day' && { days_valid: '3' }),
  }

  form.reset(defaultUnifiedTicketValues)

  form.setValue('whenToStart', 'at-a-scheduled-date', { shouldDirty: true })
  form.setValue(
    'scheduledDate',
    {
      date: new Date(),
      hour: '12',
      minute: '00',
      period: 'AM' as const,
    },
    { shouldDirty: true },
  )

  form.setValue('tickets', [sampleTicket], { shouldDirty: true })
}

export function onSubmit(eventId: string | null, handleFormChange: (form: string) => void) {
  if (!eventId) return
  handleFormChange('promocode')
}

export function transformTicketsResponse(ticketsResponse: any): SavedTicket[] {
  return (ticketsResponse?.data || []).map((ticket: any) => ({
    ticketId: ticket.ticketId,
    ticketName: ticket.ticketName,
    ticketType: 'single_ticket',
    invite_only: false,
    price: ticket.price,
    quantity: ticket.quantity,
    description: ticket.ticketDetails?.description,
  }))
}
