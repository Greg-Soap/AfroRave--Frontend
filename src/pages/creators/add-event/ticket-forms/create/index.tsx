import { CustomFormField as FormField } from '@/components/custom/custom-form'
import { DateForm } from '@/components/custom/date-form'
import { BaseCheckbox } from '@/components/reusable/base-checkbox'
import { Button } from '@/components/ui/button'
import { useCreateTicket } from '@/hooks/use-event-mutations'
import { transformTicketsToCreateRequest } from '@/lib/event-transforms'
import { FakeDataGenerator } from '@/lib/fake-data-generator'
import { useEventStore } from '@/stores'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { SubmitBtn } from '../../component/submit-btn'
import { TabContainer } from '../../component/tab-ctn'
import { ChevronDown, Ellipsis } from 'lucide-react'
import { OnlyShowIf } from '@/lib/environment'
import { TicketModal } from './ticket-modal'
import { TicketForm } from './ticket-form'
import { unifiedTicketFormSchema, defaultUnifiedTicketValues } from '../../schemas/ticket-schema'
import { cn } from '@/lib/utils'
import { BasePopover } from '@/components/reusable'
import { Badge } from '@/components/ui/badge'
import { ConfirmationMailForm } from './confirmation-mail-form'
import { useWatch } from 'react-hook-form'

type TForm = z.infer<typeof unifiedTicketFormSchema>
type TicketType = 'single_ticket' | 'group_ticket' | 'multi_day'

export default function CreateTicketForm({
  handleFormChange,
  showError,
}: {
  handleFormChange: (form: string) => void
  showError: () => void
}) {
  const [openAdvancedOptions, setOpenAdvancedOptions] = useState(false)

  const createTicketMutation = useCreateTicket()
  const { eventId } = useEventStore()

  const form = useForm<TForm>({
    resolver: zodResolver(unifiedTicketFormSchema),
    defaultValues: defaultUnifiedTicketValues as TForm,
  })

  const tickets = useWatch({ control: form.control, name: 'tickets' }) ?? []

  const addTicket = (selectedType: TicketType) => {
    const current = tickets // already from form
    const base = {
      ticketType: selectedType,
      ticketName: '',
      type: 'paid',
      invite_only: false,
      salesType: 'online',
      quantity: { availability: 'limited', amount: '' },
      price: '',
      purchase_limit: '',
      description: '',
    }
    const withTypeFields =
      selectedType === 'group_ticket'
        ? { ...base, group_size: '' }
        : selectedType === 'multi_day'
          ? { ...base, days_valid: '' }
          : base

    form.setValue('tickets', [...current, withTypeFields], { shouldDirty: true })
  }

  async function onSubmit(values: TForm) {
    try {
      if (!eventId) {
        console.error('No event ID found. Please create an event first.')
        return
      }

      // Transform form data to API format
      const ticketRequests = transformTicketsToCreateRequest(
        values as unknown as z.infer<typeof unifiedTicketFormSchema>,
        eventId,
      )

      // Create tickets sequentially
      const results = []
      for (const ticketData of ticketRequests) {
        const result = await createTicketMutation.mutateAsync(ticketData)
        results.push(result)
      }

      console.log('Tickets created successfully:', results)

      // Navigate to the next form
      handleFormChange('promocode')
    } catch (error) {
      console.error('Failed to create tickets:', error)
      // Error handling is already done in the mutation
    }
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <TabContainer<TForm>
        heading='CREATE TICKETS'
        className='w-full flex flex-col'
        form={form}
        onSubmit={onSubmit}
        actionOnError={showError}>
        <CreatedTicketCards name='vip' ticketType='single ticket' isInviteOnly />
        <FakeDataGenerator
          type='tickets'
          onGenerate={(data) => form.reset(data as unknown as TForm)}
          buttonText='🎲 Fill with sample data'
          variant='outline'
          className='mb-4'
        />

        {tickets.map((ticket: TForm['tickets'][number], idx: number) => (
          <TicketForm key={idx} form={form} type={ticket.ticketType} idx={idx} />
        ))}

        <TicketModal onContinue={addTicket} />

        <OnlyShowIf condition={tickets.length >= 1}>
          <div className='w-[488px] flex flex-col gap-5'>
            <Button
              variant='ghost'
              type='button'
              onClick={() => setOpenAdvancedOptions(!openAdvancedOptions)}
              className='w-fit flex items-center gap-1 !px-1 text-charcoal'>
              <ChevronDown width={28} height={17} />
              <span className='font-bold font-sf-pro-display leading-[100%] uppercase'>
                Advanced Options
              </span>
            </Button>

            <OnlyShowIf condition={openAdvancedOptions}>
              <div className='flex flex-col gap-[18px]'>
                <p className='uppercase font-bold font-sf-pro-display text-black'>
                  When Should Ticket Sales Start?
                </p>

                <FormField form={form} name='whenToStart'>
                  {(field) => (
                    <BaseCheckbox
                      orientation='vertical'
                      data={whenToStartOptions[0]}
                      {...field}
                      labelClassName='text-base'
                      descriptionClassName='text-xs'
                    />
                  )}
                </FormField>
              </div>
            </OnlyShowIf>

            <OnlyShowIf condition={form.getValues('whenToStart') === 'at-a-scheduled-date'}>
              <DateForm
                form={form}
                name='START DATE'
                input_name='scheduledDate.date'
                hour_name='scheduledDate.hour'
                minute_name='scheduledDate.minute'
                period_name='scheduledDate.period'
              />
            </OnlyShowIf>
          </div>
        </OnlyShowIf>
      </TabContainer>

      <ConfirmationMailForm />

      <SubmitBtn isLoading={createTicketMutation.isPending} />
    </div>
  )
}

function CreatedTicketCards({
  name,
  ticketType,
  isInviteOnly = false,
}: { name: string; ticketType: string; isInviteOnly?: boolean }) {
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex flex-col gap-5'>
        <div className='w-full flex items-center justify-between border border-mid-dark-gray/30 px-3 py-[11px] shadow-[0px_2px_10px_2px_#0000001A] rounded-[5px]'>
          <p className='uppercase text-sm font-sf-pro-display leading-[100%] text-charcoal'>
            {name}
          </p>
          <div className='flex items-center gap-3'>
            <CustomBadge text={ticketType} />
            {isInviteOnly && <CustomBadge type='invite-only' />}
            <BasePopover
              trigger={
                <Button variant='ghost' className='hover:bg-black/10'>
                  <Ellipsis width={3} height={15} color='#1E1E1E' />
                </Button>
              }
              content={
                <>
                  <Button variant='ghost'>Edit</Button>
                  <Button variant='ghost'>Delete</Button>
                </>
              }
            />
          </div>
        </div>
      </div>

      <p className='p-2.5 text-xs leading-[100%] font-sf-pro-display uppercase text-deep-red/70'>
        access the invite link in your dashboard
      </p>
    </div>
  )
}

function CustomBadge({
  type = 'default',
  text = 'invite only',
}: { type?: 'default' | 'invite-only'; text?: string }) {
  return (
    <Badge
      className={cn('py-1.5 px-2 rounded-[6px] text-xs font-sf-pro-rounded leading-[100%]', {
        'bg-[#00AD2E4D] text-[#00AD2E]': type === 'default',
        'bg-deep-red/30 text-deep-red': type === 'invite-only',
      })}>
      {text}
    </Badge>
  )
}

const whenToStartOptions = [
  {
    items: [
      {
        label: 'START SALES IMMEDIATELY',
        id: 'immediately',
        description: 'Tickets go on sale as soon as your event is live',
      },
      {
        label: 'Schedule Sales Start',
        id: 'at-a-scheduled-date',
        description: 'Pick a date/time to open sales after your event page is live',
      },
    ],
  },
]
