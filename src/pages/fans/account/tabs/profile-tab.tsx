import { date_list } from '@/components/constants'
import { FormBase, FormField } from '@/components/reusable'
import { BaseSelect } from '@/components/reusable'
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
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { AccountInput } from '../components/account-input'
import { cn } from '@/lib/utils'
import './profile-dropdown-styles.css'

export default function ProfileTab() {
  const { data: profileData, isLoading: isLoadingProfile } = useUserProfile()
  const updateProfileMutation = useUpdateUserProfile()

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: defaultProfileValues,
  })

  // Load profile data into form when available
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

  // Loading state
  if (isLoadingProfile) {
    return (
      <div className='w-full max-w-5xl mx-auto flex flex-col gap-[30px] pb-[100px]'>
        <div className='flex items-center justify-center py-20'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#E31E24] mx-auto mb-4' />
            <p className='text-white/60'>Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  // Shared common style for inputs/selects to match screenshot
  // Transparent bg, subtle white border, white text
  const inputContainerStyle = 'w-full !h-[60px] rounded-md border border-white/20 bg-transparent px-4 text-sm font-sf-pro-display text-white focus:border-white/40 transition-colors'

  return (
    <div className='w-full max-w-4xl flex flex-col gap-[30px] pb-[100px] px-8 pt-8'>

      {/* Dev helper - can be kept but styled minimally */}
      <div className="flex justify-end">
        <FakeDataGenerator
          type='profile'
          onGenerate={form.reset}
          buttonText='🎲 Fill with sample data'
          variant='outline'
          className='mb-4 border-white/20 text-white hover:bg-white/10 hover:text-white'
        />
      </div>

      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='w-full flex flex-col space-y-6 font-input-mono'>

        {/* First Name */}
        <AccountInput form={form} name="first_name" label="First Name" />

        {/* Last Name */}
        <AccountInput form={form} name="last_name" label="Last Name" />

        {/* Email */}
        <AccountInput form={form} name="email" label="Email" type="email" />

        {/* Password */}
        <AccountInput form={form} name="password" label="Password" type="password" />

        {/* Gender Select */}
        <FormField
          form={form}
          name='gender'
          label='Gender'
          labelClassName='sr-only'
          className='w-full'>
          {(field) => (
            <div className="flex flex-col gap-1 w-full">
              <span className='text-white text-xs md:text-sm font-sf-pro-display mb-1 ml-1'>Gender</span>
              <BaseSelect
                onChange={(value) => field.onChange(value)}
                label='Gender'
                placeholder='Select Gender'
                value={field.value as string}
                items={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ]}
                triggerClassName={inputContainerStyle}
              />
            </div>
          )}
        </FormField>

        {/* Birthday Area */}
        <div className='w-full flex flex-col gap-1'>
          <div className='w-full flex flex-col md:flex-row gap-3'>
            {/* Label Box */}
            <div className='w-full md:w-[140px] h-[60px] flex items-center justify-start px-4 rounded-md border border-white/20 bg-transparent text-white text-sm font-sf-pro-display'>
              Birthday
            </div>

            {/* Year */}
            <FormField form={form} name="birthday.year" className='flex-1'>
              {(field) => (
                <BaseSelect
                  type='others'
                  placeholder="Select year"
                  onChange={field.onChange}
                  value={field.value as string}
                  items={years}
                  triggerClassName={inputContainerStyle}
                />
              )}
            </FormField>

            {/* Month */}
            <FormField form={form} name="birthday.month" className='flex-1'>
              {(field) => (
                <BaseSelect
                  type='others'
                  placeholder="Select month"
                  onChange={field.onChange}
                  value={field.value as string}
                  items={date_list.items}
                  triggerClassName={inputContainerStyle}
                />
              )}
            </FormField>

            {/* Day */}
            <FormField form={form} name="birthday.day" className='flex-1'>
              {(field) => (
                <BaseSelect
                  type='others'
                  placeholder="Select day"
                  onChange={field.onChange}
                  value={field.value as string}
                  items={days}
                  triggerClassName={inputContainerStyle}
                />
              )}
            </FormField>
          </div>
        </div>

        {/* Country Select */}
        <FormField
          form={form}
          name='country'
          label='Country'
          labelClassName='sr-only'
          className='w-full'>
          {(field) => (
            <div className="flex flex-col gap-1 w-full">
              <span className='text-white text-xs md:text-sm font-sf-pro-display mb-1 ml-1'>Country</span>
              <BaseSelect
                onChange={(value) => field.onChange(value)}
                label='Country'
                placeholder='Country'
                value={field.value as string}
                items={[
                  { value: 'nigeria', label: 'Nigeria' },
                  { value: 'ghana', label: 'Ghana' },
                  { value: 'kenya', label: 'Kenya' },
                  { value: 'south_africa', label: 'South Africa' },
                ]}
                triggerClassName={inputContainerStyle}
              />
            </div>
          )}
        </FormField>

        {/* State Select */}
        <FormField
          form={form}
          name='state'
          label='State'
          labelClassName='sr-only'
          className='w-full'>
          {(field) => (
            <div className="flex flex-col gap-1 w-full">
              <span className='text-white text-xs md:text-sm font-sf-pro-display mb-1 ml-1'>State</span>
              <BaseSelect
                onChange={(value) => field.onChange(value)}
                label='State'
                placeholder='State'
                value={field.value as string}
                items={[
                  { value: 'lagos', label: 'Lagos' },
                  { value: 'abuja', label: 'Abuja' },
                  { value: 'kano', label: 'Kano' },
                ]}
                triggerClassName={inputContainerStyle}
              />
            </div>
          )}
        </FormField>

        {/* Phone Number */}
        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <FormField
            form={form}
            name='number.country_code'
            label=''
            className='w-full md:w-[140px]'
            labelClassName='sr-only'>
            {(field) => (
              <BaseSelect
                onChange={(value) => field.onChange(value)}
                label='Code'
                placeholder='+234'
                value={field.value as string}
                items={africanCountryCodes}
                triggerClassName={inputContainerStyle}
              />
            )}
          </FormField>

          <FormField
            form={form}
            name='number.digits'
            label=''
            labelClassName='sr-only'
            className='w-full flex-1'>
            {(field) => (
              <div className={cn(inputContainerStyle, 'flex items-center gap-3')}>
                <span className='text-white/60 text-xs md:text-sm font-sf-pro-display whitespace-nowrap'>Phone Number</span>
                <Input
                  value={field.value as string}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  type='tel'
                  placeholder=''
                  className='border-none bg-transparent p-0 text-base md:text-sm text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:outline-none h-auto flex-1'
                />
              </div>
            )}
          </FormField>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <Button
            type='submit'
            disabled={isLoadingProfile || updateProfileMutation.isPending}
            className='w-[200px] h-[50px] font-sf-pro-display font-bold uppercase tracking-wide bg-white text-[#E31E24] hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm shadow-lg'>
            {updateProfileMutation.isPending ? 'Saving...' : 'SAVE'}
          </Button>
        </div>

      </FormBase>
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
