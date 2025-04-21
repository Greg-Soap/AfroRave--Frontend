import BaseModal from '@/components/reusable/base-modal'
import UserLoginForm from './user-login-form'
import { useAuth } from '@/contexts/auth-context'

export default function UserLogin() {
  const { isLoginModalOpen, loginType, closeLoginModal } = useAuth()

  return (
    <BaseModal
      open={isLoginModalOpen}
      onClose={closeLoginModal}
      cancelOnOverlay={true}
      disableOverlayClick={true}
      size='small'
      className='pt-[90px]'>
      <UserLoginForm loginType={loginType} />
    </BaseModal>
  )
}
