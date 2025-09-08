import type { VendorSchema } from '../schemas/vendor-service-schema'
import type { UseFormReturn } from 'react-hook-form'

type TSelectedType = 'revenue_vendor' | 'service_vendor'

interface IVendorHelperProps {
  form: UseFormReturn<VendorSchema>
  setCurrentVendor: (currentVendor: boolean) => void
}

export function addVendor(
  selectedType: TSelectedType,
  form: IVendorHelperProps['form'],
  setCurrentPromoCode: IVendorHelperProps['setCurrentVendor'],
) {
  form.setValue('vendor.type', selectedType)
  setCurrentPromoCode(true)
}

export function toMinutes(t: { hour: string; minute: string; period: 'AM' | 'PM' }) {
  const parseNum = (v: string) => Number(v.replace(/\D/g, ''))
  const rawHour = parseNum(t.hour)
  const minute = parseNum(t.minute)
  if (Number.isNaN(rawHour) || Number.isNaN(minute)) return Number.NaN
  const hourIn24 = (rawHour % 12) + (t.period === 'PM' ? 12 : 0)
  return hourIn24 * 60 + minute
}
