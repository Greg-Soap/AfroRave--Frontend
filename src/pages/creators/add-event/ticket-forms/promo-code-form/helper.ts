import type { UseFormReturn } from 'react-hook-form'
import type { TPromoCodeSchema } from '../../schemas/promo-code-schema'
import type { CreatePromoCodeRequest, PromoCodeData } from '@/types'
import type {
  useCreatePromoCode,
  useDeletePromoCode,
  useUpdatePromoCode,
} from '@/hooks/use-event-mutations'

//  type TPromoCode = CreatePromoCodeRequest & { id: string }

interface IHelperFunctionProps {
  form: UseFormReturn<{ promoCodes: TPromoCodeSchema }>
  setCurrentPromoCode: (value: boolean) => void
  setEditingPromoId: (id: string | null) => void
}

function toISODateTime(dateObj: {
  date: Date
  hour: string
  minute: string
  period: 'AM' | 'PM'
}): string {
  const year = dateObj.date.getFullYear()
  const month = dateObj.date.getMonth()
  const day = dateObj.date.getDate()

  let hour = Number(dateObj.hour)
  const minute = Number(dateObj.minute)

  if (hour === 12 && dateObj.period === 'AM') {
    hour = 0
  } else if (hour !== 12 && dateObj.period === 'PM') {
    hour += 12
  }

  const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(
    2,
    '0',
  )} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`

  console.log(formattedDate)

  return formattedDate
}

function populatePromoCodeJson(form: IHelperFunctionProps['form']) {
  const formData = form.getValues().promoCodes

  const promoCodeJson: CreatePromoCodeRequest = {
    promocode: formData.code,
    discountType: 'Percentage',
    discountValue: Number(formData.discount),
    discountUsage: Number(formData.usageLimit),
    startDate: toISODateTime(formData.startDate),
    endDate: toISODateTime(formData.endDate),
    promoCodedetails: {
      tickets: Array.isArray(formData.tickets)
        ? formData.tickets.map((ticket) => ({ id: ticket.id }))
        : [],
    },
    isMinimunSpend: formData.conditions.spend.minimum || false,
    minimumSpend: Number(formData.conditions.spend.amount) || 0,
    isMinimunTickets: formData.conditions.tickets.minimum || false,
    minimumTickets: Number(formData.conditions.tickets.quantity) || 0,
    note: formData.notes || '',
    isPrivate: false,
    isPartnership: formData.partnership.partnershipCode || false,
    partnerName: formData.partnership.name || '',
    comissionType: 'Percentage',
    comission: Number(formData.partnership.comissionRate) || 0,
  }

  return promoCodeJson
}

export function createPromoCode(
  form: IHelperFunctionProps['form'],
  setCurrentPromoCode: IHelperFunctionProps['setCurrentPromoCode'],
  setEditingPromoId: IHelperFunctionProps['setEditingPromoId'],
  eventId: string | null,
  createPromoCodeMutation: ReturnType<typeof useCreatePromoCode>,
) {
  const newPromoCode: CreatePromoCodeRequest = populatePromoCodeJson(form)

  createPromoCodeMutation.mutate(
    { ...newPromoCode, eventId: eventId || '' },
    {
      onSuccess: () => {
        form.reset()
        setCurrentPromoCode(false)
        setEditingPromoId(null)
      },
    },
  )
}

export function updatePromoCode(
  form: IHelperFunctionProps['form'],
  editingPromoId: string | null,
  setCurrentPromoCode: IHelperFunctionProps['setCurrentPromoCode'],
  setEditingPromoId: IHelperFunctionProps['setEditingPromoId'],
  updatePromoCode: ReturnType<typeof useUpdatePromoCode>,
) {
  const updatedPromoCode: CreatePromoCodeRequest = populatePromoCodeJson(form)
  console.log('Updating promo code:', updatedPromoCode)

  updatePromoCode.mutate(
    { promoId: editingPromoId || '', data: updatedPromoCode },
    {
      onSuccess: () => {
        form.reset()
        setCurrentPromoCode(false)
        setEditingPromoId(null)
      },
    },
  )
}

export function addPromoCode(
  form: IHelperFunctionProps['form'],
  setEditingPromoId: IHelperFunctionProps['setEditingPromoId'],
  setCurrentPromoCode: IHelperFunctionProps['setCurrentPromoCode'],
) {
  form.reset()
  setEditingPromoId(null)
  setCurrentPromoCode(true)
}

export function handleEditPromoCode(
  promoCode: PromoCodeData,
  form: IHelperFunctionProps['form'],
  setEditingPromoId: IHelperFunctionProps['setEditingPromoId'],
  setCurrentPromoCode: IHelperFunctionProps['setCurrentPromoCode'],
) {
  const formPromoCode = {
    code: promoCode.promoCode,
    discount: promoCode.discountValue.toString(),
    usageLimit: promoCode.discountUsage.toString(),
    startDate: {
      date: new Date(promoCode.startDate),
      hour: '12',
      minute: '00',
      period: 'AM' as const,
    },
    endDate: {
      date: new Date(promoCode.endDate),
      hour: '12',
      minute: '00',
      period: 'AM' as const,
    },
    conditions: {
      spend: { minimum: false, amount: '0' },
      tickets: {
        minimum: false,
        quantity: '0',
      },
    },
    notes: '',
    partnership: {
      partnershipCode: false,
      name: '',
      comission: false,
      comissionRate: '0',
    },
  }

  form.reset({ promoCodes: formPromoCode })
  setEditingPromoId(promoCode.promoCode) // setEditingPromoId(promoCode.id)
  setCurrentPromoCode(true)
}

export function handleDeletePromoCode(
  promoId: string,
  deletePromoCode: ReturnType<typeof useDeletePromoCode>,
) {
  deletePromoCode.mutate(promoId)
}

export function handleCancelEdit(
  form: IHelperFunctionProps['form'],
  setEditingPromoId: IHelperFunctionProps['setEditingPromoId'],
  setCurrentPromoCode: IHelperFunctionProps['setCurrentPromoCode'],
) {
  form.reset()
  setEditingPromoId(null)
  setCurrentPromoCode(false)
}

export function onSubmit(handleFormChange: (form: string) => void) {
  handleFormChange('upgrades')
}
