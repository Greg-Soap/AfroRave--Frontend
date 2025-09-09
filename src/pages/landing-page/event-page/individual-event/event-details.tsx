import { EventLocation } from '@/pages/landing-page/event-page/event-location'
import EventDescription from './sections/event-description'
import EventDetailsSection from './sections/event-details'
import TicketSection from './sections/tickets'
import ContactSection from './sections/contact'
import TermsSection from './sections/terms'
import CartTrigger from './_components/cart-trigger'
import { SectionContainer } from './_components/section-container'
import type { EventDetailData } from '@/types'

export default function EventDetails({ event, layout = 'default' }: IEventDetailsProp) {
  return (
    <section className='md:pb-16 w-full flex flex-col items-center'>
      <div className='relative w-full flex flex-col'>
        {event.eventDetails.desktopMedia?.background === '' ||
        event.eventDetails.desktopMedia === null ? (
          <div className='flex items-center justify-center w-full min-h-[500px] xl:h-[720px]'>
            <p className='text-3xl text-center font-semibold text-white'>{event.eventName}</p>
          </div>
        ) : (
          <img
            src={event.eventDetails.desktopMedia.background}
            alt={event.eventName}
            className='w-full min-h-[400px] xl:h-[720px]'
          />
        )}

        {event.eventDetails.desktopMedia?.background !== '' && (
          <div className='absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/10 to-transparent backdrop-blur-xs' />
        )}
      </div>

      <div className='max-w-[1536px] w-full flex flex-col gap-[60px] md:gap-[120px] -mt-[200px] xl:-mt-[475px] z-10'>
        {/** Contains the event-image and event-name */}
        <div className='flex flex-col gap-5 md:gap-0 md:items-end'>
          {layout === 'with-flyer' ? (
            <EventDetailsSection layout={layout} event={event} />
          ) : (
            <EventDetailsSection layout={layout} event={event} />
          )}

          {layout !== 'with-flyer' && (
            <CartTrigger event={event} className='mx-[120px] max-md:hidden' />
          )}
        </div>

        {(layout === 'with-flyer' || layout === 'standard-carousel') && (
          <TicketSection layout={layout} eventId={event.eventId} />
        )}

        {/**Event Description */}
        <EventDescription event={event} />

        {/**Tickets */}
        {layout === 'default' && <TicketSection layout={layout} eventId={event.eventId} />}

        {/**Location */}
        <SectionContainer>
          <EventLocation event_location={event.venue} />
        </SectionContainer>

        {/**Contact */}
        <ContactSection event={event} />

        <TermsSection />

        <CartTrigger event={event} className='md:hidden bg-[#686868] rounded-t-[8px] px-4 py-6' />
      </div>
    </section>
  )
}

interface IEventDetailsProp {
  event: EventDetailData
  layout?: 'default' | 'standard-carousel' | 'with-flyer'
}
