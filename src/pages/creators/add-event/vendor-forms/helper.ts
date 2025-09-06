import type { ServiceDetails } from '../schemas/vendor-service-schema'
import type { UseFormReturn } from 'react-hook-form'

interface IVendorHelperProps {
  form: UseFormReturn<ServiceDetails>
  setCurrentVendor: (currentVendor: boolean) => void
}

export function addVendor(
  form: IVendorHelperProps['form'],
  setCurrentPromoCode: IVendorHelperProps['setCurrentVendor'],
) {
  form.reset()
  setCurrentPromoCode(true)
}
