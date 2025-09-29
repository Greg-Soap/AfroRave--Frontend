import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNewsletterSubscription } from '@/hooks/use-newsletter'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

interface NewsletterSignupProps {
  className?: string
}

export default function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const newsletterMutation = useNewsletterSubscription()

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: NewsletterFormData) => {
    await newsletterMutation.mutateAsync(data)
    setIsSubscribed(true)
    form.reset()
  }

  if (isSubscribed) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Button className='flex items-center gap-2 !py-[18px] h-[56px] w-full md:w-[552px]  text-base font-semibold uppercase'>
          The Journey just began{' '}
          <img src='/assets/resell/lighting.svg' className='w-4 h-5' alt='arrow' />
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center ${className}`}>
      <div className='flex w-full gap-1 md:w-[552px]'>
        <Input
          {...form.register('email')}
          type='email'
          placeholder='Enter your email address'
          className='flex-1 gap-2 md:w-[447px] h-[56px] rounded-l-[10px] px-2 uppercase text-center bg-white shadow-[0px_2px_10px_2px_rgba(0,0,0,0.1)] border-0 rounded-r-none focus-visible:ring-2 focus-visible:ring-blue-500'
        />
        <Button
          type='submit'
          disabled={newsletterMutation.isPending}
          className='md:w-[101px] h-[56px] px-3 bg-white text-black shadow-[0px_2px_10px_2px_rgba(0,0,0,0.1)] hover:bg-gray-100 border-0 rounded-l-none rounded-r-[10px] font-semibold uppercase disabled:opacity-50'>
          {newsletterMutation.isPending ? '...' : 'Stay Tuned'}
        </Button>
      </div>
    </form>
  )
}
