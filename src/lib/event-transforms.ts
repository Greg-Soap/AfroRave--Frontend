import type { EditEventDetailsSchema } from '@/schema/edit-event-details'
import type { CreateEventRequest } from '@/types'
import type { z } from 'zod'

/**
 * Transform form data from EventDetailsTab to CreateEventRequest format
 */
export function transformEventDetailsToCreateRequest(
  formData: z.infer<typeof EditEventDetailsSchema>,
  eventId?: string,
): CreateEventRequest {
  // Convert time format from 12-hour to 24-hour
  const convertTo24Hour = (hour: string, minute: string, period: 'AM' | 'PM'): string => {
    let hour24 = Number.parseInt(hour, 10)
    if (period === 'PM' && hour24 !== 12) hour24 += 12
    if (period === 'AM' && hour24 === 12) hour24 = 0
    return `${hour24.toString().padStart(2, '0')}:${minute}`
  }

  // Format date to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0]
  }

  // Generate a unique event ID if not provided
  const generatedEventId = eventId || crypto.randomUUID()

  return {
    eventName: formData.name,
    ageRating: formData.age_rating,
    categoryId: formData.category, // This might need to be a UUID in the actual API
    venue: formData.venue,
    description: formData.description,
    customUrl: formData.custom_url,
    eventId: generatedEventId,
    eventDate: {
      timezone: formData.time_zone,
      startDate: formatDate(formData.start_date.date),
      endDate: formatDate(formData.end_date.date),
      frequency: 'once', // Default to once, can be made configurable
      startTime: convertTo24Hour(
        formData.start_date.hour,
        formData.start_date.minute,
        formData.start_date.period,
      ),
      endTime: convertTo24Hour(
        formData.end_date.hour,
        formData.end_date.minute,
        formData.end_date.period,
      ),
      occurance: 1, // Default to 1, can be made configurable
    },
    eventDetails: {
      termsOfRefund: '', // This field is not in the form, can be added later
      eventContact: {
        email: formData.email,
        website: formData.website_url,
      },
      socials: {
        instagram: formData.socials.instagram || '',
        x: formData.socials.x || '',
        tiktok: formData.socials.tiktok || '',
        facebook: formData.socials.facebook || '',
      },
    },
  }
}

/**
 * Transform CreateEventRequest back to form data format
 */
export function transformCreateRequestToEventDetails(
  eventData: CreateEventRequest,
): Partial<z.infer<typeof EditEventDetailsSchema>> {
  // Convert 24-hour time back to 12-hour format
  const convertTo12Hour = (
    time24: string,
  ): { hour: string; minute: string; period: 'AM' | 'PM' } => {
    const [hour, minute] = time24.split(':')
    const hourNum = Number.parseInt(hour, 10)
    const period = hourNum >= 12 ? 'PM' : 'AM'
    const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum
    return {
      hour: hour12.toString(),
      minute,
      period,
    }
  }

  const startTime = convertTo12Hour(eventData.eventDate.startTime)
  const endTime = convertTo12Hour(eventData.eventDate.endTime)

  return {
    name: eventData.eventName,
    age_rating: eventData.ageRating,
    category: eventData.categoryId,
    venue: eventData.venue,
    description: eventData.description,
    custom_url: eventData.customUrl,
    time_zone: eventData.eventDate.timezone,
    start_date: {
      date: new Date(eventData.eventDate.startDate),
      hour: startTime.hour,
      minute: startTime.minute,
      period: startTime.period,
    },
    end_date: {
      date: new Date(eventData.eventDate.endDate),
      hour: endTime.hour,
      minute: endTime.minute,
      period: endTime.period,
    },
    email: eventData.eventDetails.eventContact.email,
    website_url: eventData.eventDetails.eventContact.website,
    socials: {
      instagram: eventData.eventDetails.socials.instagram,
      x: eventData.eventDetails.socials.x,
      tiktok: eventData.eventDetails.socials.tiktok,
      facebook: eventData.eventDetails.socials.facebook,
    },
  }
}
