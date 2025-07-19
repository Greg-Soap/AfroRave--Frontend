import BaseModal from '@/components/reusable/base-modal'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'
import { BusinessSignUp } from '@/pages/auth/sign-up/business-signup-form'
import { SignupForm } from '@/pages/auth/sign-up/signup-form'
import { UserLoginForm } from '@/pages/auth/user-login/user-login-form'

export function AuthModal() {
  const { isAuthModalOpen, authType, signupType, closeAuthModal, switchAuthType } = useAuth()

  const renderSignupForm = () => {
    switch (signupType) {
      case 'creator':
        return <BusinessSignUp onSwitchToLogin={() => switchAuthType('login')} type='creator' />
      case 'vendor':
        return <BusinessSignUp onSwitchToLogin={() => switchAuthType('login')} type='vendor' />
      default:
        return <SignupForm onSwitchToLogin={() => switchAuthType('login')} />
    }
  }

  const getModalSize = () => {
    if (authType === 'login') return 'small'
    if (signupType === 'creator' || signupType === 'vendor') return 'large'
    return 'small'
  }

  return (
    <BaseModal
      open={isAuthModalOpen}
      onClose={closeAuthModal}
      cancelOnOverlay
      disableOverlayClick
      floatingCancel
      className={cn({
        'bg-transparent shadow-none':
          authType === 'signup' && (signupType === 'creator' || signupType === 'vendor'),
      })}
      size={getModalSize()}>
      {authType === 'login' ? <UserLoginForm /> : renderSignupForm()}
    </BaseModal>
  )
}
