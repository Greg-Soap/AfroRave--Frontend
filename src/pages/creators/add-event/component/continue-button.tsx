import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface SubmitBtnProps {
  children?: React.ReactNode
  isLoading?: boolean
  updatingText?: string
  disabled?: boolean
  onClick?: () => void
  text?: string
  type?: 'submit' | 'button'
}

export function ContinueButton({
  children,
  isLoading = false,
  updatingText = 'Creating Event...',
  disabled = false,
  text = 'Continue',
  type = 'submit',
  onClick,
}: SubmitBtnProps) {
  return (
    <div className='flex flex-col md:flex-row items-center gap-3 md:gap-8 justify-center py-8'>
      {children}

      <Button
        type={type}
        variant='destructive'
        onClick={onClick}
        disabled={isLoading || disabled}
        className='w-full md:w-[240px] h-10 rounded-[8px] pt-[13px] px-[153px] text-xs font-sf-pro-text uppercase'>
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            {updatingText}
          </>
        ) : (
          text
        )}
      </Button>
    </div>
  )
}
