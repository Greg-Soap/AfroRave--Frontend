import BaseModal from '@/components/reusable/base-modal'
import { CheckCircle2 } from 'lucide-react'

interface Transaction {
    id: string
    eventName: string
    ticketType: string
    date: string
    amount: number
    status: 'pending' | 'paid' | 'in-review'
}

interface TransactionDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    transaction: Transaction
}

export function TransactionDetailsModal({
    isOpen,
    onClose,
    transaction,
}: TransactionDetailsModalProps) {
    // Mock financial breakdown - replace with actual data
    const standardAccess = 10000
    const resalePrice = 18000
    const serviceFee = 1640
    const yourPayout = 16350

    return (
        <BaseModal
            open={isOpen}
            onClose={onClose}
            size='small'
            className='bg-[#1A1A1A] border border-white/10'>
            <div className='w-full flex flex-col gap-6 p-6'>
                {/* Title */}
                <h2 className='text-white text-xl font-sf-pro-display font-semibold text-center'>
                    Transaction Details
                </h2>

                {/* Status Badge */}
                <div className='flex justify-center'>
                    <span className='px-4 py-1.5 bg-green-500/20 text-green-500 rounded-full text-sm font-sf-pro-display font-medium'>
                        Sold
                    </span>
                </div>

                {/* Event Details Card */}
                <div className='bg-[#2A2A2A] rounded-lg p-4 flex flex-col gap-3'>
                    <div className='flex items-start gap-2'>
                        <span className='text-[#E31E24] text-sm'>📅</span>
                        <div className='flex flex-col gap-1'>
                            <p className='text-white/60 text-xs font-sf-pro-display'>Event</p>
                            <p className='text-white font-sf-pro-display font-medium'>{transaction.eventName}</p>
                        </div>
                    </div>

                    <div className='flex items-start gap-2'>
                        <span className='text-[#E31E24] text-sm'>📅</span>
                        <div className='flex flex-col gap-1'>
                            <p className='text-white/60 text-xs font-sf-pro-display'>Date</p>
                            <p className='text-white font-sf-pro-display'>{transaction.date}</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='text-white/60 text-xs font-sf-pro-display'>Ticket Type</p>
                        <p className='text-white font-sf-pro-display'>{transaction.ticketType}</p>
                    </div>
                </div>

                {/* Financial Breakdown */}
                <div className='flex flex-col gap-4'>
                    <h3 className='text-white font-sf-pro-display font-semibold'>Financial Breakdown</h3>

                    <div className='flex flex-col gap-3'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='w-2 h-2 rounded-full bg-white/40' />
                                <span className='text-white/80 font-sf-pro-display text-sm'>Standard Access</span>
                            </div>
                            <span className='text-white font-sf-pro-display'>
                                ₦{standardAccess.toLocaleString()}
                            </span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='text-white/80 font-sf-pro-display text-sm'>Resale Price</span>
                            <span className='text-white font-sf-pro-display'>₦{resalePrice.toLocaleString()}</span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='text-white/80 font-sf-pro-display text-sm'>Service Fee</span>
                            <span className='text-white font-sf-pro-display'>₦{serviceFee.toLocaleString()}</span>
                        </div>

                        <div className='h-px bg-white/10' />

                        <div className='flex items-center justify-between'>
                            <span className='text-white font-sf-pro-display font-semibold'>Your Payout</span>
                            <span className='text-[#0066FF] font-sf-pro-display font-bold text-lg'>
                                ₦{yourPayout.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                {transaction.status === 'paid' && (
                    <div className='bg-[#2A2A2A] rounded-lg p-4 flex items-center gap-3'>
                        <CheckCircle2 className='w-5 h-5 text-green-500' />
                        <p className='text-white/80 font-sf-pro-display text-sm'>
                            Funds Have Been Added To Your Wallet
                        </p>
                    </div>
                )}
            </div>
        </BaseModal>
    )
}
