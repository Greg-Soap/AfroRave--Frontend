import { CustomFormField as FormField, CustomInput as Input } from '@/components/custom/custom-form'
import { DateForm } from '@/components/custom/date-form'
import { FormFieldWithCounter } from '@/components/custom/field-with-counter'
import { BasePopover } from '@/components/reusable'
import type { IBaseCheckbox } from '@/components/reusable/base-boolean-checkbox'
import { BaseBooleanCheckbox } from '@/components/reusable/base-boolean-checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AddBtn } from '../component/add-btn'
import { FormCount } from '../component/form-count'
import { PriceField } from '../component/price-field'
import { SelectField } from '../component/select-field'
import { TabContainer } from '../component/tab-ctn'
import { defaultPromoCodeValues, promoCodeSchema } from '../schemas/promo-code-schema'
import {
  type SavedPromoCode,
  addPromoCode,
  createPromoCode,
  handleCancelEdit,
  handleDeletePromoCode,
  handleEditPromoCode,
  onSubmit,
  updatePromoCode,
} from './promo-code-form/helper'

type PromoCodeForm = z.infer<typeof promoCodeSchema>

export default function PromoCodeForm({
  handleFormChange,
}: {
  handleFormChange: (form: string) => void
}) {
  const [perksCount, setPerksCount] = useState<number>(1)
  const [editingPromoId, setEditingPromoId] = useState<string | null>(null)
  const [currentPromoCode, setCurrentPromoCode] = useState<boolean>(false)

  // Mock data for demonstration - replace with actual API call
  const [savedPromoCodes, setSavedPromoCodes] = useState<SavedPromoCode[]>([
    {
      id: '1',
      code: 'SAVE20',
      discountType: 'percentage',
      discountAmount: 20,
      usageLimit: 100,
      onePerCustomer: true,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      private: false,
      notes: '20% off for early birds',
    },
  ])

  const form = useForm<{ promoCodes: z.infer<typeof promoCodeSchema> }>({
    resolver: zodResolver(z.object({ promoCodes: promoCodeSchema })),
    defaultValues: { promoCodes: defaultPromoCodeValues },
  })

  const handleCreatePromoCode = () =>
    createPromoCode(form, setSavedPromoCodes, setCurrentPromoCode, setEditingPromoId)

  const handleUpdatePromoCode = () =>
    updatePromoCode(
      form,
      editingPromoId,
      setSavedPromoCodes,
      setCurrentPromoCode,
      setEditingPromoId,
    )

  const handleAddPromoCode = () => addPromoCode(form, setEditingPromoId, setCurrentPromoCode)

  const handleEditPromoCodeWrapper = (promoCode: SavedPromoCode) =>
    handleEditPromoCode(promoCode, form, setEditingPromoId, setCurrentPromoCode)

  const handleDeletePromoCodeWrapper = (promoId: string) =>
    handleDeletePromoCode(promoId, setSavedPromoCodes)

  const handleCancelEditWrapper = () =>
    handleCancelEdit(form, setEditingPromoId, setCurrentPromoCode)

  const handleSubmit = () => onSubmit(handleFormChange)

  return (
    <div className='w-full flex flex-col gap-8'>
      <TabContainer<{ promoCodes: z.infer<typeof promoCodeSchema> }>
        heading='ENABLE PROMO CODES'
        description='Code names must be unique per event'
        className='w-full flex flex-col'
        form={form}
        onSubmit={handleSubmit}>
        {savedPromoCodes.length > 0 && (
          <div className='w-full flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
              <p className='text-sm font-medium text-gray-700'>
                Created Promo Codes ({savedPromoCodes.length})
              </p>
            </div>
            {savedPromoCodes.map((promoCode) => (
              <CreatedPromoCard
                key={promoCode.id}
                promoCode={promoCode}
                onEdit={() => handleEditPromoCodeWrapper(promoCode)}
                onDelete={() => handleDeletePromoCodeWrapper(promoCode.id)}
              />
            ))}
          </div>
        )}

        {/* Only show form when there's a promo code to create/edit */}
        {currentPromoCode && (
          <div className='w-full flex flex-col gap-8'>
            <PromoCodeFormFields
              form={form}
              perksCount={perksCount}
              setPerksCount={setPerksCount}
              onSubmit={editingPromoId ? handleUpdatePromoCode : handleCreatePromoCode}
              isEditMode={!!editingPromoId}
              onCancel={editingPromoId ? handleCancelEditWrapper : undefined}
            />
          </div>
        )}

        {/* Only show add promo code button when no form is active */}
        {!currentPromoCode && (
          <div className='flex justify-center'>
            <Button
              type='button'
              onClick={handleAddPromoCode}
              className='bg-deep-red text-white hover:bg-red-700 px-6 py-3 rounded-lg font-medium'>
              + ADD PROMO CODE
            </Button>
          </div>
        )}
      </TabContainer>

      <div className='flex flex-col md:flex-row items-center gap-3 md:gap-8 justify-center py-8'>
        <Button
          type='submit'
          variant='destructive'
          onClick={() => handleFormChange('upgrades')}
          className='w-full md:w-[240px] h-10 rounded-[8px] pt-[13px] px-[153px] text-xs font-sf-pro-text uppercase'>
          Continue
        </Button>
      </div>
    </div>
  )
}

function PromoCodeFormFields({
  form,
  perksCount,
  setPerksCount,
  onSubmit,
  isEditMode = false,
  onCancel,
}: {
  form: ReturnType<typeof useForm<{ promoCodes: z.infer<typeof promoCodeSchema> }>>
  perksCount: number
  setPerksCount: (count: number) => void
  onSubmit: () => void
  isEditMode?: boolean
  onCancel?: () => void
}) {
  return (
    <>
      <FormCount name='PROMO CODE' idx={0} />

      <FormFieldWithCounter
        name='promo code'
        field_name='promoCodes.0.code'
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

      <div className='flex items-end gap-3'>
        <SelectField
          form={form}
          name='promoCodes.0.discount.type'
          label='SALES TYPE'
          className='w-fit'
          data={discountTypes}
          placeholder='Select a type of sale.'
        />

        <FormField form={form} name='promoCodes.0.discount.amount' className='mb-2'>
          {(field) => (
            <Input
              type='number'
              className='w-[120px] h-9'
              {...field}
              value={field.value == null ? '' : String(field.value)}
            />
          )}
        </FormField>
      </div>

      <FormField form={form} name='promoCodes.0.usageLimit' label='usage limit' className='mb-2'>
        {(field) => (
          <Input
            type='number'
            className='w-[120px] h-9'
            {...field}
            value={field.value == null ? '' : String(field.value)}
          />
        )}
      </FormField>

      <FormField form={form} name='promoCodes.0.onePerCustomer'>
        {(field) => <BaseBooleanCheckbox data={checkboxData[0]} {...field} />}
      </FormField>

      <div className='flex flex-col gap-4'>
        <DateForm
          form={form}
          name='START DATE'
          input_name='promoCodes.0.startDate.date'
          hour_name='promoCodes.0.startDate.hour'
          minute_name='promoCodes.0.startDate.minute'
          period_name='promoCodes.0.startDate.period'
        />

        <DateForm
          form={form}
          name='END DATE'
          input_name='promoCodes.0.endDate.date'
          hour_name='promoCodes.0.endDate.hour'
          minute_name='promoCodes.0.endDate.minute'
          period_name='promoCodes.0.endDate.period'
        />
      </div>

      <div className='flex flex-col gap-4'>
        <FormField form={form} name='promoCodes.0.conditions.spend.minimum'>
          {(field) => <BaseBooleanCheckbox data={checkboxData[1]} {...field} />}
        </FormField>

        <PriceField form={form} name='promoCodes.0.conditions.spend.amount' />
      </div>

      <div className='flex flex-col gap-4'>
        <FormField form={form} name='promoCodes.0.conditions.purchased.minimum'>
          {(field) => <BaseBooleanCheckbox data={checkboxData[2]} {...field} />}
        </FormField>

        <FormField form={form} name='promoCodes.0.conditions.purchased.amount' label='PRICE'>
          {(field) => (
            <Input
              className='w-[200px]'
              type='number'
              {...field}
              value={field.value == null ? '' : String(field.value)}
            />
          )}
        </FormField>
      </div>

      <FormField form={form} name='promoCodes.0.private'>
        {(field) => <BaseBooleanCheckbox data={checkboxData[3]} {...field} />}
      </FormField>

      <FormFieldWithCounter
        name='DESCRIPTION'
        field_name='promoCodes.0.notes'
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

      <div className='flex flex-col gap-3.5'>
        {Array.from({ length: perksCount }).map((_, index) => (
          <FormField
            key={`perk-${index}-${Date.now()}`}
            form={form}
            name={`promoCodes.0.perks.${index}`}
            label={index === 0 ? 'Perks' : undefined}>
            {(field) => <Input {...field} value={field.value == null ? '' : String(field.value)} />}
          </FormField>
        ))}

        <AddBtn name='Perks' onClick={() => setPerksCount(perksCount + 1)} />
      </div>

      <FormField form={form} name='promoCodes.0.partnershipCode'>
        {(field) => <BaseBooleanCheckbox data={checkboxData[4]} {...field} />}
      </FormField>

      <div className='flex gap-3'>
        <Button
          type='button'
          onClick={onSubmit}
          className='w-[120px] h-8 rounded-full text-xs font-semibold font-sf-pro-text text-white shadow-[0px_2px_10px_2px_#0000001A]'>
          {isEditMode ? 'UPDATE PROMO CODE' : 'CREATE PROMO CODE'}
        </Button>

        {isEditMode && onCancel && (
          <Button
            type='button'
            variant='outline'
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
}: {
  promoCode: SavedPromoCode
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex flex-col gap-5'>
        <div className='w-full flex items-center justify-between border border-mid-dark-gray/30 px-3 py-[11px] shadow-[0px_2px_10px_2px_#0000001A] rounded-[5px]'>
          <div className='flex flex-col gap-1'>
            <p className='uppercase text-sm font-sf-pro-display leading-[100%] text-charcoal'>
              {promoCode.code}
            </p>
            <p className='text-xs text-gray-600'>
              {promoCode.discountType === 'percentage'
                ? `${promoCode.discountAmount}% OFF`
                : `$${promoCode.discountAmount} OFF`}
            </p>
            <p className='text-xs text-gray-600'>Usage: {promoCode.usageLimit}</p>
          </div>
          <div className='flex items-center gap-3'>
            <CustomBadge text={promoCode.discountType} />
            {promoCode.private && <CustomBadge type='private' text='Private' />}
            <BasePopover
              trigger={
                <Button variant='ghost' className='hover:bg-black/10'>
                  <Ellipsis width={3} height={15} color='#1E1E1E' />
                </Button>
              }
              content={
                <>
                  <Button variant='ghost' onClick={onEdit}>
                    Edit
                  </Button>
                  <Button
                    variant='ghost'
                    onClick={onDelete}
                    className='text-red-600 hover:text-red-700'>
                    Delete
                  </Button>
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function CustomBadge({
  type = 'default',
  text = 'default',
}: { type?: 'default' | 'private'; text?: string }) {
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

const checkboxData: IBaseCheckbox[] = [
  {
    description: 'only 1 use per customer',
    items: [{ label: 'limit per customer', id: 'onePerCustomer' }],
  },
  {
    description: 'Only allow use if cart total exceeds this',
    items: [{ label: 'minimum spend', id: 'spendMinimum' }],
  },
  {
    description: 'Only allow use if tickets total exceeds this',
    items: [{ label: 'minimum tickets', id: 'purchasedMinimum' }],
  },
  {
    description: "Promo code won't be displayed on the event page",
    items: [{ label: 'private', id: 'private' }],
  },
  {
    description: 'Link THIS code to a partner or influencer for sales tracking.',
    items: [{ label: 'partnership code?', id: 'partnershipCode' }],
  },
]

const discountTypes: { value: string; label: string }[] = [
  { value: 'percentage', label: '% OFF' },
  { value: 'fixed', label: 'Fixed Amount' },
]
