import { FormBase, FormField } from '@/components/reusable'
import { FormFieldWithCounter } from '@/components/custom/field-with-counter'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { confirmationMailSchema } from '../../schemas/ticket-schema'
import { CustomInput as Input } from '@/components/custom/custom-form'
import { useFormState } from 'react-hook-form'

export function ConfirmationMailForm() {
  const form = useForm<z.infer<typeof confirmationMailSchema>>({
    resolver: zodResolver(confirmationMailSchema),
  })

  const { errors } = useFormState({ control: form.control, name: 'email' })

  function onSubmit(values: z.infer<typeof confirmationMailSchema>) {
    console.log(values)
  }

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className='flex flex-col space-y-0 gap-4 md:px-[50px] xl:px-[402px]'>
      <div className='flex flex-col gap-1 font-sf-pro-display text-black'>
        <div className='flex items-center justify-between'>
          <p className='text-xl font-bold'>Customize your confirmation email</p>
          <p className='text-xs leading-[100%] font-sf-pro-text text-mid-dark-gray'>(OPTIONAl)</p>
        </div>
        <p className='text-sm font-light text-charcoal leading-[100%]'>
          Add a personal touch to the confirmation email your ticket buyers receive after purchase
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        <FormFieldWithCounter
          name='CONFIRMATION EMAIL'
          field_name='confirmationEmail'
          form={form}
          maxLength={250}
          description='optional'>
          {(field) => (
            <Textarea
              placeholder="Nice one! You're locked in"
              className='w-full h-[272px] text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display'
              {...field}
              value={field.value == null ? '' : String(field.value)}
            />
          )}
        </FormFieldWithCounter>
        <div className='w-full flex flex-col gap-4'>
          <div className='flex items-end gap-2 md:gap-6'>
            <FormField showError form={form} name='email' label='EMAIL' className='max-w-[360px]'>
              {(field) => (
                <Input {...field} value={field.value == null ? '' : String(field.value)} />
              )}
            </FormField>

            <Button className='w-[100px] md:w-[160px] h-10 bg-black rounded-[4px]'>
              SEND TEST
            </Button>
          </div>
          <p className='text-deep-red text-sm leading-[100%] font-sf-pro-display'>
            {errors.email?.message}
          </p>
        </div>
      </div>
    </FormBase>
  )
}
