// import { useState } from 'react'
import { VendorRegistrationCallout } from './vendor-registration-callout'
import { useAuth } from '@/contexts/auth-context'

export function VendorRegistrationFlow() {
    const { openAuthModal } = useAuth()

    const handleOpen = () => {
        openAuthModal('signup', 'vendor')
    }

    return (
        <>
            <VendorRegistrationCallout
                onOpen={handleOpen}
                delay={1500}
            />
        </>
    )
}
