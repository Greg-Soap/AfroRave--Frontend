import EventCategoryBlocks from './event-category-blocks'
import { SEO } from '../../components/seo'

export default function EventsPage() {
  return (
    <>
      <SEO
        title='Afro Revive - African Concert Tickets & Events'
        description='Buy tickets for the hottest African concerts and events. Secure your spot for live performances by top African artists and experience authentic African entertainment.'
      />
      <EventCategoryBlocks />
    </>
  )
}
