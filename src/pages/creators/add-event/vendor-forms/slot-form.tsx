import { CustomFormField as FormField, CustomInput as Input } from '@/components/custom/custom-form'
import { FormFieldWithCounter } from '@/components/custom/field-with-counter'
import { BaseBooleanCheckbox } from '@/components/reusable/base-boolean-checkbox'
import { Textarea } from '@/components/ui/textarea'
import { useCreateVendor } from '@/hooks/use-event-mutations'
import { transformSlotToCreateRequest } from '@/lib/event-transforms'
import { FakeDataGenerator } from '@/lib/fake-data-generator'
import { useEventStore } from '@/stores'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { type FieldValues, type Path, type UseFormReturn, useForm } from 'react-hook-form'
import type { z } from 'zod'
import { PriceField } from '../component/price-field'
import { QuantityDecreaseButton, QuantityIncreaseBtn } from '../component/quantity-buttons'
import { SelectField } from '../component/select-field'
import { SkipBtn } from '../component/skip-btn'
import { ContinueButton } from '../component/continue-button'
import { TabContainer } from '../component/tab-ctn'
import {
  africanCountryCodes,
  categoryOptions,
  vendorCheckboxData as checkboxData,
  vendorTypes,
} from '../constant'
import { defaultSlotValue, slotSchema } from '../schemas/vendor-slot-schema'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function SlotForm({
  renderPublishTab,
}: {
  renderPublishTab: () => void
}) {
  const [slots, setSlots] = useState([{ id: Date.now() + Math.random() }])
  const [phones, setPhones] = useState([{ id: Date.now() + Math.random() }])
  const createVendorMutation = useCreateVendor()
  const { eventId } = useEventStore()

  const form = useForm<z.infer<typeof slotSchema>>({
    resolver: zodResolver(slotSchema),
    defaultValues: defaultSlotValue,
  })

  async function onSubmit(data: z.infer<typeof slotSchema>) {
    try {
      if (!eventId) {
        console.error('No event ID found. Please create an event first.')
        return
      }

      // Transform form data to API format
      const vendorRequests = transformSlotToCreateRequest(data, eventId)

      // Create vendors sequentially
      const results = []
      for (const vendorData of vendorRequests) {
        const result = await createVendorMutation.mutateAsync(vendorData)
        results.push(result)
      }

      console.log('Vendors created successfully:', results)

      // Navigate to the next tab
      renderPublishTab()
    } catch (error) {
      console.error('Failed to create vendors:', error)
      // Error handling is already done in the mutation
    }
  }

  const addSlot = () => {
    setSlots((prev) => [...prev, { id: Date.now() + Math.random() }])
  }

  const addPhone = () => {
    setPhones((prev) => [...prev, { id: Date.now() + Math.random() }])
  }

  return (
    <TabContainer
      form={form}
      onSubmit={onSubmit}
      heading='ADD VENDORS'
      description='List your vendor slots and let the right vendors come to you'>
      <FakeDataGenerator
        type='vendorSlots'
        onGenerate={form.reset}
        buttonText='🎲 Fill with sample data'
        variant='outline'
        className='mb-4'
      />
      {slots.map((slot, idx) => (
        <div key={slot.id} className='w-full flex flex-col gap-8'>
          <SelectField
            form={form}
            name={`slot.${idx}.type`}
            label='Vendor Type'
            placeholder='Select a type.'
            triggerClassName='text-deep-red w-[480px]'
            data={vendorTypes}
          />

          <SelectField
            form={form}
            name={`slot.${idx}.category`}
            label='Category'
            placeholder='Select a category.'
            triggerClassName='text-deep-red w-[480px]'
            data={categoryOptions}
          />

          <div className='flex flex-col gap-4'>
            <p className='text-xl font-sf-pro-text text-black'>Slot Details</p>

            <FormField form={form} name={`slot.${idx}.name`} label='SLOT NAME'>
              <Input />
            </FormField>
          </div>

          <AmountForm form={form} name={`slot.${idx}.slotAmount`} />

          <div className='flex flex-col gap-2'>
            <PriceField form={form} name={`slot.${idx}.pricePerSlot`} label='PRICE PER SLOT' />

            <p className='text-[10px] font-sf-pro-text text-charcoal'>
              Afro Revive adds a 10% service fee on top of your listed slot price.
            </p>
          </div>

          <FormFieldWithCounter
            name='DESCRIPTION'
            field_name={`slot.${idx}.description`}
            form={form}
            className='font-normal'
            maxLength={450}>
            {(field) => (
              <Textarea
                placeholder='e.g., Bring your own setup'
                className='uppercase h-[240px]'
                {...field}
                value={field.value == null ? '' : String(field.value)}
              />
            )}
          </FormFieldWithCounter>
        </div>
      ))}

      <Button
        onClick={addSlot}
        className='flex items-center gap-2 text-deep-red text-xs font-sf-pro-text bg-transparent leading-[100%]'>
        <Plus /> VENDOR SLOT
      </Button>

      <div className='flex flex-col gap-3'>
        <FormField form={form} name={`useDifferentContactDetails`}>
          {(field) => <BaseBooleanCheckbox data={checkboxData[1]} {...field} />}
        </FormField>

        <div className='flex flex-col gap-6'>
          <FormField form={form} name='email' label='EMAIL'>
            <Input />
          </FormField>

          <div className='flex flex-col gap-4'>
            {phones.map((phone, idx) => (
              <div key={phone.id} className='flex items-end gap-3'>
                <SelectField
                  form={form}
                  name={`phone.${idx}.countryCode`}
                  label='PHONE NUMBER'
                  placeholder=''
                  className='w-fit'
                  data={africanCountryCodes}
                />

                <FormField form={form} name={`phone.${idx}.number`} className='mb-2'>
                  <Input className='h-9' />
                </FormField>
              </div>
            ))}

            <Button
              onClick={addPhone}
              className='flex items-center gap-2 text-deep-red text-xs font-sf-pro-text bg-transparent leading-[100%]'>
              <Plus /> PHONE NUMBER
            </Button>
          </div>
        </div>

        <FormField form={form} name='showSocialHandles'>
          {(field) => <BaseBooleanCheckbox data={checkboxData[2]} {...field} />}
        </FormField>
      </div>

      <ContinueButton isLoading={createVendorMutation.isPending}>
        <SkipBtn action={renderPublishTab} />
      </ContinueButton>
    </TabContainer>
  )
}

function AmountForm<T extends FieldValues>({
  form,
  name,
}: {
  form: UseFormReturn<T>
  name: Path<T>
}) {
  const increaseAmount = () => {
    const currentPeriod = form.getValues(name)
    const newMinute = Number(currentPeriod) + 1
    form.setValue(name, newMinute as any)
  }

  const decreaseAmount = () => {
    const currentPeriod = form.getValues(name)
    const newMinute = Number(currentPeriod) > 0 && currentPeriod - 1
    form.setValue(name, newMinute as any)
  }

  return (
    <FormField form={form} name={name} label='NUMBER OF SLOTS'>
      {(field) => (
        <div className='flex h-10 w-[133px] border rounded-[4px]'>
          <Input type='number' {...field} />

          <div className='flex w-10 h-10 flex-col items-center justify-between rounded-r-[4px] border border-mid-dark-gray/50'>
            <QuantityIncreaseBtn action={increaseAmount} />
            <QuantityDecreaseButton action={decreaseAmount} />
          </div>
        </div>
      )}
    </FormField>
  )
}
