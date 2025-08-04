import { useEventStore } from '@/stores'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ServiceForm from '../vendor-forms/service-form'
import SlotForm from '../vendor-forms/slot-form'

export default function VendorTab({
  setStep,
  setActiveTabState,
}: {
  setStep: (step: number) => void
  setActiveTabState: (activeTab: string) => void
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentForm, setCurrentForm] = useState<string>()
  const { eventId } = useEventStore()

  useEffect(() => {
    const formParam = searchParams.get('form')

    if (formParam === 'service' || formParam === 'slot') {
      setCurrentForm(formParam)
    } else if (searchParams.get('tab') === 'vendor') {
      setSearchParams({ tab: 'vendor', form: 'service' })
    }
  }, [searchParams, setSearchParams])

  function handleFormChange() {
    setSearchParams({ tab: 'vendor', form: 'slot' })
    setCurrentForm('slot')
  }

  function renderPublishTab() {
    setActiveTabState('publish')
    searchParams.delete('form')
  }

  // Check if event ID exists, if not show error message
  if (!eventId) {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-4 py-8'>
        <div className='text-center'>
          <h2 className='text-xl font-bold text-black mb-2'>No Event Found</h2>
          <p className='text-gray-600 mb-4'>Please create an event first before adding vendors.</p>
          <button
            type='button'
            onClick={() => setActiveTabState('event-details')}
            className='bg-black text-white hover:bg-gray-800 px-4 py-2 rounded'>
            Go to Event Details
          </button>
        </div>
      </div>
    )
  }

  if (currentForm === 'slot') {
    setStep(4.5)
    return <SlotForm renderPublishTab={renderPublishTab} />
  }

  setStep(4)
  return <ServiceForm handleFormChange={handleFormChange} />
}
