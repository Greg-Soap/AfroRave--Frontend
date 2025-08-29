import { z } from 'zod'

export const promoCodeSchema = z
  .object({
    code: z.string().min(5, { message: 'Code too short.' }).max(20, { message: 'Code too short' }),
    discount: z.string({ required_error: 'Provide a valid amount.' }),
    usageLimit: z.string({ required_error: 'Provide a usage limit' }),
    onePerCustomer: z.boolean().optional(),
    startDate: z.object({
      date: z.date({ required_error: 'A start date is required.' }),
      hour: z.string().min(1).max(2),
      minute: z.string().min(1).max(2),
      period: z.enum(['AM', 'PM']),
    }),
    endDate: z.object({
      date: z.date({ required_error: 'A start date is required.' }),
      hour: z.string().min(1).max(2),
      minute: z.string().min(1).max(2),
      period: z.enum(['AM', 'PM']),
    }),
    tickets: z.array(z.object({ id: z.string({ required_error: 'Kindly select a ticket.' }) })),
    conditions: z.object({
      spend: z.object({
        minimum: z.boolean().optional(),
        amount: z.string().optional(),
      }),
      tickets: z.object({
        minimum: z.boolean().optional(),
        quantity: z.string().optional(),
      }),
    }),
    notes: z.string().max(250, { message: 'Note too long.' }).optional(),
    partnership: z.object({
      partnershipCode: z.boolean().optional(),
      name: z.string().optional(),
      comission: z.boolean().optional(),
      comissionRate: z.string().optional(),
    }),
  })
  .refine(
    (data) => {
      if (data.conditions.spend.minimum === true) {
        return !!data.conditions.spend.amount && data.conditions.spend.amount.trim() !== ''
      }
      return true
    },
    {
      message: 'Amount is required when spend minimum is required',
      path: ['conditions', 'spend', 'amount'],
    },
  )
  .refine(
    (data) => {
      if (data.conditions.tickets.minimum === true) {
        return !!data.conditions.tickets.quantity && data.conditions.tickets.quantity.trim() !== ''
      }
      return true
    },
    {
      message: 'Amount is required when purchased minimum is required',
      path: ['conditions', 'tickets', 'quantity'],
    },
  )
  .refine(
    (data) => {
      if (data.partnership.partnershipCode === true) {
        return !!data.partnership.name && data.partnership.name.trim() !== ''
      }
      return true
    },
    {
      message: 'Name is required when partnership code is enabled',
      path: ['partnership', 'name'],
    },
  )
  .refine(
    (data) => {
      if (data.partnership.comission === true) {
        return !!data.partnership.comissionRate && data.partnership.comissionRate.trim() !== ''
      }
      return true
    },
    {
      message: 'Comission rate is required when comission is enabled',
      path: ['partnership', 'comissionRate'],
    },
  )

export type TPromoCodeSchema = z.infer<typeof promoCodeSchema>

export const defaultPromoCodeValues: z.infer<typeof promoCodeSchema> = {
  code: '',
  discount: '',
  usageLimit: '100',
  onePerCustomer: true,
  startDate: {
    date: new Date(),
    hour: '12',
    minute: '00',
    period: 'AM',
  },
  endDate: {
    date: new Date(),
    hour: '12',
    minute: '00',
    period: 'AM',
  },
  tickets: [],
  conditions: {
    spend: {
      minimum: false,
      amount: '',
    },
    tickets: {
      minimum: false,
      quantity: '',
    },
  },
  notes: '',
  partnership: {
    partnershipCode: false,
    name: '',
    comission: false,
    comissionRate: '',
  },
}
