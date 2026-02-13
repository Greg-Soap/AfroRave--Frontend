import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'
import { useState } from 'react'
import { WithdrawFundsModal } from '../components/withdraw-funds-modal'
import { TransactionDetailsModal } from '../components/transaction-details-modal'

interface PayoutItem {
    id: string
    eventName: string
    ticketType: string
    date: string
    amount: number
    status: 'pending' | 'paid' | 'in-review'
}

// Mock data - replace with actual API call
const mockPayoutHistory: PayoutItem[] = [
    {
        id: '1',
        eventName: 'Afro Festival',
        ticketType: 'VIP Access',
        date: '10th Nov, 14:30',
        amount: 40500,
        status: 'pending',
    },
    {
        id: '2',
        eventName: 'Afro Festival',
        ticketType: 'VIP Access',
        date: '10th Nov, 14:30',
        amount: 40500,
        status: 'paid',
    },
    {
        id: '3',
        eventName: 'Afro Festival',
        ticketType: 'VIP Access',
        date: '10th Nov, 14:30',
        amount: 40500,
        status: 'in-review',
    },
]

export default function WalletTab() {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<PayoutItem | null>(null)
    const availableBalance = 40500

    const handleTransactionClick = (item: PayoutItem) => {
        setSelectedTransaction(item)
    }

    return (
        <div className='w-full max-w-[730px] flex flex-col gap-8 pb-[100px]'>
            {/* Title */}
            <h2 className='text-white text-base md:text-lg font-sf-pro-display text-center'>
                Manage Your Payout Funds
            </h2>

            {/* Available Balance Card */}
            <div className='w-full bg-[#2A2A2A] rounded-lg p-6 flex flex-col gap-4'>
                <div className='flex items-center gap-2 text-white/60'>
                    <Wallet className='w-5 h-5' />
                    <span className='text-sm font-sf-pro-display'>Available Balance</span>
                </div>
                <p className='text-white text-3xl md:text-4xl font-bold font-sf-pro-display'>
                    ₦{availableBalance.toLocaleString()}
                </p>
                <Button
                    onClick={() => setIsWithdrawModalOpen(true)}
                    className='w-full h-12 bg-[#0066FF] hover:bg-[#0052CC] text-white font-sf-pro-display font-semibold rounded-lg transition-colors'>
                    Withdraw Funds
                </Button>
            </div>

            {/* Payout History */}
            <div className='w-full flex flex-col gap-4'>
                <h3 className='text-white text-sm font-sf-pro-display font-semibold uppercase tracking-wider'>
                    PAYOUT HISTORY
                </h3>
                <p className='text-white/60 text-sm font-sf-pro-display'>
                    Funds Are Added To Your Wallet After Successful Resale
                </p>

                {/* Payout Items */}
                <div className='w-full flex flex-col gap-3'>
                    {mockPayoutHistory.map((item) => (
                        <PayoutHistoryItem
                            key={item.id}
                            item={item}
                            onClick={() => handleTransactionClick(item)}
                        />
                    ))}
                </div>
            </div>

            {/* Modals */}
            <WithdrawFundsModal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                availableBalance={availableBalance}
            />

            {selectedTransaction && (
                <TransactionDetailsModal
                    isOpen={!!selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                    transaction={selectedTransaction}
                />
            )}
        </div>
    )
}

interface PayoutHistoryItemProps {
    item: PayoutItem
    onClick: () => void
}

function PayoutHistoryItem({ item, onClick }: PayoutHistoryItemProps) {
    const getStatusColor = (status: PayoutItem['status']) => {
        switch (status) {
            case 'paid':
                return 'bg-green-500/20 text-green-500'
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-500'
            case 'in-review':
                return 'bg-blue-500/20 text-blue-500'
        }
    }

    const getStatusText = (status: PayoutItem['status']) => {
        switch (status) {
            case 'paid':
                return 'Paid'
            case 'pending':
                return 'Pending'
            case 'in-review':
                return 'In Review'
        }
    }

    return (
        <button
            onClick={onClick}
            className='w-full bg-[#2A2A2A] hover:bg-[#333333] rounded-lg p-4 flex items-center justify-between transition-colors cursor-pointer'>
            <div className='flex flex-col items-start gap-2'>
                <p className='text-white font-sf-pro-display font-medium text-left'>{item.eventName}</p>
                <div className='flex items-center gap-2 text-white/60 text-sm'>
                    <Wallet className='w-4 h-4' />
                    <span className='font-sf-pro-display'>{item.ticketType}</span>
                    <span className='font-sf-pro-display'>•</span>
                    <span className='font-sf-pro-display'>{item.date}</span>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <p className='text-white font-sf-pro-display font-semibold text-lg'>
                    ₦{item.amount.toLocaleString()}
                </p>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-sf-pro-display font-medium ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                </span>
            </div>
        </button>
    )
}
