import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type * as React from 'react'

export interface ICustomSelectProps {
  type?: 'auth' | 'others'
  width?: number
  defaultValue?: string
  placeholder: string
  items: { value: string; label: string }[]
  value?: string
  onChange?: (value: string) => void
  selectedItemRenderer?: (value: string) => React.ReactNode
  customOptions?: React.ReactNode
  label?: string
  isLoading?: boolean
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
}

export function BaseSelect({
  type = 'others',
  width = 165,
  defaultValue,
  placeholder,
  items,
  value,
  onChange,
  selectedItemRenderer,
  customOptions,
  label,
  isLoading = false,
  triggerClassName,
  contentClassName,
  itemClassName,
}: ICustomSelectProps) {
  const safeItems = Array.isArray(items)
    ? items.filter((item) => item && typeof item === 'object' && 'value' in item && 'label' in item)
    : []

  if (isLoading) {
    return (
      <div
        className={cn(
          `!min-w-[${width}px] border bg-transparent animate-pulse`,
          {
            'border-[#1E1E1E] w-full h-[35px] font-sf-pro-text rounded-[4px] text-black':
              type === 'auth',
            'border-white h-[50px] font-input-mono rounded-[3px]': type === 'others',
          },
          triggerClassName,
        )}
      />
    )
  }

  return (
    <Select value={value} onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger
        className={cn(
          `!min-w-[${width}px] border bg-transparent`,
          {
            'border-[#1E1E1E] w-full h-[35px] font-sf-pro-text rounded-[4px] text-black':
              type === 'auth',
            'border-white h-[50px] data-[state=open]:bg-[#494747] data-[state=open]:border-none font-input-mono rounded-[3px]':
              type === 'others',
          },
          triggerClassName,
        )}>
        {selectedItemRenderer ? (
          <SelectValue
            placeholder={placeholder}
            className={cn('leading-normal', {
              'font-light font-input-mono': type === 'others',
              'font-normal font-sf-pro-text': type === 'auth',
            })}>
            {value && selectedItemRenderer(value)}
          </SelectValue>
        ) : (
          <SelectValue
            placeholder={placeholder}
            className={cn('leading-normal', {
              'font-light font-input-mono': type === 'others',
              'font-normal font-sf-pro-text': type === 'auth',
            })}
          />
        )}
      </SelectTrigger>
      <SelectContent
        className={cn(
          'flex flex-col',
          {
            'bg-[#494747] border-none': type === 'others',
            'border-[#1E1E1E]': type === 'auth',
          },
          contentClassName,
        )}
        position='popper'
        sideOffset={5}>
        <SelectGroup>
          {label && (
            <SelectLabel
              className={cn('text-sm', {
                'text-white': type === 'others',
                'text-black': type === 'auth',
              })}>
              {label}
            </SelectLabel>
          )}
          {customOptions
            ? customOptions
            : safeItems.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className={cn(
                    'border-b last:border-none rounded-none',
                    {
                      'font-input-mono font-light text-white hover:!text-white hover:!bg-white/10 data-[highlighted]:!bg-white/20 data-[highlighted]:!text-white border-white':
                        type === 'others',
                      'font-sf-pro-text text-black hover:!text-black hover:!bg-black/10 data-[highlighted]:!bg-black/20 data-[highlighted]:!black-white border-black':
                        type === 'auth',
                    },
                    itemClassName,
                  )}>
                  {item.label}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
