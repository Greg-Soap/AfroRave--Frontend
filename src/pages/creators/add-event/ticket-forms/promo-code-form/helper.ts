import type { UseFormReturn } from 'react-hook-form'
import type { TPromoCodeSchema } from '../../schemas/promo-code-schema'
import type { CreatePromoCodeRequest as TPromoCode } from '@/types'
import type { useCreatePromoCode } from '@/hooks/use-event-mutations'

interface IHelperFunctionProps {
  form: UseFormReturn<{ promoCodes: TPromoCodeSchema }>
  setSavedPromoCodes: (updater: (prev: TPromoCode[]) => TPromoCode[]) => void
  setCurrentPromoCode: (value: boolean) => void
  setEditingPromoId: (id: string | null) => void
}

function populatePromoCodeJson(form: IHelperFunctionProps['form']) {
  const formData = form.getValues().promoCodes

  const promoCodeJson: TPromoCode = {
    id: Date.now().toString(),
    promocode: formData.code,
    discountType: 'Percentage',
    discountValue: Number(formData.discount),
    discountUsage: Number(formData.usageLimit),
    startDate: formData.startDate.date.toISOString().split('T')[0],
    endDate: formData.endDate.date.toISOString().split('T')[0],
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
  setSavedPromoCodes: IHelperFunctionProps['setSavedPromoCodes'],
  setCurrentPromoCode: IHelperFunctionProps['setCurrentPromoCode'],
  setEditingPromoId: IHelperFunctionProps['setEditingPromoId'],
  eventId: string | null,
  createPromoCodeMutation: ReturnType<typeof useCreatePromoCode>,
) {
  const newPromoCode: TPromoCode = populatePromoCodeJson(form)

  createPromoCodeMutation.mutate(
    { ...newPromoCode, eventId: eventId || '' },
    {
      onSuccess: () => {
        setSavedPromoCodes((prev) => [...prev, newPromoCode])
        form.reset()
        setCurrentPromoCode(false)
        setEditingPromoId(null)
      },
    },
  )

  form.reset()
  setCurrentPromoCode(false)
  setEditingPromoId(null)
}

export function updatePromoCode(
  form: IHelperFunctionProps['form'],
  editingPromoId: string | null,
  setSavedPromoCodes: IHelperFunctionProps['setSavedPromoCodes'],
  setCurrentPromoCode: IHelperFunctionProps['setCurrentPromoCode'],
  setEditingPromoId: IHelperFunctionProps['setEditingPromoId'],
) {
  const formData = form.getValues()
  console.log('Updating promo code:', formData)

  // Mock update - replace with actual API call
  setSavedPromoCodes((prev) =>
    prev.map((promo) =>
      promo.id === editingPromoId
        ? {
            ...promo,
            ...populatePromoCodeJson(form),
          }
        : promo,
    ),
  )

  form.reset()
  setCurrentPromoCode(false)
  setEditingPromoId(null)
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
  promoCode: TPromoCode,
  form: IHelperFunctionProps['form'],
  setEditingPromoId: IHelperFunctionProps['setEditingPromoId'],
  setCurrentPromoCode: IHelperFunctionProps['setCurrentPromoCode'],
) {
  const formPromoCode = {
    code: promoCode.promocode,
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
      spend: { minimum: promoCode.isMinimunSpend, amount: promoCode.minimumSpend.toString() },
      tickets: {
        minimum: promoCode.isMinimunTickets,
        quantity: promoCode.minimumTickets.toString(),
      },
    },
    notes: promoCode.note,
    partnership: {
      partnershipCode: promoCode.isPartnership,
      name: promoCode.partnerName,
      comission: promoCode.comission > 0,
      comissionRate: promoCode.comission.toString(),
    },
  }

  form.reset({ promoCodes: formPromoCode })
  setEditingPromoId(promoCode.id)
  setCurrentPromoCode(true)
}

export function handleDeletePromoCode(
  promoId: string,
  setSavedPromoCodes: IHelperFunctionProps['setSavedPromoCodes'],
) {
  setSavedPromoCodes((prev) => prev.filter((promo) => promo.id !== promoId))
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
