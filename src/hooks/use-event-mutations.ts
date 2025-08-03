import { eventService } from '@/services/event.service'
import type {
  CreateEventRequest,
  CreatePromoCodeRequest,
  CreateThemeRequest,
  CreateTicketRequest,
  CreateVendorRequest,
} from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// Query keys for event-related queries
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters: string) => [...eventKeys.lists(), { filters }] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
  organizer: () => [...eventKeys.all, 'organizer'] as const,
  trending: () => [...eventKeys.all, 'trending'] as const,
}

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateEventRequest) => eventService.createEvent(data),
    onSuccess: (data) => {
      // Invalidate and refetch organizer events
      queryClient.invalidateQueries({ queryKey: eventKeys.organizer() })

      // Show success message
      toast.success('Event created successfully!')

      // You can also navigate to the next tab or return the created event data
      console.log('Event created:', data)
    },
    onError: (error) => {
      console.error('Failed to create event:', error)
      toast.error('Failed to create event. Please try again.')
    },
  })
}

export function useUpdateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: CreateEventRequest }) =>
      eventService.updateEvent(eventId, data),
    onSuccess: (data, variables) => {
      // Invalidate specific event and organizer events
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(variables.eventId) })
      queryClient.invalidateQueries({ queryKey: eventKeys.organizer() })

      toast.success('Event updated successfully!')
      console.log('Event updated:', data)
    },
    onError: (error) => {
      console.error('Failed to update event:', error)
      toast.error('Failed to update event. Please try again.')
    },
  })
}

export function useDeleteEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (eventId: string) => eventService.deleteEvent(eventId),
    onSuccess: (data, eventId) => {
      // Remove the event from cache and invalidate lists
      queryClient.removeQueries({ queryKey: eventKeys.detail(eventId) })
      queryClient.invalidateQueries({ queryKey: eventKeys.organizer() })

      toast.success('Event deleted successfully!')
      console.log('Event deleted:', data)
    },
    onError: (error) => {
      console.error('Failed to delete event:', error)
      toast.error('Failed to delete event. Please try again.')
    },
  })
}

export function usePublishEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (eventId: string) => eventService.publishEvent(eventId),
    onSuccess: (data, eventId) => {
      // Invalidate specific event and trending events
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId) })
      queryClient.invalidateQueries({ queryKey: eventKeys.trending() })
      queryClient.invalidateQueries({ queryKey: eventKeys.organizer() })

      toast.success('Event published successfully!')
      console.log('Event published:', data)
    },
    onError: (error) => {
      console.error('Failed to publish event:', error)
      toast.error('Failed to publish event. Please try again.')
    },
  })
}

// Ticket mutations
export function useCreateTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTicketRequest) => eventService.createTicket(data),
    onSuccess: (data) => {
      toast.success('Ticket created successfully!')
      console.log('Ticket created:', data)
    },
    onError: (error) => {
      console.error('Failed to create ticket:', error)
      toast.error('Failed to create ticket. Please try again.')
    },
  })
}

export function useUpdateTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ ticketId, data }: { ticketId: string; data: CreateTicketRequest }) =>
      eventService.updateTicket(ticketId, data),
    onSuccess: (data) => {
      toast.success('Ticket updated successfully!')
      console.log('Ticket updated:', data)
    },
    onError: (error) => {
      console.error('Failed to update ticket:', error)
      toast.error('Failed to update ticket. Please try again.')
    },
  })
}

export function useDeleteTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ticketId: string) => eventService.deleteTicket(ticketId),
    onSuccess: (data) => {
      toast.success('Ticket deleted successfully!')
      console.log('Ticket deleted:', data)
    },
    onError: (error) => {
      console.error('Failed to delete ticket:', error)
      toast.error('Failed to delete ticket. Please try again.')
    },
  })
}

// Vendor mutations
export function useCreateVendor() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateVendorRequest) => eventService.createVendor(data),
    onSuccess: (data) => {
      toast.success('Vendor created successfully!')
      console.log('Vendor created:', data)
    },
    onError: (error) => {
      console.error('Failed to create vendor:', error)
      toast.error('Failed to create vendor. Please try again.')
    },
  })
}

export function useUpdateVendor() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ vendorId, data }: { vendorId: string; data: CreateVendorRequest }) =>
      eventService.updateVendor(vendorId, data),
    onSuccess: (data) => {
      toast.success('Vendor updated successfully!')
      console.log('Vendor updated:', data)
    },
    onError: (error) => {
      console.error('Failed to update vendor:', error)
      toast.error('Failed to update vendor. Please try again.')
    },
  })
}

export function useDeleteVendor() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (vendorId: string) => eventService.deleteVendor(vendorId),
    onSuccess: (data) => {
      toast.success('Vendor deleted successfully!')
      console.log('Vendor deleted:', data)
    },
    onError: (error) => {
      console.error('Failed to delete vendor:', error)
      toast.error('Failed to delete vendor. Please try again.')
    },
  })
}

// Promo code mutations
export function useCreatePromoCode() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePromoCodeRequest) => eventService.createPromoCode(data),
    onSuccess: (data) => {
      toast.success('Promo code created successfully!')
      console.log('Promo code created:', data)
    },
    onError: (error) => {
      console.error('Failed to create promo code:', error)
      toast.error('Failed to create promo code. Please try again.')
    },
  })
}

export function useUpdatePromoCode() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ promoId, data }: { promoId: string; data: CreatePromoCodeRequest }) =>
      eventService.updatePromoCode(promoId, data),
    onSuccess: (data) => {
      toast.success('Promo code updated successfully!')
      console.log('Promo code updated:', data)
    },
    onError: (error) => {
      console.error('Failed to update promo code:', error)
      toast.error('Failed to update promo code. Please try again.')
    },
  })
}

export function useDeletePromoCode() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (promoId: string) => eventService.deletePromoCode(promoId),
    onSuccess: (data) => {
      toast.success('Promo code deleted successfully!')
      console.log('Promo code deleted:', data)
    },
    onError: (error) => {
      console.error('Failed to delete promo code:', error)
      toast.error('Failed to delete promo code. Please try again.')
    },
  })
}

// Theme mutations
export function useCreateTheme() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateThemeRequest) => eventService.createTheme(data),
    onSuccess: (data) => {
      toast.success('Theme created successfully!')
      console.log('Theme created:', data)
    },
    onError: (error) => {
      console.error('Failed to create theme:', error)
      toast.error('Failed to create theme. Please try again.')
    },
  })
}

export function useUpdateTheme() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: CreateThemeRequest }) =>
      eventService.updateTheme(eventId, data),
    onSuccess: (data) => {
      toast.success('Theme updated successfully!')
      console.log('Theme updated:', data)
    },
    onError: (error) => {
      console.error('Failed to update theme:', error)
      toast.error('Failed to update theme. Please try again.')
    },
  })
}
