import { useState } from 'react'
import { VendorRegistrationCallout } from './vendor-registration-callout'
import { VendorRegistrationModal } from './vendor-registration-modal'

export function VendorRegistrationFlow() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [calloutKey, setCalloutKey] = useState(0)
    const [calloutDelay, setCalloutDelay] = useState(1500)

    const handleClose = () => {
        console.log('🚪 Modal closing...')
        setIsModalOpen(false)

        // Clear the dismissal flag so callout can reappear
        sessionStorage.removeItem('vendorCalloutDismissed')
        console.log('🗑️ Cleared session storage')

        // Reset callout with 3s delay after closing modal
        setCalloutDelay(3000)
        console.log('⏱️ Set delay to 3000ms')

        setCalloutKey(prev => {
            const newKey = prev + 1
            console.log('🔑 Incrementing key from', prev, 'to', newKey)
            return newKey
        })
    }

    return (
        <>
            <VendorRegistrationCallout
                key={calloutKey}
                onOpen={() => {
                    console.log('📢 Callout clicked - opening modal')
                    setIsModalOpen(true)
                }}
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
