import { AddEventModal } from '../component/add-event-modal'

type TSelectedType = 'revenue_vendor' | 'service_vendor'

export function VendorModal({ onContinue }: { onContinue: (selectedType: TSelectedType) => void }) {
  return (
    <AddEventModal
      onContinue={onContinue}
      type='vendor'
      data={[
        {
          value: 'revenue_vendor',
          name: 'Revenue Vendor',
          caption:
            'Vendors who purchase a slot to sell goods or products at your event. A commission is applied to each confirmed slot.',
        },
        {
          value: 'service_vendor',
          name: 'Service vendor',
          caption:
            'Vendors who offer professional services required for event execution. Applications are submitted for your review and approval; no slot fee is charged.',
        },
      ]}
    />
  )
}
