import type { FieldValues, UseFormReturn, Path } from 'react-hook-form'
import { BaseDatePicker } from '../reusable/base-date-picker'
import { FormField } from '../reusable'
import { TimeForm } from './time-form'
import { cn } from '@/lib/utils'

export function DateForm<T extends FieldValues>({
  form,
  input_name,
  hour_name,
  period_name,
  minute_name,
  date_label,
  time_label,
  flow = 'column',
}: IDateFormProps<T>) {
  return (
    <div
      className={cn('w-full', {
        'flex flex-col gap-8': flow === 'column',
        'grid grid-cols-2 gap-5 items-start': flow === 'row',
      })}>
      <FormField
        form={form}
        name={input_name}
        label={date_label}
        className='w-full flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text'>
        {(field) => (
          <BaseDatePicker
            value={field.value as Date}
            onChange={field.onChange}
            onBlur={field.onBlur}
            className='w-full min-h-10 bg-white border-mid-dark-gray/50 rounded-[4px] hover:bg-black/10 font-sf-pro-display'
          />
        )}
      </FormField>

      <TimeForm
        form={form}
        hour_name={hour_name}
        period_name={period_name}
        minute_name={minute_name}
        label={time_label}
      />
    </div>
  )
}

interface IDateFormProps<T extends FieldValues> {
  name: string
  input_name: Path<T>
  form: UseFormReturn<T>
  hour_name: Path<T>
  minute_name: Path<T>
  period_name: Path<T>
  date_label?: string
  time_label?: string
  flow?: 'row' | 'column'
}
