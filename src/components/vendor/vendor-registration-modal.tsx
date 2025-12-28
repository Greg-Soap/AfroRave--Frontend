import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { vendorRegistrationSchema, type VendorRegistrationFormData } from '@/schema/vendor-registration.schema'
import { VENDOR_CATEGORIES } from '@/types/vendor'

interface VendorRegistrationModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export function VendorRegistrationModal({
    isOpen,
    onClose,
}: VendorRegistrationModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isShrinking, setIsShrinking] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<VendorRegistrationFormData>({
        resolver: zodResolver(vendorRegistrationSchema) as any,
        defaultValues: {
            firstName: '',
            lastName: '',
            category: '',
            email: '',
            businessName: '',
            isRegistered: false,
            description: '',
        },
    })

    const isRegistered = watch('isRegistered')
    const category = watch('category')

    const onSubmit = async (data: VendorRegistrationFormData) => {
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Start shrink animation
        setIsShrinking(true)

        // Wait for shrink animation to complete before showing success
        setTimeout(() => {
            setIsSubmitting(false)
            setShowSuccess(true)
            // Optional: notify parent if needed, but don't close this modal
            // onSuccess && onSuccess() 
        }, 800)

        console.log('Vendor registration data:', data)
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !isSubmitting) {
            onClose()
        }
    }

    const handleClose = () => {
        if (!isSubmitting) {
            onClose()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    onClick={handleBackdropClick}
                >
                    {/* Background overlay */}
                    <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={
                            isShrinking
                                ? {
                                    width: 400,
                                    height: 300,
                                    opacity: 1,
                                    scale: 1,
                                }
                                : { opacity: 1, scale: 1 }
                        }
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                            duration: isShrinking ? 0.8 : 0.3,
                            ease: 'easeInOut',
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] max-h-[90vh] overflow-hidden"
                        style={{
                            WebkitUserSelect: 'none',
                            userSelect: 'none',
                            transform: 'translateZ(0)'
                        }}
                    >
                        {/* Large clickable area for iOS Safari - top right corner */}
                        {!isSubmitting && (
                            <>
                                {/* Invisible large touch target */}
                                <div
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleClose()
                                    }}
                                    className="absolute top-0 right-0 w-20 h-20 z-50 cursor-pointer"
                                    style={{
                                        WebkitTapHighlightColor: 'transparent',
                                        touchAction: 'manipulation',
                                    }}
                                    aria-label="Close modal area"
                                />
                                {/* Visual close button - positioned lower to align with clickable area */}
                                <div className="absolute top-8 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full pointer-events-none z-40">
                                    <X className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
                                </div>
                            </>
                        )}
                        {/* SUCCESS CONTENT */}
                        <motion.div
                            animate={{ opacity: showSuccess ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10 ${showSuccess ? 'pointer-events-auto' : 'pointer-events-none'}`}
                            style={{ pointerEvents: showSuccess ? 'auto' : 'none' }}
                        >
                            <div className="flex justify-center mb-6">
                                <img
                                    src="/assets/landing-page/form-logo.png"
                                    alt="AFRO REVIVE"
                                    className="h-12 object-contain"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-black font-sf-pro-display mb-2">
                                CONGRATULATIONS!
                            </h2>
                            <p className="text-sm text-gray-700 font-sf-pro-text leading-relaxed">
                                Thank you for signing up. You'll be notified as soon as we officially launch.
                            </p>
                        </motion.div>

                        {/* FORM CONTENT */}
                        <motion.div
                            animate={{ opacity: showSuccess || isShrinking ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                            className={`p-6 md:p-8 overflow-y-auto max-h-[90vh] z-10 ${showSuccess ? 'pointer-events-none' : 'pointer-events-auto'}`}
                            style={{ pointerEvents: showSuccess ? 'none' : 'auto' }}
                        >
                            {/* Logo */}
                            <div className="flex justify-center mb-6">
                                <img
                                    src="/assets/landing-page/form-logo.png"
                                    alt="AFRO REVIVE"
                                    className="h-12 md:h-16 object-contain"
                                />
                            </div>

                            {/* Header */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-black font-sf-pro-display mb-2">
                                    OWN THE SPOTLIGHT
                                </h2>
                                <p className="text-sm md:text-base text-gray-600 font-sf-pro-text">
                                    Tell us about you.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* First Name & Last Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Input
                                            {...register('firstName')}
                                            placeholder="FIRST NAME"
                                            onError={!!errors.firstName}
                                            disabled={isSubmitting}
                                            className="bg-white !text-black border-charcoal/30 placeholder:text-gray-400"
                                        />
                                        {errors.firstName && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors.firstName.message}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Input
                                            {...register('lastName')}
                                            placeholder="LAST NAME"
                                            onError={!!errors.lastName}
                                            disabled={isSubmitting}
                                            className="bg-white !text-black border-charcoal/30 placeholder:text-gray-400"
                                        />
                                        {errors.lastName && (
                                            <p className="text-xs text-red-600 mt-1">
                                                {errors.lastName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <Select
                                        value={category}
                                        onValueChange={(value) => setValue('category', value)}
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger className="w-full bg-[#1C1C1E] text-white border-0 h-11">
                                            <SelectValue placeholder="CATEGORY" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {VENDOR_CATEGORIES.map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.category.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <Input
                                        {...register('email')}
                                        type="email"
                                        placeholder="EMAIL ADDRESS"
                                        onError={!!errors.email}
                                        disabled={isSubmitting}
                                        className="bg-white !text-black border-charcoal/30 placeholder:text-gray-400"
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Business Name */}
                                <div>
                                    <Input
                                        {...register('businessName')}
                                        placeholder="BUSINESS NAME"
                                        onError={!!errors.businessName}
                                        disabled={isSubmitting}
                                        className="bg-white !text-black border-charcoal/30 placeholder:text-gray-400"
                                    />
                                    {errors.businessName && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.businessName.message}
                                        </p>
                                    )}
                                </div>

                                {/* Registration Checkbox */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="isRegistered"
                                        checked={isRegistered}
                                        onCheckedChange={(checked) =>
                                            setValue('isRegistered', checked as boolean)
                                        }
                                        disabled={isSubmitting}
                                        className="border-charcoal/50"
                                    />
                                    <label
                                        htmlFor="isRegistered"
                                        className="text-sm text-gray-500 cursor-pointer"
                                    >
                                        Is your business registered?
                                    </label>
                                </div>

                                {/* Description */}
                                <div>
                                    <textarea
                                        {...register('description')}
                                        placeholder="DESCRIBE YOUR PRODUCT/SERVICE"
                                        rows={5}
                                        disabled={isSubmitting}
                                        className="w-full px-3 py-3 text-sm border border-charcoal/30 rounded-md focus:outline-none focus:border-black transition-colors resize-none bg-white !text-black placeholder:text-gray-400"
                                    />
                                    {errors.description && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-auto px-12 h-10 bg-black text-white rounded-full font-sf-pro-display font-semibold text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 uppercase"
                                    >
                                        {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
