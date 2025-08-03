import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface SubmitBtnProps {
  children?: React.ReactNode
  isLoading?: boolean
}

export function SubmitBtn({ children, isLoading = false }: SubmitBtnProps) {
  return (
    <div className='flex flex-col md:flex-row items-center gap-3 md:gap-8 justify-center py-8'>
      {children}

      <Button
        type='submit'
        variant='destructive'
        disabled={isLoading}
        className='w-full md:w-[240px] h-10 rounded-[8px] pt-[13px] px-[153px] text-xs font-sf-pro-text uppercase'>
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Creating Event...
          </>
        ) : (
          'Continue'
        )}
      </Button>
    </div>
  )
}
