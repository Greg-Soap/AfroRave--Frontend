import { Button } from '@/components/ui/button'
import { useEventStore } from '@/stores'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CreateTicketForm from '../ticket-forms/create-ticket-form'
import PromoCodeForm from '../ticket-forms/promo-code-form'
import UpgradeForm from '../ticket-forms/upgrade-form'

export default function TicketsTab({
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

    if (formParam === 'create' || formParam === 'promocode' || formParam === 'upgrades') {
      setCurrentForm(formParam)
    } else if (searchParams.get('tab') === 'tickets') {
      setSearchParams({ tab: 'tickets', form: 'create' })
    }
  }, [searchParams])

  function handleFormChange(form: string) {
    setSearchParams({ tab: 'tickets', form: form })
    setCurrentForm(form)
  }

  function renderThemeTab() {
    setActiveTabState('theme')
    searchParams.delete('form')
  }

  // Check if event ID exists, if not show error message
  if (!eventId) {
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

  if (currentForm === 'promocode') {
    setStep(2.5)
    return <PromoCodeForm handleFormChange={handleFormChange} />
  }

  if (currentForm === 'upgrades') {
    setStep(2.5)
    return <UpgradeForm renderThemeTab={renderThemeTab} />
  }

  if (currentForm === 'create') {
    setStep(2)
    return <CreateTicketForm handleFormChange={handleFormChange} />
  }
}
