import { events } from '@/data/events'
import { useParams } from 'react-router-dom'
import EventDetails from './event-details'
import { SEO } from '@/components/seo'

export default function IndividualEventPage() {
  const { eventId } = useParams()
  const event = events.find((item) => item.id === Number(eventId))

  if (!event) {
    return <p>No Events Found</p>
  }

  return (
    <>
      <SEO
        title={`${event.event_name} - Afro Revive`}
        description={`Buy tickets for ${event.event_name} - Afro Revive`}
      />
      <EventDetails event={event} />
    </>
  )
}
