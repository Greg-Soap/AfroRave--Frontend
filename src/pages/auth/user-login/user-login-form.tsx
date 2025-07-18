import { FormBase, FormField } from '@/components/reusable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'
import { useAuth } from '@/contexts/auth-context'
import { useLogin } from '@/hooks/use-auth'
import type { LoginData } from '@/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({
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
})

interface UserLoginFormProps {
  onSwitchToSignup: () => void
}

export function UserLoginForm({ onSwitchToSignup }: UserLoginFormProps) {
  const { loginType } = useAuth()
  const login = useLogin()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const loginData: LoginData = {
      email: values.email,
      password: values.password,
    }

    login.mutate(loginData)
  }

  return (
    <div className='relative flex justify-center'>
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='w-[415px] h-fit rounded-[12px] space-y-5 bg-red px-7 py-4 md:px-10 md:py-12 z-10 font-sf-pro-text'>
        <div className='flex flex-col'>
          <p className='text-[32px] font-bold text-black font-sf-pro-display'>
            Log In as {loginType}
          </p>
          <span className='text-sm text-black font-sf-pro-text'>
            New to AfroRevive?{' '}
            <button
              type='button'
              onClick={onSwitchToSignup}
              className='text-base font-bold text-accent hover:underline'>
              Sign Up
            </button>
          </span>
        </div>

        <FormField form={form} name='email' showError={true} showMessage={true}>
          <Input placeholder='Enter email address.' />
        </FormField>

        <div className='w-full flex flex-col items-end gap-2'>
          <FormField form={form} name='password'  className='w-full' showError={true} showMessage={true}>
            {(field) => (
              <PasswordInput
                placeholder='Enter password.'
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          </FormField>

          {/* <button type='button' className='text-[13px] font-bold text-accent hover:underline'>
            Forgot Password?
          </button> */}
        </div>

        <Button
          type='submit'
          className='w-full h-[50px] text-xl font-semibold font-sf-pro-text'
          disabled={login.isPending}>
          {login.isPending ? 'Signing In...' : 'Sign In'}
        </Button>
      </FormBase>
    </div>
  )
}
