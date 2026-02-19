import { FormBase, FormField } from '@/components/reusable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'
import { useRegisterUser } from '@/hooks/use-auth'
import type { UserRegisterData } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { User, Mail, Lock } from 'lucide-react'

const formSchema = z.object({
  first_name: z.string().min(2, { message: 'Name too short.' }),
  last_name: z.string().min(2, { message: 'Name too short.' }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  confirm_email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(2, {
      message: 'Password too short.',
    })
    .max(20, {
      message: 'Password too long.',
    }),
}).refine((data) => data.email === data.confirm_email, {
  message: 'Email addresses do not match.',
  path: ['confirm_email'],
})

interface SignupFormProps {
  onSwitchToLogin: () => void
}

export function SignupForm({ }: SignupFormProps) {
  const registerUser = useRegisterUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      confirm_email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const userData: UserRegisterData = {
      firstName: values.first_name,
      lastName: values.last_name,
      email: values.email,
      telphone: '0000000000',
      gender: 'male',
      dateOfBirth: '2000-01-01',
      country: 'Nigeria',
      state: 'Lagos',
      password: values.password,
    }

    registerUser.mutate(userData)
  }

  return (
    <div className='relative flex justify-center'>
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='w-[415px] h-fit rounded-[12px] space-y-0 bg-white px-7 py-6 md:px-7 md:py-8 z-10 font-sf-pro-text'>
        <p className='text-[28px] font-bold text-black font-sf-pro-text mb-6'>Sign Up</p>

        <div className='flex flex-col w-full'>
          <FormField form={form} name='first_name' className='border-b border-gray-200 py-1'>
            <div className='flex items-center gap-2.5'>
              <User className='size-4 text-gray-400 shrink-0' />
              <Input placeholder='First name' className='border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-sm placeholder:text-gray-400' />
            </div>
          </FormField>

          <FormField form={form} name='last_name' className='border-b border-gray-200 py-1'>
            <div className='flex items-center gap-2.5'>
              <User className='size-4 text-gray-400 shrink-0' />
              <Input placeholder='Last name' className='border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-sm placeholder:text-gray-400' />
            </div>
          </FormField>

          <FormField form={form} name='email' className='border-b border-gray-200 py-1'>
            <div className='flex items-center gap-2.5'>
              <Mail className='size-4 text-gray-400 shrink-0' />
              <Input placeholder='Email Address' className='border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-sm placeholder:text-gray-400' />
            </div>
          </FormField>

          <FormField form={form} name='confirm_email' className='border-b border-gray-200 py-1'>
            <div className='flex items-center gap-2.5'>
              <Mail className='size-4 text-gray-400 shrink-0' />
              <Input placeholder='Confirm Email Address' className='border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-sm placeholder:text-gray-400' />
            </div>
          </FormField>

          <FormField form={form} name='password' className='py-1'>
            {(field) => (
              <div className='flex items-center gap-2.5'>
                <Lock className='size-4 text-gray-400 shrink-0' />
                <PasswordInput
                  placeholder='Password'
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  className='border-0 shadow-none focus-visible:ring-0 px-0 h-10 text-sm placeholder:text-gray-400'
                />
              </div>
            )}
          </FormField>
        </div>

        <div className='pt-6'>
          <Button
            type='submit'
            className='w-full h-[50px] text-base font-semibold font-sf-pro-text bg-black hover:bg-black/90 text-white rounded-[8px]'
            disabled={registerUser.isPending}>
            {registerUser.isPending ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </div>
      </FormBase>
    </div>
  )
}

