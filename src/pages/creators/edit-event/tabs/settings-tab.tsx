import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface SettingsTabProps {
  onDeleteEvent: () => void
  isDeleting: boolean
}

export default function SettingsTab({ onDeleteEvent, isDeleting }: SettingsTabProps) {
  return (
    <div className='w-full flex flex-col p-0 md:p-14 gap-8'>
      <div className='flex flex-col gap-4 w-full md:min-w-[560px] max-w-[800px]'>
        <p className='uppercase font-sf-pro-display font-black text-black text-xl'>
          Event Settings
        </p>

        <div className='w-full bg-white p-6 rounded-[10px] border border-gray-200'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg font-semibold text-black'>Danger Zone</h3>
              <p className='text-sm text-gray-600'>
                Once you delete an event, there is no going back. Please be certain.
              </p>
            </div>

            <div className='flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg'>
              <div className='flex flex-col gap-1'>
                <h4 className='font-medium text-red-800'>Delete Event</h4>
                <p className='text-sm text-red-600'>
                  Permanently delete this event and all associated data.
                </p>
              </div>

              <Button
                variant='destructive'
                onClick={onDeleteEvent}
                disabled={isDeleting}
                className='flex items-center gap-2'>
                <Trash2 size={16} />
                {isDeleting ? 'DELETING...' : 'DELETE EVENT'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
