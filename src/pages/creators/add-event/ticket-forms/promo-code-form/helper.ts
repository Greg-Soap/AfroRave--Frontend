/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultPromoCodeValues } from '../../schemas/promo-code-schema'

export interface SavedPromoCode {
  id: string
  code: string
  discountType: string
  discountAmount: number
  usageLimit: number
  onePerCustomer: boolean
  startDate: string
  endDate: string
  private: boolean
  notes?: string
}

export function createPromoCode(
  form: any,
  setSavedPromoCodes: (updater: (prev: SavedPromoCode[]) => SavedPromoCode[]) => void,
  setCurrentPromoCode: (value: boolean) => void,
  setEditingPromoId: (id: string | null) => void,
) {
  const formData = form.getValues()
  console.log('Creating promo code:', formData)

  // Mock creation - replace with actual API call
  const newPromoCode: SavedPromoCode = {
    id: Date.now().toString(),
    code: formData.promoCodes[0].code,
    discountType: formData.promoCodes[0].discount.type,
    discountAmount: Number(formData.promoCodes[0].discount.amount),
    usageLimit: Number(formData.promoCodes[0].usageLimit),
    onePerCustomer: formData.promoCodes[0].onePerCustomer || false,
    startDate: formData.promoCodes[0].startDate.date.toISOString().split('T')[0],
    endDate: formData.promoCodes[0].endDate.date.toISOString().split('T')[0],
    private: formData.promoCodes[0].private || false,
    notes: formData.promoCodes[0].notes || '',
  }

  setSavedPromoCodes((prev) => [...prev, newPromoCode])

  // Reset form
  form.reset({ promoCodes: defaultPromoCodeValues })
  setCurrentPromoCode(false)
  setEditingPromoId(null)
}

export function updatePromoCode(
  form: any,
  editingPromoId: string | null,
  setSavedPromoCodes: (updater: (prev: SavedPromoCode[]) => SavedPromoCode[]) => void,
  setCurrentPromoCode: (value: boolean) => void,
  setEditingPromoId: (id: string | null) => void,
) {
  const formData = form.getValues()
  console.log('Updating promo code:', formData)

  // Mock update - replace with actual API call
  setSavedPromoCodes((prev) =>
    prev.map((promo) =>
      promo.id === editingPromoId
        ? {
            ...promo,
            code: formData.promoCodes[0].code,
            discountType: formData.promoCodes[0].discount.type,
            discountAmount: Number(formData.promoCodes[0].discount.amount),
            usageLimit: Number(formData.promoCodes[0].usageLimit),
            onePerCustomer: formData.promoCodes[0].onePerCustomer || false,
            startDate: formData.promoCodes[0].startDate.date.toISOString().split('T')[0],
            endDate: formData.promoCodes[0].endDate.date.toISOString().split('T')[0],
            private: formData.promoCodes[0].private || false,
            notes: formData.promoCodes[0].notes || '',
          }
        : promo,
    ),
  )

  // Reset form
  form.reset({ promoCodes: defaultPromoCodeValues })
  setCurrentPromoCode(false)
  setEditingPromoId(null)
}

export function addPromoCode(
  form: any,
  setEditingPromoId: (id: string | null) => void,
  setCurrentPromoCode: (value: boolean) => void,
) {
  // Clear any existing form
  form.reset({ promoCodes: defaultPromoCodeValues })
  setEditingPromoId(null)
  setCurrentPromoCode(true)
}

export function handleEditPromoCode(
  promoCode: SavedPromoCode,
  form: any,
  setEditingPromoId: (id: string | null) => void,
  setCurrentPromoCode: (value: boolean) => void,
) {
  // Convert saved promo code to form format
  const formPromoCode = [
    {
      code: promoCode.code,
      discount: {
        type: promoCode.discountType as 'percentage' | 'fixed',
        amount: promoCode.discountAmount.toString(),
      },
      usageLimit: promoCode.usageLimit.toString(),
      onePerCustomer: promoCode.onePerCustomer,
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
        spend: { minimum: false, amount: '' },
        purchased: { minimum: false, amount: '' },
      },
      private: promoCode.private,
      notes: promoCode.notes || '',
      perks: [''],
      partnershipCode: false,
    },
  ]

  // Set form values and enter edit mode
  form.reset({ promoCodes: formPromoCode })
  setEditingPromoId(promoCode.id)
  setCurrentPromoCode(true)
}

export function handleDeletePromoCode(
  promoId: string,
  setSavedPromoCodes: (updater: (prev: SavedPromoCode[]) => SavedPromoCode[]) => void,
) {
  // Mock deletion - replace with actual API call
  setSavedPromoCodes((prev) => prev.filter((promo) => promo.id !== promoId))
}

export function handleCancelEdit(
  form: any,
  setEditingPromoId: (id: string | null) => void,
  setCurrentPromoCode: (value: boolean) => void,
) {
  form.reset({ promoCodes: defaultPromoCodeValues })
  setEditingPromoId(null)
  setCurrentPromoCode(false)
}

export function onSubmit(handleFormChange: (form: string) => void) {
  handleFormChange('upgrades')
}
