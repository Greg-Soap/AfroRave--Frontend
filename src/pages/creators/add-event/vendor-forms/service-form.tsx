import { CustomFormField as FormField, CustomInput as Input } from '@/components/custom/custom-form'
import { FormFieldWithCounter } from '@/components/custom/field-with-counter'
import { TimeForm } from '@/components/custom/time-form'
import { BaseBooleanCheckbox } from '@/components/reusable/base-boolean-checkbox'
import { Textarea } from '@/components/ui/textarea'
import { useCreateVendor } from '@/hooks/use-event-mutations'
import { transformServiceToCreateRequest } from '@/lib/event-transforms'
import { FakeDataGenerator } from '@/lib/fake-data-generator'
import { useEventStore } from '@/stores'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { type FieldValues, type Path, type UseFormReturn, useForm } from 'react-hook-form'
import type { z } from 'zod'
import { AddBtn } from '../component/add-btn'
import { QuantityDecreaseButton, QuantityIncreaseBtn } from '../component/quantity-buttons'
import { SelectField } from '../component/select-field'
import { SkipBtn } from '../component/skip-btn'
import { SubmitBtn } from '../component/submit-btn'
import { TabContainer } from '../component/tab-ctn'
import {
  africanCountryCodes,
  categoryOptions,
  vendorCheckboxData as checkboxData,
  vendorTypes,
} from '../constant'
import { defaultServiceValue, serviceSchema } from '../schemas/vendor-service-schema'

export default function ServiceForm({
  handleFormChange,
}: {
  handleFormChange: () => void
}) {
  const [services, setServices] = useState([{ id: Date.now() + Math.random() }])
  const [phones, setPhones] = useState([{ id: Date.now() + Math.random() }])
  const createVendorMutation = useCreateVendor()
  const { eventId } = useEventStore()

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: defaultServiceValue,
  })

  async function onSubmit(data: z.infer<typeof serviceSchema>) {
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

  const addService = () => {
    setServices((prev) => [...prev, { id: Date.now() + Math.random() }])
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
        type='vendorServices'
        onGenerate={form.reset}
        buttonText='🎲 Fill with sample data'
        variant='outline'
        className='mb-4'
      />
      {services.map((service, idx) => (
        <div key={service.id} className='w-full flex flex-col gap-8'>
          <SelectField
            form={form}
            name={`service.${idx}.type`}
            label='Vendor Type'
            placeholder='Select a type.'
            triggerClassName='text-deep-red w-full md:w-[480px]'
            data={vendorTypes}
          />

          <SelectField
            form={form}
            name={`service.${idx}.category`}
            label='Category'
            placeholder='Select a category.'
            triggerClassName='text-deep-red w-full md:w-[480px]'
            data={categoryOptions}
          />

          <div className='flex flex-col gap-4'>
            <p className='text-xl font-sf-pro-text text-black'>Service Details</p>

            <FormField form={form} name={`service.${idx}.name`} label='SERVICE NAME'>
              <Input />
            </FormField>
          </div>

          <div className='flex flex-col gap-4'>
            <FormField form={form} name={`service.${idx}.budgetRange`}>
              {(field) => <BaseBooleanCheckbox data={checkboxData[0]} {...field} />}
            </FormField>

            {/** A range is supposed to be here */}
          </div>

          <div className='flex flex-col gap-2'>
            <p className='text-[13px] text-black uppercase font-sf-pro-text'>Work duration</p>

            <DetailedTimeForm
              form={form}
              hour_name={`service.${idx}.workDuration.hour`}
              minute_name={`service.${idx}.workDuration.minute`}
              second_name={`service.${idx}.workDuration.second`}
            />
          </div>

          <div className='flex flex-col gap-5'>
            <div className='flex flex-col md:flex-row gap-4 items-center'>
              <div className='w-full flex flex-col gap-2'>
                <p className='uppercase text-black text-xs font-sf-pro-text'>Start</p>
                <TimeForm
                  form={form}
                  hour_name={`service.${idx}.start.hour`}
                  minute_name={`service.${idx}.start.minute`}
                  period_name={`service.${idx}.start.period`}
                />
              </div>

              <div className='w-full flex flex-col gap-2'>
                <p className='uppercase text-black text-xs font-sf-pro-text'>Stop</p>
                <TimeForm
                  form={form}
                  hour_name={`service.${idx}.stop.hour`}
                  minute_name={`service.${idx}.stop.minute`}
                  period_name={`service.${idx}.stop.period`}
                />
              </div>
            </div>
          </div>

          <FormFieldWithCounter
            name='DESCRIPTION'
            field_name={`service.${idx}.description`}
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

      <AddBtn name='vendor slot' onClick={addService} />

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

            <AddBtn custom name='PHONE NUMBER' onClick={addPhone} />
          </div>
        </div>

        <FormField form={form} name='showSocialHandles'>
          {(field) => <BaseBooleanCheckbox data={checkboxData[2]} {...field} />}
        </FormField>
      </div>

      <SubmitBtn isLoading={createVendorMutation.isPending}>
        <SkipBtn action={handleFormChange} />
      </SubmitBtn>
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
