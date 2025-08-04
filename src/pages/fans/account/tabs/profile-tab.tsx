import { date_list } from '@/components/constants'
import { FormBase, FormField } from '@/components/reusable'
import { BaseSelect } from '@/components/reusable'
import type { ICustomSelectProps } from '@/components/reusable/base-select'
import { Button } from '@/components/ui/button'
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
import { type FieldValues, type Path, useForm } from 'react-hook-form'
import type { z } from 'zod'
import { AccountInput } from '../components/account-input'

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

  // Show loading state while fetching profile data
  if (isLoadingProfile) {
    return (
      <div className='w-full md:w-[529px] flex flex-col gap-[30px] pb-[100px]'>
        <div className='flex items-center justify-center py-8'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-deep-red mx-auto mb-4' />
            <p className='text-gray-600'>Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full md:w-[529px] flex flex-col gap-[30px] pb-[100px]'>
      <FakeDataGenerator
        type='profile'
        onGenerate={form.reset}
        buttonText='🎲 Fill with sample data'
        variant='outline'
        className='mb-4'
      />
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='w-full flex flex-col items-center space-y-6 font-input-mono'>
        {profile_form.slice(0, 5).map((item) => (
          <AccountInput key={item.name} form={form} name={item.name} label={item.label} />
        ))}

        {/**Birth day select form field */}
        <div className='grid grid-cols-4 gap-[3px]'>
          <p className='py-[22px] pl-2 px-10 rounded-l-[6px] bg-transparent text-center font-sf-pro-display'>
            Birthday
          </p>
          {select_fields.map((item) => (
            <FormField
              key={item.placeholder}
              form={form}
              name={item.name}
              label={item.label}
              className='w-full z-20 py-2.5 px-2 bg-transparent focus-visible:border'>
              {(field) => (
                <BaseSelect
                  type='others'
                  placeholder={item.placeholder}
                  width={329}
                  onChange={(value) => field.onChange(value)}
                  items={item.items}
                  triggerClassName='w-full border-none text-white'
                />
              )}
            </FormField>
          ))}
        </div>

        {profile_form.slice(5, 7).map((item) => (
          <AccountInput key={item.name} form={form} name={item.name} label={item.label} />
        ))}

        <div className='w-full flex items-start gap-1'>
          <FormField form={form} name='number.country_code' className='h-10'>
            {(field) => (
              <BaseSelect
                onChange={(value) => field.onChange(value)}
                label='Country Codes'
                placeholder='+123'
                items={africanCountryCodes}
                width={150}
                triggerClassName='h-10 w-40 rounded-none px-3 rounded-t-[5px] text-sm font-sf-pro-display !text-white border-none'
              />
            )}
          </FormField>

          <AccountInput form={form} name='number.digits' label='Phone' type='number' />
        </div>

        <Button
          type='submit'
          disabled={isLoadingProfile || updateProfileMutation.isPending}
          className='w-[200px] text-sm h-10 font-sf-pro-display font-normal bg-white text-deep-red hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed'>
          {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
        </Button>
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

const profile_form: IProfileForm[] = [
  { name: 'first_name', label: 'First Name' },
  { name: 'last_name', label: 'Last Name' },
  { name: 'email', label: 'Email' },
  { name: 'password', label: 'Password' },
  { name: 'gender', label: 'Gender' },
  { name: 'country', label: 'Country' },
  { name: 'state', label: 'State' },
  { name: 'number.digits', label: 'Phone' },
]

const select_fields: ISelectProps<ProfileFormFields>[] = [
  {
    name: 'birthday.year',
    placeholder: 'Select year',
    label: 'Year',
    items: years,
  },
  {
    name: 'birthday.month',
    placeholder: 'Select month',
    label: 'Month',
    items: date_list.items,
  },
  {
    name: 'birthday.day',
    placeholder: 'Select day',
    label: 'Day',
    items: days,
  },
]

type ProfileFormFields = z.infer<typeof ProfileSchema>

interface IProfileForm {
  name: Path<ProfileFormFields>
  label: string
}

interface ISelectProps<T extends FieldValues> {
  name: Path<T>
  label: string
  placeholder: string
  items: ICustomSelectProps['items']
}
