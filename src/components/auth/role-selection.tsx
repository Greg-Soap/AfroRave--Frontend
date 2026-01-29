import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Calendar, Store } from 'lucide-react'
import { useState } from 'react'

type RoleType = 'creator' | 'vendor' | null

interface RoleSelectionProps {
    onContinue: (role: 'creator' | 'vendor') => void
}

export function RoleSelection({ onContinue }: RoleSelectionProps) {
    const [selectedRole, setSelectedRole] = useState<RoleType>(null)
    const [hoveredRole, setHoveredRole] = useState<RoleType>(null)

    const handleContinue = () => {
        if (selectedRole) {
            onContinue(selectedRole)
        }
    }

    return (
        <div className='w-full flex flex-col items-center gap-8 py-8 px-4'>
            {/* Title */}
            <h2 className='text-white text-2xl md:text-3xl font-bold text-center'>
                How would you like to get started?
            </h2>

            {/* Subtitle */}
            <p className='text-white/80 text-sm md:text-base text-center'>
                Select the best role that describe what you do.
            </p>

            {/* Role Cards */}
            <div className='w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                {/* Organizer Card */}
                <button
                    type='button'
                    onClick={() => setSelectedRole('creator')}
                    onMouseEnter={() => setHoveredRole('creator')}
                    onMouseLeave={() => setHoveredRole(null)}
                    className={cn(
                        'relative flex flex-col items-center gap-4 p-6 md:p-8 rounded-lg transition-all',
                        {
                            'bg-[#2a2a2a] border-2': selectedRole === 'creator',
                            'bg-[#1a1a1a] border-2': selectedRole !== 'creator',
                        },
                    )}
                    style={{
                        borderColor: selectedRole === 'creator' || hoveredRole === 'creator'
                            ? '#FFFFFF'
                            : 'rgba(255, 255, 255, 0.1)'
                    }}>
                    <Calendar
                        className='w-12 h-12 transition-colors'
                        style={{ color: '#E31E24' }}
                    />
                    <h3 className='text-white text-xl font-bold uppercase'>Organizer</h3>
                    <p className='text-white/70 text-sm text-center'>Create and manage events</p>
                </button>

                {/* Vendor Card */}
                <button
                    type='button'
                    onClick={() => setSelectedRole('vendor')}
                    onMouseEnter={() => setHoveredRole('vendor')}
                    onMouseLeave={() => setHoveredRole(null)}
                    className={cn(
                        'relative flex flex-col items-center gap-4 p-6 md:p-8 rounded-lg transition-all',
                        {
                            'bg-[#2a2a2a] border-2': selectedRole === 'vendor',
                            'bg-[#1a1a1a] border-2': selectedRole !== 'vendor',
                        },
                    )}
                    style={{
                        borderColor: selectedRole === 'vendor' || hoveredRole === 'vendor'
                            ? '#FFFFFF'
                            : 'rgba(255, 255, 255, 0.1)'
                    }}>
                    <Store
                        className='w-12 h-12 transition-colors'
                        style={{ color: '#E31E24' }}
                    />
                    <h3 className='text-white text-xl font-bold uppercase'>Vendor</h3>
                    <p className='text-white/70 text-sm text-center'>Render services for events</p>
                </button>
            </div>

            {/* Continue Button */}
            <Button
                onClick={handleContinue}
                disabled={!selectedRole}
                className='w-full max-w-md h-12 rounded-lg font-semibold uppercase bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed'>
                Continue
            </Button>
        </div>
    )
}
