import { z } from 'zod'

export const EditEventDetailsSchema = z.object({
  name: z.string().max(85, {
    message: 'Event name must not exceed 85 characters.',
  }),
  age_rating: z.enum(['PG', '16+', '18+'], {
    required_error: 'Select an age rating.',
  }),
  category: z.string().min(3, { message: 'Provide a valid category.' }),
  venue: z.string().min(3, { message: 'Provide a valid venue.' }),
  description: z.string().max(950, { message: 'Description must not exceed 950 characters.' }),
  custom_url: z.string().min(3, { message: 'URL too short.' }),
  time_zone: z.string({ required_error: 'Select a time zone.' }),
  start_date: z.object({
    date: z.date({ required_error: 'A start date is required.' }),
    hour: z.string().min(1).max(2),
    minute: z.string().min(1).max(2),
    period: z.enum(['AM', 'PM']),
  }),
  end_date: z.object({
    date: z.date({ required_error: 'A start date is required.' }),
    hour: z.string().min(1).max(2),
    minute: z.string().min(1).max(2),
    period: z.enum(['AM', 'PM']),
  }),
  email: z.string().email(),
  website_url: z.string().min(7, { message: 'Provide a valid link.' }),
  socials: z.object({
    instagram: z.string().optional(),
    x: z.string().optional(),
    tiktok: z.string().optional(),
    facebook: z.string().optional(),
  }),
})
