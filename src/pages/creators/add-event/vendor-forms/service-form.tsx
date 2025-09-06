import { CustomFormField as FormField, CustomInput as Input } from '@/components/custom/custom-form'
import { FormFieldWithCounter } from '@/components/custom/field-with-counter'
import { BaseBooleanCheckbox } from '@/components/reusable/base-boolean-checkbox'
import { Textarea } from '@/components/ui/textarea'
import { useCreateVendor } from '@/hooks/use-event-mutations'
import { transformServiceToCreateRequest } from '@/lib/event-transforms'
import { FakeDataGenerator } from '@/lib/fake-data-generator'
import { useEventStore } from '@/stores'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { type FieldValues, type Path, type UseFormReturn, useForm } from 'react-hook-form'
import { AddButton } from '../component/add-btn'
import { QuantityDecreaseButton, QuantityIncreaseBtn } from '../component/quantity-buttons'
import { SelectField } from '../component/select-field'
import { SkipBtn } from '../component/skip-btn'
import { TabContainer } from '../component/tab-ctn'
import {
  africanCountryCodes,
  categoryOptions,
  vendorCheckboxData as checkboxData,
} from '../constant'
import {
  defaultServiceValue,
  serviceDetails,
  type ServiceDetails,
  contactSchema,
  type ContactSchema,
  defaultContactValue,
} from '../schemas/vendor-service-schema'
import { OnlyShowIf } from '@/lib/environment'
import { addVendor } from './helper'
import { PriceField } from '../component/price-field'
import { BaseDatePicker } from '@/components/reusable/base-date-picker'
import { CreateButton } from '../component/create-button'
import { ContinueButton } from '../component/continue-button'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ServiceForm({
  handleFormChange,
}: {
  handleFormChange: () => void
}) {
  const [phones, setPhones] = useState([{ id: Date.now() + Math.random() }])
  const [currentVendor, setCurrentVendor] = useState<boolean>(false)

  const createVendorMutation = useCreateVendor()
  const { eventId } = useEventStore()

  const serviceForm = useForm<ServiceDetails>({
    resolver: zodResolver(serviceDetails),
    defaultValues: defaultServiceValue,
  })

  const contactForm = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultContactValue,
  })

  async function onServiceSubmit(data: ServiceDetails) {
    try {
      if (!eventId) {
        console.error('No event ID found. Please create an event first.')
        return
      }

      // Transform form data to API format
      const vendorRequests = transformServiceToCreateRequest(data, eventId)

      // Create vendors sequentially
      const results = []
      for (const vendorData of vendorRequests) {
        const result = await createVendorMutation.mutateAsync(vendorData)
        results.push(result)
      }

      console.log('Vendors created successfully:', results)

      // Navigate to the next form
      handleFormChange()
    } catch (error) {
      console.error('Failed to create vendors:', error)
      // Error handling is already done in the mutation
    }
  }

  function handleAddVendor() {
    addVendor(serviceForm, setCurrentVendor)
  }

  const addPhone = () => {
    setPhones((prev) => [...prev, { id: Date.now() + Math.random() }])
  }

  return (
    <TabContainer
      form={serviceForm}
      onSubmit={onServiceSubmit}
      heading='ADD VENDORS'
      description='List your vendor slots and let the right vendors come to you'
      className='max-w-[560px]'>
      <FakeDataGenerator
        type='vendorServices'
        onGenerate={serviceForm.reset}
        buttonText='🎲 Fill with sample data'
        variant='outline'
        className='mb-4'
      />

      <OnlyShowIf condition={!currentVendor}>
        <AddButton name='VENDOR SLOT' onClick={handleAddVendor} />
      </OnlyShowIf>

      <div className='w-full flex flex-col gap-8'>
        <div className='flex flex-col gap-2 font-sf-pro-text'>
          <p className='uppercase text-sm font-medium leading-[100%] text-charcoal'>Vendor Type</p>
          <p className='h-10 w-full text-[10px] text-mid-dark-gray font-light uppercase rounded-[5px] flex items-center justify-center border border-mid-dark-gray/50'>
            {serviceForm.getValues('type') === 'revenue_vendor'
              ? 'Revenue Vendor'
              : 'Service Vendor'}
          </p>
        </div>

        <SelectField
          form={serviceForm}
          name='category'
          label='Category'
          placeholder='choose an applicable category'
          triggerClassName='w-full uppercase'
          data={categoryOptions}
        />

        <div className='flex flex-col gap-4'>
          <p className='text-xl font-sf-pro-text text-black leading-[100%]'>SLOT DETAILS</p>

          <FormField form={serviceForm} name='slot_name' label='SLOT NAME'>
            <Input />
          </FormField>
        </div>

        <div className='flex flex-col gap-7'>
          <FormField form={serviceForm} name='number_of_slots' label='NUMBER OF SLOT'>
            <Input />
          </FormField>

          <div className='grid grid-cols-2 gap-7'>
            <div className='flex flex-col gap-2'>
              <PriceField form={serviceForm} name='price_per_slot' label='PRICE PER SLOT' />
              <p className='text-[10px] font-sf-pro-text leading-[100%] text-medium-gray'>
                There will be a 10% fee added to your slot price
              </p>
            </div>

            <div className='flex flex-col gap-2 mt-1'>
              <p className='uppercase text-sm font-medium leading-[100%] text-charcoal'>
                TOTAL PRICE
              </p>

              <div className='w-full h-9 flex items-center gap-3'>
                <p className='py-[11px] w-14 h-full flex items-center justify-center bg-[#acacac] rounded-[5px]'>
                  ₦
                </p>
                <p className='flex items-center justify-center w-full h-9 rounded-[5px] bg-[#acacac]'>
                  {}
                </p>
              </div>
            </div>
          </div>
          <FormFieldWithCounter
            name='DESCRIPTION'
            field_name='description'
            form={serviceForm}
            className='font-normal'
            maxLength={450}>
            {(field) => (
              <Textarea
                placeholder='e.g, Power supply included
booth size...'
                className='uppercase h-[240px] p-3'
                {...field}
                value={field.value == null ? '' : String(field.value)}
              />
            )}
          </FormFieldWithCounter>

          <div className='flex flex-col gap-4'>
            <p className='text-xl font-sf-pro-text leading-[100%] uppercase text-charcoal'>
              application deadline
            </p>

            <FormField form={serviceForm} name='deadline' label='DATE'>
              {(field) => <BaseDatePicker {...field} className='w-full h-9' />}
            </FormField>

            <CreateButton name='CREATE SLOT' />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <FormField form={contactForm} name='useDifferentContactDetails'>
          {(field) => <BaseBooleanCheckbox data={checkboxData[1]} {...field} />}
        </FormField>

        <div className='flex flex-col gap-6'>
          <div className='grid md:grid-cols-2 gap-2'>
            <FormField form={contactForm} name='email' label='EMAIL'>
              <Input />
            </FormField>

            <div className='flex flex-col gap-4'>
              {phones.map((phone, idx) => (
                <div key={phone.id} className='flex items-end gap-3'>
                  <SelectField
                    form={contactForm}
                    name={`phone.${idx}.countryCode`}
                    label='PHONE NUMBER'
                    placeholder=''
                    className='w-fit'
                    data={africanCountryCodes}
                  />

                  <FormField form={contactForm} name={`phone.${idx}.number`} className='mb-2'>
                    <Input className='h-9' />
                  </FormField>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <Button
              onClick={addPhone}
              className='w-fit shadow-none flex items-center gap-2 text-deep-red text-xs font-sf-pro-text bg-transparent leading-[100%]'>
              <Plus /> PHONE NUMBER
            </Button>

            <p className='text-xs font-light leading-[100%] text-medium-gray'>
              Your contact details will remain hidden until a revenue vendor successfully pays for a
              slot. This ensures privacy and secure vendor interactions.
            </p>
          </div>

          <FormField form={contactForm} name='showSocialHandles'>
            {(field) => <BaseBooleanCheckbox data={checkboxData[2]} {...field} />}
          </FormField>
        </div>
      </div>

      <ContinueButton isLoading={createVendorMutation.isPending}>
        <SkipBtn action={handleFormChange} />
      </ContinueButton>
    </TabContainer>
  )
}

function DetailedTimeForm<T extends FieldValues>({
  form,
  hour_name,
  minute_name,
  second_name,
}: ITimeFormProps<T>) {
  const increaseMinute = () => {
    const currentPeriod = form.getValues(minute_name)
    const newMinute = Number(currentPeriod) + 1
    form.setValue(minute_name, newMinute as any)
  }

  const decreaseMinute = () => {
    const currentPeriod = form.getValues(minute_name)
    const newMinute = Number(currentPeriod) > 0 && currentPeriod - 1
    form.setValue(minute_name, newMinute as any)
  }

  return (
    <div className='relative w-full h-10 flex items-center'>
      <div className='w-[150px] h-10 flex items-center bg-white justify-between border border-mid-dark-gray/50 rounded-l-[4px] px-3 py-2'>
        <FormField
          form={form}
          name={hour_name}
          className='w-fit flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text'>
          {(field) => (
            <Input
              type='number'
              {...field}
              maxLength={2}
              className='w-10 h-9 text-center border-0 shadow-none p-0 focus-visible:ring-0'
            />
          )}
        </FormField>

        <span className='px-1 text-black'>:</span>

        <FormField
          form={form}
          name={minute_name}
          className='w-fit flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text'>
          {(field) => (
            <Input
              type='number'
              {...field}
              maxLength={2}
              className='w-10 h-9 text-center border-0 shadow-none p-0 focus-visible:ring-0'
            />
          )}
        </FormField>

        <span className='px-1 text-black'>:</span>

        <FormField
          form={form}
          name={second_name}
          className='w-fit flex flex-col gap-1 text-black text-xs uppercase font-sf-pro-text'>
          {(field) => (
            <Input
              type='number'
              {...field}
              maxLength={2}
              className='w-10 h-9 text-center border-0 shadow-none p-0 focus-visible:ring-0'
            />
          )}
        </FormField>
      </div>

      <div className='flex w-10 h-10 flex-col items-center justify-between rounded-r-[4px] border border-mid-dark-gray/50'>
        <QuantityIncreaseBtn action={increaseMinute} />
        <QuantityDecreaseButton action={decreaseMinute} />
      </div>
    </div>
  )
}

interface ITimeFormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  hour_name: Path<T>
  minute_name: Path<T>
  second_name: Path<T>
}
