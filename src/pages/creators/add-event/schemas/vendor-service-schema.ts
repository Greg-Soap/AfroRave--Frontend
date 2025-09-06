import { z } from 'zod'

export const serviceDetails = z.object({
  type: z.enum(['revenue_vendor', 'service_vendor']),
  category: z.string({ required_error: 'Select an option.' }),
  slot_name: z.string({ required_error: 'Provide a name for the service.' }),
  number_of_slots: z.string({ required_error: 'Provide a valid number' }),
  price_per_slot: z.string({ required_error: 'Provide a valid slot' }),
  description: z
    .string({ required_error: 'Provide a detailed description.' })
    .max(450, { message: 'Description too long.' }),
  deadline: z.date({ required_error: 'A date is requierd' }),
})

export const defaultServiceValue: ServiceDetails = {
  type: 'service_vendor',
  category: 'dj_mc',
  slot_name: '',
  number_of_slots: '0',
  price_per_slot: '',
  description: '',
  deadline: new Date(),
}

export type ServiceDetails = z.infer<typeof serviceDetails>

export const contactSchema = z.object({
  useDifferentContactDetails: z.boolean().optional(),
  email: z.string().email(),
  phone: z.array(
    z.object({
      countryCode: z.string({ required_error: 'Select a country code.' }),
      number: z
        .string({ required_error: 'Provide valid number' })
        .max(11, { message: 'Provide a valid number.' }),
    }),
  ),
  showSocialHandles: z.boolean().optional(),
})

export const defaultContactValue: ContactSchema = {
  useDifferentContactDetails: false,
  email: '',
  phone: [{ countryCode: '+234', number: '' }],
  showSocialHandles: true,
}

export type ContactSchema = z.infer<typeof contactSchema>
