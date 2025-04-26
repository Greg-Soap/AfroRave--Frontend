import BaseModal from '@/components/reusable/base-modal'
import { useAuth } from '@/contexts/auth-context'
import { UserLoginForm } from '@/pages/auth/user-login/user-login-form'
import { SignupForm } from '@/pages/auth/sign-up/signup-form'

export function AuthModal() {
  const { isAuthModalOpen, authType, closeAuthModal, switchAuthType } = useAuth()

  return (
    <BaseModal
      open={isAuthModalOpen}
      onClose={closeAuthModal}
      cancelOnOverlay
      disableOverlayClick
      floatingCancel
      size='small'>
      {authType === 'login' ? (
        <UserLoginForm onSwitchToSignup={() => switchAuthType('signup')} />
      ) : (
        <SignupForm onSwitchToLogin={() => switchAuthType('login')} />
      )}
    </BaseModal>
  )
}
