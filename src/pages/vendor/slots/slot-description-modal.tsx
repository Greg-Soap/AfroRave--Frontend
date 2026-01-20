import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState } from "react"

interface SlotDescriptionModalProps {
    isOpen: boolean
    onClose: () => void
    slotName: string
    price: string
}

export function SlotDescriptionModal({ isOpen, onClose, slotName, price }: SlotDescriptionModalProps) {
    const [quantity, setQuantity] = useState(1)

    const increment = () => setQuantity(q => q + 1)
    const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1))

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] flex flex-col items-center gap-6 p-0 overflow-hidden bg-white border-none shadow-xl rounded-xl">
                {/* Custom Close Button */}
                <div className="absolute right-4 top-4 z-50">
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-black/5 rounded-full">
                            <X className="h-5 w-5 text-black" />
                        </Button>
                    </DialogClose>
                </div>

                <DialogHeader className="w-full flex flex-col items-center justify-center pt-10 pb-2 space-y-2">
                    <DialogTitle className="text-xl font-bold font-sf-pro-display text-black text-center">
                        {slotName}
                    </DialogTitle>
                </DialogHeader>

                {/* Quantity Selector */}
                <div className="flex items-center gap-8 py-2">
                    <Button variant="ghost" size="icon" onClick={decrement} className="h-8 w-8 hover:bg-transparent">
                        <ChevronLeft className="h-6 w-6 text-black" />
                    </Button>
                    <span className="text-xl font-bold font-sf-pro-display text-black">{quantity}</span>
                    <Button variant="ghost" size="icon" onClick={increment} className="h-8 w-8 hover:bg-transparent">
                        <ChevronRight className="h-6 w-6 text-black" />
                    </Button>
                </div>

                {/* Price */}
                <p className="text-2xl font-bold font-sf-pro-display text-[#34C759]">
                    {price}
                </p>

                <div className="w-full px-12 pb-10">
                    <Button className="w-full h-12 bg-[#B91C1C] hover:bg-red-800 text-white rounded-[8px] font-medium text-base font-sf-pro-display shadow-sm">
                        Request
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}
