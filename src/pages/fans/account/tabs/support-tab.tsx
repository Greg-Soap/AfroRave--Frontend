import { FormBase, FormField } from '@/components/reusable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SupportSchema } from '@/schema/support-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

export default function SupportTab() {
  const form = useForm<z.infer<typeof SupportSchema>>({
    resolver: zodResolver(SupportSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  })

  function onSubmit(values: z.infer<typeof SupportSchema>) {
    console.log(values)
  }

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className='w-[529px] flex flex-col items-center gap-6 mb-[100px]'>
      <FormField
        form={form}
        name='email'
        className='w-full flex flex-col gap-1 border border-white px-3 py-2 rounded-[5px] h-[60px]'
        label='Email'
        labelClassName='text-white'>
        <Input className='bg-transparent border-none' />
      </FormField>

      <FormField name='message' form={form} className='w-full'>
        <Textarea
          className='bg-transparent text-lg h-[291px] px-[22px] py-[23px] placeholder:text-white rounded-[4px]'
          placeholder='How can we help you?'
        />
      </FormField>

      <Button
        variant='ghost'
        className='w-[120px] h-10 font-sf-pro-text text-sm font-semibold text-white hover:bg-white/10 hover:text-white'>
        SUBMIT
      </Button>
    </FormBase>
  )
}
