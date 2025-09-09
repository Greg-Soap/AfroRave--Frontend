import { CustomFormField as FormField, CustomInput as Input } from '@/components/shared/custom-form'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useWatch } from 'react-hook-form'

interface IPriceField<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  ticketTypeName?: Path<T>
}

export function PriceField<T extends FieldValues>({
  form,
  name,
  label = 'PRICE',
  ticketTypeName,
}: IPriceField<T>) {
  const ticketType = useWatch({ control: form.control, name: ticketTypeName || (name as Path<T>) })
  const isFreeTicket = ticketType === 'free'

  if (isFreeTicket) {
    return (
      <div className='w-full h-9 flex items-center gap-3'>
        <p className='py-[11px] w-14 h-full flex items-center justify-center bg-[#acacac] rounded-[5px]'>
          FREE
        </p>
        <div className='w-full h-9 flex items-center px-3 bg-gray-100 rounded-[5px] text-gray-500 text-sm'>
          Free ticket
        </div>
      </div>
    )
  }

  return (
    <FormField form={form} name={name} label={label} className='w-full'>
      {(field) => (
        <div className='w-full h-9 flex items-center gap-3'>
          <p className='py-[11px] w-14 h-full flex items-center justify-center bg-[#acacac] rounded-[5px]'>
            ₦
          </p>
          <Input
            type='number'
            className='w-full h-9'
            {...field}
            value={field.value == null ? '' : String(field.value)}
          />
        </div>
      )}
    </FormField>
  )
}
