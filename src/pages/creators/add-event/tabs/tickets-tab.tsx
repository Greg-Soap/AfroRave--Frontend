import { useEventStore } from '@/stores'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PromoCodeForm from '../ticket-forms/promo-code-form/promo-code-form'
//  import UpgradeForm from '../ticket-forms/upgrade-form'
import CreateTicketForm from '../ticket-forms/create'
import { NoEventId } from '../component/no-event-id'

export default function TicketsTab({ setStep, setActiveTabState, showError }: ITicketsTab) {
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

  if (!eventId) {
    return <NoEventId setActiveTabState={setActiveTabState} />
  }

  if (currentForm === 'promocode') {
    setStep(2.5)
    return <PromoCodeForm handleFormChange={renderThemeTab} />
  }

  // if (currentForm === 'upgrades') {
  //   setStep(2.5)
  //   return <UpgradeForm renderThemeTab={renderThemeTab} />
  // }

  if (currentForm === 'create') {
    setStep(2)
    return <CreateTicketForm handleFormChange={handleFormChange} showError={showError} />
  }
}

interface ITicketsTab {
  setStep: (step: number) => void
  setActiveTabState: (activeTab: string) => void
  showError: () => void
}
