import { FormCount } from '../../component/form-count'
import type { UseFormReturn } from 'react-hook-form'
import type { z } from 'zod'
import { FormFieldWithCounter } from '@/components/custom/field-with-counter'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/reusable'
import { BaseCheckbox } from '@/components/reusable/base-checkbox'
import { BaseBooleanCheckbox } from '@/components/reusable/base-boolean-checkbox'
import { SelectField } from '../../component/select-field'
import { Button } from '@/components/ui/button'
import { PriceField } from '../../component/price-field'
import { Textarea } from '@/components/ui/textarea'
import type { unifiedTicketFormSchema } from '../../schemas/ticket-schema'
import { OnlyShowIf } from '@/lib/environment'

export function TicketForm({ form, idx, type }: ITicketFormProps) {
  return (
    <>
      <FormCount name='TICKET' idx={idx} />

      <div className='flex flex-col gap-3'>
        <FormFieldWithCounter
          name='TICKET NAME'
          field_name={`tickets.${idx}.ticketName`}
          form={form}
          className='font-normal'
          maxLength={65}>
          {(field) => (
            <Input
              placeholder='VIP Access'
              className='uppercase border-mid-dark-gray/50'
              {...field}
              value={field.value == null ? '' : String(field.value)}
            />
          )}
        </FormFieldWithCounter>

        <FormField form={form} name={`tickets.${idx}.type`}>
          {(field) => (
            <BaseCheckbox
              data={{
                items: [
                  { label: 'PAID', id: 'paid' },
                  { label: 'FREE', id: 'free' },
                ],
              }}
              {...field}
              labelClassName='text-xs'
              descriptionClassName='max-w-[255px]'
            />
          )}
        </FormField>

        <FormField form={form} name={`tickets.${idx}.invite_only`}>
          {(field) => (
            <BaseBooleanCheckbox
              data={{ items: [{ label: 'Invite only', id: 'invite-only' }] }}
              showCheckbox={false}
              labelClassName='w-[92px] h-8 flex justify-center rounded-[5px] opacity-70 bg-white shadow-[0px_2px_10px_2px_#0000001A]'
              {...field}
            />
          )}
        </FormField>
      </div>

      <div className='grid grid-cols-2 gap-8'>
        <SelectField
          form={form}
          name={`tickets.${idx}.salesType`}
          label='SALES TYPE'
          data={salesTypeItems}
          placeholder='Select a type of sale.'
          triggerClassName='w-full'
        />

        <TicketType type={type} />
      </div>

      <div className='grid grid-cols-2 gap-8'>
        <div className='flex items-end gap-3'>
          <SelectField
            form={form}
            name={`tickets.${idx}.quantity.availability`}
            label='QUANTITY'
            className='w-fit'
            data={availability}
            placeholder='Select availability.'
          />

          <FormField form={form} name={`tickets.${idx}.quantity.amount`} className='mb-2'>
            {(field) => (
              <Input
                className='w-full h-9'
                {...field}
                value={field.value == null ? '' : String(field.value)}
              />
            )}
          </FormField>
        </div>

        <PriceField form={form} name={`tickets.${idx}.price`} />
      </div>

      <SelectField
        form={form}
        name={`tickets.${idx}.purchase_limit`}
        label='PURCHASE LIMIT'
        className='w-full'
        data={availability}
        placeholder='SELECT'
        triggerClassName='w-full'
      />

      <OnlyShowIf condition={type === 'group_ticket'}>
        <SelectField
          form={form}
          name={`tickets.${idx}.group_size`}
          label='GROUP SIZE'
          className='w-full'
          data={availability}
          placeholder='SELECT'
          triggerClassName='w-full'
        />
      </OnlyShowIf>

      <OnlyShowIf condition={type === 'multi_day'}>
        <SelectField
          form={form}
          name={`tickets.${idx}.days_valid`}
          label='DAYS VALID'
          className='w-full'
          data={availability}
          placeholder='SELECT'
          triggerClassName='w-full'
        />
      </OnlyShowIf>

      <FormFieldWithCounter
        name='DESCRIPTION'
        field_name={`tickets.${idx}.description`}
        form={form}
        maxLength={450}>
        {(field) => (
          <Textarea
            placeholder='Enter event description.'
            className='w-full h-[272px] text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display'
            {...field}
            value={field.value == null ? '' : String(field.value)}
          />
        )}
      </FormFieldWithCounter>

      <Button
        type='submit'
        className='w-[120px] h-8 rounded-full text-xs font-semibold font-sf-pro-text text-white shadow-[0px_2px_10px_2px_#0000001A]'>
        CREATE TICKET
      </Button>
    </>
  )
}

function TicketType({ type }: { type: ITicketFormProps['type'] }) {
  const labels = {
    single_ticket: 'SINGLE TICKET',
    group_ticket: 'GROUP TICKET',
    multi_day: 'MULTI DAY',
  } as const

  return (
    <div className='w-full flex flex-col gap-3'>
      <p className='text-sm text-charcoal leading-[100%] font-sf-pro-text'>TICKET TYPE</p>

      <p className='w-full h-9 flex items-center justify-center text-sm font-sf-pro-display leading-[100%] text-[#686868] rounded-[5px] border border-mid-dark-gray/50 bg-[#D9D9D9]'>
        {labels[type]}
      </p>
    </div>
  )
}

const salesTypeItems: { value: string; label: string }[] = [
  { value: 'online', label: 'Online' },
  { value: 'offline', label: 'Offline' },
  { value: 'both', label: 'Both' },
]

const availability: { value: string; label: string }[] = [
  { value: 'limited', label: 'Limited' },
  { value: 'unlimited', label: 'Unlimited' },
]

interface ITicketFormProps {
  form: UseFormReturn<z.infer<typeof unifiedTicketFormSchema>>
  idx: number
  type: 'single_ticket' | 'group_ticket' | 'multi_day'
}
