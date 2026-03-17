import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, CheckCircle2, X, ArrowLeft } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface ForgotPasswordModalProps {
  open: boolean
  onClose: () => void
}

type Step = 'email' | 'success'

export function ForgotPasswordModal({ open, onClose }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function handleClose() {
    onClose()
    // Reset after close animation
    setTimeout(() => {
      setStep('email')
      setEmail('')
      setEmailError('')
    }, 300)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) {
      setEmailError('Please enter your email address.')
      return
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    setIsLoading(true)

    // TODO: wire to backend reset password API
    setTimeout(() => {
      setIsLoading(false)
      setStep('success')
    }, 1200)
  }

  function handleResend() {
    setIsLoading(true)
    // TODO: wire to backend resend API
    setTimeout(() => setIsLoading(false), 1200)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        className='sm:max-w-[415px] w-[90%] p-0 rounded-[12px] bg-white border-none shadow-2xl overflow-hidden'
        noCancel>
        <VisuallyHidden>
          <DialogTitle>Forgot Password</DialogTitle>
        </VisuallyHidden>

        {/* Close button */}
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors'>
          <X size={13} strokeWidth={2.5} className='text-black' />
        </button>

        <AnimatePresence mode='wait' initial={false}>
          {step === 'email' ? (
            <motion.div
              key='email-step'
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className='px-7 py-8 md:px-8 md:py-9 font-sf-pro-text'>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className='w-11 h-11 rounded-full bg-black flex items-center justify-center mb-5'>
                <Mail size={18} className='text-white' />
              </motion.div>

              <p className='text-2xl font-bold leading-tight text-black font-sf-pro-display mb-1'>
                Forgot password?
              </p>
              <p className='text-xs text-black/50 font-sf-pro-text mb-6 leading-relaxed'>
                No worries. Enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {/* Email input */}
                <div className='flex flex-col gap-1.5'>
                  <div
                    className={cn(
                      'w-full flex items-center gap-1 h-11 border rounded-[4px] px-3 transition-colors',
                      emailError ? 'border-red-400' : 'border-black',
                    )}>
                    <Mail color='#686868' size={12} />
                    <Input
                      type='email'
                      placeholder='Email Address.'
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError) setEmailError('')
                      }}
                      className='h-full pl-0 rounded-none border-none !text-xs focus-visible:ring-0 shadow-none'
                    />
                  </div>
                  {emailError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='text-[10px] text-red-500 font-sf-pro-text'>
                      {emailError}
                    </motion.p>
                  )}
                </div>

                <Button
                  type='submit'
                  disabled={isLoading}
                  className='w-full h-[50px] text-base font-semibold font-sf-pro-text rounded-[6px] bg-black hover:bg-black/85 text-white transition-all'>
                  {isLoading ? (
                    <motion.span
                      key='loading'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className='flex items-center gap-2'>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block'
                      />
                      Sending...
                    </motion.span>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key='success-step'
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className='px-7 py-8 md:px-8 md:py-9 font-sf-pro-text'>

              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                className='w-11 h-11 rounded-full bg-black flex items-center justify-center mb-5'>
                <CheckCircle2 size={20} className='text-white' />
              </motion.div>

              <p className='text-2xl font-bold leading-tight text-black font-sf-pro-display mb-1'>
                Check your email
              </p>
              <p className='text-xs text-black/50 font-sf-pro-text mb-1 leading-relaxed'>
                We sent a password reset link to
              </p>
              <p className='text-xs font-bold text-black font-sf-pro-text mb-6 break-all'>
                {email}
              </p>

              <Button
                onClick={handleClose}
                className='w-full h-[50px] text-base font-semibold font-sf-pro-text rounded-[6px] bg-black hover:bg-black/85 text-white mb-4'>
                Done
              </Button>

              <p className='text-[10px] text-center text-black/40 font-sf-pro-text'>
                Didn't receive it?{' '}
                <button
                  type='button'
                  onClick={handleResend}
                  disabled={isLoading}
                  className='font-bold text-black hover:underline disabled:opacity-50'>
                  {isLoading ? 'Sending...' : 'Click to resend'}
                </button>
              </p>

              <button
                type='button'
                onClick={() => setStep('email')}
                className='mt-4 flex items-center gap-1 text-[10px] text-black/40 hover:text-black transition-colors font-sf-pro-text mx-auto'>
                <ArrowLeft size={10} />
                Back to enter email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
