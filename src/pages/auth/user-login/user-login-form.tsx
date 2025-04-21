import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { InputTypeField } from '@/components/form-fields'
import { Link } from 'react-router-dom'

const formSchema = z.object({
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

interface UserLoginFormProps {
  loginType: 'guest' | 'creator' | 'vendor'
}

export default function UserLoginForm({ loginType }: UserLoginFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className='relative  flex justify-center max-md:mt-[100px]'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' md:w-[415px] h-fit rounded-[12px] space-y-8 bg-red px-7 py-4 md:px-10 md:py-7 z-10 font-sf-pro-text'>
          <div className='flex flex-col'>
            <p className='text-[32px] font-bold text-black'>Log In as {loginType}</p>
            <span className='text-sm text-black'>
              New to AfroRevive?{' '}
              <Link to='/sign-up' className='text-base font-bold text-accent'>
                Sign Up
              </Link>
            </span>
          </div>

          <InputTypeField
            form={form}
            label='Email Address'
            placeholder='Enter email address.'
            name='email'
            className='text-[13px] text-[#0F0F0F]'
            inputClassName='text-[#0F0F0F] md:max-w-full'
          />

          <div className='w-full flex flex-col items-end gap-2'>
            <InputTypeField
              type='password'
              form={form}
              label='Password'
              placeholder='Enter password.'
              name='password'
              className='text-[13px] text-[#0F0F0F]'
              inputClassName='text-[#0F0F0F] md:max-w-full'
            />

            <Link to='/forgot-password' className='text-[13px] font-bold text-accent'>
              Forgot Password?
            </Link>
          </div>
          <Button type='submit' className='w-full h-[50px] text-xl font-semibold'>
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  )
}
