import BaseModal from '@/components/reusable/base-modal'
import { useAuth } from '@/contexts/auth-context'
import { OnlyShowIf } from '@/lib/environment'
import { cn } from '@/lib/utils'
import { BusinessSignUp } from '@/pages/auth/sign-up/business-signup-form'
import { SignupForm } from '@/pages/auth/sign-up/signup-form'
import { VendorSignupForm } from '@/pages/auth/sign-up/vendor-signup-form'
import { CreatorLogo, UserLoginForm } from '@/pages/auth/user-login/user-login-form'
import { RoleSelection } from './role-selection'
import { AnimatePresence, motion } from 'framer-motion'

export function AuthModal() {
  const { isAuthModalOpen, authType, signupType, closeAuthModal, switchAuthType, loginType, switchToSignup } =
    useAuth()

  const renderSignupForm = () => {
    // Show role selection if signupType is not set (guest) and authType is signup
    if (signupType === 'guest' && authType === 'signup') {
      return <RoleSelection onContinue={(role) => switchToSignup(role)} />
    }

    switch (signupType) {
      case 'creator':
        return <BusinessSignUp onSwitchToLogin={() => switchAuthType('login')} type='creator' />
      case 'vendor':
        return <VendorSignupForm onSwitchToLogin={() => switchAuthType('login')} />
      default:
        return <SignupForm onSwitchToLogin={() => switchAuthType('login')} />
    }
  }

  const getModalSize = () => {
    if (authType === 'login') return 'small'
    if (signupType === 'creator') return 'large'
    // Role selection modal should be large
    if (signupType === 'guest' && authType === 'signup') return 'large'
    return 'small'
  }

  const shouldShowCreatorLogo = () => {
    // Show logo for creator login or vendor login, role selection, or creator signup
    // Vendor signup has its own logo inside the form, so don't show floating logo
    if (authType === 'signup' && signupType === 'vendor') {
      return false
    }
    return (
      loginType === 'creator' ||
      loginType === 'vendor' ||
      (authType === 'signup' && signupType === 'guest') || // Role selection
      (authType === 'signup' && signupType === 'creator')
    )
  }

  // Generate unique key for AnimatePresence based on current form state
  const formKey = `${authType}-${signupType}`

  return (
    <BaseModal
      open={isAuthModalOpen}
      onClose={closeAuthModal}
      cancelOnOverlay
      floatingCancel
      className={cn({
        'bg-transparent shadow-none':
          authType === 'signup' && (signupType === 'creator' || signupType === 'vendor' || signupType === 'guest'),
      })}
      size={getModalSize()}>
      <>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={formKey}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1], // Smoother easing curve
              layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            }}
            layout>
            <OnlyShowIf condition={shouldShowCreatorLogo()}>
              <motion.div
                className='relative w-full'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}>
                <div className='absolute -top-20 left-1/2 -translate-x-1/2'>
                  <CreatorLogo />
                </div>
              </motion.div>
            </OnlyShowIf>
            {authType === 'login' ? <UserLoginForm /> : renderSignupForm()}
          </motion.div>
        </AnimatePresence>
      </>
    </BaseModal>
  )
}
