import { getRoutePath } from '@/config/get-route-path'
import { events } from '@/data/events'
import { EmptyState } from '@/pages/fans/my-tickets/components/empty-state'
import { Tickets } from '@/pages/fans/my-tickets/components/tickets'

export default function ExpiredTicketsTab() {
  const isEmpty = false

  return (
    <>
      {isEmpty ? (
        <EmptyState type='expired' btn_name='Resell Tickets' path={getRoutePath('resale')} />
      ) : (
        <ExpiredTickets />
      )}
    </>
  )
}

function ExpiredTickets() {
  return (
    <div className='flex flex-wrap items-center gap-7 px-[100px] mb-[499px]'>
      {events.map(({ event_name, image, id }) => (
        <Tickets key={id} id='1' event_name={event_name} image={image} quantity={0} />
      ))}
    </div>
  )
}
