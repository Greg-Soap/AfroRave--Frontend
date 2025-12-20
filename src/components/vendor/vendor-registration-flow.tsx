import { useState } from 'react'
import { VendorRegistrationCallout } from './vendor-registration-callout'
import { VendorRegistrationModal } from './vendor-registration-modal'

export function VendorRegistrationFlow() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [calloutKey, setCalloutKey] = useState(0)
    const [calloutDelay, setCalloutDelay] = useState(1500)

    const handleClose = () => {
        setIsModalOpen(false)
        // Reset callout with 3s delay after closing modal
        setCalloutDelay(3000)
        setCalloutKey(prev => prev + 1)
    }

    return (
        <>
            <VendorRegistrationCallout
                key={calloutKey}
                onOpen={() => setIsModalOpen(true)}
                delay={calloutDelay}
            />
            <VendorRegistrationModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSuccess={() => { }}
            />
        </>
    )
}
