import { CustomFormField as FormField, CustomInput as Input } from '@/components/custom/custom-form'
import { DateForm } from '@/components/custom/date-form'
import { FormFieldWithAbsoluteText } from '@/components/custom/field-with-absolute-text'
import { FormFieldWithCounter } from '@/components/custom/field-with-counter'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { africanTimezones, ageRatings, eventCategories } from '@/pages/creators/edit-event/constant'
import { EditEventDetailsSchema } from '@/schema/edit-event-details'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { SelectField } from '../component/select-field'
import { SubmitBtn } from '../component/submit-btn'
import { TabContainer } from '../component/tab-ctn'

export default function EventDetailsTab({
  setStep,
  setActiveTabState,
}: {
  setStep: (step: number) => void
  setActiveTabState: (tab: string) => void
}) {
  useEffect(() => setStep(1), [])

  const form = useForm<z.infer<typeof EditEventDetailsSchema>>({
    resolver: zodResolver(EditEventDetailsSchema),
    defaultValues: {
      name: '',
      age_rating: 'PG',
      category: 'festival',
      venue: '',
      description: '',
      start_date: {
        date: new Date(),
        hour: '12',
        minute: '00',
        period: 'AM',
      },
      end_date: {
        date: new Date(),
        hour: '12',
        minute: '00',
        period: 'AM',
      },
      email: '',
      website_url: '',
      socials: {
        instagram: '',
        tiktok: '',
        x: '',
      },
    },
  })

  function onSubmit(values: z.infer<typeof EditEventDetailsSchema>) {
    console.log(values)
    setActiveTabState('tickets')
  }

  return (
    <TabContainer<z.infer<typeof EditEventDetailsSchema>>
      heading='EVENT DETAILS'
      className='w-full flex flex-col gap-8'
      form={form}
      onSubmit={onSubmit}>
      <FormFieldWithCounter
        name='EVENT NAME'
        field_name='name'
        form={form}
        className='font-normal'
        maxLength={85}>
        {(field) => (
          <Input
            placeholder='Enter event name.'
            className='uppercase'
            {...field}
            value={field.value == null ? '' : String(field.value)}
          />
        )}
      </FormFieldWithCounter>

      <div className='grid grid-cols-2 gap-8'>
        <SelectField
          form={form}
          name='age_rating'
          label='Age Rating'
          placeholder='Select an age rating.'
          data={ageRatings}
          triggerClassName='w-full'
        />

        <SelectField
          form={form}
          name='category'
          label='Event Category'
          data={eventCategories}
          placeholder='Select a Category.'
          triggerClassName='w-full'
        />
      </div>

      <FormField form={form} name='venue' label='Venue'>
        {(field) => (
          <Input
            placeholder='Enter event venue.'
            className='uppercase'
            {...field}
            value={field.value == null ? '' : String(field.value)}
          />
        )}
      </FormField>

      <FormFieldWithCounter name='DESCRIPTION' field_name='description' form={form} maxLength={950}>
        {(field) => (
          <Textarea
            placeholder='Enter event description.'
            className='w-full h-[272px] text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display'
            {...field}
            value={field.value == null ? '' : String(field.value)}
          />
        )}
      </FormFieldWithCounter>

      <FormFieldWithAbsoluteText
        form={form}
        name='custom_url'
        label='Custom URL'
        text='afrorevive/events/'>
        {(field) => (
          <Input
            placeholder='Enter custom URL.'
            className='border-none h-9 text-xs'
            {...field}
            value={field.value == null ? '' : String(field.value)}
          />
        )}
      </FormFieldWithAbsoluteText>

      <div className='w-full flex flex-col gap-5'>
        <div className='flex flex-col gap-3'>
          <p className='text-xl font-bold text-black font-sf-pro-display'>EVENT DATE</p>
          <p className='font-sf-pro-text text-xs font-light text-black'>
            Select all the dates of your event
          </p>
          <div className='flex gap-2'>
            <Button
              variant='destructive'
              type='button'
              className='w-[160px] h-10 rounded-4px text-sm font-sf-pro-text'>
              Standalone
            </Button>
            <Button
              type='button'
              className='w-[160px] h-10 rounded-4px text-sm font-sf-pro-text bg-[#DDDDDD] text-black hover:bg-black/20'>
              Season
            </Button>
          </div>
        </div>

        <SelectField
          form={form}
          name='time_zone'
          label='Timezone'
          data={africanTimezones}
          placeholder='Select a time zone.'
          triggerClassName='w-full'
        />
      </div>

      <div className='grid grid-cols-2 gap-2 md:flex flex-col md:gap-4'>
        <DateForm
          form={form}
          name='START DATE'
          input_name='start_date.date'
          hour_name='start_date.hour'
          minute_name='start_date.minute'
          period_name='start_date.period'
        />

        <DateForm
          form={form}
          name='END DATE'
          input_name='end_date.date'
          hour_name='end_date.hour'
          minute_name='end_date.minute'
          period_name='end_date.period'
        />
      </div>

      <div className='w-full flex flex-col gap-7'>
        <div className='min-w-full flex flex-col gap-5'>
          <p className='uppercase text-xl text-black font-medium font-sf-pro-text'>
            Contact Details
          </p>

          <div className='w-full flex flex-col gap-6'>
            <FormField form={form} name='email' label='Email'>
              {(field) => (
                <Input
                  placeholder='Enter email address.'
                  {...field}
                  value={field.value == null ? '' : String(field.value)}
                />
              )}
            </FormField>

            <FormField form={form} name='website_url' label='Website URL'>
              {(field) => (
                <Input
                  placeholder='Enter your website URL.'
                  {...field}
                  value={field.value == null ? '' : String(field.value)}
                />
              )}
            </FormField>
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <p className='uppercase text-xl text-black font-medium font-sf-pro-text'>Socials</p>

          <div className='grid md:grid-cols-2 gap-x-8 gap-y-5'>
            {[
              { name: 'socials.instagram' as const, label: 'Instagram' },
              { name: 'socials.x' as const, label: 'X' },
              { name: 'socials.tiktok' as const, label: 'Tiktok' },
              { name: 'socials.facebook' as const, label: 'Facebook' },
            ].map((item) => (
              <FormField key={item.name} form={form} name={item.name} label={item.label}>
                {(field) => (
                  <Input
                    placeholder={`Enter your ${item.label} Link.`}
                    className='text-[#0033A0]'
                    {...field}
                    value={field.value == null ? '' : String(field.value)}
                  />
                )}
              </FormField>
            ))}
          </div>
        </div>
      </div>

      <SubmitBtn />
    </TabContainer>
  )
}
