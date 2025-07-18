import { africanCountries } from '@/components/constants'
import { FormBase, FormField } from '@/components/reusable'
import { BaseSelect } from '@/components/reusable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'
import { useRegisterUser } from '@/hooks/use-auth'
import type { UserRegisterData } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  first_name: z.string().min(2, { message: 'Name too short.' }),
  last_name: z.string().min(2, { message: 'Name too short.' }),
  country: z.string({
    required_error: 'Please select a country.',
  }),
  email: z.string().email({
    message: 'Username must be at least 2 characters.',
  }),
  password: z
    .string()
    .min(2, {
      message: 'Password too short.',
    })
    .max(20, {
      message: 'Password too long.',
    }),
})

interface SignupFormProps {
  onSwitchToLogin: () => void
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const registerUser = useRegisterUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      country: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Transform form data to match API structure
    const userData: UserRegisterData = {
      firstName: values.first_name,
      lastName: values.last_name,
      email: values.email,
      telphone: '', // This field is required by API but not in current form
      gender: '', // This field is required by API but not in current form
      dateOfBirth: '', // This field is required by API but not in current form
      country: values.country,
      state: '', // This field is required by API but not in current form
      password: values.password,
    }

    registerUser.mutate(userData)
  }

  return (
    <div className='relative flex justify-center'>
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='w-[415px] h-fit rounded-[12px] space-y-5 bg-red px-7 py-4 md:px-5 md:py-12 z-10 font-sf-pro-text'>
        <div className='flex items-center gap-2'>
          <img src='/assets/resell/lighting.svg' alt='Bolt' width={22} height={32} />
          <p className='text-[32px] font-bold text-black font-sf-pro-text'>Sign Up</p>
        </div>

        <div className='grid md:grid-cols-2 gap-[9px]'>
          <FormField form={form} name='first_name' label='First Name'>
            <Input placeholder='Enter your first name.' />
          </FormField>

          <FormField form={form} name='last_name' label='Last Name'>
            <Input placeholder='Enter your last name.' />
          </FormField>
        </div>

        <FormField form={form} name='country' label='Country' className='w-full z-20'>
          {(field) => (
            <BaseSelect
              type='auth'
              placeholder='Select a country.'
              width={329}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              items={africanCountries}
            />
          )}
        </FormField>

        <FormField form={form} name='email' label='Email Address'>
          <Input placeholder='Enter email address.' />
        </FormField>

        <FormField form={form} name='password' label='Password' className='w-full'>
          {(field) => (
            <PasswordInput
              placeholder='Enter password.'
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        </FormField>

        <div className='flex items-center justify-center gap-1 text-sm text-black font-sf-pro-text'>
          Already have an account?{' '}
          <button
            type='button'
            onClick={onSwitchToLogin}
            className='text-base font-bold text-accent hover:underline'>
            Log In
          </button>
        </div>

        <Button
          type='submit'
          className='w-full h-[50px] text-xl font-semibold font-sf-pro-text'
          disabled={registerUser.isPending}>
          {registerUser.isPending ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </FormBase>
    </div>
  )
}
