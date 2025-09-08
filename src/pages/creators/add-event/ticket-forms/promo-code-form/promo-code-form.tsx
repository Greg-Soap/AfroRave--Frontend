import { CustomFormField as FormField, CustomInput as Input } from '@/components/custom/custom-form'
import { DateForm } from '@/components/custom/date-form'
import { FormFieldWithCounter } from '@/components/custom/field-with-counter'
import type { IBaseCheckbox } from '@/components/reusable/base-boolean-checkbox'
import { BaseBooleanCheckbox } from '@/components/reusable/base-boolean-checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PriceField } from '../../component/price-field'
import { TabContainer } from '../../component/tab-ctn'
import {
  defaultPromoCodeValues,
  promoCodeSchema,
  type TPromoCodeSchema,
} from '../../schemas/promo-code-schema'
import {
  addPromoCode,
  createPromoCode,
  handleCancelEdit,
  handleDeletePromoCode,
  handleEditPromoCode,
  onSubmit,
  updatePromoCode,
} from './helper'
import type { PromoCodeData, TicketData } from '@/types'
import { useEventStore } from '@/stores'
import {
  useGetEventPromoCodes,
  useGetEventTickets,
  useGetPromoCode,
} from '@/hooks/use-event-mutations'
import { BaseCheckbox } from '@/components/reusable/base-checkbox'
import { useCreatePromoCode, useUpdatePromoCode } from '@/hooks/use-event-mutations'
import { OnlyShowIf } from '@/lib/environment'
import { ActionPopover } from '../../component/action-popover'
import { useDeletePromoCode } from '@/hooks/use-event-mutations'
import { AddButton } from '../../component/add-btn'
import { ContinueButton } from '../../component/continue-button'

export default function PromoCodeForm({
  handleFormChange,
}: {
  handleFormChange: (form: string) => void
}) {
  const [editingPromoId, setEditingPromoId] = useState<string | null>(null)
  const [currentPromoCode, setCurrentPromoCode] = useState<boolean>(false)

  const { eventId } = useEventStore()
  const createPromoCodeMutation = useCreatePromoCode(eventId || '')
  const updatePromoCodeMutation = useUpdatePromoCode(eventId || '')
  const deletePromoCodeMutation = useDeletePromoCode(eventId || '')
  const eventTickets = useGetEventTickets(eventId || '').data?.data
  const { data: createdPromoCodes } = useGetEventPromoCodes(eventId || '')
  const { data: promoCodeDetails } = useGetPromoCode(editingPromoId || '')

  const form = useForm<{ promoCodes: TPromoCodeSchema }>({
    resolver: zodResolver(z.object({ promoCodes: promoCodeSchema })),
    defaultValues: { promoCodes: defaultPromoCodeValues },
  })

  useEffect(() => {
    if (promoCodeDetails?.data && editingPromoId) {
      console.log('Promo code details loaded:', promoCodeDetails.data)
      handleEditPromoCode(promoCodeDetails.data, form, setEditingPromoId, setCurrentPromoCode)
    }
  }, [promoCodeDetails, editingPromoId])

  const handleCreatePromoCode = () =>
    createPromoCode(form, setCurrentPromoCode, setEditingPromoId, eventId, createPromoCodeMutation)

  const handleUpdatePromoCode = () =>
    updatePromoCode(
      form,
      editingPromoId,
      setCurrentPromoCode,
      setEditingPromoId,
      updatePromoCodeMutation,
    )

  const handleAddPromoCode = () => addPromoCode(form, setEditingPromoId, setCurrentPromoCode)

  const handleEditPromoCodeWrapper = (promoCode: PromoCodeData) => {
    console.log('Editing promo code:', promoCode)
    setEditingPromoId(promoCode.promocodeId)
    setCurrentPromoCode(true)
  }

  const handleDeletePromoCodeWrapper = (promoId: string) =>
    handleDeletePromoCode(promoId, deletePromoCodeMutation)

  const handleCancelEditWrapper = () =>
    handleCancelEdit(form, setEditingPromoId, setCurrentPromoCode)

  const handleSubmit = () => onSubmit(handleFormChange)

  return (
    <div className='w-full flex flex-col gap-8'>
      <TabContainer<{ promoCodes: TPromoCodeSchema }>
        heading='ENABLE PROMO CODES'
        description='Code names must be unique per event'
        className='max-w-[560px] w-full flex flex-col'
        form={form}
        onSubmit={handleSubmit}>
        {createdPromoCodes?.data && createdPromoCodes.data.length > 0 && (
          <div className='w-full flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-medium text-gray-700'>
                Created Promo Codes ({createdPromoCodes.data.length})
              </p>
            </div>
            {createdPromoCodes.data.map((promoCode) => (
              <CreatedPromoCard
                key={promoCode.promoCode}
                promoCode={promoCode}
                onEdit={() => handleEditPromoCodeWrapper(promoCode)}
                onDelete={() => handleDeletePromoCodeWrapper(promoCode.promocodeId)}
                isUpdating={updatePromoCodeMutation.isPending}
                isDeleting={deletePromoCodeMutation.isPending}
              />
            ))}
          </div>
        )}

        {/* Only show form when there's a promo code to create/edit */}
        <OnlyShowIf condition={currentPromoCode}>
          <div className='w-full flex flex-col gap-8'>
            <PromoCodeFormFields
              form={form}
              eventTickets={eventTickets}
              onSubmit={editingPromoId ? handleUpdatePromoCode : handleCreatePromoCode}
              isEditMode={!!editingPromoId}
              onCancel={editingPromoId ? handleCancelEditWrapper : undefined}
            />
          </div>
        </OnlyShowIf>

        {/* Only show add promo code button when no form is active */}
        <OnlyShowIf condition={!currentPromoCode}>
          <AddButton onClick={handleAddPromoCode} name='ADD PROMO CODE' />
        </OnlyShowIf>
      </TabContainer>

      <ContinueButton
        disabled={createdPromoCodes?.data.length === 0}
        onClick={() => handleFormChange('upgrades')}
      />
    </div>
  )
}

function PromoCodeFormFields({
  form,
  onSubmit,
  isEditMode = false,
  onCancel,
  eventTickets,
}: IPromoCodeFormFields) {
  return (
    <>
      <FormFieldWithCounter
        name='promo code'
        field_name='promoCodes.code'
        form={form}
        className='font-normal'
        maxLength={20}>
        {(field) => (
          <Input
            className='uppercase'
            {...field}
            value={field.value == null ? '' : String(field.value)}
          />
        )}
      </FormFieldWithCounter>

      <FormField form={form} name='promoCodes.tickets' label='APPLY TO'>
        {(field) => (
          <>
            {eventTickets?.map((item) => (
              <BaseCheckbox
                key={item.eventName}
                data={{
                  items: [{ label: item.ticketName, id: item.ticketId }],
                }}
                multiSelect={true}
                {...field}
              />
            ))}
          </>
        )}
      </FormField>

      <div className='grid md:grid-cols-2 gap-5 items-end'>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-sf-pro-text font-medium text-system-black'>DISCOUNT VALUE</p>
          <div className='grid grid-cols-2 gap-3'>
            <FieldText text='OFF' />

            <FormField form={form} name='promoCodes.discount' className='mb-2'>
              {(field) => (
                <Input
                  type='number'
                  className='w-full h-9'
                  {...field}
                  value={field.value == null ? '' : String(field.value)}
                />
              )}
            </FormField>
          </div>
        </div>

        <FormField form={form} name='promoCodes.usageLimit' label='usage limit' className='mb-2'>
          {(field) => (
            <Input
              type='number'
              className='w-full h-9'
              {...field}
              value={field.value == null ? '' : String(field.value)}
            />
          )}
        </FormField>
      </div>

      <FormField form={form} name='promoCodes.onePerCustomer'>
        {(field) => <BaseBooleanCheckbox data={checkboxData[0]} {...field} />}
      </FormField>

      <div className='grid grid-cols-2 gap-5'>
        <DateForm
          form={form}
          name='START DATE'
          input_name='promoCodes.startDate.date'
          hour_name='promoCodes.startDate.hour'
          minute_name='promoCodes.startDate.minute'
          period_name='promoCodes.startDate.period'
          date_label='START DATE'
        />

        <DateForm
          form={form}
          name='END DATE'
          input_name='promoCodes.endDate.date'
          hour_name='promoCodes.endDate.hour'
          minute_name='promoCodes.endDate.minute'
          period_name='promoCodes.endDate.period'
          date_label='END DATE'
        />
      </div>

      <div className='flex flex-col gap-4'>
        <FormField form={form} name='promoCodes.conditions.spend.minimum'>
          {(field) => <BaseBooleanCheckbox data={checkboxData[1]} {...field} />}
        </FormField>

        <OnlyShowIf condition={form.getValues('promoCodes.conditions.spend.minimum') || false}>
          <PriceField form={form} name='promoCodes.conditions.spend.amount' />
        </OnlyShowIf>
      </div>

      <div className='flex flex-col gap-4'>
        <FormField form={form} name='promoCodes.conditions.tickets.minimum'>
          {(field) => <BaseBooleanCheckbox data={checkboxData[2]} {...field} />}
        </FormField>

        <OnlyShowIf condition={form.getValues('promoCodes.conditions.tickets.minimum') || false}>
          <FormField
            form={form}
            name='promoCodes.conditions.tickets.quantity'
            label='TICKET QUANTITY'>
            {(field) => (
              <Input
                className='w-full'
                type='number'
                {...field}
                value={field.value == null ? '' : String(field.value)}
              />
            )}
          </FormField>
        </OnlyShowIf>
      </div>

      <FormFieldWithCounter
        name='NOTES'
        field_name='promoCodes.notes'
        form={form}
        maxLength={450}
        description='Optional'>
        {(field) => (
          <Textarea
            placeholder='Enter promo code description.'
            className='w-full h-[272px] text-black bg-white px-3 py-[11px] rounded-[4px] border border-mid-dark-gray/50 text-sm font-sf-pro-display'
            {...field}
            value={field.value == null ? '' : String(field.value)}
          />
        )}
      </FormFieldWithCounter>

      <FormField form={form} name='promoCodes.partnership.partnershipCode'>
        {(field) => <BaseBooleanCheckbox data={checkboxData[4]} {...field} />}
      </FormField>

      <OnlyShowIf condition={form.getValues('promoCodes.partnership.partnershipCode') || false}>
        <FormFieldWithCounter
          form={form}
          field_name='promoCodes.partnership.name'
          name='NAME'
          maxLength={20}>
          {(field) => (
            <Input
              className='w-full'
              {...field}
              value={field.value == null ? '' : String(field.value)}
            />
          )}
        </FormFieldWithCounter>

        <div className='flex flex-col gap-1'>
          <FormField form={form} name='promoCodes.partnership.comission'>
            {(field) => <BaseBooleanCheckbox data={checkboxData[5]} {...field} />}
          </FormField>

          <OnlyShowIf condition={form.getValues('promoCodes.partnership.comission') || false}>
            <div className='w-full grid grid-cols-2 gap-3'>
              <FieldText text='AFTER SALES' />

              <FormField form={form} name='promoCodes.partnership.comissionRate'>
                {(field) => (
                  <Input
                    type='number'
                    className='w-full h-9'
                    {...field}
                    value={field.value == null ? '' : String(field.value)}
                  />
                )}
              </FormField>
            </div>
          </OnlyShowIf>
        </div>
      </OnlyShowIf>

      <div className='flex gap-3'>
        <Button
          type='button'
          onClick={onSubmit}
          className='w-fit h-8 rounded-full text-xs font-semibold font-sf-pro-text text-white shadow-[0px_2px_10px_2px_#0000001A]'>
          {isEditMode ? 'UPDATE PROMO CODE' : 'CREATE PROMO CODE'}
        </Button>

        {isEditMode && onCancel && (
          <Button
            type='button'
            variant='destructive'
            onClick={onCancel}
            className='w-[120px] h-8 rounded-full text-xs font-semibold font-sf-pro-text text-charcoal border-mid-dark-gray/50'>
            CANCEL
          </Button>
        )}
      </div>
    </>
  )
}

function CreatedPromoCard({
  promoCode,
  onEdit,
  onDelete,
  isDeleting,
  isUpdating,
}: ICreatedPromoCode) {
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex flex-col gap-5'>
        <div className='w-full flex items-center justify-between border border-mid-dark-gray/30 px-3 py-[11px] shadow-[0px_2px_10px_2px_#0000001A] rounded-[5px]'>
          <div className='flex flex-col gap-1'>
            <p className='uppercase text-sm font-sf-pro-display leading-[100%] text-charcoal'>
              {promoCode.promoCode}
            </p>
            <p className='text-xs text-gray-600'>
              {promoCode.discountType === 'percentage'
                ? `${promoCode.discountValue}% OFF`
                : `$${promoCode.discountValue} OFF`}
            </p>
            <p className='text-xs text-gray-600'>Usage: {promoCode.discountUsage}</p>
          </div>
          <div className='flex items-center gap-3'>
            <CustomBadge text={promoCode.discountType} />
            <ActionPopover
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
              isUpdating={isUpdating}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function CustomBadge({ type = 'default', text = 'default' }: ICustomBadge) {
  return (
    <Badge
      className={cn('py-1.5 px-2 rounded-[6px] text-xs font-sf-pro-rounded leading-[100%]', {
        'bg-[#00AD2E4D] text-[#00AD2E]': type === 'default',
        'bg-deep-red/30 text-deep-red': type === 'private',
      })}>
      {text}
    </Badge>
  )
}

function FieldText({ text }: { text: string }) {
  return (
    <p className='py-[11px] w-full h-9 flex items-center justify-center bg-[#acacac] rounded-[5px] border border-mid-dark-gray text-xs text-system-black font-sf-pro-text'>
      % {text}
    </p>
  )
}

const checkboxData: IBaseCheckbox[] = [
  {
    description: 'only 1 use per customer',
    items: { label: 'limit per customer', id: 'onePerCustomer' },
  },
  {
    description: 'Only allow use if cart total exceeds this',
    items: { label: 'minimum spend', id: 'spendMinimum' },
  },
  {
    description: 'Only allow use if tickets total exceeds this',
    items: { label: 'minimum tickets', id: 'purchasedMinimum' },
  },
  {
    description: "Promo code won't be displayed on the event page",
    items: { label: 'private', id: 'private' },
  },
  {
    description: 'Link THIS code to a partner or influencer for sales tracking.',
    items: { label: 'partnership code?', id: 'partnershipCode' },
  },
  {
    items: { label: 'commission', id: 'comission' },
  },
]

interface IPromoCodeFormFields {
  form: ReturnType<typeof useForm<{ promoCodes: TPromoCodeSchema }>>
  onSubmit: () => void
  isEditMode?: boolean
  onCancel?: () => void
  eventTickets?: TicketData[]
}

interface ICreatedPromoCode {
  promoCode: PromoCodeData
  onEdit: () => void
  onDelete: () => void
  isUpdating: boolean
  isDeleting: boolean
}

interface ICustomBadge {
  type?: 'default' | 'private'
  text?: string
}
