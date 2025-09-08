import { AddEventModal } from '../../component/add-event-modal'

type TSelectedType = 'single_ticket' | 'group_ticket' | 'multi_day'

export function TicketModal({ onContinue }: { onContinue: (selectedType: TSelectedType) => void }) {
  return (
    <AddEventModal
      onContinue={onContinue}
      type='ticket'
      data={[
        {
          value: 'single_ticket',
          name: 'Single ticket',
          caption: 'Admits only one individual',
        },
        {
          value: 'group_ticket',
          name: 'group ticket',
          caption: 'Admits multiple individuals under a single ticket.',
        },
        {
          value: 'multi_day',
          name: 'multi day',
          caption: 'Grants access on multiple event dates. ( for recurring events)',
        },
      ]}
    />
  )
}
