import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export function TabChildrenContainer({
  handleBackClick,
  isLoading,
  handleSaveEvent,
  currentTab,
  children,
}: ITabChildrenProps) {
  return (
    <div className='w-full h-fit flex flex-col items-center'>
      <div className='w-full flex items-center justify-between py-3 px-5 md:px-8'>
        <Button
          variant='ghost'
          className='w-fit h-fit hover:bg-black/10 !p-1'
          onClick={handleBackClick}
          disabled={currentTab === 'event-details'}>
          <ChevronLeft color='#000000' className='min-w-1.5 min-h-3' />
        </Button>

        <Button
          variant='destructive'
          className='h-8 w-24 text-xs font-sf-pro-text font-black rounded-[5px]'
          onClick={handleSaveEvent}
          disabled={isLoading}>
          {isLoading ? 'SAVING...' : 'SAVE'}
        </Button>
      </div>

      <div className='container w-full h-fit flex flex-col items-center'>{children}</div>
    </div>
  )
}

interface ITabChildrenProps {
  handleBackClick?: () => void
  isLoading?: boolean
  handleSaveEvent: () => void
  currentTab: string
  children: React.ReactNode
}
