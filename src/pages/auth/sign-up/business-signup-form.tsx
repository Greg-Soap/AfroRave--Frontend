import { FormBase, FormField } from '@/components/reusable'
import { BaseSelect } from '@/components/reusable'
import type { ICustomSelectProps } from '@/components/reusable/base-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRegisterOrganizer, useRegisterVendor } from '@/hooks/use-auth'
import {
  africanCountryCodes,
  categoryOptions,
  genderOptions,
  vendorTypes,
} from '@/pages/creators/add-event/constant'
import type { OrganizerRegisterData, VendorRegisterData } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { type HTMLInputTypeAttribute, useState } from 'react'
import { type FieldValues, type Path, type UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  first_name: z.string().min(2, { message: 'Name too short.' }),
  last_name: z.string().min(2, { message: 'Name too short.' }),
  country: z.string({
    required_error: 'Please select a country.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters.',
    })
    .max(50, {
      message: 'Password too long.',
    }),
  phone_number: z.string().min(1, { message: 'Phone number is required.' }),
  country_code: z.string().min(1, { message: 'Country code is required.' }),
  business_name: z.string().min(2, { message: 'Business name too short.' }),
  web_url: z.string().optional(),
  portfolio_url: z.string().optional(),
  social_links: z.string().optional(),
  gender: z.string().min(1, { message: 'Please select a gender.' }),
  vendor_type: z.string().optional(),
  category: z.string().optional(),
})

interface BusinessSignUpProps {
  onSwitchToLogin: () => void
  type?: 'vendor' | 'creator'
}

export function BusinessSignUp({ onSwitchToLogin, type = 'vendor' }: BusinessSignUpProps) {
  const registerVendor = useRegisterVendor()
  const registerOrganizer = useRegisterOrganizer()
  const [step, setStep] = useState(1)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      country: '',
      email: '',
      password: '',
      phone_number: '',
      country_code: '+234',
      business_name: '',
      web_url: '',
      portfolio_url: '',
      social_links: '',
      gender: '',
      vendor_type: '',
      category: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const phoneNumber = `${values.country_code}${values.phone_number}`

    if (type === 'vendor') {
      // Transform form data to match Vendor API structure
      const vendorData: VendorRegisterData = {
        firstName: values.first_name,
        lastName: values.last_name,
        email: values.email,
        telphone: phoneNumber,
        gender: values.gender,
        businessName: values.business_name,
        vendorType: values.vendor_type || 'service_vendor',
        category: values.category || 'dj_mc',
        website: values.web_url || '',
        portfolio: values.portfolio_url || '',
        socialLinks: values.social_links || '',
        password: values.password,
      }

      registerVendor.mutate(vendorData)
    } else {
      // Transform form data to match Organizer API structure
      const organizerData: OrganizerRegisterData = {
        firstName: values.first_name,
        lastName: values.last_name,
        email: values.email,
        telphone: phoneNumber,
        gender: values.gender,
        companyName: values.business_name,
        website: values.web_url || '',
        password: values.password,
      }

      registerOrganizer.mutate(organizerData)
    }
  }

  const handleContinue = async () => {
    const isValid = await form.trigger([
      'first_name',
      'last_name',
      'country_code',
      'phone_number',
      'gender',
      'business_name',
      'web_url',
      'portfolio_url',
      'social_links',
      'email',
      'password',
    ])

    if (isValid) {
      setStep(2)
    }
  }

  const isPending = type === 'vendor' ? registerVendor.isPending : registerOrganizer.isPending

  // Dynamic Title & Description
  let title = type === 'vendor' ? 'own the spotlight' : 'beyond ticketing'
  let description = 'tell us about you'

  if (type === 'vendor' && step === 2) {
    title = 'Business Type'
    description = 'Select The Applicable Category'
  }

  return (
    <div className='relative flex justify-center w-full max-h-[85vh] overflow-y-auto'>
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='max-w-[640px] w-full rounded-[12px] space-y-5 bg-red px-4 py-6 sm:px-7 sm:py-4 md:px-5 md:py-12 z-10 font-sf-pro-text'>
        <div className='flex flex-col gap-2 font-sf-pro-display'>
          <p className='uppercase text-2xl font-black text-white'>{title}</p>
          <p className={step === 2 ? 'text-white/80' : 'uppercase text-xs font-light'}>{description}</p>
        </div>

        {/* STEP 1: Personal & Business Info */}
        {step === 1 && (
          <>
            <div className='grid md:grid-cols-2 gap-x-2 gap-y-6'>
              <InputField form={form} name='first_name' placeholder='FIRST NAME' />
              <InputField form={form} name='last_name' placeholder='LAST NAME' />
            </div>

            <div className='flex gap-2'>
              <SelectField
                form={form}
                name='country_code'
                items={africanCountryCodes}
                className='w-24'
                width={96}
                placeholder='COUNTRY CODE'
              />

              <InputField form={form} name='phone_number' placeholder='PHONE NUMBER' />
            </div>

            <SelectField
              form={form}
              name='gender'
              items={genderOptions}
              className='w-full'
              placeholder='GENDER'
            />

            <InputField
              form={form}
              name='business_name'
              placeholder={type === 'vendor' ? 'BUSINESS NAME' : 'COMPANY NAME'}
            />
            <InputField form={form} name='web_url' placeholder='WEBSITE URL (OPTIONAL)' />

            {type === 'vendor' && (
              <>
                <InputField form={form} name='portfolio_url' placeholder='PORTFOLIO URL (OPTIONAL)' />
                <InputField form={form} name='social_links' placeholder='SOCIAL MEDIA LINKS (OPTIONAL)' />
              </>
            )}

            <InputField form={form} name='email' placeholder='EMAIL ADDRESS' />
            <InputField form={form} name='password' placeholder='PASSWORD' type='password' />
          </>
        )}

        {/* STEP 2: Vendor Type & Category (Vendor Only) */}
        {step === 2 && type === 'vendor' && (
          <>
            <SelectField
              form={form}
              name='vendor_type'
              items={vendorTypes}
              className='w-full'
              placeholder='VENDOR TYPE'
            />
            <SelectField
              form={form}
              name='category'
              items={categoryOptions}
              className='w-full'
              placeholder='CATEGORY'
            />
          </>
        )}

        {/* Actions */}
        <div className='w-full flex justify-end pt-4'>
          {step === 1 && type === 'vendor' ? (
            <Button
              type='button'
              onClick={handleContinue}
              className='max-w-[239px] w-full h-10 bg-white text-sm font-semibold font-sf-pro-text mx-auto text-black hover:bg-white/90'
            >
              Continue
            </Button>
          ) : (
            <Button
              type='submit'
              className='max-w-[239px] w-full h-10 bg-white text-sm font-semibold font-sf-pro-text mx-auto text-black hover:bg-white/90 '
              disabled={isPending}>
              {isPending ? 'Signing Up...' : 'Sign Up'}
            </Button>
          )}
        </div>

        <div className='flex items-center justify-center gap-1 text-sm text-white font-sf-pro-text'>
          Already have an account?{' '}
          <button
            type='button'
            onClick={onSwitchToLogin}
            className='text-base font-bold text-accent hover:underline'>
            Log In
          </button>
        </div>
      </FormBase>
    </div>
  )
}

function InputField<T extends FieldValues>({
  form,
  name,
  type = 'text',
  placeholder,
}: InputField<T>) {
  return (
    <FormField form={form} name={name} className='w-full'>
      <Input
        type={type}
        className='w-full text-white   h-14 rounded-[6px] border border-white py-6 px-3 font-sf-pro-text text-[10px] font-light '
        placeholder={placeholder}
      />
    </FormField>
  )
}

function SelectField<T extends FieldValues>({
  form,
  name,
  width,
  className,
  items,
  placeholder,
}: ISelectField<T>) {
  return (
    <FormField form={form} name={name} className={className}>
      {(field) => (
        <BaseSelect
          type='others'
          placeholder={placeholder}
          width={width}
          value={field.value}
          onChange={(value) => field.onChange(value)}
          items={items}
          selectedItemRenderer={(value) => value}
          triggerClassName='!w-full !h-14 py-6 px-3 border border-white rounded-[6px] !text-white placeholder:text-white'
        />
      )}
    </FormField>
  )
}

interface InputField<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  placeholder: string
  type?: HTMLInputTypeAttribute
}

interface ISelectField<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  width?: number
  className?: string
  items: ICustomSelectProps['items']
  placeholder: string
}
