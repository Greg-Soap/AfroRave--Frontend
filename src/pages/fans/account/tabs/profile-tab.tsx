import { date_list } from '@/components/constants'
import { FormBase, FormField } from '@/components/reusable/base-form'
import { BaseSelect } from '@/components/reusable/base-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUpdateUserProfile, useUserProfile } from '@/hooks/use-profile-mutations'
import { FakeDataGenerator } from '@/lib/fake-data-generator'
import {
  transformProfileFromResponse,
  transformProfileToUpdateRequest,
} from '@/lib/profile-transforms'
import { africanCountryCodes } from '@/pages/creators/add-event/constant'
import { ProfileSchema, defaultProfileValues } from '@/schema/profile-shema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { X } from 'lucide-react'
import '../fan-account.css'

export default function ProfileTab() {
  const { data: profileData, isLoading: isLoadingProfile } = useUserProfile()
  const updateProfileMutation = useUpdateUserProfile()
  const [showBanner, setShowBanner] = useState(true)

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: defaultProfileValues,
  })

  useEffect(() => {
    if (profileData) {
      const transformedData = transformProfileFromResponse(profileData.data)
      form.reset(transformedData)
    }
  }, [profileData, form])

  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    try {
      const updateRequest = transformProfileToUpdateRequest(values)
      await updateProfileMutation.mutateAsync(updateRequest)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  // Shared input styling - Figma specifications
  const inputStyle = 'w-full h-[60px] rounded-[8px] border border-white/20 bg-transparent px-4 text-white text-[15px] font-sf-pro-display placeholder:text-white/50 focus:border-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors'
  const labelStyle = 'text-white/80 text-[13px] font-sf-pro-display mb-2 ml-1 block'

  return (
    <div className='w-full flex-1 flex justify-center items-start py-12 px-6'>
      <div className='w-full max-w-[650px] flex flex-col gap-6'>

        {/* Green Notification Banner */}
        {showBanner && (
          <div className='w-full bg-[#D4F4DD] rounded-[8px] px-5 py-[14px] flex items-center justify-between'>
            <p className='text-[#1F1F1F] text-[14px] font-sf-pro-display font-normal'>
              Finish setting up your profile to access your tickets
            </p>
            <button
              onClick={() => setShowBanner(false)}
              className='text-[#1F1F1F] hover:text-[#1F1F1F]/70 transition-colors'
              aria-label='Close banner'
            >
              <X className='w-4 h-4' strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Dev helper - hidden in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className='flex justify-end'>
            <FakeDataGenerator
              type='profile'
              onGenerate={form.reset}
              buttonText='🎲 Fill with sample data'
              variant='outline'
              className='h-9 px-4 border-white/30 text-white/70 hover:bg-white/5 hover:text-white text-[13px]'
            />
          </div>
        )}

        <FormBase
          form={form}
          onSubmit={onSubmit}
          className='w-full flex flex-col gap-5'>

          {/* First Name */}
          <FormField
            form={form}
            name="first_name"
            label="First Name"
            labelClassName="sr-only"
            className="w-full">
            {(field) => (
              <Input
                {...field}
                placeholder="First Name"
                className={inputStyle}
                value={field.value as string}
              />
            )}
          </FormField>

          {/* Last Name */}
          <FormField
            form={form}
            name="last_name"
            label="Last Name"
            labelClassName="sr-only"
            className="w-full">
            {(field) => (
              <Input
                {...field}
                placeholder="Last Name"
                className={inputStyle}
                value={field.value as string}
              />
            )}
          </FormField>

          {/* Email */}
          <FormField
            form={form}
            name="email"
            label="Email"
            labelClassName="sr-only"
            className="w-full">
            {(field) => (
              <Input
                {...field}
                type="email"
                placeholder="Email"
                className={inputStyle}
                value={field.value as string}
              />
            )}
          </FormField>

          {/* Password */}
          <FormField
            form={form}
            name="password"
            label="Password"
            labelClassName="sr-only"
            className="w-full">
            {(field) => (
              <Input
                {...field}
                type="password"
                placeholder="Password"
                className={inputStyle}
                value={field.value as string}
              />
            )}
          </FormField>

          {/* Gender - WITH LABEL ABOVE */}
          <FormField
            form={form}
            name='gender'
            label='Gender'
            labelClassName='sr-only'
            className='w-full'>
            {(field) => (
              <div className='w-full'>
                <label className={labelStyle}>Gender</label>
                <BaseSelect
                  onChange={(value) => field.onChange(value)}
                  label='Gender'
                  placeholder='Select gender'
                  value={field.value as string}
                  items={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' },
                  ]}
                  triggerClassName={inputStyle}
                />
              </div>
            )}
          </FormField>

          {/* Birthday - WITH LABEL ABOVE */}
          <div className='w-full'>
            <label className={labelStyle}>Birthday</label>
            <div className='w-full grid grid-cols-3 gap-3'>
              {/* Year */}
              <FormField form={form} name="birthday.year" className='w-full' labelClassName='sr-only' label='Year'>
                {(field) => (
                  <BaseSelect
                    type='others'
                    placeholder="Year"
                    onChange={field.onChange}
                    value={field.value as string}
                    items={years}
                    triggerClassName={inputStyle}
                  />
                )}
              </FormField>

              {/* Month */}
              <FormField form={form} name="birthday.month" className='w-full' labelClassName='sr-only' label='Month'>
                {(field) => (
                  <BaseSelect
                    type='others'
                    placeholder="Month"
                    onChange={field.onChange}
                    value={field.value as string}
                    items={date_list.items}
                    triggerClassName={inputStyle}
                  />
                )}
              </FormField>

              {/* Day */}
              <FormField form={form} name="birthday.day" className='w-full' labelClassName='sr-only' label='Day'>
                {(field) => (
                  <BaseSelect
                    type='others'
                    placeholder="Day"
                    onChange={field.onChange}
                    value={field.value as string}
                    items={days}
                    triggerClassName={inputStyle}
                  />
                )}
              </FormField>
            </div>
          </div>

          {/* Country - WITH LABEL ABOVE */}
          <FormField
            form={form}
            name='country'
            label='Country'
            labelClassName='sr-only'
            className='w-full'>
            {(field) => (
              <div className='w-full'>
                <label className={labelStyle}>Country</label>
                <BaseSelect
                  onChange={(value) => field.onChange(value)}
                  label='Country'
                  placeholder='Select country'
                  value={field.value as string}
                  items={[
                    { value: 'nigeria', label: 'Nigeria' },
                    { value: 'ghana', label: 'Ghana' },
                    { value: 'kenya', label: 'Kenya' },
                    { value: 'south_africa', label: 'South Africa' },
                  ]}
                  triggerClassName={inputStyle}
                />
              </div>
            )}
          </FormField>

          {/* State - WITH LABEL ABOVE */}
          <FormField
            form={form}
            name='state'
            label='State'
            labelClassName='sr-only'
            className='w-full'>
            {(field) => (
              <div className='w-full'>
                <label className={labelStyle}>State</label>
                <Input
                  {...field}
                  placeholder="Enter state"
                  className={inputStyle}
                  value={field.value as string}
                />
              </div>
            )}
          </FormField>

          {/* Phone Number */}
          <div className='w-full flex items-end gap-3'>
            <FormField
              form={form}
              name='number.country_code'
              label='Code'
              className='w-[140px]'
              labelClassName='sr-only'>
              {(field) => (
                <BaseSelect
                  onChange={(value) => field.onChange(value)}
                  label='Code'
                  placeholder='+234'
                  value={field.value as string}
                  items={africanCountryCodes}
                  triggerClassName={inputStyle}
                />
              )}
            </FormField>

            <FormField
              form={form}
              name='number.digits'
              label='Phone Number'
              labelClassName='sr-only'
              className='flex-1'>
              {(field) => (
                <Input
                  {...field}
                  type='tel'
                  placeholder='Phone Number'
                  className={inputStyle}
                  value={field.value as string}
                />
              )}
            </FormField>
          </div>

          {/* Save Button - WHITE BG, RED TEXT */}
          <div className="flex justify-center mt-6 pt-4">
            <Button
              type='submit'
              disabled={isLoadingProfile || updateProfileMutation.isPending}
              className='w-[180px] h-[50px] font-sf-pro-display font-bold uppercase tracking-wide bg-white text-[#C30010] hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-[6px] text-[14px] transition-all'>
              {updateProfileMutation.isPending ? 'SAVING...' : 'SAVE'}
            </Button>
          </div>

        </FormBase>
      </div>
    </div>
  )
}

const years = Array.from({ length: 100 }, (_, i) => {
  const year = `${new Date().getFullYear() - i}`
  return { value: year, label: year }
})

const days = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}))