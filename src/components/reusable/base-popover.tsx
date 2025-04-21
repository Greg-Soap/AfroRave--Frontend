import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function BasePopover({ trigger, content }: IPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className='max-w-fit border-none flex flex-col bg-[#686868] p-0'>
        {content}
      </PopoverContent>
    </Popover>
  )
}

interface IPopoverProps {
  trigger: React.ReactNode
  content: React.ReactNode
}
