import BaseModal from '@/components/reusable/base-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface WithdrawFundsModalProps {
    isOpen: boolean
    onClose: () => void
    availableBalance: number
}

export function WithdrawFundsModal({ isOpen, onClose, availableBalance }: WithdrawFundsModalProps) {
    const [amount, setAmount] = useState('')

    const handleConfirm = () => {
        // TODO: Implement withdrawal logic
        console.log('Withdrawing:', amount)
        onClose()
    }

    return (
        <BaseModal
            open={isOpen}
            onClose={onClose}
            size='small'
            className='bg-[#1A1A1A] border border-white/10'>
            <div className='w-full flex flex-col gap-6 p-6'>
                {/* Title */}
                <h2 className='text-white text-xl font-sf-pro-display font-semibold text-center'>
                    Withdraw Funds
                </h2>

                {/* Available Balance */}
                <div className='flex flex-col gap-2'>
                    <p className='text-white/60 text-sm font-sf-pro-display'>Available Balance</p>
                    <p className='text-white text-2xl font-sf-pro-display font-bold'>
                        ₦{availableBalance.toLocaleString()}
                    </p>
                </div>

                {/* Amount Input */}
                <div className='flex flex-col gap-2'>
                    <Input
                        type='number'
                        placeholder='₦ 0'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='w-full h-14 bg-transparent border border-white/20 rounded-lg px-4 text-white text-lg font-sf-pro-display placeholder:text-white/40 focus:border-white/40'
                    />
                </div>

                {/* Confirm Button */}
                <Button
                    onClick={handleConfirm}
                    disabled={!amount || Number(amount) <= 0 || Number(amount) > availableBalance}
                    className='w-full h-12 bg-[#0066FF] hover:bg-[#0052CC] text-white font-sf-pro-display font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'>
                    Confirm
                </Button>
            </div>
        </BaseModal>
    )
}
