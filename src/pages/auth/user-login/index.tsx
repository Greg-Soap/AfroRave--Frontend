import BaseModal from '@/components/reusable/base-modal'
import UserLoginForm from './user-login-form'
import { useAuth } from '@/contexts/auth-context'

export default function UserLogin() {
  const { isLoginModalOpen, loginType, closeLoginModal } = useAuth()

  return (
    <BaseModal
      open={isLoginModalOpen}
      onClose={closeLoginModal}
      cancelOnOverlay
      disableOverlayClick
      floatingCancel
      size='small'>
      <UserLoginForm loginType={loginType} />
    </BaseModal>
  )
}
