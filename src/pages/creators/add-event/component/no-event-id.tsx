import { Button } from '@/components/ui/button'

interface INoEventId {
  setActiveTabState: (tab: string) => void
}

export function NoEventId({ setActiveTabState }: INoEventId) {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-4 py-8'>
      <div className='text-center'>
        <h2 className='text-xl font-bold text-black mb-2'>No Event Found</h2>
        <p className='text-gray-600 mb-4'>Please create an event first before adding tickets.</p>
        <Button
          onClick={() => setActiveTabState('event-details')}
          className='bg-black text-white hover:bg-gray-800'>
          Go to Event Details
        </Button>
      </div>
    </div>
  )
}
