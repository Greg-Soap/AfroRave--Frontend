import { CustomFormField as FormField, CustomInput as Input } from '@/components/custom/custom-form'
import type { FieldValues, UseFormReturn, Path } from 'react-hook-form'

export function PriceField<T extends FieldValues>({
  form,
  name,
  label = 'PRICE',
}: {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
}) {
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
