import { useState } from 'react'
import { VendorRegistrationCallout } from './vendor-registration-callout'
import { VendorRegistrationModal } from './vendor-registration-modal'

export function VendorRegistrationFlow() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [calloutKey, setCalloutKey] = useState(0)

    const handleClose = () => {
        setIsModalOpen(false)
        setTimeout(() => {
            setCalloutKey((k) => k + 1)
        }, 5000)
    }

    return (
        <>
            <VendorRegistrationCallout
                key={calloutKey}
                onOpen={() => setIsModalOpen(true)}
                delay={calloutKey === 0 ? 1500 : 0}
            />
            <VendorRegistrationModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSuccess={handleClose}
            />
        </>
    )
}
