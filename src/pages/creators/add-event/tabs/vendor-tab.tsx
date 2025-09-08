import { useEventStore } from '@/stores'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import VendorForm from '../vendor-forms/vendor-form'
import { NoEventId } from '../component/no-event-id'

export default function VendorTab({
  setStep,
  setActiveTabState,
}: {
  setStep: (step: number) => void
  setActiveTabState: (activeTab: string) => void
}) {
  const [searchParams] = useSearchParams()
  const { eventId } = useEventStore()

  useEffect(() => {
    setStep(4)
  }, [setStep])

  function renderPublishTab() {
    setActiveTabState('publish')
    searchParams.delete('form')
  }

  if (!eventId) {
    return <NoEventId setActiveTabState={setActiveTabState} />
  }

  return <VendorForm handleFormChange={renderPublishTab} />
}
