import { CustomFormField as FormField, CustomInput as Input } from '@/components/custom/custom-form'
import { DateForm } from '@/components/custom/date-form'
import { FormFieldWithAbsoluteText } from '@/components/custom/field-with-absolute-text'
import { FormFieldWithCounter } from '@/components/custom/field-with-counter'
import { FormBase } from '@/components/reusable'
import { BaseSelect } from '@/components/reusable'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { getRoutePath } from '@/config/get-route-path'
import { useUpdateEvent } from '@/hooks/use-event-mutations'
import { OnlyShowIf } from '@/lib/environment'
import { EditEventDetailsSchema } from '@/schema/edit-event-details'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type { z } from 'zod'
import { africanTimezones, ageRatings, eventCategories, frequencyOptions } from '../constant'
import type { EventDetailData } from '@/types'

export default function EventDetailsTab({ event }: { event: EventDetailData }) {
  return (
    <div className='w-full flex flex-col p-0 md:p-14 gap-2.5'>
      <div className='flex flex-col gap-4 w-full md:min-w-[560px] max-w-[800px]'>
        <p className='uppercase font-sf-pro-display font-black text-black text-xl'>Event Details</p>

        <EventDetailsForm event={event} />
      </div>
    </div>
  )
}

function EventDetailsForm({ event }: { event: EventDetailData }) {
  const [eventType, setEventType] = useState<'standalone' | 'season'>('standalone')

  const eventId = event.eventId

  const updateEventMutation = useUpdateEvent()

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof EditEventDetailsSchema>>({
    resolver: zodResolver(EditEventDetailsSchema),
    defaultValues: {
      name: event.eventName,
      age_rating: event.ageRating,
      category: event.ageRating,
      venue: event.venue,
      description: event.description,
      event_type: 'standalone',
      frequency: event.eventDate.frequency as 'Daily' | 'Weekly' | 'Monthly',
      occurrence: event.eventDate.occurance,
      start_date: {
        date: new Date(event.eventDate.startDate),
        hour: convertTime(event.eventDate.startTime).hour,
        minute: convertTime(event.eventDate.startTime).minute,
        period: convertTime(event.eventDate.startTime).period as 'AM' | 'PM',
      },
      end_date: {
        date: new Date(event.eventDate.startDate),
        hour: convertTime(event.eventDate.endTime).hour,
        minute: convertTime(event.eventDate.endTime).minute,
        period: convertTime(event.eventDate.endTime).period as 'AM' | 'PM',
      },
      email: event.eventDetails.eventContact.email,
      website_url: event.eventDetails.eventContact.website,
      socials: {
        instagram: event.eventDetails.socials.instagram,
        tiktok: event.eventDetails.socials.tiktok,
        x: event.eventDetails.socials.x,
        facebook: event.eventDetails.socials.facebook,
      },
    },
  })

  // Update form values when event type changes
  useEffect(() => {
    form.setValue('event_type', eventType)
    if (eventType === 'standalone') {
      form.setValue('frequency', undefined)
      form.setValue('occurrence', undefined)
    } else {
      form.setValue('frequency', 'Weekly')
      form.setValue('occurrence', 1)
    }
  }, [eventType, form])

  async function onSubmit(values: z.infer<typeof EditEventDetailsSchema>) {
    if (!eventId) {
      console.error('No event ID found')
      return
    }

    try {
      const eventData = {
        eventName: values.name,
        ageRating: values.age_rating,
        category: values.category,
        venue: values.venue,
        description: values.description,
        customUrl: values.custom_url || '',
        eventId: eventId,
        eventDate: {
          timezone: values.time_zone || 'Africa/Lagos',
          startDate: values.start_date.date.toISOString(),
          endDate: values.end_date.date.toISOString(),
          frequency: values.frequency || 'Weekly',
          startTime: `${values.start_date.hour}:${values.start_date.minute} ${values.start_date.period}`,
          endTime: `${values.end_date.hour}:${values.end_date.minute} ${values.end_date.period}`,
          occurance: values.occurrence || 1,
        },
        eventDetails: {
          termsOfRefund: '',
          eventContact: {
            email: values.email,
            website: values.website_url,
          },
          socials: {
            instagram: values.socials.instagram || '',
            x: values.socials.x || '',
            tiktok: values.socials.tiktok || '',
            facebook: '',
          },
        },
      }

      await updateEventMutation.mutateAsync({ eventId, data: eventData })
      console.log('Event updated successfully')

      // Navigate to creator dashboard after successful update
      navigate(getRoutePath('creators_home'))
    } catch (error) {
      console.error('Failed to update event:', error)
    }
  }

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className='w-full flex flex-col space-y-5 md:space-y-8'>
      <FormFieldWithCounter name='NAME' field_name='name' form={form} maxLength={85}>
        {(field) => (
          <Input
            placeholder='Enter event name.'
            className='uppercase'
            {...field}
            value={field.value == null ? '' : String(field.value)}
          />
        )}
      </FormFieldWithCounter>

      <div className='w-full grid grid-cols-2 gap-5 md:gap-8'>
        <FormField form={form} name='age_rating' label='Age Rating'>
          {(field) => (
            <BaseSelect
              type='auth'
              items={ageRatings}
              defaultValue='PG'
              placeholder='Select an age rating.'
              triggerClassName='w-full h-10 text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display'
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        </FormField>

        <FormField form={form} name='category' label='Event Category'>
          {(field) => (
            <BaseSelect
              type='auth'
              items={eventCategories}
              placeholder='Select a Category.'
              triggerClassName='w-full h-10 text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display'
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        </FormField>
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
            className='uppercase border-none h-9'
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
              variant={eventType === 'standalone' ? 'destructive' : 'outline'}
              type='button'
              onClick={() => setEventType('standalone')}
              className='w-[160px] h-10 rounded-4px text-sm font-sf-pro-text'>
              Standalone
            </Button>
            <Button
              variant={eventType === 'season' ? 'destructive' : 'outline'}
              type='button'
              onClick={() => setEventType('season')}
              className='w-[160px] h-10 rounded-4px text-sm font-sf-pro-text'>
              Season
            </Button>
          </div>
        </div>

        <FormField form={form} name='time_zone' label='Timezone'>
          {(field) => (
            <BaseSelect
              type='auth'
              items={africanTimezones}
              defaultValue='Africa/Lagos'
              placeholder='Select a time zone.'
              triggerClassName='w-full h-10 text-black px-3 py-[11px] bg-white rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display'
              value={field.value as string}
              onChange={field.onChange}
            />
          )}
        </FormField>

        <OnlyShowIf condition={eventType === 'season'}>
          <div className='grid grid-cols-2 gap-4'>
            <FormField form={form} name='frequency' label='Frequency'>
              {(field) => (
                <BaseSelect
                  type='auth'
                  items={frequencyOptions}
                  placeholder='Select frequency.'
                  triggerClassName='w-full h-10 text-black px-3 py-[11px] bg-white rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display'
                  value={field.value as string}
                  onChange={field.onChange}
                />
              )}
            </FormField>

            <FormField form={form} name='occurrence' label='Occurrence'>
              {(field) => (
                <Input
                  type='number'
                  min={1}
                  max={365}
                  placeholder='Enter number of occurrences.'
                  {...field}
                  value={field.value == null ? '' : String(field.value)}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value, 10)
                    if (value >= 1 && value <= 365) {
                      field.onChange(value)
                    }
                  }}
                />
              )}
            </FormField>
          </div>
        </OnlyShowIf>
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

      {/**Contact */}
      <div className='flex flex-col gap-5'>
        <SectionHeader name='CONTACT DETAILS' />

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

      {/**Socials */}
      <div className='flex flex-col gap-5'>
        <SectionHeader name='SOCIALS' />

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
    </FormBase>
  )
}

function SectionHeader({ name }: { name: string }) {
  return <p className='text-xl font-medium font-sf-pro-text text-black -mb-3'>{name}</p>
}

function convertTime(time: string) {
  const [hm, period] = time.split(' ')
  const [hour, minute] = hm.split(':')

  return { hour, period, minute }
}
