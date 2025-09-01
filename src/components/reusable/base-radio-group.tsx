import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import type { ControllerRenderProps } from 'react-hook-form'

export function BaseRadioGroup({
  data,
  value,
  onChange,
}: {
  data: IRadioGroupProps[]
} & Partial<ControllerRenderProps>) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className='w-full flex flex-row flex-wrap gap-6 lg:gap-10'>
      {data.map((item) => (
        <div key={item.value} className='w-[400px] flex items-center'>
          <RadioGroupItem value={item.value} id={item.value} className='hidden' />
          <Label
            htmlFor={item.value}
            className={cn(
              'w-[400px] h-[252px] rounded-[8px] flex flex-col items-start gap-3 transition-colors duration-150 p-5 shadow-[0px_4px_12px_0px_#00000040] bg-medium-gray',
              {
                'border border-primary hover:border-primary': value === item.value,
                'border border-border hover:border-primary': value !== item.value,
              },
            )}>
            <p className='text-white font-black font-sf-pro-display leading-[100%]'>{item.label}</p>
            <img src={item.src} alt={item.alt} className='w-full  max-h-[181px] rounded-[10px]' />
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

export interface IRadioGroupProps {
  value: string
  label: string
  src: string
  alt: string
}
