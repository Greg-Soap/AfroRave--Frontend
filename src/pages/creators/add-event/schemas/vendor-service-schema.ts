import { z } from 'zod'
import { toMinutes } from '../vendor-forms/helper'

const baseVendorDetails = z.object({
  type: z.enum(['revenue_vendor', 'service_vendor']),
  category: z.string({ required_error: 'Select an option.' }),
  description: z
    .string({ required_error: 'Provide a detailed description.' })
    .max(450, { message: 'Description too long.' }),
  deadline: z.date({ required_error: 'A date is requierd' }),
  useDifferentContactDetails: z.boolean().optional(),
  email: z.string().email().optional(),
  phone: z
    .array(
      z.object({
        countryCode: z.string({ required_error: 'Select a country code.' }),
        number: z
          .string({ required_error: 'Provide valid number' })
          .max(11, { message: 'Provide a valid number.' }),
      }),
    )
    .optional(),
  showSocialHandles: z.boolean().optional(),
})

const timeSchema = z.object({
  hour: z.string(),
  minute: z.string(),
  period: z.enum(['AM', 'PM']),
})

const revenueVendorSchema = z.object({
  baseVendorDetails,
  type: z.literal('revenue_vendor'),
  number_of_slots: z.string({ required_error: 'Provide a valid number' }),
  price_per_slot: z.string({ required_error: 'Provide a valid slot' }),
  slot_name: z.string({ required_error: 'Provide a name for the service.' }),
})

const serviceVendorSchema = z.object({
  baseVendorDetails,
  type: z.literal('service_vendor'),
  service_name: z.string({ required_error: 'Provide a name for the service.' }),
  budget: z
    .object({
      range: z.boolean().optional(),
      minBudget: z.string().optional(),
      maxBudget: z.string().optional(),
    })
    .refine(
      ({ minBudget, maxBudget }) => {
        if (!minBudget || !maxBudget) return true
        const sanitize = (v: string) => Number(v.replace(/[^0-9.]/g, ''))
        const min = sanitize(minBudget)
        const max = sanitize(maxBudget)
        if (Number.isNaN(min) || Number.isNaN(max)) return true
        return min < max
      },
      {
        message: 'Minimum budget must be less than maximum budget.',
        path: ['maxBudget'],
      },
    ),
  startTime: timeSchema.optional(),
  stopTime: timeSchema.optional(),
})

const vendorSchema = z.discriminatedUnion('type', [revenueVendorSchema, serviceVendorSchema])

export const unifiedVendorSchema = z
  .object({
    vendor: vendorSchema,
  })
  .superRefine((data, ctx) => {
    if (data.vendor.type !== 'service_vendor') return

    const { startTime, stopTime } = data.vendor

    if (!startTime || !stopTime) return

    const start = toMinutes(startTime)
    const stop = toMinutes(stopTime)

    if (Number.isNaN(start) || Number.isNaN(stop)) return

    if (!(start < stop)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start time must be earlier than stop time.',
        path: ['vendor', 'stopTime'],
      })
    }
  })

export type VendorSchema = z.infer<typeof unifiedVendorSchema>
