import { useState } from 'react'
import { VendorRegistrationCallout } from './vendor-registration-callout'
import { VendorRegistrationModal } from './vendor-registration-modal'

export function VendorRegistrationFlow() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <VendorRegistrationCallout
                onOpen={() => setIsModalOpen(true)}
                delay={1500}
            />
            <VendorRegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => setIsModalOpen(false)}
            />
        </>
    )
}
