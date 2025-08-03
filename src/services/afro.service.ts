import type {
  CreateEventRequest,
  CreatePromoCodeRequest,
  CreateThemeRequest,
  CreateTicketRequest,
  CreateVendorRequest,
} from '@/types'
import api from './http.service'

// Event service class
class EventService {
  /**
   * Create a new event
   */
  async createEvent(data: CreateEventRequest): Promise<unknown> {
    const response = await api.post('/api/Event', data)
    return response.data
  }

  /**
   * Create a new ticket for an event
   */
  async createTicket(data: CreateTicketRequest): Promise<unknown> {
    const response = await api.post('/api/Event/ticket', data)
    return response.data
  }

  /**
   * Create a new vendor for an event
   */
  async createVendor(data: CreateVendorRequest): Promise<unknown> {
    const response = await api.post('/api/Event/vendor', data)
    return response.data
  }

  /**
   * Create a new promo code for an event
   */
  async createPromoCode(data: CreatePromoCodeRequest): Promise<unknown> {
    const response = await api.post('/api/Event/promocode', data)
    return response.data
  }

  /**
   * Create a theme for an event
   */
  async createTheme(data: CreateThemeRequest): Promise<unknown> {
    const response = await api.post('/api/Event/theme', data)
    return response.data
  }

  /**
   * Publish an event
   */
  async publishEvent(eventId: string): Promise<unknown> {
    const response = await api.post(`/api/Event/publish/${eventId}`)
    return response.data
  }

  /**
   * Update an event
   */
  async updateEvent(eventId: string, data: CreateEventRequest): Promise<unknown> {
    const response = await api.patch(`/api/Event/${eventId}`, data)
    return response.data
  }

  /**
   * Delete an event
   */
  async deleteEvent(eventId: string): Promise<unknown> {
    const response = await api.delete(`/api/Event/${eventId}`)
    return response.data
  }

  /**
   * Get an event by ID
   */
  async getEvent(eventId: string): Promise<unknown> {
    const response = await api.get(`/api/Event/${eventId}`)
    return response.data
  }
}

// Export service instance
export const eventService = new EventService()
